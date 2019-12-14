import sys
import os
import pickle
import shutil
import json
from keras_model import *
import io
from PIL import Image
import boto3

os.environ['KMP_DUPLICATE_LIB_OK']='True'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

def main():
	# TODO: print expected arguments in case of error

	# strings
	cwd = os.getcwd()
	dict_file = os.path.join(cwd, "../prediction/model_dict")
	types_file = os.path.join(cwd, "../prediction/model_types")

	# will need to be changed on diff filesystem
	model_dir = os.path.join(cwd, "../models/")

	if not os.path.exists(types_file):
		model_types = set(["keras", "pytorch"])
		pickle.dump(model_types, open(types_file, "wb"))

	funct_flag = sys.argv[1]

	model_types = pickle.load(open(types_file, "rb"))

	if os.path.exists(dict_file):
		model_dict = pickle.load(open(dict_file, "rb"))
	else:
		model_dict = {}
	
	if funct_flag == "upload":
		model_url = sys.argv[2]
		model_name = sys.argv[3]
		model_type = sys.argv[4]

		upload_model(model_types, model_dict, model_url, model_name, model_type)

	elif funct_flag == "list":
		get_models(model_dict)

	elif funct_flag == "predict":
		model_name = sys.argv[2]
		img_url = sys.argv[3]

		if model_name not in model_dict.keys():
			raise NameError("Model with name " + model_name + " does not exist.")

		else:
			model_type = model_dict[model_name]
			if model_type == "keras":
				img = load_image(img_url)
				predict_keras(os.path.join(model_dir, model_name), img)


def upload_model(model_types, model_dict, model_url, model_name, model_type):
	if model_type not in model_types:
		raise NameError("Please select either 'keras' or 'pytorch'.")

	# change to boto3 on EC2
	# model_fname = shutil.copyfile(model_url, os.path.join(model_dir, model_name))
	model_fname = os.path.join(model_dir, model_name)
	s3 = boto3.resource('s3', region_name='us-east-2')
	bucket = s3.Bucket('machine-learning2019')
	bucket.download_file(model_url, model_fname)
	
	if os.path.exists(model_fname):
		model_dict[model_name] = model_type
		pickle.dump(model_dict, open(dict_file, "wb"))
		get_models(model_dict)

def get_models(model_dict):
	if len(model_dict) == 0:
		raise RuntimeError("No models available, please upload a model.")
	else:
		model_json = json.dumps(model_dict)
		print(model_json)

def load_image(img_url):
	# if img_url.startswith('http://') or img_url.startswith('https://') or img_url.startswith('ftp://'):
	# 	response = requests.get(img_url)
	# 	img = Image.open(io.BytesIO(response.content))
	# 	img = img.resize((224, 224))
	# else:
	# 	# load an image in PIL format
	# 	img = load_img(img_url, target_size=(224, 224))

	s3 = boto3.resource('s3', region_name='us-east-2')
	bucket = s3.Bucket('machine-learning2019')
	object = bucket.Object(img_url)
	file_stream = io.BytesIO()
	object.download_fileobj(file_stream)
	img = Image.open(file_stream)
	return img

if __name__== "__main__":
   main()
