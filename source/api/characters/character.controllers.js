const Character = require('./character.model');

// RETURN ALL CHARACTERS
async function GetAllCharacters(req, res) {
  const characters = await Character.findAll();
  res.json(characters);
}

// RETURN SPECIFIC CHARACTER
async function GetCharacter(req, res) {
  const characterString = new RegExp(req.params.name)
  const character = await Character.findOne({ name: characterString });
  res.json(character);
}

module.exports = {
  GetAllCharacters,
  GetCharacter,
};
