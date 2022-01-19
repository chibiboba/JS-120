let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false

// if property doesn't exist on the object, then don't assign the property. 
function assignProperty(obj, property, value) {

  while (Object.getPrototypeOf(obj) !== null) {
    if (obj.hasOwnProperty(property)) {
      obj.property = value;
      break;
    } else {
      obj = Object.getPrototypeOf(obj);
    }
  }
}