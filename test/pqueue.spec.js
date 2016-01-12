'use strict';

var Pqueue = require('../dist/pqueue');
var assert = require('assert');

describe('constructor', function() {
  it('should return a pqueue object', function() {
    var q = new Pqueue();
    assert(q.length === 0);
  });
});

describe('min push', function() {
  it('should push values, min values should be at the top', function() {
    var q = new Pqueue({min: true});
    q.push(3);
    assert(q.peek() === 3);
    assert(q.length === 1);
    q.push(5);
    assert(q.peek() === 3);
    assert(q.length === 2);
    q.push(1);
    assert(q.peek() === 1);
    assert(q.length === 3);
  });
});

describe('min pop', function() {
  it('should pop highest priority values and re-order the queue', function() {
    var q = new Pqueue({min: true});
    q.push(3);
    q.push(5);
    q.push(6);
    q.push(1);
    q.push(0);
    q.push(7);

    assert(q.pop() === 0);
    assert(q.pop() === 1);
    assert(q.pop() === 3);
    assert(q.pop() === 5);
    assert(q.pop() === 6);
    assert(q.pop() === 7);
    assert(q.length === 0);
  });
});

describe('max push', function() {
  it('should push values, max values should be at the top', function() {
    var q = new Pqueue();
    q.push(3);
    assert(q.peek() === 3);
    assert(q.length === 1);
    q.push(5);
    assert(q.peek() === 5);
    assert(q.length === 2);
    q.push(1);
    assert(q.peek() === 5);
    assert(q.length === 3);
  });
});

describe('max pop', function() {
  it('should pop highest priority values and re-order the queue', function() {
    var q = new Pqueue();
    q.push(3);
    q.push(5);
    q.push(6);
    q.push(1);
    q.push(0);
    q.push(7);
    console.log(q)
    assert(q.pop() === 7);
    assert(q.pop() === 6);
    assert(q.pop() === 5);
    assert(q.pop() === 3);
    assert(q.pop() === 1);
    console.log(q)
    assert(q.pop() === 0);
    console.log(q)
    assert(q.length === 0);
  });
});

describe('peek', function() {
  it('should return the front of the queue', function() {
    var q = new Pqueue();
    assert(q.peek() === undefined);
    q.push(3);
    assert(q.peek() === 3);
    assert(q.length === 1);
  });
});