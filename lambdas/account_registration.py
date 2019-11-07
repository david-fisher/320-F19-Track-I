import json
import boto3

def account_registration(request_token,permission_token):
    database_user = None #Change this to database.get(request_token) or something like that
    #If account exist already return Forbidden
    if(database_user != None ): #Replace 'None' with a way to get 
        return{
            'statusCode': 403 #Forbidden
        }
    #Else return OKAY
    return{
        'statusCode': 200 #OKAY
    }