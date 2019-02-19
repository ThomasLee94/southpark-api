//
// ─── LINE MODEL ─────────────────────────────────────────────────────────────────
//

  
const mongoose = require('mongoose');

const { Schema } = mongoose.Schema; 

const LineSchema = new Schema({
  character: { type: String, required: true },
  characterId: [{ type: Schema.Types.ObjectId, ref: 'Character' }], 
  episodeNum: [{ type: Schema.Types.ObjectId, ref: 'Episode' }], 
});

const Line = mongoose.model('Line', LineSchema); 

module.exports = {
  Line.
};