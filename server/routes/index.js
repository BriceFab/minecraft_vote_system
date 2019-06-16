const config = require('../config/config');

module.exports = function (app) {
    const voteRoute = require('./vote.route');
    app.use('/vote', voteRoute);

    if (config.app.env === 'dev') {
        const testRoute = require('./test.route');
        app.use('/test', testRoute);
    }
};