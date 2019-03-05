const express = require('express');
const controller = require('./user.controllers');
const parcel = require('../../middleware/asyncHandler');
const checkAuth = require('../../middleware/checkAuth');

const router = express.Router();

// POST: ADD A EPISODE
router.post('/create-episode/:season/:episode', checkAuth, parcel(controller.GetLinesForSeason));

// POST: ADD A LINE
router.post('/create-line/:season/:episode', checkAuth, parcel(controller.GetLinesForEpisode)); 

// PUT: UPDATE A EPISODE
router.put('/update-episode/:season/:episode', checkAuth, parcel(controller.GetLinesForEpisode)); 

// PUT: UPDATE A LINE
router.put('/update-line/:season/:episode', checkAuth, parcel(controller.GetLinesForEpisode)); 

module.exports = router;