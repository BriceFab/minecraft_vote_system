const router = require('express').Router();
const validator = require('../middleware/validator')
const { oneOf, body } = require('express-validator');
const controller = require('../controllers/user.controller');

router.post('/register', [
    body('username', 'invalid username').exists(),
    body('password', 'invalid password').exists(),
    body('email', 'invalid email').exists().isEmail(),
], validator.controllerValidator, controller.register);
router.post('/login', [
    body('password', 'invalid password').exists(),
], oneOf([
    body('username').exists(),
    body('email').exists().isEmail(),
]), validator.controllerValidator, controller.login);

module.exports = router;