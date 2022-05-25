const fs = require('fs');
const path = require('path');

let filesFiltr = [];
let OldFilesFiltr = [];

let oldDirectory = path.join(__dirname, 'files');
let directory = path.join(__dirname, 'files-copy');
// console.log(directory);

fs.readdir(oldDirectory, { withFileTypes: true },
    (err, files) => {
        if (err) throw err;

        for (let item of files) {
            if (item.isFile() == true) {
                OldFilesFiltr.push(item.name);
            };
        };
        // console.log(OldFilesFiltr);
    })

fs.access(directory, (error) => {
    if (error) {
        console.log('Папка "files-copy" не найдена')

        fs.mkdir(path.join(__dirname, 'files-copy'), err => {
            if (err) throw err;
            console.log('Папка "files-copy" была создана');
        });
        for (let i = 0; i < OldFilesFiltr.length; i++) {
            fs.copyFile((path.join(oldDirectory, OldFilesFiltr[i])), (path.join(directory, OldFilesFiltr[i])), err => {
                if (err) throw err; // не удалось скопировать файл/ы
                console.log('Файл/ы успешно скопирован/ы');
            });
        }
    } else {

        fs.readdir(directory, { withFileTypes: true },
            (err, files) => {
                if (err) throw err;

                for (let item of files) {
                    if (item.isFile() == true) {
                        filesFiltr.push(item.name);
                    };
                };
                for (let i = 0; i < filesFiltr.length; i++) {

                    fs.unlink((path.join(directory, filesFiltr[i])), (err) => {
                        if (err) throw err; // не удалось удалить файл
                        console.log(`${filesFiltr[i]} успешно удален`);
                    });
                }

                fs.rmdir(directory, err => {
                    if (err) throw err; // не удалось удалить папку
                    console.log('Папка "files-copy" успешно удаленa');
                });

                fs.mkdir(path.join(__dirname, 'files-copy'), err => {
                    if (err) throw err;
                    console.log('Папка "files-copy" была создана');
                });

                for (let i = 0; i < OldFilesFiltr.length; i++) {
                    fs.copyFile((path.join(oldDirectory, OldFilesFiltr[i])), (path.join(directory, OldFilesFiltr[i])), err => {
                        if (err) throw err; // не удалось скопировать файл/ы
                        console.log('Файл/ы успешно скопирован/ы');
                    });
                }
            });
    };
});
