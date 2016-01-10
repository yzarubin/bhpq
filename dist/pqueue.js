'use strict';

function PriorityQueue(opts) {
  this._length = 0;
  this._compare = opts && opts.maxFirst && PriorityQueue$maxFirst || PriorityQueue$minFirst;
  this._gp = opts && opts.getPriority || PriorityQueue$getPriority;
}

// Returns true if a is higher priority than b
function PriorityQueue$maxFirst(a, b) {
  return a >= b;
}

// Returns true if a is higher priority than b
function PriorityQueue$minFirst(a, b) {
  return a <= b;
}

// V8 should inline this fn call
function PriorityQueue$getPriority(v) {
  return v;
}

PriorityQueue.prototype.push = function PriorityQueue$push(val) {
  var length = this._length;
  var parent;

  // Starting from the end
  for (var i = length; i; i = parent) {
    parent = (i - 1) >> 1;

    // Break if the parent is of higher priority
    if (this._compare(this._gp(this[parent]), this._gp(val))) break;

    // Otherwise move the parent down
    this[i] = this[parent];
  }

  this[i] = val;
  this._length = length + 1;
  return length + 1;
};

PriorityQueue.prototype.pop = function PriorityQueue$pop() {
  var length = this._length;
  var highestPriorityElement = this[0];

  var last = this[--length];
  var swapChild, otherChild;

  for (var i = 0; 1; i = swapChild) {
    // First child swap position
    swapChild = (i << 1) + 1;

    // Break if we reached the end
    if (swapChild >= length) break;

    // Second child position
    otherChild = swapChild + 1;

    // Set swapChild to otherChild if otherChild is of higher priority
    if ((otherChild < length) && this._compare(this._gp(this[otherChild]), this._gp(this[swapChild])))
      swapChild = otherChild;

    // Break if the last element is of higher priority than its child
    if (this._compare(last, this[swapChild])) break;

    // Move the child up
    this[i] = this[swapChild];
  }

  this[i] = last;
  this[length] = void 0;
  this._length = length;
  return highestPriorityElement;
};

PriorityQueue.prototype.peek = function PriorityQueue$peek() {
  return this[0];
};

Object.defineProperty(PriorityQueue.prototype, 'length', {
  get: function() {
    return this._length;
  },
  set: function() {
    throw new RangeError('');
  }
});

module.exports = PriorityQueue;


