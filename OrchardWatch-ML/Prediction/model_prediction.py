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

os.environ['KMP_DUPLICATE_LIB_OK']='True'

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

# load  model
loaded_model = load_model("model.h5")
print("Loaded model from disk")

filename = 'cat.jpeg'
# load an image in PIL format
original_image = load_img(filename, target_size=(224, 224))
# convert the PIL image (width, height) to a NumPy array (height, width, channel)
numpy_image = img_to_array(original_image)
# Convert the image into 4D Tensor (samples, height, width, channels) by adding an extra dimension to the axis 0.
input_image = np.expand_dims(numpy_image, axis=0)

print('PIL image size = ', original_image.size)
print('NumPy image size = ', numpy_image.shape)
print('Input image size = ', input_image.shape)
plt.imshow(np.uint8(input_image[0]))

#preprocess for resnet50
processed_image_resnet50 = applications.resnet50.preprocess_input(input_image.copy())

# resnet50
predictions_resnet50 = loaded_model.predict(processed_image_resnet50)
label_resnet50 = decode_predictions(predictions_resnet50)
print ('label_resnet50 = ', label_resnet50)

