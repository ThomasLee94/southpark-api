const Model = require('./character.model');

// RETURNS LIST OF ALL CHARACTERS
async function Index(req, res) {
  res.send(await Model.Character.find());
}

//  SEND SPECIFIC CHARACTER
async function Get(req, res) {
  res.send(await Model.Character.findById(req.params.id));
}

//  DELETE SPECIFIC CHARACTER
async function Delete(req, res) {
  res.send(await Model.Character.findOneAndRemove({ _id: req.params.id }));
}

//  UPDATE SPECIFIC CHARACTER
async function Update(req, res) {
  res.send(await Model.Character.findOneAndUpdate({ _id: req.params.id }, req.body));
}

module.exports = {
  Index,
  Get,
  Delete,
  Update,
};