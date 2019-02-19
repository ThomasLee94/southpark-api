const Model = require('./lines.model');

// RETURNS ALL LINES FOR A SEASON AS STRING
async function Index(req, res) {
  res.json(await Model.Line.find());
}

// GET: RETURN ALL LINES FOR A SPECIFIC EPISODE AS STRING
async function GetLinesForEpisode(req, res) {
  res.json(await Model.Line.findById(req.params.id)); 
}

// GET: RETURNS LINES OF A SPECIFIC EPISODE FOR A SPECIFIC CHARACTER
async function GetCharacterLinesForEpisode(req, res) {
  res.json(await Model.Line.findById(req.params.id)); 
}

// GET: RETURNS ALL LINES PER CHARACTER
async function GetAllCharacterLines(req, res){
  res.json(await Model.Line.findById(req.params.id)); 
}

module.exports = {
  Index,
  GetLinesForEpisode,
  GetCharacterLinesForEpisode,
  GetAllCharacterLines,
};
