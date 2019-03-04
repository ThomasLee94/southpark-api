const Episode = require('./episode.model');

// RETURNS ALL EPISODES FOR ANY GIVEN SEASON
async function GetEpisodesBySeason(req, res) {
  const seasonNum = new RegExp(req.params.season)
  const episodes = await Episode.findAll({ seasonNumber: seasonNum });
  res.json(episodes);
}

// RETURNS A SPECIFIC EPISODE
async function GetEpisode(req, res) {
  const episodeName = new RegExp(req.params.episodeName);
  const episode = await Episode.fin;
}

module.exports = {
  GetEpisodesBySeason,
  GetEpisode,
};
