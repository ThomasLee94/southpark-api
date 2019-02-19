/* eslint-disable no-undef */
const mocha = require('mocha');
const chai = require('chai');
const server = require('../../index');

const expect = chai.expect;
const { assert } = require('chai')

const agent = chai.request.agent(server);
const characterFullNames = require('../../../bin/db/southparkNames');

it('should return list of all characters full names', (done) => {
  agent
    .get('/api/')
    .end((err, res) => {
      if (err) { done(err) }
      res.status.should.be.equal(200);
      res.characters.should.be.an('Array');
      res.characters.should.include(characterFullNames);
      return done();
    });
});

it('should return a specific character full name', (done) => {
  agent
    .get('/api/:id')
    .end((err, res) => {
      if (err) { done(err) }
      res.status.should.be.equal(200);
      res.status.should.be.an('String');
      res.characters.should.include(characterFullNames);
      return done();
    });
});
