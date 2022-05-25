const fs = require('fs');
const path = require('path');

let filesFiltr = [];
let extNameFile = [];

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

        for (let i = 0; i < filesFiltr.length; i++) {
            fs.stat(path.join(__dirname, 'secret-folder', filesFiltr[i]),
                (err, stats) => {
                    if (err) throw err;
                    console.log(`${filesFiltr[i].replace(extNameFile[i], '')} - ${extNameFile[i].replace('.', '')} - ${(stats.size / 1024).toFixed(3) + 'kb'}`)
                }
            );
        }

    }
);
