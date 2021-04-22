const MarkdownIt = require('markdown-it')
var md = new MarkdownIt()

function parseMarkdown(){
    let textContainer = document.querySelector("#md_editor")
    let previewContainer = document.querySelector('#preview>div')

    previewContainer.innerHTML = md.render(textContainer.value)
}