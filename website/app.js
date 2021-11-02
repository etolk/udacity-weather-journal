// openweathermap.org api key loaded from config
const api_key = config.API_KEY;

const baseURL =
  "http://api.openweathermap.org/data/2.5/weather?units=metric&zip=";
const apiKey = "&appid=" + api_key;
const msg = document.querySelector(".msg");

// Create a new date instance dynamically with JS
let newDate = new Date().toDateString();

// Listener for updating the UI on button click
document.getElementById("generate").addEventListener("click", performAction);

//Main function
function performAction(e) {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, zip, apiKey)
    .then(function (data) {
      const temp = data.main.temp;
      const name = data.name;
      const icon = data.weather[0].icon;
      const description = data.weather[0].description;
      postData("/postData", {
        temp: temp,
        city: name,
        feelings: feelings,
        icon: icon,
        description: description,
      });
    })
    .then(() => updateUI());
}

// Getting the weather data from OpenWeather by API
const getWeather = async (baseURL, zip, apiKey) => {
  const holderToHide = document.querySelector(".holder.entry");
  const res = await fetch(baseURL + zip + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    if (data.cod == "404" || data.cod == "400") {
      msg.textContent = data.message; // show error message if wrong zip
      holderToHide.setAttribute("hidden", ""); // hide previous results if incorrect zip
    } else {
      msg.textContent = ""; // delete error message if correct zip
      return data;
    }
  } catch (error) {
    console.log("error", error);
  }
};

// Saving data into site object
const postData = async (url = "", data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Updating the UI based on all data
const updateUI = async () => {
  const request = await fetch("/getData");
  try {
    const weatherData = await request.json();
    const holder = document.querySelector(".holder.entry");

    // create figure object for image
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherData.icon + "@2x.png"
    );
    figure.appendChild(img);
    figcaption.innerHTML = weatherData.description;
    figure.appendChild(figcaption);

    document.getElementById("date").innerHTML = newDate;
    document.getElementById("location").innerHTML = weatherData.city;
    document.getElementById("temp").innerHTML =
      Math.round(weatherData.temp) + " °C";
    document.getElementById("content").innerHTML = weatherData.feelings;
    if (document.getElementById("icon").childElementCount > 0) {
      document
        .getElementById("icon")
        .replaceChild(figure, document.getElementsByTagName("figure")[0]);
    } else {
      document.getElementById("icon").appendChild(figure);
    }
    holder.removeAttribute("hidden");
  } catch (error) {
    console.log("error", error);
  }
};
