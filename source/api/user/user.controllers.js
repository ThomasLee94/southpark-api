//
// ─── SOUTHPARK USER CONTROLLERS ─────────────────────────────────────────────────
//

/* eslint-disable max-len */
const jwt = require('jsonwebtoken');
const { User } = require('./user.model');
const { Episode } = require('../episodes/episode.model');
const { Character } = require('../characters/character.model');

async function SignUp(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save((err, user) => {
    if (err) {
      res.status(400).json({
        success: false,
        error: 'failed to sign-up',
      });
    } else {
      console.log(user);
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      res.status(200).json({
        success: true,
      });
    }
  });
}

async function Login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, {password: 1})
    .then((user) => {
      console.log(user.password);

      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invald credentials',
        });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
        // Password does not match
          return res.status(401).send({ message: 'Wrong Username or password' });
        }
        // Create a token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
          expiresIn: '60 days',
        });
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

        res.status(200).json({
          success: true,
        });
      });
    });
}

async function Logout(req, res) {
  res.clearCookie('nToken');
}

async function AddEpisode(req, res) {
  if (req.body.episodeName && req.body.episodeNumber && req.body.seasonNumber) {
    const newEpisode = new Episode(req.body);
    newEpisode.save();
  }
}

async function AddLine(req, res) {
  // WRITE IN DOCUMENTATION THAT THEY NEED TO SPECIFY EPISODE AND SEASON NUM, LINE AND CHARACTER NAME
  // SPELL WHERE USERS CAN ADD A LINE - CAN USERS ADD A LINE OF ANY CHARACTER IN ANY EPISODE?
  // LINE MUST BE PROVIDED AS 'line'
  // I MUST BE PROVIDED REQ.BODY.CHARACTER, REQ.BODY.EPISODE ETC
  if (!req.body.characterName || !req.body.seasonNumber || req.body.episodeNumber || !req.body.line) {
    return res.status(400).json({
      success: false,
      error: 'Failed to add line, parameter missing.',
    });
  }
  let character = await Character.findOne({ name: req.body.character });
  if (!character) {
    await character.create({ name: req.body.character });
    // TO GET CHARACTER_ID
    character = await Character.findOne({ name: characterName });
  }
  const episode = await Episode.findOne({ episodeNumber: parseInt(req.body.episode), seasonNumber: parseInt(req.body.season) });
  // CANNOT CREATE A NEW EPISODE
  if (!episode) {
    return res.status(400).json({
      success: false,
      error: 'Episode does not exist, line could not be added.',
    });
  }

  const line = new Line({ line: req.body.line, characterId: character._id, episodeId: episode._id });
  try {
    line.save();
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: 'Failed to create line, try again.',
    });
  }
  // SENDING SUCCESS STATUS
  return res.status(200).json({
    success: true,
  });
}


async function UpdateEpisode(req, res) {
  // USER MUST KNOW CURRENT SEASON AND EPISODE NUMBER AND EPISODE NAME
  // ONLY THESE PARAMETERS CAN BE CHANGED, NOT THE CHARACTER OR LINE IDS
  // CAN ONLY UPDATE EPISDOE NAME
  if (!req.body.episodeName || !req.body.episodeNumber || !req.body.seasonNumber) {
    return res.status(400).json({
      success: false,
      error: 'Failed to add line, parameter missing.',
    });
  }

  await findOneAndUpdate(
    { episodeNumber: parseInt(req.body.episodeNumber), seasonNumber: parseInt(req.body.seasonNumber) },
    { episodeName: req.body.episodeName },
  );

  // SENDING SUCCESS STATUS
  return res.status(200).json({
    success: true,
  });
}

async function UpdateLine(req, res) {
  // USER MUST KNOW LINDEID 'lineId'
  // CAN ONLY CHANGE THE CONTENTS OF THE LINE
  if (!req.body.line) {
    return res.status(400).json({
      success: false,
      error: 'Failed to add line, parameter missing.',
    });
  }

  await Line.findOneAndUpdate(
    { _id: req.params.lineId },
    { line: req.body.line },
  );

  // SENDING SUCCESS STATUS
  return res.status(200).json({
    success: true,
  });
}

async function DeleteEpisode(req, res) {
  // USER MUST KNOW EPISODE NUMBER AND SEASON NUMBER
  if (!req.body.episodeNumber || !req.body.seasonNumber) {
    return res.status(400).json({
      success: false,
      error: 'Failed to delete episode, parameter missing.',
    });
  }

  const episode = await Episode.findOne({
    episodeNumber: req.body.episodeNumber,
    seasonNumber: req.body.seasonNumber,
  });

  await Line.deleteMany({ episodeId: episode._id });

  await Episode.deleteOne({
    episodeNumber: req.body.episodeNumber,
    seasonNumber: req.body.seasonNumber,
  });

  // SENDING SUCCESS STATUS
  return res.status(200).json({
    success: true,
  });
}

async function DeleteLine(req, res) {
  // USER MUST KNOW LINEID 'lineId'
  if (!req.params.lineId) {
    return res.status(400).json({
      success: false,
      error: 'Failed to delete episode, parameter missing.',
    });
  }

  const episode = await Episode.findOne({
    lineId: { $in: [req.params.lineId] },
  });

  episode.lineId = episode.lineId.filter(word => JSON.stringify(word) !== req.params.lineId);

  await episode.save();

  const character = await Character.findOne({
    lines: { $in: [req.params.lineId] },
  });

  character.lines = character.lines.filter(word => JSON.stringify(word) !== req.params.lineId);

  await character.save();

  await Line.findById(req.params.lineId);

  // SENDING SUCCESS STATUS
  return res.status(200).json({
    success: true,
  });
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
