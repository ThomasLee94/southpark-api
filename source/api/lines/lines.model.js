const mongoose = require('mongoose');
// 'LINES' MODEL
const Schema = mongoose.Schema; 

const LineSchema = new Schema({
  character: { type: String, required: true },
  episodeNum: [{ type: Schema.Types.ObjectId, ref: 'Episode' }], 
  characterId: [{ type: Schema.Types.ObjectId, ref: 'Character' }], 
  line: { type: String, required: true },
});

const Line = mongoose.model('Line', LineSchema); 

module.exports = {
  Line
};