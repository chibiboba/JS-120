class Pet {
  constructor(type, nickname) {
    this.type = type;
    this.nickname = nickname;
  }
}

class Owner {
  constructor (name) {
    this.name = name;
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
  }
  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor () {
    this.adoptions = {}; // {owner: [{pet}, {pet}], owner: [{pet}, {pet}]}
  }

  adopt(owner, pet) {
    owner.addPet(pet);
    this.adoptions[owner.name] = owner.pets;
  }

  printAdoptions() {
    for (let ownerName in this.adoptions) {
      let pets = this.adoptions[ownerName];
      console.log(`${ownerName} has adopted the following pets`);
      pets.forEach(pet => {
        console.log(`a ${pet.type} named ${pet.nickname}`);
      });
      console.log();
    }
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