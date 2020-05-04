import json
from orchard_watch import query_db
from orchard_watch import respond


def lambda_handler(event, context):
    print(str(event))
    body_str = event['body']
    body = json.loads(body_str)
    
    # Escape characters for SQL query
    for key in ['title', 'description', 'date', 'email']:
        body[key] = body[key].replace("'", "''")
    
    query_str = f"INSERT INTO announcements (title, description, date, email) VALUES ('{body['title']}', '{body['description']}', '{body['date']}', '{body['email']}')"
    print(query_str)
    result = query_db(query_str)
    print(str(result))
    return respond(statusCode="200", res="Successfully added announcement.")
