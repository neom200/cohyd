const fs = require('fs');
const myArgs = process.argv.slice(2);

if (myArgs[0].search(".hcd") == -1) {
    console.log("The file needs to have appropriate extension");
    process.exit(1);
}

fs.open(myArgs[0], "r", (err, file) => {
    if (err) throw err;
    fs.readFile(file, (err,data) =>{
        if (err) throw err;
        console.log(data.toString());
    });
});