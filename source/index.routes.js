const express = require('express');
const characterRoutes = require('./server/auth/auth.route');
const episodeRoutes = require('./server/artist/artist.route');
const lineRoutes = require('./server/user/user.route');
const seasonRoutes = require('./server/art/art.route');

const router = express.Router();

router.use('/season', seasonRoutes);
router.use('/episode', episodeRoutes);
router.use('/line', lineRoutes);
router.use('/character', characterRoutes);

module.exports = router;