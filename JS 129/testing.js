const Flyable = { // mix-in object
  fly() {
    console.log('I can fly!');
  }
};

class Bird { // parent class
  constructor(name) {
    this.name = name;
  }

  type() {
    console.log('My type is bird.');
  }
}

Object.assign(Bird.prototype, Flyable); // endows parent class with more capability

class Parrot extends Bird { // subclass of bird, parrot is a type of bird
  constructor(name) {
    super(name);
  }
}

class Jet { // planes are not birds but can also fly
  constructor(name) {
    this.name = name;
  }

  type() {
    console.log('My type is plane.');
  }
}

Object.assign(Jet.prototype, Flyable);

let eep = new Parrot('eep');
let meep = new Jet('meep');

eep.type();
console.log(eep.name);
meep.type();
console.log(meep.name);