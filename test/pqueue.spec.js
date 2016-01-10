'use strict';

var Pqueue = require('../dist/pqueue');
var assert = require('assert');

describe('constructor', function() {
  it('should return a pqueue object', function() {
    var q = new Pqueue();
    assert(q.length === 0);
  });
});

describe('push', function() {
  it('should push values, min values should be at the top', function() {
    var q = new Pqueue();
    q.push(3);
    assert(q[0] === 3);
    assert(q.length === 1);
    q.push(5);
    assert(q[0] === 3);
    assert(q.length === 2);
    q.push(1);
    assert(q[0] === 1);
    assert(q.length === 3);
  });
});

describe('pop', function() {
  it('should pop highest values and re-order the queue', function() {
    var q = new Pqueue();
    q.push(3);
    q.push(5);
    q.push(1);

    assert(q.pop() === 1);
    assert(q.pop() === 3);
    assert(q.pop() === 5);
    assert(q.length === 0);
  });
});