# To Do

- [ ] Take note of questions that I can't solve
- [ ] My own Exercises
- [ ] Areas of Focus

- [ ] Cheet Sheet

- [ ] Quizzes?

- [ ] Rest of exam 1?

# Areas of Focus

##### Global object 

# this

##### Definition

##### Implications

##### Value of `this` / execution context rules

# `Function` Prototype methods and context

- The JS120 “*Functions and Execution Context*” lesson covers the `Function` prototype methods of `call`, `bind`, and `apply`. These methods can be used to set the context of a function. Just like with `Object` methods, I found it helpful to reproduce their behavior with my own functions in order to fully understand how they work.
- In practice, you use the `call`, `apply`, and `bind` methods to set an explicit execution context. You can also set the execution context explicitly with functions that accept an argument that specifies the context for a callback function. For instance, `Array.prototype.forEach` (and several other `Array.prototype` methods) take a `thisArg` argument that lets you set the context for the callback explicitly.

##### `call`

##### `apply`

##### `bind`

##### Advantage and disadvantage of `bind`

# Difference between Implicit and Explicit execution context

# Understanding context loss

- “What are the ways that context can be lost, and how can context loss be prevented in these situations?”
- A complete response needs to clearly indicate the differences between “Implicit” and “Explicit” execution context.

# Object creation patterns

- The assessment requires detailed knowledge of all of these object creation patterns, including how to implement them and their nuances.
- Needless to say, being able to demonstrate this knowledge with examples on the fly requires a lot of practice.
- A good way to practice is to start from scratch and try to produce a functionally identical hierarchy of objects using each different object creation pattern. This practice is most effective if the hierarchy includes features such as inheritance, mix-ins, and polymorphism in order to illustrate how to implement these aspects in the different patterns.
- Lacking any and all creativity, I usually practiced with something like creating a hierarchy of vehicles using Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. 

# Concepts for Object Creation Patterns

#### Inheritance

- Definition

- Why inheritance

##### Prototypal inheritance

##### pseudo-classical inheritance

#### Mix-Ins: 

- Definition
- When to use mix-ins
- Why mixins
- Syntax

#### Mix-ins vs Inheritance

We suggest a balance of mix-in and classical inheritance pattern: 

1. Inheritance works best when there is an "**is a**" relationship between two classes.
2. Mix-ins work best in a "**has - a** " relationship

#### Polymorphism

- Definition
- Two ways to implement polymorphism

# Hierarchy of objects template

To make things easier, let's agree that humans are not a type of animal. In my heirarchy of objects, humans are not a subtype of animals.

- animals
  - property: name
  - method: `makeNoise()` : 'growls'
- cat --> (inheritance)
  - property: name
  - method: `makeNoise()`: 'meows' (polymorphism through **inheritance**: overriding a method inherited from a superclass.)
- human
  - property: name
  - method: `makeNoise()`: 'talks' (polymorphism through **duck-typing**: objects of different unrelated types use the same method name to perform different but related functions.)
- mix-in object.
  - `house()`: cats and humans live indoors. 'has - a ' relationship vs 'is - a' relationship. Cats and humans both have this capability, but are not related to each other. 

# Factory Functions

- Definition
- Why factory functions & advantages
- Disadvantage of object factory
- Inheritance with factory functions

Hierarchy of objects practice

##### Test code

```js
let animal = animals('bobo');
animal.makeNoise(); // bobo growls

let cat = cats('fluffy');
cat.makeNoise(); //fluffy meows
cat.house(); //fluffy lives indoors.

let human = humans('sara'); 
human.makeNoise(); //sara talks
human.house(); //sara lives indoors
```

##### Completed Code

```js
let mixIn = {
  house() {
    console.log(`${this.name} lives indoors`);
  }
};

function animals (name) {
  return {
    name: name,
    makeNoise() {
      console.log(`${this.name} growls`);
    },
  };
}

function cats (name) {
  let obj = {}; // obj is the instance object of cats factory function
  let animal = animals(name);
  Object.assign(obj, animal, mixIn);
  obj.makeNoise = function () { // polymorphism through inheritance
    console.log(`${this.name} meows`);
  }
  return obj;
}

function humans (name) {
  let obj = { // obj is the instance object of humans factory function
    name: name,
    makeNoise() { // polymorphism through ducktyping
      console.log(`${this.name} talks`);
    },
  };
  Object.assign(obj, mixIn);
  return obj;
}

let animal = animals('Bobo');
animal.makeNoise(); // Bobo growls

let cat = cats('Fluffy');
cat.makeNoise(); //Fluffy meows
cat.house(); //Fluffy lives indoors

let human = humans('Sara'); 
human.makeNoise(); //Sara talks
human.house(); //Sara lives indoors
```

# Objects Linking Other Objects

[reference](https://launchschool.com/lessons/d5964d17/assignments/3db48c51)

##### How it works:

##### **Advantage of OLOO over Factory Function**

##### **Inheritance (subtyping) with OLOO**

- OLOO uses prototypal inheritance in two ways. It uses prototypal inheritance to create new objects, and it also uses prototypal inheritance to make a prototype object inherit from another prototype object. The latter is called subtyping. 

- Syntax: 

  - Chaining subtypes requires different `init` method names to prevent infinite looping. 

  ```
  let superType = {
    initialize(property) {
      this.property = property;
      return this;
    }
  };
  
  let subType = Object.create(superType);
  
  subType.init = function(property) {
    return this.initialize(property); // think of this as super, we are calling on parent initializer method
    // use different initializer method names to prevent infinite loop here
  };
  
  // creating a subType object
  // code essentially does what super() does in class syntax
  let subTypeObj = Object.create(SubType).init(property);
  ```

##### Notes

- Test Code

```js
let animal = Object.create(animals).init('Bobo');
animal.makeNoise(); // Bobo growls

let cat = Object.create(cats).initialize('Fluffy');
cat.makeNoise(); // Fluffy meows
cat.house(); // Fluffy lives indoors

let human = Object.create(humans).init('Sara');
human.makeNoise(); // Sara talks
human.house(); // Sara lives indors
```

##### Completed Code

```js
let animals = {
  makeNoise() {
    console.log(`${this.name} growls`);
  },

  init(name) {
    this.name = name;
    return this;
  },
};

let animal = Object.create(animals).init('Bobo');
animal.makeNoise(); // Bobo growls

let mixIn = {
  house() {
    console.log(`${this.name} lives indoors`);
  }
};

let cats = Object.create(animals);
Object.assign(cats, mixIn);

cats.initialize = function(name) { 
  return this.init(name); 
}

cats.makeNoise = function () {
  console.log(`${this.name} meows`);
}

let cat = Object.create(cats).init('Fluffy');
cat.makeNoise(); // Fluffy meows
cat.house(); // Fluffy lives indoors

let humans = {
  makeNoise() {
    console.log(`${this.name} talks`);
  }, 

  init(name) {
    this.name = name;
    return this;
  }
};

Object.assign(humans, mixIn);

let human = Object.create(humans).init('Sara');
human.makeNoise(); // Sara talks
human.house(); // Sara lives indoors
```

Completed Code moving test code to bottom

```js
let animals = {
  makeNoise() {
    console.log(`${this.name} growls`);
  },

  init(name) {
    this.name = name;
    return this;
  },
};

let mixIn = {
  house() {
    console.log(`${this.name} lives indoors`);
  }
};

let cats = Object.create(animals);
Object.assign(cats, mixIn);

cats.initialize = function(name) { 
  return this.init(name); 
}

cats.makeNoise = function () {
  console.log(`${this.name} meows`);
}

let humans = {
  makeNoise() {
    console.log(`${this.name} talks`);
  }, 

  init(name) {
    this.name = name;
    return this;
  }
};

Object.assign(humans, mixIn);

let animal = Object.create(animals).init('Bobo');
animal.makeNoise(); // Bobo growls

let cat = Object.create(cats).init('Fluffy');
cat.makeNoise(); // Fluffy meows
cat.house(); // Fluffy lives indoors

let human = Object.create(humans).init('Sara');
human.makeNoise(); // Sara talks
human.house(); // Sara lives indoors
```

# Constructor Functions

#### Constructors: 

- Definition:
- constructor vs ordinary functions

- Return value of a constructor

##### `new` keyword

- Summary of what `new` does

- What `new` does. 

- What `new` doesn't do.

  

##### Advantage of constructor 

##### Other notes about constructor

- Calling a constructor without `new`

- Creating a Constructor function that you can use with or without `new` operator

  ```js
  
  ```

- Who can be a constructor

- Who can't be a constructor

##### `Constructor` property 

- Definition:

- Syntax

  ```
  
  ```

- What can you do with the `constructor` property

##### Properties & operators

- `constructor.name` 

- The **`typeof`** operator

- `instanceof`  

  - Definition:

  ```
  Object instanceof Constructor
  ```

##### Constructor's `prototype` property

##### Terminology confusion:

- **An object's prototype**: 
- Why it's confusing

#### Object creation with constructors: constructor/ prototype pattern

- Example 1

  ```
  function Rectangle(length, width) {
    this.length = length; // instance properties
    this.width = width;
  }
  
  Rectangle.prototype.getArea = function() { // instance method
    return this.length * this.width;
  };
  
  Rectangle.prototype.value = 2; // instance property
  
  let rect = new Rectangle();
  console.log(rect.getArea());
  
  // notice that adding method to constructor.prototype is outside the constructor function
  
  // notice we are using instance object to invoke the method
  ```

#### Inheritance with constructors: pseudo-classical inheritance

##### Test code

```js
// test code to instantiate new objects
let animal = new Animals('Bobo');
animal.makeNoise(); // Bobo growls

let cat = new Cats('Fluffy');
console.log(cat.constructor.name); // Cats
cat.makeNoise(); // Fluffy meows.
cat.house();  // Fluffy lives indoors

let human = new Humans('Sara');
human.makeNoise(); // Sara talks
human.house(); // Sara lives indoors
```

##### Completed Code

```js
function Animals(name) {
  this.name = name;
}

Animals.prototype.makeNoise = function () {
  console.log(`${this.name} growls.`);
}

let mixIn = {
  house() {
    console.log(`${this.name} lives indoors.`);
  }
};

function Cats(name) { // constructor reuse
  Animals.call(this, name);
}

Cats.prototype = Object.create(Animals.prototype); // pseudo-classical inheritance
Cats.prototype.constructor = Cats; // retstoring constructor property
Object.assign(Cats.prototype, mixIn);

// polymorphism through inheritance
Cats.prototype.makeNoise = function() {
  console.log(`${this.name} meows.`);
}

function Humans(name) {
  this.name = name;
}

Object.assign(Humans.prototype, mixIn);
Humans.prototype.makeNoise = function () { // polymorpshim through duck-typing
  console.log(`${this.name} talks.`);
}

// test code
let animal = new Animals('Bobo');
animal.makeNoise(); // Bobo growls.

let cat = new Cats('Fluffy');
console.log(cat.constructor.name); // Cats
cat.makeNoise(); // Fluffy meows.
cat.house();  // Fluffy lives indoors.

let human = new Humans('Sara');
human.makeNoise(); // Sara talks.
human.house(); // Sara lives indoors.
```



# ES6 Classes

#### Definition

- Why classes? 

#### Precision of Language

- Example

```js
class Dog {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Woof! My name is ${this.name}.`)
  }
}
```

#### Syntax & Rules

- Naming convention
- Classes are **first- class citizens**

##### Class vs constructor/prototype

- Similarities between class and constructor/prototype pattern
- Differences between class and constructor/prototype pattern

##### Difference between function and class

- **hoisting**: 

#### How to define a class

- Class Declarations

- Class Expressions

#### Instance and Static Properties on Class

- **Instance properties**:

  ```js
  class Rectangle {
    constructor(length, width) {
    	this.length = length; // instance properties
    	this.width = width;
    }
    
    getArea() { // instance method, compact method syntax
       return this.length * this.width;
    }
    
    getArea2 = function() {
      // not using compact method syntax also works
    }
    
    value = 2; // invalid code, instance properties must be defined in methods.
  }
  
  let rect = new Rectangle();
  console.log(rect.getArea());
  ```

- **Static properties** 

  ```js
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
  
  	static getArea() {
      return 'A rectangle is a shape with 4 sides'; // static method
    }
    
    static DESCRIPTION = 'A rectangle is a shape with 4 sides'; // static property 
  }
  
  let rect = new Rectangle();
  console.log(Rectangle.getArea());
  ```

#### Inheritance with Classes / Subtyping with Classes

- Definition & syntax

##### `Super`

- You don't need to use `super` in every subclass `constructor`, but in most cases you do. 
- When does `super` need to called in subclass `constructor` method?

**Don't want method overriding**

- To prevent **method overriding**, `super` keyword can also be used to call functions on the parent object, so we can use some functionality form parent class in the subtype class. 

##### Inheritance with class declaration

```js
class Rectangle {
  constructor(length, width) {
    this.length = length; // instance properties must be defined in class methods
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }

  toString() {
    return `[Rectangle ${this.width * this.length}]`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  toString() {
    return `[Square] ${this.width * this.length}`;
  }
}
```

##### Inheritance With Class Expressions

```js
let Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    console.log(`My name is ${this.name}.`);
  }
};

let Student = class extends Person {
  constructor(name, age, semester) {
    super(name, age);
    this.semester = semester;
  }

  enrollInCourse(courseNumber) {
    console.log(`${this.name} has enrolled in course ${courseNumber}.`);
  }
};

let student = new Student('Kim', 22, 'Fall');
student.sayName(); // logs 'My name is Kim.'
student.enrollInCourse('JS120'); // logs 'Kim has enrolled in course JS120.'
```

In this example, the `Student` class inherits from the `Person` class. That gives student objects access to methods of the `Person` class and extends person objects further by adding a `semester` property and an `enrollInCourse` method. Notice that we've reused `Person`'s constructor inside the `Student` constructor, and calling `super` with `name` and `age` since the `Student` constructor expects those arguments. We also assign the `semester` argument to the `semester` property after `super` returns.

Note that this most recent example uses class expressions instead of class declarations.

##### Test code

```js
// test code to instantiate new objects
let animal = new Animals('Bobo');
animal.makeNoise(); // Bobo growls

let cat = new Cats('Fluffy');
console.log(cat.constructor.name); // Cats
cat.makeNoise(); // Fluffy meows.
cat.house();  // Fluffy lives indoors

let human = new Humans('Sara');
human.makeNoise(); // Sara talks
human.house(); // Sara lives indoors
```

##### Completed Code

```js
let mixIn = {
  house() {
    console.log(`${this.name} lives indoors.`);
  }
};

class Animals {
  constructor(name) {
    this.name = name;
  }

  makeNoise () {
  console.log(`${this.name} growls.`);
  }
}


class Cats extends Animals { // class inheritance
  constructor(name) {
    super(name);
  }

  // polymorphism through inheritance, through method overriding
  makeNoise() {
    console.log(`${this.name} meows.`);
  }
}

Object.assign(Cats.prototype, mixIn);

class Humans {
  constructor(name) {
    this.name = name;
  }

  makeNoise() {
    console.log(`${this.name} talks.`); // polymorpshim through duck-typing
  }
}

Object.assign(Humans.prototype, mixIn);

let animal = new Animals('Bobo');
animal.makeNoise(); // Bobo growls.

let cat = new Cats('Fluffy');
cat.makeNoise(); // Fluffy meows.
cat.house();  // Fluffy lives indoors.

let human = new Humans('Sara');
human.makeNoise(); // Sara talks.
human.house(); // Sara lives indoors.
```

# Applying knowledge in unusual ways

All that said, one thing that can help is to keep a running list of anything that seems unusual while going through the course materials

- Use an object method to create and store a collaborator object— and then be able to reference that created object ([see this exercise](https://launchschool.com/exercises/4a1f0eb3))
  - the `addStudent` method in `school` function creates a collaborator object and returns it.
- Pass a class as an argument and return a new object from a function. 

##### Unusual things about the `new` keyword

- Who can be a constructor

- Who can't be a constructor

##### Unusual things about arrow functions

- Don't use arrow functions as methods on an object, else it will take global object (even in strict mode) as the surrounding context. 
- `forEach` is not considered the enclosing function for arrow functions, why?
- Arrow functions cannot be called with `new` since they lose their surrounding context as the value of `this`. 

# Questions

- Practice problems Factory functions # 4

- Constructor property can be used to create new objects 

  ```
  let rex = new Terrier();
  let spot = new rex.constructor(); // is invocation syntax necessary? 
  ```

# Their prompts

[reference](https://medium.com/launch-school/my-study-tips-for-the-js129-assessment-646b7f652c9f)

##### Q: See if an Object came from a constructor.

```
// Example constructors
function Car(color, year) {
  this.color = color;
  this.year = year; 
}
function Dog(name) {
  this.name = name;
}

// Objects to test with
let myCar = new Car('blue', 2020);
let myDog = new Dog('Fido');

// Possible solutions

// Using 'instanceof' operator
console.log(myCar instanceof Car); // logs true
console.log(myDog instanceof Car); // logs false

// Using 'isPrototypeOf' method
console.log(Car.prototype.isPrototypeOf(myCar)); // logs true
console.log(Car.prototype.isPrototypeOf(myDog)); // logs false

// Compare the constructor property of the created object to the constructor function
console.log(myCar.constructor === Car); // logs true
console.log(myDog.constructor === Dog); // logs true
console.log(myDog.constructor === Car); // logs false
```

- This example illustrates that there are several ways to complete the task and provides code examples of how they work. That’s enough to get to the conscious competence level, but it still might be difficult to completely explain what is going on.
- The next step is to think about *how* the code does what it does, with the goal of understanding well enough to teach it. A good way to develop that understanding is to create functions to duplicate the behavior provided by built-in abstractions like `isPrototypeOf` and `instanceof`
- For example, here’s what I came up with for `instanceof`. This function iterates through the prototype chain of `obj`, comparing each prototype to the `prototype` property of `constructorFunction`. It returns true if any of them match and false if no match is found:

```js
function isInstanceOf(obj, constructorFunction) {
  while (obj) {
    obj = Object.getPrototypeOf(obj);
    if (obj === constructorFunction.prototype) return true;
  }

  return false;
```

##### Q: See if an Object came from a constructor (practice)

##### Q: See if an Object came from a constructor --> create your own `instanceof`

##### Q: See if an object is in the prototype chain of another object --> create your own `isPrototypeOf`

##### Q: See if an object contains a property as one of its own -> create your own `hasOwnProperty`

##### Q: Return all the property names of an object -> create your own `Object.getOwnPropertyNames`

##### Q: Copy all properties from one object to another -> create your own `Object.assign`

# Problems about prototypes

##### Q: Searching prototype chain

(from practice problems: lesson 2)

Write a function that searches the prototype chain of an object for a given property and assigns it a new value. If the property does not exist in any of the prototype objects, the function should do nothing. The following code should work as shown:

```
let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
function assignProperty(obj, property, value) {
  while (obj !== null) { // loops until obj reaches the null prototype
    if (obj.hasOwnProperty(property)) { 
      obj[property] = value; // make sure to use bracket notation instead of dot notation. 
      break; // don't need this, loop ends with object is not null.
    }

    obj = Object.getPrototypeOf(obj); // // if property is not "own property", then search next prototype. 
  }
}
```

##### Q: Return prototype chain of an object

(from exercise sets: Object creation patterns) [reference](https://launchschool.com/exercises/7f3cd322)

Implement an `ancestors` method that returns the prototype chain (ancestors) of a calling object as an array of object names. Here's an example output:

```
// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']
```

Solution

```
// my solution: iterative
Object.prototype.ancestors = function() {
  let obj = this;
  let ancestors = [];

  while (Object.getPrototypeOf(obj)) {
    let ancestor = Object.getPrototypeOf(obj);
    if ('name' in ancestor) {
      ancestors.push(ancestor.name);
    } else {
      ancestors.push('Object.prototype');
    }
    obj = ancestor;
  }
  console.log(ancestors);
};
```

##### **Q: How do you create an object that doesn't have a prototype?** 

```
let bareObj = Object.create(null);
```

##### Q: What is a bare object?

Object without a prototype. (Object created with a `null` prototype.)

##### **Q: How can you determine whether an object has a prototype?**

```
if (Object.getPrototypeOf(obj)) {
  // obj has a prototype
} else {
  // obj does not have a prototype
}
```

##### **Q: What value does `Object.getPrototypeOf({})` return?**

The default prototype object.

##### Q: What does this code mean?

```js
if (Object.getPrototypeOf(obj) && obj.isPrototypeOf(car)) {
  // obj has a non-null prototype AND
  // obj is in the prototype chain of car
}
```



# My Prompts

##### Q: What is the prototype chain?

##### Q: What is overriding?

##### Q: Ways to check whether a property exists in an object?

##### Q: Explain the difference between the constructor's prototype object and an object's prototype.

- Why it's confusing

##### Q: Determining an Object's type

##### Q: Write a constructor function that you can use with or without the `new` operator. 

Since a constructor is just a function, you can call it without the `new` operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the `new` operator. The function should return the same result with either form. Use the code below to check your solution:

```js
function User(first, last) {
  // ...
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe
```

Solution

##### Q: What does this code log, and why does it log what it does?

```
let obj = {
  foo() {
    return this;
  }
};

let foo = obj.foo;
console.log(foo());
```

##### Q: Create your own `Array.from` ?

Answer: 

- Definition: `Array.from` Takes an array-like object as argument and returns a new array with the equivalent element values.

- Syntax

  ```
  > Array.from({0: 'a', 1: 'b', 2: 'c', length: 3})
  ['a', 'b', 'c']
  
  > Array.from(‘string’)
  [‘s’, ‘t’, ‘r’, ‘i’, ‘n’, ‘g’]
  ```

##### Q: string primitive vs `String`object

##### Q: how can we call object or array methods on string primitives?

##### Q: Log the name of constructor to which the code belongs to. What "type" is this code?

```js
console.log("Hello");
console.log([1,2,3]);
console.log({name: 'Srdjan'});
```

Expected Output

```js
String
Array
Object
```



##### Q: What is the advantage and disadvantage of `bind`?

# My Own Exercises

##### Maybe redo

- JS 120 exercises easy # 11 https://launchschool.com/exercises/2b521c67
- 



##### Q: Rewrite these two classes to use constructor/prototype pattern. 

##### Q: 

Without calling the `Cat` constructor, create an object that looks and acts like a `Cat` instance that doesn't have a defined name.

```js
class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = // your implementation
console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.
class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype) // your implementation
console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.
```