function myFilter(array, func, context) {
  let result = [];

  array.forEach(function (value) {
    if (func.bind(context)(value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
};

let returned = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function (val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]

console.log(returned);