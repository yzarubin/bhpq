'use strict';

var Pqueue = require('../');
var assert = require('assert');

describe('constructor', function() {
  it('should return a pqueue object', function() {
    var q = new Pqueue();
    assert(q.length === 0);
  });

  it('should initialize the queue with an array argument', function() {
    var q = new Pqueue([1,2,3]);
    assert(q.length === 3);
    assert(q.pop() === 3);
    assert(q.pop() === 2);
    assert(q.pop() === 1);
    assert(q.pop() === undefined);
  });

  it('should initialize the queue with array, min=true and custom getPriority', function() {
    var data = [
      {k: 'a', v: 1},
      {k: 'b', v: 3},
      {k: 'c', v: 2}
    ];

    var opts = {
      min: true,
      getPriority: (o) => o.v
    };

    var q = new Pqueue(data, opts);

    assert(q.length === 3);
    assert(q.pop().k === 'a');
    assert(q.pop().k === 'c');
    assert(q.pop().k === 'b');
    assert(q.pop() === undefined);
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
    assert(q.pop() === undefined);
    assert(q.peek() === undefined);
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
    assert(q.pop() === 7);
    assert(q.pop() === 6);
    assert(q.pop() === 5);
    assert(q.pop() === 3);
    assert(q.pop() === 1);
    assert(q.pop() === 0);
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

describe('clear', function() {
  it('should clear the queue', function() {
    var q = new Pqueue();
    assert(q.length === 0);
    q.push(3);
    q.push(5);
    assert(q.length === 2);
    q.clear();
    assert(q.length === 0);
  });
});
