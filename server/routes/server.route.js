const router = require('express').Router();
const validator = require('../middleware/validator')
const response = require('../services/response');
const httpStatus = require('http-status');
const { oneOf } = require('express-validator');
const controller = require('../controllers/server.controller');
const userValidator = require('./validators/server.validator');
const rateLimit = require('express-rate-limit');

router.post('/', [
    userValidator.name,
    userValidator.url,
    userValidator.ip,
    userValidator.description,
    userValidator.banner,
    userValidator.type,
], validator.controllerValidator, controller.register);

module.exports = router;