//
// ─── CHARACTER MODEL ────────────────────────────────────────────────────────────
//

const mongoose = require('mongoose');
// ADDITIONAL MONGOOSE FEATURES
const findOrCreate = require('mongoose-findorcreate');
// const uniqueValidator = require('mongoose-unique-validator');


const { Schema } = mongoose;

const CharacterSchema = new Schema({
  name: { type: String, required: true},
  // LINES ARE STORED AS REFERENCES
  lines: [{ type: String, required: true }], 
});

CharacterSchema.pre('find', function (next) {
  this.populate('lines')
  next()
})

CharacterSchema.pre('findOne', function (next) {
  this.populate('lines')
  next()
});

// NEEDED FOR WEBSCRAPING
CharacterSchema.plugin(findOrCreate);
// CharacterSchema.plugin(uniqueValidator);

const Character = mongoose.model('Character', CharacterSchema); 

module.exports = {
  Character,
};
