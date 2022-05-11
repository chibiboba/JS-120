# Lesson 1

Template

------

Prompt: 

Answer: 

------

Prompt: What is OOP?

Answer: 

- OOP is an program paradigm where we think about problems in terms of objects, by using objects to organize a program.
- The idea is to model a program based on how objects in the real world interact. A real world object has **state** and **behavior**. State is properties related to the object, and Behavior is what that object can do in a verb sense.  
- The way we think about a program changes from a *series of steps* to a *collection of objects* that interact with each other.
- Choosing an approach for an OO problem always comes down to making tradeoffs.

------

Prompt: What are the advantages and disadvantages of OOP? 

Answer: 

One of the most challenging aspect of software engineering is organizing code that is easy for programmers to understand, and easy to maintain. Large, complex procedural programs end up with functions all throughout the code split up from the data that they operate on. 

Advantages

- OOP reduces dependencies and makes maintenance of code easier.
- Using OOP to model objects and using real-world nouns to represent objects lets programmers think about a problem at a higher-level of abstraction, which helps them breakdown and solve problems. 
- OOP makes code flexible, easy to understand, and easy to change.

Disadvantages: 

- OOP programs are often much larger than the equivalent procedural program. 
- OOP may lead to less efficient code: OOP programs may require more memory, disk space, and computing power.

Example: 

```js
// procedural programs end up with functions throughout code, split up from the data they operate on.
function game{}

function state{}

```

```js
// OOP
class createState {}

class Game {
  constructor() {
    let stateObj = new createState();
  }
  
  behavior() {},
}
game.behavior(); // game.start();
```

------

Prompt: What is **encapsulation**?

Answer: 

- Encapsulation is the idea of bundling data (state) and operations related to that data (behavior ) into a cohesive unit, single entity called an object. 
- It is grouping related properties and methods in a single object.

```js
let cat = {
  name: 'fluffy',
  nap() {
    console.log('is napping');
  }
}
```

------

Prompt: How does encapsulation in JavaScript differ from encapsulation in most OO languages?

Answer: 

- In other languages, encapsulation also refers to the idea of restricting access to state and behavior. 
- In other words, hiding details of an object from code that uses the object. An object should only expose the properties and methods that other objects need, to use the encapsulated object. 
-  JavaScript objects don't support this type of encapsulation. They are ways to achieve a degree of access restriction, but it's not perfect.

------

Prompt: What is a **collaborator object**?

Answer: 

- A collaborator object is an object that helps provide state in another object.
- Two objects have a collaborator relationship if one of them is part of the state of the other. 

```js
let cat = {
  name: 'Fluffy', 
  play() {
    console.log(`Reach for the sky!`);
  },
};

let dog = {};

let pets = {
  animals: [],
};

pets.animals.push(cat, dog); // Note: cat and dog are added as elements into pets.animals


// cat and dog are collaborator objects of the pets object. That means they help provide state in the `animals` property of `pets`.

// Note: cat and dog must be defined before they are used in pets.
```

------

Prompt: What is **compact method syntax**?

Answer: 

It is a short hand syntax to use methods in objects.

```js
let obj = {
  prop() {
    
  },
  prop: function () {
    
  },
};
```



------

Prompt: What is `this`? 

Answer: `this` is  a keyword that refers to an object that is the current execution context of a function or method that is running. 

------

Prompt: What are methods?

Answer: Methods are object properties with function values.

```js
let obj = {
  prop () { 
    
  }
};
```



------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------

# Lesson 2

Prompt: What are 3 ways to define a function?

Answer: 

1. function declaration

   ```js
   function functionName() 
   ```

   - function declarations start with keyword `function` at beginning of statement
   - function declaration binds a function to an **identifier** to declare the existence of the function. 
   - Function declarations can't be anonymous. 
   - Function declarations are **hoisted**: can be called before the function is defined. 

2. function expression

   - Function expressions are not hoisted, they cannot be called before they are defined. 
   - Any function definition that doesn't have the keyword `function` at the beginning of a statement is a function expression. 

   ```js
   let functionName = function () {
     
   }
   ```

   ```js
   let functionName = (parameter) => 
   ```

   

3. Arrow functions

------

Prompt: What is **hoisting**?

Answer: 

- When a function is hoisted, it can be called before that function is defined. 

```js
functionName(); // can invoke function before function is defined.   

function functionName() { // function defined here, functionName is a variable & identifier
  ...
}
```

- Hoisting refers to the process where the compiler allocates memory for variable and function declarations prior to the execution of the code. 
- JavaScript runs programs in two passes; the first pass performs hoisting and other prepatory work, and the second executes the code.
- During hoisting, the engine "effectively moves" variable and function declarations to the top of the program file in which they're defined, or the top of the function in which they are nested. 
- **Hoisting** is an internal step performed by the engine; it doesn't actually move code around. 

------

Prompt: Compare function declarations and function expressions.

Answer: 

- Functions defined with function declaration syntax can be invoked before the declaration in the program. 

- This is because function declarations are hoisted. 

```js
prompt();

function prompt{}
```

Acts like this

```js
function prompt {}

prompt()
```

- Function expressions are not **hoisted** : can't use function expressions before you define them. 

  - You can test whether a function definition is a function declaration by trying to call it before the declaration. You can't call a function expression until after the expression is evaluated. 

------

Prompt: 

Answer: 

------

# Lesson 3

# Lesson 4

# Specifics Study guide

## Prototypes

------

Prompt: 

Answer: 

------

# Main focus

## This

##### Prompt: What is `this`?

Answer: `this` is a keyword that refers to an object that is the current execution context of a function or method that is running. 

------

## Execution Context Rules

##### Prompt: What are execution context rules?

Answer: 

- The value of `this` depends on how a function or method is invoked.
- Outside of a function definition, the value of `this` is the global object. 

```js
let obj = {
  foo: this,
};
console.log(obj.foo); // global object
```

- Inside of a function, the value of `this` depends on how the function is called.

  - Method invocation takes the calling object as its implicit execution context. 

  ```JS
  let obj = {
    foo() {
      console.log(this);
    }
  };
  
  obj.foo() // obj	
  ```

  - Regular function calls use the global object as its implicit execution context. In strict mode, regular function calls use `undefined` as its implicit execution context. 

  ```js
  "use strict"; 
  
  function foo () {
    console.log(this);
  }
  
  foo(); // undefined
  ```

- Arrow functions are an exception because they inherit from surrounding context, which is the most immediate enclosing function invocation. 

  ```js
  let obj = {
    prop: function () {
      let foo = () => {
        console.log(this); // logs obj because obj is the surrounding context for the foo arrow function. 
      }
      foo();
    },
  };
  
  obj.prop();
  ```

  - However, don't use arrow functions as methods on an object, otherwise it takes the global object as the surrounding context. 

  ```js
  let obj = {
    prop : () => {
      console.log(this);
    }
  }
  
  obj.prop(); // global object.
  ```

------

##### Prompt: What makes arrow functions an exception in terms of execution context rules? 

Answer: Arrow functions inherit execution context from the surrounding context. This means that arrow fucntions are permanently bound to the enclosing function invocation. The enclosing function invocation is the most immediate function scope in which the arrow function is defined in. 

```js
let obj = {
  prop : function () {
    let foo = () => {
      console.log(this); // logs obj
    };
    foo(); 
  },
};

obj.prop();
```

This code logs `obj` because `obj` is the surrounding context of the arrow function referenced by `foo`. 

------

##### Prompt:  Why is `forEach` not considered the enclosing function for arrow functions? 

Answer: Because arrow functions are passed as arguments to `forEach` - it's not defined inside `forEach`. 

------

##### Prompt: What is the difference between implicit and explicit execution context?

Answer: 

- To be clear, the execution context is the current environment ( an object) in which a function executes. 

- **Explicit execution context** is context that you set explicitely with `call` `apply` or `bind`. 

- **Implicit execution context** is context that JavaScript sets implicitely when your code doesn't provide an explicit execution context. 

------

##### Prompt: What are different ways that JavaScript provides implicit execution context?

Answer: 

- Regular function calls use <u>global object</u> as implicit execution context. 
- Method calls use the <u>calling object</u> as its implicit execution context. 
- A constructor call with `new` uses the <u>newly created instance object</u> as its implicit execution context. 
- Arrow functions use the <u>surrounding scope</u> as implicit execution context. 
- When strict mode is enabled, the implicit execution context/ implicit `this` is assigned to `undefined` instead of the global object. 
- Outside of a function definition, the implicit execution context is the global object. 

------

##### Prompt: What are the three ways that execution context can be lost? Create example for each. 

Answer: 

- Method is copied out of an object and used elsewhere.

  - When we take a method out of an object and execute it as a function elsewhere, the function's context is no longer the original object. 

  ```js
  let obj = {
    firstName: 'John',
    lastName: 'Doe',
    greeting () {
      console.log(`My name is ${this.firstName} ${this.lastName}.`);
    },
  };
  obj.greeting() // context is obj
  
  let greetings = obj.greeting; // strips context. 
  greetings(); // context here is now undefined because we are in strict mode. 
  
  // Typeerror: cannot read properties of undefined. 
  ```

- Nested functions (inner functions) not using the surrounding context.
  ```js
  let obj = {
    firstName: 'John',
    foo() {
      function bar() {
        console.log(`${this.firstName}`);
      }
      
     	bar(); // bar is invoked as a standalone function. The execution context is undefined in strict mode, instead of the `obj` object. 
    },
  };
  
  obj.foo();
  ```

- Functions as argument losing surrounding context. 

  ```js
  function executeOnce(func) {
    func();
  }
  
  let obj = {
    value: 1, 
    foo: function () {
      executeOnce(function () {
        console.log(this.value); // this has value of undefined in strict mode
      });
    }
  };
  
  obj.foo(); // TypeError: cannot read properties of undefined
  ```
  
  

------

##### Prompt: What are the three ways that execution context can be lost, and how can execution context loss be prevented in each case? Just list them with bullets, no examples.

Answer: 

- Method is copied out of an object and used elsewhere. 
  - Hard bind the method's context using `bind`. 
  - Indeal solutions: 
    - Use `call`: problem is if you pass it to another function or don't execute function right away, the context passed to `call` may be out of scope by then. 
    - Change the original function to accept context object as second parameter, then pass context to original function when calling it. 
- Nested functions lose surrounding context.
  - Preserve context with variable in outer scope.  (`let self = this` in the outer function)
  - Call inner function with explicit context. (`call`)
  - Use `bind`
  - Use arrow function
- Functions passed as arugments loses its surrounding context. 
  - Preserve context with variable (`self` ) in outer scope.  (`let self = this` in the outer function)
  -  `bind`
  - arrow function
  - use the optional `thisArg` argument. 

------

##### Prompt: What are the three ways that execution context can be lost, and how can execution context loss be prevented in each case? Also give examples for each.  

- Method is copied out of an object and used elsewhere.

  - When we take a method out of an object and execute it as a function elsewhere, the function's context is no longer the original object. 

  ```js
  let obj = {
    firstName: 'John',
    lastName: 'Doe',
    greeting () {
      console.log(`My name is ${this.firstName} ${this.lastName}.`);
    },
  };
  obj.greeting() // context is obj
  
  let greetings = obj.greeting; // strips context. 
  greetings(); // context here is now undefined because we are in strict mode. 
  
  // Typeerror: cannot read properties of undefined. 
  ```

  Best Solution: Hard bind the method's context by using `bind`. 

  ```js
  // using bind
  let obj = {
    firstName: 'John',
    lastName: 'Doe',
    greeting () {
      console.log(`My name is ${this.firstName} ${this.lastName}.`);
    },
  };
  obj.greeting() 
  
  let greetings = obj.greeting.bind(obj); 
  greetings();  
  ```

  - Unideal solution: using `call` 
    - Is undeal because if you pass the function to another function or don't execute the function right away, the context passed to `call`,  `obj`,  may be out of scope by the time `call` is used. 

  ```js
  // using call
  let obj = {
    firstName: 'John',
    lastName: 'Doe',
    greeting () {
      console.log(`My name is ${this.firstName} ${this.lastName}.`);
    },
  };
  obj.greeting() 
  
  let greetings = obj.greeting; 
  greetings.call(obj);  
  ```

  

- Nested functions (inner functions) not using the surrounding context.

  ```js
  let obj = {
    firstName: 'John',
    foo() {
      function bar() {
        console.log(`${this.firstName}`);
      }
      
     	bar(); // bar is invoked as a standalone function. The execution context is undefined in strict mode, instead of the `obj` object. 
    },
  };
  
  obj.foo();
  ```

  Solution 1: preserve context with variable in outer scope. 

  ```js
  let obj = {
    firstName: 'John',
    foo() {
      let self = this;
      function bar() {
        console.log(`${self.firstName}`); // self refers to this, which refers to obj because foo was invoked with `obj` as its implicit execution context.
      }
      
     	bar(); // bar is invoked as a standalone function. The execution context is undefined in strict mode, instead of the `obj` object. 
    },
  };
  
  obj.foo(); // John
  ```

  

  Solution 2: Call the inner function with an explicit context with `call`

  ```js
  let obj = {
    firstName: 'John',
    foo() {
      function bar() {
        console.log(`${this.firstName}`); 
      }
     	bar.call(this); // this refers to obj, because we invoked foo as a method using obj 
    },
  };
  
  obj.foo(); // John
  ```

   

  Solution 3: use `bind`. 

  ```js
  let obj = {
    firstName: 'John',
    foo() {
      function bar() {
        console.log(`${this.firstName}`); 
      }
      
     	bar.bind(this)();
    },
  };
  
  obj.foo(); // John
  ```

  Solution 4: arrow function

  ```js
  let obj = {
    firstName: 'John',
    foo() {
      let bar = () => {
        console.log(`${this.firstName}`);
      };
      
     	bar();  
    },
  };
  
  obj.foo(); // John
  ```

- Functions as argument losing surrounding context. 

  Example 1: 

  ```js
  function executeOnce(func) { // random just invokes the function passed to it. 
  	func(); 
  }
  
  let obj = {
    a: 1,
    foo: function() {
    	executeOnce(function() {
        console.log(this.a);
      });
    },
  };
  
  obj.foo(); // TypeError: cannot read properties of undefined 
  ```

  Solution1: preserve context with variable in outer scope

  ```js
  function executeOnce(func) { // random just invokes the function passed to it. 
  	func(); 
  }
  
  let obj = {
    a: 1,
    foo: function() {
      let self = this;
    	executeOnce(function() {
        console.log(self.a);
      });
    },
  };
  
  obj.foo(); // logs 1
  ```

  Solution2: use `bind`

  ```js
  function executeOnce(func) { // random just invokes the function passed to it. 
  	func(); 
  }
  
  let obj = {
    a: 1, 
    foo: function() {
    	executeOnce(function() {
        console.log(this.a);
      }.bind(this));
    },
  };
  
  obj.foo(); // logs 1
  ```

  Solution 3 : use arrow function

  ```js
  function executeOnce(func) { // random just invokes the function passed to it. 
  	func(); 
  }
  
  let obj = {
    a: 1, 
    foo: function() {
    	executeOnce(() => {
        console.log(this.a);
      });
    },
  };
  
  obj.foo(); // logs 1
  ```

  Solution 4: use optional `thisArg` argument

  ```js
  function executeOnce(func, thisArg) { 
  	func.call(thisArg); 
  }
  
  let obj = {
    a: 1, 
    foo: function() {
    	executeOnce(function() {
        console.log(this.a);
      }, this);
    },
  };
  
  obj.foo(); // logs 1
  ```

  

  Example 2: 

  ```js
  let obj = {
    foo: function () {
      [1, 2, 3].forEach(function (num) {
  			console.log(this);
    	});
    }
  };
  
  obj.foo(); // logs undefined 3 times.
  ```

  Solution 1: Preserve context with variable in outer scope

  ```js
  let obj = {
    foo: function () {
      let self = this;
      [1, 2, 3].forEach(function (num) {
  			console.log(self);
    	});
    }
  };
  
  obj.foo(); // logs obj three times.
  ```

  

  Solution 2: Use `bind`.

  ```js
  let obj = {
    foo: function () {
      [1, 2, 3].forEach(function (num) {
  			console.log(this);
    	}.bind(this));
    }
  };
  
  obj.foo(); // logs obj three times
  ```

  Solution 3: use arrow function 

  ```js
  let obj = {
    foo: function () {
      [1, 2, 3].forEach(num => console.log(this));
    }
  };
  
  obj.foo(); // logs obj 3 times.
  ```

  Solution 4: Use optional `thisArg` 

  - Some methods that take function arguments allow an optional argument that specifies the execution context to use for the callback function. 
  - For example `Array.prototype.forEach`, `map`, `every`, `some` take this optional argument. 

  ```js
  let obj = {
    foo: function () {
      [1, 2, 3].forEach(function (num) {
  			console.log(this);
    	}, this);
    }
  };
  
  obj.foo(); // logs obj 3 times.
  ```

  

------

##### Prompt: “What are the ways that context can be lost, and how can context loss be prevented in these situations?”A complete response needs to clearly indicate the differences between “Implicit” and “Explicit” execution context.

Answer: 

------

##### Prompt: What are the 3 ways to set execution context explicitly? Give examples for each.

Answer: 

- `call` invokes a function or method with an explicit execution context, which is the first argument passed to it. 

  - More arguments can be passed to `call` which will be passed to the invoked function `random`. 

  ```js
  function random(b) {
    console.log(this.a + b);
  }
  
  let obj = {
    a: 1,
  };
  
  random.call(obj, 1); // 2
  ```

  - can also pass an array of arguments to `call` using the spread operator. 

  ```js
  function random(b) {
    console.log(this.a + b);
  }
  
  let obj = {
    a: 1,
  };
  
  let arr = [1];
  random.call(obj, ...arr); // 2
  ```

  

- `apply` also invokes a function or method with an explicit execution context, which is the first argument passed to it. It also takes an optional array of arguments, which it passes to the called function or method `random`.

  ```JS
  function random(b) {
    console.log(this.a + b);
  }
  
  let obj = {
    a: 1,
  };
  
  random.call(obj, [1]); // 2
  ```

- `bind`'s context is the original function, and it returns a new function whose execution context is permanently bound to the first argument passed to `bind`. We have to invoke the new function using the invocation syntax `()`. 

  ```js
  function random(b) {
    console.log(this.a + b);
  }
  
  let obj = {
    a: 1,
  };
  
  let func = random.bind(obj, 1); 
  func(); // 2
  ```

  - You cannot alter the execution context of the resulting function, even if you use `call`,  `apply` or call `bind` a second time. 

  ```js
  function random(b) {
    console.log(this.a + b);
  }
  
  let obj = {
    a: 1,
  };
  
  let obj2 = {
    a: 10,
  }
  
  let func = random.bind(obj, 1); 
  
  func.call(obj2, 1); // 2
  func.apply(obj2, [1]); // 2
  func.bind(obj2, 1)(); // 2
  ```

  

------

##### Prompt: What is the advantage and disadvantage of `bind`?

Answer: 

- The advantage is that a function is permanently bound to a context, so the execution context will stay the same if that method is copied out of a function, if it's passed as an argument, or if it's a nested function. The binding is permanent and does not need to be repeated if the function gets called more than once. 
- The disadvantage is that it's no longer possible to determine the context by looking at the invocation of the final function. 

```js
let func = function () {
  console.log(this.a);
};

let obj = {a: 1};

func = func.bind(obj);
func(); // 1
```

------

## Object Creation Patterns

##### Prompt: List the different object creation patterns, and the 3 features in each.

Answer:  Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. The features are inheritance, mix-ins, and polymorphism. 

------

##### Prompt: What is polymorphism?

Answer: 

- Definition: refers to the ability of objects of different types to respond in different ways to the same method invocation. 

------

##### Prompt: What is an *object type*

Answer: An object type is a specific category of objects with a specific set of methods and properties. They use the same method name and take the same number of arguments.

------

##### Prompt: What is is a mix-in?

Answer: 

------

##### Prompt: (practice) List the different object creation patterns, and the 3 features in each. And how to implement them using a hierarchy of objects.

Answer: So the four different object creation patterns are Factory functions, OLOO, constructor prototype pattern, ES6 classes. I will also demonstrate how to implement the 3 features of inheritance, mix-ins, and polymorphism in each of the object creation patterns, using a hierarchy of objects.

First, let's create a template of a hierarchy of objects. 

- animals 
  - property: name
  - method: makeNoise : 'growls'
- cats --> should inherit from animals object
  - property: name
  - method: makeNoise: meows
- humans 
  - property: name
  - method: makeNoise: talks
- mix-In
  - house: cats and humans live in house. 'has - a ' relationship vs 'is - a' relationship. Cats and humans both have this capability, but are not related to each other. 

First let's discuss factory functions, and the 3 features. 

- Inheritance: 
  - This is not inheritance, but factory function can reuse another factory function by using `Object.assign` to mix an object returned by one factory function into the instance object of another factory function
  - Factory functions can create objects using prototypal inheritance, to reuse code from another factory function. 
- Mix-ins: objects that define common behavior shared by otherwise unrelated classes
  - implemented by using `Object.assign` to mix the mix-in object into the instance object of a factory function.
- Polymorphism:  the ability of objects of different types to respond in different ways to the same method invocation. Will demonstrate this using the `makeNoise` method 
  - polyphorism through inheritance
    - implemented through overriding a method inherited from a super-type. 
  - polymorphism through duck-typing
    - objects of unrelated types, use the same method name, to perform related but different functions. 

```js
function animals (name) {
  return {
    name: name, 
    makeNoise() {
      console.log(`${this.name} growls`);
    }
  };
}

function cats(name) {
  let obj = {};
  let animal = animals(name);
  Object.assign(obj, animal, mixIn); // reusing code from animals factory function
  obj.makeNoise = function () { // polymorphism through inheritance
    console.log(`${this.name} meows`);
  }
  return obj;
}

function humans (name) {
  let obj = {
    name: name,
    walk () {

    }
  };
  Object.assign(obj, mixIn);
  obj.makeNoise = function() { // polymorphism through duck-typing
    console.log(`${this.name} talks`);
  }
  return obj;
}

let mixIn = {
  house() {
    console.log(`${this.name} lives in a house`);
  },
};

let animal = animals('bobo');
animal.makeNoise(); // 

let cat = cats('fluffy');
cat.makeNoise(); 
cat.house();

let human = humans('sara');
human.makeNoise(); 
human.house();
```

```js
function animals (name) {
  return {
    name: name, 
    makeNoise() {
      console.log(`${this.name} growls`);
    }
  };
}

function cats(name) {
  let animal = animals(name);
  let obj = Object.create(animal); // prototypal inheritance
  Object.assign(obj, mixIn); // mix-ins
  obj.makeNoise = function () { // polymorphism through inheritance
    console.log(`${this.name} meows`);
  }
  return obj;
}

function humans (name) {
  let obj = {
    name: name,
    walk () {

    }
  };
  Object.assign(obj, mixIn);
  obj.makeNoise = function() { // polymorphism through duck-typing
    console.log(`${this.name} talks`);
  }
  return obj;
}

let mixIn = {
  house() {
    console.log(`${this.name} lives in a house`);
  },
};

let animal = animals('bobo');
animal.makeNoise(); // 

let cat = cats('fluffy');
cat.makeNoise(); 
cat.house();

let human = humans('sara');
human.makeNoise(); 
human.house();
```



------

Prompt: Compare and contrast the different object creation patterns, the advantages and disadvantages of each. 

Answer: 

------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------

Prompt: 

Answer: 

------



# Prompts

Prompt: See if an Object came from a constructor.

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

------

Prompt: See if an object contains a property as one of its own -> create your own `hasOwnProperty`

Answer: 

------

Prompt: Return all the property names of an object -> create your own `Object.getOwnPropertyNames`

Answer: 

------

Prompt: Copy all properties from one object to another -> create your own `Object.assign`

Answer: 

------



# Specifics

## this

Definition

-  `this` is  a **keyword**  that refers to an object that is the current **execution context** of a function or method that is running. 
-  **Execution context**: the environment (an object) in which a function executes. 
-  The value of `this` changes based on how you invoke a function, not how or where you define it. Context binding is not based on lexical scoping rules. 

Implications

- Every time a function is called, JS binds some object to `this` --> **setting the binding** / setting the execution context. 
-  `this` keyword is available to every function in JS, because every JS function call has an execution context.
   - All JS functions and methods execute within an execution context , aka the `this` binding. 
- Clarification: `this` is not a variable. It is a keyword.

Value of `this` / execution context rules

- When **strict mode** is enabled,  the implicit execution context/ <u>implicit `this`</u> for function calls is assigned to `undefined` instead of the global object.

  - CoderPad runs JavaScript code in *strict mode*. The implicit execution context is `undefined`, **not** the global object. 

  - If you wish to practice on your own system instead of on CoderPad, add `"use strict";` to the top of your JavaScript code:

    ```js
    "use strict"; // the quotes are required
    
    function foo() {
      console.log(this);
    }
    
    foo(); // undefined
    ```

- If `this` is <u>outside a function definition</u>, keyword `this` is bound to the global object. 

  - Even in strict mode, `this` at the top level scope, the global scope, is bound to the global object, not `undefined`. 

  ```js
  "use strict";
  
  let obj = {
    foo: this,
  };
  
  console.log(obj.foo); // logs the global obejct, not undefined
  ```

  - `this` in the global scope is still the global object. 

    ```JS
    let obj = { foo: this, }; // this is the this of the top-level scope
    ```

  - The braces of an object literal doesn't create a scope. Its simply a syntax that is a shorter version of saying

    ```JS
    let obj = new Object();
    obj.foo = this; // this of this top-level scope
    ```

  - Inside a function `this` is is different depending on how the function is called. The function gets its own scope and its own `this` binding.

    ```JS
    function foo() { console.log(this); } // the this here is inside the function, bound when called
    foo(); // determines the value of this, in strict mode this call binds to undefined
    ```

- If `this`  is <u>used as part of a function definition</u>, and the execution context is dependent soley on how the function is invoked, not how or where you define it

  - Context binding is not based on lexical scoping rules that variables use. `this` depends on how a function or method is invoked. 

  - **Regular function** calls (**standalone** function) <u>implicitly</u> use the global object as their execution context, while **method calls** <u>implicitly</u> use the calling object as their context.
    - In Node, global object is `global` and in browser, global object is `window`. 
    - In strict mode, regular function calls use `undefined` as their <u>implicit</u> execution context, while method calls <u>implicitly</u> use the calling object as their context. 
    
    - Invoking a function with `new` <u>implicitly</u> sets `this` to the instance object created by the constructor function. 
    - You can override the implicit execution context behavior by setting the execution context <u>explicitly</u> with either `call`,  `apply`, or `bind`.   
    - Arrow functions are also exceptions. Arrow functions use lexical scoping. 

  ```js
  // regular function call
  function func() {
    console.log(this);
  }
  
  func(); // undefined
  ```

  ```js
  // another form of regular function call 
  let obj = {
    func () {
      console.log(this);
    }
  }
  
  let foo = obj.func;
  foo(); // undefined
  ```

  ```js
  // method invocation
  let obj = {
  	func() {
      console.log(this);
    }
  };
  
  obj.func(); // logs { func: [Function: func] } which is obj
  
  ```

- **Arrow functions** inherit execution context from the surrounding context. 

  - That means that an arrow function defined inside another function always has the same context as the outer function's context. 

  - This means that arrow functions are permanently bound to the execution context of the **enclosing function invocation**. 

  - **enclosing function invocation** (surrounding scope): the most <u>immediate</u> function scope in which the arrow function is defined. 
  
    - This enclosing function is likely a function declaration or expression, in which case its execution context is determined by how its invoked. 
    - The execution context of this enclosing function is determined by  how it is invoked. 
    - Tricky: `forEach` is not considered the enclosing function for arrow functions, why? Because arrow functions are passed as arguments to `forEach` - it's not defined inside `forEach`. 

  -  An arrow function, once created, always has the same context as the function that surrounded it when it was created.

    - Arrow functions are permanently bound to the enclosing function execution context, but it doesn't mean the context can't change. If the enclosing function context changes, it also changes. 
  
  - My example: 
  
    ```js
    let obj = {
      prop: function () {
        let foo = () => {
          console.log(this); // logs obj because obj is the surrounding context for the foo arrow function. 
        }
        foo();
      },
    };
    
    obj.prop();
    ```
  
  - Their example: 
  
    ```js
    let obj = {
      a: 'hello',
      b: 'world',
      foo: function() {
        let bar = () => {
          console.log(this.a + ' ' + this.b);
        }
    
        // some code
        bar();
    
        // some more code
        bar();
    
        // still more code
      }
    };
    
    obj.foo();
    // => hello world
    // => hello world
    ```
  
  - Exception: don't use arrow functions as methods on an object, else it will take global object( even in strict mode!) as the surrounding context. 
  
    ```js
    let obj = {
      a: 5,
    
      foo: () => {
        console.log(this); // this refers to global object
        console.log(this.a);
      },
    };
    
    obj.foo(); // => undefined
    // Arrow functions ignore method invocation rule for implicit execution context, uses lexical scoping instead. The surrouding context here is the global object, not obj. 
    ```


------

## Understanding context loss

- “What are the ways that context can be lost, and how can context loss be prevented in these situations?”
- A complete response needs to clearly indicate the differences between “Implicit” and “Explicit” execution context.

##### Context Loss 1 : Method is copied out of an object and used elsewhere.

- When we take a method out of an object and execute it as a function or method on another object, the function's context is no longer the original object.

```js
let john = {
  firstName: 'John',
	lastName: 'Doe',
  greetings() {
    console.log('hello, ' + this.firstName + ' ' + this.lastName);
  },
};

john.greetings();         // context is john
let foo = john.greetings; // Strips context
foo(); // context is now the global object
```

Best Solution

- Hard-bind the method's context by using `bind`

```js
let foo = john.greetings.bind(john); // bind returns a function
foo(); // => need to invoke foo here in order to run greetings() 

// using call
let foo = john.greetings; 
foo.call(john)
```

Unideal solutions

- Use `call`

  - problem is if you pass it to another function or don't execute function right away, the context passed to `call` may be out of scope by then. 

    ```js
    function repeatThreeTimes(func) {
      func(); // can't use func.call(john); john is out of scope
      func();
      func();
    }
    
    function foo() {
      let john = {
        firstName: 'John',
        lastName: 'Doe',
        greetings: function() {
          console.log('hello, ' + this.firstName + ' ' + this.lastName);
        },
      };
    
      repeatThreeTimes(john.greetings); // Strips context
    }
    
    foo();
    
    // => hello, undefined undefined
    // => hello, undefined undefined
    // => hello, undefined undefined
    ```

- Change the original function to accept context object as second parameter, then pass context to original function when calling it

  - problem is you can't always change function or methods, and not good to pass a lot of arguments to functions
  - JS built-in methods like `forEach` `map` `filter` use this technique by taking a callback function as argument and optional `thisArg` context object that is used as the callback's execution context. 

##### Context Loss 2: Nested Functions: inner function not using surrounding context

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar(); // bar is invoked as standalone function on line 9. THus its execution context is the global object, not `obj` object. 
  },
};

obj.foo();        // => undefined undefined
```

Solution 1 : Preserve context with variable in outer scope 

- `let self = this` in the outer function

- Set `this` to a variable to access the correct context object. 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    let self = this; // self references `obj`

    function bar() {
      console.log(self.a + ' ' + self.b); // Can use self instead of `this` to access the correct context object. 
    }

    bar();
  },
};

obj.foo(); // => hello world
```

Solution 2 : Call Inner function with explicit context

- `call` or `apply`

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    bar.call(this); // call invokes bar with `obj` as execution context.
  },
};

obj.foo(); // => hello world
```

- We won't show an example of `apply` since you can always use `call` in its place if you use the spread operator to expand `apply`'s array argument.

Solution 3: use `bind`

- call `bind` on inner function and get a new function with its execution context permanently set to the object. 
- Advantage of `bind` is that you can do it once and then call it as often as needed without an explicit context. 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    let bar = function() { // anonymous function expression
      console.log(this.a + ' ' + this.b);
    }.bind(this); 

    // some code
    bar(); // bar is invoked twice in foo 

    // some more code
    bar();
  }
};

obj.foo();
// => hello world
// => hello world
```

- We're calling bind on the function expression here, then assigning the returned function to the `bar` variable. 
- You can use a function declaration instead of a function expression, but you'll need an extra variable. 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    function bar() {
      console.log(this.a + ' ' + this.b);
    }

    let qux = bar.bind(this); // function declaration

    // some code
    qux();

    // some more code
    qux();

    // still more code
  }
};

obj.foo();
// => hello world
// => hello world
```

Solution 4: Use arrow function

- Arrow functions use lexical scoping. 
- Arrow functions ignore the rule that a function or method's execution context depends soley on how you invoke it, now on how and where it's defined. 
- This exception comes in very handy when dealing with context loss. 
- A property of arrow functions is that <u>they inherit their execution context from the surrounding scope</u>. 
- An Arrow function defined inside another function always has the same context as the outer function: 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() { // outer function is foo, which is invoked with obj as implicit context
    let bar = () => {
      console.log(this.a + ' ' + this.b);
    }

    // some code
    bar();

    // some more code
    bar();

    // still more code
  }
};

obj.foo();
// => hello world
// => hello world
```

- Using arrow functions like this is similar to using `bind` in that you don't have to worry about arrow functions losing their surrounding context. 
- An arrow function, once created, always has the same context as the function that surrounded it when it was created. 
- Of all the techniques we saw in the assignment, using arrow functions is most common these days. 

##### Arrow function Exception 

- Don't try to use arrow functions as methods on an object. 

```js
let obj = {
  a: 5,

  foo: () => {
    console.log(this.a);
  },
};

obj.foo(); // => undefined
// // Arrow functions ignore method invocation rule for implicit execution context, uses lexical scoping instead. The surrouding context here is the global object, not obj. 
```

- This code doesn't work because arrow functions always get the value of `this` from the surrounding context. 
- The surrounding context is the **global object**. The reason for that is simple: the `let` statement in this example is in the program's top level code, so its context is the global object. That means `this` inside the object literal is also the global object, so `this` on line 5 refers to the global object, not `obj`. 
- Note that `this` in `obj.foo` is not determined by how the method is called. 
  - We call the method on line 9, and we seem to be telling JavaScript to use `obj` as the context. 
  - Instead, the context ends up being the global object. 
  - That seems to contradict our repeated statements that the context is determined entirely by how a function or method is invoked. That's clearly not the case here; it certainly violates the rule.
  - However, you won't usually see code like this in practice.
  - In general, do not use arrow functions to write methods. As long as you don't use arrow functions as methods, you can ignore this exception. 

##### **Context Loss 3: Function as argument losing surrounding context**

- When functions are passed as arguments to another function, they lose their surrounding context and the function argument gets invoked with the execution context set to the global object. 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    });
  },
};

obj.foo();

// => 1 undefined undefined
// => 2 undefined undefined
// => 3 undefined undefined
```

- CLARIFICATION: It's the callback function that is being executed with global object as context, not `forEach`. 
- On line 5, The implicit execution context of `forEach` is its calling object, the array `[1, 2, 3]`.   But a function expression is passed to `forEach` as argument, and when functions are passed as arguments, they lose surrounding context, so the execution context is then implicitly set to the global object.  If `forEach` took a `thisArg` argument, then the execution context would be `thisArg`. 
- SOLUTION: The problem is that `this` is bound to the global object when the anonymous callback function passed to `forEach` is invoked on line 5. We want to access the object `obj` from within the anonymous function. Here we'll solve it by employing the lexical scoping of JavaScript to our advantage; specifically, the rule that a variable defined in an outer scope is available to an inner scope. (preserving context with a variable in outer scope)

Solution 1: Preserve the Context with a Variable in Outer Scope

- This solution utilizes lexical scoping rules.
- **Lexical scoping rules**: A lexical scope in JavaScript means that a variable defined outside a function can be accessible inside another function defined after the variable declaration. 
  -  the rule that a variable defined in an outer scope is available to an inner scope

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    let self = this; // this refers to obj, because of method invocation on line 12. 
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + self.a + ' ' + self.b);
    });
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

Solution 2 : Use `bind`

- Passing a function as an argument to another function also strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 

- `Bind` needs to be used on an outer function, it won't work if you use `bind` on a function that is being passed as argument. That function will lose its context and `this` will refer to the global object. 

```js
// this solution doesn't work
// It doesn't work because the function that is bound to `this` gets passed as an argument itself. 
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription: function() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }.bind(this) 
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription); // undefined undefined is a undefined. 
```

```js
// This works
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription.bind(turk));
```

```js
// This example demonstrates a solution for callback functions to retain its surrounding context when it is passed to `forEach`. This solution binds the outer function to a permanent execution context. 
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b); // why does this refer to obj? 
    }.bind(this)); // binding foo method, which is an anonymous function expression. 
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

- `this` on line 6 refers to `obj` because the order of method calls starts from line 11, where method `foo` is invoked by `obj` and the context is set to `obj`. Then on line 7, foo references a new function that is permanently bound to context of `this`, which still refers to `obj`. The new function invokes the original `foo` function with permanent context of `obj`, so on line 6, `this` refers to `obj`.  

Solution 3 : Use arrow function

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(number => {
      console.log(String(number) + ' ' + this.a + ' ' + this.b); // arrow function inherits surrounding context, the surrounding context is obj. 
    });
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

Solution 4: Use the optional `thisArg` argument

- Some methods that take function arguments allow an optional argument that specifies the execution context to use for the callback function. 
  - provides an alternative way to supply the execution context for the callback function. 
- For example `Array.prototype.forEach` has an optional `thisArg` argument for the context. 
- `map`, `every`, `some`, and others take this optional argument. 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b);
    }, this);
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

------

## `Function` Prototype methods and context

- The JS120 “*Functions and Execution Context*” lesson covers the `Function` prototype methods of `call`, `bind`, and `apply`. These methods can be used to set the context of a function. Just like with `Object` methods, I found it helpful to reproduce their behavior with my own functions in order to fully understand how they work.

- In practice, you use the `call`, `apply`, and `bind` methods to set an explicit execution context. You can also set the execution context explicitly with functions that accept an argument that specifies the context for a callback function. For instance, `Array.prototype.forEach` (and several other `Array.prototype` methods) take a `thisArg` argument that lets you set the context for the callback explicitly.

##### `call`

- Definition: `call` invokes a function or method with an explicit execution context - the first argument passed to it 

  - `call` and `apply` don't change a function's logic or return values; they merely change what object the method uses for its context.

- Syntax

  ```js
  someObject.someMethod.call(context, arg1, arg2 …)
  someObject.someMethod.call(context, ...args);
  function.call(context)
  
  // using non-mutating array methods on strings
  string = anyArray.arrayMethod.call(string, callbackFn).join('');
  string = [].arrayMethod.call(string, callbackFn).join('');
  ```

- Can also pass a second array argument using spread operator. 

  ```js
  function.call(context, ...args);
  ```

##### `apply`

- Definition: `apply` calls a function or method with an explicit execution context(the first argument passed to it), and optionally passes an array of arguments to the called function or method. 

  - Arguments are passed as an array, whereas in `call`, arguments are passed separately. 

- Syntax

  ```js
  someObject.someMethod.apply(context, [arg1, arg2, arg3…])
  function.apply(context)
  ```

##### `bind`

- Definition: `Bind` returns a new function that is permanently bound to the context passed to  it as first argument. 

  - Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`
  - Hard binds a function to an explicit execution context. 
  - We have to call on the new function using `()`. 

- Syntax

  ```js
  newFunc = someObject.someMethod.bind(context)
  // Or 
  function.bind(context)
  ```

- Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. Instead it returns a new function that is permanently bound to the context argument.  

  - What's important is to recognize that `bind`'s context is the <u>original</u> function and it <u>returns a new function</u> that is permanently bound to the context passed to `bind` as first argument. 
  - When we call this new function using `()`, this new function calls on the original function/method using `apply` or `call`, passing the permanent context to it. The original function and its context is not changed.
  - `bind`'s execution context is the original function, because it is invoked using method invocation. Method invocations always use the calling function as its implicit execution context. But `bind` explicitly sets the execution context for the new function. 

- You cannot alter the execution context of the resulting function, even if you use `call` `apply` or call `bind` a second time. 

  ```js
  function sumNum(num1) {
    return this.num + num1;
  }
  
  let obj = {
    num: 42
  };
  
  let sumNum2 = sumNum.bind(obj);
  sumNum2(5); // => 47
  // new function sumNum2 is permanently bound to obj. 
  ```

- You can pass that method around and call it without worrying about losing its context since it's permanently bound to the provided object. 

  ```js
  let object = {
    a: 'hello',
    b: 'world',
    foo: function() {
      return this.a + ' ' + this.b;
    },
  };
  
  let bar = object.foo;
  bar();                                // "undefined undefined" 
  																			// undefined because there is no 'a' property in the global object
  
  let baz = object.foo.bind(object);
  baz();                                // "hello world"
  																			// baz is permanently bound to object, so the context / 'this' now refers to object 
  // baz calls on foo, passing permanent object context to it. 
  ```

  ```js
  let object2 = {
    a: 'hi',
    b: 'there',
  };
  
  baz.call(object2);  // "hello world" - `this` still refers to `object`
  ```

- JavaScript implements `bind` method like this: 

  ```js
  Function.prototype.bind = function (...args) {
    let fn = this; // bind's context is the original function function ()
    let context = args.shift();
  
    return function () {  										// bind returns a function function(), which is permanently bound to context. 
      return fn.apply(context, args); // this function calls the original function fn. using apply. 
    };
  };
  ```

  - This code shows why binding makes permanent changes -- no mater what you do to the returned function, you can't change the value of `context`. 

- It's also important to know that `bind` does not contradict the statement that context is determined entirely based on how you call a function or method, not where you call it or how you define it. 

  - Technically, `bind` defines a new function. However, when we call that function, its implementation -- as shown above-- calls the original function using `apply`. 
  - Therefore, it's still the "how" of the call that determines the context, not the definition or location. 

> - A trap is thinking that `bind` permanently alters the original function. 
> - It's important to remember that `bind` returns a new function, and the new function is permanently context-bound to the object provided as the first argument to `bind`. 
> - The original function isn't changed and doesn't have its context changed. 

##### Advantage and disadvantage of `bind`

- `bind` has one significant advantage: once you bind a context to a function, that binding is permanent and does not need to be repeated if it gets called more than once. 
- The disadvantage of `bind` is that it is no longer possible to determine the context by looking at the invocation of the final function. 

------

## Object creation patterns

- The assessment requires detailed knowledge of all of these object creation patterns, including how to implement them and their nuances.
- Needless to say, being able to demonstrate this knowledge with examples on the fly requires a lot of practice.
- A good way to practice is to start from scratch and try to produce a functionally identical <u>hierarchy of objects</u> using each different object creation pattern. This practice is most effective if the hierarchy includes features such as inheritance, mix-ins, and polymorphism in order to illustrate how to implement these aspects in the different patterns.
- Lacking any and all creativity, I usually practiced with something like creating a hierarchy of vehicles using Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. 

------

#### Concepts

##### Inheritance

- Definition: Each object creation type has its own form of inheritance. 
- Inheritance with factory functions
  - One factory function can reuse another factory function by using `Object.assign` to mix the object returned by another factory function into itself. 
  - Factory functions can create objects using  prototypal inheritance.
- OLOO: prototypal inheritance
- constructors and prototypes: pseudo- classical inheritance
  - Subtyping: Making one function, constructor, or class a subtype of another. 
- Classes: class inheritance

###### Prototypal inheritance

- A simple form of inheritance that works with one object at a time, which is why it's often called **object inheritance**

- Use `Object.create` to create an object that inherits properties from from a prototype object. The newly created object has access to all properties and methods that the prototyp
- An objects internal `[[prototype]]` property points to the prototype object, and the object can delegate method calls to the prototype object. 

##### Mix-Ins: 

- Definition: A mix-in is an object that defines the common behavior between multiple classes. 

- Definition:  Mix-ins are used to share behavior between otherwise unrelated classes.

-  It defines the methods to be "mixed in " to a function, constructor, or class. This grants that class access to all of the methods in the object. 

  - The **`Object.assign()`** Merges two or more objects into a single object returns a reference to the modified object. 
    - `Object.assign` is used to copy the methods and properties of source objects into the target object. 
  
    - copying all [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable) [own properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) from one or more *source objects* to a *target object*. It returns a reference to the modified <u>target</u> object
  
    - Syntax
  

  ```
  Object.assign(targetObj, ...sources)
  Object.assign(Constructor.prototype, mixIn, mixIn...)
  ```
  
  - This grants the function/constructor/class access to all the methods in the object.

##### Polymorphism

- Definition: Polymorphism refers to the ability of objects of <u>different types</u> to respond <u>in different ways to</u> the <u>same</u> method invocation. 
  - It's a crucial concept that can lead to more maintainable code. 

- Polymorphism through inheritance: 

  - Definition:  **overriding** a method inherited from a superclass.
  - An example is the `toString()` method
    - `toString()` returns a string representation of an object `[object Type]`
    - `toString()` can be overridden by creating a function in place of it. 

- Polymorphism through **Duck-typing**: 
  - Definition: Objects of <u>different unrelated types</u> use the same method ***name*** to perform different but related functions. 
  - 


#### Hierarchy of objects template

- animals 
  - property: name
  - method: makeNoise : 'growls'
- cats --> (inheritance)
  - property: name
  - method: makeNoise: `meows` (polymorphism through inheritance)
- humans 
  - property: name
  - method: makeNoise: `talks` (polymorphism through duck-typing)
- mix-in
  - house: cats and humans live in house. 'has - a ' relationship vs 'is - a' relationship. Cats and humans both have this capability, but are not related to each other. 

#### Factory Functions (11 & 12)

- Definition: Factory functions create and return objects of a particular type: objects with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments.
  - provide a simple way to automate the creation related objects based on a predefined template. 
  - are functions that create and return objects of a particular type. 
    - **Type** means an object with a particular set of methods and properties. 
  - One factory function can reuse another factory function by mixing the object created by that factory function into itself using `Object.assign`. 

- Advantages of factory function
  - Automates the creation of objects, creating multiple objects of a particular type.
  - Reuses Code
  - Can create objects with private state
- Disadvantage of object factory
  - Can't identify what factory function created the object, so we can't be sure we are working with the right **type** of object.
  - Wastes memory: Each object created by the factory function has a copy of all the methods, which can be redundant and memory intensive.
- ###### Inheritance with factory functions
  
  - One factory function can reuse another factory function by using `Object.assign` to mix the object returned by another factory function into itself. 
  - Factory functions can create objects with prototypal inheritance.
- Mix-ins with factory functions
  - Can use `Object.assign` to mix the return object of one factory function into the instance object of another factory function. 
- Code Example

```js
function animals (name) {
  return {
    name: name, 
    makeNoise() {
      console.log(`${this.name} growls`);
    }
  };
}

function cats(name) {
  let animal = animals(name);
  let obj = Object.create(animal); // prototypal inheritance
  Object.assign(obj, mixIn); // mix-ins
  obj.makeNoise = function () { // polymorphism through inheritance
    console.log(`${this.name} meows`);
  }
  return obj;
}

function humans (name) {
  let obj = {
    name: name,
    walk () {
      console.log(`${this.name} can walk.`);
    }
  };
  Object.assign(obj, mixIn);
  obj.makeNoise = function() { // polymorphism through duck-typing
    console.log(`${this.name} talks`);
  }
  return obj;
}

// functions are hoisted.
let mixIn = {
  house() {
    console.log(`${this.name} lives in a house`);
  },
};

let animal = animals('bobo'); 
animal.makeNoise();  // bobo growls

let cat = cats('fluffy');
cat.makeNoise(); // fluffy meows
cat.house(); // fluffy lives in a house

let human = humans('sara');
human.makeNoise();  // sara talks
human.house(); // sara lives in a house
```

#### Objects Linking Other Objects (OLOO)

- Short: In OLOO, we have a prototype object and use `Object.create` to create new objects that inherit from that prototype. An `init` method defined on the prototype is used to customize the state of each object: initializing newly created objects with their own properties.  `init` returns `this`, a reference to the calling object. 

- Create new objects using that object prototype with this code

  ```js
  let newObj = Object.create(obj).init(state)
  ```

- Detail:   OLOO lets us define a parent object from which we can create objects with shared behavior. 

  - all shared properties are defined on this parent object. 
  - Other objects can be created from the parent object using `Object.create(obj)`. 
  - An `init()` method defined on the parent object is used to initialize newly created objects with its own properties . 

  - Note that OLOO doesn't use functions. Instead it uses a parent object as prototype, then `Object.create` to create new objects that inherit from that prototype. 

- Compare the two creation patterns

  ```js
  // OLOO
  let newObj = Object.create(obj).init();
  
  // pseudo-classical(constructor inheritance)
  let newObj = new Obj(); // newObj is an instance of Obj
  ```


###### Inheritance with OLOO

- OLOO uses prototypal inheritance in two ways. It uses prototypal inheritance to create new objects, and it also uses prototypal inheritance to make a prototype object inherit from another prototype object.

- Syntax: 

  - Chaining subtypes requires different `init` method names to prevent infinite looping. 

  ```js
  let superType = {
    initialize(property) {
      this.property = property;
      return this;
    }
  };
  
  let subType = Object.create(superType);
  
  subType.init = function(property) {
    return this.initialize(property); // think of this as super, we are calling on parent method
    // use different initializer method names to prevent infinite loop here
  };
  
  // creating a subType object
  // code essentially does what super() does in class syntax
  let subTypeObj = Object.create(SubType).init(property);
  ```

- Syntax 2:  If subType has its own properties to be set

  - Chaining more subtypes requires different `init` method names to prevent infinite looping. 

  ```js
  let superType = {
    initialize(property1) {
      this.property1 = property1;
      return this;
    },
  };
  
  let subType = Object.create(superType);
  
  subType.init = function(property1, property2) {
    let copyOfSuperType = this.initialize(property1); 
    this.property2 = property2;
    Object.assign(this, copyOfSuperType);
    return this;
  };
  
  // creating a subType object
  // code essentially does what super() does in class syntax
  let subTypeObj = Object.create(subType).init(property1, property2);
  ```

- Code Example

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
      console.log(`${this.name} lives in a house.`);
    }
  };
  
  let cats = Object.create(animals);
  Object.assign(cats, mixIn);
  
  cats.initialize = function(name) {
    return this.init(name);
  };
  
  cats.makeNoise = function() {
    console.log(`${this.name} meows`);
  };
  
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
  
  let cat = Object.create(cats).initialize('Fluffy');
  cat.makeNoise(); // Fluffy meows
  cat.house(); // Fluffy lives in a house.
  
  let human = Object.create(humans).init('Sara');
  human.makeNoise(); // Sara talks
  human.house(); // Sara lives in a house.
  ```

  

#### Constructor Functions

#### ES6 Classes



------

## Applying knowledge in unusual ways

- All that said, one thing that can help is to keep a running list of anything that seems unusual while going through the course materials
  - Use an object method to create and store a collaborator object— and then be able to reference that created object ([see this exercise](https://launchschool.com/exercises/4a1f0eb3))
  - Unusual things about the `new` keyword
  - Unusual things about arrow functions
  - Pass a class as an argument and return a new object from a function
  
- `forEach` is not considered the enclosing function for arrow functions, why?

- Unusual: don't use arrow functions as methods on an object, else it will take global object (even in strict mode) as the surrounding context. 

  ```js
  let obj = {
    a: 5,
  
    foo: () => {
      console.log(this); // this refers global object
      console.log(this.a);
    },
  };
  
  obj.foo(); // => undefined
  // Arrow functions ignore method invocation rule for implicit execution context, and use lexical scoping instead. The surrouding context here is the global object, not obj. 
  ```


# Note For CoderPad

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

##### Question: 

When strict mode is enabled, the implicit execution context, `this` refers to `undefined` instead of the global object. So why is it that sometimes `this` still refers to the global object?

For example when `this` is outside a function definition, `this` is bound to the global object, instead of `undefined`.

```javascript
"use strict";

let obj = {
  foo: this,
};

console.log(obj.foo); // logs the global object, not undefined
```

In this code, the implicit execution context for the function call is `undefined` instead of the global object.

```javascript
"use strict"; 

function foo() {
  console.log(this);
}

foo(); // logs undefined
```

##### Answer:

`this` in the global scope is still the global object. Assigning it to a property of an object doesn't change that.

```js
let obj = { foo: this, }; // this is the this of the top-level scope
```

The braces of an object literal doesn't create a scope. Its simply a syntax that is a shorter version of saying

```js
let obj = new Object();
obj.foo = this; // this of this top-level scope
```

Inside a function `this` is is different depending on how the function is called. The function gets its own scope and its own `this` binding.

```js
function foo() { console.log(this); } // the this here is inside the function, bound when called
foo(); // determines the value of this, in strict mode this call binds to undefined
```

------

## 