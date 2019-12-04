import boto3
#import psycopg2
import uuid

'''
 /account/register/{email}/{pass}/{permission_token}
 /account/login/{email}/{password}
 /account/password_request/{email}
 /account/password_update/{email}/{passwd}
 /account/update_about/{token}/{field}/{update}
 /account/data_download/profile/{token}/{email}

'''

def register(options):
    #options: a list of variables
    email = options[0]
    password = options[1]
    requested_token=options[2]
    
   #First connect to the table 
    connection = psycopg2.connect("dbname = User user = CloudTeam password = CloudTeam")
    cursor = connection.cursor()
    
    #Check if the user already exist in the database
    cursor.execute("SELECT Email from User having Email == email")
    existing_user = cursor.fetchone()
    if(existing_user != []):
        return{
            'statusCode': 403 #Forbidden
        }
    cursor.close()
   
    #If they do not exist in the database, add them
    input_data = "INSERT INTO User(UserID,Email,Password) VALUES(%s,%s,%s)"
    connection = psycopg2.connect("dbname = User user = CloudTeam password = CloudTeam")
    cursor = connection.cursor()
    cursor.execute(input_data,(email,email,password))
    #Add lines to handle the requested_token
    connection.commit()
    connection.close()
    
    #Return success
    return{
        'statusCode': 200 #OK
    }
    
def login(options):
    frontend_email = options[0]
    frontend_password = options[1]
   #Connect to the User Database
    connection = psycopg2.connect(database = "User", user = "postgres",password = "pass123", host = "127.0.0.1", port = "5432")
    cursor = connection.cursor()

   #Check if the user does not exist in the database
    cursor.execute("SELECT Email from User having Email == email")
    existing_user = cursor.fetchone()
    if(existing_user == []):
        return{
            'statusCode': 403 #Forbidden
        }
    
    #Get password from existing user and if does not match return a 400 http
    existing_password = cursor.execute("SELECT Password from User having UserID == existing_user")
    connection.commit() 
    if(existing_password == frontend_password):
        return {
            'statusCode': 403 #Forbidden
        }
    
    #Create a token and then push it into the database
    token = uuid.uuid4()
    cursor.execute("INSERT INTO Tokens (Email,Token) \
                 VALUES (frontend_email,token)")
    connection.commit()
    connection.close()
    return{
        'statusCode': 200 #OK
    }
    
def test(options):
    print("we made it to the test")
    print(options)