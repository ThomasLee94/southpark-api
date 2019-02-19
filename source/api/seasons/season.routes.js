const express = require('express');
const controller = require('./season.controllers');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

// GET: RETURNS ALL SEASONS
router.get('/seasons', parcel(controller.Index));

// GET: RETURN ALL EPISODES IN ANY GIVEN SEASON
router.get('/:season/episodes', parcel(controller.GetAllEpisodes)); 

module.exports = router;