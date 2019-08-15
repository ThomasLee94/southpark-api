const express = require('express');
const controller = require('./episode.controllers');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: RETURNS ALL EPISODES FOR A SPECIFIED SEASON
router.get('/:season/episodes', parcel(controller.GetEpisodesBySeason));

// GET: RETURN A SPECIFIC EPISODE 
router.get('/:episodeId', parcel(controller.GetEpisode)); 

module.exports = router;