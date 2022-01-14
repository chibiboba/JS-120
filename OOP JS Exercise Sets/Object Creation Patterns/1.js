/* eslint-disable no-extend-native */
// name property added to make objects easier to identify
Object.prototype.ancestors = function() {
  Object.prototype.name = 'Object.prototype';
  let arr = [];
  let self = this;

  while (true) {
    let ancestor = Object.getPrototypeOf(self);
    if (ancestor === null) {
      break;
    }
    arr.push(ancestor.name);
    self = Object.getPrototypeOf(self);
  }

  console.log(arr);
};


let foo = { name: 'foo' };
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']