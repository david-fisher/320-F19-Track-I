import boto3
import hashlib
import binascii
import os
import json
from sql_assist import query_db

#Don't make the same mistake I did the b is supposed to b there
SALT = b'89a9880855f7adf8eb780f800c2f756dd31f6f3dd901622e755f9432e93da028'

def lambda_handler(event, context):
    print(str(event))
    body = event['body']
    body_json = json.loads(body)
    options = body_json
    
    #options: a list of variables
    # options = event['queryStringParameters']
    given_email = options['email']
    given_password = options['password']
    given_name = options['first_name'] + ' ' + options['last_name']
    access_type = 0
    error = None 


    #Hashes password (swiper no swiping)
    given_password = hash_password(given_password)

    #Connect to the table 
    client = boto3.client('rds-data')

    #Check if the user already exist in the database
    #   if they do throw 400 error code
    #   else insert new user into database
    existing_user = query_db("SELECT email FROM UserData WHERE email = '%s'" % (given_email))
    if(existing_user['records'] != []):
        print("User already exists")
        error = "User exists"
        statusCode = 409
    else:
        existing_user = query_db("INSERT INTO UserData (email, pass, name, type) VALUES ('%s','%s','%s','%s')" % (given_email,given_password,given_name, 0))
        statusCode = 200
        
    #Construct http response object
    registerResponse = {}
    registerResponse['message'] = "everything successful"
    
    return respond(err = error, res = registerResponse, statusCode = statusCode)


def hash_password(password):
    #Hash password to be stored securely
    salt = SALT
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')

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
