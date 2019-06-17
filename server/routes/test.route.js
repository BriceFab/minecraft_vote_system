const router = require('express').Router();
const controller = require('../controllers/test.controller');

router.get('/vote', controller.postVote);
router.get('/check/:token', controller.checkVote);
router.get('/association', controller.association);

module.exports = router;