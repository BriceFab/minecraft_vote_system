const router = require('express').Router();
const validator = require('../middleware/validator')
const { oneOf } = require('express-validator');
const controller = require('../controllers/user.controller');
const userValidator = require('./validators/user.validator');

router.post('/register', [
    userValidator.username,
    userValidator.password,
    userValidator.email,
], validator.controllerValidator, controller.register);

router.post('/login', [
    userValidator.password
], oneOf([
    userValidator.username,
    userValidator.email,
]), validator.controllerValidator, controller.login);

module.exports = router;