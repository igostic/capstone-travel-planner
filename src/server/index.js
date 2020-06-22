var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

let trips = [];

app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// designates what port the app will listen to for incoming requests
app.listen(3040, function() {
    console.log('Example app listening on port 3040!')
})


// POST route
app.post('/save', addTrip);

function addTrip(req, res) {
    const trip = req.body;
    console.log('received save request: addTrip');;
    if (req.body !== " ") {
        trips.push(trip)
        console.log(trips);
        res.status(201).send(trip)
    } else {
        res.status(400).json('Bad Request');
    }
};


module.exports = app;