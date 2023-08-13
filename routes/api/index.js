const express = require('express');

const router = express.Router();

// default router for this (localhost:8000/api)

// All Versions APIs routers will be here.
router.use('/v1', require('./v1'));

module.exports = router;