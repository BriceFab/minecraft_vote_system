const httpStatus = require('http-status');

module.exports.sendSuccess = (res, data, code) => {
    res.status(code ? code : httpStatus.ACCEPTED).json({
        success: true,
        data
    });
};

module.exports.sendError = (res, err, code) => {
    if (err === undefined) err = 'unknown error';
    res.status(code ? code : httpStatus.UNAUTHORIZED).json({
        success: false,
        error: err
    });
};

module.exports.sendSequelizeError = (res, err, code) => {
    let error = {};
    if (err.errors !== undefined && err.errors.length > 0) {
        const errors = err.errors.map(error => error.message);
        error = {messages: errors};
    } else {
        error = err;
    }
    this.sendError(res, error, code);
};