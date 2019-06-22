const { ExtractJwt, Strategy } = require('passport-jwt');
const config = require('../config/config');
const { user } = require('../models');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.encryption
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            console.log('passport payload', payload)
            user.findById(payload.id).then(success => {
                console.log('user')
                done(null, success)
            }).catch(error => {
                console.log('error', error)
                done(error, false)
            });
            // User.findById(payload.id)
            //     .then(user => {
            //         if(user){
            //             return done(null, {
            //                 id: user.id,
            //                 name: user.name,
            //                 email: user.email,
            //             });
            //         }
            //         return done(null, false);
            //     }).catch(err => console.error(err));
        })
    );
};