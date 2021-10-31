// Initiate Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Middleware (body-parser has been deprecated as at Express 4.16+) 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initiate Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, () => console.log(`Server successfully running on localhost:${port}`));

// Empty JS object to act as endpoint for all routes
projectData = {};

// POST data into the site object
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    return res.send(projectData);
}
app.post('/postData', postData);