[![Build Status](https://travis-ci.org/yzarubin/bhpq.svg?branch=master)](https://travis-ci.org/yzarubin/bhpq)

# Introduction

Fast binary heap [priority queue](https://en.wikipedia.org/wiki/Priority_queue) implementation in JavaScript. See [benchmarks](#benchmarks) for comparisons between different npm modules.

# Quick start

    npm install bhpq

```js
  var Pqueue = require('bhpq');

  var pqueue = new Pqueue([3, 1, 2]);
  pqueue.pop(); // 3
  pqueue.pop(); // 2
  pqueue.pop(); // 1
```

# API

- [`new Pqueue([Array items],[Object options])`](#new-pqueueobject-options-array-items---pqueue)
- [`push(dynamic item)`](#pushdynamic-item---int)
- [`pop()`](#pop---dynamic)
- [`peek()`](#peek---dynamic)
- [`clear()`](#clear---void)

##### `new Pqueue([Array items], [Object options])` -> `Pqueue`

Creates an empty max-heap priority queue. By default, the queue orders numeric values from highest to lowest. The constructor accepts an optional `items` array, which will be used to initialize the queue.

```js
var pqueue = new Pqueue([2, 3, 1]);
pqueue.pop(); // 3
pqueue.pop(); // 2
```

The constructor accepts an optional `options` object with the following optional keys:
  - `min` - when `true`, the queue will be ordered such that lower values are given priority over higher values. Defaults to `false`.
  - `getPriority` - a function of the form `(*) -> Number` is used to map a queue item to a priority number. This is useful if you want to push anything other than numbers into the queue, and prioritize them using your own custom logic.
  - `comparator` - a function of the form `(*, *) -> Number` is used to compare two queue items returning `> 0` if the first item priority is greater than the second item, `< 0` if the second item priority is greater than the first and `= 0` if they both items are of equal priority. **NOTE:** if this option is provided the `getPriority` option is ignored.

E.g. using `min` and `getPriority` to create a queue of `Person` objects and order them from youngest to oldest.

```js

var people = [
  {name: 'Bob', age: 40},
  {name: 'Alice', age: 15},
  {name: 'Eve', age: 30}
];

var pqueue = new Pqueue(people, {min: true, getPriority: (o) => o.age});
pqueue.pop() // {name: 'Alice', age: 15}
pqueue.pop() // {name: 'Eve', age: 30}
pqueue.pop() // {name: 'Bob', age: 40}
```

<hr>

##### `push(dynamic item)` -> `int`

Pushes an item into the queue and sorts it so that items with the highest priority are at the front of the queue. Completes in at worst `O(log n)` time. Returns the number of items currently in the queue.

```js
var pqueue = new Pqueue();
pqueue.push(50);  // 1
pqueue.push(100); // 2
pqueue.push(10);  // 3
```

<hr>

##### `pop()` -> `dynamic`

Removes and returns the highest priority item from queue, and resorts the queue in the process. Completes in at worst `O(log n)` time. Returns `undefined` if the queue is empty.

```js
var pqueue = new Pqueue([1,2,3]);
pqueue.pop(); // 3
pqueue.pop(); // 2
pqueue.pop(); // 1
pqueue.pop(); //undefined
```

Note: To see what's at the front of the queue without removing it, use [`peek()`](#peek---dynamic)

<hr>

##### `peek()` -> `dynamic`

Returns the highest priority item without removing it from the queue. Completes in `O(1)` time. Returns `undefined` if the queue is empty.

```js
var pqueue = new Pqueue([5]);
pqueue.peek(); // 5
pqueue.length; // 1
```

<hr>

##### `clear()` -> `void`

Clears the queue.

```js
var pqueue = new Pqueue([1,2,3]);
pqueue.length; // 3
pqueue.clear();
pqueue.length; // 0
```

<hr>

# Benchmarks

## Push and pop 100 items to/from the queue

    bhpq              x 458,385 ops/sec ±0.26% (94 runs sampled)
    priorityqueuejs   x 358,168 ops/sec ±0.47% (95 runs sampled)
    js-priority-queue x 304,526 ops/sec ±0.36% (92 runs sampled)
    queue-priority    x 10,119  ops/sec ±0.89% (89 runs sampled)

## Push and pop 1 million items to/from the queue

    bhpq              x 6.35 ops/sec ±1.61% (20 runs sampled)
    priorityqueuejs   x 5.43 ops/sec ±0.89% (18 runs sampled)
    js-priority-queue x 5.27 ops/sec ±1.22% (18 runs sampled)
    queue-priority:   N/A (too slow)
