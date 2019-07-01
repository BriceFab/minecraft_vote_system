const router = require('express').Router();
const validator = require('../middleware/validator')
const { body, param } = require('express-validator');
const controller = require('../controllers/translate.controller');

router.get('/:lng', [
    param('lng').exists(),
], validator.controllerValidator, controller.get);

router.post('/:lng', [
    param('lng').exists(),
    body('term').exists(),
], validator.controllerValidator, controller.post);

module.exports = router;