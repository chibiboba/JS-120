let obj = {};
console.log(obj.constructor); // [Function: Object]
console.log(obj.hasOwnProperty('constructor')); // false

console.log(obj.constructor.prototype.hasOwnProperty('constructor')); // true
console.log(obj.__proto__.hasOwnProperty('constructor')); // true
// obj.__proto__ references Object.prototype

console.log(obj.constructor.__proto__); // {} which is Function.prototype, a Function object
console.log(obj.constructor.constructor); // [Function: Function].

let arr = [];
console.log(arr.constructor); // [Function: Array]
console.log(arr.hasOwnProperty('constructor')); // false
console.log(arr.constructor.prototype.hasOwnProperty('constructor')); // true
console.log(arr.__proto__.hasOwnProperty('constructor')); // true
console.log(arr.constructor.constructor); // [Function: Function]

function func() {
}
console.log(func.constructor); // [Function: Function]
console.log(func.constructor.prototype); // {} which is Function.prototype
console.log(func.prototype.hasOwnProperty('constructor')); // true
console.log(func.constructor.constructor); // [Function: Function]
