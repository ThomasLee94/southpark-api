const mocha = require('mocha');
const chai = require('chai');
const server = require('../../index');
const expect = chai.expect;
const { assert } = require('chai')
const agent = chai.request.agent(server);

it('should return all the episodes of associated season', (done) => {
  agent
    .get('/api/:season/episodes')
    .end((err, res) => {
      if (err) { done(err) }
      res.status.should.be.equal(200);
      res.characters.should.be.an('Array');
      res.characters.should.include(characterFullNames);
      return done();
  });
});

it('should return specific episode of associated season', (done) => {
  agent
    .get('/api/:season/:episode')
    .end((err, res) => {
      if (err) { done(err) }
      // TEST BODY
      return done();
    })
});

it('should return length of episode in minutes of associated season', (done) => {
  agent
    .get('/api/:season/:episode/length')
    .end((err, res) => {
      if (err) { done(err) }
      // TEST BODY
      return done(); 
    })
})