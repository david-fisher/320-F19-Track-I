import account, data, social, picture, ml, json, constants

def parse_path(path):
    #path: string representing the path that the user requested
    path = path.split('/')
    #path[0] = '', path[1] = "Front-End", other options...
    return path[2:]
    
def route(options, body):
    #options: a list of strings that defines what functionality the user requested, includes user passed variables
    routes = {'account':account, 'data':data, 'social':social, 'picture':picture, 'ml':ml}
    
    try:
        main_func = routes[options[0]] #something in the routes dictionary above
        assert hasattr(main_func, options[1])
        func_call = getattr(main_func, options[1]) #something like account.login
        #TODO assert that everything checks out
        #actually call the thing
    except:
        return constants.respond(err = "Bad Path", statusCode = "400") 
        
    if(body is None):
        func_call(options)
    else:
        func_call(body)


    
def main(event, context):

    constants.ERR = None
    constants.STATUS_CODE = "200"
    constants.RES = "stoopid i aint gonna let u get the chance"
    
    path = event['path']
    httpType = event['httpMethod']
    path = parse_path(path)
    
    if('' in path):
        return constants.respond(err="Parse error, lambda reinvoked", statusCode = "403") 

    
    print(path)

    if(httpType == "GET"):
        print("Routing GET")
        route(path, None)
    else:
        print("Routing not GET")
        try:
            body = event['body']
        except:
            return constants.respond(err="NO BODY", statusCode = "404") 
            
        try:
            body = json.loads(body)
        except ValueError as e:
            print("body isnt json")
            return constants.respond(err="BODY IS NOT JSON", statusCode = "400")
            
        route(path, body)
    
    return constants.respond(constants.ERR, constants.RES, constants.STATUS_CODE)  
    
