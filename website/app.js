/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip='
let apiKey = '&appid=...' //insert your API key here

// Create a new date instance dynamically with JS
let newDate = new Date().toDateString();

// Listener for updating the UI on button click
document.getElementById('generate').addEventListener('click', performAction);

//Main function
function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            const temp = data.main.temp;
            const name = data.name;
            postData('/postData', {
                temp: temp,
                city: name,
                feelings: feelings
            })
        })
        .then(
            () => updateUI()
        )
}

// Getting the weather data from OpenWeather by API
const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Saving data into site object
const postData = async (url = '', data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// Updatin the UI based on all data
const updateUI = async () => {
    const request = await fetch('/getData');
    try {
        const weatherData = await request.json();
        document.getElementById('date').innerHTML = newDate;
        document.getElementById('location').innerHTML = weatherData.city;
        document.getElementById('temp').innerHTML = Math.round(weatherData.temp) + ' °C';
        document.getElementById('content').innerHTML = weatherData.feelings;
    } catch (error) {
        console.log('The UI could not be updated', error);
    }
}