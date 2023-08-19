const passport = require('passport');

const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');

const User = require('../models/user');

// TODO: SIGN-IN with Google is unable to redirect or sign-in properly. user is created on db but not logging in. only sign-in with email with generated password.

passport.use(new googleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, function (accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value })
        .exec()
        .then(user => {
            console.log(profile);

            if (user) {
                // If found, set this user as request.user
                console.log(accessToken, refreshToken);
                return done(null, user);
            } else {
                // if Not found, create the user and set it as request.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    avatar: profile.photos[0].value,
                }).then(user => {
                    return done(null, user);
                }).catch(error => {
                    console.error('Error on creating User Google Oauth passport steategy:', error);
                });
            }
        })
        .catch(error => {
            console.error('Error on Google Oauth passport steategy:', error);
        });
}));

/*
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
}, function (accessToken, refreshToken, profile, done) {
    // Check for errors
    if (err) {
        console.log('Error in Google strategy-passport:', err);
        return done(err);
    }

    console.log(accessToken, refreshToken);
    console.log(profile);

    // Find a user
    User.findOne({ email: profile.emails[0].value }, function (err, user) {
        if (err) {
            console.log('Error in finding user Google strategy-passport:', err);
            return done(err);
        }

        if (user) {
            // If found, set this user as req.user
            return done(null, user);
        } else {
            // If not found, create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex'),
                avatar: profile.photos[0].value,
            }, function (err, user) {
                if (err) {
                    console.log('Error in creating user Google strategy-passport:', err);
                    return done(err);
                }
                return done(null, user);
            });
        }
    });
}));
*/