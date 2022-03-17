class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`;

  }
}
class Car extends Vehicle {
  constructor(make, model) {
    super(make, model);
  }

  getWheels() {
    return 4;
  }

}

let stacy = new Car('hi', 'hello');
console.log(stacy.info());

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model);
  }

  getWheels() {
    return 2;
  }

}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}
