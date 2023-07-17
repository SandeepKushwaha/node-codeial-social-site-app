const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

// router configuration
router.get('/profile', userController.user);

// user signup 
router.get('/sign-up', userController.signUp);
// user signin 
router.get('/sign-in', userController.signIn);

// user signing up 
router.post('/create', userController.create);

module.exports = router;