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

  it('should pop highest values and re-order the queue #2', function() {
    var q = new Pqueue({maxFirst: true});
    q.push(11);
    assert(q.pop() === 11);
    q.push(5);
    q.push(7);
    assert(q.pop() === 7);
    q.push(3);
    q.push(5);
    assert(q.pop() === 5);
    q.push(3);
    q.push(2);
    assert(q.pop() === 5);
    q.push(1);
    q.push(0);
    assert(q.pop() === 3);
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