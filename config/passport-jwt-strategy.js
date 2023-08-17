const passport = require('passport');

const JWTStategy = require('passport-jwt').Strategy;

const ExtractJWT = require('passport-jwt').ExtractJwt; 

const User = require('../models/user');

let options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'Codeial',
}

passport.use(new JWTStategy(options, function (jwtPayload, done) {
    User.findById(jwtPayload._id)
        .then(user => { 
            if (user) {
                return done(null, user);
            } else { 
                return done(null, false);
            }
        })
        .catch(error => { 
            console.error('Passport JWT error on Finding User :', error);
        });
    // User.findById(jwtPayload._id, function (error, user) {
    //     if (error) {
    //         console.error('Passport JWT error on :', error);
    //         return;
    //     }
        
    //     if (user) {
    //         return done(null, user);
    //     } else { 
    //         return done(null, false);
    //     }

    // });
}));
 

module.exports = passport;