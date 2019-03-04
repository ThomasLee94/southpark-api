const express = require('express');
const controller = require('./line.controllers');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

// GET: RETURNS ALL LINES FOR A SEASON AS STRING
router.get('/:season/lines', parcel(controller.GetLinesForSeason));

// GET: RETURN ALL LINES FOR A SPECIFIC EPISODE AS STRING
router.get('/:season/:episode/lines', parcel(controller.GetLinesForEpisode)); 

// GET: RETURNS LINES OF A SPECIFIC EPISODE FOR A SPECIFIC CHARACTER
router.get('/:season/:episode/:character', parcel(controller.GetCharacterLinesForEpisode)); 

// GET: RETURNS ALL LINES PER CHARACTER
router.get('/:character/lines', parcel(controller.GetCharacterLines)); 

module.exports = router;