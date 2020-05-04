import json
import boto3

def lhandler(event, context):

    #TODO
    #Implement actual authentication against token
    client = boto3.client('rds-data')
    
    #Parse query string params
    authentication_token = event['queryStringParameters']['authentication_token']
    
    #check if code is valid
    existing_code = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:007372221023:secret:rds-db-credentials/cluster-BZEL6PSDLGVBVJB6BIDZGZQ4MI/admin320-fsoCse", 
        database = "db320",
        resourceArn = "arn:aws:rds:us-east-2:007372221023:cluster:database320",
        sql = "SELECT code FROM AccessCode WHERE code = '%s';" % (authentication_token)
    )
    
    #Logic
    if(existing_code['records'] == []):
        authMessage = "Invalid auth token"
        auth_result = 0
        statusCode = 403
    else:
        authMessage = "Authentication successful"
        statusCode = 200
        auth_result = 1
    
    #Construct body of response object
    authenticationResponse = {}
    authenticationResponse['authentication_token'] = authentication_token
    authenticationResponse['auth_result'] = auth_result
    authenticationResponse['message'] = authMessage
    
    #Construct http response object
    responseObject = {}
    responseObject['statusCode'] = 200
    responseObject['headers'] = {}
    responseObject['headers']['Content-Type'] = 'application/json'
    responseObject['body'] = json.dumps(authenticationResponse)
    
    #Return response object
    return responseObject
