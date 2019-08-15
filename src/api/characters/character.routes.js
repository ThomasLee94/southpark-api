const express = require('express');
const controller = require('./character.controllers');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: RETURNS LIST OF ALL CHARACTERS
router.get('/', parcel(controller.GetAllCharacters));

// GET: RETURNS SPECIFIC CHARACTER
router.get('/:characterId', parcel(controller.GetCharacter));

module.exports = router;