import json
from botocore.vendored import requests #deprecated - only use for local testing

def lambda_handler(event, context):
    URL = 'http://webservice-dev.hobolink.com/restv2/public/devices/1216485/data_files/latest/txt' 
  
    # sending get request and saving the response as response object 
    r = requests.get(url = URL) 
    
    # extracting data in json format 
    data = r.text

    return {
        'statusCode': 200,
        'body': json.dumps(data)
    }
