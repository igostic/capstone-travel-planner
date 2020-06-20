'use strict';
/**
* @description Function for sending data to the server.
* @param {string} url - link for the server router.
* @param {object} data - data to send to the server.
* @returns {array} - array of objects to store on the server.
*/
const setData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {console.log('Error installing data on the server: ', error);}
};

export { setData };
