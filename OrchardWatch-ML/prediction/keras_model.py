from keras import applications
import keras
import numpy as np
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
import matplotlib.pyplot as plt
from keras.applications.imagenet_utils import decode_predictions
import os
from keras.models import model_from_json
from keras.models import load_model
import sys
import requests
import io
from PIL import Image
import boto3
import json

os.environ['KMP_DUPLICATE_LIB_OK']='True'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# model = applications.resnet50.ResNet50(
#     include_top=True,
#     weights='imagenet',
#     input_tensor=None,
#     input_shape=None,
#     pooling=None,
#     classes=1000)

# # serialize model to HDF5
# model.save("model.h5")
# print("Saved model to disk")

# filename = 'cat.jpeg'

# print('PIL image size = ', original_image.size)
# print('NumPy image size = ', numpy_image.shape)
# print('Input image size = ', input_image.shape)
# plt.imshow(np.uint8(input_image[0]))

def predict_keras(model_fname, img_url):
	loaded_model, processed_image = load_keras(model_fname, img_url)
	# resnet50
	predictions_resnet50 = loaded_model.predict(processed_image)
	label_resnet50 = decode_predictions(predictions_resnet50)
	preds = {}
	preds["label"] = str(label_resnet50[0][0][1])
	preds["confidence"] = str(label_resnet50[0][0][2])
	preds_json = json.dumps(preds)
	print(preds_json)

def load_keras(model_fname, img):
	img = img.resize((224, 224))
	# load  model
	loaded_model = load_model(model_fname)
	# convert the PIL image (width, height) to a NumPy array (height, width, channel)
	numpy_image = img_to_array(img)
	# Convert the image into 4D Tensor (samples, height, width, channels) by adding an extra dimension to the axis 0.
	input_image = np.expand_dims(numpy_image, axis=0)
	#preprocess for resnet50
	processed_image_resnet50 = applications.resnet50.preprocess_input(input_image.copy())

	return loaded_model, processed_image_resnet50

