import os
import argparse
from flask import request
from flask_api import FlaskAPI, status, exceptions
from werkzeug.utils import secure_filename
import io
import numpy as np
from PIL import Image
import cv2
from datetime import datetime
import re
import math
import apriltag

from flask_cors import CORS
from logzero import logger
import boto3

DB_CLUSTER = "database320"
DB_NAME = "db320"
ARN = "arn:aws:rds:us-east-2:007372221023:cluster:database320"
SECRET_ARN = "arn:aws:secretsmanager:us-east-2:007372221023:secret:rds-db-credentials/cluster-BZEL6PSDLGVBVJB6BIDZGZQ4MI/admin320-fsoCse"
REGION_NAME = "us-east-2"
IMG_FORMAT = ".jpg"  # changing this is not handled very gracefully at the moment, probably

UPLOAD_FOLDER = "/temp/uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def create_app(config=None):
    app = FlaskAPI(__name__)
    app.config.update(dict(DEBUG=True))
    app.config.update(config or {})
    CORS(app)

    @app.route("/tree", methods=["POST"])
    def get_num_clusters():
        logger.warning("POST /tree")
        image = request.files["image"]
        return "", status.HTTP_501_NOT_IMPLEMENTED

    @app.route("/cluster", methods=["POST"])
    @app.route("/cluster/<int:cluster_num>", methods=["POST"])
    def label_apples(cluster_num=None):
        logger.info("POST /cluster/{}".format(cluster_num if cluster_num is not None else ""))
        if "cluster_img" not in request.files:
            logger.error("missing_cluster_img")
            return ret(error_message="missing_cluster_img"), status.HTTP_400_BAD_REQUEST

        input_image = request.files["cluster_img"]

        if input_image and allowed_file(input_image.filename):
            filename = secure_filename(input_image.filename)
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            filename = os.path.join(UPLOAD_FOLDER, filename)
            input_image.save(filename)
        else:
            logger.error("invalid_cluster_img")
            return ret(error_message="invalid_cluster_img"), status.HTTP_400_BAD_REQUEST

        # input_image = np.fromstring(input_image.read(), np.uint8)
        # decode image
        input_image = cv2.imread(filename)
        os.remove(filename)
        # input_image = cv2.cvtColor(input_image, cv2.COLOR_BGR2RGB)

        s3 = boto3.client("s3", region_name=REGION_NAME)

        # STEP 1: Check if cluster_num is valid
        if cluster_num is not None:
            if not is_valid_cluster_num(cluster_num):
                logger.error("invalid_cluster_img")
                return ret(error_message="invalid_cluster_num"), status.HTTP_400_BAD_REQUEST

            # STEP 2: ALIGNMENT CHECK
            # get most recent img from /clusters/cluster_num
            most_recent_image = get_last_picture(s3, cluster_num)

            if most_recent_image is not None:
                aligned = check_alignment(input_image, most_recent_image)
            else:
                # TODO: check for good tag positioning
                aligned = 1

            if aligned == -1:
                logger.error("error, tag not present in input img")
                return ret(error_message="no_tag"), status.HTTP_400_BAD_REQUEST
            elif aligned == 0:
                logger.error("input image not aligned")
                return ret(error_message="not_aligned"), status.HTTP_400_BAD_REQUEST
            else:
                logger.info("successfully aligned")
        else:
            # rds = boto3.client("rds-data", region_name=REGION_NAME)
            # cluster_ids = rds.execute_statement(
            #     secretArn=SECRET_ARN,
            #     database=DB_NAME,
            #     resourceArn=ARN,
            #     sql="SELECT cluster_id FROM Cluster",
            # )
            # print(cluster_ids)

            # TODO: Do this as above, via database
            # This is really gross and inefficient, and I apologize. See above comment.
            existing_clusters = list(
                get_matching_s3_objects(s3, "orchardwatchphotos", prefix="clusters")
            )
            if existing_clusters:
                get_cluster_id = lambda key: int(re.findall("clusters/(\d*)/", key)[0])
                highest_cluster = sorted(existing_clusters, key=lambda o: get_cluster_id(o["Key"]))[-1]
                highest_cluster_id = get_cluster_id(highest_cluster["Key"])
            else:
                highest_cluster_id = 0

            cluster_num = int(highest_cluster_id) + 1  # No race conditions here, no sir.

        # STEP 3: if alignment check result == 1: name picture to 'cluster_num_date_time'
        date = datetime.date(datetime.now())
        time = datetime.time(datetime.now())
        key = str(date) + "_" + str(time) + IMG_FORMAT

        # STEP 4: send to S3 to be stored in /clusters/cluster_num
        store_in_s3(s3, input_image, cluster_num, key)

        # TODO: Measure the apple, and appropriately store the data in DB

        logger.info("Success!")
        return ret(cluster_num=cluster_num), status.HTTP_201_CREATED if cluster_num is None else status.HTTP_200_OK

    # technically this can be consolidated into label_apples, but
    # I put it separately for readability
    @app.route("/cluster/<int:cluster_num>", methods=["GET"])
    def get_cluster_data(cluster_num):
        logger.info("GET /cluster/{}".format(cluster_num))
        # well, get the data.
        return "", status.HTTP_501_NOT_IMPLEMENTED

    @app.route("/", methods=["GET"])
    def hello():
        return "Hi from the server!", status.HTTP_200_OK

    return app


def ret(error_message=None, **kwargs):
    """
    Make return JSON object

    :param error_message: sets "error" field to given message string
    :param kwargs: fields to set on the return JSON
    """
    r = {}
    if error_message is not None:
        r["error"] = error_message
    r.update(kwargs)
    return r


def is_valid_cluster_num(cluster_num):
    N_VALID_CLUSTERS = 10000
    # checks input to see if cluster_num is valid
    return isinstance(cluster_num, int) and 0 < cluster_num <= N_VALID_CLUSTERS


def make_s3_cluster_name(cluster_num):
    bucket_name = "orchardwatchphotos"
    folder_key = "clusters/{}".format(cluster_num)
    return bucket_name, folder_key


def make_s3_datapoint_name(cluster_num, subkey):
    bucket_name, folder_key = make_s3_cluster_name(cluster_num)
    folder_key += "/" + str(subkey)
    return bucket_name, folder_key


def get_last_picture(s3, cluster_num):
    bucket_name, folder_key = make_s3_cluster_name(cluster_num)

    cluster_photos = list(get_matching_s3_objects(s3, bucket_name, prefix=folder_key))
    if not cluster_photos:
        return None

    s = boto3.resource("s3")
    latest = sorted(cluster_photos, key=lambda o: o["Key"])[-1]

    data = s.Object(bucket_name, latest["Key"]).get()["Body"].read()

    img = Image.open(io.BytesIO(data))
    img = np.asarray(img)
    # buffer = BytesIO()
    # s3.download_fileobj(bucket_name, key, buffer)
    # buffer.seek(0)

    return img


def store_in_s3(s3, image, cluster_num, subkey):
    # store image in correct folder in s3
    bucket_name, key = make_s3_datapoint_name(cluster_num, subkey)

    bin_img = io.BytesIO(cv2.imencode(IMG_FORMAT, image)[1].tobytes())
    s3.upload_fileobj(bin_img, bucket_name, key)


def compute_homography_distance(m1, m2):
    diffs = []
    result = 0
    for i in range(len(m1)):
        for j in range(len(m1[i])):
            diffs.append(m1[i][j] - m2[i][j])
    for d in diffs:
        result = result + math.pow(d, 2)
    result = math.sqrt(result)
    return result


# Params: l1 and l2 are color image matrices
# Returns: 1 if aligned, 0 otherwise, -1 on error
def check_alignment(l1, l2):
    # Threshold for alignment
    # VVV MAKE THIS NUMBER LARGER IF YOU NEED TO FAKE IT FOR THE DEMO
    sim_thresh = 1

    # # Read in image (l1 and l2 will most likely be paths leading to images loaded
    # # application and S3 bucket)
    # img1 = cv2.imread(l1, cv2.IMREAD_COLOR)
    # img2 = cv2.imread(l2, cv2.IMREAD_COLOR)

    # Convert to RGB
    # img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
    # img2 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)

    img1 = l1
    img2 = l2

    # Convert from RGB to black and white
    img1_bw = cv2.cvtColor(img1, cv2.COLOR_RGB2GRAY)  # convert to grayscale for apriltag library
    img2_bw = cv2.cvtColor(img2, cv2.COLOR_RGB2GRAY)  # convert to grayscale for apriltag library

    # Further preprocessing
    (thresh, img1_bw) = cv2.threshold(
        img1_bw, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU
    )  # threshold
    (thresh, img2_bw) = cv2.threshold(
        img2_bw, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU
    )  # threshold

    # Declare and apply detector
    detector = apriltag.Detector()
    r_1 = detector.detect(img1_bw)
    r_2 = detector.detect(img2_bw)

    # Ensure an AprilTag can be detected
    if not r_1 or not r_2:
        return -1

    # Check similarity by checking threshold
    metric = compute_homography_distance(r_1[0].homography, r_2[0].homography)
    if metric <= sim_thresh:
        return 1
    else:
        return 0


def get_matching_s3_objects(
    s3, bucket, prefix="", suffix="", max_keys_per_request=100,
):
    """
    List objects in an S3 bucket.
    :param s3: boto.client("s3") client
    :param bucket: Name of the S3 bucket.
    :param prefix: Only fetch objects whose key starts with
        this prefix (optional).
    :param suffix: Only fetch objects whose keys end with
        this suffix (optional).
    :param max_keys_per_request: number of objects to list down
    """
    kwargs = {"Bucket": bucket}

    # If the prefix is a single string (not a tuple of strings), we can
    # do the filtering directly in the S3 API.
    if isinstance(prefix, str):
        kwargs["Prefix"] = prefix
    else:
        kwargs["Prefix"] = str(prefix)

    kwargs["MaxKeys"] = max_keys_per_request

    while True:

        # The S3 API response is a large blob of metadata.
        # 'Contents' contains information about the listed objects.
        resp = s3.list_objects_v2(**kwargs)

        try:
            contents = resp["Contents"]
        except KeyError:
            return

        for obj in contents:
            key = obj["Key"]
            if key.startswith(prefix) and key.endswith(suffix):
                yield obj

        # The S3 API is paginated, returning up to 1000 keys at a time.
        # Pass the continuation token into the next response, until we
        # reach the final page (when this field is missing).
        try:
            kwargs["ContinuationToken"] = resp["NextContinuationToken"]
        except KeyError:
            break


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", action="store", default="8000")

    args = parser.parse_args()
    port = int(args.port)
    app = create_app()
    app.run(host="0.0.0.0", port=port)
