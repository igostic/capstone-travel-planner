export function checkForInput(cityName, startDate, endDate) {
    console.log("::: Running checkForInput :::", cityName);
    console.log("::: Running checkForInput :::", startDate);
    console.log("::: Running checkForInput :::", endDate);

    let res = 0;

    if (!validateDate(startDate)) {
        res++;
        alert("You have entered an Invalid start Date, Try again!")
    }

    if (!validateDate(endDate)) {
        res++;
        alert("You have entered an Invalid End Date, Try again!")
    }

    if (!isFutureDate(startDate)) {
        res++;
        alert("Invalid start date in past, Try again!")
    }

    if (!isFutureDate(endDate)) {
        res++;
        alert("Invalid end date in past, Try again!")
    }

    if (startDate > endDate) {
        res++;
        alert("Your End Date should be bigger than Start Date , Try again!")
    }

    console.log("::: Running checkForInput ::res:", res);


    return res;
}


export function isFutureDate(date) {
    let d1 = new Date(date).setHours(0, 0, 0, 0);
    let current = new Date(date).setHours(0, 0, 0, 0);
    console.log('d1', d1);
    console.log('now', current);

    return d1 >= current;

}


function validateDate(date) {
    return (date.match(/^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/))
}