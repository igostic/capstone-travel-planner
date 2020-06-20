/* eslint-disable no-unused-vars */
'use strict';
/**
* @description Connecting Express, Middleware and other dependences.
*/
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
* @description Setup JS object for API Data.
*/
const apiData = { 
    geoLogin: process.env.API_GEO_LOGIN,
    weatherKey: process.env.API_WEATHER_KEY, 
    pixabayKey: process.env.API_PIXABAY_KEY 
};

/**
* @description Setup JS array for Project Data.
*/
let projectData = [];


/**
* @description Creating an instance of the app.
*/
const app = express();

/* Middleware*/
/**
* @description Here we are configuring express to use body-parser as middle-ware.
*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
* @description Connecting Cors for cross origin allowance.
*/
app.use(cors());

/**
* @description Initialize the main project folder.
*/
app.use(express.static('dist'));

/**
* @description Route for opening the main page of the app.
*/
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

/**
* @description Send API Data.
*/
app.get('/apidata', function (request, response) {
    response.send(apiData);
});

/**
* @description Send projectData.
*/
app.get('/get', function (request, response) {
    response.send(projectData);
});

/**
* @description Add a new entry to projectData.
*/
app.post('/setnew', function (request, response) {
    projectData.unshift(request.body);
});

app.post('/setall', function (request, response) {
    let {data} = request.body;
    projectData = [];
    projectData = data;
});

/**
* @description Deleting data from the projectData.
*/
app.post('/remove', function (request, response) {
    let {id} = request.body;    
    projectData = projectData.filter(item => {
        return item.id !== id;
    });
});

/**
* @description Changing the done status.
*/
app.post('/done', function (request, response) {
    let {id} = request.body;
    projectData.map(item => { if (item.id === id) item.done = !item.done; });
});

/**
* @description Setup Server.
*/
const port = process.env.NODE_ENV === 'development' ? 3030 : process.env.PORT ;
app.listen(port, listening);

function listening() {
    console.log('***********************************************************');
    console.log(` Login in Geoname is: ${apiData.geoLogin}`);
    console.log(` API Key WeatherBit is: ${apiData.weatherKey}`);
    console.log(` API Key Pixabay is: ${apiData.pixabayKey}`);
    console.log(' Server started Successfully!');
    console.log(` Running on - http://localhost:${port}'`);
    console.log('===========================================================');
    console.log(' To stop the server, Press - Ctrl+C');
    console.log('***********************************************************');
}

module.exports = app;
