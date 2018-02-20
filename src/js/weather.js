var lat;
var long;
let positionsInGeo;
//get geolocation using JS

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log('Geolocation inn\'t supported by Your current device');
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log('przed: ' + position.coords.latitude);
    console.log('przed: ' + position.coords.longitude);
};

function weatherAfterParse(jsonAfterParse) {
    var objectToSetToHtml = '</br><div style="font-size: 25px">' + jsonAfterParse.name + ', ' + jsonAfterParse.sys.country +
        '</div><div>Sky:' + jsonAfterParse.weather[0].description.toUpperCase() + '</div><div>Wind speed: ' + jsonAfterParse.wind.speed + 'm/s, direction: ' + jsonAfterParse.wind.deg +
        '°</div><div>Humidity: ' + jsonAfterParse.main.humidity +
        '%</div><div>Clouds: ' + jsonAfterParse.clouds.all +
        '%</div><div style="font-size: 20px">Temp.: ' + kelvinToCelsius(jsonAfterParse.main.temp).toFixed(2) + ' °C</div>';
    return objectToSetToHtml;
};

function fahrenheitToCelsius(tempInFahr) {
    return (5 / 9) * (tempInFahr - 32);
}

function kelvinToCelsius(tempInFahr) {
    return tempInFahr - 273.15;
}

waether_load.addEventListener('click', getLocation(), false)
//download full json
$(function gettingJSON() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Wroclaw&APPID=9817b68be1114bce73d71d5678d36925", function (json) { //by name
        // $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +long+ "&APPID=9817b68be1114bce73d71d5678d36925", function (json) { //by cords
        //console.log('przed: ' + lat + '; po parsowaniu: ' + parseInt(lat));
        //console.log('przed: ' + long + '; po parsowaniu: ' + parseInt(long));
        //console.log(JSON.stringify(json));
        var jnObject = JSON.parse(JSON.stringify(json));
        console.log(jnObject);
        document.getElementById('weather-notify').innerHTML = weatherAfterParse(jnObject);
    });
});

