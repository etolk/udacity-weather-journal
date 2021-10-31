/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?units=metric&zip='
let apiKey = '&appid=...' //insert your key here

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey);
}

const getWeather = async (baseURL, zip, apiKey) => {
    console.log(baseURL + zip + apiKey);
    const res = await fetch(baseURL + zip + apiKey);
    try {
        const data = await res.json();
        console.log(data);
        return data
    } catch (error) {
        console.log("error", error);
    }
}

// function performAction(e) {

//     getWeather('/get',)
//         .then(function (data) {
//             // Add data
//             console.log(data);
//             postData('/post', { zip: data.zip, feelings: data.feelings });
//         })
//         .then(
//             updateUI()
//         )
// }