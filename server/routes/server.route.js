const router = require('express').Router();
const validator = require('../middleware/validator')
const controller = require('../controllers/server.controller');
const userValidator = require('./validators/server.validator');
const passport = require('passport');
require('./../middleware/passport')(passport);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    [
        userValidator.name,
        userValidator.url,
        userValidator.ip,
        userValidator.description,
        userValidator.banner,
        userValidator.type,
    ], validator.controllerValidator,
    controller.add
);

module.exports = router;