#TODO implement functions
import boto3
import constants

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
        
def test_db(options):
    sql = options['sql']
    print(sql)
    rds_client = boto3.client('rds-data')
    response = rds_client.execute_statement(
        secretArn="arn:aws:secretsmanager:us-east-2:007372221023:secret:rds-db-credentials/cluster-BZEL6PSDLGVBVJB6BIDZGZQ4MI/admin320-fsoCse",
        database="db320",
        resourceArn="arn:aws:rds:us-east-2:007372221023:cluster:database320",
        sql=sql
    )
    print(len(response))
    return response

# GET: Queries database for entries with a timestamp between start_time and end_time
# Returns list of JSON objects containing requested fields
def data_download(options):
    token, start_time, end_time, field = list(options.values())
    client = boto3.client('rds-data')
    
    # Prepared SQL Statement: Queries for entries where time column value is between start_time and end_time
    # debug_query = "SELECT * FROM HoboData"
    # query = "SELECT * FROM HoboData WHERE time BETWEEN '{}' AND '{}'".format(start_time, end_time)
    
    # Is this better? Still unsure about SQL Injection safety
    better_query = "SELECT * FROM HoboData WHERE time BETWEEN '%s' AND '%s';" % (start_time, end_time,)
    
    # RDSDataService method for database querying
    query_results = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = better_query
        )
    
    # Returns 'records' from query_result object
    # 'records' is a list of lists, where each inner list represents a row
    # Each row is a dictionary defining the value for the corresponding column
    return query_results['records']
   
def data_upload(options):
    time = options["time"]
    client = boto3.client('rds-data')
    insert_query = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "INSERT INTO HoboData (time) VALUES('{}')".format(time)
    )
    
    print("INSERT", insert_query)
    return {'statusCode':"200"}
    

def data_download_test():
    result = data_download()
