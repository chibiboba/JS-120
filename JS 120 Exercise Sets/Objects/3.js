// solution 2
function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  return (compareKeys(obj1, obj2) && compareValues(obj1, obj2));
}

function compareKeys(obj1, obj2) {
  let a = Object.getOwnPropertyNames(obj1).sort();
  let b = Object.getOwnPropertyNames(obj2).sort();

  if (a.length !== b.length) {
    return false;
  }

  return a.every((prop, index) => {
    return prop === b[index];
  });
}

function compareValues(obj1, obj2) {
  for (let prop in obj1) {
    if (obj1[prop] !== obj2[prop]) {
      return false;
    }
  }

  return true;
}

console.log(objectsEqual({ a: 'foo' }, { a: 'foo' }));                      // true
console.log(objectsEqual({ a: 'foo', b: 'bar' }, { a: 'foo' }));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({ a: 'foo', b: undefined }, { a: 'foo', c: 1 }));  // false

// my solution 1
// function objectsEqual(obj1, obj2) {
//   if (obj1 === obj2) {
//     return true;
//   }

//   // compare key length
//   let a = Object.getOwnPropertyNames(obj1).sort();
//   let b = Object.getOwnPropertyNames(obj2).sort();

//   if (a.length !== b.length) {
//     return false;
//   }

//   // compare keys & values
//   for (let prop in obj1) {
//     if (!(prop in obj2)) {
//       return false;
//     } else if (obj1[prop] !== obj2[prop]) {
//       return false;
//     }
//   }

//   return true;
// }
