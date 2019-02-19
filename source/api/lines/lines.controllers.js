const Model = require('./line.model');

// RETURNS ALL LINES FOR A SEASON AS STRING
async function Index(req, res) {
  res.json(await Model.Line.find());
}

// GET: RETURN ALL LINES FOR A SPECIFIC EPISODE AS STRING
async function GetLinesForEpisode(req, res) {
  res.json(await Model.Line.findById()); 
}

// GET: RETURNS LINES OF A SPECIFIC EPISODE FOR A SPECIFIC CHARACTER
async function GetCharacterLinesForEpisode(req, res) {
  res.json(await Model.Line.findById()); 
}

// GET: RETURNS ALL LINES PER CHARACTER
async function GetAllCharacterLines(req, res){
  res.json(await Model.Line.findById()); 
}

module.exports = {
  Index,
  GetLinesForEpisode,
  GetCharacterLinesForEpisode,
  GetAllCharacterLines,
};
