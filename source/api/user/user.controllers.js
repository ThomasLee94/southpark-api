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
  // 
  if (!req.body.character || !req.body.season || req.body.episode || !req.body.line){
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
}

async function UpdateEpisode(req, res){
  // USER MUST KNOW SEASON AND EPISODE NUMBER 

}

async function UpdateLine(req, res){

}

async function DeleteEpisode(req, res){

}

async function DeleteLine(req, res){

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
