import torchvision.models as models
from torchvision import transforms
from PIL import Image
import torch
import json
import os

# mobilenet = models.mobilenet_v2(pretrained=True)
# torch.save(mobilenet, 'mobilenet.pt')

def predict_pytorch(model_fname, img):
	model = load_model(model_fname)
	batch_t = preprocess_image(img)
	out = model(batch_t)
	cwd = os.getcwd()
	labels_path = os.path.join(cwd, "../prediction/imagenet_classes.txt")
	preds = decode_predictions(out, labels_path)
	preds_json = json.dumps(preds)
	print(preds_json)

def load_model(model_fname):
	model = torch.load(model_fname)
	# change into eval mode
	model.eval()
	return model

def preprocess_image(img):
	# Normalize and preprocess data
	transform = transforms.Compose([            #[1]
	 transforms.Resize(256),                    #[2]
	 transforms.CenterCrop(224),                #[3]
	 transforms.ToTensor(),                     #[4]
	 transforms.Normalize(                      #[5]
	 mean=[0.485, 0.456, 0.406],                #[6]
	 std=[0.229, 0.224, 0.225]                  #[7]
	)])
	# apply transform
	img_t = transform(img)
	# convert into tensor
	batch_t = torch.unsqueeze(img_t, 0)
	return batch_t

def decode_predictions(out, labels_path):
	# get labels from file
	with open(labels_path) as f:
		labels = [line.strip() for line in f.readlines()]
	# get best prediction with softmax
	_, index = torch.max(out, 1)
	percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100
	# get best label and confidence
	label, confidence = labels[index[0]], percentage[index[0]].item()
	preds = {}
	preds["label"] = str(label)
	preds["confidence"] = str(confidence)
	return preds
