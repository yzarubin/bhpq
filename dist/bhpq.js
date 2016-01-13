'use strict';

function Pqueue(opts) {
  this._compare = opts && opts.min && Pqueue$minFirst || Pqueue$maxFirst;
  this._gp = opts && opts.getPriority || Pqueue$getPriority;
  this.queue = [];
}

// Returns true if a is higher priority than b
function Pqueue$maxFirst(a, b) {
  return a >= b;
}

// Returns true if a is higher priority than b
function Pqueue$minFirst(a, b) {
  return a <= b;
}

// V8 should inline this fn call
function Pqueue$getPriority(v) {
  return v;
}

Pqueue.prototype.push = function Pqueue$push(val) {
  var parent;
  this.queue.push(val);
  var length = this.queue.length - 1;

  // Starting from the end
  for (var i = length; i; i = parent) {
    parent = (i - 1) >> 1;

    // Break if the parent is of higher priority
    if (this._compare(this._gp(this.queue[parent]), this._gp(val))) break;

    // Otherwise move the parent down
    this.queue[i] = this.queue[parent];
  }

  this.queue[i] = val;
  return length;
};

Pqueue.prototype.pop = function Pqueue$pop() {
  var result = this.queue[0];
  var last = this.queue.pop();
  var length = this.queue.length;
  var swapChild, otherChild;

  if (length > 0) {
    for (var i = 0; ; i = swapChild) {
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
      if (this._compare(this._gp(last), this._gp(this.queue[swapChild]))) break;

      // Move the child up
      this.queue[i] = this.queue[swapChild];
    }

    this.queue[i] = last;
  }

  return result;
};

Pqueue.prototype.peek = function Pqueue$peek() {
  return this.queue[0];
};

Object.defineProperty(Pqueue.prototype, 'length', {
  get: function() {
    return this.queue.length;
  },
  set: function() {
    throw new RangeError('');
  }
});

module.exports = Pqueue;
