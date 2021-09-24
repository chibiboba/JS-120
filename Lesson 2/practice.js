let obj = {
  func: function () {
    return this;
  },
};

let context = obj.func();

console.log(context);