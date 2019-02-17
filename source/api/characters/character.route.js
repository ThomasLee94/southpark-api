const express = require('express');
const controller = require('./character.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: RETURNS LIST OF ALL CHARACTERS
router.get('/', parcel(controller.Index));

// GET: RETURNS SPECIFIC CHARACTER
router.get('/:id', parcel(controller.Get));

// DELETE: DELETES A SPECIFIC CHARACTER
router.delete('/:id', parcel(controller.Delete));

// PATCH: UPDATE CHARACTER INFO
router.patch('/:id', parcel(controller.Update));

module.exports = router;