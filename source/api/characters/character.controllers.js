const Model = require('./character.model');

// RETURN ALL CHARACTERS
async function Index(req, res) {
  res.json(await Model.Character.find());
}

//  SEND SPECIFIC CHARACTER
async function GetCharacter(req, res) {
  res.json(await Model.Character.findById(req.params.id));
}

module.exports = {
  Index,
  GetCharacter,
};
