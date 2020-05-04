import boto3
import json

def lambda_handler(event, context):
    client = boto3.client('rds-data')
    
    query = "SELECT * FROM UserData"
    
    query_results = client.execute_statement(
        secretArn = "arn:aws:secretsmanager:us-east-2:007372221023:secret:rds-db-credentials/cluster-BZEL6PSDLGVBVJB6BIDZGZQ4MI/admin320-fsoCse",
        database = "db320",
        resourceArn = "arn:aws:rds:us-east-2:007372221023:cluster:database320",
        sql = query
        )
        
    return{
        'statusCode' : 200,
        'body' : query_results['records']
    }
