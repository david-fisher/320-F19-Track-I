import json
from orchard_watch import query_db
from orchard_watch import respond

def get_position(num):
    return ['public', 'grower', 'researcher'][num]

user_schema = [
    ['userid', 'longValue'],
    ['email', 'stringValue'],
    ['pass', 'stringValue'],
    ['type', 'longValue'], # 0 public, 1 grower, 2 researcher
    ['name', 'stringValue'],
    ['about', 'isNull']
]

def lambda_handler(event, context):
    print(str(event))
    email = event['pathParameters']['email']
    query_str = "SELECT * FROM UserData where email = '" + email + "'"
    response = query_db(query_str)
    user_data = response['records'][0]
    user = {
        'name': user_data[4]['stringValue'],
        'position': get_position(user_data[3]['longValue']),
        'email': user_data[1]['stringValue']
    }
    print(str(user))
    return respond(statusCode="200", res=user)
