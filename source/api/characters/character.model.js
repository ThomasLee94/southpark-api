//
// ─── CHARACTER MODEL ────────────────────────────────────────────────────────────
//

const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const uniqueValidator = require('mongoose-unique-validator');


const { Schema } = mongoose;

const CharacterSchema = new Schema({
  name: { type: String, required: true, unique: true },
  lines: [{ type: String, required: true }], 
});

// NEEDED FOR WEBSCRAPING
CharacterSchema.plugin(findOrCreate);
CharacterSchema.plugin(uniqueValidator);

const Character = mongoose.model('Character', CharacterSchema); 

module.exports = {
  Character,
};
