const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const log = require('./services/log');
const geoip = require('geoip-lite');
const response = require('./services/response');
const sequelize = require('./models/index').sequelize;
const httpStatus = require('http-status');
const config = require('./config/config');

const app = express();

//Logs
app.use(logger(config.log.http_format, {
  stream: log.logHttp
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport
app.use(passport.initialize({}));
app.use(passport.session({}));

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

    sequelize.sync({force: force}).then((res) => {
        console.log(`clean db ${force}`);

        if (force) {
            const sequelize_fixtures = require('sequelize-fixtures');
            const models = require('./models');

            sequelize_fixtures.loadFile('fixtures/*.json', models).then((res) => {
                console.log('load fixtures successfully');
            });
        }
    });
}

//Update geoIP data
geoip.reloadData(() => {
    geoip.startWatchingDataUpdate();

    console.log('Update geoIp data');
});

//Cors
app.use(cors());

//Helmet
app.use(helmet());

//Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    return response.error(res, 'not found', httpStatus.NOT_FOUND);
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