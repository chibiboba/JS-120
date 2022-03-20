/* eslint-disable max-len */
let Person =  {
  initialize(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    return this;
  },

  fullName: function() {
    return `${this.firstName} ${this.lastName}`;
  },

  eat: function() {
    console.log('Eating');
  },

  communicate: function() {
    console.log('Communicating');
  },

  sleep: function() {
    console.log('Sleeping');
  },

};


let Doctor = Object.create(Person);
Doctor.init = function(firstName, lastName, age, gender, specialty) {
  let copyOfParent = this.initialize(firstName, lastName, age, gender);
  this.specialty = specialty;
  let newObj = Object.assign(copyOfParent, this);
  return newObj;
};

Doctor.diagnose = function () {
  console.log(`Diagnosing`);
};

let Student = Object.create(Person);
Student.init = function(firstName, lastName, age, gender, undergradSubject) {
  let copyofParent = this.initialize(this, firstName, lastName, age, gender);
  this.undergradSubject = undergradSubject;
  let newObj = Object.assign(copyofParent, this);
  return newObj;
};


Student.study = function () {
  console.log(`Studying`);
};


let GraduateStudent = Object.create(Student);
GraduateStudent.init2 = function (firstName, lastName, age, gender, undergradSubject, gradSubject) {
  let copyOfStudent = this.init(firstName, lastName, age, gender, undergradSubject);
  this.gradSubject = gradSubject;
  let newObj = Object.assign(copyOfStudent, this);
  return newObj;
};

GraduateStudent.research = function () {
  console.log(`Researching`);
};

let person = Person.initialize('foo', 'bar', 21, 'gender');
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

let doctor = Doctor.init('foo', 'bar', 21, 'gender', 'Pediatrics');

doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

let graduateStudent = GraduateStudent.init2('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements

graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'