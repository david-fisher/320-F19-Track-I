import json
import boto3
import hashlib
import binascii
import os
import random
import string

def rand_token(N=64):
    return ''.join(random.choices(string.ascii_uppercase + string.digits + string.ascii_lowercase, k=N))

DB_CLUSTER = "database320"
DB_NAME = "db320"
MASTER_USERNAME = "admin320"
MASTER_PASSWORD = "pwFor320"
ARN = "arn:aws:rds:us-east-2:007372221023:cluster:database320"
SECRET_ARN = "arn:aws:secretsmanager:us-east-2:007372221023:secret:rds-db-credentials/cluster-BZEL6PSDLGVBVJB6BIDZGZQ4MI/admin320-fsoCse"

#USER TYPES
PUBLIC_USER='p'
GROWER='g'
RESEARCHER='r'

#AUTH
SALT=b'89a9880855f7adf8eb780f800c2f756dd31f6f3dd901622e755f9432e93da028'

def respond(err=None, res="{}", statusCode=None):
    if (err is not None):
        err = {'message': err}
        
    return {
        'statusCode': statusCode if statusCode else '200',
        'body': json.dumps(err) if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*'
            
        },
    }
    
def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                  provided_password.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    print("DO THESE MATCH?", pwdhash, stored_password)
    return pwdhash == stored_password


def lambda_handler(event, context):
    print(str(event))
    # path = event['path']
    # httpType = event['httpMethod']
    # path = parse_path(path)
    
    # print(path)
    
    body = event['body']
    body_json = json.loads(body)
    
    # route path, body
    options = body_json
    
    print("Attempting to login:");
    print(options)
    
    if 'email' not in options:
         return respond(err="No email", statusCode="400")
    if 'pass' not in options:
         return respond(err="No password", statusCode="400")  
    
    given_email = options['email']
    given_password = options['pass']

    
    print(given_email)
    print(given_password)

    #Connect to the User Database
    client = boto3.client('rds-data')
    print("Connecting to table...")
    #Check if the user does not exist in the database
    existing_user = client.execute_statement(
        secretArn = SECRET_ARN, 
        database = DB_NAME,
        resourceArn = ARN,
        sql = "SELECT email FROM UserData WHERE email = '%s';" % (given_email)
    )
    print("Checking if user exists...")
    if(existing_user['records'] == []):
        print("user DNE")
        return respond(err="User DNE", statusCode="404")


    #Get password from existing user and if does not match return a 400 http
    print("User exists! Acquiring password...")
    existing_password = client.execute_statement(
        secretArn = SECRET_ARN, 
        database = DB_NAME,
        resourceArn = ARN,
        sql = "SELECT pass FROM UserData WHERE email = '%s';" % (given_email)
    )
    print("Checking password...")
    if not verify_password(existing_password['records'][0][0]['stringValue'], given_password):
        return respond(statusCode="404", err="Password DNE")
    
    #Get user type from Database
    print("Password verified. Checking perms...")
    user_type = client.execute_statement(
        secretArn = SECRET_ARN, 
        database = DB_NAME,
        resourceArn = ARN,
        sql = "SELECT type FROM UserData WHERE email = '%s';" % (given_email)
    )
    
    user_type = user_type['records'][0][0]['longValue']
    if user_type == 1:
        user_type = GROWER
    elif user_type == 2:
        user_type = RESEARCHER
    else:
        user_type = PUBLIC_USER
    token = rand_token()
    
    #Return success
    print("Done!")
    RES = {'token': str(token), 'user':str(user_type)}
    return respond(statusCode="200", res=RES)

