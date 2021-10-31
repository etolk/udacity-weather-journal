/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip='
let apiKey = '&appid=...' //insert your API key here

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

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
                feeling: feelings
            })
        })
}

const getWeather = async (baseURL, zip, apiKey) => {
    console.log(baseURL + zip + apiKey);
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        return data
    } catch (error) {
        console.log("error", error);
    }
}

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