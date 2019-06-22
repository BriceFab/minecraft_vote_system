const config = require('../config/config');

module.exports = function (app) {
    const voteRoute = require('./vote.route');
    const userRoute = require('./user.route');

    app.use('/vote', voteRoute);
    app.use('/user', userRoute);

    if (config.app.env === 'dev') {
        const testRoute = require('./test.route');
        app.use('/test', testRoute);
    }
};