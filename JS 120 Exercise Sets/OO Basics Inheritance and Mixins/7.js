class Truck { }

class Car { }

let towMixin = {
  tow () {
    return `I can tow a trailer!`;
  }
};

Object.assign(Truck.prototype, towMixin);
let truck = new Truck();
truck.tow();