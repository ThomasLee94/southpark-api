//
// ─── SOUTHPARK LINE CONTROLLERS ─────────────────────────────────────────────────
//

/* eslint-disable max-len */

const { Line } = require('./line.model');
const { Episode } = require('../episodes/episode.model');
const { Character } = require('../characters/character.model');

// RETURNS ALL LINES FOR A SEASON
async function GetLinesForSeason(req, res) {
  const episodes = await Episode.find({ seasonNumber: req.params.season }).populate('lineId').lean();
  let outputArr = []; 
  for (let i = 0; i < episodes.length; i++) {
    outputArr = outputArr.concat(episodes[i].lineId);
    console.log(outputArr)
  }
  res.json(outputArr);
}

// RETURN ALL LINES FOR A SPECIFIC EPISODE AS STRING
async function GetLinesForEpisode(req, res) {
  // RETURNS SPECIFIED EPISODE OF SPECIFIED SEASON ACCORDING TO THE FUZZY SEARCH
  const episode = await Episode.findOne({ 
    seasonNumber: req.params.season, episodeNumber: req.params.episode,
  }).populate('lineId').lean();
  res.json(episode.lineId)

}
 
// RETURNS LINES OF A SPECIFIC EPISODE FROM ASSOCIATED SEASON FOR A SPECIFIC CHARACTER
// USER MUST PASS IN CHARACTER ID AND EPISODE ID
async function GetCharacterLinesForEpisode(req, res) {
  const lines = await Line.find({characterId: req.params.characterId, episodeId: req.params.lineId })
  res.json(lines)
}

// RETURNS ALL LINES PER CHARACTER AS AN ARRAY
async function GetCharacterLines(req, res) {
  const character = await Character.find({ name: req.params.character });
  res.json(character);
}

module.exports = {
  GetLinesForSeason,
  GetLinesForEpisode,
  GetCharacterLinesForEpisode,
  GetCharacterLines,
};
