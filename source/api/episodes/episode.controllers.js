const Episode = require('./episode.model');

// RETURNS ALL EPISODES FOR ANY GIVEN SEASON
async function GetEpisodesBySeason(req, res) {
  const episodes = await Episode.findAll();
  res.json(episodes);
}

async function GetEpisode(req, res) {
  const episode = findOne({ })
}

module.exports = {
  GetEpisodesBySeason,
  GetEpisode,
};
