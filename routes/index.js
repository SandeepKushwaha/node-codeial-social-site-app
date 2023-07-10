const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
const userController = require('../controllers/user_controller');

// router configuration
router.get('/', homeController.home);
router.get('/users', userController.user);




console.log('Express:: Router loaded.');

module.exports = router;