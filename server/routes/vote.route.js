const router = require('express').Router();
const controller = require('../controllers/vote.controller');

router.post('/:id_server', controller.create);
router.post('/check/:token', controller.check);

module.exports = router;