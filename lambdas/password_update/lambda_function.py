import hashlib
import binascii
import os
import json
from sql_assist import query_db

SALT = b'89a9880855f7adf8eb780f800c2f756dd31f6f3dd901622e755f9432e93da028'

def hash_password(password):
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

def lambda_handler(event, context):
    # Extract email and new password from list of parameters
    print(str(event))
    body = event['body']
    body_json = json.loads(body)
    options = body_json
    
    given_email = options['email']
    given_password = options['pass']
    given_password = hash_password(given_password)

    # Check that the user exists
    user_sql = "SELECT email FROM UserData WHERE email = '%s';" % (given_email)
    existing_user = query_db(user_sql)
    
    if(existing_user['records'] == []):
        return respond(statusCode="404", err="User DNE")
    
    # Replace password in database
    update_sql="UPDATE UserData SET pass = '%s' WHERE email = '%s';" % (given_password,given_email)
    query_db(update_sql)
    
    # TODO:  Outsource code to Lambda layer
    response = {}
    response['message'] = "Success"
    return respond(res=response, statusCode="200")
