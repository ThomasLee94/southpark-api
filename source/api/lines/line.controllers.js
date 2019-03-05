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
    // console.log(episodes)
    outputArr = outputArr.concat(episodes[i].lineId);
    console.log(outputArr)
  }
  res.json(outputArr);
}

// RETURN ALL LINES FOR A SPECIFIC EPISODE AS STRING
async function GetLinesForEpisode(req, res) {
  const seasonNum = new RegExp(req.params.season);
  const episodeNum = new RegExp(req.params.episode);
  const lineIdsArr = [];

  // RETURNS SPECIFIED EPISODE OF SPECIFIED SEASON ACCORDING TO THE FUZZY SEARCH
  const episode = await Episode.find({ $and: [{ seasonNumber: seasonNum }, { episodeNumber: episodeNum }] });
  
  // PUSHES ALL LINE_IDS OF THE SPECIED EPISODE OF THE SPECIFIED SEASON
  for (let i = 0; i < episode.lineId.length; i++) {
    lineIdsArr.push(episode.lineId[i]);
  }

  // RETURNS ALL LINES ASSOCIATED WITH SPECIFIED EPISODE
  const lines = await Line.find({episodeId: { $in: lineIdsArr } });

  // RETURNS ALL LINES BY SPECIFIED CHARACTER BY QUERYING THE PREVIOUSLY RETURNED ARRAY OF LINES OBJECTS
  const linesByCharacter = await lines.findById({})

}

// RETURNS LINES OF A SPECIFIC EPISODE FROM ASSOCIATED SEASON FOR A SPECIFIC CHARACTER
async function GetCharacterLinesForEpisode(req, res) {
  const seasonNum = new RegExp(req.params.season);
  const episodeNum = new RegExp(req.params.episode);
  const characterString = new RegExp(req.params.characterName);
  const lineIdsArr = [];

  // RETURNS ALL EPISODES ACCORDING TO THE FUZZY SEARCH
  const episode = await Episode.find({ $and: [{seasonNumber: seasonNum }, { episodeNumber: episodeNum }] });

  // TODO: FIGURE OUT HOW TO GET CHARACTER ID FROM JUST THE CHARACTER NAME
  // RETURNS ALL THE LINES FOR THE GIVEN EPISODE
  const lines = await Line.find()
}

// RETURNS ALL LINES PER CHARACTER AS AN ARRAY
async function GetCharacterLines(req, res) {
  const characterString = new RegExp(req.params.character);
  const character = await Character.find({ name: characterString });
  res.json(character);
}

module.exports = {
  GetLinesForSeason,
  GetLinesForEpisode,
  GetCharacterLinesForEpisode,
  GetCharacterLines,
};
