import json
import boto3

def account_login(request_token):
    stored_username = None #Replace 'None' with getting the request_token from the cloud 
    #Get password from request_token somehow
    frontend_password = None #Replace 'None' with getting the password from the request_token
    #If username does not exist throw a 403 Error
    if(stored_username == None):
        return{
            'statusCode': 403 #Forbidden
        } 
    #Else get password
    stored_password = None #Replace 'None' with getting from the cloud 
    #If passwords do not match throw a 403 Error
    if(frontend_password != stored_password):
        return{
            'statusCode': 403 #Forbidden
        } 
    #Else throw a 200 OK
    return{
        'statusCode': 200 #OK
    }