const { ipcRenderer, dialog } = require("electron");

let editor = document.querySelector('#md_editor')
let title = document.querySelector('#title')
let editor_container = document.querySelector('#editor')
let preview_container = document.querySelector('#preview')
let btn = document.querySelectorAll('.btn')

const handleQuit = () =>{
    ipcRenderer.send('app.quit')
}

const handleMinimize = () => {
    ipcRenderer.send('app.minimize')
}

const handleMaxmize = () => {
    ipcRenderer.send('app.maxmize')
}

const handleNew = () => {
    ipcRenderer.send('new-file')
}

const handleOpenFile = (path='') => {
    ipcRenderer.send('open-file',path)
}

const handleOpenFolder = () => {
    ipcRenderer.send('open-folder')
}

const handleSave = () => {
    let data = editor.value
    let filename = title.innerHTML
    console.log('save data:',data)
    ipcRenderer.send('save-file',{data,filename})
}

const handleSaveAs = () => {
    let data = editor.value
    console.log('save data:',data)
    ipcRenderer.send('save-as',data)
}

const handleReload = ()=>{
    console.log('reload')
    ipcRenderer.send('app.reload')
}

const handleDevTools = () =>{
    ipcRenderer.send('app.devtools')
}

const handleFullScreen = () =>{
    ipcRenderer.send('app.fullscreen')
}

const handleAbout = () =>{
    ipcRenderer.send('app.about')
}

const handleStatusbar = (message='')=>{
    let statusBar =  document.querySelector('status')
    statusBar.innerHTML = '<p>' + message + '</p>'
}

// ipcRenderer.send('tab.close')

ipcRenderer.on('open-file',(event,data)=>{
    console.log(data)
    editor.value = data.data
    title.innerHTML = data.filename
    parseMarkdown()
})

ipcRenderer.on('open-folder',(event,data)=>{
    let dir = data.dir //todo: 
    let list = data.list?data.list:[]
    let html = '<span class="file-item dir icon-dir"> ' + dir + '</span>'
    html += '<ul class="">'
    // console.log(data.list)
    list.forEach((item)=>{
        if(item.type=='file'){

            html += '<li class="file-item sub-item icon-file" onclick="handleOpenFile(\''+ item.realpath +'\')">' + item.name +'</li>'
        }else if(item.type == 'dir'){
            html += '<li class="file-item sub-item icon-dir">' + item.name + '</li>'
        }
    })
    html += '</ul>'
    // console.log(html)
    let folderContainer = document.querySelector('#files-container')
    folderContainer.innerHTML = html
})

ipcRenderer.on('status-message',(event, data='')=>{
    handleStatusbar(data)
})

//快捷键
shortcut.add('Ctrl+N',()=>{
    handleNew()
})

shortcut.add('Ctrl+O',()=>{
    handleOpenFile()
})
shortcut.add('Ctrl+K',()=>{
    handleOpenFolder()
})

shortcut.add('Ctrl+S',()=>{
    handleSave()
})

shortcut.add('Ctrl+Shift+S',()=>{
    handleSaveAs()
})

shortcut.add('Alt+Q',()=>{
    handleQuit()
})

shortcut.add('F5',()=>{
    handleReload()
})

shortcut.add('F11',()=>{
    handleFullScreen()
})

shortcut.add('F12',()=>{
    handleDevTools()
})

shortcut.add('Alt+P',()=>{
    let _this = document.querySelector('#btn-preview')
    handlePreviewMode(_this)
})

shortcut.add('Alt+E',()=>{
    let _this = document.querySelector('#btn-edit')
    handleEditMode(_this)
})

shortcut.add('Alt+R',()=>{
    let _this = document.querySelector('#btn-read')
    handleReadMode(_this)
})

//预览模式
const handlePreviewMode = (_this)=>{
    activeButton(_this)
    preview_container.removeAttribute('style')
    editor_container.removeAttribute('style')
}

//编辑模式
const handleEditMode = (_this)=>{
    activeButton(_this)
    preview_container.style.display = "none"
    editor_container.style.display = "block"
    editor_container.style.width = "100%"
}

//阅读模式
const handleReadMode = (_this)=>{
    activeButton(_this)
    preview_container.style.display = "block"
    editor_container.style.display = "none"
    preview_container.style.width = "100%"
}

const activeButton = (_this)=>{
    btn.forEach((item)=>{
        item.classList.remove('btn-active')
    })
    _this.classList.add('btn-active')

}


const autoSave = () =>{ //自动保存
    let id = setInterval(() => {
        handleSave()
    }, 60000);
    return id;
}

const clearAutoSave = (id) => { //关闭时清除
    clearInterval(id)
}