const express = require('express');
const controller = require('./character.controllers');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: RETURNS LIST OF ALL CHARACTERS
router.get('/', parcel(controller.GetAllCharacters));

// GET: RETURNS SPECIFIC CHARACTER
router.get('/character/:name', parcel(controller.GetCharacter));

module.exports = router;