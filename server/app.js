const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const log = require('./services/log');
const response = require('./services/response');
const sequelize = require('./models/index').sequelize;
const config = require('./config/config');

const app = express();

//Logs
app.use(logger('combined', {
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
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        log.logError(err);

        console.error('Unable to connect to the database');
    });

if (config.app.env === 'dev') {
    sequelize.sync({force: config.db.force});
}

//Cors
app.use(cors());

//Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    return response.error(res, "Not Found", 404);
});

// error handler
app.use((err, req, res, next) => {
    err = config.app.env === 'dev' ? err : {};

    log.logError(err);

    return response.error(res, err, 500);
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', error);
    log.logError(error)
});

module.exports = app;