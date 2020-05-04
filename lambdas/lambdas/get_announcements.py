import json
from operator import itemgetter
from orchard_watch import query_db
from orchard_watch import respond

annoucement_schema = [
    ['annoucementid', 'longValue'],
    ['title', 'stringValue'],
    ['description', 'stringValue'],
    ['dateTime', 'stringValue'],
    ['email', 'stringValue']
]


def annoucement_entry_to_dict(entry):
    annoucement = {}
    for index, data in enumerate(entry):
        # print(str(data))
        if ('isNull' in data.keys()):
            continue
        annoucement[annoucement_schema[index][0]] = data[annoucement_schema[index][1]]
    # print(str(annoucement))
    return annoucement


def lambda_handler(event, context):
    print(str(event))
    
    query = "SELECT * FROM announcements"
    result = query_db(query)
    records = result['records']
    annoucements = []
    for record in records:
       annoucements.append(annoucement_entry_to_dict(record))
    sorted_annoucements = sorted(annoucements, key=itemgetter('dateTime'), reverse=True)

    # for a in announcements:
    #     print(a)
    # sorted(announcements, key = lambda i: i['age'])
    # print(result['records'])
    print(sorted_annoucements)

    return respond(statusCode = "200", res = result['records'])
