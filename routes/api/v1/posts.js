const express = require('express');

const router = express.Router();

const passport = require('passport');

const postAPI = require('../../../controllers/api/v1/posts_api');

// default router for this (localhost:8000/api/v1/posts)

// Posts APIs routers will be here.
router.get('/', postAPI.getAll);

router.get('/:id', postAPI.getById);

router.delete('/:id', passport.authenticate('jwt', { session: false }), postAPI.delete);

module.exports = router;