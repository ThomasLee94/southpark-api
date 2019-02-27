//
// ─── CHARACTER MODEL ────────────────────────────────────────────────────────────
//

const mongoose = require('mongoose');

const { Schema } = mongoose;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  lines: [{ type: String, required: true }], 
});

const Character = mongoose.model('Character', CharacterSchema); 

module.exports = {
  Character,
};
