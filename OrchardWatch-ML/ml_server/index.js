const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const queryString = require('querystring')
const path = require('path')


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

//Function to handle Prediction
//Requires modelName and imageURL parameters
//Returns prediction
app.get('/predict', function (req, res) {
	let modelName = req.query.modelName
	let imageURL = req.query.imageURL
	if(modelName === undefined || imageURL === undefined) {
		res.send('Error: request is missing required parameters')
	}
	
	const spawn = require('child_process').spawn
	var process = spawn('python',[path.join(__dirname, "testPred.py"), modelName, imageURL]);

	process.stdout.on('data', function(data) {
		res.send(data.toString());
	} );

})

//Function to handle model upload
//Requires modelName parameter
app.post('/upload/new', function (req, res) {
	let modelName = req.query.modelName
	if(modelName === undefined) {
		res.send('Error: no modelName given')
	}

	res.send('Example: uploaded ' + modelName + ' model')
})

//Function to handle model replacement
app.put('/upload/replace', function (req, res) {
	let modelName = req.query.modelName
	if(modelName === undefined) {
		res.send('Error: no modelName given')
	}
	res.send('Example: replaced existing model with ' + modelName + ' model')
})

//Function handle sending back a list of models


app.listen(port, () => console.log('Example app listening on port '+port+'!'))

