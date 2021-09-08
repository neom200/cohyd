const fs = require('fs');
const myArgs = process.argv.slice(2);
const header = require('./head_cohyd');
const corpo= require('./body_cohyd');

if (myArgs[0].search(".chd") == -1) {
    console.log("The file needs to have appropriate extension");
    process.exit(1);
}

fs.open(myArgs[0], "r", (err, file) => {
    if (err) throw err;
    fs.readFile(file, (err,data) =>{
        if (err) throw err;
        var dados = data.toString().trim();
        let paginas = dados.split(";")[0];
        if (paginas.search("PAGES:") == -1){
            console.log("You must specify the pages you want");
            process.exit(1);
        }
        let nomes_pages = paginas.split(":")[1].trim().split(",");
        for (let i=0; i<nomes_pages.length; i++){
            fs.appendFile(`${nomes_pages[i]}.html`, "<!doctype html>\n<html>\n", (err) => {
                if (err) throw err;
            })
        }
        
        header.createHead(nomes_pages, dados.split("BODY")[0].split(';'));
        //corpo.createBody(nomes_pages, dados.split("ENDHEAD;")[1]);

        for (let i=0; i<nomes_pages.length; i++){
            fs.appendFile(`${nomes_pages[i]}.html`, "\n</html>", (err) => {
                if (err) throw err;
            })
        }
    });
});