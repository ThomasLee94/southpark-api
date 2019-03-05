const express = require('express');
const controller = require('./user.controllers');
const parcel = require('../../middleware/asyncHandler');
const checkAuth = require('../../middleware/checkAuth');

const router = express.Router();

// POST: SIGN-UP
router.post('/sign-up', checkAuth, parcel(controller.SignUp));

// POST: LOGIN
router.post('/login', checkAuth, parcel(controller.Login));

// DELETE: LOGOUT
router.delete('/logout', checkAuth, parcel(controller.Logout));

// POST: ADD A EPISODE
router.post('/create-episode/:season/:episode', checkAuth, parcel(controller.AddEpisode));

// POST: ADD A LINE
router.post('/create-line/:season/:episode', checkAuth, parcel(controller.AddLine)); 

// PUT: UPDATE A EPISODE
router.put('/update-episode/:season/:episode', checkAuth, parcel(controller.UpdateEpisode)); 

// PUT: UPDATE A LINE
router.put('/update-line/:season/:episode/:lineId', checkAuth, parcel(controller.UpdateLine));

// DELETE: DELETE A EPISODE
router.delete('/delete-episode/:season/:episode', checkAuth, parcel(controller.DeleteEpisode)); 

// DELETE: DELETE A LINE
router.delete('/delete-line/:season/:episode/:lineId', checkAuth, parcel(controller.DeleteLine)); 

module.exports = router;