//Sends server weight and height data and sets the text field to the returned BMI result
async function calculateBMI() {
    //Gets data from page text fields
    const weight = document.getElementById("weight").value
    const height = document.getElementById("height").value
    //converts input data to JSON format
    const body = JSON.stringify({ weight, height });
    //request header specifics
    const headers = { 'Content-Type': 'application/json' }

    //sends request and stores response in a variable
    const response = await fetch('/calculate-bmi', { method: 'POST', body, headers })
    //stores the data contained in the response in a variable
    const data = await response.json();
    //sets the locked result text field to the response data (BMI result)
    document.getElementById("resultFieldBMI").value = data
}