import json
import boto3
import psycopg2
import uuid

def account_login(frontend_email,frontend_password):
   #First connect to the table 
    connection = psycopg.connect(database = "User", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()

    #Check if the user exist in the database and if not return a 400 http 
    existing_user = cursor.execute("SELECT Email from User having Email == frontend_email") #Not sure I can go and make a variable out of the select
    if(existing_user == None):#Not sure if returns None if can not find user
        return {
            'statusCode': 403 #Forbidden 
        }  
    
    #Get password from existing user and if does not match return a 400 http
    existing_password = cursor.execute("SELECT Password from User having UserID == existing_user")
    if(existing_password == frontend_password):
        return {
            'statusCode': 403 #Forbidden
        }
    
    #Create a token and then push it into the database
    token = uuid.uuid4()
    cursor.execute("INSERT INTO Tokens (Email,Token) \ VALUES (frontend_email,token)") #I don't think this table exist 
    return{
        'statusCode': 200 #OK
    }
