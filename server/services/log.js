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
    return path.join(`./logs/${config.app.env}/`, `${type}_${format.asString('dd.MM.yy', new Date())}.log`);
}