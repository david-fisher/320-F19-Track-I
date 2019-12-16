import boto3
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
Note: Anything with an auth token is TBD
'''

def register(options):
    #options: a list of variables
    given_email = options['email']
    given_password = options['pass']
    #HASH here
    given_password = auth.hash_password(given_password)
    #First connect to the table 
    client = boto3.client('rds-data')
    #Check if the user already exist in the database and throw a 400 statuscode if they do
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT email FROM UserData WHERE email = '%s'" % (given_email)
    )
    if(existing_user['records'] != []):
        print("user exists already")
        constants.ERR = "User already exists"
        constants.STATUS_CODE = 409
        return    
    
    existing_user = client.execute_statement(
       secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "INSERT INTO UserData (email, pass, type, name) VALUES ('%s','%s','%s','%s')" % (given_email,given_password,0,given_email)
    )
    #Return success
    return constants.respond(statusCode="200") #OK
    
def login(options):
    print("Attempting to login:");
    print(options)
    
    if 'email' not in options:
        print("no email")
    if 'pass' not in options:
        print("no pass")   
    
    given_email = options['email']
    given_password = options['pass']

    
    print(given_email)
    print(given_password)

    #Connect to the User Database
    client = boto3.client('rds-data')
    print("Connecting to table...")
    #Check if the user does not exist in the database
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT email FROM UserData WHERE email = '%s';" % (given_email)
    )
    print("Checking if user exists...")
    if(existing_user['records'] == []):
        print("user DNE")
        constants.ERR = "User DNE"
        constants.STATUS_CODE = 404
        return


    #Get password from existing user and if does not match return a 400 http
    print("User exists! Acquiring password...")
    existing_password = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT pass FROM UserData WHERE email = '%s';" % (given_email)
    )
    print("Checking password...")
    if not auth.verify_password(existing_password['records'][0][0]['stringValue'], given_password):
        constants.ERR = "Password DNE"
        constants.STATUS_CODE = 404
        return    
    
    #Get user type from Database
    print("Password verified. Checking perms...")
    user_type = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT type FROM UserData WHERE email = '%s';" % (given_email)
    )
    
    user_type = user_type['records'][0][0]['longValue']
    if user_type == 1:
        user_type = constants.GROWER
    elif user_type == 2:
        user_type = constants.RESEARCHER
    else:
        user_type = constants.PUBLIC_USER
    token = create_token.rand_token()
    
    #Return success
    print("Done!")
    constants.RES = {'token': str(token), 'user':str(user_type)}
    return   

def update_password(options):
    given_email = options['email']
    given_password = options['pass']
    given_password = auth.hash_password(given_password)
    
    #First connect to the table 
    client = boto3.client('rds-data')
 
    #Check that the user exists
    existing_user = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT email FROM UserData WHERE email = '%s';" % (given_email)
    )
    if(existing_user['records'] == []):
        constants.ERR = "Password DNE"
        constants.STATUS_CODE = 404
        return
    
    #Replace password in database
    client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql="UPDATE UserData SET pass = '%s' WHERE email = '%s';" % (given_password,given_email)
    )
    
    #Return success
    return
    
def authorization_mobile(options):
    given_code = int(options['code'])
    #First connect to the table
    client = boto3.client('rds-data')
    #Check that the ID exists
    existing_code = client.execute_statement(
        secretArn = constants.SECRET_ARN, 
        database = constants.DB_NAME,
        resourceArn = constants.ARN,
        sql = "SELECT code FROM AccessCode WHERE code = '%s';" % (given_code)
    )
    #If not throw 403
    if(existing_code['records'] == []):
        constants.ERR = "Invalid auth token"
        constants.STATUS_CODE = 403
        return
    #Else is okay
    return 

def test(options):
    print("we made it to the test")
    print(options)