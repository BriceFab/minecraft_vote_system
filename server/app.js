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
const proxy = require('express-http-proxy');
const rateLimit = require('express-rate-limit');
const requestInterceptor = require('./middleware/interceptor').requestInterceptor;
const responseInterceptor = require('./middleware/interceptor').responseInterceptor;

const app = express();

//Proxy
app.set('trust proxy', ['127.0.0.1', '172.22.22.59']);

if (config.app.env === 'dev') {
    app.use('/test/login', proxy('www.scandicraft.net', {
        proxyReqOptDecorator: () => {
            return Promise.reject('proxy are not allowed');
        },
        proxyErrorHandler: (err, res, next) => {
            response.sendError(res, err, httpStatus.METHOD_NOT_ALLOWED);
        },
    }));
}

//Limit
const voteLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 50,
    handler: (req, res) => {
        response.sendError(res, 'too many requests, please try again later', 'limit', httpStatus.TOO_MANY_REQUESTS);
    }
});

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100,
    handler: (req, res) => {
        response.sendError(res, 'too many requests, please try again later', 'limit', httpStatus.TOO_MANY_REQUESTS);
    }
});

app.use('/vote', voteLimiter);
app.use(limiter);

//Logs
app.use(logger(config.log.http_format, {
    stream: log.logHttp
}));

//Body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport
app.use(passport.initialize({}));

//Request interceptor
app.use(requestInterceptor);

//Response interceptor
app.use(responseInterceptor);

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

    sequelize.sync({ force: force }).then((res) => {
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

//Helmet
app.use(helmet());

//Cors
const corsOptions = {
    exposedHeaders: [
        'X-RateLimit-Limit',
        'X-RateLimit-Remaining',
        'X-RateLimit-Reset'
    ]
}

app.use(cors(corsOptions));

//Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    response.sendError(res, 'not found', httpStatus.NOT_FOUND);
});

// error handler
app.use((err, req, res, next) => {
    err = config.app.env === 'dev' ? err : {};

    log.logError(err);

    response.sendError(res, err, httpStatus.INTERNAL_SERVER_ERROR);
});

//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection at:', error);
    log.logError(error);
});

module.exports = app;