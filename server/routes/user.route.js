const router = require('express').Router();
const validator = require('../middleware/validator')
const response = require('../services/response');
const httpStatus = require('http-status');
const { oneOf } = require('express-validator');
const controller = require('../controllers/user.controller');
const userValidator = require('./validators/user.validator');
const rateLimit = require('express-rate-limit');

router.post('/register', [
    userValidator.username,
    userValidator.password,
    userValidator.email,
], validator.controllerValidator, controller.register);

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    handler: (req, res) => {
        response.sendError(res, 'too many requests, please try again later', 'limit', httpStatus.TOO_MANY_REQUESTS);
    }
});

router.post('/login', [
    userValidator.password
], oneOf([
    userValidator.username,
    userValidator.email,
]), validator.controllerValidator, loginLimiter, controller.login);

module.exports = router;