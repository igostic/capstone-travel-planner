'use strict';
/**
* @description Function for getting API data from the server and various services.
* @param {string} url - link to the Web API server.
* @returns {object} - object with data from the API server.
*/
const getAPIData = async (url) => {
    const res = await fetch(url);
    try {
        let data = await res.json();
        return data;
    } catch(error) {console.log('Error API Data:', error);}
};

export { getAPIData };
