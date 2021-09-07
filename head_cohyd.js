const fs = require('fs');

function analisaConteudo(content){
    string_contents = ``;
    content.forEach(elem => {
        if (elem.search("META:") != -1){
            let x = elem.split(':')[0].trim();
            let y = elem.split(':')[1].trim();
            let z = y.split(',');
            string_contents += `<${x} ${z[0].trim()}=${z[1].trim()}>\n`;
        }
        else if (elem.search("META:") == -1) {
            let x = elem.split(':')[0];
            let y = elem.split(':')[1].toString().split(',')[0];
            string_contents += `<${x}>${y} </${x}>\n`;
        }
    })
    string_contents += `<script src="./body_cohyd.js"></script>\n`
    return string_contents;
}

function createHead(files, head){
    if (head.toString().search("HEAD=") == -1){
        console.log("you need the head");
        process.exit();
    }
    var axa = "";
    let pages_head = head.toString().split('\n');
    for (let j=0; j<pages_head.length; j++){
        if (pages_head[j].search("HEAD=") != -1){
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
            let nova_cabeca = `<head>\n${conteudo}</head>`;
            fs.appendFile(arquivo, nova_cabeca, (err) => {
                if (err) throw err;
            })
        })
    });
}

exports.createHead = createHead;