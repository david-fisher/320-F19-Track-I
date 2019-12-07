#TODO implement functions
import boto3
import json

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
    sql = options[0]
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
def data_download(token, start_time, end_time, field):

    client = boto3.client('rds-data')
    
    # Prepared SQL Statement: Queries for entries where time column value is between start_time and end_time
    sql_select_statement = "SELECT * FROM HoboData WHERE time BETWEEN {} AND {}"format(start_time, end_time)
    
    query_results = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = sql_select_statment
        )
    
    # List to hold JSON objects
    requested_data = []

    # Iterate through query results
    for row in query_results:
        data = { }
        
        # JSON will contain values for each requested field
        for each in field:
            data[each] = row[each]
            
        # Add each JSON to return array
        requested_data.append(data)

    return requested_data
