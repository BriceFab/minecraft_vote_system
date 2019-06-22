const response = require('../services/response');
const { validationResult } = require('express-validator');

module.exports.controllerValidator = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors !== undefined && errors.length > 0) {
        response.sendValidatorError(res, errors);
    } else {
        next();
    }
};