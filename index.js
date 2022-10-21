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
app.post('/calculations', function(request, response){ // I changed the name to calculations instead of calculate bmi
	console.log(request.body);
  totalScore = 0;
	let weight = request.body.weight * 0.45359237; //converts pounds to kilograms
	let heightFeet = request.body.heightFeet *12; //Changes feet to inches
  let heightInches = request.body.heightInches;
  height =  (parseFloat(heightFeet) + parseFloat(heightInches)) / 39.37; //takes total height and converts it to meters
	bmiresult = (weight / (height * height)).toFixed(2); //computes BMI
  bmiresult = parseFloat(bmiresult);
  if (bmiresult >= 25 && bmiresult <= 29.9){
    totalScore += 30;
  }else if (bmiresult >= 30){
    totalScore += 75;
  } else {
    totalScore += 0;
  }
  const responseText = JSON.stringify(totalScore)
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
