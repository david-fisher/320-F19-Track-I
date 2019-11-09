import psycopg2
import boto3
import psycopg

def registration(requested_UserID,requested_Password,requested_UserType,requested_Name,requested_About):
   #First connect to the table 
    connection = psycopg.connect(database = "User", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()
    
    #Check if the user already exist in the database
    existing_user = cur.execute("SELECT UserID from User having UserID == requested_UserID") #Not sure I can go and make a variable out of the select
    if(existing_user != None):
        return 'statusCode': 403 #Forbidden
    
    #If they do not exist in the database, add them
    cur.execute("INSERT INTO USER (UserID,Email,Password,UserType,Name,About) \
                 VALUES (requested_UserID,requested_Password,requested_UserType,requested_Name,requested_About)")
    return{
        'statusCode': 403
        #Create a token for them to use 
    }