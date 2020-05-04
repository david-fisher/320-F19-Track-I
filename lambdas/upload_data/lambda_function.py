import json
from orchard_watch import query_db
from orchard_watch import respond

def lambda_handler(event, context):
    print(str(event))

    body_str = event['body']
    body = json.loads(body_str)
    orch_id = event['pathParameters']['id']
    query_str = "UPDATE orchard SET "
    vars_to_change = []
    for key in ['averagenumberclusters', 'potentialfruitpertree', 'targetfruitpertree', 'lastupdated']:
        if (key in body.keys()):
            if (key == 'lastupdated'):
                vars_to_change.append("%s = '%s'" % (key, body[key]))
            else:
                vars_to_change.append("%s = %s" % (key, body[key]))
    query_str += ', '.join(vars_to_change)
    query_str += (" WHERE orchardid = %s" % orch_id)
    print(query_str)
    result = query_db(query_str)
    print(str(result))
    return respond("Upload successful", 200)
