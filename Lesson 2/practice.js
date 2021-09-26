let logResult = function (func) {
  let result = func();
  console.log(result);
  return result;
};

let foo = function () {
  let sue = {
    name: 'Sue Perkins',
    age: 37,
    myAge() {
      return `${this.name} is ${this.age} years old.`;
    },
  };
  logResult(sue.myAge);
};

foo();
// Expected output: Sue Perkins is 37 years old.