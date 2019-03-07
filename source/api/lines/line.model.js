//
// ─── LINE MODEL ─────────────────────────────────────────────────────────────────
//

const mongoose = require('mongoose');

const { Schema } = mongoose; 

const LineSchema = new Schema({
  line: { type: String, required: true },
  characterId: { type: Schema.Types.ObjectId, ref: 'Character' }, 
  episodeId: { type: Schema.Types.ObjectId, ref: 'Episode' }, 
});

LineSchema.pre('find', function (next) {
  this.populate('lines')
  next()
})

LineSchema.pre('findOne', function (next) {
  this.populate('lines')
  next()
});

const Line = mongoose.model('Line', LineSchema); 

module.exports = {
  Line,
};