# FEND Capstone - Travel App

### Table of Contents

- [FEND Capstone - Travel App](#fend-capstone---travel-app)
    - [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Description](#description)
- [To view project](#to-view-project)
- [How to run](#how-to-run)
- [Other requirements implemented](#other-requirements-implemented)

# Overview
This is a project Front End Udacity Capstone Project that incorporates all of the Front End skills learned. Utilize multiple APIs to present a user with all they need to know about their trip.

# Description

This is a Front End Udacity Project that has the following requirement:
his project requires us to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs.


# To view project
The project is published on GitHub Pages. To view, click on this link: [link to project](https://travel-planner-application.netlify.app/)

# How to run 
To launch this website, simply clone the repo 
 - cd into your new folder 
 - To install dependency:
   - npm install
 - To build the project in production mode
   - npm run build-prod
 - To start the server
   - npm run start
 - To run the client, open 'localhost:3040', this will open html.index
   - enter a destination
   - enter a start date
   - enter an end date
   - click search
   - This will display the trip info
 - To test the project
   - npm run test  
 - To build the project in developement mode
   - npm run build-dev
   - This will automatically open localshost:8080

# Other requirements implemented

- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities)
- Incorporate icons into forecast

[![Netlify Status](https://api.netlify.com/api/v1/badges/3ce2d251-6960-4a7e-bc6f-4d14cdf938b7/deploy-status)](https://app.netlify.com/sites/travel-planner-application/deploys)
