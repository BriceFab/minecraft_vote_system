const router = require('express').Router();
const controller = require('../controllers/type.controller');

router.get('/', controller.getAll);

module.exports = router;