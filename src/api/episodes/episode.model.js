//
// ─── EPISODE MODEL ──────────────────────────────────────────────────────────────
//

const mongoose = require('mongoose');

const { Schema } = mongoose; 

const EpisodeSchema = new Schema({
  episodeName: { type: String, required: true },
  episodeNumber: { type: Number, min: 1 , max: 30, required: true },
  seasonNumber: { type: Number, min: 1, max: 25, required: true },
  characterId: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  lineId: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
});

EpisodeSchema.pre('find', function (next) {
  this.populate('lineId')
  next()
})

EpisodeSchema.pre('findOne', function (next) {
  this.populate('lineId')
  next()
});

const Episode = mongoose.model('Episode', EpisodeSchema); 

module.exports = {
  Episode,
};
