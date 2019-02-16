// 'LINES' MODEL
const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const LineSchema = new Schema({
  character: { type: String, required: true },
  line: [{ type: String, required: true }]
});

const Line = mongoose.model('Line', LineSchema); 

module.exports = {
  Line
};