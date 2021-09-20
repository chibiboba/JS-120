let cat = {
  noise: 'meow',
};

let pets = {
  dog: {
    noise: 'woof',
  },

  cat: cat.noise,

  printInfo() {
    console.log(`My dog makes this noise ${this.dog.noise}`);
    console.log(`My cat makes this noise: ${this.cat}`);
  },
};

pets.printInfo();