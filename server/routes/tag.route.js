const router = require('express').Router();
const controller = require('../controllers/tag.controller');

router.get('/:id_type', controller.getAllByType);

module.exports = router;