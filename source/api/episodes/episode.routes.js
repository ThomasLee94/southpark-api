const express = require('express');
const controller = require('./episode.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: RETURNS ALL EPISODES FOR ANY GIVEN SEASON AS OBJECTS
router.get('/:season/episodes', parcel(controller.Index));

// GET: RETURN SPECIFIC EPISODE AS OBJECT
router.get('/:season/:episode', parcel(controller.GetEpisode)); 

//  GET: RETURNS EPISODE LENGTH FOR A SPECIFIC
router.get('/:season/:episode/length', parcel(controller.GetEpisodeLength)); 

module.exports = router;