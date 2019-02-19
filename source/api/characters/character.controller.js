const Model = require('./character.model');

// RETURNS LIST OF ALL CHARACTERS
async function Index(req, res) {
  res.json(await Model.Character.find());
}

//  SEND SPECIFIC CHARACTER
async function Get(req, res) {
  res.json(await Model.Character.findById(req.params.id));
}


module.exports = {
  Index,
  Get,
};
