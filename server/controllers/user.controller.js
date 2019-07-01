const response = require('../services/response');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {user} = require('../models');

/**
 * TODO validation email
 * captcha or CSRF ?
 */
module.exports.register = async (req, res) => {
    user.create(req.body).then(res_user => {
        return response.sendSuccess(res, 'created');
    }).catch(error => {
        return response.sendSequelizeError(res, error);
    });
};

/**
 * TODO Check if user has validate the email
 */
module.exports.login = async (req, res) => {
    const {username, email, password} = req.body;

    user.findUser(username, email).then(res_user => {
        if (!res_user) return response.sendError(res, 'invalid password or username');

        const passwordMatch = user.comparePassword(password, res_user.password);
        if (passwordMatch) {
            const token = jwt.sign({id_user: res_user.id_user}, config.jwt.encryption, {expiresIn: config.jwt.expiration});

            response.sendSuccess(res, {
                token: token,
            });
        } else {
            response.sendError(res, 'invalid password or username');
        }
    }).catch(error => {
        return response.sendSequelizeError(res, error);
    });
};