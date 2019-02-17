// 'EPISODE' MODEL
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const EpisodeSchema = new Schema({
  episodeLength: { type: Number, required: true }, 
  seasonNum: [{ type: Schema.Types.ObjectId, ref: 'Season' }],

});

const Episode = mongoose.model('Episode', EpisodeSchema); 

module.exports = {
  Episode
};
