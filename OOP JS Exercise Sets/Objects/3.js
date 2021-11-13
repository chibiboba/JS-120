function objectsEqual(obj1, obj2) {
  return compareKeys(obj1, obj2) && compareValues(obj1, obj2);
}

function compareKeys(obj1, obj2) {
  let obj1Keys = Object.getOwnPropertyNames(obj1);
  let obj2Keys = Object.getOwnPropertyNames(obj2);

  return obj1Keys.every((key, index) => key === obj2Keys[index]);
}

function compareValues(obj1, obj2) {
  let obj1Keys = Object.getOwnPropertyNames(obj1);
  return obj1Keys.every(key => obj1[key] === obj2[key]);
}

console.log(objectsEqual({ a: 'foo' }, { a: 'foo' }));                      // true
console.log(objectsEqual({ a: 'foo', b: 'bar' }, { a: 'foo' }));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({ a: 'foo', b: undefined }, { a: 'foo', c: 1 }));  // false