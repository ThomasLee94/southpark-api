/* eslint-disable prefer-arrow-callback */

const mocha = require('mocha');
const chai = require('chai');
const utils = require('../utils');
const expect = chai.expect;
const { assert } = require('chai')

it('should return character first name', function() {
  const hello = utils.sayHello();
  expect(hello).to.be.a('string');
  expect(hello).to.equal('Hello');
  expect(hello).with.lengthOf(5);
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
