'use strict';

function PriorityQueue(opts) {
  this._length = 0;
  this._compare = opts && opts.max && function gt(a, b) {return a <= b;} || function lt(a, b) {return a>b;};
}

PriorityQueue.prototype.push = function PriorityQueue$push(val) {
  var length = this._length++;
  var compare = this._compare;
 
  for (var i = length; i; i = parent) {
    parent = (i - 1) >> 1;
    if (this._compare(this[parent], val)) break;
    this[i] = this[parent];
  }
  this[i] = val;
  return length;
}

PriorityQueue.prototype.pop = function PriorityQueue$pop() {
  var length = this._length;
  var res = this[length];
  this[length] = void 0;
  this._length = length - 1;
  return res;
}
  
  
Object.defineProperty(PriorityQueue.prototype, 'length', {
  get: function() {
      return this._length;
  },
  set: function() {
      throw new RangeError('');
  }
});

