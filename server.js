const express = require('express');
const bodyParser = require('body-parser');
 
const wordpress = require('wordpress');
 
const port = process.env.PORT || 3100;
 
let app = express();
app.use(bodyParser.json());
 
app.post('/webhook', (req, res, next) => {
	
	let action = req.body.result.action;
	let tag = req.body.result.parameters.tags;
	
	wordpress.getPosts(tag, (errorMessage, postContent) => {
		if (errorMessage) {
	  		res.status(400).send({
				speech: errorMessage,
				displayText: errorMessage,
				source: 'wp-webhook',
			});
		} else {
		  	res.status(200).send({
				speech: '',
				displayText: '',
				source: 'wp-webhook',
				messages: postContent
			});
		}
	});
	
});
 
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});
