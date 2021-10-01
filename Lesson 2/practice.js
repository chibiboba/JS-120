class A {
  constructor() {

  }
}

class B extends A {
  constructor () {
    super();
  }
}

let yes = new A();
let no = new B();

// console.log(B.__proto__);
// console.log(B.__proto__ === A);
// console.log(B.constructor);
console.log(A.__proto__);
console.log(A.constructor);
console.log(Object.prototype);
