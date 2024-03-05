// Setup empty JS object to act as endpoint for all routes
const projectData = {}

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const server = app.listen(port, ()=>{
    console.log('hello');
    console.log(`I Am Running On port: ${port}`);   
})

app.get('/', (req, res) => {
        res.send(website);
})
const data = [];


app.get('/data', (req, res) => {
        res.send(projectData);
        console.log(projectData);
})

app.post('/add', (req, res) =>{
    let entry = req.body;
    let newEntry = {
    	tempe: entry.temperature,
    	res: entry.response,
    	date: entry.date
    }
    projectData["temperature"] = newEntry.tempe;
    projectData["response"] = newEntry.res;
    projectData["date"] = newEntry.date;
    console.log(projectData);
});