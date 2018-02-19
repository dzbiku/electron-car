const pathNotify = require('path')
const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

//in progress
clock.addEventListener('click',function(event)
{
    const modelPath = pathNotify.join('file://',__dirname,'weakWeather.html')
    let win = new BrowserWindow({frame: false, transparent:true,alwaysOnTop: true, width:400,height:200,})
    win.on('close', function(){win=null})
    win.loadURL(modelPath)
    win.show()
})