const express = require('express');
const controller = require('./character.controller');
const parcel = require('../../middleware/asyncHandler');

const router = express.Router();

//  GET: returns all user objects in array (includes artists and reg users)
router.get('/', parcel(controller.Index));

//  GET: returns a specific user object from given Id (reg user or artist)
router.get('/:id', parcel(controller.Get));

//  DELETE: removes a specific user given Id (includes artists)
router.delete('/:id', parcel(controller.Delete));

//  PATCH: updates a users information (includes artist)
router.patch('/:id', parcel(controller.Update));

module.exports = router;