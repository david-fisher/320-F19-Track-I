import boto3
import psycopg2

def registration(requested_UserID,requested_Email,requested_Password,requested_UserType,requested_Name,requested_About):
   #First connect to the table 
    connection = psycopg2.connect(database = "User", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()
    
    #Check if the user already exist in the database
    existing_user = cursor.execute("SELECT UserID from User having UserID == requested_UserID") #Not sure I can go and make a variable out of the select
    connection.commit()
    if(existing_user != None):
        return{
            'statusCode': 403 #Forbidden
        }
    
    #If they do not exist in the database, add them
    cursor.execute("INSERT INTO User (UserID,Email,Password,UserType,Name,About) \
                 VALUES (requested_UserID,requested_Email,requested_Password,requested_UserType,requested_Name,requested_About)")
    connection.commit()
    connection.close()
    return{
        'statusCode': 200 #OK
    }