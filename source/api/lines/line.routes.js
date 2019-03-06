const express = require('express');
const controller = require('./line.controllers');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

// GET: RETURNS ALL LINES FOR A SEASON AS STRING
router.get('/:season', parcel(controller.GetLinesForSeason));

// GET: RETURN ALL LINES FOR A SPECIFIC EPISODE AS STRING
router.get('/:season/:episode', parcel(controller.GetLinesForEpisode)); 

// GET: RETURNS LINES OF A SPECIFIC EPISODE FOR A SPECIFIC CHARACTER
router.get('/:season/:episode/:characterId/:episodeId', parcel(controller.GetCharacterLinesForEpisode)); 

// GET: RETURNS ALL LINES PER CHARACTER
router.get('/character/:characterName', parcel(controller.GetCharacterLines)); 

module.exports = router;