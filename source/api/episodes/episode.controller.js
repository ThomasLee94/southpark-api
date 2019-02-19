const Model = require('./episode.model');

// RETURNS ALL EPISODES FOR ANY GIVEN SEASON
async function GetAllEpisodes(req, res) {
  res.json(await Model.Episode.find());
}

async function GetEpisode(req, res) {
  res.json(await Model.Episode.findById()); 
}

//  RETURN LENGTH OF EPISODE IN MINUTES
async function GetEpisdoeLength(req, res) {
  res.json(await Model.Episode.findById(req.params.id));
}

module.exports = {
  GetAllEpisdoes,
  GetEpisode,
  GetEpisodeLength,
};
