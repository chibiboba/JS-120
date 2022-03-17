let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);
/*
It logs NaN because `this` on line 4 refers to the global object.
Anywhere outside of a function, `this` is bound to the global object.
If the keyword was used inside a function, its value would depend
on how the function is invoked.
*/