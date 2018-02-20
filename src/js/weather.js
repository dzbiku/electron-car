var lat;
var long;
let positionsInGeo;
//get geolocation using JS

// class LocationGeo {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.getLocation = function () {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(this.setPosition);
//             }
//             else {
//                 alert('Geolocation inn\'t supported by Your current device');
//                 console.log('Geolocation inn\'t supported by Your current device');
//             }
//         };        
//     }    
//     setPosition (position) {
//         this.x = position.coords.latitude;
//         this.y = position.coords.longitude;
//     }
// }
// const _location = new LocationGeo();
// _location.getLocation();
// console.log(_location.x + ' y: ' + _location.y);

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
    '</div><div>Wind:' + jsonAfterParse.weather[0].description + ', Speed: ' + jsonAfterParse.wind.speed + ' Direction: ' + jsonAfterParse.wind.deg + 
    '</div><div>Humidity: ' + jsonAfterParse.main.humidity + 
    '</div><div>Clouds: ' + jsonAfterParse.clouds.all + 
    '</div><div style="font-size: 20px">Temp.: ' + jsonAfterParse.main.temp + ' F</div>';
    return objectToSetToHtml;
};

waether_load.addEventListener('click', getLocation(), false)
//download full json
$(function gettingJSON() {
    //document.write("jquery loaded");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=Wroclaw&APPID=9817b68be1114bce73d71d5678d36925", function (json) { //by name
        // $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +long+ "&APPID=9817b68be1114bce73d71d5678d36925", function (json) {
        // document.write(JSON.stringify(json));
        //console.log('przed: ' + lat + '; po parsowaniu: ' + parseInt(lat));
        //console.log('przed: ' + long + '; po parsowaniu: ' + parseInt(long));
        //console.log(JSON.stringify(json));
        var jnObject = JSON.parse(JSON.stringify(json));
        console.log(jnObject);
        document.getElementById('weather-notify').innerHTML = weatherAfterParse(jnObject);
    });
});

