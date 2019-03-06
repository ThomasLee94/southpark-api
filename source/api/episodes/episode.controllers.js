const { Episode } = require('./episode.model');

// RETURNS ALL EPISODES FOR ANY GIVEN SEASON
async function GetEpisodesBySeason(req, res) {
  const episodes = await Episode.find({ seasonNumber: req.params.season });
  res.json(episodes);
}

// RETURNS A SPECIFIC EPISODE
// USER WILL NEED TO PROVIDE EPISODE ID
async function GetEpisode(req, res) {
  const episode = await Episode.findById(req.params.episodeId);
  res.json(episode);
}

module.exports = {
  GetEpisodesBySeason,
  GetEpisode,
};
