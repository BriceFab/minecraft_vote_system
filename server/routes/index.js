const config = require('../config/config');

module.exports = function (app) {
    const voteRoute = require('./vote.route');
    const userRoute = require('./user.route');
    const typeRoute = require('./type.route');
    const serverRoute = require('./server.route');

    app.use('/vote', voteRoute);
    app.use('/user', userRoute);
    app.use('/type', typeRoute);
    app.use('/server', serverRoute);

    if (config.app.env === 'dev') {
        const testRoute = require('./test.route');
        const translateRoute = require('./translate.route');

        app.use('/test', testRoute);
        app.use('/translate', translateRoute);
    }
};