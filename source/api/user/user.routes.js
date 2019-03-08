const express = require('express');
const controller = require('./user.controllers');
const parcel = require('../../middleware/asyncHandler');
const checkAuthorisation = require('../../middleware/checkAuthorisation');

const router = express.Router();

// POST: SIGN-UP
router.post('/sign-up', parcel(controller.SignUp));

// POST: LOGIN
router.post('/login', parcel(controller.Login));

// GET: LOGOUT
router.get('/logout', parcel(controller.Logout));

// ROUTE PROTECTION
router.use(checkAuthorisation);

// POST: ADD A EPISODE
router.post('/create-episode/:season/:episode', parcel(controller.AddEpisode));

// POST: ADD A LINE
router.post('/create-line/:season/:episode', parcel(controller.AddLine)); 

// PUT: UPDATE A EPISODE
router.put('/update-episode/:season/:episode', parcel(controller.UpdateEpisode)); 

// PUT: UPDATE A LINE
router.put('/update-line/:season/:episode/:lineId', parcel(controller.UpdateLine));

// DELETE: DELETE A EPISODE
router.delete('/delete-episode/:season/:episode', parcel(controller.DeleteEpisode)); 

// DELETE: DELETE A LINE
router.delete('/delete-line/:season/:episode/:lineId', parcel(controller.DeleteLine)); 

module.exports = router;