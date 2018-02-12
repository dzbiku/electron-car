const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote

const ipc = electron.ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click',function(event){
    var win = BrowserWindow.getCurrentWindow();
    win.close()
})

const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click',function(event){
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)

    var window = BrowserWindow.getCurrentWindow();
    window.close()
})