## Note For CoderPad

CoderPad runs JavaScript code in *strict mode*, which we discuss in depth in the next course. While you don't need to be familiar with all facets of strict mode, there is one aspect that may arise during this assessment: the implicit execution context is `undefined`, **not** the global object. That means that the value of `this` may be `undefined` at times. For instance:

```js
function foo() {
  console.log(this);
}

foo(); // undefined
```

Be prepared for this change before the interview. If you wish to practice on your own system instead of on CoderPad, add `"use strict";` to the top of your JavaScript code:

```js
"use strict"; // the quotes are required

function foo() {
  console.log(this);
}

foo(); // undefined
```

------

## Areas of Focus

- General knowledge of OOP concepts as they pertain to JavaScript.
- Conventional techniques for constructing objects, including the use of prototypal inheritance.
- The ability to come up with code examples to illustrate concepts. Be prepared! Know what examples you want to use.
- The ability to integrate what you've learned and put it to work to understand unusual situations.
- An ability to speak clearly and with precision.

## Problems

- Prompt: See if an Object came from a constructor.

```js
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
  }
  ```

- For example, the JS120 exercise called “*Ancestors*” involves developing a method to return the prototype chain of an object. Similarly, there’s a question in the lesson material that requires searching a prototype chain for a property and returning the object that owns it. 

Additional Examples

- See if an object contains a property as one of its own -> create your own `hasOwnProperty`

- Return all the property names of an object -> create your own `Object.getOwnPropertyNames`

- Copy all properties from one object to another -> create your own `Object.assign`

  

1. this
   - Any time `this` occurs outside of a function definition, its value is obvious. The majority of the time, `this` will be used as part of a function definition. In these cases, what `this` refers to depends entirely on how the function is invoked.
2. Understanding context loss
   - “What are the ways that context can be lost, and how can context loss be prevented in these situations?”
   -  A complete response needs to clearly indicate the differences between “Implicit” and “Explicit” execution context.
3. `Function` Prototype methods and context
   - The JS120 “*Functions and Execution Context*” lesson covers the `Function` prototype methods of `call`, `bind`, and `apply`. These methods can be used to set the context of a function. Just like with `Object` methods, I found it helpful to reproduce their behavior with my own functions in order to fully understand how they work.
4. Object creation patterns
   - The assessment requires detailed knowledge of all of these object creation patterns, including how to implement them and their nuances.
   - Needless to say, being able to demonstrate this knowledge with examples on the fly requires a lot of practice.
   - A good way to practice is to start from scratch and try to produce a functionally identical hierarchy of objects using each different object creation pattern. This practice is most effective if the hierarchy includes features such as inheritance, mix-ins, and polymorphism in order to illustrate how to implement these aspects in the different patterns.
   - Lacking any and all creativity, I usually practiced with something like creating a hierarchy of vehicles using Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. 
5. Applying knowledge in unusual ways
   - All that said, one thing that can help is to keep a running list of anything that seems unusual while going through the course materials
     - Use an object method to create and store a collaborator object— and then be able to reference that created object ([see this exercise](https://launchschool.com/exercises/4a1f0eb3))
     - Unusual things about the `new` keyword
     - Unusual things about arrow functions
     - Pass a class as an argument and return a new object from a function