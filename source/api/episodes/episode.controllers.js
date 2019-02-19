const Model = require('./episode.model');

// RETURNS ALL EPISODES FOR ANY GIVEN SEASON
async function Index(req, res) {
  res.json(await Model.Episode.find());
}

async function GetEpisode(req, res) {
  res.json(await Model.Episode.findById()); 
}

//  RETURN LENGTH OF EPISODE IN MINUTES
async function GetEpisodeLength(req, res) {
  res.json(await Model.Episode.findById(req.params.episodeLength));
}

module.exports = {
  Index,
  GetEpisode,
  GetEpisodeLength,
};
