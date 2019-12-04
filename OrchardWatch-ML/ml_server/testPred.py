import sys
import json

output = json.dumps({"ModelName": sys.argv[1], "S3Url": sys.argv[2], "PredictedLabel": "Dog", "ConfidenceLevel": 0.9})
#j = json.loads(output)
#print(j["ModelName"])

print(output)