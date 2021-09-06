const fs = require('fs');

function analisaConteudo(content){
    console.log(content);
    return content;
}

function createHead(files, head){
    if (head.trim().search("HEAD=") == -1){
        console.log("you need the head");
        process.exit();
    }
    let pages_head = head.split('\n')[0].split("=")[1];
    let conteudo = head.split('\n')[1].trim();

    conteudo = analisaConteudo(conteudo);

    files.forEach(file => {
        fs.open(`${file}.html`, "a", (err, arquivo) => {
            if (err) throw err;
            let nova_cabeca = `<head>\n${conteudo}\n</head>`;
            fs.appendFile(arquivo, nova_cabeca, (err) => {
                if (err) throw err;
            })
        })
    });
}

exports.createHead = createHead;