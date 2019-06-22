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
            user.findOne({
                where: {
                    id_user: payload.id_user
                }
            }).then(success => {
                if(success) {
                    return done(null, success);
                }else{
                    return done(null, false);
                }
            }).catch(error => {
                return done(error, false);
            });
        })
    );
};