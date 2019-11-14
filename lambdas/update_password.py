import json
import boto3
import psycopg2

def update_password(frontend_token, new_password):
    #Connect to the Token Database
    connection = psycopg2.connect(database = "Token", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()

    #Check that token is good
    existing_token = cursor.execute("SELECT frontend_token from Token having Email == frontend_email")
    if(existing_token == None):#Not sure if returns None if can not find token
        return {
            'statusCode': 403 #Forbidden
        }  
    
    #First connect to the table 
    connection = psycopg2.connect(database = "User", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()
    
    #Replace password in database
    cursor.execute("UPDATE Users set Password = new_password where UserID = userID")
    return{
        'statusCode': 200
    }
