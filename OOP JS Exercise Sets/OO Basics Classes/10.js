class Cat {
  constructor(name) {
    this.name = name;
  }

  static genericGreeting() {
    console.log(`Cats are mean.`);
  }

  personalGreeting() {
    console.log(`But ${this.name} is a cute cat.`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();