const config = require('../config/config');
const jwt = require('jsonwebtoken');
const log = require('../services/log');
const response = require('../services/response');
const httpStatus = require('http-status');
const interceptor = require('express-interceptor');

module.exports.requestInterceptor = (req, res, next) => {
    if (req.body.encrypted) {
        try {
            req.body = jwt.verify(req.body.data, config.jwt.request_encryption);
        } catch(err) {
            console.log('jwt verify error', err);
            log.logError(err);
        }
    } else {
        if (config.app.env != 'dev') {
            return response.sendError(res, 'encryption required', 'encryption', httpStatus.UNAUTHORIZED);
        }
    }
    next();
};

module.exports.responseInterceptor = interceptor(function (req, res) {
    return {
        isInterceptable: () => {
            // return req.body.encrypted || config.app.env != 'dev';
            return config.app.env != 'dev';
        },
        intercept: (body, send) => {
            try {
                send(JSON.stringify({
                    encrypted: true,
                    data: jwt.sign(body, config.jwt.request_encryption),
                }));
            } catch(err) {
                log.logError(err)
                send(body);
            }
        }
    };
});