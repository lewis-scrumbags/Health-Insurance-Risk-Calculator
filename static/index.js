//Sends server weight and height data and sets the text field to the returned BMI result
async function calculations() { //I changed name to calculations
    //Gets data from page text fields
    const weight = document.getElementById("weight").value
    const heightFeet = document.getElementById("heightFeet").value
    if (heightFeet < 2){
        document.getElementById('error').value = "2 Feet Height Minimum";
    }
    else{
        document.getElementById('error').value = "";
    }
    const heightInches = document.getElementById("heightInches").value
    const age = document.getElementById("age").value
    const selectBP = document.getElementById("selectBP").value
    //converts input data to JSON format
    const body = JSON.stringify({ weight, heightFeet, heightInches, age, selectBP});
    //request header specifics
    const headers = { 'Content-Type': 'application/json' }

    //sends request and stores response in a variable
    const response = await fetch('/calculations', { method: 'POST', body, headers })
    //stores the data contained in the response in a variable
    const data = await response.json();
    //sets the locked result text field to the response data (BMI result)
    document.getElementById("totalScore").value = data
}