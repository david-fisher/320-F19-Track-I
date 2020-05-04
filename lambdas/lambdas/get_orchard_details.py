import boto3
import os
import json
import sql_assist


def lambda_handler(event, context):
    result = sql_assist.query_db("SELECT type FROM UserData WHERE email = 'test@test.com';")
    print(str(result))
    
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
