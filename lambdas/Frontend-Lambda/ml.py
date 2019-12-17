import boto3
import urllib3
import json
from io import BytesIO
import constants
import time
import base64
import os

def upload_model(options):
	model_url  = options["modelURL"]
	model_name = options['modelName']
	model_type = options['modelType']
	
	#TODO make call to ML API
	http = urllib3.PoolManager()
	req_url = 'http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/upload/new?modelFileURL={}&modelName={}&modelType={}'.format(model_url, model_name, model_type)
	r = http.request('POST', req_url)
	print(r.data.decode("utf-8"))
	return constants.respond(statusCode="200", res = json.loads(r.data.decode('utf-8')))
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
	
	#create a client to make requests to ml api
	http = urllib3.PoolManager()
	bytesIO = BytesIO()
	bytesIO.write(http.request("GET", pic_source).data)
	bytesIO.seek(0)
	s3 = boto3.resource("s3")
	bucket_name = "machine-learning2019"

	now = str(time.monotonic_ns())
	pic_path = "{}.dir/unannotated_images/{}.jpeg".format(model, now)
	
	#upload the file that was passed to the S3 bucket
	s3 = boto3.resource("s3")
	bucket_name = "machine-learning2019"
	s3.meta.client.upload_fileobj(bytesIO, bucket_name, pic_path)
	#s3.meta.client.upload_file(pic_source, bucket_name, pic_path)
	
	#TODO replace with actual request
	r = http.request('GET', 'ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/predict?modelName={}&imageURL={}'.format(model, pic_path))
	#resp stores the classifier prediction
	resp = json.loads(r.data.decode('utf-8'))
	return constants.respond(statusCode="200", res=resp)
	
def mobile_classify(options):
	print("MOBIL CLASS")
	pic_source = base64.b64decode(options['pic'])
	
	model=str(options["model"])
	
	#create a client to make requests to ml api
	http = urllib3.PoolManager()
	bytesIO = BytesIO()
	bytesIO.write(pic_source)
	bytesIO.seek(0)
	s3 = boto3.resource("s3")
	bucket_name = "machine-learning2019"

	now = str(time.monotonic_ns())
	pic_path = "{}.dir/unannotated_images/{}.jpeg".format(model, now)
	
	#upload the file that was passed to the S3 bucket
	s3 = boto3.resource("s3")
	bucket_name = "machine-learning2019"
	s3.meta.client.upload_fileobj(bytesIO, bucket_name, pic_path)
	#s3.meta.client.upload_file(pic_source, bucket_name, pic_path)
	print("MOBILE CLASS UPLAODED IMAGE TO S3")
	#TODO replace with actual request
	r = http.request('GET', 'ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/predict?modelName={}&imageURL={}'.format(model, pic_path))
	#resp stores the classifier prediction
	resp = json.loads(r.data.decode('utf-8'))
	return constants.respond(statusCode="200", res=resp)
	
def list(options):
	http = urllib3.PoolManager()
	r = http.request('GET', 'http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/models/list')
	print("YOOOOOO", r.data)
	resp = json.loads(r.data.decode('utf-8'))
	return constants.respond(statusCode="200", res=resp)


def upload_annotations(options):
	print(options)
	#TODO add support for CSV
	#TODO assert all arguments are present
	#Take the annotations (a dictionary)
	bucket_name = "machine-learning2019"
	print("ANNOTA", options['annotations'])
	annotations = options['annotations']
	s3 = boto3.resource("s3")
	bucket_source={"Bucket":bucket_name, "Key":"/"}
	for pic_url in annotations:
		print("PIC_URL", pic_url)
		bytesIO = BytesIO()
		print("type pic-rul annot", annotations[pic_url], type(annotations[pic_url]))
		bytesIO.write(json.dumps(annotations[pic_url]).encode())
		bytesIO.seek(0)
		#TODO get model name and input that instead of default resnet
		s3.meta.client.upload_fileobj(bytesIO, bucket_name, 
			'resnet_keras.h5.dir/annotated_images/annotations/{}.json'.format(pic_url.split('.')[0]))

		src_unann = 'resnet_keras.h5.dir/unannotated_images/{}'.format(pic_url)
		dest_ann  = 'resnet_keras.h5.dir/annotated_images/{}'.format(pic_url)
		bucket_source["Key"]=src_unann
		print("SRVC_UNANN", src_unann, bucket_source["Key"])
		#s3.meta.client.download("resnet_keras.h5.dir/unannotated_images/1247343586733.jpeg", bucket_name, ".")
		# Copy object A as object B
		s3.Object(bucket_name, dest_ann).copy_from(
			CopySource=bucket_source)
		# Delete the former object A
		s3.Object(bucket_name, src_unann).delete()
		#s3.meta.client.copy(CopySource=bucket_source, Bucket=bucket_name, Key=dest_ann)
	return constants.respond(statusCode="200")
	
def dl_unannotated_imgs(options):
	return constants.respond(statusCode="200", res={'img1':"23879ryghfkvh2039toirghir9u3289tuoirshnksajshkvsjgh2938ut98urfhvjnkjhow8"})