const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

// router configuration
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

// user update profile
router.post('/update/:id', passport.checkAuthentication, usersController.update);

// user signup 
router.get('/sign-up', usersController.signUp);
// user signin 
router.get('/sign-in', usersController.signIn);

// user signing up 
router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// Google sign-in routers
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in' }, usersController.createSession));

module.exports = router;