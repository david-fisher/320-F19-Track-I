import requests
import unittest

class TestStringMethods(unittest.TestCase):

    def test_predict_missingArgs(self):
        url = "HTTP://localhost:3000/predict"
        response = requests.get(url)
        self.assertTrue(response.status_code == 412)

    def test_predict(self):
        url = "HTTP://localhost:3000/predict?modelName=model&imageURL=cat.jpeg"
        response = requests.get(url)
        self.assertTrue(response.status_code == 200)

    def test_upload_new_missingArgs(self):
        url = "HTTP://localhost:3000/upload/new"
        response = requests.post(url)
        self.assertTrue(response.status_code == 412)

    def test_upload_new(self):
        url = "HTTP://localhost:3000/upload/new?modelName=model"
        response = requests.post(url)
        self.assertTrue(response.status_code == 200)

    def test_upload_replace_missingArgs(self):
        url = "HTTP://localhost:3000/upload/replace"
        response = requests.put(url)
        self.assertTrue(response.status_code == 412)

    def test_upload_replace(self):
        url = "HTTP://localhost:3000/upload/replace?modelName=model"
        response = requests.put(url)
        self.assertTrue(response.status_code == 200)
    
    def test_list_models(self):
        self.assertTrue(self)

if __name__ == '__main__':
    unittest.main()