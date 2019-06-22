const router = require('express').Router();
const controller = require('../controllers/test.controller');
// const cors = require('cors');
const passport = require('passport');
require('./../middleware/passport')(passport);

// var whitelist = ['http://example1.com', 'http://example2.com', 'localhost'];
// var corsOptions = {
//     origin: function (origin, callback) {
//         console.log('origin', origin)
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             // callback(null, true)
//             callback('Not allowed by CORS')
//         }
//     },
//     preflightContinue: true
// };

router.get('/vote', controller.postVote);
router.get('/check/:token', controller.checkVote);
// router.get('/association', cors(corsOptions), controller.association);
router.get('/association', controller.association);

router.get('/geoip', passport.authenticate('jwt', {
    session: false,
}
/*
, (error, user, info) => {
    console.log('passport callback')
    console.log('error', error)
    console.log('user', user)
    console.log('info', info)
}
*/
), controller.geoip);
router.post('/register', controller.register);

router.post('/login', controller.login)

const validator = require('../middleware/validator')
const { body } = require('express-validator');

router.post('/validator', [
    body('username').exists(),
    body('password', 'invalid password').exists()
], validator.controllerValidator, (req, res) => {
    res.status(200).json('ok');
  });

module.exports = router;