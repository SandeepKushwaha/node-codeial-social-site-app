const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');

// router configuration
router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

console.log('Express:: Router loaded.');

module.exports = router;