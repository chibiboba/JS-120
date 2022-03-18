class CircularQueue {
  constructor(bufferSize) {
    this.bufferSize = bufferSize;
    this.queue = new Array(bufferSize).fill(null);
  }

  enqueue(obj) {
    if (this.queue.every(elem => elem !== null)) {
      this.dequeue();
    }
    let positionOfNull = this.queue.indexOf(null);
    this.queue[positionOfNull] = obj;
  }

  dequeue() {
    if (this.queue.every(elem => elem === null)) return null;
    let oldestObj = this.queue.shift();
    this.queue.push(null);
    return oldestObj;
  }
}

// easier solution
// class CircularQueue {
//   constructor(bufferSize) {
//     this.queue = [];
//     this.bufferSize = bufferSize;
//   }

//   enqueue(num) {
//     if (this.queue.length === this.bufferSize) {
//       this.dequeue();
//     }
//     this.queue.push(num);
//   }

//   dequeue() {
//     if (this.queue.length === 0) return null;
//     let oldest = this.queue.shift();
//     return oldest;
//   }
// }


let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);
console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);