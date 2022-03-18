/* Implement an ancestors method that returns the prototype chain
(ancestors) of a calling object as an array of object names.
Here's an example output:
*/



// name property added to make objects easier to identify
// eslint-disable-next-line no-extend-native

// eslint-disable-next-line no-extend-native
Object.prototype.ancestors = function() {
  let obj = this;
  let ancestors = [];

  while (Object.getPrototypeOf(obj)) {
    let ancestor = Object.getPrototypeOf(obj);
    if ('name' in ancestor) {
      ancestors.push(ancestor.name);
    } else {
      ancestors.push('Object.prototype');
    }
    obj = ancestor;
  }
  console.log(ancestors);
};

let foo = {name: 'foo',};
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