const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

// router configuration
router.get('/profile', userController.user);

module.exports = router;