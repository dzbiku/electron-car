const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//menu
const Menu = electron.Menu
const shell = electron.shell
const path = require('path')
const url = require('url')

//ipc inter process communication- using beetwen dialog
const ipc = require('electron').ipcMain


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1000, height: 600 })
  //mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false }) without frame
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/notifications.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

var menu = Menu.buildFromTemplate([
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Notify'
      },
      { type: 'separator' },
      {
        label: 'Exit',
        accelerator: 'Alt+F4',
        click() {
          app.quit()
        }
      }

    ]
  },
  {
    label: 'About',
    submenu: [
      {
        label: 'About app'
      },
      { type: 'separator' },
      {
        label: 'About Programmer',
        accelerator: 'F1',
        click() {
          shell.openExternal('http://blog.ionlyone.com.pl')
        }
      }
    ]
  },
  {
    label: 'Tools',
    submenu: [
      {
        label: 'Window',
        submenu: [
          {
            label: 'Set Full Screen',
            accelerator: 'F11',
            click() {
              if (mainWindow) {
                mainWindow.setFullScreen(true)
              }
            }
          },
          {
            label: 'Leave Full Screen',
            accelerator: 'Shift+F11',
            click() {
              if (mainWindow)
              {
                mainWindow.setFullScreen(false)                
              }
            }
          },
          {
            label: 'Refresh',
            accelerator: 'F5',
            click() {
              if (mainWindow)
                mainWindow.reload()
            }
          }
        ]
      },
      {
        label: 'Developer Tools',
        accelerator: 'F12',
        click() {
          if (mainWindow)
            mainWindow.webContents.openDevTools()
        }
      },
      { type: 'separator' },
      {
        label: 'GitHub',
        click() {
          shell.openExternal('https://github.com/dzbiku/electron-car')
        }
      }
    ]
  }
])
Menu.setApplicationMenu(menu);
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//ipc
ipc.on('update-notify-value', function (event, arg) {
  mainWindow.webContents.send('targetPriceVal', arg)
})
