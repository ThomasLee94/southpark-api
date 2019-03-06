const { Character } = require('./character.model');

// RETURN ALL CHARACTERS
async function GetAllCharacters(req, res) {
  const characters = await Character.find();
  res.json(characters);
}

// RETURN SPECIFIC CHARACTER
// USER MUST GIVE CHARACTER ID
async function GetCharacter(req, res) {
  const character = await Character.findById(req.params.characterId);
  res.json(character);
}

module.exports = {
  GetAllCharacters,
  GetCharacter,
};
