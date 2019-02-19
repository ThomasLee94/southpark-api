/* eslint-disable no-undef */
const mocha = require('mocha');
const chai = require('chai');
const server = require('../../index');
const expect = chai.expect;
const { assert } = require('chai')
const agent = chai.request.agent(server);

it('should return all seasons', (done) => {
  agent
    .get('/api/seasons')
    .end((err, res) => {
      if (err) { done(err); }
      res.status.should.be.equal(200);
      // TEST BODY
      return done();
    });
});

it('should return all episodes associated with seasons', (done) => {
  agent
    .get('/api/:season/episodes')
    .end((err, res) => {
      if (err) { done(err); }
      res.status.should.be.equal(200);
      // TEST BODY
      return done();
    });
});
