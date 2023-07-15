const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

// router configuration
router.get('/profile', userController.user);

// user signup 
router.get('/sign-up', userController.signUp);
// user signup 
router.get('/sign-in', userController.signIn);

module.exports = router;