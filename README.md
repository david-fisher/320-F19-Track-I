# 320-F19-Track-I
Track I's group repo

Cloud ReadMe: https://docs.google.com/document/d/1k0181gewVp19XArXAj7xxkGVA-chNAXpR9EjDduFE5g/edit?usp=sharing
<br>
Lambda ReadMe: https://docs.google.com/document/d/1S2nB-h8b8W-1gqJwFjSzPcWSGWTKmgBV7qOFeDA5s1A/edit?usp=sharing
<br>
ML ReadMe: https://drive.google.com/open?id=1N6ivwwzdQJ0H26iGxli4tASeUj6fZ6gZ

# Track I's Lambdas

Welcome to track I's lambdas. 
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
* lol idk everything is probably broken. GETs do not have bodies please never use them
