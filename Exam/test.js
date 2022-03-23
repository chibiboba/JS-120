
// ~/'My Documents'/'Launch School'/'JS 120'/'Exam'

/* eslint-disable max-len */
class Character {
  static max = 12;
  static min = 2;

  constructor() {
    this.health = 100;
    this.strength = this.rollDice();
    this.intelligence = this.rollDice();
  }

  rollDice() {
    return Math.floor(Math.random() * (Character.max - Character.min + 1)) + Character.min;
  }

  heal(change) {
    this.health += change;
  }

  hurt(change) {
    this.health -= change;
  }
}

let armor = {
  attachArmor() {

  },

  removeArmor() {

  }
};

let spell = {
  castSpell(theSpell) {

  }
};

class Warrior extends Character {
  constructor() {
    super();
    this.strength += 2;
  }
}
Object.assign(Warrior.prototype, armor);

class Paladin extends Character {
  constructor() {
    super();
  }
}
Object.assign(Paladin.prototype, armor, spell);

class Magician extends Character {
  constructor() {
    super();
    this.intelligence += 2;
  }
}
Object.assign(Magician.prototype, spell);

class Bard extends Magician {
  constructor() {
    super();
  }

  createPotion() {

  }
}

// let bard = new Bard();
// console.log(bard.health);
// console.log(bard.intelligence);

// let magician = new Magician();
// console.log(magician.health);
// console.log(magician.strength);
// console.log(magician.intelligence);
// console.log('castSpell' in magician);


let paladin = new Paladin();
console.log(paladin.health);
console.log(`attachArmor` in paladin);
console.log(`removeArmor` in paladin);

let warrior = new Warrior();
console.log(`removeArmor` in warrior);
console.log(`attachArmor` in warrior);
console.log(warrior.health);
console.log(warrior.strength);
console.log(warrior.intelligence);
warrior.heal(1);
console.log(warrior.health);
warrior.hurt(1);
console.log(warrior.health);