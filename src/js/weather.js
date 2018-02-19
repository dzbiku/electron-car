$(function gettingJSON(){
    //document.write("jquery loaded");
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?q=London&APPID=9817b68be1114bce73d71d5678d36925",function(json){
        // document.write(JSON.stringify(json));
        console.log(JSON.stringify(json));
    });
});