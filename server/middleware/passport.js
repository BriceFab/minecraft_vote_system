const { ExtractJwt, Strategy } = require('passport-jwt');
const config = require('../config/config');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.encryption
};

module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
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