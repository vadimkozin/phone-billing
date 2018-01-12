for (let file of require('../common/lib').getFilesInDirectory(__dirname)) {
    module.exports[file] = require(`./${file}`);
}