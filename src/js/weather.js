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
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log('Geolocation inn\'t supported by Your current device');
    }
}
function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log('przed: ' + position.coords.latitude);
    console.log('przed: ' + position.coords.longitude);
}

waether_load.addEventListener('click',getLocation(),false)
// //download full json
// $(function gettingJSON() {
//     //document.write("jquery loaded");
//     // $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=9817b68be1114bce73d71d5678d36925", function (json) { //by name
//     $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" +long+ "&APPID=9817b68be1114bce73d71d5678d36925", function (json) {
//         // document.write(JSON.stringify(json));
//         console.log('przed: ' + lat + '; po parsowaniu: ' + parseInt(lat));
//         console.log('przed: ' + long + '; po parsowaniu: ' + parseInt(long));
//         console.log(JSON.stringify(json));
//     });
// });

