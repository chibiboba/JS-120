function Person (firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.eat = function() {
  console.log('Eating');
};

Person.prototype.communicate = function() {
  console.log('Communicating');
};

Person.prototype.sleep = function() {
  console.log('Sleeping');
};

function Doctor (firstName, lastName, age, gender, specialty) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialty = specialty;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function() {
  console.log(`Diagnosing`);
};


function Professor (firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

Professor.prototype = Object.create(Person.prototype);
Professor.prototype.constructor = Professor;

Professor.prototype.subject = function() {
  console.log(`Teaches ${this.subject}`);
};

Professor.prototype.teach = function() {
  console.log(`Teaching`);
};


function Student(firstName, lastName, age, gender, undergradSubject) {
  Person.call(this, firstName, lastName, age, gender);
  this.undergradSubject = undergradSubject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log(`Studying`);
};


// eslint-disable-next-line max-len
function GraduateStudent(firstName, lastName, age, gender, undergradSubject, gradSubject) {
  Student.call(this, firstName, lastName, age, gender, undergradSubject);
  this.gradSubject = gradSubject;
}
GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function() {
  console.log(`Researching`);
};

let person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

let doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

let graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'