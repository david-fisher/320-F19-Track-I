import account
import data
import social
import picture
import ml
import json

def parse_path(path):
    #path: string representing the path that the user requested
    path = path.split('/')
    #path[0] = '', path[1] = "Front-End", other options...
    return path[2:]
    
def route(options, body):
    #options: a list of strings that defines what functionality the user requested, includes user passed variables
    routes = {'account':account, 'data':data, 'social':social, 'picture':picture, 'ml':ml}
    main_func = routes[options[0]] #something in the routes dictionary above
    assert hasattr(main_func, options[1])
    func_call = getattr(main_func, options[1]) #something like account.login
    #TODO assert that everything checks out
    #actually call the thing
    func_call(body)

    
def main(event, context):
    path = event['path']
    body = event['body']
    #print("BODY", body)
    body = json.loads(body)
    print(path)
    print(body, "TYPE", type(body))
    path = parse_path(path)
    
    route(path, body)