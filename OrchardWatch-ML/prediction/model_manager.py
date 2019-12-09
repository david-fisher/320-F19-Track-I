import sys
import os
import pickle
import shutil
import json
from keras_model import *

os.environ['KMP_DUPLICATE_LIB_OK']='True'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

def main():
	# TODO: print expected arguments in case of error

	# strings
	dict_file = "model_dict"
	types_file = "model_types"

	# will need to be changed on diff filesystem
	model_dir = "../models/"

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
				predict_keras(os.path.join(model_dir, model_name), img_url)


def upload_model(model_types, model_dict, model_url, model_name, model_type):
	if model_type not in model_types:
		raise NameError("Please select either 'keras' or 'pytorch'.")

	# change to boto3 on EC2
	model_fname = shutil.copyfile(model_url, os.path.join(model_dir, model_name))
	
	if model_fname:
		print("Model uploaded successfully to " + model_fname)
		model_dict[model_name] = model_type
		pickle.dump(model_dict, open(dict_file, "wb"))

def get_models(model_dict):
	if len(model_dict) == 0:
		raise RuntimeError("No models available, please upload a model.")
	else:
		model_json = json.dumps(model_dict)
		print(model_json)


if __name__== "__main__":
   main()