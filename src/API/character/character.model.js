// SOUTHPARK CHARACTER MODEL
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const CharacterSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  nickname: { type: String, required: true },
  bio: { type: String, required: false },
  middleSchool: { type: String, required: true },
  siblings: [{ type: Schema.Types.ObjectId, ref: 'Sibling' }],
  lines: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
});

const character = mongoose.model('Character', CharacterSchema); 

module.exports = {
  Character
};