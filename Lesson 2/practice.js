let cat = {
  says: 'meow',
};

let dog = {};

Object.setPrototypeOf(dog, cat);

dog.says = 'woof';

console.log(cat.says); // meow
console.log(dog.says); // woof