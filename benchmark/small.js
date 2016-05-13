'use strict';

const Benchmark = require('benchmark');
console.log(Benchmark.platform.toString());

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const bhpq = new (require('../'))();
const priorityQueueJs = new (require('priorityqueuejs'))();
const queuePriority = new (require('queue-priority'))();
const jsPriorityQueue = new (require('js-priority-queue'))({comparator: function(a, b) {return b - a;}});

var size = 100;
var arr = [];

for (var i = 0; i < size; i++) {
  arr.push(getRandomInt(0, 10000000));
}

var suite = new Benchmark.Suite();

suite
  .add('bhpq', function(){
    for (var i = 0; i < size; i++) {
      bhpq.push(arr[i]);
    }

    for (var i = 0; i < size; i++) {
      bhpq.pop();
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
      jsPriorityQueue.dequeue();
    }
  })
  .on('cycle', function(e) {
    console.log(e.target.toString());
  })
  .run();
