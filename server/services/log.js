const fs = require('fs');
const format = require('date-format');
const path = require('path');
const config = require('../config/config');

module.exports.logHttp = fs.createWriteStream(getFileName('http'), { flags: 'a' });

module.exports.logError = (err) => {
    fs.appendFile(getFileName('error'), err + '\r\n', {flag: 'a'}, (err) => {
        if (err) throw err;
    });
};

module.exports.LogSequelize = (message) => {
    fs.appendFile(getFileName('sequelize'), message + '\r\n', {flag: 'a'}, (err) => {
        if (err) throw err;
    });
};

function getFileName(type) {
    const dir = `./logs/${config.app.env}/${format.asString('dd.MM.yyyy', new Date())}/`;
    if (!fs.existsSync(dir)) {
        console.log('create ' + dir);
        fs.mkdirSync(dir);
    }
    return path.join(dir, `${type}.log`);
}