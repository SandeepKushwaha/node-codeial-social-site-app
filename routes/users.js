const express = require('express');

const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');

// router configuration
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);

// user update profile
router.post('/update/:id', passport.checkAuthentication, usersController.update);

// user signup 
router.get('/sign-up', passport.checkAuthentication, usersController.signUp);
// user signin 
router.get('/sign-in', passport.checkAuthentication, usersController.signIn);

// user signing up 
router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;