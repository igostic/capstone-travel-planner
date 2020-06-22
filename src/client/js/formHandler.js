import { createModalUi } from './ui';
const $ = require("jquery");

let data = {};

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let city = document.getElementById('destination').value
    let start = document.getElementById('startDate').value
    let end = document.getElementById('endDate').value


    let res = await Client.checkForInput(city, start, end);

    if (!res) {
        console.log("::: Form Submitted :::")


        data.startDate = start;
        data.endDate = end;
        console.log("::: data-1 :::");
        console.log(data);

        let diff = await daysDiff(start, end)
        console.log(diff)
        data.duration = diff;



        let cityInfo = await getCityData(city);

        console.log("::cityInfo:::")
        console.log(cityInfo);
        console.log(data);

        data.cityInfo = cityInfo;

        let weatherInfo = await getWeatherForeCast(cityInfo.Lat, cityInfo.Lng);

        console.log("::weatherInfo:::")
        console.log(weatherInfo);

        let weather = await processWeather(weatherInfo.data, start)
        console.log("::weather::", weather)

        data.weather = weather;

        let cityImage = await getCityImage(data.cityInfo);

        if (cityImage == undefined) {
            cityImage = await getCountryImage(data.cityInfo);
        }
        console.log("::cityImage:::")
        console.log(cityImage);


        data.imageUrl = cityImage;
        //get the DOM
        const newTripBlock = document.getElementById('new-trip');
        newTripBlock.innerHTML = '';

        //display the newTripBlock in the browser

        console.log("::data-2:::")
        console.log(data)

        let newModal = await createModalUi(data);

        console.log("::after createModalUi:::")
        console.log(newModal.innerHTML);
        newTripBlock.innerHTML = newModal.innerHTML;

        $('#tripModal').modal('show');

    }

}


async function handleSave(event) {
    event.preventDefault()
    await postData('/save', { data });
    $('#tripModal').modal('toggle');
}

//constants 
const geoNameUrl = 'https://secure.geonames.org/searchJSON?formatted=true&q='
const geoNameUserName = '&username=igostic';

const weatherUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?'
const weatherKey = '&key=6e265d0c931c41839e11b02b593abacc';

const pixbayUrl = 'https://pixabay.com/api/?'
const pixabayKey = '&key=17138468-2428f9bf0e6a755835812ac1c';


async function getCityData(city) {
    const res = await fetch(geoNameUrl + city + geoNameUserName + '&style=full')
    let cityData = {};
    try {
        const data = await res.json();
        console.log("getCity: no error: ", data);
        if (data.totalResultsCount == 0) {
            console.log("City not found")
        } else {
            cityData.countryName = data.geonames[0].countryName;
            cityData.Lat = data.geonames[0].lat;
            cityData.Lng = data.geonames[0].lng;
            cityData.name = data.geonames[0].name;

        }
        return cityData;
    } catch (error) {
        console.log("getCity: error", error);
        // appropriately handle the error
    }
}


async function getWeatherForeCast(lat, lon) {
    const res = await fetch(weatherUrl + '&lat=' + lat + '&lon=' + lon + weatherKey)
    try {
        const data = await res.json();
        console.log("getWeatherForeCast: no error: ", data);

        return data;
    } catch (error) {
        console.log("getWeatherForeCast: error", error);
        // appropriately handle the error
    }
}

async function getCityImage(cityData) {

    let imageUrl;
    const res = await fetch(pixbayUrl + pixabayKey + '&q=' + cityData.name + '&image_type=photo')
    try {
        const data = await res.json();
        console.log(data)
        if (data.totalHits > 0) {
            imageUrl = data.hits[0].webformatURL;
        }
        return imageUrl;
    } catch (error) {
        console.log("getCityImage: error", error);
        // appropriately handle the error
    }
}

async function processWeather(forecaseInfo, startDate) {

    console.log("::processWeather:::")
    console.log('forecaseInfo', forecaseInfo);
    console.log('currentDate', startDate);


    let obj = forecaseInfo.find(o => o.valid_date === startDate);
    if (obj == undefined) {
        obj = forecaseInfo[0]
    }
    console.log("::obj ::", obj);


    return obj;


}


export async function daysDiff(start, end) {

    console.log("::daysDiff:::")
    let d1 = new Date(start);
    let d2 = new Date(end);


    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('diffDays', diffDays);
    return diffDays;
}

async function postData(url = '', data = {}) {
    // console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}




export { handleSubmit, handleSave, getCityData }