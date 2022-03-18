class Cat {
  constructor(name) {
    this.name = name;
  }
  personalGreeting() {
    console.log(`name is ${this.name}`);
  }
  static genericGreeting() {
    console.log(`I'm cat`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();