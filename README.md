# Track I's Lambda Branch

Welcome to track I's lambda branch. 
<br>
<img src="Freeman-fischer.png" width="100" height="200">


# Set up
### Prereqs:

1. IDE of choice is Visual Studio Code. Some general tasks are provided. Suggested plugins are python and tasks.
2. Install [AWS](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html) and its dependencies 
    * Note: If you have Win10 you have to put up with Docker Toolbox for running functions locally
   
### How the heck do I deploy?
   1. Zip whatever code you want bundled together in a lambda (I recommend manually zipping through 7zip or alike)
   2. run `aws configure` and put in your iam role permissions
   3. run `aws lambda update-function-code --function-name {LAMBDA NAME HERE} --zip-file fileb://{LOCATION OF ZIP}`
      * If you ever forget, there's a pre-defined deploy task already 
   4. bam your code is deployed

# Progress
* lambda function that GETs to an endpoint and spits out unformated txt. Requires formatting and query based on time.

