const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const log = require('./services/log');
const response = require('./services/response');
const sequelize = require('./models/index').sequelize;
const config = require('./config/config');
const helmet = require('helmet');
const geoip = require('geoip-lite');
const httpStatus = require('http-status');

const app = express();

//Logs
app.use(logger(config.log.http_format, {
  stream: log.logHttp
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport
app.use(passport.initialize({}));

//Database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        log.logError(err);

        console.error('Unable to connect to the database');
    });

if (config.app.env === 'dev') {
    const force = JSON.parse(config.db.force);
    console.log(`clean db ${force}`);
    sequelize.sync({force: force});
}

//Update geoIP data
geoip.reloadData(() => {
    geoip.startWatchingDataUpdate();

    console.log('Update geoIp data');
});

//Helmet
app.use(helmet());

//Cors
app.use(cors());

//Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    return response.error(res, "Not Found", httpStatus.NOT_FOUND);
});

// error handler
app.use((err, req, res, next) => {
    err = config.app.env === 'dev' ? err : {};

    log.logError(err);

    return response.error(res, err, httpStatus.INTERNAL_SERVER_ERROR);
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', error);
    log.logError(error)
});

module.exports = app;