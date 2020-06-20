'use strict';
/**
* @description Function for getting the maximum and minimum temperature for 16 days.
* @param {array} data - An array of objects with data about the temperature.
* @returns {object} - object with minimum and maximum temperature.
*/
const definitionTemp = (data) => {
    let minArray = [];
    let maxArray = [];
    data.forEach(item => {
        minArray.push(item.min_temp);
        maxArray.push(item.max_temp);
    });
    return {min: Math.min.apply(null,minArray), max: Math.max.apply(null,maxArray)};
};

/**
* @description Function for converting data of the same type to a comma-separated string.
* @param {array} data - the object contains the data.
* @param {string} name - тame of the key of the object to convert data to a string.
* @returns {string} - comma-separated data string.
*/
const dataToString = (data, name) => {
    let str = [];
    data.forEach(item => str.push(item[name]));
    return str.join(', ');  
};

/**
* @description Function for getting the current date.
* @returns {string} - a formatted string with date.
*/
const getDate = () => {
    let date = new Date();
    let day = date.getDate();
    let numberDay = day > 10 ? day : `0${day}`;
    let mounth = date.getMonth() + 1;
    let numberMounth = mounth > 10 ? mounth : `0${mounth}`;
    return `${date.getFullYear()}/${numberMounth}/${numberDay}`;
};

/**
* @description Function for getting the number of days.
* @param {number} currentTime - current date in milliseconds.
* @param {string} endDay - future date.
* @returns {string} - number of days from the current date to a future date.
*/
const getDays = (currentTime, endDay) => {
    let depTime = new Date(endDay).getTime();
    if (depTime > currentTime) {
        let diffTime = depTime - currentTime;
        let days = (Math.round((diffTime / 1000 / 60 / 60) * 100) / 100) / 24;
        return days.toFixed(0);
    } else {
        return false;
    }
};

export { definitionTemp, dataToString, getDate, getDays };
