const router = require('express').Router();
const validator = require('../middleware/validator')
const controller = require('../controllers/server.controller');
const userValidator = require('./validators/server.validator');
const passport = require('passport');
require('./../middleware/passport')(passport);
const { param } = require('express-validator');

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

router.get('/my',
    passport.authenticate('jwt', { session: false }),
    controller.getAllMy
);

router.delete('/my/:id_server',
    passport.authenticate('jwt', { session: false }),
    [
        param('id_server')
            .isUUID().withMessage('server invalide')
    ], validator.controllerValidator,
    controller.deleteMy
);

module.exports = router;