const response = require('../services/response');
const { validationResult } = require('express-validator');

module.exports.controllerValidator = (req, res, next) => {
    const errors = validationResult(req).errors;

    if (errors !== undefined && errors.length > 0) {
        let displayErrors = [];

        errors.forEach(error => {
            if (error.nestedErrors) {
                error.nestedErrors.forEach(nestedError => {
                    displayErrors.push(nestedError);
                })
            } else {
                displayErrors.push(error);
            }
        });

        response.sendValidatorError(res, displayErrors);
    } else {
        next();
    }
};