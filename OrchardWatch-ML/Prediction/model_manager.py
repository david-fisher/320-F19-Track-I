import sys
import os
import pickle
import shutil



os.environ['KMP_DUPLICATE_LIB_OK']='True'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# strings
dict_file = "model_dict"
types_file = "model_types"

# will need to be changed on diff filesystem
model_dir = "/Users/dhruvilgala/Desktop/320-F19-Track-I/OrchardWatch-ML/models/"

# comment after done once
model_types = set(["keras", "pytorch"])
pickle.dump(model_types, open(types_file, "wb"))

def main():
	# TODO: print expected arguments in case of error

	funct_flag = sys.argv[1]

	model_types = pickle.load(open(types_file, "rb"))
	
	if funct_flag == "upload":
		model_url = sys.argv[2]
		model_name = sys.argv[3]
		model_type = sys.argv[4]

		if os.path.exists(dict_file):
			model_dict = pickle.load(open(dict_file, "rb"))
		else:
			model_dict = {}

		upload_model(model_dict, model_url, model_name, model_type)

	# elif funct_flag == "predict":

def upload_model(model_dict, model_url, model_name, model_type):
	if model_type not in model_types:
		print("Error: model type not supported. Please choose either 'keras' or 'pytorch'.")
		raise NameError("Please select either 'keras' or 'pytorch'.")

	# change to boto3 on EC2
	model_fname = shutil.copyfile(model_url, os.path.join(model_dir, model_name))
	
	if model_fname:
		print("Model uploaded successfully to " + model_fname)
		model_dict[model_name] = (model_type, model_name)
		pickle.dump(model_dict, open(dict_file, "wb"))


if __name__== "__main__":
   main()