const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const queryString = require('querystring')
const path = require('path')


const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Function to handle Prediction
//Requires modelName and imageURL parameters
//Returns prediction
app.get('/predict', function (req, res) {
	let functionFlag = 'predict'
	let modelName = req.query.modelName
	let imageURL = req.query.imageURL
	if(modelName === undefined || imageURL === undefined) {
		res.status(412).json({error: 'Missing Parameter'})
		return;
	}
	console.log(modelName)
	console.log(imageURL)
	const spawn = require('child_process').spawn

	var fs = require('fs');
	var path_f = path.join(__dirname, '../prediction/model_manager.py')
	

	var process = spawn('python',[path_f, functionFlag, modelName, imageURL]);
	
	var outputs = [];
	var errors = [];

	console.log("spawned")
	process.stdout.on('data', function(data) {
		outputs.push(data.toString());
		console.log(data.toString());
	} );
	
	process.stderr.on('data', (data) => {
		errors.push(data.toString());
		console.error(`stderr: ${data}`);
	});
	
	process.on('close', (code) => {
    	console.log(`child process exited with code ${code}`);
		if(code == 0) {
			res.json(outputs[outputs.length - 1]);
		}
		else {
            res.send(errors[errors.length - 1]);
		}
	});

})

//Function to handle model upload
//Requires modelName parameter
app.post('/upload/new', function (req, res) {
	let functionFlag = 'upload'
	let modelFileURL = req.query.modelFileURL
	let modelName = req.query.modelName
	let modelType = req.query.modelType
	if(modelName === undefined || modelType === undefined || modelFileURL === undefined) {
		res.status(412).json({error: 'Missing Parameter'})
		return;
	}

	const spawn = require('child_process').spawn

	var fs = require('fs');
	var path_f = path.join(__dirname, '../prediction/model_manager.py')

	var process = spawn('python',[path_f, functionFlag, modelFileURL, modelName, modelType]);
	
	var outputs = [];
	var errors = [];

	console.log("spawned")
	process.stdout.on('data', function(data) {
		outputs.push(data.toString());
		console.log(data.toString());
	} );
	
	process.stderr.on('data', (data) => {
		errors.push(data.toString());
		console.error(`stderr: ${data}`);
	});
	
	process.on('close', (code) => {
    	console.log(`child process exited with code ${code}`);
		if(code == 0) {
			res.send(outputs[outputs.length - 1]);
		}
		else {
            res.send(errors[errors.length - 1]);
		}
	});

})

//Function to handle model replacement
app.put('/upload/replace', function (req, res) {
	let functionFlag = 'upload'
	let modelFileURL = req.query.modelFileURL
	let modelName = req.query.modelName
	let modelType = req.query.modelType
	if(modelName === undefined || modelType === undefined || modelFileURL === undefined) {
		res.status(412).json({error: 'Missing Parameter'})
		return;
	}
	const spawn = require('child_process').spawn

	var fs = require('fs');
	var path_f = path.join(__dirname, '../prediction/model_manager.py')

	var process = spawn('python',[path_f, functionFlag, modelFileURL, modelName, modelType]);

	var outputs = [];
	var errors = [];

	console.log("spawned")
	process.stdout.on('data', function(data) {
		outputs.push(data.toString());
		console.log(data.toString());
	} );
	
	process.stderr.on('data', (data) => {
		errors.push(data.toString());
		console.error(`stderr: ${data}`);
	});
	
	process.on('close', (code) => {
    	console.log(`child process exited with code ${code}`);
		if(code == 0) {
			res.send(outputs[outputs.length - 1]);
		}
		else {
            res.send(errors[errors.length - 1]);
		}
	});
	
})

//Function handle sending back a list of models
app.get('/models/list', function (req, res) {
	let functionFlag = 'list'

	const spawn = require('child_process').spawn

	var fs = require('fs');
	var path_f = path.join(__dirname, '../prediction/model_manager.py')

	var process = spawn('python',[path_f, functionFlag]);

	var outputs = [];
	var errors = [];

	console.log("spawned")
	process.stdout.on('data', function(data) {
		outputs.push(data.toString());
		console.log(data.toString());
	} );
	
	process.stderr.on('data', (data) => {
		errors.push(data.toString());
		console.error(`stderr: ${data}`);
	});
	
	process.on('close', (code) => {
    	console.log(`child process exited with code ${code}`);
		if(code == 0) {
			res.json(outputs[outputs.length - 1]);
		}
		else {
            res.send(errors[errors.length - 1]);
		}
	});
	
})

app.listen(port, () => console.log('OrchardWatch Machine Learning Service listening on port '+port+'!'))

