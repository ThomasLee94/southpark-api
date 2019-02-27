//
// ─── EPISODE MODEL ──────────────────────────────────────────────────────────────
//

  
const mongoose = require('mongoose');

const { Schema } = mongoose; 

const EpisodeSchema = new Schema({
  episodeName: { type: String, required: true }, 
  episodeNumber: { type: Number, required: true },  
  seasonNum: [{ type: Schema.Types.ObjectId, ref: 'Season' }],

});

const Episode = mongoose.model('Episode', EpisodeSchema); 

module.exports = {
  Episode,
};
