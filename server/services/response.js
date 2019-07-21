const httpStatus = require('http-status');

module.exports.sendSuccess = (res, data, code) => {
    res.status(code ? code : httpStatus.ACCEPTED).json({
        success: true,
        data
    });
};

module.exports.sendError = (res, messages, type, code = httpStatus.UNKNOWN_ERROR) => {
    if (messages === undefined) messages = 'unknown error';
    if (type === undefined) type = 'reponse';

    res.status(code ? code : httpStatus.BAD_REQUEST).json({
        success: false,
        error: {
            type: type,
            messages: typeof messages === 'string' ? messages.split() : messages
        }
    });
};

module.exports.sendSequelizeError = (res, err) => {
    let errors = [];
    if (err.errors !== undefined && err.errors.length > 0) {
        errors = err.errors.map(error => error.message);
        // error = {
        //     type: 'orm',
        //     messages: errors
        // };
    } else {
        errors = err;
    }
    this.sendError(res, errors, 'orm', httpStatus.UNPROCESSABLE_ENTITY);
};

module.exports.sendValidatorError = (res, err) => {
    let errors = [];
    if (err.length > 0) {
        // const errors = [];
        err.forEach(error => {
            const actError = `${error.param}: ${error.msg}`;
            if (!errors.includes(actError)) {
                errors.push(actError);
            }
        });
        // error = {
        //     type: 'validator',
        //     messages: errors
        // };
    } else {
        errors = err;
    }
    this.sendError(res, errors, 'validator', httpStatus.UNPROCESSABLE_ENTITY);
};

module.exports.secureObject = (object, keys) => {
    if (object === undefined) return null;
    object = JSON.parse(JSON.stringify(object));

    let secureObject = {};
    keys.map(key => {
        let value = object[key];
        if (value === undefined) value = null;
        secureObject[key] = value;
    })
    return secureObject;
} 