const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
var price = document.querySelector('h1')
var targetPrice1 = document.getElementById('targetPrice')
var targetPriceVal //must be declared if we send it beetwen dialogs

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target price!',
    icon: path.join(__dirname,'../assets/images/smile.png')
}

function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD')
    .then(res=> {
        const cryptos = res.data.USD
        price.innerHTML = '$'+cryptos.toLocaleString('en')

        if(targetPrice1.innerHTML != ''&& targetPriceVal < res.data.USD)
        {
            const mynotification = new window.Notification(notification.title, notification)
        }
    })
}

getBTC()
setInterval(getBTC,10000)

notifyBtn.addEventListener('click',function(event)
{
    const modelPath = path.join('file://',__dirname,'add.html')
    let win = new BrowserWindow({frame: false, transparent:true,alwaysOnTop: true, width:400,height:200})
    win.on('close', function(){win=null})
    win.loadURL(modelPath)
    win.show()
})

ipc.on('targetPriceVal',function(event,arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en')
})