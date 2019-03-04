const Model = require('./character.model');

// RETURN ALL CHARACTERS
async function GetAllCharacters(req, res) {
  const characters = await Model.Character.find();
  res.json(characters);
}

//  SEND SPECIFIC CHARACTER
async function GetCharacter(req, res) {
  const character = await Model.Character.findById(req.params.id);
  res.json(character);
  
}

module.exports = {
  GetAllCharacters,
  GetCharacter,
};
