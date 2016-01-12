'use strict';

const Benchmark = require('benchmark');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const bpqueue = new (require('../dist/pqueue'))();
const priorityQueueJs = new (require('priorityqueuejs'))();
const queuePriority = new (require('queue-priority'))();
const jsPriorityQueue = new (require('js-priority-queue'))({ comparator: function(a, b) { return b - a; }});
const priorityHeapQueue = new (require('priority-heap-queue'))();
const pqueue = new (require('pqueue'))();

var size = 1000;
var randInt;

while (--size) {
  var randInt = getRandomInt(0, 1000);
  bpqueue.push(randInt);
  priorityQueueJs.enq(randInt);
  queuePriority.push(randInt);
  jsPriorityQueue.queue(randInt);
  pqueue.push(randInt);
}

var suite = new Benchmark.Suite();

suite
.add('bpqueue', function(){
  var a = bpqueue.pop();
  var b = bpqueue.pop();
  var c = bpqueue.pop();

  bpqueue.push(a);
  bpqueue.push(b);
  bpqueue.push(c);
})
.add('priorityqueuejs', function(){
  var a = priorityQueueJs.deq();
  var b = priorityQueueJs.deq();
  var c = priorityQueueJs.deq();

  priorityQueueJs.enq(a);
  priorityQueueJs.enq(b);
  priorityQueueJs.enq(c);
})
.add('queue-priority', function(){
  var a = queuePriority.pop();
  var b = queuePriority.pop();
  var c = queuePriority.pop();

  queuePriority.push(a);
  queuePriority.push(b);
  queuePriority.push(c);
})
.add('js-priority-queue', function(){
  var a = jsPriorityQueue.dequeue();
  var b = jsPriorityQueue.dequeue();
  var c = jsPriorityQueue.dequeue();

  jsPriorityQueue.queue(a);
  jsPriorityQueue.queue(b);
  jsPriorityQueue.queue(c);
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
  var a = pqueue.pop();
  var b = pqueue.pop();
  var c = pqueue.pop();

  pqueue.push(a);
  pqueue.push(b);
  pqueue.push(c);
})
.on('cycle', function(e) {
  console.log('' + e.target);
})
.run();
