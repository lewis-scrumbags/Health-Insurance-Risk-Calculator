const express = require('express')
const bodyParser = require('body-parser')
app = express()

var url = require('url');
var dt = require('./date-time');

app.use(bodyParser.json())

const port = process.env.PORT || 3000

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static'))
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// The app.get functions below are being processed in Node.js running on the server.
// Implement a custom About page.
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

// Sends back BMI based on weight and height data recieved.
app.post('/calculate-bmi', function(request, response){
	console.log(request.body);

	let weight = request.body.weight;
	let height = request.body.height * 0.01;

	result = (weight / (height * height)).toFixed(2);
  result = parseFloat(result);

  const responseText = JSON.stringify(result)
	response.json(responseText)
  console.log(responseText)
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)
