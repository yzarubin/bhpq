(function () {
  'use strict';

  function isArray(v) {
    return Array.isArray(v);
  }

  function isObject(v) {
    return !!v && typeof v === 'object';
  }

  // Returns true if a is higher priority than b
  function Pqueue$maxFirst(a, b) {
    return a >= b;
  }

  // Returns true if a is higher priority than b
  function Pqueue$minFirst(a, b) {
    return a <= b;
  }

  // Identity function
  function Pqueue$getPriority(v) {
    return v;
  }

  function Pqueue(data, opts) {
    var initialData = isArray(data) && data || [];
    var opts = !isArray(opts) && isObject(opts) && opts ||
               !isArray(data) && isObject(data) && data ||
               {};

    this._compare = opts.min && Pqueue$minFirst || Pqueue$maxFirst;
    this._gp = opts.getPriority || Pqueue$getPriority;
    this._q = [];

    this.pushArray(initialData);
  }

  Pqueue.prototype.push = function Pqueue$push(val) {
    var parent, length;
    this._q.push(val);
    length = this._q.length - 1;

    // Starting from the end
    for (var i = length; i; i = parent) {
      parent = (i - 1) >> 1;

      // Break if the parent is of higher priority
      if (this._compare(this._gp(this._q[parent]), this._gp(val))) break;

      // Otherwise move the parent down
      this._q[i] = this._q[parent];
    }

    this._q[i] = val;
    return length;
  };

  Pqueue.prototype.pop = function Pqueue$pop() {
    var result = this._q[0];
    var last = this._q.pop();
    var length = this._q.length;
    var swapChild, otherChild;

    if (length > 0) {
      for (var i = 0; ; i = swapChild) {
        // First child swap position
        swapChild = i << 1 | 1;

        // Break if we reached the end
        if (swapChild >= length) break;

        // Second child position
        otherChild = swapChild + 1;

        // Set swapChild to otherChild if otherChild is of higher priority
        if ((otherChild < length) && this._compare(this._gp(this._q[otherChild]), this._gp(this._q[swapChild])))
          swapChild = otherChild;

        // Break if the last element is of higher priority than its child
        if (this._compare(this._gp(last), this._gp(this._q[swapChild]))) break;

        // Move the child up
        this._q[i] = this._q[swapChild];
      }

      this._q[i] = last;
    }

    return result;
  };

  Pqueue.prototype.peek = function Pqueue$peek() {
    return this._q[0];
  };

  Pqueue.prototype.clear = function Pqueue$clear() {
    this._q.length = 0;
  };

  Pqueue.prototype.pushArray = function Pqueue$pushArray(arr) {
    var arrLen = arr.length;

    for (var i = 0; i < arrLen; i++) {
      this.push(arr[i]);
    }
  };

  Object.defineProperty(Pqueue.prototype, 'length', {
    get: function() {
      return this._q.length;
    },
    set: function() {
      throw new RangeError('');
    }
  });

  if (typeof module !== 'undefined' && module !== null && module.exports !== 'undefined' && module.exports !== null) {
    module.exports = Pqueue;
  } else if (this) {
    this.Pqueue = Pqueue;
  }

  return Pqueue;
}).call(this);
