DB_CLUSTER = "database320"
DB_NAME = "db320"
MASTER_USERNAME = "admin320"
MASTER_PASSWORD = "pwFor320"
ARN = "arn:aws:rds:us-east-2:007372221023:cluster:database320"
SECRET_ARN = "arn:aws:secretsmanager:us-east-2:007372221023:secret:rds-db-credentials/cluster-BZEL6PSDLGVBVJB6BIDZGZQ4MI/admin320-fsoCse"

#errors:
USER_EXISTS="An account has already been created with this username"
USER_DNE   ="Email or password is incorrect"


def respond(err, res={}, statusCode=None):
    return {
        'statusCode': statusCode if statusCode else '200',
        'body': json.dumps(err) if err else json.dumps(res),
        'headers': {
            'Content-Type': 'application/json',
            'X-Content-Type-Options': 'nosniff',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        },
    }