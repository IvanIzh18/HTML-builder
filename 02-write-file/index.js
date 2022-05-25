const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

stdout.write('Доброго дня Вам! Будьте любезны ввести текст.\n');

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
    }
);
let text = '';
stdin.on('data', data => {
    let dataStr = data.toString();
    if (dataStr.replace('\r\n', '') === 'exit') {
        process.exit();
    } else {
        text += dataStr;
        fs.appendFile(
            path.join(__dirname, 'text.txt'), dataStr,
            err => {
                if (err) throw err;
                console.log('Файл был изменен');
            }
        );
    };
});
console.log(path.join(__dirname, 'text.txt'));
process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));
process.on('SIGINT', () => process.exit());
