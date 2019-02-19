const Model = require('./season.model');

// RETURNS ALL SEASONS
async function Index(req, res) {
  res.json(await Model.Season.find());
}

// RETURN ALL LINES FOR A SPECIFIC EPISODE AS STRING
async function GetAllEpisodes(req, res) {
  res.json(await Model.Season.findById()); 
}

module.exports = {
  Index,
  GetAllEpisodes,
};
