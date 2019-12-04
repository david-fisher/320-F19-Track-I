#TODO implement functions
import boto3

def upload(options):
    print(options)
    s3 = boto3.resource("s3")
    bucket_name = "0bucket2019"
    s3.meta.client.upload_file('hello.txt', bucket_name, 'hello.txt')
    #s3.Object(bucket_name, "hello.txt").put(Body=open("hello.txt", 'rb'), ACL='public-read')
    
    
    testfile = "hello.txt"
    print('Uploading %s to Amazon S3 bucket %s' % \
       (testfile, bucket_name))
    
    def percent_cb(complete, total):
        sys.stdout.write('.')
        sys.stdout.flush()