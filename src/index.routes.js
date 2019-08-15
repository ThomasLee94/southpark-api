const express = require('express');
const characterRoutes = require('./api/characters/character.routes');
const episodeRoutes = require('./api/episodes/episode.routes');
const lineRoutes = require('./api/lines/line.routes');
const authRoutes = require('./api/user/user.routes');

const router = express.Router();

router.use('/episodes', episodeRoutes);
router.use('/lines', lineRoutes);
router.use('/characters', characterRoutes);
router.use('/auth', authRoutes);

module.exports = router;