import boto3
import uuid
import create_token
import constants
import auth
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
    given_email = options['email']
    given_password = options['pass']
    #HASH here
    given_password = auth.hash_password(given_password)
    #First connect to the table 
    client = boto3.client('rds-data')
    print("SELECT email FROM UserData WHERE email = '{}';".format(given_email))
    #Check if the user already exist in the database and throw a 400 statuscode if they do
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT email FROM UserData WHERE email = '{}';".format(given_email)
    )
    if(existing_user['records'] != []):
        print("User already exists")
        return constants.respond(err=constants.USER_EXISTS, statusCode="403")  #Forbidden
   
    #If they do not exist in the database, add them
    existing_user = client.execute_statement(
       secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "INSERT INTO UserData (email, pass, type, name) VALUES ('{}','{}','{}', '{}');".format(given_email, given_password,0, "chinmay")
    )

    #Return success
    print("Okay")
    return constants.respond(statusCode="200") #OK
    
def login(options):
    print("OPTIONS", options)
    given_email = options['email']
    given_password = options['pass']
    #HASH
    #Connect to the User Database
    client = boto3.client('rds-data')

    #Check if the user does not exist in the database
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT email FROM UserData WHERE email = '{}';".format(given_email))
    if(existing_user['records'] == []):
        print("User does not exist")
        return constants.respond(err=constants.USER_DNE, statusCode="403") #Forbidden
    
    #Get password from existing user and if does not match return a 400 http
    existing_password = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT pass FROM UserData WHERE email = '{}';".format(given_email))
    if(existing_password['records'] != given_password):
        print("Password does not match")
        return {'statusCode': 403} #Forbidden
    
    #Return success
    print("Okay")
    return{'statusCode': '200', 'token': "blahblahblah", 'user':'grower/researcher/public'} #OK
    
def update_password(options):
    given_email = options['email']
    given_password = options['pass']
    #First connect to the table 
    client = boto3.client('rds-data')
 
    #Check that the user exists
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT email FROM UserData WHERE email = '{}';".format(given_email))
    if(existing_user['records'] == []):
        print("User does not exist")
        return {'statusCode': 403} #Forbidden  

    #Replace password in database
    client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql="UPDATE UserData SET pass = given_password WHERE email = '{}';".format(given_password))
    
    #Return success
    print("Okay")
    return{'statusCode': 200}
    
def authorization_mobile(options):
    given_ID = options['ID']
    given_code = options['code']

    #First connect to the table
    client = boto3.client('rds-data')

    #Check the table to see if the given_code matches anything in the database
    existing_code = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT code FROM AccessCodes WHERE UserID = '{}';".format(given_ID))
    
    #If a code does not exist
    if(existing_code == []):
        return {'statusCode' : 403} #Forbidden
    return constants.respond(statusCode= "200") #OK

def test(options):
    print("we made it to the test")
    print(options)