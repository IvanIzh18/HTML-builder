const fs = require('fs');
const path = require('path');

let filesFiltr = [];
let extNameFile = [];
let sizeFile = [];

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true },
    (err, files) => {
        if (err) throw err;

        for (let item of files) {
            if (item.isFile() == true) {
                filesFiltr.push(item.name);
            }
        }
        // console.log(filesFiltr);

        for (let item of filesFiltr) {
            extNameFile.push(path.extname(item));
        }
        // console.log(extNameFile);


        for (let item of filesFiltr) {
            fs.stat(path.join(__dirname, 'secret-folder', item),
                (err, stats) => {
                    if (err) throw err;
                    sizeFile.push((stats.size / 1024).toFixed(3) + 'kb');
                    // console.log(sizeFile);
                }
            );
        }

    }
);
setTimeout(() => {

    for (let i = 0; i < filesFiltr.length; i++) {
        console.log(`${filesFiltr[i].replace(extNameFile[i], '')} - ${extNameFile[i].replace('.', '')} - ${sizeFile[i]}`)
    }
}, 10)
