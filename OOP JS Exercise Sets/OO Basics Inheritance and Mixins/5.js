class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello! My name is ${this.name}!`;
  }
}

let walkMixIn = {
  walk: function () {
    return `Let's go for a walk!`;
  },
};

Object.assign(Cat.prototype, walkMixIn);

let kitty = new Cat("Sophie");
console.log(kitty.greet());
console.log(kitty.walk());