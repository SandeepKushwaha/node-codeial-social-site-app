const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

// router configuration
router.get('/profile', userController.user);

// user signup 
router.get('/sign-up', userController.signUp);
// user signin 
router.get('/sign-in', userController.signIn);

// user signing up 
router.post('/create', userController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/sign-in' },
), userController.createSession);

module.exports = router;