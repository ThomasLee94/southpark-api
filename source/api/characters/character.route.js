const express = require('express');
const controller = require('./character.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: RETURNS LIST OF ALL CHARACTERS
router.get('/', parcel(controller.Index));

// GET: RETURNS SPECIFIC CHARACTER
router.get('/character/:id', parcel(controller.Get));

module.exports = router;