'''
Generic Upload File:
Name: uploadFile
Params: 
file: string path to file to upload, 
access_token: string hash code to access database
Use case: Managerial tool to upload files to cloud s3 buckets, e.g. photos to tweet, etc.
Requires authentication
Response: When a user uploads a file from the website or mobile app, a POST is made to the bucket.

Path: POST upload/file/{file}/{access_token}
'''

import json
import sys
import boto3

def parse_path(path):
    path = path.split('/')
    #path[0] = '', path[1] = "Front-End", other options...
    return path[2:]

def upload_file(event, context):

    s3 = boto3.resource("s3")
    bucket_name = "0bucket2019"
    s3.meta.client.upload_file('hello.txt', bucket_name, '/hello.txt')
    #s3.Object(bucket_name, "hello.txt").put(Body=open("hello.txt", 'rb'), ACL='public-read')
    
    
    testfile = "hello.txt"
    print('Uploading %s to Amazon S3 bucket %s' % \
       (testfile, bucket_name))
    
    def percent_cb(complete, total):
        sys.stdout.write('.')
        sys.stdout.flush()
    
    '''
    k.key = 'hello.txt'
    k.set_contents_from_filename(testfile,
        cb=percent_cb, num_cb=10)
        
    '''