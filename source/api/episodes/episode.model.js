//
// ─── EPISODE MODEL ──────────────────────────────────────────────────────────────
//

const mongoose = require('mongoose');

const { Schema } = mongoose; 

const EpisodeSchema = new Schema({
  episodeName: { type: String, required: true },
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  characterId: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  lineId: [{ type: Schema.Types.ObjectId, ref: 'Line' }],
});

const Episode = mongoose.model('Episode', EpisodeSchema); 

module.exports = {
  Episode,
};
