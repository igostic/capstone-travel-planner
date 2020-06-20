'use strict';
import { addHandlerResult } from './app';

/**
* @description This function contains a template for a trip entry.
* @param {Node} resultTrip -element to pages for displaying a new entry.
* @param {Node} listTrip - element to pages for displaying a list of entries.
* @param {object} data - object with data for a new record.
* @param {string} key - the key entry status.
*/
const templateTrip = (resultTrip, listTrip, data, key) => {

    let newElement = document.createElement('div');
    newElement.classList.add('result-content');

    let tripElement = `
        <div class="result-info">
            <figure class="info-image">
                <img src="${data.photo}">
                <figcaption>${data.city}</figcaption>
            </figure>
            <div class="country-info country">Country: 
                <span class="data">${data.country}</span>
                <span class="flag"><img src="${data.flag ? data.flag : ''}"></span>
            </div> 
            <div class="country-info">Capital:<span class="data">${data.capital ? data.capital : ' – '}</span></div>
            <div class="country-info">Region:<span class="data">${data.region ? data.region : ' – '}</span></div>
            <div class="country-info">Subregion:<span class="data">${data.subregion ? data.subregion : ' – '}</span></div>
            <div class="country-info">Population:<span class="data">${data.population ? data.population : ' – '}</span></div>
            <div class="country-info">languages:<span class="data">${data.languages ? data.languages : ' – '}</span></div>
            <div class="country-info">Currencies:<span class="data">${data.currencies ? data.currencies : ' – '}</span></div>
            <div class="country-info">Timezones:<span class="data">${data.timezones ? data.timezones : ' – '}</span></div>
        </div> 

        <div class="result-trip">
            <div class="trip-to">May trip to: <strong>${data.city}, ${data.country}</strong></div>
            <div class="departing">Departing: <strong>${data.departing}</strong></div>

            <div class="amount">${data.city}, ${data.country} is <strong>${data.amount}</strong> days away</div>

            <div class="weather-content">
                <div class="weather-start">
                    <h2>Weather now (${data.startDay})</h2>
                    <div class="weather-icon">
                        <img src="media/${data.currentIcon}.png" />
                    </div>
                    <div class="weather-temp">
                        <div class="weather-low">Low: <strong>${data.currentMin}</strong></div>
                        <div class="weather-high">High: <strong>${data.currentMax}</strong></div>
                    </div>
                    <div class="weather-descr">${data.currentDescr}</div>
                </div>

                <div class="weather-depart">
                    <h2>Weather in the future (${data.departing})</h2>
                    <div class="weather-icon">
                        <img src="media/${data.futureIcon}.png" />
                    </div>
                    <div class="weather-temp">
                        <div class="weather-low">Low: <strong>${data.futureMin}</strong></div>
                        <div class="weather-high">High: <strong>${data.futureMax}</strong></div>
                    </div>
                    <div class="weather-descr">${data.futureDescr}</div>
                </div>
            </div>

            <div class="weather-range">Temperature range from <strong>${data.minTemp}</strong> to <strong>${data.maxTemp}</strong></div>

            <div class="btn-group">
                <button class="btn save-trip">Save Trip</button>
                <button class="btn done-trip">${data.done ? 'Activate' : 'Done' }</button>
                <button class="btn remove-trip">Remove Trip</button>
            </div>
        </div>
    `;

    newElement.innerHTML = tripElement;
    newElement.id = data.id;
    if(data.done) newElement.classList.add('done');

    // Adding event listeners to buttons in the new entry.
    addHandlerResult(newElement, data, key, data.id);

    // Adding an entry to the page in a modal window or list.
    key === 'result' ? resultTrip.append(newElement) : listTrip.prepend(newElement);
};

export { templateTrip };
