'use strict';

function isArray(v) {
  return Array.isArray(v);
}

function isObject(v) {
  var type = typeof v;
  return !!v && (type == 'object' || type == 'function');
}

function Pqueue(opts, data) {
  var initialData = isArray(data) && data || isArray(opts) && opts || [];
  var opts = !isArray(opts) && isObject(opts) && opts || {};

  this._compare = opts.min && Pqueue$minFirst || Pqueue$maxFirst;
  this._gp = opts.getPriority || Pqueue$getPriority;
  this._queue = [];

  var initialDataLen = initialData.length;

  if (initialDataLen > 0) {
    for (var i = 0; i < initialDataLen; i++) {
      this.push(initialData[i]);
    }
  }
}

// Returns true if a is higher priority than b
function Pqueue$maxFirst(a, b) {
  return a >= b;
}

// Returns true if a is higher priority than b
function Pqueue$minFirst(a, b) {
  return a <= b;
}

// Identity
function Pqueue$getPriority(v) {
  return v;
}

Pqueue.prototype.push = function Pqueue$push(val) {
  var parent;
  this._queue.push(val);
  var length = this._queue.length - 1;

  // Starting from the end
  for (var i = length; i; i = parent) {
    parent = (i - 1) >> 1;

    // Break if the parent is of higher priority
    if (this._compare(this._gp(this._queue[parent]), this._gp(val))) break;

    // Otherwise move the parent down
    this._queue[i] = this._queue[parent];
  }

  this._queue[i] = val;
  return length;
};

Pqueue.prototype.pop = function Pqueue$pop() {
  var result = this._queue[0];
  var last = this._queue.pop();
  var length = this._queue.length;
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
      if ((otherChild < length) && this._compare(this._gp(this._queue[otherChild]), this._gp(this._queue[swapChild])))
        swapChild = otherChild;

      // Break if the last element is of higher priority than its child
      if (this._compare(this._gp(last), this._gp(this._queue[swapChild]))) break;

      // Move the child up
      this._queue[i] = this._queue[swapChild];
    }

    this._queue[i] = last;
  }

  return result;
};

Pqueue.prototype.peek = function Pqueue$peek() {
  return this._queue[0];
};

Pqueue.prototype.clear = function Pqueue$clear() {
  this._queue.length = 0;
};

Object.defineProperty(Pqueue.prototype, 'length', {
  get: function() {
    return this._queue.length;
  },
  set: function() {
    throw new RangeError('');
  }
});

module.exports = Pqueue;
