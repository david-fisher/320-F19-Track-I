import json

DB_CLUSTER = "database320"
DB_NAME = "db320"
MASTER_USERNAME = "admin320"
MASTER_PASSWORD = "pwFor320"
ARN = "arn:aws:rds:us-east-2:007372221023:cluster:database320"
SECRET_ARN = "arn:aws:secretsmanager:us-east-2:007372221023:secret:rds-db-credentials/cluster-BZEL6PSDLGVBVJB6BIDZGZQ4MI/admin320-fsoCse"

#errors:
ERR = None
STATUS_CODE = "200"
RES = "Success"

#USER TYPES
PUBLIC_USER='p'
GROWER='g'
RESEARCHER='r'


#AUTH
SALT=b'89a9880855f7adf8eb780f800c2f756dd31f6f3dd901622e755f9432e93da028'

def respond(err=None, res="{}", statusCode=None):
    return {
        'statusCode': statusCode if statusCode else '200',
        'body': json.dumps(err) if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': '*'
        },
    }