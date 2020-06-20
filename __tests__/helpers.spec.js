/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { getDate, getDays }  from '../src/client/js/helpers';
/**
* @description Testing helper functions.
*/
// Testing getDate() function for getting the current date.
test('Get the current date - not null', () => {
    expect(getDate()).not.toBeNull();
});

test('Get the current date - not undifined', () => {
    expect(getDate()).not.toBeUndefined();
});

test('Get the current date - contains: "/"', () => {
    expect(getDate()).toContain('/');
});

/**
* @description Testing getDays() function for getting the number of days.
*/
test('Get the days - accurate result', () => {
    let currentTime = 1589873762043;
    let endDay = '2020-05-30';
    expect(getDays(currentTime, endDay)).toBe('11');
});

test('Get the days - not null', () => {
    let currentTime = 1589873762043;
    let endDay = '2020-05-30';
    expect(getDays(currentTime, endDay)).not.toBeNull();
});

test('Get the days - not undifined', () => {
    let currentTime = 1589873762043;
    let endDay = '2020-05-30';
    expect(getDays(currentTime, endDay)).not.toBeUndefined();
});

test('Get the days - date in the past', () => {
    let currentTime = 1589873762043;
    let endDay = '2020-05-11';
    expect(getDays(currentTime, endDay)).toBe(false);
});

test('Get the days - no current time', () => {
    let currentTime = undefined;
    let endDay = '2020-05-11';
    expect(getDays(currentTime, endDay)).toBe(false);
});

test('Get the days - no date', () => {
    let currentTime = 1589873762043;
    let endDay = '';
    expect(getDays(currentTime, endDay)).toBe(false);
});


