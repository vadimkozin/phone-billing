const fs = require('fs');
const path = require('path');

// Возвращает список файлов в dirname, исключая те что в списке exclude_files
module.exports.getFilesInDirectory = function(dirname, exclude_files=['index.js']) {
    let files = fs.readdirSync(dirname);
    let arr = [];
    for (let file of files) {
        if (exclude_files.indexOf(file) === -1) {
            let name = path.basename(file, '.js');
            arr.push(name);
        }
    }
    return arr;
}
/*
const fs = require('fs');
const path = require('path');

let index = path.basename(__filename);
let files = fs.readdirSync(__dirname);

for (let file of files) {
    if (file !== index) {
        let name = path.basename(file, '.js');
        module.exports[name] = require(`./${file}`);
    }
}
*/