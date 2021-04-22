const {app, Menu, dialog, shell, BrowserWindow} = require('electron')

 //Set native menubar
 var template = [
    {
      label: "&File",
      submenu: [
        {
          label: "New", 
          accelerator: "CmdOrCtrl+N", 
          click: () => {
            var focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.webContents.send('file-new');
          }
        },
        {
          label: "Open", 
          accelerator: "CmdOrCtrl+O", 
          click: () => { //open File
            
          }
        },
        {
          label: "Save", 
          accelerator: "CmdOrCtrl+S", 
          click: () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.webContents.send('file-save');
          }
        },
        {
          label: "Save As", 
          accelerator: "CmdOrCtrl+Shift+S", 
          click: () => {
            var focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.webContents.send('file-save-as');
          }
        },
        {
          label: "Quit", 
          accelerator: "CmdOrCtrl+Q", 
          click: app.quit
        }
      ]
    },
    {
      label: "&Edit",
      submenu: [
        {
          label: "Undo", 
          accelerator: "CmdOrCtrl+Z", 
          role: "undo"
        },
        {
          label: "Redo", 
          accelerator: "Shift+CmdOrCtrl+Z", 
          role: "redo"
        },
        {
          type: "separator"
        },
        {
          label: "Cut", 
          accelerator: "CmdOrCtrl+X", 
          role: "cut"
        },
        {
          label: "Copy", 
          accelerator: "CmdOrCtrl+C", 
          role: "copy"
        },
        {
          label: "Paste", 
          accelerator: "CmdOrCtrl+V", 
          role: "paste"
        },
        {
          label: "Select All", 
          accelerator: "CmdOrCtrl+A", 
          role: 'selectall'
        },
        {
          type: "separator"
        },
        {
          label: "Search", 
          accelerator: "CmdOrCtrl+F", 
          click: () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.webContents.send('ctrl+f');
          }
        },
        {
          label: "Replace", 
          accelerator: "CmdOrCtrl+Shift+F", 
          click: () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            focusedWindow.webContents.send('ctrl+shift+f');
          }
        }
      ]
    },
    {
      label: "&View",
      submenu: [
        {
          label: "Toggle Full Screen", 
          accelerator:"F11", 
          click: () => {
            let focusedWindow = BrowserWindow.getFocusedWindow();
            let isFullScreen = focusedWindow.isFullScreen();
            focusedWindow.setFullScreen(!isFullScreen);
          }
        },
        {
            label:'Reload',
            accelerator:'F5',
            role:'reload'
        }
      ]
    },
    {
      label: "&Help",
      submenu: [
        {
          label: "Documentation", 
          click:  () => {
            shell.openExternal(appDetails.repository.docs);
          }
        },
        {
          label: "Report Issue", 
          click: () => {
            shell.openExternal(appDetails.bugs.url);
          }
        },
        {
            label: "Developer Tools", 
            accelerator:"F12",
            role:"toggledevtools"
          },
        {
          label: "About Markdownify", 
          click: () => {
            dialog.showMessageBox({title: "About Markdownify", type:"info", message: "A minimal Markdown Editor desktop app. \nMIT Copyright (c) 2016 Martin Hwang <martin.hwang@outlook.com>", buttons: ["Close"] });
          }
        }
      ]
    }
  ]
 
var list = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(list)