import json
import boto3
import psycopg2

def update_password(userID, new_password):
    #Assumtion: userID is correct 
    #First connect to the table 
    connection = psycopg.connect(database = "User", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()
    
    #Replace in database
    cursor.execute("UPDATE Users set Password = new_password where UserID = userID")
    return{
        'statusCode': 200
    }
