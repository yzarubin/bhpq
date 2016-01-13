'use strict';

const Benchmark = require('benchmark');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const bhpq = new (require('../dist/bhpq'))();
const priorityQueueJs = new (require('priorityqueuejs'))();
const queuePriority = new (require('queue-priority'))();
const jsPriorityQueue = new (require('js-priority-queue'))({ comparator: function(a, b) { return b - a; }});
const priorityHeapQueue = new (require('priority-heap-queue'))();
const pqueue = new (require('pqueue'))();

var size = 100;
var randInt;
var arr = [];


for (var i = 0; i < size; i++) {
  arr.push(getRandomInt(10000000, 0))
}

var suite = new Benchmark.Suite();

suite
.add('bhpq', function(){
  for (var i = 0; i < size; i++) {
    bhpq.push(arr[i]);
  }

  for (var i = 0; i < size; i++) {
    var x = bhpq.pop();
  }
})
.add('priorityqueuejs', function(){
  for (var i = 0; i < size; i++) {
    priorityQueueJs.enq(arr[i]);
  }

  for (var i = 0; i < size; i++) {
    priorityQueueJs.deq();
  }
})
.add('queue-priority', function(){
  for (var i = 0; i < size; i++) {
    queuePriority.push(arr[i]);
  }

  for (var i = 0; i < size; i++) {
    queuePriority.pop();
  }
})
.add('js-priority-queue', function(){
  for (var i = 0; i < size; i++) {
    jsPriorityQueue.queue(arr[i]);
  }

  for (var i = 0; i < size; i++) {
    var x = jsPriorityQueue.dequeue();
  }
})
/*
.add('priority-heap-queue', function(){
  var a = dequeBuiltIn.shift();
  var b = dequeBuiltIn.shift();
  var c = dequeBuiltIn.shift();

  dequeBuiltIn.push(a);
  dequeBuiltIn.push(b);
  dequeBuiltIn.push(c);
})
*/
.add('pqueue', function(){
  for (var i = 0; i < size; i++) {
    pqueue.push(arr[i]);
  }

  for (var i = 0; i < size; i++) {
    var x = pqueue.pop();
  }
})

.on('cycle', function(e) {
  console.log('' + e.target);
})
.run();
