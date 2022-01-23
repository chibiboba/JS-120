let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName() {
    return this.firstName + this.lastName; // inside a method, so context is person which is what the method is in
  },
};

console.log(person.fullName); // Rick Sanchez