const mocha = require('mocha');
const chai = require('chai');
const utils = require('../utils');
const server = require('../../index');
const expect = chai.expect;
const { assert } = require('chai')
const agent = chai.request.agent(server);

it('should return list of all characters', (done) => {
  agent
    .get('/api/')
    .end((err, res) => {
      if (err) { done(err) }
      res.status.should.be.equal(200);
      res.characters.should.be.an('Array');
      res.characters.should.include('Eric Cartman');
      res.characters.should.include('Kyle Broflovski');
      res.characters.should.include('Stan Marsh');
      res.characters.should.include('Kenny McCormick');
      res.characters.should.include('Butter');
      res.characters.should.include('Kyle');

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

it('should return the area of a 5 by 6 rectangle', function() {
  const area = utils.area(5, 6);
  expect(area).to.be.a('Number');
  expect(area).to.equal(30);
});

it('should return the area of a circle of radius 5', function() {
  const area = utils.circleArea(5)
  expect(area).to.be.a('Number')
  expect(area).to.equal(78.53981633974483)
});

it('Should create a new (object) Item with name and price', function(){
  const item = utils.makeObj('name', 'price');
  assert.isObject(item)
  expect(item).to.contain.keys('name');

  
});

it('Should return an array containing all items in cart');

it('Should add a new item to the shopping cart');

it('Should return the number of items in the cart');

it('Should remove items from cart');

// ========================================================
// Stretch Challenges
// ========================================================

it('Should update the count of items in the cart');

it('Should validate that an empty cart has 0 items');

it('Should return the total cost of all items in the cart');