class Pet {
  constructor(petType, petName) {
    this.type = petType;
    this.name = petName;
  }
}

class Owner {
  constructor(ownerName) {
    this.name = ownerName;
    this.petsOwned = [];
  }

  numberOfPets() {
    return this.petsOwned.length;
  }

  addPet(pet) {
    this.petsOwned.push(pet);
  }

  printPets() {
    this.petsOwned.forEach(pet => {
      console.log(`a ${pet.type} named ${pet.name}`);
    });
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding = new Pet('cat', 'Pudding');
let darwin = new Pet('bearded dragon', 'Darwin');
let kennedy = new Pet('dog', 'Kennedy');
let sweetie = new Pet('parakeet', 'Sweetie Pie');
let molly = new Pet('dog', 'Molly');
let chester = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');


class Shelter {
  constructor() {
    this.memberList = {};
  }

  adopt(petOwner, pet) {
    petOwner.addPet(pet);
    if (!this.memberList[petOwner.name]) { // careful with object keys - it's a string, not an object
      this.memberList[petOwner.name] = petOwner;
    }
  }

  printAdoptions() {
    for (let owner in this.memberList) { // careful with object keys, its a string
      console.log(`${owner} has adopted the following pets:`);
      this.memberList[owner].printPets(); // get the property value using bracket notation
      console.log();
    }
  }
}

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.