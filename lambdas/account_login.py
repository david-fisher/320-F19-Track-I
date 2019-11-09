import json
import boto3
import psycopg2

def account_login(frontend_username,frontend_password):
   #First connect to the table 
    connection = psycopg.connect(database = "User", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()

    #Check if the user exist in the database
    existing_user = cur.execute("SELECT UserID from User having UserID == requested_UserID") #Not sure I can go and make a variable out of the select
    if(existing_user == None):
        return {
            'statusCode': 403 #Forbidden
        }  
    #Get password from existing user
    existing_password = cur.execute("SELECT Password from User having UserID == existing_user")
    if(existing_password == frontend_password):
        return {
            'statusCode': 200
            #Send back a token if okay in valid session table 
        }
    return 'statusCode': 403