(function () {
  'use strict';

  function isArray(v) {
    return Array.isArray(v);
  }

  function isObject(v) {
    return !!v && typeof v === 'object';
  }

  function identity(v) {
    return v;
  }

  function comparator(getPriority) {
    return function(a, b) {
      return getPriority(a) - getPriority(b);
    };
  }

  function order(comparator, compare) {
    return function(a, b) {
      return comparator(a, b) * compare;
    };
  }

  function Pqueue(data, opts) {
    var initialData = isArray(data) && data || [];
    var opts = !isArray(data) && isObject(data) && data || isObject(opts) && opts || {};
    var direction = opts.min && -1 || 1;
    var getPriority = opts.getPriority || identity;

    this._comparator = order(opts.comparator || comparator(getPriority), direction);
    this._q = [];

    this.pushArray(initialData);
  }

  Pqueue.prototype.push = function push(val) {
    var parent, length;
    this._q.push(val);
    length = this._q.length - 1;

    // Starting from the end
    for (var i = length; i; i = parent) {
      parent = (i - 1) >> 1;

      // Break if the parent is of higher priority
      if (this._comparator(this._q[parent], val) > 0) break;

      // Otherwise move the parent down
      this._q[i] = this._q[parent];
    }

    this._q[i] = val;
    return length;
  };

  Pqueue.prototype.pop = function pop() {
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
        if ((otherChild < length) && this._comparator(this._q[otherChild], this._q[swapChild]) > 0)
          swapChild = otherChild;

        // Break if the last element is of higher priority than its child
        if (this._comparator(last, this._q[swapChild]) > 0) break;

        // Move the child up
        this._q[i] = this._q[swapChild];
      }

      this._q[i] = last;
    }

    return result;
  };

  Pqueue.prototype.peek = function peek() {
    return this._q[0];
  };

  Pqueue.prototype.clear = function clear() {
    this._q.length = 0;
  };

  Pqueue.prototype.pushArray = function pushArray(arr) {
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
