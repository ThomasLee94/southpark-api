/* eslint-disable no-undef */
const mocha = require('mocha');
const chai = require('chai');
const server = require('../../index');

const expect = chai.expect;
const { assert } = require('chai')

const agent = chai.request.agent(server);

it('should return all lines associated with episode', (done) => {
  agent
    .get('/api/:season/lines')
    .end((err, res) => {
      if (err) { done(err); }
      res.status.should.be.equal(200);
      // TEST BODY
      return done();
    });
});

it('should return all lines associated with a specific episode', (done) => {
  agent
    .get('/api/:season/:episode/lines')
    .end((err, res) => {
      if (err) { done(err); }
      res.status.should.be.equal(200);
      // TEST BODY
      return done();
    });
});

it('should return all lines for a specific character for any given episode associated with season ', (done) => {
  agent
    .get('/api/:season/:episode/length')
    .end((err, res) => {
      if (err) { done(err); }
      res.status.should.be.equal(200);
      // TEST BODY
      return done();
    });
});

it('should return all lines for a specific character', (done) => {
  agent
    .get('/api/:character/:lines')
    .end((err, res) => {
      if (err) { done(err); }
      res.status.should.be.equal(200);
      // TEST BODY
      return done();
    });
});