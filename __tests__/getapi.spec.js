  
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { getAPIData } from '../src/client/js/getapi';

// Testing with the correct API url
test('The correct API url', () => {
    const url = 'https://restcountries.eu/rest/v2/name/united';
    
    getAPIData(url)
        .then(analysis => {
            expect(analysis.status).toBe('200');
        }).catch(error => {});
});

// Testing with the wrong local server address and news url
test('The wrong API url', () => {
    const url = 'https://restcountries.eu/rest/v2/name/unit';
    
    getAPIData(url)
        .then(analysis => {
            expect(analysis.status).toBe('404');
        }).catch(error => {});
});

// Testing invalid url
test('Invalid API url', () => {
    const url = 'travelplaner';
    getAPIData(url)
        .then(analysis => {
            expect(analysis.status).toBe('Invalid getting data');
        }).catch(error => {});
});

// Testing with the correct local server address and empty news url
test('Empty API url', () => {
    const url = '';
    getAPIData(url)
        .then(analysis => {
            expect(analysis.status).toBe('Invalid getting data');
        }).catch(error => {});
});