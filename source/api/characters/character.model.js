//
// ─── CHARACTER MODEL ────────────────────────────────────────────────────────────
//

const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate')


const { Schema } = mongoose;

const CharacterSchema = new Schema({
  name: { type: String, required: true },
  lines: [{ type: String, required: true }], 
});

CharacterSchema.plugin(findOrCreate);
const Character = mongoose.model('Character', CharacterSchema); 

module.exports = {
  Character,
};
