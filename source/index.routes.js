const express = require('express');
const characterRoutes = require('./api/characters/character.routes');
const episodeRoutes = require('./api/episodes/episode.routes');
const lineRoutes = require('./api/lines/line.routes');
const seasonRoutes = require('./api/seasons/season.routes');

const router = express.Router();

router.use('/season', seasonRoutes);
router.use('/episode', episodeRoutes);
router.use('/line', lineRoutes);
router.use('/character', characterRoutes);

module.exports = router;