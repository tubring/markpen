const { app, dialog, ipcMain } = require("electron")
const fs = require('fs')
const path = require('path')

const newFile = ()=>{

}

const newFolder = ()=>{
}

const openFile = (realpath)=>{

    let defaultPath = path.join(__dirname,'../doc')
    let filepath = realpath?realpath:dialog.showOpenDialogSync({
        title:'Open File',
        defaultPath:defaultPath,
        filters:[
            {name:'Markdown File', extensions:['md','markdown']},
            {name:'Text File', extensions:['txt']},
        ],
        properties:['openFile']
    })[0]
    console.log('path:',filepath)
    if(filepath){
        let ext = path.extname(filepath)
        console.log(ext)
        if(ext != '.md' && ext != '.txt' && ext != '.markdown' && ext != '.html') return //
        const fileData = fs.readFileSync(filepath,'utf-8')
        return {data: fileData, filename:filepath}
    }
    
}

const openFolder = (dirpath='')=>{
    const filesList = [];
    let defaultPath = path.join(__dirname,'../doc')
    let dirPaths = dialog.showOpenDialogSync({
        title:'Open Folder',
        defaultPath:defaultPath,
        properties:['openDirectory'],
    })

    if(dirPaths){
        let files = fs.readdirSync(dirPaths[0])
        files.forEach((item)=>{
            let realPath = path.join(dirPaths[0],item)
            // console.log(realPath)
            let formatPath = realPath.replaceAll("\\","\\\\")
            let stat= fs.statSync(realPath)
            if(stat.isDirectory()){
                // filesList.push({name:item,realpath:formatPath,type:'dir'}) //不显示文件夹，后续视情况调整
            }else{
                let ext = path.extname(realPath)
                if(ext == '.md' || ext == '.txt' || ext == '.markdown' || ext == '.html') {
                    filesList.push({name:item,realpath:formatPath,type:'file'})
                }
            }
        })
        let dirs = dirPaths[0].split(path.sep)
        return {list:filesList,dir:dirs[dirs.length-1]}
    }
   
}


const saveFileAs = (data)=>{
    dialog.showSaveDialog({
        title:'Save',
        defaultPath:'',
    }).then((diaRes)=>{
        if(!diaRes.canceled){
            //load file
            fs.writeFile(diaRes.filePath,data,'utf-8',()=>{
                console.log(data)
                console.log('saveAs success')
            })
            
        }
    })
}

const saveFile = (data)=>{

    fs.writeFile(data.filename,data.data,'utf-8',()=>{
        console.log(data)
        console.log('Save success')
    })
    
}

const showAbout = () =>{
    let message = {title: "About MarkDo", type:"info", message: "A minimal Markdown Editor desktop app. \nMIT Copyright (c) 2016 Martin Hwang <martin.hwang@outlook.com>", buttons: ["Close"] }
    dialog.showMessageBox(message)
}

const quitApp = ()=>{
    app.quit();
}

const autoSave = (data) =>{
    var id = setInterval(() => {
        saveFile(data)
    }, 60000);
}

const clearAutoSave = (id) => { //关闭时清除
    clearInterval(id)
}

module.exports = { newFile, newFolder, openFile, openFolder, saveFile, saveFileAs, quitApp, showAbout }