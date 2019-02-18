const mocha = require('mocha');
const chai = require('chai');
const server = require('../../index');
const expect = chai.expect;
const { assert } = require('chai')
const agent = chai.request.agent(server);
const characterNames = require('../../../bin/db/southparkNames');

const sampleCharacter = {
  
}

it('should return list of all characters', (done) => {
  agent
    .get('/api/')
    .end((err, res) => {
      if (err) { done(err) }
      res.status.should.be.equal(200);
      res.characters.should.be.an('Array');
      res.characters.should.include(characterNames);
      return done();
  });
});

it('should return character first name', (done) => {
  agent
    .get('/api/:id')
    .end((err, res) => {
      if (err) { done(err) }
      res.status.should.be.equal(200);


    })
});

