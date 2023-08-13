const express = require('express');

const router = express.Router();

// default router for this (localhost:8000/api/v1)

// Version 1(v1) APIs routers will be here.
router.use('/posts', require('./posts'));

module.exports = router;