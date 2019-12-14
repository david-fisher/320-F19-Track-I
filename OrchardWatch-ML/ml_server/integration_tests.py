import requests
import unittest

class TestStringMethods(unittest.TestCase):

    def test_predict_missingArgs(self):
        url = "http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/predict"
        response = requests.get(url)
        self.assertTrue(response.headers['error'] == 'Missing Parameters')

    def test_predict(self):
        url = "ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/predict?modelName=uploaded_model.h5&imageURL=test_images/dog.jpeg"
        response = requests.get(url)
        self.assertTrue(response.headers['label'] == 'golden_retriever')

    def test_upload_new_missingArgs(self):
        url = "http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/upload/new"
        response = requests.post(url)
        self.assertTrue(response.headers['error'] == 'Missing Parameters')

    def test_upload_new(self):
        url = "http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/upload/new?modelName=model"
        response = requests.post(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue('resnet_keras.h5' in response.headers)

    def test_upload_replace_missingArgs(self):
        url = "http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/upload/replace"
        response = requests.put(url)
        self.assertTrue(response.headers['error'] == 'Missing Parameters')

    def test_upload_replace(self):
        url = "http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/upload/new?modelName=model"
        response = requests.put(url)
        self.assertTrue(response.status_code == 200)
        self.assertTrue('resnet_keras.h5' in response.headers)
    
    def test_list_models(self):
        url = "http://ec2-3-18-109-238.us-east-2.compute.amazonaws.com:3000/models/list"
        response = requests.get(url)
        self.assertTrue(response.status_code == 200)

if __name__ == '__main__':
    unittest.main()