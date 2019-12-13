import boto3
import urllib3
import json
from io import BytesIO
import constants
import time

def upload_model(options):
	model_name = options['modelName']
	model_type = options['modelType']
	
	#TODO make call to ML API
	http = urllib3.PoolManager()
	r = http.request('GET', 'ec2-3-18-109-238.us-east-2.compute.amazonaws.com/predict?modelName={}&modelType={}'.format(model_name, model_type))
	return json.loads(r.data.decode('utf-8'))
	#model = options['model']
	#print("MOEL", model)
	#s3 = boto3.resource("s3")
	#bucket_name = "0bucket2019"
	#s3.meta.client.upload_file(model, bucket_name, model_name)
	
def classify(options):
	#options:
	#	picture:(str) a picture to classify. path to file
	#	model: (str) the model to classify with
	
	#TODO assert these are proper types
	pic_source = str(options["pic"])
	model=str(options["model"])
	
	#TODO upload file and get pic path
	now = str(time.now())
	pic_path = "/ml/{}/unannotated_images/{}_{}.jpg".format(model, pic, now)
	
	#upload the file that was passed to the S3 bucket
	s3 = boto3.resource("s3")
    bucket_name = "0bucket2019"
    s3.meta.client.upload_file(pic_source, bucket_name, pic_path)
	#create a client to make requests to ml api
	http = urllib3.PoolManager()
	#TODO replace with actual request
	r = http.request('GET', 'ec2-3-18-109-238.us-east-2.compute.amazonaws.com/predict?modelName={}&imageURL={}'.format(model, pic_path))
	#resp stores the classifier prediction
	resp = json.loads(r.data.decode('utf-8'))
	return constants.respond(statusCode="200", res=resp)
	
def list(options):
	http = urllib3.PoolManager()
	r = http.request('GET', 'ec2-3-18-109-238.us-east-2.compute.amazonaws.com/list/models')
	resp = json.loads(r.data.decode('utf-8'))
	return resp


def upload_annotations(options):
	print(options)
	#TODO add support for CSV
	#TODO assert all arguments are present
	#Take the annotations (a dictionary)
	annotations = options['annotations']
	pic_url = options['pic_url']
	bytesIO = BytesIO()
	bytesIO.write(json.dumps(annotations))
	bytesIO.seek(0)
    s3 = boto3.resource("s3")
    bucket_name = "0bucket2019"
    #TODO actually create an annotations destination
    s3.meta.client.upload_fileobj(bytesIO, bucket_name, 'tmp_annotations.json')
    #s3.Object(bucket_name, "hello.txt").put(Body=open("hello.txt", 'rb'), ACL='public-read')
    return constants.respond(statusCode="200")
    