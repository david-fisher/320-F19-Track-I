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

orchard_schema = [
    ['orchardid', 'longValue'],
    ['name', 'stringValue'],
    ['location', 'stringValue'],
    ['targetfruitpertree', 'doubleValue'],
    ['averagenumberclusters', 'doubleValue'],
    ['potentialfruitpertree', 'doubleValue'],
    ['lastupdated', 'stringValue']
]

def get_users():
    users_query = "SELECT * from UserData"
    users = query_db(users_query)
    records = users['records']
    users_list = []
    for record in records:
        users_list.append({
            'name': record[4]['stringValue'],
            'position': get_position(record[3]['longValue']),
            'email': record[1]['stringValue']
        })
    print(str(users_list))
    return users_list
    
def orchard_entry_to_dict(orchard_entry):
    orchard = {}
    for index, data in enumerate(orchard_entry):
        print(str(data))
        if ('isNull' in data.keys()):
            continue
        orchard[orchard_schema[index][0]] = data[orchard_schema[index][1]]
    print(str(orchard))
    return orchard
    
def get_orchards():
    orchards_query = "SELECT * from orchard"
    orchards = query_db(orchards_query)
    records = orchards['records']
    orchards_list = []
    for record in records:
       orchards_list.append(orchard_entry_to_dict(record))
    return orchards_list
    
def get_orchard(orchard_id):
    return {'numApples': 4}

def lambda_handler(event, context):
    print(str(event))
    if (event['resource'] == '/contacts'):
        users = get_users()
        return respond(err = None, res = users, statusCode = 200)
    if (event['resource'] == '/orchards'):
        if ('queryStringParameters' in event.keys() and event['queryStringParameters'] != None):
            orchard_id = event['queryStringParameters']['orchardid']
            orchard = get_orchard(orchard_id)
            return respond(err = None, res = orchard, statusCode = 200)
        else:
            orchards = get_orchards()
            return respond(err = None, res = orchards, statusCode = 200)

    return {
        'statusCode': 200,
        'body': json.dumps('Sorry, could not find data')
    }
