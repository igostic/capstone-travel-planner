# Project Capstone - FEND Capstone - Travel Planner App.


### Project Description
Travel Planner - applications for travel planning. Using the app, 
you can specify the city for a trip in the future to find out 
the weather and information about the country where the city is located.

### Additional function
* Country information (name, capital, region, population, languages, currency...).
* Added weather icons.
* Implemented the status of entries (active, done).




### Clone, Install, Development & Start
```
// Clone the repository.
git clone https://github.com/igostic/capstone-travel-planner.git

// Go to the project folder.
cd udacity-project-capstone

// Code for .env file.
API_GEO_LOGIN=************************************
API_WEATHER_KEY=**********************************
API_PIXABAY_KEY=**********************************
NODE_ENV=development
```

And run the following commands in console.
```
// Installing npm modules.
npm install

// Starting local Webpack Server for development.
npm run dev 

// Creating a set of files for production in the /dist folder.
npm run build 

// Starting local Server and App.
npm run start 

// Testing App.
npm run test
```

### Project structure
```
├── /__tests__/                                         // The folder with the files for testing.
│       ├── getapi.spec.js                              // Instructions for testing the getAPIData() function.
│       └── helpers.spec.js                             // Instructions for testing helpers functions.
│ 
├── /src/                                               // Application file folder.
│       ├── /client/                                    // Folder with the client part of the application.
│       │       ├── /images/                            // Folder for favicon images.
│       │       │     ...                               // Favicon icon set.
│       │       │
│       │       ├── /media/                             // Folder for weather icons.
│       │       │     ...                               // Set of weather icons.
│       │       │
│       │       ├── /js/                                // Folder for JS files.
│       │       │     ├── app.js                        // Main functions for creating new entries.
│       │       │     ├── helpers.js                    // Helper functions.
│       │       │     ├── getapi.js                     // Function for getting API data.
│       │       │     ├── setdata.js                    // Function for sending data to the server.
│       │       │     └── template.js                   // Template for a new entry
│       │       │
│       │       ├── /styles/                            // Folder with styles.
│       │       │     ├── /componets/                   // Folder with parts of styles.
│       │       │     │       ├── _base.scss            // Basic styles.
│       │       │     │       ├── _config.scss          // Config variables.
│       │       │     │       ├── _footer.scss          // Footer block styles.
│       │       │     │       ├── _form.scss            // Form block styles.
│       │       │     │       ├── _header.scss          // Header block styles.
│       │       │     │       ├── _results.scss         // Results block styles.
│       │       │     │       └── _resets.scss          // Resets styles.
│       │       │     └── styles.scss                   // The main file of styles.
│       │       │
│       │       ├── /views/                             // Folder for HTML files.
│       │       │     └── index.html                    // HTML file of the app.
│       │       │
│       │       └── index.js                            // Main JS file of the app.
│       │
│       └── /server/                                    // Folder of the server part of the application
│               └── index.js                            // Express server file.
│
├── /webpack.config/                                    // Folder with Webpack configuration files.
│       ├── webpack.dev.js                              // Webpack configuration file for development. 
│       └── webpack.prod.js                             // Webpack configuration file for production.  
│
├── .babelrc                                            // Сonfiguration file for Babel.
├── .eslintrc.js                                        // Сonfiguration file for Eslint.
├── .gitignore                                          // File to exclude files and folders.
├── LICENSE.txt                                         // File with the license text
├── package-lock.json                                   // Npm configuration file.
└── package.json                                        // Npm configuration file.
```