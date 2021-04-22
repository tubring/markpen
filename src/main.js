const { app, Menu, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const path = require('path')
const fs = require('fs')
const { newFile, newFolder, openFile, openFolder, saveFile, saveFileAs, quitApp, showAbout } = require('../scripts/function')
var mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    show:false,
    frame:false,
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // mainWindow.webContents.openDevTools();//for debug
  mainWindow.maximize()
  mainWindow.show()
  mainWindow.loadFile('index.html')
    
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

})

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


// require('./menu.js')

ipcMain.on('app.quit',()=>{
  app.quit()
})


ipcMain.on('app.minimize',()=>{
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.minimize()
})

ipcMain.on('app.maxmize',()=>{
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.maximize()
})

ipcMain.on('app.maxmize',()=>{
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.maximize()
})

ipcMain.on('app.reload',()=>{
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.reload()
})

ipcMain.on('app.devtools',()=>{
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.openDevTools()
})

ipcMain.on('app.fullscreen',()=>{
  let focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.setFullScreen(true)
})

ipcMain.on('open-file',(event,data)=>{
  let fileData = openFile(data)
  console.log(fileData)
  if(fileData != undefined){
    mainWindow.webContents.send('open-file',fileData)
  }
}) 

ipcMain.on('save-file',(event,data)=>{
  console.log('received:',data)
  if(data.filename==undefined || data.filename==''){
    saveFileAs(data)
  }else{
    saveFile(data)
  }
})

ipcMain.on('save-as',(event,data)=>{
  console.log('received:',data)
  saveFileAs(data)
})

ipcMain.on('open-folder',(event, data)=>{
  let files = openFolder()
  if(files==undefined) return;
  mainWindow.webContents.send('open-folder',files)
})

ipcMain.on('app.about', (event,data)=>{
  showAbout()
})