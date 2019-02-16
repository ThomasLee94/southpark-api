// 'SEASONS' MODEL
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const SeasonSchema = new Schema({
  seasonNumber: { type: Number, required: true}
  totalEpisodes: { type: Number, required: true }, 
  episode: [{ type: Schema.Types.ObjectId, ref: 'Episode' }],
  
});

const Season = mongoose.model('Season', SeasonSchema); 

module.exports = {
  Season
};

test


test