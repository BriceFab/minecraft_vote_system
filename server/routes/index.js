const config = require('../config/config');

module.exports = function (app) {
    const testRoute = require('./test.route');

    if (config.app.env === 'dev') {
        app.use('/test', testRoute);
    }
};