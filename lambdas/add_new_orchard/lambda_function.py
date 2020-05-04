import json
from datetime import date
from orchard_watch import query_db
from orchard_watch import respond

def lambda_handler(event, context):
    # TODO add entries for the other items like the individual trees and stuff
    print(str(event))
    body_str = event['body']
    body = json.loads(body_str)
    if "lastupdated" not in body.keys():
        today = date.today()
        d = today.strftime("%m/%d/%y")
        print("Today's date:  ", d)
        body['lastupdated'] = d
    query_str = f"INSERT INTO orchard (name, location, targetfruitpertree, averagenumberclusters, potentialfruitpertree, lastupdated) VALUES ('{body['name']}', '{body['location']}', {body['targetFruitPerTree']}, {body['averageNumberOfClusters']}, {body['potentialFruitPerTree']}, '{body['lastupdated']}');"
    print(query_str)
    result = query_db(query_str)
    print(str(result))
    return respond(statusCode="200", res="Successfully added orchard.")
