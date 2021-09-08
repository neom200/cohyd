const fs = require('fs');

function analisaConteudo(content){
    string_contents = ``;
    content.pop();
    content.pop()
    content.forEach(elem => {
        if (elem.search("META:") != -1){
            let x = elem.split(':')[0].trim();
            let y = elem.split(':')[1].trim();
            let z = y.split(',');
            string_contents += `\n<${x} ${z[0].trim()}=${z[1].trim()}>`;
        }
        else if (elem.search("META:") == -1) {
            let x = elem.split(':')[0];
            let y = elem.split(':')[1];
            string_contents += `\n<${x}>${y}</${x}>`;
        }
    })
    string_contents += `\n<script src="body_cohyd.js"></script>`
    return string_contents;
}

function createHead(files, head){
    if (head.toString().search("HEAD") == -1){
        console.log("you need the head");
        process.exit();
    }
    var axa = "";
    let pages_head = head.toString().split('\n');
    for (let j=0; j<pages_head.length; j++){
        if (pages_head[j].search("HEAD") != -1){
            axa = pages_head[j];
        }
    }
    pages_head = axa.split("=")[1];

    var conteudo = head.toString().split('\n');
    let novo = []
    for (let k=3; k<conteudo.length-1; k++){
        novo.push(conteudo[k]);
    }
    conteudo = novo;

    conteudo = analisaConteudo(conteudo);

    files.forEach(file => {
        fs.open(`${file}.html`, "a", (err, arquivo) => {
            if (err) throw err;
            let nova_cabeca = `\n<head>${conteudo}\n</head>`;
            fs.appendFile(arquivo, nova_cabeca, (err) => {
                if (err) throw err;
            })
        })
    });
}

exports.createHead = createHead;