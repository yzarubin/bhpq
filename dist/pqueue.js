'use strict';

function PriorityQueue(opts) {
  this._length = 0;
  this._compare = opts && opts.min && PriorityQueue$minFirst || PriorityQueue$maxFirst;
  this._gp = opts && opts.getPriority || PriorityQueue$getPriority;
  this.queue = [];
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
    if (this._compare(this._gp(this.queue[parent]), this._gp(val))) break;

    // Otherwise move the parent down
    this.queue[i] = this.queue[parent];
  }

  this.queue[i] = val;
  this._length = length + 1;
  return length + 1;
};

PriorityQueue.prototype.pop = function PriorityQueue$pop() {
  var length = this._length;
  var highestPriorityElement = this.queue[0];

  var last = this.queue[--length];
  var swapChild, otherChild;

  for (var i = 0; 1; i = swapChild) {
    // First child swap position
    swapChild = (i << 1) + 1;

    // Break if we reached the end
    if (swapChild >= length) break;

    // Second child position
    otherChild = swapChild + 1;

    // Set swapChild to otherChild if otherChild is of higher priority
    if ((otherChild < length) && this._compare(this._gp(this.queue[otherChild]), this._gp(this.queue[swapChild])))
      swapChild = otherChild;

    // Break if the last element is of higher priority than its child
    if (this._compare(last, this.queue[swapChild])) break;

    // Move the child up
    this.queue[i] = this.queue[swapChild];
  }

  this.queue[i] = last;
  this.queue[length] = void 0;
  this._length = length;
  return highestPriorityElement;
};

PriorityQueue.prototype.peek = function PriorityQueue$peek() {
  return this.queue[0];
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


