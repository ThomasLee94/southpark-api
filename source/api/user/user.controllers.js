//
// ─── SOUTHPARK LINE CONTROLLERS ─────────────────────────────────────────────────
//

/* eslint-disable max-len */

const User = require('./user.model');
const Episode = require('../episodes/episode.model')

async function SignUp(req, res){
  const user = new User(req.body)

  const userSave = await user.save()
}

async function Login(req, res) {

}

async function Logout(req, res) {

}

async function AddEpisode(req, res) {
  if (req.body.episodeName && req.body.episodeNumber && req.body.seasonNumber){
    const newEpisode = new Episode(req.body);
    newEpisode.save();
  }
  
}

async function AddLine(req, res) {
  // WRITE IN DOCUMENTATION THAT THEY NEED TO SPECIFY EPISODE AND SEASON NUM, LINE AND CHARACTER NAME
  // SPELL WHERE USERS CAN ADD A LINE - CAN USERS ADD A LINE OF ANY CHARACTER IN ANY EPISODE?
  // LINE MUST BE PROVIDED AS 'line'   
  // I MUST BE PROVIDED REQ.BODY.CHARACTER, REQ.BODY.EPISODE ETC
  if (!req.body.characterName || !req.body.seasonNumber || req.body.episodeNumber || !req.body.line){
    return res.status(400).json({
      success: false,
        error: 'Failed to add line, parameter missing.'
    })
  }
  let character = await Character.findOne({name: req.body.character})
  if (!character) {
    await character.create({name: req.body.character })
    // TO GET CHARACTER_ID
    character = await Character.findOne({ name: characterName })
    }
    let episode = await Episode.findOne({episodeNumber: parseInt(req.body.episode), seasonNumber: parseInt(req.body.season)})
    // CANNOT CREATE A NEW EPISODE
    if (!episode){
      return res.status(400).json({
        success: false,
        error: 'Episode does not exist, line could not be added.'
      })
    }

    const line = new Line({ line: req.body.line , characterId: character._id. episodeId: episode._id });
    try {
      line.save() 
    }
    catch(err) {
      return res.status(400).json({
        success: false,
        error: 'Failed to create line, try again.'
      })
    }
    // SENDING SUCCESS STATUS
    return res.status(200).json({
      success: true
    })
  }


async function UpdateEpisode(req, res){
  // USER MUST KNOW CURRENT SEASON AND EPISODE NUMBER AND EPISODE NAME
  // ONLY THESE PARAMETERS CAN BE CHANGED, NOT THE CHARACTER OR LINE IDS
  const episode = await findOneAndUpdate({ 
    episodeName: req.body.episodeName,
    episodeNumber: parseInt(req.body.episodeNumber),
    seasonNumber: req.body.seasonNumber
  })

  res.json(episode)

}

async function UpdateLine(req, res){
  // USER MUST KNOW ASSOCIATED EPISODE
  // CAN ONLY CHANGE THE CONTENTS OF THE LINE
  if (!req.body.line){
    return res.status(400).json({
      success: false,
        error: 'Failed to add line, parameter missing.'
    })
  }

}

async function DeleteEpisode(req, res){
  // USER MUST KNOW EPISODE NAME, NUMBER AND SEASON NUMBER
  // TODO: DELETE ALL ASSOCIATED LINES AND CHARACTERS

}

async function DeleteLine(req, res){
  // USER MUST KNOW ASSOCIATED EPISODE 
  // TODO: DELETE CHARACTER AND LINE ASSOCIATIONS

}


module.exports = {
  SignUp,
  Login,
  Logout,
  AddEpisode,
  AddLine,
  UpdateEpisode,
  UpdateLine,
  DeleteEpisode,
  DeleteLine,
};
