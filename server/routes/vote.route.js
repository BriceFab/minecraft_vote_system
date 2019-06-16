const router = require('express').Router();
const controller = require('../controllers/vote.controller');

router.post('/create', controller.create);
router.post('/check/:token', controller.check);

module.exports = router;