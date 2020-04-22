import json
import apriltag
import cv2
import os
from datetime import datetime
import math
# from pathlib import Path

def main(event, context):
    clusterID = event['cluster_id']


    # STEP 1:check if folder for cluster exists, if not, create new folder with name clusterID
    # ---in s3, however that happens :
    #  'if [ ! -d "/harvest2020/$CLUSTERID" ] then mkdir /harvest2020/$CLUSTERID fi'

    validClusters = 1000  # filler, number of total valid clusters
    inputPicture = context  # figure this out
    cluster_ID = 1  # filler get from input

    if not (is_valid_clusterID(clusterID)):
        return {
            'statusCode': 400,
            'body': json.dumps('invalid clusterID!')
        }
    # STEP 2: ALIGNMENT CHECK
    # get most recent img from /harvest2020/clusterID

    mostRecentPicture = get_last_picture(clusterID)

    aligned = check_alignment(inputPicture, mostRecentPicture)
    if (aligned == -1):
        print("error, tag not present in input img")
        return {
            'statusCode': 400,
            'body': json.dumps('Bad!')
        }
    elif (aligned == 0):
        print("input image not aligned")
        return {
            'statusCode': 300,
            'body': json.dumps('Hello from Lambda!')
        }
    else:
        print("successfully aligned")

        # STEP 3: if alignment check result == 1: name picture to 'clusterID_date_time'
        date = datetime.date(datetime.now())
        time = datetime.time(datetime.now())
        os.rename(inputPicture, str(clusterID) + "_" + date + "_" + time)

        # STEP 4: send to S3 to be stored in /harvest2020/clusterID
        # need to figure out how to do this in AWS
        store_in_s3(inputPicture, clusterID)

        return {
            'statusCode': 200,
            'body': json.dumps('Hello from Lambda!')
        }


def is_valid_clusterID(clusterID):
    # checks input to see if clusterID is valid
    validClusters = 99999

    if (isinstance(clusterID, int)):
        if (clusterID > 0):
            if (clusterID <= validClusters):
                return True
    return False


def get_last_picture(cluster_num):
    # get the most recent picture from s3 of the cluster
    pass


def store_in_s3(picture, cluster_num):
    # store image in correct folder in s3
    pass


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


# Params: l1 and l2 are file system paths
# Returns: 1 if aligned, 0 otherwise, -1 on error
def check_alignment(l1, l2):
    # Threshold for alignment
    # VVV MAKE THIS NUMBER LARGER IF YOU NEED TO FAKE IT FOR THE DEMO
    sim_thresh = 1

    # Read in image (l1 and l2 will most likely be paths leading to images loaded
    # application and S3 bucket)
    img1 = cv2.imread(l1, cv2.IMREAD_COLOR)
    img2 = cv2.imread(l2, cv2.IMREAD_COLOR)

    # Convert to RGB
    img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)
    img2 = cv2.cvtColor(img1, cv2.COLOR_BGR2RGB)

    # Convert from RGB to black and white
    img1_bw = cv2.cvtColor(img1, cv2.COLOR_RGB2GRAY)  # convert to grayscale for apriltag library
    img2_bw = cv2.cvtColor(img2, cv2.COLOR_RGB2GRAY)  # convert to grayscale for apriltag library

    # Further preprocessing
    (thresh, img1_bw) = cv2.threshold(img1_bw, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)  # threshold
    (thresh, img2_bw) = cv2.threshold(img2_bw, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)  # threshold

    # Declare and apply detector
    detector = apriltag.Detector()
    r_1 = detector.detect(img1_bw)
    r_2 = detector.detect(img2_bw)

    # Ensure an AprilTag can be detected
    if r_1 == None or r_2 == None:
        return -1

    # Check similarity by checking threshold
    metric = compute_homography_distance(results[0][0].homography, r[0].homography)
    if metric <= sim_thresh:
        return 1
    else:
        return 0
