import boto3
import urllib3
import json

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
	pic = options[0]
	model=options[1]
	
	#TODO upload file and get pic path
	pic_path = "/pic/to/classify.jpg"
	
	#create a client to make requests to ml api
	http = urllib3.PoolManager()
	#TODO replace with actual request
	r = http.request('GET', 'ec2-3-18-109-238.us-east-2.compute.amazonaws.com/predict?modelName={}&imageURL={}'.format(model, pic_path))
	#resp stores the classifier prediction
	resp = json.loads(r.data.decode('utf-8'))
	return resp
	
def list():
	http = urllib3.PoolManager()
	r = http.request('GET', 'ec2-3-18-109-238.us-east-2.compute.amazonaws.com/list/models')
	resp = json.loads(r.data.decode('utf-8'))
	return resp