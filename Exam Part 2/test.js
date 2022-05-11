let superType = {
  initialize(property1) {
    this.property1 = property1;
    return this;
  }
};

let subType = Object.create(superType);

subType.init = function (property1, property2) {
  let copyOfSuperType = this.initialize(property1);
  this.property2 = property2;
  Object.assign(this, copyOfSuperType);
  return this;
};

// creating a subType object
// code essentially does what super() does in class syntax
let subTypeObj = Object.create(subType).init('hi', 'hello');
console.log(subTypeObj);
