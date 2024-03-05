
/* Global Variables */
const baseUrl = 'https://api.open-meteo.com/v1/forecast?';
let latitude = document.querySelector("#lat");
let longitude = document.querySelector("#long");
const date = document.querySelector("#date");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getTheCurrentTemp = async(basurl, latitude, longitude) =>{
	let url = basurl + `${baseUrl}latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
	const response = await fetch(url)
	try{
		const weatherData = await response.json();
		const temp = weatherData;
		console.log(temp)
		return temp;
	}catch(error){
		console.log("error:", error)
	}
}
function getWeatherData (){
	const response = document.querySelector("#feelings");
	getTheWeather(baseUrl, latitude.value, longitude.value)
	.then(
		function(data){
		postData('/add', {temperature: data, response: response.value, date: newDate})
	})
	.then(() => update());
}

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener('click', getWeatherData)


/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      	console.log("error", error);
      }
}

//function to update the UI
const update = async() =>{
	const response = await fetch('/data');
	try {
		const dataReceived = await response.json();
		console.log('Current temperature is:',dataReceived.temperature);
		temp.innerHTML = dataReceived.temperature;
		console.log('Feelings is:',dataReceived.response);
		content.innerHTML = dataReceived.response;
		console.log('Current date is:',dataReceived.date);
		date.innerHTML = dataReceived.date;
	}catch(err){
		console.log(err)
	}
}






// chatGPT code
// /* Global Variables */
// const baseUrl = 'https://api.open-meteo.com/v1/forecast?';
// const latitudeInput = document.querySelector("#lat");
// const longitudeInput = document.querySelector("#long");
// const dateElement = document.querySelector("#date");
// const tempElement = document.querySelector("#temp");
// const contentElement = document.querySelector("#content");

// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

// const getTheCurrentTemp = async (baseUrl, latitude, longitude) => {
//   let url = `${baseUrl}latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
//   try {
//     const response = await fetch(url);
//     const weatherData = await response.json();
//     console.log(weatherData);
//     return weatherData;
//   } catch (error) {
//     console.log("error:", error);
//   }
// };

// function getWeatherData() {
//   const response = document.querySelector("#feelings");
//   getTheCurrentTemp(baseUrl, latitudeInput.value, longitudeInput.value)
//     .then(data => {
//       postData('/add', { temperature: data, response: response.value, date: newDate });
//     })
//     .then(update);
// }

// // Event listener to add function to existing HTML DOM element
// document.getElementById("generate").addEventListener('click', getWeatherData);

// /* Function to POST data */
// const postData = async (url = '', data = {}) => {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//     const newData = await response.json();
//     console.log(newData);
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// // Function to update the UI
// const update = async () => {
//   try {
//     const response = await fetch('/data');
//     const dataReceived = await response.json();
//     console.log('Current temperature is:', dataReceived.temperature);
//     tempElement.innerHTML = dataReceived.temperature;
//     console.log('Feelings is:', dataReceived.response);
//     contentElement.innerHTML = dataReceived.response;
//     console.log('Current date is:', dataReceived.date);
//     dateElement.innerHTML = dataReceived.date;
//   } catch (err) {
//     console.log(err);
//   }
// };




// Blackbox code

// To achieve this, you can use Express.js as your server-side framework and Node.js to run the code. Here's the code for the Express.js server:

// First, install the required packages: express and axios (for making HTTP requests).
// bash
// Copy code
// npm init -y
// npm install express axios
// Create a new file called server.js and paste the following code:
// javascript
// Copy code
// const express = require('express');
// const axios = require('axios');
// const querystring = require('querystring');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.sendFile(`${__dirname}/index.html`);
// });

// app.post('/weather', async (req, res) => {
//   const { lat, long } = req.body;
//   const url = 'https://api.open-meteo.com/v1/forecast?' + querystring.stringify({
//     latitude: lat,
//     longitude: long,
//     current_weather: true,
//     timezone: 'UTC',
//     daily: 'temperature_2m_max,temperature_2m_min',
//   });

//   try {
//     const response = await axios.get(url);
//     const data = response.data;
//     const temperature = data.current_weather.temperature;
//     const newDate = new Date();
//     const dateString = `${newDate.getMonth() + 1}.${newDate.getDate()}.${newDate.getFullYear()}`;

//     res.json({
//       temperature,
//       date: dateString,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'An error occurred while fetching weather data.' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// Create a new file called index.html in the same directory as server.js and paste the following code:
// html
// Copy code
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Weather App</title>
// </head>
// <body>
//   <h1>Weather App</h1>
//   <form id="weather-form">
//     <label for="lat">Latitude:</label>
//     <input type="number" step="0.0001" id="lat" name="lat" required>
//     <br>
//     <label for="long">Longitude:</label>
//     <input type="number" step="0.0001" id="long" name="long" required>
//     <br>
//     <button type="submit">Get Weather</button>
//   </form>
//   <div id="content">
//     <p>Temperature: <span id="temp"></span></p>
//     <p>Date: <span id="date"></span></p>
//   </div>
//   <script>
//     const form = document.getElementById('weather-form');
//     const content = document.getElementById('content');

//     form.addEventListener('submit', async (e) => {
//       e.preventDefault();
//       const lat = document.getElementById('lat').value;
//       const long = document.getElementById('long').value;

//       try {
//         const response = await fetch(`/weather?lat=${lat}&long=${long}`);
//         const data = await response.json();

//         document.getElementById('temp').textContent = data.temperature;
//         document.getElementById('date').textContent = data.date;

//         content.style.display = 'block';
//       } catch (error) {
//         console.error(error);
//       }
//     });
//   </script>
// </body>
// </html>
// Now, if you run the command node server.js, the server will start on port 3000. Open your browser and navigate to http://localhost:3000. You can input the latitude and longitude values, and the server will fetch the weather data and display the temperature and date.