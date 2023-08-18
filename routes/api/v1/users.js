const express = require('express');

const router = express.Router();

const userAPI = require('../../../controllers/api/v1/users_api');

// default router for this (localhost:8000/api/v1/users)

// Users APIs routers will be here.
router.post('/create-session', userAPI.createSession);

module.exports = router;