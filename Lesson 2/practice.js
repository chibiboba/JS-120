function Dog(name, breed, weight) {
  Dog.myPrototype = { // what's going on here?? Setting a property inside Dog, but Dog isn't an object, it's a function! 
    bark() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    }
  };

  Object.setPrototypeOf(this, Dog.myPrototype); // this is really interesting! We are creating the property after "invoking" it?
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}


let maxi = new Dog('Maxi', 'German Shepherd', 32);
maxi.bark();

console.log(maxi.hasOwnProperty('bark')); // false


