/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
'use strict';
import { getAPIData } from './getapi';
import { setData } from './setdata';
import { templateTrip } from './template';
import { definitionTemp, dataToString, getDate, getDays } from './helpers.js';
/**
 * Define Global Variables
*/
const cityTrip = document.getElementById('city');
const dateTrip = document.getElementById('date');
const getTrip = document.getElementById('get');
const localData = JSON.parse(localStorage.getItem('trips'));

const resultTrip = document.getElementById('result-trip');
const listTrip = document.getElementById('list-trip');
const errorFields = document.querySelector('.error');

const modalWindow = document.querySelector('.modal');
const modalCurtain = document.querySelector('.modal-curtain');
const modalBtnDelete = document.querySelector('.btn-delete');
const modalBtnClose = document.querySelector('.btn-cancel');
const questionDelete = document.querySelector('.question-delete');
const loader = document.querySelector('.loader');

let dataTrips = [];
let isModal = false;
let isDeleted = '';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const geoDataAPI = 'http://api.geonames.org/searchJSON?q=';
const weatherDataAPI = 'https://api.weatherbit.io/v2.0/forecast/daily?'; 
const pixabayDataAPI = 'https://pixabay.com/api/'; 
const countriesDataAPI = 'https://restcountries.eu/rest/v2/name';

let routeURL = process.env.NODE_ENV === 'development' || 'http://localhost:3030' ?
    window.location.href === 'http://localhost:3030'? 
        'http://localhost:3030/': 'http://localhost:3030': 
    window.location.href;

/**
 * End Global Variables
 * Begin Main Functions
 * 
*/
/**
* @description Main function for creating new entries.
*/
const App = () => {

    // Event listener for adding a new trip.
    getTrip.addEventListener('click', async () => {
        resultTrip.innerHTML = '';
        errorFields.style.display = 'none';
        questionDelete.style.display = 'none';
        loader.style.display = 'flex';
        modalWindow.classList.add('active');
        isModal = true;

        if(cityTrip.value !== '' && dateTrip.value !== '') {

            // Checking and counting the number of days;
            let dateNowMs = Date.now();
            let amountDays = getDays(dateNowMs, dateTrip.value);
            let departWeather = amountDays < 15 ? amountDays : 15; 
            if (!amountDays) {
                errorFields.style.display = 'block';
                errorFields.innerText = 'Enter a date in the future!';
                dateTrip.value = '';
                closeModal();
                return false;
            }

            // Getting API key values from the server.
            let apiData = await getAPIData(`${routeURL}/apidata`);
            let {geoLogin, weatherKey, pixabayKey} = apiData;

            // Getting data from the service Geonames.org.
            let geoUser = `&username=${geoLogin}`;
            let geoURL = geoDataAPI + cityTrip.value + geoUser;
            let geoData = await getAPIData(proxyUrl + geoURL);
            if (!geoData.geonames[0]) errorAPIData();    
            let {lat, lng, name, countryName} = geoData.geonames[0]; 

            // Getting data from the service Weatherbit.io.
            let weatherDailyURL = `${weatherDataAPI}lat=${lat}&lon=${lng}&key=${weatherKey}`;
            let weatherData =  await getAPIData(weatherDailyURL);
            if (!weatherData) errorAPIData();
            let tempDifference = definitionTemp(weatherData.data);

            // Getting data from the service Pixabay.com.
            let pixabayURL = `${pixabayDataAPI}?key=${pixabayKey}&q=${name}+${countryName}&image_type=photo`;
            let pixabayData =  await getAPIData(pixabayURL);
            if (!pixabayData) errorAPIData();

            // Getting data from the service Restcountries.eu.
            let restcountriesURL = `${countriesDataAPI}/${countryName}`;
            let restcountriesData =  await getAPIData(restcountriesURL);
            if (!restcountriesData[0]) errorAPIData();     
            let {capital, region, subregion, timezones, population, currencies, languages, flag} = restcountriesData[0];

            // Hiding the preloader when data is loaded.
            loader.style.display = 'none';

            // Object with data for the new trip.
            let newDataTrip = {
                id: `trip_${dateNowMs}`,
                city: name, 
                country: countryName,
                flag:flag,
                capital: capital,
                region: region,
                subregion: subregion,
                timezones: timezones.join(', '),
                population: population,
                currencies: dataToString(currencies, 'code'),
                languages: dataToString(languages, 'name'),
                startDay: getDate(),
                departing: dateTrip.value.replace(/-/g, '/'),
                amount: amountDays,
                photo: pixabayData.hits[0].webformatURL,
                minTemp: tempDifference.min,
                maxTemp: tempDifference.max, 
                currentMin: weatherData.data[0].min_temp,
                currentMax: weatherData.data[0].max_temp,
                currentIcon: weatherData.data[0].weather.icon,
                currentDescr: weatherData.data[0].weather.description,
                futureMin: weatherData.data[departWeather].min_temp,
                futureMax: weatherData.data[departWeather].max_temp,
                futureIcon: weatherData.data[departWeather].weather.icon,
                futureDescr: weatherData.data[departWeather].weather.description,
                done: false
            };

            // Passing data to the template for the new entry.
            templateTrip(resultTrip, listTrip, newDataTrip, 'result');

            // Clearing the input fields.
            cityTrip.value = '';
            dateTrip.value = '';

        } else {
            // Adds an error if the input fields are incorrectly filled in.
            errorFields.style.display = 'block';
            errorFields.innerText = 'Enter the city and date in the input fields!';
            closeModal();
            return false; 
        }
    });
};

/**
* @description Add Event listener for save and delete button for entry.
* @param {Node} newElement - new entry Node element.
* @param {object} data - object with data for a new record.
* @param {string} key - the key entry status.
* @param {string} id - id of the element to create.
*/
const addHandlerResult = async (newElement, data, key, id) => {

    let saveButton = newElement.querySelector('.save-trip');
    let removeButton = newElement.querySelector('.remove-trip');
    let doneButton = newElement.querySelector('.done-trip');

    if(key === 'result') {
        questionDelete.style.display = 'none';

        // Event listener for the 'Done' button.
        doneButton.addEventListener('click', () => {
            doneEntry(id);
        });

        // Event listener for the 'Remove Trip' button.
        removeButton.addEventListener('click', () => {
            questionDelete.style.display = 'block';
            resultTrip.innerHTML = '';
            isDeleted = id;
            toggleModal();
        });

        // Event listener for the 'Save Trip' button.
        saveButton.addEventListener('click', () => {
            // Adding new data a global variable.
            dataTrips.unshift(data);

            // Sending updated data to the server.
            setData(`${routeURL}/setnew`, data);

            // Adding new data to LocalStorage.
            localStorage.setItem('trips', JSON.stringify(dataTrips));

            resultTrip.innerHTML = '';
            saveButton.style.display = 'none';
            listTrip.prepend(newElement);
            toggleModal();
        });

    } else {
        questionDelete.style.display = 'block';
        saveButton.style.display = 'none';

        // Event listener for the 'Done' button in the list.
        doneButton.addEventListener('click', () => {
            doneEntry(id);
        });

        // Event listener for the 'Remove Trip' button in the list.
        removeButton.addEventListener('click', () => {
            isDeleted = id;
            toggleModal();
        });
    }
};

/**
* @description Function to delete the selected entry.
* @param {number} id - id deleted entry.
*/
const deleteEntry = (id) => {
    // Select the entry to be deleted and delete it.
    let trip = document.getElementById(id);
    listTrip.removeChild(trip);

    // Delete data entry from dataTrips.
    dataTrips = dataTrips.filter(item => {
        return item.id !== id;
    });

    // Updating data on the server.
    setData(`${routeURL}/remove`, {id});

    // Сlear localStorage and add new data.
    localStorage.setItem('trips', JSON.stringify([]));
    localStorage.setItem('trips', JSON.stringify(dataTrips));

    // Closing the modal window.
    closeModal();
};

/**
* @description Function for changing the entry status.
* @param {number} id - id done entry.
*/
const doneEntry = (id) => {
    
    dataTrips.find(item => { if (item.id === id) item.done = !item.done; }); 

    let element = document.getElementById(id);
    let status = element.classList.contains('done');
    let btnDone = element.querySelector('.done-trip');

    // Changing the appearance of the entry 
    // and the text on the button.
    if (status) {
        element.classList.remove('done');
        btnDone.innerText = 'Done';
    } else {
        element.classList.add('done');
        btnDone.innerText = 'Activate';
    }

    // Updating data on the server.
    setData(`${routeURL}/done`, {id});

    // Сlear localStorage and add new data.
    localStorage.setItem('trips', JSON.stringify([]));
    localStorage.setItem('trips', JSON.stringify(dataTrips));
};

/**
* @description Function for getting project data from the server or localStorage.
*/
const getDataLoad = async () => {
    if (dataTrips.length === 0 && localData !== null) {
        dataTrips = localData.reverse();

        // Adding all elements to the page.
        dataTrips.forEach(trip => {
            templateTrip(resultTrip, listTrip, trip, 'list');
        });

        // Updating data on the server.
        let data = dataTrips.reverse();        
        setData(`${routeURL}/setall`, {data});

    } else {
        try {
            const res = await fetch(`${routeURL}/get`);
            dataTrips = await res.json();

            // Adding all elements to the page.
            dataTrips.reverse().forEach(trip => {
                templateTrip(resultTrip, listTrip, trip, 'list');
            }); 

            // Adding new data to the local storage.
            localStorage.setItem('trips', JSON.stringify(dataTrips.reverse()));

        } catch(error) {
            console.log('error', error);
        }
    }
};

/**
* @description Error message function for getting data.
*/
const errorAPIData = () => {
    errorFields.style.display = 'block';
    errorFields.innerText = 'You entered the wrong data!';
    cityTrip.value = '';
    closeModal();
    return false;
};

/**
 * End Main Functions
 * Begin Event listener
 * 
*/
/**
* @description Event listener for city and date input field error informer.
*/
errorFields.addEventListener('mouseover', () => {
    errorFields.style.display = 'none';
});

/**
* @description Add Event listeners for delete entry.
*/
modalBtnDelete.addEventListener('click', () => {
    deleteEntry(isDeleted);
});

/**
* @description Switching the modal window.
*/
const closeModal = () => {
    modalWindow.classList.remove('active');
    isModal = false;
};

const openModal = () => {
    modalWindow.classList.add('active');
    isModal = true;
};

const toggleModal= () => { isModal ? closeModal() : openModal(); };

modalCurtain.addEventListener('click', closeModal);
modalBtnClose.addEventListener('click', closeModal);

/**
* @description Function for getting data in load page.
*/
window.onload = () => getDataLoad();

export { App, addHandlerResult };
