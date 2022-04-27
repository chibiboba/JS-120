"use strict";

let obj = {
  foo: this,
};

console.log(obj.foo); // logs the global obejct, not undefined


