

# Questions

- Why do we use prototypes
- Why do we use prototypal delegation

# Part 2 Exam 

##### Note For CoderPad

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

##### Areas of Focus

- General knowledge of OOP concepts as they pertain to JavaScript.
- Conventional techniques for constructing objects, including the use of prototypal inheritance.
- The ability to come up with code examples to illustrate concepts. Be prepared! Know what examples you want to use.
- The ability to integrate what you've learned and put it to work to understand unusual situations.
- An ability to speak clearly and with precision.

##### Problems

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

- This example illustrates that there are several ways to complete the task and provides code examples of how they work. That???s enough to get to the conscious competence level, but it still might be difficult to completely explain what is going on.

- The next step is to think about *how* the code does what it does, with the goal of understanding well enough to teach it. A good way to develop that understanding is to create functions to duplicate the behavior provided by built-in abstractions like `isPrototypeOf` and `instanceof`

- For example, here???s what I came up with for `instanceof`. This function iterates through the prototype chain of `obj`, comparing each prototype to the `prototype` property of `constructorFunction`. It returns true if any of them match and false if no match is found:

  ```js
  function isInstanceOf(obj, constructorFunction) {
    while (obj) {
      obj = Object.getPrototypeOf(obj);
      if (obj === constructorFunction.prototype) return true;
    }
  
    return false;
  }
  ```

- For example, the JS120 exercise called ???*Ancestors*??? involves developing a method to return the prototype chain of an object. Similarly, there???s a question in the lesson material that requires searching a prototype chain for a property and returning the object that owns it. 

Additional Examples

- See if an object contains a property as one of its own -> create your own `hasOwnProperty`

- Return all the property names of an object -> create your own `Object.getOwnPropertyNames`

- Copy all properties from one object to another -> create your own `Object.assign`


1. this
   - Any time `this` occurs outside of a function definition, its value is obvious. The majority of the time, `this` will be used as part of a function definition. In these cases, what `this` refers to depends entirely on how the function is invoked.
2. Understanding context loss
   - ???What are the ways that context can be lost, and how can context loss be prevented in these situations????
   - A complete response needs to clearly indicate the differences between ???Implicit??? and ???Explicit??? execution context.
3. `Function` Prototype methods and context
   - The JS120 ???*Functions and Execution Context*??? lesson covers the `Function` prototype methods of `call`, `bind`, and `apply`. These methods can be used to set the context of a function. Just like with `Object` methods, I found it helpful to reproduce their behavior with my own functions in order to fully understand how they work.
4. Object creation patterns
   - The assessment requires detailed knowledge of all of these object creation patterns, including how to implement them and their nuances.
   - Needless to say, being able to demonstrate this knowledge with examples on the fly requires a lot of practice.
   - A good way to practice is to start from scratch and try to produce a functionally identical hierarchy of objects using each different object creation pattern. This practice is most effective if the hierarchy includes features such as inheritance, mix-ins, and polymorphism in order to illustrate how to implement these aspects in the different patterns.
   - Lacking any and all creativity, I usually practiced with something like creating a hierarchy of vehicles using Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. 
5. Applying knowledge in unusual ways
   - All that said, one thing that can help is to keep a running list of anything that seems unusual while going through the course materials
     - Use an object method to create and store a collaborator object??? and then be able to reference that created object ([see this exercise](https://launchschool.com/exercises/4a1f0eb3))
     - Unusual things about the `new` keyword
     - Unusual things about arrow functions
     - Pass a class as an argument and return a new object from a function

# Miscellaneous

- Pi is `Math.PI` 

- Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well.

- Javascript can't find __ in the prototype chain of ___ 

- **Variable**:
  - Variables declared with `let`, `const`
  - Function parameters
  - Function names
  - Class names
  - object property names **are not** variables.
  
- `[[Prototype]]` not `[[prototype]]`

- Default parameters

  ```js
  function createInvoice(services = {}) { // default parameter in case no object is passed to the function. 
    let phoneCharge = services.phone || 3000;
    let internetCharge = services.internet || 5500;
  
    return {
      phone: phoneCharge,
      internet: internetCharge,
  
      total: function() {
        return this.phone + this.internet;
      }
    };
  }
  ```

  



# Precision of Language

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

This code defines a `Dog` class with two methods. The `constructor` method initializes a new `Dog` object, which it does by assigning the instance property `this.name` to the dog's name specified by the argument. The `sayHello` instance method logs a message to the console that includes the dog's name in place of `${this.name}`. The instance method `sayHello` returns `undefined`.

------

# Lesson 1 Stuff

#### OOP

- Definition: OOP (object oriented programming) is a programming **paradigm** in which we think about problems in terms of objects,  by using objects to <u>organize</u> a program. 
- The idea is to model a program based on how objects in the real world interact. A real world object has **state** and **behavior**. State is properties related to the object, and Behavior is what that object can do in a verb sense.  
  - State/ Behavior
  - data / operations
  - properties / methods
- The way we think about a program changes from a *series of steps* to a *collection of objects* that interact with each other.
- Choosing an approach for an OO problem always comes down to making tradeoffs.

------

#### **Advantage and disadvantage of OOP**

Why OOP?

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

#### Encapsulation

- **Encapsulation** : grouping related properties and methods in a single object. 
- It is bundling data(state) and operations related to data(behavior) into a cohesive unit, single entity called an object. 

##### Prompt: How does encapsulation in JavaScript differ from encapsulation in most OO languages?

- In other languages, encapsulation also refers to the idea of restricting access to state and behavior. In other words, hiding details of an object from code that uses the object. An object should only expose the properties and methods that other objects need, to use the encapsulated object. JavaScript objects don't support this type of encapsulation.  JavaScript does not directly provide the means to limit exposure of methods and properties. There are ways to achieve a degree of access restriction, but it's not perfect.

- **Interface of an object**: the state and behaviors exposed by the object for other objects to use.
  - Encapsulation has a broader purpose in most OOP languages. It also refers to restricting access to the state and certain behaviors. An object only exposes the data and behaviors that other parts of the application need to work.  
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. Thus, other objects can't change the data of an object without going through the proper interface. Unfortunately, JS doesn't support access restrictions. 

------

#### Collaborator objects - 1

Prompt: What is a **collaborator object**?

Answer: 

- A collaborator object is an object that helps provide state in another object.
- Two objects have a collaborator relationship if one of them is part of the state of the other. 

**Collaborator Objects**

- objects that help provide state in another object. 

- We say that two objects have a collaborator relationship if one of them is part of the state of the other.
- Collaborator objects represent the connections between various actors in your program.
- Collaborator objects let you chop up and modularize the problem domain into cohesive pieces.

```js
let cat = {};
let dog = {};

let house = {
  pets: [],
};


house.pets.push(cat, dog); // cat and dog are added as elements into the pets property in the house object.

// cat and dog are collaborator objects of the house object. This means they help provide state in the `pets` property of `house`

// Note: cat and dog must be defined before they are used in house.
```

```js
// cat is collaborator object of pets. 
let cat = {
  noise: 'meow',
};

let pets = {
  dog: {
    noise: 'woof',
  },

  cat: cat.noise,

  printInfo() {
    console.log(`My dog makes this noise ${this.dog.noise}`);
    console.log(`My cat makes this noise: ${this.cat}`);
  },
};
```

------

#### Compact Method Syntax

- Using functions as object values (methods) is so common that there's short hand syntax called compact syntax for it. 
- You can omit the `:` and the `function` keyword and use parenthesis to denote a method. There is a subtle difference between these two syntaxes, however. We'll cover that later when we talk about prototypes(??)

```JS
let obj = {
  prop: function () { 
    
  }, 
  
  property() {
    
  },
};
```

- ------

 #### Methods

- **Methods**  are object properties that have function values. 
- You can use any valid JavaScript value, including a function object (method ) or another object, as the value of a property in an object.

```js
let obj = {
  prop () { // property name is `prop`, the value is an anonymous function. Compact method syntax
    
  }
};
```

```js
let obj = {
  prop: function() { // property name is `prop`, the value is an anonymous function.
    
  }
};
```

- **behavior** (method) change the **state** of an object. 
  - **State** means data in an object. 

# Functions Definitions

#### 3 ways to define a function (review + new)

1. **Function declaration**: Function definitions that begin with `function` keyword.

   - Function definition that starts with word `function` at beginning of statement. 

   - Function declaration binds a function to an **identifier**(variable name), declares the existence of the function. 

   - Function declarations can't be anonymous.
   - Function declarations are **hoisted**: can be called before function is defined. 

   ```js
   functionName(); // can invoke function before function is defined.   
   
   function functionName() { // function defined here, functionName is a variable & identifier
     ...
   }
   ```

2. **Function expression**: function definitions that are part of an expression. 

   - Function expressions are <u>not</u> **hoisted** : can't use function expressions before you define them. 

   - Any function definition that doesn't have the word `function` at the **<u>beginning</u>** of a statement is a function expression. 

     ```js
     let functionName = function () { // Anonymous function expression
       ...
     }; // note the semi colon here! It's an expression so it needs semicolon. 
     ```

     ```js
     let functionName = (parameter) => { // arrow functions are always anonymous function expressions
       
     };
     ```

   - Wrapping what looks like a function declaration in parentheses creates a function expression. 

     ```js
     // Function expression, not declaration
     (function greetPeople() {
       console.log("Good Morning!");
     }); 
     ```

     - This code is actually throws an error: expected function call but instead saw an expression. 
     - No code statement here because it gets wrapped into an expression LOL, needs a let something = function expression to make it a statement. 

     ```js
     let a = (function greetPeople() {
       console.log("Good Morning!");
     }); 
     ```

     - This function expression has a name and is not anonymous, but the name is unusable because it's not in the same scope as other code, since the function expression gets wrapped in parenthesis, and is thus part of a statement. 

     ```js
     function makeGreeter(name) {
       return function greeter() {
         console.log(`Hello ${name}`); 
       }
     }
     // Greeter is a function expression because it starts with return. 
     ```

   - Function expressions are usually anonymous. Such as callback functions for array methods like `forEach` and `map`. 

     ```js
     let squaredNums = [1, 2, 3].map(function(num) {
       return num * num;
     }); // => [1, 4, 9]
     ```

   - Function expressions **<u>don't</u>** have to be anonymous: 

     - You can name a function expression by wrapping a function declaration in parenthesis. 

     - `Function` keyword can be used to define a function inside an expression. 

       ```js
       let squaredNums = [1, 2, 3].map(function squareNum(num) { // call back functions don't have to be anonymous
         return num * num;
       }); // => [1, 4, 9]
       ```

     - Or omit name to create anonymous function expressions. 

   - However, the function name given to a function expression is **not visible** in the scope that includes the function expression. 

     - `foo` is a local variable that contains a reference to the function, so we can invoke the function using `foo()`. However, the function name, `bar`, is not in scope on line 3, so `bar()` does not work.

     ```js
     let foo = function bar() {};
     foo();         // This works
     bar();         // This does not work, the function name bar is not in scope on line 3. 
     ```

   - Advantage of naming a function expression

     - The main advantage of naming a function expression occurs when the function throws an error (raises an exception). If the function has a name, the stack trace uses that name to help you determine where the error occurred. Without the name, JavaScript merely reports the location as anonymous.

   - We typically assign a function expression to a variable or object property, pass it to another function, or return it to a calling function. 

     ```js
     let prompt = function() { // Assign to a variable
     
     };
     
     [1, 2, 3].forEach(function(elem) { // pass to another function
       console.log(elem);
     });
     
     
     function makeIncrementer(increment) {
       return function(value) { // return to caller
         return value + increment;
       }
     }
     ```

3. **Arrow function**

   - Arrow functions are always function expressions.
     - No declaration syntax for arrow functions.
     - Which means they have to be invoked by the variable name. 
     - Also means we often pass them around or assign them to variables or properties. 
   - Arrow functions are always anonymous: there's no way to name an arrow function.  
   - Arrow functions are either immediately invoked, assigned to variables or properties, or passed around as arguments and return values. 

   ```js
   () => console.log("Good Morning!"); // 0 parameters
   paramOne => console.log("Good Morning!"); // 1 parameter,
   (paramOne, paramTwo) => console.log("Good Morning!") // 2
   
   let greetPeople = () => console.log("Good Morning!"); // 0 parameters
   let greetPeople = paramOne => console.log("Good Morning!"); // 1 parameter,
   let greetPeople = (paramOne, paramTwo) => console.log("Good Morning!") // 2 parameters
   
   greetPeople(); // Must invoke after defining the function. 
   ```

   - Arrow functions have an interesting feature: **implicit returns**: can omit return statement when function body contains a single expression, on a <u>**single line**</u>. 

   ```js
   [1, 2].map(element => return 1 ); // map invokes anonymous callback function here
   ```

   - If you use braces around the body of an arrow function, you must use an **explicit** `return` statement to provide a return value that isn't `undefined`. You don't need the `return` if the body does not include braces.

   ```js
   let sum = (number1, number2) => {
     return number1 + number2; // needs explicit return statement here
   };
   ```


**Anonymous Function**: a function with no name. 

- Call back functions in methods like `forEach` and `map` are **<u>often</u>** anonymous functions, but <u>don't have to be!</u>   

```js
let name = function (x) { // anonymous function expression
  
});

let name = () => console.log('My name is'); // arrow function
```

------

#### Function Declarations vs Function Expressions

- Functions defined with function declaration syntax can be invoked before the declaration in the program. 

- This code works since the JavaScript engine runs our code in two passes. During the first pass, it does some preparatory work, while the second executes the code. 

  - One action that occurs during the first pass is called **hoisting**: the engine "effectively moves" function declarations to the top of the program file in which they're defined, or the top of the function in which they are nested. 

- **Hoisting**

  - JavaScript Hoisting refers to the process whereby the compiler allocates memory for variable and function <u>declarations</u> prior to execution of the code.

  - **Hoisting** is an internal step performed by the engine; it doesn't actually move code around. 

  - Hoisting isn't limited to function declarations. We'll discuss it in more detail later in the curriculum.

    ```js
    prompt('How are you today?');
    
    function prompt(message) {
    	console.log(`=> ${message}`);
    }
    ```

    Acts like this

    ```js
    function prompt(message) {
      console.log(`=> ${message}`);
    }
    
    prompt('How are you today?');
    ```

- Function expressions are not **hoisted** : can't use function expressions before you define them. 

  - You can test whether a function definition is a function declaration by trying to call it before the declaration. You can't call a function expression until after the expression is evaluated. 

  - ```terminal
    ReferenceError: Cannot access 'foo' before initialization
    ```

- 3 ways to do the same thing 

  ```js
  // function declaration, function is bound to a variable identifier
  function logNum(num) { // function declaration syntax, logNum is a variable
    console.log('Number: ' + num);
  }
  
  [1, 2, 3].forEach(logNum);
  ```

  ```js
  // function expression 
  [1, 2, 3].forEach(function logNum(num) {
    console.log('Number: ' + num);
  });
  ```

  ```js
  // arrow function 
  [1, 2, 3].forEach(num => {
    console.log('Number: ' + num);
  });
  ```

- Takeaways: 

  - Don't invoke functions when you want to use them as values. Use invocation only when you need to run the code in the function. 
  - Treat any function as any other JS value: remove the invocation syntax, and you got an expression whose value is a function. 

#### Type of a Function Value

```js
let myFunc = function() {};
typeof myFunc; // => "function"
```

- Functions are a kind of object: they are a compound type that has its own properties and methods. 
- Definition of **function**: a kind of object with properties and methods.

#### Summary

- Functions in JavaScript are first-class values, just like any other value in JavaScript. You can use them any place that you can use an expression. 
- To use a function as an expression, write its name without the parentheses of invocation. 
- All functions' type is  `function`, which is a kind of object with properties and methods.


------

# Higher-order functions 2

- **Higher-order function**:  are functions that return another function or take another function as an argument. 

- Higher-order functions let the programmer use powerful and flexible abstractions.
  - abstracts away similar structures of functions and leave specific mapping up to function's caller. 
  - `map` does this : it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. It does that by providing a function as an argument. 
  
  - `map` method, along with several other array methods, are higher-order functions since it takes another function as argument. 
  
- Function factories can be higher- order functions. 

  - You can think of a function that returns another function as a function factory: it creates and returns a new function.
  - Typically, the function factory uses the arguments you pass to it to determine the specific job performed by the function it returns.

- All higher-order functions are first class functions. 

- Example

  - Let's pretend that we don't have a `map` method on JavaScript arrays. If we want to implement some code that squares all the elements of an array, we'd probably come up with something like this:

  ```js
  function mapNumsToSquares(nums) {
    let squaredArray = [];
  
    for (let index = 0; index < nums.length; index++) {
      let current = nums[index];
      squaredArray.push(current * current);
    }
  
    return squaredArray;
  }
  ```

  - Suppose that we need another function that uppercases all the elements in an array of strings. The solution may look like this:

  ```js
  function uppercaseStrings(strings) {
    let capStrings = [];
  
    for (let index = 0; index < strings.length; index++) {
      let current = strings[index];
      capStrings.push(current.toUpperCase());
    }
  
    return capStrings;
  }
  ```

  - The only significant difference between these two functions is line 6 of each function where we either square a number or uppercase a string; everything else follows the same general structure:

    - Declare and initialize the result array.

    - Iterate over the input array.
      - Add mapped values to the result.

    - Return the result.

  - That's what `map` does for us: it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. It does that by providing a function as an argument. The result is much more powerful and versatile:

    ```js
    arrayOfNums.map(num => num * num);
    arrayOfStrings.map(string => string.toUpperCase());
    ```

    

#### First Class Functions

- **first-class functions** or **first-class objects**:   means that functions are treated like any other variable: functions in JavaScript are values that we can assign to variables and properties, pass them to other functions, or return them from another function.
- Functions in JavaScript are first-class values, just like any other value in JavaScript. You can use them any place that you can use an expression. 

- First class functions have these characteristics ( from summary)

  - You can add them to objects and execute them in the respective object's context.
  - You can remove them from their objects, pass them around, and execute them in entirely different contexts.
  - Execution context of functions: **They're initially unbound</u>** but dynamically bound to a context object at **execution time**.

------

# Method and property lookup sequence 2

### Prototypes

- **prototype**: the object that you inherit properties and methods from.

- All objects in JavaScript inherit from another object called the prototype. Since the prototype of an object is also an object, the prototype can also have a prototype from which it inherits. 
- Although factory functions are useful to extract code into one place so multiple objects can use it, JavaScript relies heavily on prototypes. 
- In JavaScript, objects can inherit properties and behavior from other objects. If another object, for instance, has a `language` property and a `speak` behavior, a new object can access and use `language` and `speak` without explicitly defining them in the new object. 
- Methods used

  - `Object.create()`: creates a new object that inherits properties from a prototype object.
  - `Object.setPrototypeOf()`: `Object.setPrototypeOf(obj, prototype obj)`: sets the prototype object of an object.
  - `Object.getPrototypeOf()`: takes an object as an argument and returns its prototype object:
  - `Object.prototype.hasOwnProperty()` to prove that an object doesn't have a property of its own.

##### prototypal inheritance & prototypal delegation

- Example

  ```js
  let a = {property1: 1};
  let b = {};
  
  Object.setPrototypeOf(b, a); // a is the prototype object
  console.log(b.property1); // 1
  console.log(b.hasOwnProperty(`property1`)); // false
  console.log(Object.getPrototypeOf(b)); // object referenced by a
  
  let c = Object.create(b);
  console.log(c.hasOwnProperty(`property1`)); // false
  console.log(c.property1); // 1 
  ```

- Q: Why prototypal inheritance / delegation? 
  - Prototypal inheritance allows for memory efficiency. It saves memory when an object inherits from another object, rather than objects having an own copy of every property. 
  - One example is how constructors create objects that inherit from constructor's prototype object. So instance objects created by a constructor can have own properties as well as inherited properties, unlike factory functions where inheriting objects must have an own copy of every property.
    - constructors have a prototype property that references an object that instance objects inherit from. 
    - So properties defined on the constructor `prototype` object are shared through the prototype chain. 
    - Instance methods are usually stored in the constructor's `prototype` object rather than directly on the instance object. 

- **Prototypal delegation**: inheriting objects delegate property and method access to its prototype. 

  - objects lower in the prototype chain can delegate property and method access to prototypes higher up in the prototype chain. 
  - Objects lower in the chain inherit properties and behaviors from objects in the chain above.  
  - Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain.
  - Process
    - If the requested property isn't found, the object delegates the request to the object's prototype object.
    - If the requested property isn't there either, the prototype object delegates the request to its own prototype object. 
    - This process follows the prototype chain until the property or method is found or the end of the prototype chain is found.

- **Prototypal inheritance**: a feature in JS where an object can inherit the properties and methods of another object (the prototype object). 

  - Also known as **object inheritance** since it works with one object at a time.

  - The function `object.create` creates a new object that inherits properties from the prototype object.  

    - It takes an object called the **prototype object** as argument, and returns a new object that inherits properties from the prototype object. 
    - The newly created object has access to all properties and methods that the prototype object provides. 
    - unusual aspect is that the **inheriting object** (b) doesn't receive properties or methods of its own. Instead, it **delegates** property and method access to its prototype. 


    ```js
    let a = {
      foo: 1,
      bar: 2,
    };
    
    let b = Object.create(a);
    b.foo; // => 1
    ```
    
    ```js
    > let a = { foo: 1, bar: 2 }
    undefined
    
    > let b = Object.create(a)
    undefined
    
    > b.foo
    1
    
    > b
    {} // b doesn't have its own properties or methods.
    ```

  - can use `hasOwnProperty` to prove that `b` doesn't have properties of its own. 

  - The `hasOwnProperty` method is available on all JavaScript objects. It takes the name of a property as a string and returns `true` if the object has a property by that name, `false` if it does not.

    ```js
    let a = {
      foo: 1,
      bar: 2,
    };
    
    let b = Object.create(a); // b the is inheriting object of prototype object a
    
    console.log(a.hasOwnProperty('foo')); // => true
    console.log(b.hasOwnProperty('foo')); // => false
    ```

  - An object's internal `[[Prototype]]` property points to its prototype object, and the object can delegate method calls to that prototype object. 

##### `[[Prototype]]`  property

- Definition: objects hold a *reference* to their prototype objects through their internal `[[Prototype]]` property. 

- JavaScript objects use an internal `[[Prototype]]` property to keep track of their prototype. When you create an object with `Object.create`, the new object's `[[Prototype]]` property gets assigned to the prototype object.
  - `[[Prototype]]` is an *internal property* : you cannot access it directly in your code. 
  - However, you can access and replace its value with `Object` functions. 
  - For instance, `Object.getPrototypeOf` takes an object as an argument and returns its prototype object:

```js
> Object.getPrototypeOf(b)
{ foo: 1, bar: 2 }
```

- You can use `Object.setPrototypeOf(obj)` to set the prototype object of an object:
  - This is effectively the same as using `Object.create`. 
  - Difference is, this is used to set the prototype for an object that already exists. 

```js
let a = {
  foo: 1,
  bar: 2,
};

let b = {};
Object.setPrototypeOf(b, a); // a is the prototype object

console.log(b.foo);                    // => 1
console.log(b);                        // => {}
console.log(Object.getPrototypeOf(b)); // => { foo: 1, bar: 2 }
```

- objects hold a *reference* to their prototype objects through their internal `[[Prototype]]` property
  - If the object's prototype changes in some way, the changes are observable in the inheriting object as well. 

```js
let a = {
  foo: 1,
  bar: 2,
};

let b = {};
Object.setPrototypeOf(b, a);
console.log(b.foo); // => 1

a.foo = 42;
console.log(b.foo); // => 42

a.baz = 12;
console.log(b.baz); // => 12
```

##### The Default Prototype 

##### `Object.prototype`

- The default prototype object is the prototype of all objects created using object literal syntax `{}` or `{a:2}`

- The default prototype is the prototype object of the `Object` constructor. 

  - For now, know that `Object.prototype`  provides the default prototype object. 
  - That means the default prototype is the object referenced by `.prototype` property of the `Object` constructor. 
  - This object is the "highest" in the prototypal chain of an object. 

- All JavaScript objects have access to the `hasOwnProperty` method. But where does JS get that method? Because when we create a new object, we don't have to add our own `hasOwnProperty` method. 

  - JavaScript obtains the method from the object's prototype.

- All JavaScript objects inherit from a prototype. 

  - By default, all object literals inherit from `Object.prototype` constructor. 

- Passing an empty object to `Object.getPrototypeOf()` returns a reference to the **default prototype** object. 

  ```js
  Object.getPrototypeOf({});
  ```

  - Example:

  ```js
  > let a = {}
  undefined
  
  > Object.getPrototypeOf(a)
  {} // a default prototype object, which is the object returned by Object.prototype
  ```

- If you run `Object.getPrototypeOf({})` from Node, it displays `{}`; however, that's merely Node's rendering of the returned object. The object is, in fact, not empty, but has a variety of methods like `hasOwnProperty` and `toString()`.

- `Object.prototype.name === undefined` `Object.prototype` doesn't have a name property. 

##### Iterating Over Objects with Prototypes

- Now is an excellent time to revisit the [Iteration](https://launchschool.com/books/javascript/read/objects#iteration) section from the Objects chapter of our Introduction to Programming With JavaScript book. It discusses the impact of object prototypes on iteration. In particular:
  - A `for/in` loop iterates over an object's properties. The iteration includes properties from the objects in its prototype chain. Use `hasOwnProperty` to skip the prototype properties.
  - `Object.keys` returns an object's "own" property keys -- you do not need to use `hasOwnProperty`.

- Note that both `for/in` and `Object.keys` deal with **enumerable properties**: properties you can iterate over. 
  - Not all properties are enumerable. In particular, most properties and methods of the built-in types are not. 
  - Usually, any properties or methods you define on for an object are enumerable. You can check whether a property is enumerable with the `Object.prototype.propertyIsEnumerable` method. ( don't have to remember this)

```js
let arr = [1, 2, 3];
console.log(arr.propertyIsEnumerable('length'));                     // false
console.log(arr.propertyIsEnumerable('2'));                          // true
console.log(arr.propertyIsEnumerable('forEach'));                    // false
console.log(Array.prototype.propertyIsEnumerable('forEach'));        // false

function Foo() {
  this.bar = "qux" // assigning 'qux' to property bar, from inside Foo method. Property belongs to an object that contains Foo method. 
}

Foo.prototype.baz = function() {}; // ???
let foo = new Foo(); // defining a new function object called foo which is a prototype of Foo
console.log(foo.propertyIsEnumerable('bar'));                        // true
console.log(Object.getPrototypeOf(foo).propertyIsEnumerable('baz')); // true
```

##### Reminder: Functions are objects

- JS does not have classes, and functions are actually objects. 
- The difference between objects and function objects is that function objects are callable. 

##### What is prototype chain

###### Definition

- **prototype chain**: is a chain of objects that are prototypes of an object. 

  - The prototype chain is how objects inherit properties from other objects. Each object has a private `[[Prototype]]` property which holds a link to another object called its prototype. Since the prototype of an object is also an object, the prototype can also have a prototype from which it inherits.  Objects lower in the chain inherit properties and behaviors from objects in the chain above. 
  - The complete prototype chain also includes the default prototype, which is the prototype of object `a` in this case. 
  - The prototype chain ends with `Object.prototype`.
  - Since the prototype of `Object.prototype` is `null`, the complete prototype chain looks like this: 
  
  ```
  c --> b --> a --> Object.prototype --> null
  ```
  
  - `null` has no prototype and acts as the final link in the prototype chain. (??)

###### What it's used for

- The prototype chain is used to look up and access properties, which is done through **prototypal delegation**: objects lower in the prototype chain delegate property and method access to prototypes higher up in the prototype chain.

###### Advantage / Why prototype Chain

- The prototype chain allows us to store an object's data and behaviors not just directly in the object itself, but anywhere in the prototype chain. 
- The prototype chain increases memory efficiency because properties can be shared through the prototype chain, rather than every object needing an own copy of each property. 
- Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above. 

###### Property Look up Sequence

- Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above. 

- When you access a property on an object, JavaScript looks for the property first in the object, and if it's not a property directly owned by that object, JavaScript looks for it in that object's prototype chain, all the way up to `Object.prototype`.If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`. 

- In detail, when I try to access a property on an object, JavaScript first looks for an "own" property with that name on the object. 
  - If the object does not define the specified property, JavaScript looks for it in through the prototype chain. 
  - This means searching object's prototype(the object pointed to by the internal `[[prototype]]`  or `__proto__`  property) then if it can't find, it looks for it in the prototype's prototype.  
  - This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.

- When two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence.

  - An object can override a property of its parent by setting the property on itself.
  - A downstream object overrides an inherited property if it has a property with the same name. 
    - An object lower in the prototype chain overrides an inherited property if it has a property with the same name.
  - (Overriding is similar to shadowing, but it doesn't completely hide the overridden properties). 

- What happens when you set a property to a different value? 

  - Property assignment creates a new "own " property in the object.
    - It assumes that the property belongs to the object named to the left of the property name. 
    - Even if the prototype chain already has a property with that name, it assigns the "own" property. 

- Code examples

  ```js
  let a = {
    prop1: 1,
  }
  
  let b = Object.create(a);
  b.prop2 = 2;
  
  console.log(b.prop1); // 1
  ```

  - On line 8, JS doesn't find property `prop1` on `b`, so it looks for the property in `b`'s prototype, `a`. In other words, `b` delegates the property access of `prop1` to it's prototype object `a`. JavaScript finds `prop1` in `a` and returns that value.  and `a`'s prototype object is the default prototype. 

  ```js
  let a = {
    foo: 1,
  };
  
  let b = {
    foo: 2,
  };
  
  Object.setPrototypeOf(b, a);
  
  let c = Object.create(b);
  console.log(c.foo); // => 2;
  // Line 12 logs the value of property `foo` in object c. Object c is lowest in the prototype chain and inherits property `foo` from it's prototype object b. A property with same name `foo` also exists in object a, which is the prototype object of b. Since b is closer to the calling object than a, it takes precedence and the value of property `foo` in object b is logged to the console. 
  
  // A downstream object overrides an inherited property if it has a property with the same name. Object b inherits property `foo` from object a, but because it has an own property with the same name 'foo', object b overrides the inherited property. 
  ```

###### Code example of prototype chain

```js
let a = {one : 1};
let b = {two : 2};
let c = {three: 3};

Object.setPrototypeOf(b, a);
Object.setPrototypeOf(c, b);

console.log(c.one); // 1
```

On line 8, when JavaScript tries to access `one` on object `c`, it doesn't find it on `c` directly so it looks through `c`'s prototype chain. It first looks in `c`'s prototype `b`, referenced by `c`'s internal `[[prototype]]` property. We can access `b` using `c.__proto__`or the `Object` constructor method`Object.getPrototypeOf(c) `. It doesn't find it on `b`, so it looks for the property on `b`'s prototype. It goes through the entire prototype chain until it reaches `Object.prototype`, if `Object.prototype` doesn't define the property, then it returns `undefined`. 

###### Implications

- Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well.

Code Example

```js
let a = {
  foo: 1,
};

let b = {
  bar: 2,
};

let c = {
  baz: 3,
};

Object.setPrototypeOf(c, b);
Object.setPrototypeOf(b, a);

console.log(c.bar); // => 2
console.log(c.foo); // => 1
```

- In this code,  `c` inherits from object `b` which, in turn, inherits from `a`. 

  - Stated differently, `b` is the prototype of `c` and `a` is the prototype of `b`
  - All properties that you can access on `a` or `b` are now available on `c`.
- We say that objects `b` and `a` are part of the **prototype chain** of object `c`

------

##### The `__proto__` Property 

- The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property.
- Older JS programs use a property called  `__proto__`: **dunder proto** instead of `Object.setPrototypeOf` and `Object.getPrototypeOf`. 
  - "dunder" is shortented version of "double underscore".
  - The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property.
- As a rule, you should only use `__proto__` if you need to support very old browsers or old versions of Node, or as a convenient shortcut with temporary code or debugging operations. 

------

##### Property Assignment

- Property assignment creates an 'own' property on an object even if the prototype chain already has a property with the same name. 

What happens when you set a property to a different value? 

- When assigning a property on a JavaScript object, the property is always treated as an "own" property. 
  - It assumes that the property belongs to the object named to the left of the property name. 
  - Even if the prototype chain already has a property with that name, it assigns the "own" property. 

```js
console.log(c.hasOwnProperty('foo')); // => true, foo becomes an "own" property of c. 
```

- Inheriting properties from other objects also applies to methods. Methods in JS are merely properties that refer to functions (object properties with function values). So when we discuss object properties, that also means methods. 

```js
let a = {
  foo: 1,
};

let b = {
  foo: 2,
};

Object.setPrototypeOf(b, a);

let c = Object.create(b);
console.log(c.foo); // => 2
c.foo = 42;
console.log(c.foo); // => 42 c.foo is now 42 
console.log(b.foo);

// Line 14 logs 42, value of property `foo` in object c. On line 13, a property with name `foo` is assigned to object c which means that the property is now treated as an 'own' property of object c. So even though object c inherits a property name `foo` from it's prototype object b, object c now overrides the inherited property since it has an own property with the name `foo`. 
```

##### Implications

-  Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well. 

-  This means that inherited objects can never alter prototype properties ( downstream objects can't alter upstream properties)
-  But altering a prototype object's property alters the property of an inherited object, because inherited objects are using prototype chain to look up the value of property. 
-  Property assignment creates a new "own" property in the object. 
-  For property look up, it stops at `Object.prototype`, but the complete prototype chain is `null` at top? 

##### Methods on Object.prototype

- The `Object.prototype` object is at the top of all JavaScript prototype chains. That means its methods are available from any JavaScript object, as long as you don't use `null` as the prototype object. 

  3 useful (instance) methods

  - `Object.prototype.toString()` returns a string representation of the object.
  - `Object.prototype.isPrototypeOf(obj)` determines whether the object is part of another object's prototype chain.
  - `Object.prototype.hasOwnProperty(prop)` determines whether the object contains the property.

###### `toString()` method

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

- Syntax

  ```js
  toString();
  ```

- Return value: a string representing the object. 

- An object's `toString()` method is most commonly invoked when that object undergoes...

  - explicit [type conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion) to a string 

    ```js
    String(obj);
    ```

  - implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) into a string

    ```js
    let obj = [];
    console.log(`${obj}`); // implicit type coeorcion in string interpolation
    ```

- While not as common, the method can be invoked directly (for example, `myObject.toString()`).

- By default `toString()` returns `"[object Type]"`, where `Type` is the object type.

  ```
  const o = new Object().toString() // o is "[object Object]";
  ```

- Can override `toString` by creating a function in place of it. 

  - creating a custom `toString` inside of the constructor / class of the instance object. 

  ```js
  // from OO 21.js
  toString() {
   if (this.isHidden()) return "Hidden";
   return `${this.getRank()} of ${this.getSuit()}`;
  }
  ```

- array.toString()

  ```js
  [1, 2, 3].toString(); // 1,2,3
  ```

  

##### Objects Without Prototypes

- Several times we've said that JavaScript objects all have a prototype object and that the prototype chain ends with `Object.prototype`
  -  In reality, there is a way to create objects that don't have a prototype and, hence, do not have a prototype chain that ends with `Object.prototype`.
- Do this by setting the prototype to `null`. `Object.create(null)`
  -  It lets you create a "clean" or "**bare**" object for use as a general key/value data structure.
  -  The bare object doesn't carry around a bunch of excess baggage in the form of unneeded properties and prototypes:

```js
> let a = Object.create(null)
undefined

> Object.getPrototypeOf(a)
null
```

- However, note that 

  - Objects created in this way do not have access to Object methods like (static & instance methods of Object) `Object.prototype.hasOwnProperty` or `Object.prototype.toString`. 
  - They also don't have a prototype chain that ends with `Object.prototype` -- it ends with `null`.
  - Remember: `object.prototype` is a downstream object in the prototype chain, which itself has prototype object `null`. So creating an object with `null` as its prototype means it doesn't inherit from `Object.prototype`. 

- For the most part, you can assume that all JavaScript objects have `Object.prototype` at the top of their inheritance chain

  - You can also assume that all objects can use the usual selection of `Object` properties. 
  - However, be wary of situations where bare objects may be in use. If you have bare objects in your program, you must remember that the usual Object properties and methods don't exist on those objects. That's why you sometimes see code like this:

  ```js
  if (Object.getPrototypeOf(obj) && obj.isPrototypeOf(car)) {
    // obj has a non-null prototype AND
    // obj is in the prototype chain of car
  }
  ```

  - Side note
    - `Object.getPrototypeOf(obj)` static method
    - `Object.prototype.isPrototypeOf` instance method
  - If you don't first check whether `obj` has a non-`null` prototype, this code will raise an exception if `obj` has a `null` prototype. Even this code won't work properly if `obj` inherits from an object whose prototype is `null`.

##### Summary

- JavaScript objects can inherit properties from other objects. 
  - The object that another object inherits properties from is its prototype. 
  - In most cases, we use `Object.create` to create objects whose prototype we need to set explicitly. 
  - We can also use `Object.setPrototypeOf` to set the prototype of an object that already exists.
- By default, all object literals inherit from `Object.prototype`.
- When you access a property on an object, JavaScript looks for the property first in the object, then its prototype chain, all the way up to `Object.prototype`.

##### Q A 

**Q: How do you create an object that doesn't have a prototype?** 

```js
let bareObj = Object.create(null);
```

**Q: How can you determine whether an object has a prototype?**

```js
if (Object.getPrototypeOf(obj)) {
  // obj has a prototype
} else {
  // obj does not have a prototype
}
```

 **Q: What value does `Object.getPrototypeOf({})` return?**

The default prototype object.

**Q: Does changing a property in a prototype object change the property in the inherited object?**

A: Yes. Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well. (The inherited object is accessing properties from a prototype object. )

- Reassigning a property in prototype object changes the property in the inherited object, as long as the property is not the inherited object's "own" property. 

  ```js
  let cat = {
    says: 'meow',
  };
  
  let dog = {};
  
  Object.setPrototypeOf(dog, cat); // Prototype of dog is set to object cat.
  
  cat.says = 'woof woof'; 
  
  console.log(cat.says); // woof woof
  console.log(dog.says); // woof woof
  ```

- However, assigning a property to an inherited object means the property becomes an "own" property of the inherited object, even if property has same name as a property in prototype object. 

```js
let cat = {
  says: 'meow',
};

let dog = {};

Object.setPrototypeOf(dog, cat);

dog.says = 'woof'; // says is assigned to dog object as "own" property. 

console.log(cat.says); // meow
console.log(dog.says); // woof
```

- Or if same property name already exists, it's the object's "own " property. 

```js
let cat = {
  says: 'meow',
};

let dog = {
  says:' woof' // Object dog has an own property 'says' and overrides the inherited property from prototype cat. 
};

Object.setPrototypeOf(dog, cat);

console.log(cat.says); // meow
console.log(dog.says); // woof
```

**Q: What happens if you alter prototype property from inherited object?** XX

A: Inherited objects can never alter prototype properties, because you are unable to reassign the prototype object's property value, by using an inherited object identifier. When you access the prototype object value by the inherited object's identifier to reassign something you instead assign a property to the inherited object, which becomes inherited object's "own" property. 

```js
let cat = {
  says: 'meow',
};

let dog = {};

Object.setPrototypeOf(dog, cat);

dog.says = 'woof'; // says is assigned to dog object as "own" property. 

console.log(cat.says); // meow
console.log(dog.says); // woof
```

------

# Methods and properties; instance and static methods and properties 1, 3

 #### Methods

- **Methods**  are object properties that have function values. 
- You can use any valid JavaScript value, including a function object (method ) or another object, as the value of a property in an object.
- If you access the method property without function invocation syntax `()`, it will return the function definition.


```js
const cat = {
  name() { // property key is name, and value is a function. 
    return "Butterscotch";
  },

  age() { // property name is age, and value is a function. 
    return 13;
  },
};
```

```js
let b = {};

let a = {
  prop1: 1, 
  prop2: b, // property value is an object
};

console.log(a);
```

#### Overriding

- Definition: Overriding is when an object lower in the prototype chain redefines a method or property that an object higher in the prototype chain defines. When we set a property on an object lower in the prototype chain, that is overriding.

  ```js
  let a = {one: 1};
  let b = Object.create(a);
  b.one = 1;
  console.log(b.hasOwnProperty('one')); // true
  
  // The one property in object b overrides the one property in object a.
  // b is lower in the prototype chain because it inherits from a.
  ```

- When a class redefines a method that a superclass defines, we call this "**method overriding**."

  - When method overriding occurs, instance object created by sub-type class will use that method instead of looking up the prototype chain and finding it in the super-type class.

- When two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence. 

  - An object can override a property of its parent by setting the property on itself.
  - A downstream object overrides an inherited property if it has a property with the same name. 
  - (Overriding is similar to shadowing, but it doesn't completely hide the overridden properties).
- Method overriding can be prevented in class syntax by calling `Super` . 

#### Property syntax : defining properties

- Syntax errors when trying to define properties in an object. 

  - `this` is a keyword that refers to an object that is the current **execution context** of a function or method that is running. 

  ```js
  // All of these cause syntax error when trying to define the properties in the object. 
  
  let cat = {
    this.name: "Butterscotch", // property names are strings and cannot be this.something
    this.age: 13,
  };
  
  let cat = {
    name = "Butterscotch", // incorrect syntax to define property in an object.
    age = 13
  };
  ```

  ```js
  // These work except `this` references the global object
  function cat() {
    this.name = 'Butterscotch';
    this.age = 13;
  }
  
  let cat = {
    name: this.name; 
  }
  
  function createPet(pet, name) {
    return {
      pet: pet, 
      name: this.pet; 
    }
  }
  ```

- Can use short hand notation when property and variable have the same name. 

  ```js
  function createBook(title, author) {
    return {
      title: title,
      author: author,
  
      getDescription: function() {
        return `${this.title} was written by ${this.author}.`;
      },
    };
  }
  ```

  ```js
  function createBook(title, author) {
    return {
      title,     // same as `title: title,`
      author,    // same as `author: author,`
  
      getDescription: function() {
        return `${this.title} was written by ${this.author}.`;
      },
    };
  }
  ```

#### Add property 

- The correct terminology is **add** new properties to object by giving it a value 
  - not "declare" or "assign" new properties. 
  - assignment is when you assigns a value to a variable's left operand based on the value of its right operand. `this.property = value` 
- The `delete` keyword deletes a property from an object

#### Accessing Properties

- **member access notation** (**dot notation**)

  - Syntax

    ```js
    objectName.propertyName
    ```

  - Requires valid variable names. 

  - Don't use this notation if the property is supposed to be a variable!!

  - ```js
    // my solution, doesn't work
    function assignProperty(obj, prop, value) {
      while (obj !== null) {
      	if (obj.hasOwnProperty(prop)) {
          obj.prop = value; // bug here!! Dot notation doesn't work for variable properties
          break;
        }
        obj = Object.getPrototypeOf(obj);
    	}
    }
    ```

- **computed member access notation** (**bracket notation**). 

  - can use string or variable

    ```js
    objectName["propertyName"]
    objectName[propertyVariable]
    ```

  - Can take any UTF-8-compatible string as the key. 

  - Can be computed on the fly -- any expression between the brackets gets evaluated as a string and used to reference the property. 

  ```js
  obj['a-key'] = 'four';
  
  obj.a-key 						 // SyntaxError(a-key is not a valid variable name)
  obj['a' + '-' + 'key'] // 'four'
  ```

#### Property Existence

- We get `undefined` when accessing a non-existent property. However we also get same value if we try to access a property set to `undefined`. 

- Two ways to distinguish a non-existent property from a property with value of `undefined`: 

  - The **`in` operator** : returns `true` if the specified property is in the specified object or its prototype chain.

    - prop: A string or symbol representing a property name or array index (non-symbols will be coerced to strings).

    ```js
    // syntax, remember the quotes
    'prop' in object 
    'propertyName' in object
    arrayIndex in array
    ```

  - `hasOwnProperty` (is an instance method): Returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).

    - `Object.prototype.hasOwnProperty()` method

    ```js
    obj.hasOwnproperty() // syntax
    ```

    ```js
    Object.keys(obj) = ['7', 'false', '1, 2, 3', 'a-key'];
    
    'false' in obj // true
    'true'  in obj // false
    
    obj.hasOwnProperty('7') // true
    obj.hasOwnProperty('8') // true
    ```

- Other ways to check for property existence is to **enumerate**(**iterate** over) the properties of an object.  

  - `Object.keys`: Returns an array of object's <u>own</u> <u>enumerable</u> property names. 
  - `Object.getOwnPropertyNames`: returns an array of <u>all</u> of object's <u>own</u> property names regardless if they???re enumerable or not. (including non-enumerable properties except for those which use Symbol) found directly on an object. 
  - `for...in` iterates over <u>all</u> <u>enumerable</u> properties of an object, including those in prototype chain. 

  ```js
  Object.keys(obj)                    // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
  Object.getOwnPropertyNames(obj)     // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
  ```

|                              | Enumerable | Includes Non-Enumerable | Own  | Prototype Chain |
| ---------------------------- | ---------- | ----------------------- | ---- | --------------- |
| For ??? in loop                | ???          |                         |      | ???               |
| Object.keys(obj)             | ???          |                         | ???    |                 |
| Object.getOwnPropertyNames() |            | ???                       | ???    |                 |

**Enumerable properties**: means the property can be **iterated** over. 

- Not all properties are enumerable. In particular, most properties and methods of the built-in types are not. 
- Usually, any properties or methods you define on for an object are enumerable. 
- You can check whether a property is enumerable with the `Object.prototype.propertyIsEnumerable` method. ( don't have to remember this)
- All properties created by simple assignment or property initializer are enumerable by default. 
- Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. 

```js
let b = {
  prop4: 4,
};

let a = {
  prop1: 1, 
  prop2: 2, 
  prop3: 3
};

Object.setPrototypeOf(a, b);

// Prompt: Check whether property exists in an object
// check whether `prop4` exists in a

// using in operator
console.log('prop4' in a); // true

// Prompt: see if an object contains a property as one of its own. 
// using hasOwnProperty
console.log(a.hasOwnProperty('prop4')); // false

// using Object.keys
let arr = Object.keys(a);
let answer = arr.some(element => element === 'prop4');
console.log(answer); // false

// using for... in loop
let own = false; // own represents whether object contains property as its own
for (let prop in a) {
  if (a.hasOwnProperty(prop)) {
    if (a === 'prop4') {
      own = true;
      break;
    }
  }
}
console.log(own); // false

// using Object.getOwnPropertyNames
let arr2 = Object.getOwnPropertyNames(a);
answer = arr2.some(element => element === 'prop4');
console.log(answer); // false
```

------

#### Instance 

- **Instance **: objects created using any means of defining multiple objects of the same kind. 

  - Objects created by factory functions are considered instances, even if there's no way to test that in code. 

- In JavaScript, "instance" does not have this technical meaning because JavaScript does not have this difference between classes and instances. However, in talking about JavaScript, "instance" can be used informally to mean an object created using a particular constructor function. 

- Must use instance object to invoke instance properties or methods of a constructor, rather than call the constructor directly. 

- **Instance Properties** : properties of an instance object, either as part of an instance object or anywhere in the object's prototype chain. 

  - Properties of instances created by a constructor. 
  - May be stored directly on the instance, or its prototype. Its prototype is `Constructor.prototype`
  - For classes, instance properties must be defined in methods. (see example below).
  - Instance properties are called using an instance of a constructor or class. 

- **Instance Methods**:  (object methods / methods) :stored either as part of an object or anywhere in the object's prototype chain.

  - Methods usually aren't stored directly in instances(on the instance object directly), but rather in the object's prototype object (the object referenced by **prototype** property). 
  - Methods usually aren't stored in the object, but still operate on individual instances so we refer to them as instance methods. 
  - Ordinary methods -- those defined on a prototype object -- are sometimes called **instance methods** or **object methods** since you need an instance of (an object) the type. More commonly, they are simply called **methods**.
  - The methods that use this syntax: `Constructor.prototype.method` are the **instance** methods for the Constructor type. 
    - `forEach` is an instance method of the`Array` constructor. 
  - Instance methods are only available when there's an instance of a constructor / class.

- Constructor and prototype pattern

  ```js
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

- Class pattern

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

#### Static 

[Exam part 1 question 3](https://launchschool.com/exams/19f6d031#qna)

- `static` keyword defines static properties and methods. 

- <u>Must use constructor name</u> to invoke static properties and methods. 

- invoking static methods on an instance of a class results in a `TypeError`. 

- The `static` modifier when used with a method declaration, marks the method as static. That means the method is defined directly on the class, not on the objects the class creates.

- **Static properties** are defined and accessed directly on the <u>constructor</u>, not on an instance or a prototype.

  - Static properties are properties about a constructor. 

  - Typically, static properties belong to the **type** (e.g., `Dog`) rather than to the individual instances or the prototype object.

  - One common use of static properties is to keep track of all of the objects created by a constructor.

    ```js
    function Dog(name, breed, weight) {
      this.name = name;
      this.breed = breed;
      this.weight = weight;
      Dog.allDogs.push(this);
    }
    
    Dog.allDogs = [];
    ```

    - In this case, the static property `allDogs` contains an array with a reference to every dog object created while the program is running. 
    - While `allDogs` maintains a list of all the dogs, it isn't information that is pertinent to a specific dog -- it's information about dogs in general. Therefore, it should be a static property.

  - One well-known example of a static property is the `length` property used by the `String` type.

- **Static methods**: are stored on the constructor or class. 

  - ```js
    Dog.showSpecies = function() {
      console.log(`Dogs belong to the species ${Dog.species}`);
    };
    
    Dog.showSpecies();
    ```

  - You've already seen examples of static methods on built-in JavaScript constructors. `Object.assign`, `Array.isArray`, and `Date.now` are all examples of static methods.

  - Is `forEach`  static method of the `Array` constructor then?

    - No, `forEach` is an instance method of the `Array` constructor, because you are using an instance object (array object) to invoke an instance method of the `Array` constructor, rather than calling the `Array` constructor directly. 

- Constructor and prototype pattern

  ```js
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  }
  
  Rectangle.getDescription = function() { // static method
    return 'A rectangle is a shape with 4 sides''
  };
  
  Rectangle.description = 'A rectangle is a shape with 4 sides'; // static property 
  
  let rect = new Rectangle();
  console.log(Rectangle.getDescription());
  ```

- Class Pattern

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

------

# Built-in constructors like `Array`, `Object`, `String` and `Number` 3

#### The `Array` constructor

- Simplest way to create an array object uses the **bracket syntax**:

  ```js
  > let numbers = [1, 2, 3, 4]
  > numbers
  [ 1, 2, 3, 4 ]
  ```

- Can also use the `Array` constructor:

- Syntax

  ```js
  new Array() // empty array
  new Array(elements, etc...)
  new Array(arrayLength) // [ <arrayLength empty items> ]
  Array() // omit new keyword
  ```

- Calling `new Array()` creates and returns a new array. That array is empty unless you also pass some arguments to the constructor. Each argument you provide gets added to the new array as an element:

  ```terminal
  > let emptyArray = new Array()
  > emptyArray
  []
  
  > let numbers = new Array(1, 2, 3, 4)
  > numbers
  [ 1, 2, 3, 4 ]
  
  > let colors = new Array('green', 'blue', 'yellow')
  > colors
  [ 'green', 'blue', 'yellow' ]
  ```

- The behavior is considerably different when you provide a single *number* argument. In this case, the constructor creates an array with a length equal to the number specified by the argument, but with no actual elements:

  ```terminal
  > new Array(3)
  [ <3 empty items> ]
  ```

  - You can think of `[ <3 empty items> ]` as an array that has three empty slots. In effect, it's an empty array that happens to contain spaces for three items; alternatively, it's a non-empty array that contains no values. Call it Schr??dinger's array if you wish.

  - Note that the single-number form of the constructor does not accept non-integers or negative numbers:

    ```js
    > new Array(3.1415)
    => RangeError: Invalid array length
    
    > new Array(-5)
    => RangeError: Invalid array length
    ```

- The single-number constructor, together with the `Array.prototype.fill` method, lets you create arrays with a value that is repeated in every element:

  ```terminal
  > (new Array(3)).fill('*')
  [ '*', '*', '*' ]
  ```

  - The `fill` method takes any value as an argument and replaces all elements of the array with that value. Note that the parentheses around `new Array(3)` aren't strictly necessary; however, you should use them for clarity. They show your intent to run `fill` on the new array.

- Interestingly, `Array` lets you omit the `new` keyword: (is a **safe scope constructor**)

  ```terminal
  > Array(1, 2, 3)
  [1, 2, 3]
  ```

- Stay consistent and use `new` unless there's a good reason to omit it.

#### `Array.prototype` property

- `Array.prototype` property references the prototype object that the `Array` constructor uses to create array objects. 

- All arrays inherit from the object referenced by this property:

  ```js
  > let numbers = [1, 2, 3] 
  > Object.getPrototypeOf(numbers) === Array.prototype
  true
  // even arrays defined using bracket syntax inherit from Array.prototye
  ```

- This implies that every array can use the methods defined in `Array.prototype`. 

  - In particular, that means that all arrays can use methods like `forEach`, `map`, `includes`, as well as all the other methods defined on `Array.prototype`:

- The methods that use this syntax: `Array.prototype.method` are the **instance** methods for the Array constructor / type. 

  ```js
  > numbers.map(number => number * number);
  [ 1, 4, 9 ]
  
  > numbers.includes(3)
  true
  ```

#### Static Array Methods

- Remember: static methods belong directly to the constructor function; they aren't part of the prototype used to create new objects. 
- As a result, their names don't include `.prototype`. 
- Moreover, you usually use the constructor to invoke the static methods, not the object created by that constructor. 

##### **`Array.isArray`**

- The `Array.isArray` method takes one argument and returns `true` if the argument is an array object, and `false` if it is not:

  ```terminal
  > Array.isArray([])
  true
  
  > Array.isArray({})
  false
  
  > Array.isArray(5)
  false
  ```

- Why do we need it? The `typeof` operator returns `object` when used with an array, so cannot be used to detect an array.

  ```terminal
  > typeof []
  'object'
  ```

  - `Array.isArray` helps distinguish between arrays and other objects.
  - It helps improve readability and show intent.

##### `Array.from`

- The `Array.from` method takes an **array-like object** as an argument and returns a new array with the equivalent element values. 

- Can be used to convert string to an array, to use array methods.

- An **array like object** is  all objects that have a `length` property. 

  - any object that has a `length` property (most important) and provides indexed access to some of its properties with the `[index]` notation. 
  - All objects that have a `length` property is an array like object. 
  - A string object is an array like object.  
    - `String` objects also have a `length` property and use index-based element access.
    - We are able to use a string primitive value to access the properties and methods defined for `String` objects.


  ```node
  > Array.from({length: 3})
  [ undefined, undefined, undefined ]
  ```

  ```node
  > Array.from({0: 'a', 1: 'b', 2: 'c', length: 3})
  ['a', 'b', 'c']
  ```

  ```node
  > Array.from('string')
  [???s???, ???t???, ???r???, ???i???, ???n???, ???g???]
  ```

- In many cases, the `length` property won't self-update if you add or remove properties to or from the object.

- The following code shows one way to implement the logic behind `Array.from`. Studying this code should help you make sense of what `Array.from` does:

  ```js
  let arrayFrom = obj => { // anonymous arrow function, obj is parameter
    let len = obj.length;
    let returnArr = [];
  
    for (let idx = 0; idx < len; idx += 1) {
      returnArr.push(obj[idx]);
    }
  
    return returnArr;
  };
  
  arrayFrom({0: 'a', 1: 'b', 2: 'c', length: 3});
  // => [ 'a', 'b', 'c' ]
  ```

Why would somebody need to do that? It seems silly to create an object that looks like an array but isn't an array. Why bother?

- The use case shown isn't particularly useful, but there are other use cases for `Array.from`. In particular, some functions and methods return objects that resemble arrays in some ways but serve some other purpose. 
- For instance, if you use JavaScript to request a list of elements from your browser, the *DOM* (more on that much later) may return an array-like object called a *node list*. Such objects can store *live* data -- dynamic data that can change without intervention by your code. A simple array wouldn't do the trick here, but a node list does. Better yet, the node list is an array-like object, so `Array.from` can create an array based on its content.
- In the degenerate case, all arrays are themselves array-like objects.
  - **Degenerate**: in the `simplest case`

#### The `Object` constructor

- As with the `Array` constructor, the `Object` constructor creates new objects:

  ```node
  > new Object()
  {}
  ```

  - Is a safe scope constructor: You can invoke `Object` without the `new` keyword, just as you can omit `new` with the `Array` constructor:

  ```node
  > Object()
  {}
  ```

  - To repeat ourselves, omitting `new` is probably not a good practice.

- `Object.prototype`

  - All objects created by the `Object` constructor or with object literal syntax (e.g., `{ a: 1, b: 2 }`, inherit from `Object.prototype`. 

  - Thus, all such objects have access to the instance methods defined in `Object.prototype`. We've already seen some of these methods in action, such as `Object.prototype.hasOwnProperty` and `Object.prototype.isPrototypeOf`.

  - Since arrays are a subtype of objects, <u>all</u> array objects have access to <u>all</u> the methods on `Object.prototype`.

    ```terminal
    > ['a', 'b', 'c'].hasOwnProperty(1) # integer indices are properties of the array. 
    true
    ```

  - You can think of the **integer indices** as properties of the array. In our example, `0`, `1`, `2` are the properties and `'a'`, `'b'`, `'c'` are the values. We can verify that `Array` is a subtype of `Object` by checking whether `Array.prototype` inherits from `Object.prototype`:

    ```node
    > Object.getPrototypeOf(Array.prototype) === Object.prototype
    true
    ```

  **Almost all JavaScript objects, whether built-in or custom-created, inherit from `Object.prototype`(the default prototype), either directly or further down the prototype chain.** 

  - That includes prototype objects of constructors. 

  - Note that we said "almost all"; as discussed in an earlier lesson, it is possible to create objects that don't inherit from `Object.prototype`

    ```js
    let bareObj = Object.create(null); // creates an object without a prototype
    ```

    

  - Another oft-used  method is `Object.prototype.toString`. It returns a string representation of the object that it's called on. Since `toString` is a method on `Object.prototype`, all JavaScript objects -- including arrays, functions, and dates -- inherit this method.
  
    - However, the default behavior of `Object.prototype.toString` is not very useful; it merely returns `[object Object]` for objects that don't override this method to provide smarter behavior:
    - Can override the default`toString()` method by creating a function in place of it. 
  
    ```terminal
    > let obj = { a: 1, b: 2 }
    > obj.toString()
    '[object Object]'   # not very helpful!
    
    > [1, 2, 3].toString() # use on array 
    '1,2,3'
    
    > let func = function hello() {} # use on functions.
    > func.toString()
    'function hello() {}'
    ```

##### `toString()` method

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

- Syntax

  ```js
  toString();
  ```

- Return value: a string representing the object. 

- An object's `toString()` method is most commonly invoked when that object undergoes...

  - explicit [type conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion) to a string 

    ```js
    String(obj);
    ```

  - implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) into a string

    ```js
    let obj = [];
    console.log(`${obj}`); // implicit type coeorcion in string interpolation
    ```

- While not as common, the method can be invoked directly (for example, `myObject.toString()`).

- By default `toString()` returns `"[object Type]"`, where `Type` is the object type.

  ```
  const o = new Object().toString() // o is "[object Object]";
  ```

- Can override `toString` by creating a function in place of it. 

  - creating a custom `toString` inside of the constructor / class of the instance object. 

  ```js
  // from OO 21.js
  toString() {
   if (this.isHidden()) return "Hidden";
   return `${this.getRank()} of ${this.getSuit()}`;
  }
  ```

- array.toString()

  ```js
  [1, 2, 3].toString(); // 1,2,3
  ```

#### Static `Object` Methods

- The list below shows some commonly used static `Object` methods. You've already seen and used several. Feel free to follow the links and read more about these methods, but you don't have to memorize them. Instead, learn what's available. You can look them up later when you need to use them:

  - [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  - [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  - [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
  - [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
  - [`Object.isFrozen`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
  - [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  - [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

#### The `String` constructor

- Why do we need a constructor for strings? Aren't JavaScript strings a primitive type? We know they are since the strict equality operator compares strings by value rather than identity:

  ```terminal
  > 'abc' === 'abc'
  true
  ```

  Two strings with the same characters are considered equal in JavaScript. Equality for objects works by identity, however. Two objects are strictly equal only when they are the same object. Consider:

  ```terminal
  > let arr1 = [1, 2, 3];
  > let arr2 = arr1    // arr1 and arr2 both reference the same object
  > arr1 === [1, 2, 3] // false
  > arr1 === arr2      // true
  # objects are compare by identity, not value
  ```
  
    Interestingly, we can access properties and call methods on strings:
  
  ```terminal
  > 'abc'.length
  3
    
  > 'abc'.toUpperCase()
  'ABC'
  ```
  
  How is that possible given that strings are primitive values? Primitive values aren't objects, so where does JavaScript find those properties and methods?

We'll return to those questions shortly. 

##### Exam question

Q: What is the difference between string primitives and `String` objects? Explain why you can use a string primitive value to access the properties and methods defined for `String` objects.

A: A string primitive's type is `'string'`, but the `String` object's type is `'object'`. JavaScript considers the two types of string as different types. Two string primitives that have the same value are equal, two `String` objects with the same value are not. For example

```terminal
> 'xyz' === 'xyz'
true

> new String('xyz') === new String('xyz')
false
```

We can call use a string primitive value to access the properties and methods defined for String objects, because when we try to access a property or invoke a method on a string primitive, JavaScript wraps the string primitive in a `String` object, then uses the object to access properties or call methods. When the wrapping object has served its purpose, JavaScript discards that wrapping object. Properties and methods will always return strings as primitives.

##### String primitive vs `String` object

- A string primitive's type is `'string'`, but the `String` object's type is `'object'`. JavaScript considers the two types of string as different types. Two string primitives that have the same value are equal, two `String` objects with the same value are not. String objects are compare by identity/ reference, not value. For example

```terminal
> 'xyz' === 'xyz'
true

> new String('xyz') === new String('xyz')
false
```

----

- First, though, we need to learn that JavaScript has two kinds of strings: string primitives and `String` objects. 
- Thus far, all the strings we've created and used have been string primitives. We create string primitives by using quotes (single or double) or back-tick characters to define a string's value. To create a `String` object, on the other hand, we must use the `String` constructor:

```terminal
> let strPrimitive = 'abc'
> typeof strPrimitive
'string'

> let strObject = new String('xyz')
> typeof strObject
'object'
```

That's interesting: a string primitive's type is `'string'`, but the `String` object's type is `'object'`. It's clear that JavaScript considers the two types of string as different types. That difference has implications. Consider this code:

```terminal
> 'abc' === 'abc'
true

> new String('abc') === new String('abc')
false
```

Wow! Two string primitives that have the same value are equal, but not two `String` objects. If you're confused by that, think of poor JavaScript. What's an OOP language to do with weirdness like that? Fortunately, JavaScript is pretty good about remembering what's what.

That still leaves us with a big question: why in the world do we need a `String` object? That goes back to our original question: 

##### How can we call methods on string primitives?

- A: JavaScript invisibly wraps primitives in objects to access methods and properties. 

- Functionally, both string primitive and string object act like objects when you call a method on it such as `'abc'.toLowerCase()` or `(new String('abc')).toLowerCase()`. 

- Q: Why are we able to use a string primitive value to access the properties and methods defined for `String` objects? 

  - The answer is that when you try to access a property or invoke a method on a string primitive, JavaScript *wraps* the string primitive in a `String` object behind the scenes. 

  - Once JavaScript has wrapped your string primitive in a `String` object, it then uses the object to access properties or call methods. When the wrapping object has served its purpose, JavaScript <u>discards</u> it.

  - Properties and Methods always return strings as primitive, so you also don't have to worry about converting `String` objects to primitives. 

- As a general rule, you should not create `String` objects explicitly. That's where you're likely to run into problems with the distinction between string primitives and `String` objects. 
  - However, if you're writing code where you may have to operate on `String` objects, you can use `String.prototype.valueOf()` to retrieve the value of the `String` object as a primitive.
- We are able to call non-mutating array methods on string primitives using `call` or `apply`. 

#### `String` without `new` 

- `String` constructor is not scope safe.

- As with most constructors, with the notable exception of `Array` and `Object`, calling the constructor without the `new` keyword does *not* create an object. In the case of `String`, it simply returns a new string primitive, not an object, when you omit the `new` keyword:

  ```terminal
  > let str = String('abc')
  > typeof str
  'string'
  ```

- If called without `new`, `String` constructor converts arguments to a primitive string. 

```node
> String(obj)
'[object Object]'

> String(undefined)
'undefined'

> String(3.14)
'3.14'

> String([1, 2, 3])
'1,2,3'

> String(a => a * a)
'a => a * a'
```


#### The `Number` and `Boolean` Constructors

- The `Number` and `Boolean` constructors work in much the same way as the `String` constructor (if called with `new`, an object is created, otherwise, it returns the same type as the constructor)

  - When called with `new`, they create `Number` and `Boolean` **<u>objects.</u>** 
  - When called without `new`, the `Number` function converts its argument to a number, and the `Boolean` function converts its argument to a Boolean.

  ```node
  > Number('123');
  123
  
  > Boolean(0);
  false
  
  > Boolean('abc');
  true
  ```

- As with strings, numbers and Booleans both have primitive and object forms, and JavaScript invisibly wraps primitives in objects to access methods and properties. 

- You should also avoid creating `Number` and `Boolean` objects explicitly.

#### Extending Built-in Prototypes

- Change prototypes to add new capabilities to our built-in objects. Best to avoid this though. 

  - Since all JavaScript objects derive their behavior from the prototype objects associated with their constructors, we can add new capabilities to our built-in objects by changing those prototypes. 

  - For example, we can add a `first` method to all arrays by adding it to `Array.prototype`:

    ```js
    Array.prototype.first = function() {
      return this[0];
    }
    
    [1, 2, 3].first(); //=> 1
    ```

  - Since we use the array `[1, 2, 3]` to call `first`, `this` inside the function refers to `[1, 2, 3]`. Thus, the `first` method returns the first element of the array used to call it, or `undefined` if the array is empty.

  - Extending built-in objects is interesting to study, but it's best to avoid doing so. Adding a method like `first` to an array object can confuse other developers working on your project. It can lead to errors when other developers forget or don't realize that your array has an unexpected bonus.

#### Borrowing Array Methods for Strings

##### Summary

- Definition: Can use non-mutating array methods on strings by using `call` or `apply`. 

  - The `call` and `apply` functions don't change a function's logic or return values; they merely change what object the method uses for its context. 
  - Array methods that return an array will still do so even when called on a string value. If you need a string result, you can use `join` to convert the array to a string:
  - Array methods that mutate the array won't work with strings. Again, that makes sense: <u>strings are immutable.</u>

  ```JS
  // syntax 
  let anyArray = []; // can use any array
  let string = 'yes';
  
  string = anyArray.arrayMethod.call(string, callbackFn).join('');
  string = [].arrayMethod.call(string, callbackFn).join('');
  ```

  ```js
  // examples
  [].every.call(string, char => char === 'E'); // => true
  [].filter.call('olives', val => val < 'm'); // [ 'l', 'i', 'e' ]
  [].filter.call('olives', val => val < 'm').join(''); // => 'lie'
  ```

- Another technique not borrowing array method for string, but can convert the string to array to use array methods.

  -  `Array.from` to convert strings to arrays

  ```js
  str = Array.from(str).map(convertCase).join("");
  ```

  - `string.split("")` to convert string to array. 

------

##### Example Problem

[Question 9](https://launchschool.com/quizzes/03e8241a) 0 / 1 Points

Your program needs to change the case of all letters in a string to the opposite case. That is, `Naveed Fida` should be converted to `nAVEED fIDA`. You already have a function called `convertCase` that does this for a single character. It takes a single character as an argument and returns the translated result.

Given the `convertCase` function, which of the following code snippets can be used to convert the string contained by `str`? Select all answers that apply.

- [x] **A** 

```
str = [1, 2, 3].map.call(str, convertCase).join("");
```

This code uses `call` to invoke `map` with `str` as its context, a process that allows `map` to process the individual characters of `str`. Note that we use the array `[1, 2, 3]` to invoke `call`; any array will do.

**B**

```
str = str.map(convertCase).join("");
```

This code attempts to call a `map` method on a string. However, strings don't have a `map` method, and they won't use `Array.prototype.map` without more specific instructions, so this code raises a `TypeError`.

- [x] **C** 

```
str = Array.from(str).map(convertCase).join("");
```

This code uses the `Array.from` static method to convert `str` to an array of characters. That lets us use `Array.prototype.map` and `Array.prototype.join` to translate the characters and recombined them as a string.

**D**

```
str = str.split("").map(convertCase);
```

This code returns an array, not a string.

------------------------------------------------------------------------------------------------------------------------------------------

- First-class functions in a programming language provide several benefits. One significant benefit is that methods aren't tied to a particular object type. 

- Using explicit context-binding techniques, we can apply a method to a different object type than the one that defines the method. 

- This "method borrowing," however, doesn't make sense for every object and every method. For example, it doesn't make sense to use the `getDay` date method on an array.

- Array methods, however, are surprisingly useful with `String` objects. 

  - We can borrow many array methods to manipulate `String` objects. Consider the following code:

  ```js
  let string = 'EEE';
  Array.prototype.every.call(string, char => char === 'E'); // => true
  ```

- JavaScript strings don't have an `every` method, but we can use `Array.prototype.every` on our string by using `call` or `apply`. Here, we use `every` to determine whether the string `EEE` contains all `E` characters.

- We can shorten that expression noticeably by using an empty array instead of `Array.prototype` as the calling object:

  ```js
  [].every.call(string, char => char === 'E'); // => true
  // invoking every() with string as its context 
  ```

##### Why does method borrowing work? 

- Array method borrowing works because `String` objects also have a `length` property and use index-based element access. `this` inside array methods refers to the context, which now is a string. 

Let's look at a simplified implementation of `Array.prototype.every`:

```js
Array.prototype.every = function(callback) {
  for (let index = 0; index < this.length; index++) {
    if (!callback(this[index])) return false;
  }

  return true;
};
```

- Note how the method uses `this` to access the length and elements of the array(which is a string). Since `String` objects also have a `length` property and use index-based element access, this code works with strings as well as arrays.
- `this` refers to the context, which is a string. 

Let's see another example:

```js
[].filter.call('olives', val => val < 'm'); // [ 'l', 'i', 'e' ]
```

- Notice that the `filter` method returns an array, even though we called it on a string.

- The `call` and `apply` functions don't change a function's logic or return values; they merely change what object the method uses for its context. Array methods that return an array will still do so even when called on a string value. If you need a string result, you can use `join` to convert the array to a string:

  ```js
  [].filter.call('olives', val => val < 'm').join(''); // => 'lie'
  ```

- Note that not all array methods can operate on strings. Consider the following example:

  ```js
  let ingredients = 'olives';
  [].push.call(ingredients, ' and pepper');
  // TypeError: Cannot assign to read only property 'length' of object '[object String]'
  ```

- Array methods that mutate the array won't work with strings. Again, that makes sense: strings are immutable.

------

# `Object.assign` and `Object.create`

#### Object.assign

- Definition: 

  - Merges two or more objects into a single object and returns a reference to the modified object. 
  - The **`Object.assign()`** method copies all [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable) [own properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) from one or more *source objects* to a *target object*. It returns the modified <u>target</u> object
  - Target object is mutated!

- Syntax 

  ```js
  Object.assign(targetObj, obj)
  Object.assign(target, ...sources)
  Object.assign(Constructor.prototype, mixIn, mixIn ...)
  ```


Uses

- One **object factory** can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.

  - Example:  Humans have a name and age and they can also walk and talk. Using factory functions, write the code needed so that human objects can reuse the `walk` and `talk` methods that humanoids use. Both humanoids and humans should get the methods from the same source. 

  ```js
  function robots(intelligence, modelNumber, canSolveProblems) {
    return {
      intelligence: intelligence,
      modelNumber: modelNumber,
      canSolveProblems: canSolveProblems,
    };
  }
  
  let mixIn = {
    walk() {
      console.log('walk');
    },
    
    talk() {
      console.log('talk');
    },
  };
  
  function humanoids(intelligence, modelNumber, canSolveProblems) {
    let robot = robots(intelligence, modelNumber, canSolveProblems);
    let obj = {};
    Object.assign(obj, robot, mixIn);
    return obj;
  }
  
  function humans(name, age) {
    let obj = {};
  	Object.assign(obj, mixIn)
    
    obj.name = name;
    obj.age = age;
  
    return obj;
  }
  
  console.log(humans('emily', 21)); // example humans object
  ```

- `Object.assign` overrides methods and properties with same name, based on the latest argument obj passed. 

  ```js
  function robots (modelNumber) {
    return {
      modelNumber: modelNumber, 
      walk () {
        console.log(`cannot walk`);
      }
    };
  }
  
  let mixIn = {
    walk() {
      console.log(`can walk`);
    }, 
    
    talk() {
      console.log(`can talk`);
    },
  }
  
  function humanoids(modelNumber) {
    let obj = {};
    let robot = robots(modelNumber);
    Object.assign(obj, robot, mixIn);
    return obj;
  }
    
   
  function humans(name, age) {
  	let obj = {};
    Object.assign(obj, mixIn);
    obj.name = name; 
    obj.age = age;
    return obj;
  }
  
  let robot = robots(100);
  robot.walk(); // cannot walk
  
  let humanoid = humanoids(101);
  humanoid.walk(); // can walk
  
  // console.log(humans('emily', '21'));
  ```

  

- Can shorten arguments in a constructor by merging object argument with the instance object. 

  ```js
  function Car(args) { 
    Object.assign(this, args); // merges the two objects into single object. `This` refers to instance object
  
    this.drive = function() {
      this.started = true;
    };
  
    // rest of the methods
  }
  ```

  ```js
  function Car(args) { // object argument with many properties
    this.make = args.make; // Use Object.assign() instead of all this code 
    this.model = args.model;
    this.year = args.year;
    this.color = args.color;
    this.passengers = args.passengers;
    this.convertible = args.convertible;
    this.mileage = args.mileage;
    this.started = false;
  
    this.drive = function() {
      this.started = true;
    };
  
    // rest of methods
  }
  ```

- Mix-ins

  ```js
  Object.assign(Constructor.prototype, mixIn, mixIn ...)
  ```

  - A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all of the methods in the object.
  - The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix* that object *into* another object.
    - Aka: Move code shared by 2 (or more) classes into a mix-in object then `Object.assign` the `.prototype` object of all the classes which share the code, with the mix-in Object. 

  ```js
  const Swimmable = { // mix-in object
    swim() {};
  }
  
  const Flyable = { // mix-in object
    fly() {};
  }
  
  Class Bird {}
  
  class Parrot {} // no inheritance here 
  Object.assign(Parrot.prototype, Flyable); // one trait 
  
  class Duck{}
  Object.assign(Duck.prototype, Swimmable, Flyable); // both traits.
  ```

#### Object.create

- Is a static method of the Object Constructor

- It takes an object called the **prototype object** as argument, and returns a new object that inherits properties from the prototype object. 

- Definition: The function takes a prototype object as argument, and creates a new object that inherits properties from the prototype. 

  - Creates a new object whose `[[Prototype]]` property references the argument.

  ```js
  Object.create(obj)
  ```

- When using `Object.create` , we must manually define a `constructor` property on the new object. 

  -  `Object.create` is used to make one constructor a **sub-type** of the other, the **super-type**. Then restore the `constructor` property of the **sub-type**'s prototype object back to the **sub-type** function. 

- `Object.create` is used in prototypal inheritance

  - Use `object.create` to create a new object that inherits properties from the prototype object.  
    - It takes an object called the **prototype object** as argument, and returns a new object that inherits properties from the prototype object. 
    - The newly created object has access to all properties and methods that the prototype object provides. 

  ```js
  // notice we're working with an object
  let humanPrototype = {
    myName() { return this.name; },
    myAge() { return this.age; },
  };
  
  let personPrototype = Object.create(humanPrototype);
  personPrototype.toString = function() {
    return `My name is ${this.myName()} and I'm ${this.myAge()} years old.`;
  };
  
  let will = Object.create(personPrototype);
  will.name = 'William';
  will.age = 28;
  will.toString(); // => My name is William and I'm 28 years old.
  ```

- `Object.create` is also used in OLOO design pattern. 

  - Objects linked to other objects (OLOO) is a JavaScript Design Pattern that lets us define a parent object from which we can create other objects. All shared properties will be defined on this parent object. 
  - Shared properties are defined on a parent object. Other objects can then be created from this parent object using `Object.create(obj)` .
  - An `init()` method defined on the parent object is used to initialize newly created objects with its own properties.

  ```js
  Object.create(obj).init(values);
  ```

------

# Methods and functions; method invocation vs. function invocation 1,2 

- **Regular function** calls (**standalone** function) <u>implicitly</u> use the **global object** as their execution context
- **method calls** <u>implicitly</u> use the calling object as their context.
  - When you call a method on an object, JavaScript binds`this` to the calling object. If it doesn't find the method in that object, but does find it in the prototype, that doesn't change the value of `this`. 

# Function execution context and `this` (2)

- Every JavaScript call has an execution context. 
- Regular function invocations use the global object as its implicit execution context. 

### Global object

- This global object is the **implicit execution context** for function invocations, and when `this` is outside a function.

- JavaScript creates a global object when it starts running. 
  - In Node.js, the global object is the object named `global`. [object global]
  - In the browser, it's the `window` object. 
- If you don't provide an explicit execution context, JavaScript uses the global object as the value for `this`. However, you can access the global object anywhere merely by using its name (`global` or `window`).
- Undeclared variables are added to the global object as property. 
  - When you assign a value to a variable without using `let` `const` or `var` keywords, the variable gets added to global object as property. 
- The global object is available everywhere in a JavaScript program, including both the top level and inside other functions and methods. 
- Global properties / methods
  - global: `global` object is itself a property of the `global` object. 
  - Infinity
  - NaN
  - undefined
  - global
  - isFinite
  - console
  - log

------

### this

Prompt: Any time `this` occurs outside of a function definition, its value is obvious. The majority of the time, `this` will be used as part of a function definition. In these cases, what `this` refers to depends entirely on how the function is invoked.

##### Definition

-  `this` is a keyword that refers to an object that is the current execution context of a function or method that is running. 
- **Execution context**: is the environment (an object) in which a function executes.

##### Implications

- Every time a function is called, JS binds some object to `this` --> **setting the binding** / setting the execution context. 
- `this` keyword is available to every function in JS, because every JS function call has an execution context.
  - All JS functions and methods execute within an execution context , aka the `this` binding. 
- Clarification: `this` is not a variable. It is a keyword.

##### Value of `this` / execution context rules

There are two ways to set execution context when calling a function or method

1. **Explicit**: The execution context that you set explicitly: using `call` `apply` or `bind`. Can override implicit execution context by setting it explicitely.

1. **Implicit**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context.

There are many ways that JS provides an implicit execution context. 

- If `this` is <u>outside a function definition</u>, keyword `this` is bound to the global object. Which means that the implicit execution context is the global object. 

  ```js
  // in strict mode
  let obj = {
    prop: this,
  };
  
  console.log(obj.prop); // logs the global object
  ```

- If `this`  is <u>used as part of a function definition</u>, and the execution context depends on how the function is invoked, not how or where the function is defined.

  - **Regular function calls** (**standalone** function) use <u>global object</u> as <u>implicit</u> execution context, unless in strict mode, it uses <u>undefined.</u>

    ```js
    // regular function call
    function func() {
      console.log(this);
    }
    
    func(); // logs undefined, because we are in strict mode.
    ```

    ```js
    // another form of regular function call where we assign a method to a variable and invoke the function as a standalone function
    let obj = {
      func () { // compact method syntax
        console.log(this);
      }
    }
    
    let foo = obj.func;
    foo(); // undefined
    ```

  - Method calls use the <u>calling object</u> as its <u>implicit</u> execution context. 

    ```js
    // method call
    let obj = {
      prop: function () {
        console.log(this);
      },
    };
    
    obj.prop(); //  logs { func: [Function: func] } which is obj
    ```

- When **strict mode** is enabled,  the implicit execution context/ <u>implicit `this`</u> for <u>function calls</u> is assigned to `undefined` instead of the global object.

  - CoderPad runs JavaScript code in *strict mode*. The implicit execution context for function calls is `undefined`, **not** the global object. 

  - If you wish to practice on your own system instead of on CoderPad, add `"use strict";` to the top of your JavaScript code:

    ```js
    "use strict"; // the quotes are required
    
    function foo() {
      console.log(this);
    }
    
    foo(); // undefined
    ```

- A constructor call with `new` uses the <u>newly created instance object</u> as its implicit execution context. 

  - When we instantiate a new `Cat` object, the constructor logs the `cat` instance object because inside the constructor function, the implicit execution context , the value of `this` is the instance object. 

  ```js
  function Cat () {
    this.property = 'property';
    console.log(this);
  }
  
  let cat = new Cat(); // Cat {property: 'property'};
  ```

- Arrow functions use the <u>surrounding scope</u> as implicit execution context. 

  - Arrow functions use lexical scoping.
  - An arrow function, once created, always has the same context as the function that surrounded it when it was created.

    - Arrow functions are permanently bound to the enclosing function execution context, but it doesn't mean the context can't change. If the enclosing function context changes, it also changes. 
  - This means that arrow functions are permanently bound to the execution context of the **enclosing function invocation**: the most <u>immediate</u> function scope in which the arrow function is defined. 

  ```js
  let obj = {
    prop: function () { // anonymous function
    let foo = () => {
        console.log(this);
      };
      foo();
    },
  }
  
  obj.prop(); // logs obj because obj is the surrounding context for the arrow function. 
  ```

  - Exception: don't use arrow functions as methods on an object, else it will take global object( even in strict mode!) as the surrounding context. 

    ```js
    let obj = {
      a: 5,
    
      foo: () => {
        console.log(this); // this refers to global object
      },
    };
    
    obj.foo(); // => undefined
    // Arrow functions ignore method invocation rule for implicit execution context, uses lexical scoping instead. The surrouding context here is the global object, not obj. 
    ```

# 

- # `Function` Prototype methods and context

  - The JS120 ???*Functions and Execution Context*??? lesson covers the `Function` prototype methods of `call`, `bind`, and `apply`. These methods can be used to set the context of a function. Just like with `Object` methods, I found it helpful to reproduce their behavior with my own functions in order to fully understand how they work.

  - In practice, you use the `call`, `apply`, and `bind` methods to set an explicit execution context. You can also set the execution context explicitly with functions that accept an argument that specifies the context for a callback function. For instance, `Array.prototype.forEach` (and several other `Array.prototype` methods) take a `thisArg` argument that lets you set the context for the callback explicitly.

  ##### `call`

  - Definition: `call` invokes a function or method with an explicit execution context - the first argument passed to it 

    - `call` and `apply` don't change a function's logic or return values; they merely change what object the method uses for its context.

  - Syntax

    ```js
    someObject.someMethod.call(context, arg1, arg2 ???)
    someObject.someMethod.call(context, ...args);
    function.call(context)
    
    // using non-mutating array methods on strings
    string = anyArray.arrayMethod.call(string, callbackFn).join('');
    string = [].arrayMethod.call(string, callbackFn).join('');
    ```

  - Can also pass a second array argument using spread operator. 

    - Syntax

    ```js
    function.call(context, ...args);
    ```

    - Example

    ```js
    let obj = {
      greeting: 'hello', 
      greet(a, b, c) {
        console.log(`${this.greeting} ${a} ${b} ${c}`);
      }
    };
    
    let bye = {
      greeting: 'bye',
    };
    
    let array = [1, 2, 3];
    
    obj.greet(1, 2, 3); // 'hello'
    obj.greet.call(bye, ...array ); // 'bye'
    ```

  - Code Example

  ```js
  let hi = {
    greeting: 'hello', 
    greet() {
      console.log(this.greeting);
    }
  };
  
  let bye = {
    greeting: 'bye',
  };
  
  hi.greet(); // 'hello' -> uses obj as implicit execution context
  hi.greet.call(bye); // 'bye' -> uses bye as explicit execution context
  ```

  ##### `apply`

  - Definition: `apply` calls a function or method with an explicit execution context(the first argument passed to it), and optionally passes an array of arguments to the called function or method. 

    - Arguments are passed as an array, whereas in `call`, arguments are passed separately. 

  - Syntax

    ```js
    someObject.someMethod.apply(context, [arg1, arg2, arg3???])
    function.apply(context)
    ```

  - Don't need `apply` anymore because we can just use spread operator to pass an array argument into `call`. 

  - Code Example

    ```js
    let hi = {
      greeting: 'hello', 
      greet(a, b, c) {
        console.log(`${this.greeting} ${a} ${b} ${c}`);
      }
    };
    
    let bye = {
      greeting: 'bye',
    };
    
    hi.greet(1, 2, 3); // 'hello'
    hi.greet.apply(bye, [1, 2, 3]); // 'bye'
    ```

  ##### `bind`

  - Definition: `Bind` returns a new function that is permanently bound to the context passed to  it as first argument. 

    - Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`
    - Hard binds a function to an explicit execution context. 
    - We have to call on the new function using `()`. 

  - Syntax

    ```js
    newFunc = someObject.someMethod.bind(context, arg1, arg2)
    // Or 
    function.bind(context)
    ```

  - Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. Instead it returns a new function that is permanently bound to the context argument.  

    - What's important is to recognize that `bind`'s context is the <u>original</u> function and it <u>returns a new function</u> that is permanently bound to the context passed to `bind` as first argument. 
    - When we call this new function using `()`, this new function calls on the original function/method using `apply` or `call`, passing the permanent context to it. The original function and its context is not changed.
    - `bind`'s execution context is the original function, because it is invoked using method invocation. Method invocations always use the calling function as its implicit execution context. But `bind` explicitly sets the execution context for the new function. 

  - Code example

    ```js
    let hi = {
      greeting: 'hello', 
      greet() {
        console.log(`${this.greeting}`);
      }
    };
    
    let bye = {
      greeting: 'bye',
    };
    
    
    hi.greet(); // 'hello'
    hi.greet.bind(bye)(); // 'bye'
    ```

  - You cannot alter the execution context of the resulting function, even if you use `call` `apply` or call `bind` a second time. 

    ```js
    let hi = {
      greeting: 'hello', 
      greet() {
        console.log(`${this.greeting}`);
      }
    };
    
    let bye = {
      greeting: 'bye',
    };
    
    
    hi.greet(); // 'hello'
    let example = hi.greet.bind(bye);
    example.call(hi); // 
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

    - You can pass that method around and call it without worrying about losing its context since it's permanently bound to the provided object. 

    - So the execution context will stay the same if that method is copied out of a function, if it's passed as an argument, or if it's a nested function. 

      ```js
      let hi = {
        greeting: 'hello', 
        greet() {
          console.log(this.greeting);
        }
      };
      
      let bye = {
        greeting: 'bye',
      };
      
      hi.greet(); // 'hello' -> uses obj as implicit execution context
      let example = hi.greet.bind(bye); // copies example method out of the function
      
      function random(arg) { // pass example as an argument
        arg();
      }
      
      random(example); // logs 'bye'
      ```

    - For example, invoking the method as a regular function call since its bound to the permanent execution context.

    ```js
    let hi = {
      greeting: 'hello', 
      greet() {
        console.log(`${this.greeting}`);
      }
    };
    
    let bye = {
      greeting: 'bye',
    };
    
    
    hi.greet(); // 'hello'
    let example = hi.greet.bind(bye); 
    example(); // 'bye'
    ```

    - You cannot alter the execution context of the resulting function, even if you use `call` `apply` or call `bind` a second time. 

      ```js
      let hi = {
        greeting: 'hello', 
        greet() {
          console.log(`${this.greeting}`);
        }
      };
      
      let bye = {
        greeting: 'bye',
      };
      
      
      hi.greet(); // 'hello'
      let example = hi.greet.bind(bye);
      example.call(hi); // 
      ```

  - The disadvantage of `bind` is that it is no longer possible to determine the context by looking at the invocation of the final function. 

    ```js
    let func = function () {
      console.log(this.a);
    };
    
    let obj = {a: 1};
    
    func = func.bind(obj);
    func(); // 
    ```

  ------

  

------

# `Function` Prototype methods and context

- The JS120 ???*Functions and Execution Context*??? lesson covers the `Function` prototype methods of `call`, `bind`, and `apply`. These methods can be used to set the context of a function. Just like with `Object` methods, I found it helpful to reproduce their behavior with my own functions in order to fully understand how they work.

- In practice, you use the `call`, `apply`, and `bind` methods to set an explicit execution context. You can also set the execution context explicitly with functions that accept an argument that specifies the context for a callback function. For instance, `Array.prototype.forEach` (and several other `Array.prototype` methods) take a `thisArg` argument that lets you set the context for the callback explicitly.

##### `call`

- Definition: `call` invokes a function or method with an explicit execution context - the first argument passed to it 

  - `call` and `apply` don't change a function's logic or return values; they merely change what object the method uses for its context.

- Syntax

  ```js
  someObject.someMethod.call(context, arg1, arg2 ???)
  someObject.someMethod.call(context, ...args);
  function.call(context)
  
  // using non-mutating array methods on strings
  string = anyArray.arrayMethod.call(string, callbackFn).join('');
  string = [].arrayMethod.call(string, callbackFn).join('');
  ```

- Can also pass a second array argument using spread operator. 

  - Syntax

  ```js
  function.call(context, ...args);
  ```

  - Example

  ```js
  let obj = {
    greeting: 'hello', 
    greet(a, b, c) {
      console.log(`${this.greeting} ${a} ${b} ${c}`);
    }
  };
  
  let bye = {
    greeting: 'bye',
  };
  
  let array = [1, 2, 3];
  
  obj.greet(1, 2, 3); // 'hello'
  obj.greet.call(bye, ...array ); // 'bye'
  ```

- Code Example

```js
let hi = {
  greeting: 'hello', 
  greet() {
    console.log(this.greeting);
  }
};

let bye = {
  greeting: 'bye',
};

hi.greet(); // 'hello' -> uses obj as implicit execution context
hi.greet.call(bye); // 'bye' -> uses bye as explicit execution context
```

##### `apply`

- Definition: `apply` calls a function or method with an explicit execution context(the first argument passed to it), and optionally passes an array of arguments to the called function or method. 

  - Arguments are passed as an array, whereas in `call`, arguments are passed separately. 

- Syntax

  ```js
  someObject.someMethod.apply(context, [arg1, arg2, arg3???])
  function.apply(context)
  ```

- Don't need `apply` anymore because we can just use spread operator to pass an array argument into `call`. 

- Code Example

  ```js
  let hi = {
    greeting: 'hello', 
    greet(a, b, c) {
      console.log(`${this.greeting} ${a} ${b} ${c}`);
    }
  };
  
  let bye = {
    greeting: 'bye',
  };
  
  hi.greet(1, 2, 3); // 'hello'
  hi.greet.apply(bye, [1, 2, 3]); // 'bye'
  ```

##### `bind`

- Definition: `Bind` returns a new function that is permanently bound to the context passed to  it as first argument. 

  - Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`
  - Hard binds a function to an explicit execution context. 
  - We have to call on the new function using `()`. 

- Syntax

  ```js
  newFunc = someObject.someMethod.bind(context, arg1, arg2)
  // Or 
  function.bind(context)
  ```

- Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. Instead it returns a new function that is permanently bound to the context argument.  

  - What's important is to recognize that `bind`'s context is the <u>original</u> function and it <u>returns a new function</u> that is permanently bound to the context passed to `bind` as first argument. 
  - When we call this new function using `()`, this new function calls on the original function/method using `apply` or `call`, passing the permanent context to it. The original function and its context is not changed.
  - `bind`'s execution context is the original function, because it is invoked using method invocation. Method invocations always use the calling function as its implicit execution context. But `bind` explicitly sets the execution context for the new function. 

- Code example

  ```js
  let hi = {
    greeting: 'hello', 
    greet() {
      console.log(`${this.greeting}`);
    }
  };
  
  let bye = {
    greeting: 'bye',
  };
  
  
  hi.greet(); // 'hello'
  hi.greet.bind(bye)(); // 'bye'
  ```

- You cannot alter the execution context of the resulting function, even if you use `call` `apply` or call `bind` a second time. 

  ```js
  let hi = {
    greeting: 'hello', 
    greet() {
      console.log(`${this.greeting}`);
    }
  };
  
  let bye = {
    greeting: 'bye',
  };
  
  
  hi.greet(); // 'hello'
  let example = hi.greet.bind(bye);
  example.call(hi); // 
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

  - You can pass that method around and call it without worrying about losing its context since it's permanently bound to the provided object. 

  - So the execution context will stay the same if that method is copied out of a function, if it's passed as an argument, or if it's a nested function. 

    ```js
    let hi = {
      greeting: 'hello', 
      greet() {
        console.log(this.greeting);
      }
    };
    
    let bye = {
      greeting: 'bye',
    };
    
    hi.greet(); // 'hello' -> uses obj as implicit execution context
    let example = hi.greet.bind(bye); // copies example method out of the function
    
    function random(arg) { // pass example as an argument
      arg();
    }
    
    random(example); // logs 'bye'
    ```

  - For example, invoking the method as a regular function call since its bound to the permanent execution context.

  ```js
  let hi = {
    greeting: 'hello', 
    greet() {
      console.log(`${this.greeting}`);
    }
  };
  
  let bye = {
    greeting: 'bye',
  };
  
  
  hi.greet(); // 'hello'
  let example = hi.greet.bind(bye); 
  example(); // 'bye'
  ```

  - You cannot alter the execution context of the resulting function, even if you use `call` `apply` or call `bind` a second time. 

    ```js
    let hi = {
      greeting: 'hello', 
      greet() {
        console.log(`${this.greeting}`);
      }
    };
    
    let bye = {
      greeting: 'bye',
    };
    
    
    hi.greet(); // 'hello'
    let example = hi.greet.bind(bye);
    example.call(hi); // 
    ```

- The disadvantage of `bind` is that it is no longer possible to determine the context by looking at the invocation of the final function. 

  ```js
  let func = function () {
    console.log(this.a);
  };
  
  let obj = {a: 1};
  
  func = func.bind(obj);
  func(); // 
  ```



# Difference between Implicit and Explicit execution context

- **Execution context**:  the **environment** in which a function executes.

- There are two basic ways to set the context when calling a function or method

  1. **Explicit**: The execution context that you set explicitly: using `call` `apply` or `bind`. 

  2. **Implicit**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context.

     There are many ways that JS provides an implicit execution context. 

     - Regular function calls use <u>global object</u> as implicit execution context. 
     - Method calls use the <u>calling object</u> as its implicit execution context. 
     - A constructor call with `new` uses the <u>newly created object</u> as its implicit execution context. 
     - Arrow functions use the <u>surrounding scope</u> as implicit execution context. 
     - When strict mode is enabled, the implicit execution context/ implicit `this` is assigned to `undefined` instead of the global object. 
     - Outside of a function definition, the implicit execution context is the global object. 

# Understanding context loss

- ???What are the ways that context can be lost, and how can context loss be prevented in these situations????
- A complete response needs to clearly indicate the differences between ???Implicit??? and ???Explicit??? execution context.

### Context Loss 1 : Method is copied out of an object and used elsewhere.

- When we take a method out of an object and execute it as a function or method on another object, the function's context is no longer the original object.

  - Example 

  ```js
  let hi = {
    greeting: 'hi',
    greet () {
      console.log(this.greet);
    }
  };
  
  hi.greet(); // context is the hi object, logs hi
  
  let foo = hi.greet; 
  foo(); // raises a TypeError: cannot read properties of undefined 
  ```

  - Example 2

  ```js
  let obj = {
    method() {
      console.log(this);
    }
  };
  
  obj.method(); // context is obj, logs obj
  let foo = obj.method; // strips context
  foo(); // context is now undefined, because we are in strict mode.
  ```

##### Best Solution

- Hard-bind the method's context by using `bind`

```js
// Example 
let hi = {
  greeting: 'hi',
  greet () {
    console.log(this.greeting);
  }
};

hi.greet(); // context is the hi object, logs hi

let foo = hi.greet.bind(hi); 
foo(); // logs hi
```

```js
// Example 2
let foo = obj.method.bind(obj); // bind returns a function
foo(); // foo references a function that is permanently bound to obj.

// using call
let foo = obj.method; 
foo.call(obj);
```

##### Unideal solutions

- Use `call`

  - problem is if you pass it to another function or don't execute function right away, the context passed to `call` may be out of scope by then. 

- ```js
  // code example
  function func() {
    let hi = {
      greeting: 'hi',
      greet () {
        console.log(this.greet);
      }
    };
    
    let foo = hi.greet; // context is the hi object, logs hi
    random(foo);
  }
  
  function random(foo) {
    foo.call(hi); // TypeError: cannot read properties of undefined, hi is not defined
  }
  
  func(); 
  ```

- Their example

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

  ```js
  function func() {
    let hi = {
      greeting: 'hi',
      greet () {
        console.log(this.greeting);
      }
    };
    
    let foo = hi.greet; // context is the hi object, logs hi
    random(foo, hi);
  }
  
  function random(foo, context) {
    foo.call(context); 
  }
  
  func(); // logs hi
  ```

  

### Context Loss 2: Nested Functions: inner function not using surrounding context

- Inner function is invoked as a standalone function. 

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    function bar() {
      console.log(this.greeting);
    }
    
    bar(); //bar is invoked as standalone function. THus its execution context is the undefined, not `obj` object. 
  },
}

obj.foo(); // raises a TypeError: cannot read properties of undefined.
```

- Inner function `bar` loses surrounding context.

##### Solution 1 : Preserve context with variable in outer scope 

- `let self = this` in the outer function

- Set `this` to a variable to access the correct context object. 

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    let self = this;
    function bar() {
      console.log(self.greeting);
    }
    
    bar(); // bar's execution context is undefined, because its invoked as a standalone function. But since self references the surrounding context, it will log `hello`.
  },
}

obj.foo(); // logs 'hello'
```

##### Solution 2 : Call Inner function with explicit context

- `call` or `apply`

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    function bar() {
      console.log(this.greeting);
    }
    
    bar.call(this); // call invokes bar with `obj` as explicit execution context.
  },
}

obj.foo(); // logs 'hello'
```

- We won't show an example of `apply` since you can always use `call` in its place if you use the spread operator to expand `apply`'s array argument.

##### Solution 3: use `bind`

- Advantage of `bind` is that you can do it once and then call it as often as needed without an explicit context. 

- call `bind` on inner function and get a new function with its execution context permanently set to the object. 

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    function bar() {
      console.log(this.greeting);
    }
    
    bar.bind(this)(); 
  },
}

obj.foo(); // logs 'hello'
```

- We can use a function declaration instead of a function expression, but you'll need an extra variable. 

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    function bar() {
      console.log(this.greeting);
    }
    
    let qux = bar.bind(this); 
    qux(); 
  },
}

obj.foo(); // logs 'hello'
```

##### Solution 4: Use arrow function

- Arrow functions use lexical scoping. 
- Arrow functions ignore the rule that a function or method's execution context depends soley on how you invoke it, now on how and where it's defined. 
- This exception comes in very handy when dealing with context loss. 
- A property of arrow functions is that <u>they inherit their execution context from the surrounding scope</u>. 
- An Arrow function defined inside another function always has the same context as the outer function: 

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    let bar = () => {
      console.log(this.greeting);
    }
		
    bar();
  },
}

obj.foo(); // logs 'hello'
```

- Using arrow functions like this is similar to using `bind` in that you don't have to worry about arrow functions losing their surrounding context. 
- An arrow function, once created, always has the same context as the function that surrounded it when it was created. 
- Of all the techniques we saw in the assignment, using arrow functions is most common these days. 

##### Arrow function Exception 

- Exception: don't use arrow functions as methods on an object, else it will take global object( even in strict mode!) as the surrounding context. 

```js
let obj = {
  greeting: 'hello',

  foo: () => {
    console.log(this.a);
  },
};

obj.foo(); // => undefined
// Arrow functions ignore method invocation rule for implicit execution context, uses lexical scoping instead. The surrouding context here is the global object, not obj. 
```

- This code doesn't work because arrow functions always get the value of `this` from the surrounding context. 
- The surrounding context is the **global object**. The reason for that is simple: the `let` statement in this example is in the program's top level code, so its context is the global object. That means `this` inside the object literal is also the global object, so `this` on line 5 refers to the global object, not `obj`. 
- Note that `this` in `obj.foo` is not determined by how the method is called. 
  - We call the method on line 9, and we seem to be telling JavaScript to use `obj` as the context. 
  - Instead, the context ends up being the global object. 
  - That seems to contradict our repeated statements that the context is determined entirely by how a function or method is invoked. That's clearly not the case here; it certainly violates the rule.
  - However, you won't usually see code like this in practice.
  - In general, do not use arrow functions to write methods. As long as you don't use arrow functions as methods, you can ignore this exception. 

### **Context Loss 3: Function as argument losing surrounding context**

- When functions are passed as arguments to another function, they lose their surrounding context and the function argument gets invoked with the execution context set to the global object ( or undefined in strict mode). 

```js
// In strict mode
let obj = {
  greeting: 'hello',
  foo: function () {
    [1, 2, 3].forEach(function (number) {
      console.log(`${this.greeting} ${number}`);
    });
  },
};

obj.foo();
// Raises a TypeError: cannot read properties of undefined (reading 'greeting')
```

```js
// Not in strict mode
let obj = {
  greeting: 'hello',
  foo: function () {
    [1, 2, 3].forEach(function (number) {
      console.log(`${this.greeting} ${String(number)}`);
    });
  },
};

obj.foo(); 
// => undefined 1
// => undefined 2
// => undefined 3
```

- CLARIFICATION: It's the callback function that is being executed with global object(`undefined` in strict mode) as execution context, not `forEach`. 
- On line 5, The implicit execution context of `forEach` is its calling object, the array `[1, 2, 3]`.   But a function expression is passed to `forEach` as argument, and when functions are passed as arguments, they lose surrounding context, so the execution context is then implicitly set to the global object.  If `forEach` took a `thisArg` argument, then the execution context would be `thisArg`. 
- SOLUTION: The problem is that `this` is bound to the global object(`undefined`) when the anonymous callback function passed to `forEach` is invoked on line 5. We want to access the object `obj` from within the anonymous function. Here we'll solve it by employing the lexical scoping of JavaScript to our advantage; specifically, the rule that a variable defined in an outer scope is available to an inner scope. (preserving context with a variable in outer scope)

##### Solution 1: Preserve the Context with a Variable in Outer Scope

- This solution utilizes lexical scoping rules.
- **Lexical scoping rules**: A lexical scope in JavaScript means that a variable defined outside a function can be accessible inside another function defined after the variable declaration. 
  -  the rule that a variable defined in an outer scope is available to an inner scope

```js
// In strict mode
let obj = {
  greeting: 'hello',
  foo: function () {
    let self = this;
    [1, 2, 3].forEach(function (number) {
      console.log(`${self.greeting} ${String(number)}`);
    });
  },
};

obj.foo();
// hello 1
// hello 2
// hello 3
```

##### Solution 2 : Use `bind`

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    [1, 2, 3].forEach(function (number) {
      console.log(`${this.greeting} ${String(number)}`);
    }.bind(this)); // binds the callback function
  },
};

obj.foo();
// hello 1
// hello 2
// hello 3
```

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    let bar = function (number) { // binds the callback function
      console.log(`${this.greeting} ${String(number)}`);
    }.bind(this);
    
    [1, 2, 3].forEach(bar); 
  },
};

obj.foo();
// hello 1
// hello 2
// hello 3
```

 When does `bind` not work?

- `Bind` needs to be used on the function that is being passed as argument, not be built -in to the function already, if this makes sense.

- This code doesn't work because the function that is bound to `this` gets passed as an argument itself. 
- `this` binding isn't set until a method is INVOKED. Execution context is set during a method invocation. So when the function is invoked, `this` references global object instead of `turk` as we intended it to. 


```js
// this solution doesn't work
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
// also doesn't work work
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription: function() {
      return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }.bind(turk) // ReferenceError: cannot access turk before initialization
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);
```

```js
// This works because we bind the function that is being passed as argument. 
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
// This example demonstrates a solution for callback functions to retain its surrounding context when it is passed to `forEach`. This solution binds the callback  function to a permanent execution context. 
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b); // why does this refer to obj? 
    }.bind(this));
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

- `this` on line 6 refers to `obj` because the order of method calls starts from line 11, where method `foo` is invoked by `obj` and the context is set to `obj`. Then on line 7, foo references a new function that is permanently bound to context of `this`, which still refers to `obj`. The new function invokes the original `foo` function with permanent context of `obj`, so on line 6, `this` refers to `obj`.  

##### Solution 3 : Use arrow function

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    [1, 2, 3].forEach(number => {
      console.log(`${this.greeting} ${String(number)}`);
    });
  },
};

obj.foo();
// hello 1
// hello 2
// hello 3
```

##### Solution 4: Use the optional `thisArg` argument

- Some methods that take function arguments allow an optional argument that specifies the execution context to use for the callback function. 
  - provides an alternative way to supply the execution context for the callback function. 
- For example `Array.prototype.forEach` has an optional `thisArg` argument for the context. 
- `map`, `every`, `some`, and others take this optional argument. 

```js
let obj = {
  greeting: 'hello',
  foo: function () {
    [1, 2, 3].forEach(function(number) {
      console.log(`${this.greeting} ${String(number)}`);
    }, this);
  },
};

obj.foo();
// hello 1
// hello 2
// hello 3                          
```

# Inheritance

Summary

- **All** inheritance in JavaScript is prototypal inheritance/ works via prototypal delegation.

- When 'comparing' prototypal inheritance and pseudo-classical inheritance, we're essentially comparing two things at different levels of abstraction. 

- Pseudo-classical inheritance is an abstraction. It is essentially a pattern that combines two features of JavaScript -- prototypal delegation and constructor functions -- in order to *mimic* the kind of class-based inheritance we see in other languages. 
- To summarize: since pseudo-classical inheritance is an attempt to *mimic* class-based inheritance (the 'pseduo' part), it makes sense to discuss it in the same terms that are used to explain class-based inheritance, and abstract away the lower-level detail. However, it's important to understand that *under-the-hood* it's still all prototypal delegation.

- Inheritance describes two related but distinct forms of inheritance: prototypal and pseudo-classical inheritance. 

##### Why inheritance

- Inheritance reduces complexity. 


### Prototypal Inheritance vs pseudo-classical inheritance (4)

- Both use prototypal delegation under the hood. 
  -  If the requested property isn't found, the object delegates the request to the object's prototype object.
  -  If the requested property isn't there either, the prototype object delegates the request to its own prototype object. 
  -  This process follows the prototype chain until the property or method is found or the end of the prototype chain is found.
- JavaScript does not have classes in the traditional sense. Prototypal inheritance is used to link objects together.

#### Prototypal inheritance

- A simple form of inheritance that *works with one object at a time*, which is why it's often called **object inheritance** 

- Is also called **prototypal delegation**. 

- An objects internal `[[prototype]]` property points to the prototype object, and the object can delegate method calls to the prototype object. 

Syntax

- Use `object.create` to create a new object that inherits properties from the prototype object.  

  - It takes an object called the **prototype object** as argument, and returns a new object that inherits properties from the prototype object. 

  - The newly created object has access to all properties and methods on the prototype object. 

  - unusual aspect is that the **inheriting object** (b) doesn't receive properties or methods of its own. Instead, it **delegates** property and method access to its prototype. 

    

- OLOO uses prototypal inheritance.

- Example: 

```js
let animal =  {};

let cat = Object.create(animal);
```

- We've seen plenty of prototypal inheritance. 

##### Example: 

```js
// notice we're working with an object
let humanPrototype = {
  myName() { return this.name; },
  myAge() { return this.age; },
};

let personPrototype = Object.create(humanPrototype);
personPrototype.toString = function() {
  return `My name is ${this.myName()} and I'm ${this.myAge()} years old.`;
};

let will = Object.create(personPrototype);
will.name = 'William';
will.age = 28;
will.toString(); // => My name is William and I'm 28 years old.
```

#### pseudo-classical inheritance

- Works with functions.

- The **pseudo-classical** object construction, also known as the **constructor/prototype pattern**, forms the basis of pseudo-classical inheritance, also called **constructor inheritance**

- In pseudo-classical inheritance, a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a sub-type inherits from a super-type.

- We are creating a link without executing code in the parent constructor function. 
- This lets us inherit only the properties that have been defined on the parent constructor function's `prototype` object, not instance methods or properties on the parent constructor. 
- When people talk about *inheritance* in the context of JavaScript, they often mean this kind of inheritance. 

Syntax

- Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then <u>restore the constructor</u> property of the **sub-type**'s prototype object back to the **sub-type** function. 
  - This must be done before you add new methods to the `subtype.prototype`
  - Reminder: Every <u>function</u> object has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself.

```js
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType; // restoring constructor property
```

- Constructor reuse: 
  - Use `Function.prototype.call` to have the subclass "inherit" properties from the parent class.
  - Use `call` to use the super-type constructor inside subtype. Invoke the `SuperType` constructor with its execution context explicitly set to the execution context of `SubType`.


```js
function SubType(parameter1) {
  SuperType.call(this, parameter1, parameter2);
}
```

- `class` and the `extends` keyword is an alternative form of pseudo-classical inheritance. 

  - Unlike pseudo-classical inheritance with constructors and prototypes, a class created with class inheritance inherits <u>all the methods and properties</u> from the parent class/ superclass. 

  - In the constructor and prototype pattern, sub-type usually only inherits from the super-type's `.prototype` object. 


##### Example 

For instance, we can rewrite the prototypal inheritance example to use pseudo-classical inheritance:

```js
// notice we're working with functions
function Human() {}
Human.prototype.myName = function() { return this.name; };
Human.prototype.myAge = function() { return this.age; };

function Person() {}
Person.prototype = Object.create(Human.prototype);
Person.prototype.constructor = Person;
Person.prototype.toString = function() {
  return `My name is ${this.myName()} and I'm ${this.myAge()} years old.`;
};

let will = new Person();
will.name = 'William';
will.age = 28;
will.toString(); // => My name is William and I'm 28 years old.
```

- Note that using `class` and the `extends` keyword is an alternative form of pseudo-classical inheritance. We'll meet the `extends` keyword a little later. So you'll recognize it later, here's what pseudo-classical inheritance looks like with `class` and `extends`:

```js
class Human {
  myName() { return this.name; }
  myAge() { return this.age; }
}

class Person extends Human {
  toString() {
    return `My name is ${this.myName()} and I'm ${this.myAge()} years old.`;
  }
}

let will = new Person();
will.name = 'William';
will.age = 28;
will.toString(); // => My name is William and I'm 28 years old.
```

##### Example 2

```js
function Animals() {}

function Cats() {}

Cats.prototype = Object.create(Animals.prototype);
```

##### Example 3

- `Square` is a kind of rectangle where the length and width are the same, so `Square` is a **sub-type** of `Rectangle`, and `Rectangle` is a **super-type** of `Square`. 

```js
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};

Rectangle.prototype.toString = function() {
  return `[Rectangle ${this.length} x ${this.width}]`;
};

let rect = new Rectangle(10, 5);
rect.getArea();     // => 50
rect.toString();    // => "[Rectangle 10 x 5]"
```

```js
function Square(size) {
  this.length = size;
  this.width = size;
}

Square.prototype = Object.create(Rectangle.prototype);

Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
};

let sqr = new Square(5);
sqr.getArea();     // => 25
sqr.toString();    // => "[Square 5 x 5]"
```

Restoring the `constructor` property

- One side-effect of this approach is that the `constructor` property on square objects points to `Rectangle` when it should point to `Square` instead, so we need to reassign the `constructor` property to the subtype.

```js
function Square(size) {
  this.length = size;
  this.width = size;
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
}

let sqr = new Square(5);
sqr.getArea();              // => 25
sqr.toString();             // => "[Square 5 x 5]"
sqr.constructor === Square; // => true
```

Constructor Reuse

- Constructor reuse: Use `call` to use the super-type constructor inside subtype. Invoke the `SuperType` constructor with its execution context explicitly set to the execution context of `SubType`.

  ```js
  function SubType(parameter1) {
    SuperType.call(this, parameter1, parameter2);
  }
  ```

- Using the super-type constructor inside subtype

- Example: invoke `Rectangle` with its execution context explicitly set to the execution context of `Square`. 

```js
function Square(size) {
  Rectangle.call(this, size, size);
}
```

Code now looks like this. 

```js
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};

Rectangle.prototype.toString = function() {
  return `[Rectangle ${this.length} x ${this.width}]`;
};

// rect test code omitted

function Square(size) {
  Rectangle.call(this, size, size);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
};

// sqr test code omitted
```

#### Two ways of inheritance (from Read 2)

- The first way lets us inherit <u>all the properties and methods</u> that a new object(instance object) created from the parent constructor function would have access to

  - Class inheritance uses this way. 
    - If the superclass's constructor creates object properties, `super` must be called to set those properties on the subclass. 
    - `super` must be called before you use `this` in the subclass's constructor. 
    - This ensures that subclass inherits <u>all the methods and properties</u> from parent class. 
  - The body of the parent constructor function is executed.
  - With `new` we???re causing the code within the constructor function to run and creating a link with a prototype chain. 
  - Setting `Dog.prototype` to point to the <u>instance object</u> of parent constructor function. 

  ```js
  // using new
  Dog.prototype = new Animal(); // // setting it to the instance object of Animal
  Dog.prototype.constructor = Dog; // gotta point the constructors back
  ```

- The second let???s us inherit only the properties that have been defined on the parent constructor function???s `prototype` object 

  -  pseudo classical inheritance uses this way. 
  -  properties defined in the body of the function will not be inherited. 
  -  with `Object.create(obj)` we???re simply creating the link without executing the code in the constructor function .

  ```js
  // using Object.create(Super-type.prototype)
  Dog.prototype = new Animal(); 
  Dog.prototype.constructor = Dog;
  Terrier.prototype = Object.create(Dog.prototype); // setting to the prototype object of Dog
  Terrier.prototype.constructor = Terrier;
  ```

  - Terrier does not have access to Dog constructor's instance properties or methods. 
  - For example, Terrier doesn't have access to `legs`, in the instance object of Dog constructor. 

- Using constructor property to create new objects

  ```js
  let rex = new Terrier();
  let spot = new rex.constructor;
  // is the equivalent of calling new Terrier();
  // Can use this method if we don't know the name of an object's constructor. 
  ```

#### Difference between class and pseudo-classical inheritance

- In class inheritance, the subclass inherits <u>all the methods and properties</u> from parent class. 
- pseudo-classical inheritance lets us inherit only the properties that have been defined on the parent constructor function???s `prototype` object.

------

# Single vs multiple inheritance (4)

- **Single Inheritance**: 
  - Objects can only have one prototype object.
  - And classes can extend only one other class. 
  - Objects/class can inherit from chain of prototypes, but it's not considered direct, so therefore it's single inheritance where each object directly inherits only from one other object. 
- This restriction can be limiting and sometimes makes modeling some problem domains challenging. For instance, suppose we have a `Pet` class from which several other specific classes inherit. The inheritance relationship might look like this:

![module class hierarchy](https://dbdwvr6p7sskw.cloudfront.net/images/js120/object_hierarchy_with_mixins.png)

- Note that the `swim` method is in two classes: `Dog` and `Fish`. Assuming that they have the same implementation, we would like to provide that method in one place, perhaps in a class. However, where can we move it? 
- Some programming languages allow classes to inherit from multiple classes, a functionality known as **multiple inheritance**. JavaScript doesn't support multiple inheritance, so a class can only inherit from one class.

> To be clear, when we say that an object can only have one prototype or that a class can only inherit from one class, we don't mean that the object or class can't inherit from an entire chain of prototypes or classes. It's perfectly acceptable for a `Whale` class to inherit from a `Mammal` class, which in turn inherits from an `Animal` class, which again inherits from the built-in `Object` type. Some students see this as multiple inheritance, but it is not: each object or class inherits directly from a single thing, so it is single inheritance. The chain of prototypes or superclasses merely comes along for the ride.

# Mix-Ins Summary

- Definition: A mix-in is an object that defines the common behavior between multiple classes. Mix-ins are used to share behavior between otherwise unrelated classes.
- It defines the methods to be "mixed in " to a function, constructor, or class. This grants that class access to all of the methods in the object. 

  - The **`Object.assign()`** Merges two or more objects into a single object returns a reference to the modified object. 
    - `Object.assign` is used to copy the methods and properties of source objects into the target object. 

    - copying all [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable) [own properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) from one or more *source objects* to a *target object*. It returns a reference to the modified <u>target</u> object

    - Syntax


  ```
  Object.assign(targetObj, ...sources)
  Object.assign(Constructor.prototype, mixIn, mixIn...)
  ```

  - This grants the function/constructor/class access to all the methods in the object.

# Mix-ins; mix-ins vs. inheritance (4)

#### Mix-ins

- Summary: Mix-ins are a way to share common behaviors between classes. When two more more classes share common behavior, you can move that behavior into a mix-in object. 

  -  Use mix-ins to enhance a commonality that multiple classes share. 
  -  Mix-ins are useful for organizing similar methods that may be relevant to multiple classes. 
  -  It addresses the limitation single inheritance: limitation that objects can only have one prototype object - can only directly 'inherit' from one super-type object.
  -  The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix* that object *into* another object. 

- Syntax 

  ```js
  Object.assign(Constructor.prototype, mixInObject...)
  ```

- **Mix-ins**:

  - JavaScript objects can only inherit from one other object. This limitation makes it difficult to model certain domains using class or constructor-based inheritance. You can use mix-ins to share behavior between otherwise unrelated classes.

  - It's the only real workaround for the lack of multiple inheritance short of duplication. 
  - pattern that adds methods and properties from one object to another. 
  - It's not  inheritance / delegation with prototypes; the mix-in pattern copies the properties of one object to another with `Object.assign` or some similar technique. 

- Literal definition: 

  - A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all of the methods in the object.
  - The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix*(copy the methods and properties of that object) *into* another object.

- How it works: Move code shared by 2 (or more) classes into a mix-in object then `Object.assign` the `.prototype` object of all the classes which share the code, with the mix-in Object. 

  ```js
  const Swimmable = { // mix-in object
    swim() {};
  };
  
  const Flyable = { // mix-in object
    fly() {};
  };
  
  Class Bird {}
  
  class Parrot {} // no inheritance here 
  Object.assign(Parrot.prototype, Flyable); // one trait 
  
  class Duck{}
  Object.assign(Duck.prototype, Swimmable, Flyable); // both traits.
  ```

- Example with mix-in & inheritance

  ```js
  const Flyable = { // mix-in object
    fly() {
      console.log('I can fly!');
    }
  };
  
  class Bird { // parent class
    constructor(name) { // Bird specific logic
      this.name = name;
    }
    
    type() {
      console.log('My type is bird.');
    }
  }
  
  Object.assign(Bird.prototype, Flyable); // extends capability of parent class
  
  class Parrot extends Bird { // subclass of bird, parrot is a type of bird
    constructor(name) { // inherits name property from Bird
      super(name);
    }
  }
  
  class Jet { // planes are not birds but can also fly
    constructor(name) { // Jet specific logic
      this.name = name;
    }
    
    type() {
      console.log('My type is plane.')
    }
  }
  
  Object.assign(Jet.prototype, Flyable); 
  ```

  ```js
  // test code
  let eep = new Parrot('eep');
  let meep = new Jet('meep');
  
  eep.type();
  console.log(eep.name);
  meep.type();
  console.log(meep.name);
  ```

#### Mix-ins vs. Inheritance

We suggest a balance of mix-in and classical inheritance pattern: 

1. Inheritance works best when there is an "**is a**" relationship between two classes.

   - Inheritance works well when one object type is positively a sub-type of another object. 

   - In our example, it's natural for a penguin to also be a swimming bird. These types have an **is a** relationship: a penguin *is a* swimming bird. 

2. Mix-ins work best in a "**has - a** " relationship

   - The mix-in pattern works best when an object has a capability that another object needs.
   - When you want to endow your objects(Constructor.prototype) with some capability, a mix-in may be the correct choice.
   - Use mix-in if you want to extend the abilities of a parent class. 
   - In the example, the ability to swim doesn't have that kind of relationship with storks. Swimming is a capability that penguins have. Similarly, flying is a capability that storks have. 

#### Example

- Addressing problem of single inheritance: there are birds that both fly and swim. 

- we saw mix-in in our first implmentation of Rock Paper Scissors where we mixed in objects returned by `createPlayer` with `createHuman` and `createComputer`. 
- For now, we're concerned with objects that can, in principle, belong to multiple and distinct types. For instance, in the bird world, there are birds that can swim and birds that can fly, but there are also birds that can't swim and birds that can't fly. Some birds can even do both.

| Bird    | Swim? | Fly? |
| :------ | :---: | :--: |
| Stork   |  no   | yes  |
| Parrot  |  no   | yes  |
| Penguin |  yes  |  no  |
| Ostrich |  yes  |  no  |
| Duck    |  yes  | yes  |
| Goose   |  yes  | yes  |

- How would we model this in JavaScript with inheritance? We start like this:

```js
class Bird {}

class Stork extends Bird {
  fly() {}
}

class Parrot extends Bird {
  fly() {}
}

class Penguin extends Bird {
  swim() {}
}

class Ostrich extends Bird {
  swim() {}
}

class Duck extends Bird {
  swim() {}
  fly() {}
}

class Goose extends Bird {
  swim() {}
  fly() {}
}
```

- That was easy enough. However, there's a lot of duplication going on here: 4 of the various bird classes each have their own copy of the `swim` method, while 4 have their own copy of the `fly` method. In all likelihood, those 4 `fly` methods are identical, as are the 4 `swim` methods.

- One way we can try to reduce the duplication is by using inheritance and a new class. Let's start with the `fly` method. We can define a `FlyingBird` type to handle this:

```js
class Bird {}

class FlyingBird extends Bird {
  fly() {}
}

class Stork extends FlyingBird {}

class Parrot extends FlyingBird {}

class Penguin extends Bird {
  swim() {}
}

class Ostrich extends Bird {
  swim() {}
}

class Duck extends FlyingBird {
  swim() {}
}

class Goose extends FlyingBird {
  swim() {}
}
```

- Great! Let's see what happens when we try to refactor the `swim` method:

```js
class Bird {}

class FlyingBird extends Bird {
  fly() {}
}

class SwimmingBird extends Bird {
  swim() {}
}

class Stork extends FlyingBird {}

class Parrot extends FlyingBird {}

class Penguin extends SwimmingBird {}

class Ostrich extends SwimmingBird {}

// Hmmm.... we have a problem.
// What to do with ducks and geese???

class Duck extends FlyingBird {
  swim() {}
}

class Goose extends FlyingBird {
  swim() {}
}
```

- We've hit a roadblock. The `Duck` and `Goose` classes represent both flying birds and swimming birds, but JavaScript only allows single inheritance. The lack of support for multiple inheritance means we can't just add a new class in and inherit from it.

- Instead of using inheritance, we can use a **mix-in** instead. A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all of the methods in the object. It's the only real workaround for the lack of multiple inheritance short of duplication. Let's see what mix-ins look like:

```js
const Swimmable = {
  swim() {};
}

class Bird {}

class FlyingBird extends Bird {
  fly() {}
}

class Stork extends FlyingBird {}

class Parrot extends FlyingBird {}

class Penguin extends Bird {}
Object.assign(Penguin.prototype, Swimmable);

class Ostrich extends Bird {}
Object.assign(Ostrich.prototype, Swimmable);

class Duck extends FlyingBird {}
Object.assign(Duck.prototype, Swimmable);

class Goose extends FlyingBird {}
Object.assign(Goose.prototype, Swimmable);
```

- In this code, we've created a `Swimmable` object that has a `swim` method. To mix it into our various swimming birds, we've used `Object.assign` to add the methods from `Swimmable` to the prototype objects of those classes. It's a bit tedious, but not too difficult, and it works well.

- For consistency, we could even eliminate the inheritance aspect entirely:

```js
const Swimmable = {
  swim() {}
}

const Flyable = {
  fly() {}
}

class Stork {}
Object.assign(Stork.prototype, Flyable);

class Parrot {}
Object.assign(Parrot.prototype, Flyable);

class Penguin {}
Object.assign(Penguin.prototype, Swimmable);

class Ostrich {}
Object.assign(Ostrich.prototype, Swimmable);

class Duck {}
Object.assign(Duck.prototype, Swimmable, Flyable); // both traits 

class Goose {}
Object.assign(Goose.prototype, Swimmable, Flyable);
```

#### Why factory function w/ mix-in bad

Some JavaScript developers argue that you should use factory functions with mix-ins exclusively. They suggest that inheritance fails at modeling some scenarios, but a combination of factory functions and mix-ins can model any object relationship. 

- Why bother with class/constructor inheritance at all? 
- Why not just use factory functions that mix in other objects instead? If we did that, we could rewrite our example like this:

```js
// factory functions, not constructors
const Swimmable = {
  swim() {}
}

const Flyable = {
  fly() {}
}

function createFlyingBird() {
  return Object.assign({}, Flyable);
}

function createSwimmingBird() {
  return Object.assign({}, Swimmable);
}

function createTalentedBird() {
  return Object.assign({}, Swimmable, Flyable);
}

function createStork() {
  return createFlyingBird();
}

function createParrot() {
  return createFlyingBird();
}

function createPenguin() {
  return createSwimmingBird();
}

function createOstrich() {
  return createSwimmingBird();
}

function createDuck() {
  return createTalentedBird();
}

function createGoose() {
  return createTalentedBird();
}
```

This approach is valid, but it suffers the downsides of all factory functions:

1. Every new object receives a new copy of all of its methods, including new copies of both mix-in methods and the methods that belong more directly to the object. That can be taxing on memory resources, even more so than the memory requirements of mix-ins.
2. You can't determine the type of an object created with a factory function: the `instanceof` operator only recognizes these objects as instances of the `Object` type. As far as JavaScript is concerned, a penguin and a fish and an automobile are indistinguishable. That's not as troubling as it might sound in terms of being able to solve programming problems, but it has a more significant impact on debugging.



# Polymorphism (4)

Summarized

- Definition: Polymorphism refers to the ability of objects of <u>different types</u> to respond <u>in different ways to</u> the <u>same</u> method invocation. 
  - It's a crucial concept that can lead to more maintainable code. 
- Polymorphism through inheritance: 

  - Definition:  **overriding** a method inherited from a superclass.
  - An example is the `toString()` method
    - `toString()` returns a string representation of an object `[object Type]`
    - `toString()` can be overridden by creating a function in place of it. 
- Polymorphism through **Duck-typing**: 
  - Definition: Objects of <u>different unrelated types</u> use the same method ***name*** to perform different but related functions. 

- ------

  Summary : Polymorphism refers to the ability of objects of <u>different types</u> to respond to the <u>same</u> method invocation. It can be implemented through inheritance by *method overriding*. It can also be implemented through **duck typing**; by ensuring that objects of *different types* use the same method *name* to perform different but related functions, those objects can be interacted with in a uniform way.

**Polymorphism** refers to the ability of objects of different types to respond in different ways to the same message (or method invocation). 

-  <u>Object type</u>:  As long as the objects involved use the same method name and take the same number of arguments, we can treat the object as belonging to a specific category of objects.

-  That is, data of different types can respond to a common interface. 
-  When two or more object types have a method with the same name, we can invoke that method with any of those objects.
-  When we don't care what type of object is calling the method, we're using polymorphism.
-  Often, polymorphism involves inheritance from a common superclass. However, inheritance isn't necessary as we'll see in this assignment.
-  It's a crucial concept in OO programming that can lead to more maintainable code.

-  For example, assume we have a method that expects an argument that has a `move` method. We can pass it any type of argument, provided it has a compatible `move` method. The object might represent a human, a cat, a jellyfish, or, conceivably, even a car or train. That is, it lets objects of different types respond to the same method invocation.

There are two chief ways to implement polymorphism.

1. Polymorphism through inheritance: 

   - Definition: Objects of different types can respond to the same method call simply by **overriding** a method inherited from a superclass.
   - An example is the `toString()` method

2. Polymorphism through **Duck-typing**: Objects of different types use the same method *name* to perform different but related functions

   - Definition: When objects of different unrelated types both respond to the same method name.

   - We aren't concerned with the class or type of an object, but whether the object has a particular behavior. 
     - As long as the objects involved use the same method name and take the same number of arguments, we can treat the object as belonging to a specific category / type of objects. 
     - *If an object quacks like a duck, we can treat it as a duck*. 
   - Duck typing is an informal way to classify or ascribe a type to objects- whereas Classes and constructors provide a formal way to do that. 
     - For example  an application may have a variety of elements that can respond to a mouse click by calling a method named something like `handleClick`. Those elements may be completely different -- for instance, a checkbox vs. a text input field -- but they're all *clickable* objects. 

#### Polymorphism Though Inheritance

- Definition: Objects of different types can respond to the same method call simply by **overriding** a method inherited from a superclass.

- Example

  ```js
  class Animal {
    move() {}
  }
  
  class Fish extends Animal {
    move() {
      console.log("swimming");
    }
  }
  
  class Cat extends Animal {
    move() {
      console.log("walking");
    }
  }
  
  // Sponges and Corals don't have a separate move method - they don't move
  class Sponge extends Animal {}
  class Coral extends Animal {}
  
  let animals = [new Fish(), new Cat(), new Sponge(), new Coral()];
  animals.forEach(animal => animal.move());
  ```

  - Every object in the array is a different animal, but the client code -- the code that uses those objects -- doesn't care what each object is. The only thing it cares about here is that each object in the array has a `move` method that requires no arguments. That is, every generic animal object implements some form of locomotion, though some animals don't move. The interface for this class hierarchy lets us work with all of those types in the same way even though the implementations may be dramatically different. That is polymorphism.
  - If we run the above code, we call the `move` method for each of 4 different kinds of animal. Let's look at them in pairs.
  - The `Sponge` and `Coral` classes don't have a `move` method -- at least not one of their own. Instead, they both inherit it from the `Animal` class via the prototype chain. Thus, when we call `move` on a `Sponge` or `Coral` object, the `move` method in the `Animal` class gets called. That method does nothing here, so the `Sponge` or `Coral` doesn't move. This is polymorphism through inheritance -- instead of providing our own behavior for the `move` method, we're using inheritance to acquire the behavior of a supertype. In this case, that behavior does nothing, but it could do something else.
  - For `Fish` objects, we call the `move` method from the `Fish` class, which enables a fish to swim. Likewise, a `Cat` object walks when we tell it to `move`. This is a simple example of polymorphism in which two different object types can respond to the same method call simply by **overriding** a method inherited from a superclass. In a sense, overriding methods like this is similar to duck-typing, a concept that we'll meet shortly. However, overriding is generally treated as an aspect of inheritance, so this is polymorphism through inheritance.

- Another example is the `toString()` method

  - The `Object` type provides a default implementation of `toString()` that other types inherit. Other types can also override the method to return a customized string representation of the object. Without customization, `toString` returns the string `'[object Object]'` when called on an object. With customization, it can return something more meaningful and useful. For instance, arrays and dates are objects that have customized `toString` methods:

  ```js
  > [1, 2, 3].toString()
  '1,2,3'
  
  > (new Date()).toString()
  'Fri Jun 28 2019 20:50:13 GMT-0700 (Pacific Daylight Time)'
  ```

##### `toString()` method

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString

- Syntax

  ```js
  toString();
  ```

- Return value: a string representing the object. 

- An object's `toString()` method is most commonly invoked when that object undergoes...

  - explicit [type conversion](https://developer.mozilla.org/en-US/docs/Glossary/Type_Conversion) to a string 

    ```js
    String(obj);
    ```

  - implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) into a string

    ```js
    let obj = [];
    console.log(`${obj}`); // implicit type coeorcion in string interpolation
    ```

- While not as common, the method can be invoked directly (for example, `myObject.toString()`).

- By default `toString()` returns `"[object Type]"`, where `Type` is the object type.

  ```
  const o = new Object().toString() // o is "[object Object]";
  ```

- Can override `toString` by creating a function in place of it. 

  - creating a custom `toString` inside of the constructor / class of the instance object. 

  ```js
  // from OO 21.js
  toString() {
   if (this.isHidden()) return "Hidden";
   return `${this.getRank()} of ${this.getSuit()}`;
  }
  ```

- array.toString()

  ```js
  [1, 2, 3].toString(); // 1,2,3
  ```


#### Polymorphism Through Duck Typing

- Definition:  Objects of *different unrelated* types use the same method *name* to perform different but related functions
  - When objects of different unrelated types both respond to the same method name.

- We aren't concerned with the class or type of an object, but we do care whether the object has a particular behavior. 
  - As long as the objects involved use the same method name and take the same number of arguments, we can treat the object as belonging to a specific category / type of objects. 
  - *If an object quacks like a duck, we can treat it as a duck*. 
- Duck typing is an informal way to classify or ascribe a type to objects- whereas Classes and constructors provide a formal way to do that. 
  - For example  an application may have a variety of elements that can respond to a mouse click by calling a method named something like `handleClick`. Those elements may be completely different -- for instance, a checkbox vs. a text input field -- but they're all *clickable* objects. 

- Example:  we define a `Wedding` class and several preparer classes. The example attempts to implement polymorphic behavior without using duck typing; it shows you how you **shouldn't** do it!

```js
class Chef {
  prepareFood(guests) {
    // implementation
  }
}

class Decorator {
  decoratePlace(flowers) {
    // implementation
  }
}

class Musician {
  preparePerformance(songs) {
    // implementation
  }
}

class Wedding {
  constructor(guests, flowers, songs) {
    this.guests = guests;
    this.flowers = flowers;
    this.songs = songs;
  }

  prepare(preparers) {
    preparers.forEach(preparer => {
      if (preparer instanceof Chef) {
        preparer.prepareFood(this.guests);
      } else if (preparer instanceof Decorator) {
        preparer.decoratePlace(this.flowers);
      } else if (preparer instanceof Musician) {
        preparer.preparePerformance(this.songs);
      }
    });
  }
}

let preparers = [new Chef(), new Decorator(), new Musician()];
```

- The problem with this code is that the `prepare` method has too many dependencies; it relies on specific classes and their names. It also needs to know which method it should call on each type of object, as well as the arguments that each method requires. If you change the way any of those methods are used or add a new type of preparer, you must also change `Wedding.prototype.prepare`. For instance, if we need to add a dressmaker, we must add another `else` clause. With only 4 preparers, `prepare` is already becoming long and messy.

- The right way to implement this program is to use duck typing to implement polymorphism:

```js
class Chef {
  prepare(wedding) {
    this.prepareFood(wedding.guests);
  }

  prepareFood(guests) {
    // implementation
  }
}

class Decorator {
  prepare(wedding) {
    this.decoratePlace(wedding.flowers);
  }

  decoratePlace(flowers) {
    // implementation
  }
}

class Musician {
  prepare(wedding) {
    this.preparePerformance(wedding.songs);
  }

  preparePerformance(songs) {
    // implementation
  }
}

class Wedding {
  constructor(guests, flowers, songs) {
    this.guests = guests;
    this.flowers = flowers;
    this.songs = songs;
  }

  prepare(preparers) {
    preparers.forEach(preparer => {
      preparer.prepare(this);
    });
  }
}

let preparers = [new Chef(), new Decorator(), new Musician()];
```

- Though there is no inheritance in this example, each of the preparer-type classes provides a `prepare` method. We still have polymorphism since all of the objects respond to the `prepare` method call. If we later need to add another preparer type, we can create another class and implement the `prepare` method to perform the appropriate actions.

- Note that merely having two different objects that have a method with the same name and compatible arguments doesn't mean that you have polymorphism. In theory, those methods might be used polymorphically, but that doesn't always make sense. Consider the following two classes:

  ```js
  class Circle {
    draw() {}
  }
  
  class Blinds {
    draw() {}
  }
  ```

  - These classes each have a method named `draw`, and the methods take no arguments. In the `Circle` class, `draw` presumably draws a circle on the screen. In the `Blinds` class, `draw` may cause the window blinds in an office building to be drawn (as in close or open). In theory, you could write some code that uses these methods polymorphically:

  ```js
  [new Circle(), new Blinds()].forEach(obj => obj.draw());
  ```

  - However, it's unlikely that this would ever make sense in real code. Unless you're actually calling the method in a polymorphic manner, you don't have polymorphism. In practice, polymorphic methods are intentionally designed to be polymorphic; if there's no intention, you probably shouldn't use them polymorphically.

# Objects

### Determining an Object's type

- Many object-oriented languages, like Java or C++, have a strong notion of object types. In most such languages, it's easy to determine the object's type, such as a dog or car. 
- JavaScript, however, treats objects and their types in a looser, more dynamic way. You can't determine the specific type of arbitrary JavaScript objects; they are dynamic structures with a type of `object`, no matter what properties and methods they have. 
- However, we can get some useful information about an object if we know which constructor created it.

- Remember that the `new` operator creates a new object. Suppose that you call the Car constructor with `new`. Informally, we can say that the resulting object is a car. More formally, we can say that the object is an **instance** of a `Car`.

- The `instanceof` operator lets us determine whether a given constructor created an object:

  ```js
  object instanceof Constructor
  ```

- One effect that we didn't mention when talking about the `new` operator is that the object it returns contains some information that ties it back to the constructor that created the object. The `instanceof` operator uses that information to determine what constructor created the object. 

- Definition: The operator `instanceof` tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object. The return value is a `boolean` value. 

### Object creation

- Objects can be initialized using [`new Object()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Object), [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create), or using the **object literal syntax** / *literal* notation (*initializer* notation). An object initializer is a comma-delimited list of zero or more pairs of property names and associated values of an object, enclosed in curly braces (`{}`).

- **object-literal syntax** (object initializer)

  - created with curly braces

  - ```js
    const object1 = { a : 'foo', b: 42, c: {}};
    ```

  - Function using object literal syntax

    ```js
    function makeObj() {
      return {
        propA: 10,
        propB: 20,
      };  
    }
    ```


  - Function NOT using object literal syntax

    ```js
    function makeObj() {
      let obj = {};
      obj.propA = 10;
      obj.propB = 20;
      return obj;
    }
    ```

- object literals, object factories, constructors and prototypes (the pseudo-classical approach), the OLOO pattern (prototypal inheritance), and ES6 classes.

### Compare and Contrast Object creation patterns

| Object creation patterns                                     | Advantages                                                   | Disadvantages                                                |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Object literals                                              | 1) simple, works with one object as a type.                  |                                                              |
| Factory Function                                             | 1) create objects with private state                         | memory inefficient                                           |
| prototypal inheritance (OLOO)                                | 1) simpler, work with one object at time 2) memory efficient 3) uses prototypal delegation |                                                              |
| pseudo-classical approach(constructors and prototypes) (Constructor Functions) | 1) Like prototypal inheritance, uses prototypal delegation under the hood. 2) memory efficient | 1) only inherit properties and methods from parent constructor function's `prototype` object |
| ES6 classes                                                  | 1) JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages. 2) Subclasses inherit ALL methods and properties from parent class. | 1) JavaScript does not have classes in the traditional sense. Prototypal inheritance is used to link objects together. |

- **Difference between prototypal inheritance and psuedo-classical inheritance**
  - Prototypal inheritance works with objects(one object at a time. Uses prototypal delegation. 
  - Pseudo-classical inheritance involves functions. Also uses prototypal delegation. 
- **Difference between class and pseudo-classical inheritance**
  - subclass inherits <u>all the methods and properties</u> from parent class. 
  - pseudo-classical inheritance lets us inherit only the properties that have been defined on the parent constructor function???s `prototype` object. 
  - JavaScript does not have classes in the traditional sense. Prototypal inheritance is used to link objects together.
- **OLOO vs factory functions**
  - Objects created with the OLOO have a prototype object that contains the methods associated with the created objects. Since all pets created from the prototype share a single prototype object, they all share the same methods. With the factory function, each object has a copy of all the methods. Thus, objects created by OLOO are more efficient in terms of memory use.
  - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.
- **Factory functions vs pseudoclassical inheritance**
  - An advantage of the factory pattern is that it lets us create objects with private state. 
    - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.
  - Disadvantage of object factory

    - Wastes memory: Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
    - Can't identify which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 
      - No way to inspect the object and learn whether we created it with a factory function, or which factory function. 
      - It's impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics. 
  - Advantage of constructor 
    - Can determine an Object's type(which constructor created the object) using `instanceof` or `constructor` property
    - Memory efficiency: Saves memory because constructors create objects that inherit from constructor's prototype object. So instance objects created by a constructor can have own properties as well as inherited properties, unlike factory functions where inheriting objects must have an own copy of every property.
      - constructors have a prototype property that references an object that instance objects inherit from. So properties defined on the constructor `prototype` property are shared through the prototype chain. 
      - Instance methods are usually stored in the constructor's `prototype` object rather than directly on the instance object. 
    - Prototypes can be overridden by assigning inheriting objects their own properties

# Concepts for Object Creation Patterns (summarized)

#### Inheritance

- **All** inheritance in JavaScript is prototypal inheritance/ works via prototypal delegation.

- When 'comparing' prototypal inheritance and pseudo-classical inheritance, we're essentially comparing two things at different levels of abstraction. 

- Pseudo-classical inheritance is an abstraction. It is essentially a pattern that combines two features of JavaScript -- prototypal delegation and constructor functions -- in order to *mimic* the kind of class-based inheritance we see in other languages. 
- To summarize: since pseudo-classical inheritance is an attempt to *mimic* class-based inheritance (the 'pseduo' part), it makes sense to discuss it in the same terms that are used to explain class-based inheritance, and abstract away the lower-level detail. However, it's important to understand that *under-the-hood* it's still all prototypal delegation.

- Inheritance describes two related but distinct forms of inheritance: prototypal and pseudo-classical inheritance. 
- Why inheritance
  - Inheritance reduces complexity and conserves memory.

- Prototypal Inheritance vs pseudo-classical inheritance (4)
  - Both use prototypal delegation under the hood. 
    -  If the requested property isn't found, the object delegates the request to the object's prototype object.
    -  If the requested property isn't there either, the prototype object delegates the request to its own prototype object. 
    -  This process follows the prototype chain until the property or method is found or the end of the prototype chain is found.
  - JavaScript does not have classes in the traditional sense. Prototypal inheritance is used to link objects together.

##### Prototypal inheritance

- A simple form of inheritance that works with one object at a time, which is why it's often called **object inheritance** or **prototypal delegation**. 
- An objects internal `[[prototype]]` property points to the prototype object, and the object can delegate method calls to the prototype object. 
- Syntax
  - Use `Object.create` to create an object that inherits properties from from a prototype object.
  - The method takes an object called the **prototype object** as argument, and returns a new object that inherits properties from the prototype object. 
  - The newly created object has access to all properties and methods on the prototype object. 
  - The **inheriting object** (b) doesn't receive properties or methods of its own. Instead, it **delegates** property and method access to its prototype. 
- Factory functions &  OLOO object creation patterns use prototypal inheritance.

##### pseudo-classical inheritance

- In pseudo-classical inheritance, a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a sub-type inherits from a super-type.

- Also known as **constructor inheritance**

- Note: pseudo-classical inheritance is an attempt to *mimic* class-based inheritance (the 'pseduo' part), it makes sense to discuss it in the same terms that are used to explain class-based inheritance, and abstract away the lower-level detail. However, it's important to understand that *under-the-hood* it's still all prototypal delegation.

- The **constructor/prototype** <u>object creation pattern</u> and **class** <u>object creation pattern</u> use pseudo-classical inheritance.

- Syntax

  - Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then <u>restore the constructor</u> property of the **sub-type**'s prototype object back to the **sub-type** function. 
    - This must be done before you add new methods to the `subtype.prototype`
    - Reminder: Every <u>function</u> object has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself.

  ```js
  SubType.prototype = Object.create(SuperType.prototype);
  SubType.prototype.constructor = SubType; // restoring constructor property
  ```

  - Constructor reuse: 
    - Use `Function.prototype.call` to have the subclass "inherit" properties from the parent class.
    - Use `call` to use the super-type constructor inside subtype. Invoke the `SuperType` constructor with its execution context explicitly set to the execution context of `SubType`.


  ```js
function SubType(parameter1) {
  SuperType.call(this, parameter1, parameter2);
}
  ```

  - `class` and the `extends` keyword is an alternative form of pseudo-classical inheritance. 
    - Unlike pseudo-classical inheritance with constructors and prototypes, a class created with class inheritance inherits <u>all the methods and properties</u> from the parent class/ superclass. 

    - In the constructor and prototype pattern, sub-type usually only inherits from the super-type's `.prototype` object. 

------

#### Mix-Ins: 

- Definition

  - A mix-in is an object that defines the common behavior between multiple classes / constructors.
  - Mix-ins are used to share behavior between otherwise unrelated classes. 
  - When two more more classes share common behavior, you can move that behavior into a mix-in object.

- When to use mix-ins

  - Mix-ins work best in a "has -a" relationship. 
  - The mix-in pattern works best when an object has a capability that another object needs.
  - When you want to endow your objects(Constructor.prototype) with some capability, a mix-in may be the correct choice.
  - Use mix-in if you want to extend the abilities of a parent class. 

- Why mixins

  - JavaScript objects can only inherit from one other object. 
  - Limitation of single inheritance: limitation that objects can only have one prototype object - can only directly 'inherit' from one super-type object. This limitation makes it difficult to model certain domains using class or constructor-based inheritance. Mix-ins addresses this limitation. It's the only real workaround for the lack of multiple inheritance short of duplication. 
  - Mix-ins are useful for organizing similar methods that may be relevant to multiple classes. 
  - Mix-ins are a pattern that adds methods and properties from one object to another. 
  - It's not  inheritance / delegation with prototypes; the mix-in pattern copies the properties of one object to another with `Object.assign` or some similar technique.

- Literal definition:  A mix-in is an object that defines one or more methods that can be "mixed in" to a function, constructor, or class. This grants that class access to all of the methods in the object.

  - The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix*(copy the methods and properties of that object) *into* another object.
  - How it works: Move code shared by 2 (or more) classes into a mix-in object then `Object.assign` the `.prototype` object of all the classes which share the code, with the mix-in Object. 

- Syntax

  ```js
  Object.assign(targetObj, ...sources)
  Object.assign(Constructor.prototype, mixIn, mixIn...)
  ```

  ```js
  // class syntax
  // adds a copy of the mixed-in methods directly to each new object --> not ideal
  let mixIn {};
  
  class Cat {
    constructor(name) {
      Object.assign(this, mixin);
    }
  } 
  ```

#### Mix-ins vs Inheritance

We suggest a balance of mix-in and classical inheritance pattern: 

1. Inheritance works best when there is an "**is a**" relationship between two classes.

   - Inheritance works well when one object type is positively a sub-type of another object. 

   - In our example, it's natural for a penguin to also be a swimming bird. These types have an **is a** relationship: a penguin *is a* swimming bird. 
2. Mix-ins work best in a "**has - a** " relationship

   - The mix-in pattern works best when an object has a capability that another object needs.
   - When you want to endow your objects(Constructor.prototype) with some capability, a mix-in may be the correct choice.
   - Use mix-in if you want to extend the abilities of a parent class. 

------

#### Polymorphism

- Definition: Polymorphism refers to the ability of objects of <u>different types</u> to respond <u>in different ways to</u> the <u>same</u> method invocation. 
  - It's a crucial concept that can lead to more maintainable code. 
- Polymorphism through inheritance: 

  - Definition:  **overriding** a method inherited from a superclass.
  - An example is the `toString()` method
    - `toString()` returns a string representation of an object `[object Type]`
    - `toString()` can be overridden by creating a function in place of it. 
- Polymorphism through **Duck-typing**: 
  - Definition: Objects of <u>different unrelated types</u> use the same method ***name*** to perform different but related functions. 

# Object Creation Patterns

- The assessment requires detailed knowledge of all of these object creation patterns, including how to implement them and their nuances.
- Needless to say, being able to demonstrate this knowledge with examples on the fly requires a lot of practice.
- A good way to practice is to start from scratch and try to produce a functionally identical <u>hierarchy of objects</u> using each different object creation pattern. This practice is most effective if the hierarchy includes features such as inheritance, mix-ins, and polymorphism in order to illustrate how to implement these aspects in the different patterns.
- Lacking any and all creativity, I usually practiced with something like creating a hierarchy of vehicles using Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. 

### Hierarchy of objects template

To make things easier, let's agree that humans are not a type of animal. In my heirarchy of objects, humans are not a subtype of animals.

```js
/* 
heirarchy of objects template

animal
	- property: name
	- makeNoise(): 'growls'
cat 'inherits' from animals factory function
	- property: name
	- makeNoise(): 'meows' (polymorphism through inheritance: overriding a method inherited from a superclass.)
human
	- property: name
	- makeNoise(): 'talks' (polymorphism through ducktyping: objects of different unrelated types use the same method name to perform different but related functions.)
mixin object called mixIn
	- house() : cats and humans both live indoors. 
*/
```

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
  - house(): cats and humans live indoors. 'has - a ' relationship vs 'is - a' relationship. Cats and humans both have this capability, but are not related to each other. 

------

## Factory Functions

- Definition: Factory functions are functions that create and return objects of a particular **type**: objects with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments. Each invocation of the factory function specifies the differences between the objects with arguments. 

  - So the factory function handles the similarities (similar methods) , while each invocation specifies the differences between the object properties with arguments.

  - Instance objects created from factory functions have the same exact methods, whereas the property values of each object is customized based on the arguments. 

  - Factory function return the instance object with an explicit `return` statement. 

  - Remember that functions implicitly return `undefined` if there is no explicit return statement.

  - Factory functions don't use `this`, because the implicit execution context will refer to either global object or `undefined` in strict mode.

    ```js
    function createInvoice(services = {}) {
      return {
        phone: services.phone || 3000,
        internet: services.internet || 5500,
        total: this.phone + this.internet, // TypeError: cannot read properties of undefined
      };
    }
    
    ```

- Why factory functions & advantages

  - factory functions are useful to extract code (methods) into one place so multiple objects can use it. 
  - Factory functions automates the creation of objects, creating multiple objects of a particular type 
  - reuses code.
  - Can create objects with private state
    - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

- Disadvantage of object factory

  - Wastes memory: Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. This can have a significant performance impact, especially on smaller devices with limited memory.
  - Can't identify which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 
    - No way to inspect the object and learn whether we created it with a factory function, or which factory function. 
    - It's impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics.

##### Inheritance with factory functions

- Factory functions do not use prototypes or prototypal inheritance. 
- One factory function can reuse another factory function by using `Object.assign` to mix the object returned by another factory function into itself. 

- Mix-ins with factory functions: 
  - Can use `Object.assign` to mix the return object of one factory function into the instance object of another factory function. 


Hierarchy of objects practice

```js
/* 
animal
	- property: name
	- makeNoise(): 'growls'
cat 'inherits' from animals factory function
	- property: name
	- makeNoise(): 'meows' (polymorphism through inheritance: overriding a method inherited from a superclass.)
human
	- property: name
	- makeNoise(): 'talks' (polymorphism through ducktyping: objects of different unrelated types use the same method name to perform different but related functions.)
mixin object
	- house() : cats and humans both live indoors. 
*/
```

##### Notes

- Definition: Factory functions are functions that create and return objects of a particular **type**: objects with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments. Each invocation of the factory function specifies the differences between the objects with arguments. 
- Instance objects created from factory functions have the same exact methods, whereas the property values of each object is customized based on the arguments. 
- Why factory functions & advantages
  - Factory functions are useful to extract code (methods) into one place so multiple objects can use it. 
  - Factory functions automates the creation of objects, creating multiple objects of a particular type 
  - reuses code.
  - Can create objects with private state.
    - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

- Factory functions don't use prototypal inheritance, so one factory function doesn't inherit from another factory function. Rather, one factory function can reuse another factory function by using `Object.assign` to mix the object returned by a factory function into instance object of another factory function. 
  - So here we mix the instance object of `animals` factory function into the instance object of `cats`. 
- Polymorphism through inheritance: We override the `makeNoise` method that is inherited from the animals factory function
- Polymorphism through ducktyping: Objects of unrelated types(the instance objects of `cats` and `humans` factory functions) use the same method name `makeNoise` to perform different but related functions. 
- We use a mix-in object called `house` to endow the Cats and Humans factory functions with an `indoors()` capability. This demonstrates a 'has -a' relationship rather than an 'is-a' relationship. Cats and Human objects have this capability but they are not related objects. 

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

# 

## Objects Linking Other Objects

[reference](https://launchschool.com/lessons/d5964d17/assignments/3db48c51)

##### How it works:

 In OLOO, we have a prototype object and use `Object.create` to create new objects that inherit from that prototype. An initializer method (`init`) defined on the prototype is used to customize the state of each new object: initializing newly created objects with their own properties.  `init` returns `this`, a reference to the calling object. 

- Syntax

  ```js
  let newObj = Object.create(prototypeObj).init(state)
  ```

- Detail:   

  - OLOO lets us define a parent object from which we can create objects with shared behavior. All shared properties, the properties common to all objects are extracted to defined on this parent object. All objects of the same type then inherit from that prototype. 
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

##### Init

- Init: The initializer method customizes the state(properties) for each object. 
  - `init` is a function that initializes  property values in newly created objects. It also returns `this`, which is a reference to the object that called `init`
  - Returns a reference to the calling object, so we are able to method chain after calling `Object.create`, to refer to that new object!!
  - OLOO demonstrates chainable method calls with `init` returning the context object. 
    - A pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object ( see constructors & prototypes practice problem 6). 
  - Similar to the constructor method in classes

##### Example

```js
let carPrototype = { // is an object, not a function. 
  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },

  init(make, model, year) { // customzies state of object, the state is the new object's 'own' properties.
    this.make = make;
    this.model = model;
    this.year = year;
    return this; // remember to return a reference to the calling object
  },
};
```

- Since `init` now returns a reference to the car object it was called on, we can chain `create` and `init` and assign the result to the `car1` variable:

  ```js
  let car1 = Object.create(carPrototype).init('Toyota', 'Corolla', 2016);
  ```

##### **Advantage of OLOO over Factory Function**

- You can use both factory functions and the OLOO pattern to bulk create objects of the same type. 
- OLOO pattern has one significant advantage over factory functions: memory efficiency. 
  - Since all objects created with the OLOO pattern inherit methods from a single prototype object, the objects that inherit from that prototype object share the same methods. 
  - Factory functions, on the other hand, create copies of all the methods for each new object. That can have a significant performance impact, especially on smaller devices with limited memory.

- An advantage of the factory pattern is that it lets us create objects with private state. 
  - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

##### **Inheritance (subtyping) with OLOO**

- OLOO uses prototypal inheritance in two ways. It uses prototypal inheritance to create new objects, and it also uses prototypal inheritance to make a prototype object inherit from another prototype object. The latter is called subtyping. 

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
    return this.initialize(property); // think of this as super, we are calling on parent initializer method
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

##### Notes

- OLOO defines a parent object from which we can create objects with shared behavior. All shared properties (methods), the properties common to all objects are extracted to defined on this parent object. All objects of the same type then inherit from that prototype. 

- How it works: In OLOO, we have a prototype object and use `Object.create` to create new objects that inherit from that prototype. An initializer method called `init` defined on the prototype is used to customize the state of each new object: initializing newly created objects with their own properties.  `init` then returns `this`, a reference to the calling object, which is the newly created object.

- Why OLOO: 

  - OLOO uses prototypal inheritance, which increases memory efficiency.
  - Since all objects created with the OLOO pattern inherit methods from a single prototype object, the objects that inherit from that prototype object share the same methods. 
  - Factory functions, on the other hand, create copies of all the methods for each new object. That can have a significant performance impact, especially on smaller devices with limited memory.
  - OLOO demonstrates chainable method calls with `init` returning the context object. 
    - A pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object ( see constructors & prototypes practice problem 6). 

- Let's create 3 prototype objects `animals` `cats` and `humans`.  Let's start with the `animals` prototype object. 

  - We use `Object.create` to create an instance object `animal` that inherits from the `animals` prototype object. The `init` method is invoked by the `animal` instance object, which delegates the method access to `animals` prototype object.

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
  ```

- Next we create a `cats` prototype object. The `cats` prototype object should inherit from the `animals` prototype object. This code demonstrates inheritance/ subtyping with OLOO. 

  - We create an initializer method on `cats` called `initialize`. 
  - The `cats` initializer method `initialize` calls on the parent initializer method `init` to set the `name` property on `cats` object.
  - Chaining subtypes requires different initializer method names to prevent infinite looping. The initializer method is called `initialize` for `cats` prototype, versus `init` on the `animals` prototype. 

  ```js
  let cats = Object.create(animals);
  cats.initialize = function(name) { 
    return this.init(name); 
  }
  ```

- To demonstrate polymorphism through inheritance, we override the `makeNoise()` method inherited from `animals` prototype object.

  ```js
  cats.makeNoise = function () {
    console.log(`${this.name} meows`);
  }
  ```

- Test code

  ```js
  let cat = Object.create(cats).init('Fluffy');
  cat.makeNoise(); // Fluffy meows
  ```

- We should create the mix-in object `mixIn ` and then mix it into the `cats` prototype object.

  ```js
  let mixIn = {
    house() {
      console.log(`${this.name} lives indoors`);
    }
  };
  
  Object.assign(cats, Mixin);
  ```

- Code now looks like this

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
  ```

- Next we create the `humans` prototype object.

  - This code demonstrates polymorphism through ducktyping: Unrelated prototype objects `humans` and `cats` use the same method name `makeNoise` to perform different but related functions. 

  ```js
  let humans = {
    makeNoise() { 
      console.log(`${this.name} talks`);
    }, 
  
    init(name) {
      this.name = name;
      return this;
    }
  };
  ```

- We should mix the mix-in object into the `humans` object.

  ```js
  Object.assign(humans, mixIn);
  ```

- Then add some test code

  ```js
  let human = Object.create(humans).init('Sara');
  human.makeNoise(); // Sara talks
  human.house(); // Sara lives in a house.
  ```

##### Test Code

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

## Constructor Functions

#### Constructors: 

##### Main Points

- Definition: Constructors are functions that create and return an instance object of the constructor function.  
  - Like factory functions, constructors are also functions that create objects of the same **type**: which are objects with a particular set of methods and properties. Like factory functions,  the methods remain the same across the objects, while the property values can be customized by providing them as arguments. Each invocation of a constructor specifies the differences between the instance objects with arguments. 
  - However, the methods that remain the same across the objects,are not the instance object's "own" property, rather, they are inherited from the constructor's prototype object. This gets to the differences between constructors and factory functions.
- Rules & things
  - Naming convention: Capitalize the name of constructors and classes. Use **PascalCase** for constructor functions and classes. 

  - `obj.constructor.name` can be used to find out the name of the constructor function that created an object.
  - Inheritance can be emulated by changing where a functions `.prototype` property points to (Just remember to restore where the `.constructor` property points to).
- constructor vs ordinary functions (short)
  - Like factory functions, constructors are also functions that create objects of the same **type**.
  - What's different is that 
    - Constructor names are capitalized.
    - `new` keyword turns a function call into a constructor call. 
    - Use `this` to set object's properties and methods. 
    - Don't supply an explicit return value, because the constructor returns the newly created instance object provided that no errors occur.
    - Has a `prototype` property called the function prototype. 
- constructors vs ordinary functions (detailed)
  - We use `new` keyword / operator preceding a <u>function invocation</u> to treat the function as a constructor.
  - Every constructor has a `prototype` property that references an object called the **Constructor's `prototype` object / function prototype.** 
  - The instance object created by the constructor inherits from the Constructor's `prototype` object. 
    - The instance object's internal `[[Prototype]]`or `__proto__` property will reference the constructor's `prototype` property. 
    - This lets us set properties on the constructor's `prototype` object so that all instance objects created by the constructor will share them. 

- Return value of a constructor

  - If there is an explicit return <u>object</u>, then that object is returned. 

  - In all other situations, constructor returns the newly created object (of the type associated with the constructor), provided <u>no errors</u> occur. 

  - In particular, Constructor ignores primitive return values and returns the newly created object instead. 

##### `new` keyword

- Summary of what `new` does
  - If used before a function, it invokes an existing function as a constructor and returns the instance of the constructor function. 
  - Also used to create arrays and objects. 
- What `new` does. 
  1. It creates an entirely new object(the **instance**), with its **own** properties. 
  2. It sets the prototype of the new object( instance object's `__proto__` property) to the object that is referenced by the constructor's `prototype` property. 
  3. It sets the implicit execution context(value of `this` ) inside the function to point to the new object. 
     - Since `this` refers to the new object, we use it within the function to set the object's properties and methods. 
  4. It invokes the constructor function. 
  5. Finally, once the function finishes running `new` returns the new object "automatically"; we don't explicitly return anything.
- What `new` doesn't do.
  - It does not create a new function. 

##### Advantage of constructor 

- Can determine an Object's type(which constructor created the object) using `instanceof` or `constructor` or `isPrototypeOf`properties. 

- Constructors use prototypal inheritance which allows for memory efficiency. 

- How constructors use prototypal inheritance: because constructors create objects that inherit from constructor's prototype object. So instance objects created by a constructor can have own properties as well as inherited properties (methods), unlike factory functions where inheriting objects must have an own copy of every property and method.
  - constructors have a `prototype` property that references an object that instance objects inherit from. 
  - So properties defined on the constructor `prototype` object are shared through the prototype chain. 
  - Instance methods are usually stored in the constructor's `prototype` object rather than directly on the instance object. 

- Prototypes can be overridden by assigning inheriting objects their own properties. 

##### Other notes about constructor

- Calling a constructor without `new`

  - Function acts like ordinary function
  - Since functions that don't return an explicit value return `undefined`, calling constructor without `new` also returns undefined. 

- Creating a Constructor function that you can use with or without `new` operator

  ```js
  function Constructor(parameter) {
    if (!this instanceOf Constructor) {
      return new Constructor(paramter); // need return statement to avoid side effects 
    }
    this.parameter = parameter;
  }
  ```

- Who can be a constructor

  - **scope-safe constructors**: designed to return the same result whether its called with `new` or without new. 

    - Most, but not all, of JavaScript's built-in constructors, such as `Object`, `RegExp`, and `Array`, are scope-safe.  `String`, `Number` and `Boolean` is not:

  - You can use `new` to call almost any JavaScript function that you create. 

  - You can also use `new` on methods that you define in objects. Consider:

    ```js
    let foo = {
      Car: function(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
      }
    };
    
    let car1 = new foo.Car('Toyota', 'Camry', 2019);
    car1.make; //=> 'Toyota'
    ```

- Who can't be a constructor

  - You cannot call arrow functions with `new` since they use their surrounding context as the value of `this`:

    ```js
    let Car = (make, model, year) => {
      this.make = make;
      this.model = model;
      this.year = year;
    }
    
    new Car(); // TypeError: Car is not a constructor
    ```

  - Calling a method defined with concise syntax (also called a concise method) won't work:

    ```js
    let foo = {
      Car(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
      }
    };
    
    new foo.Car(); //=> Uncaught TypeError: foo.Car is not a constructor
    ```

  - Many -- but not all -- built-in objects and methods are incompatible with `new`:

    ```js
    new console.log(); //=> Uncaught TypeError: console.log is not a constructor
    new Math();        //=> Uncaught TypeError: Math is not a constructor
    new parseInt("3"); //=> Uncaught TypeError: parseInt is not a constructor
    
    new Date();        //=> 2019-06-26T02:50:20.191Z
    ```

##### `Constructor` property 

- Definition: Returns a <u>reference</u>(not string name!) to the constructor function that created the instance object. 

- Syntax

  ```js
  obj.constructor 
  ```

- `constructor` property is located on a constructor's `prototype` object.

- Every <u>function</u> object has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself. If `Kumquat` is a constructor function, then `Kumquat.prototype.constructor === Kumquat`.

  ```js
  function func() {
  }
  console.log(func.prototype.hasOwnProperty('constructor')); // true
  ```

- Careful: this could be reassigned, and needs to be restored when using pseudo-classical inheritance pattern by pointing the subtype's `prototype` object's  `constructor` property back to the subtype. 

- `constructor` property can be used to create new objects 

  ```js
  let rex = new Terrier();
  let spot = new rex.constructor(); // is invocation syntax necessary? 
  // is the equivalent of calling new Terrier();
  // Can use this method if we don't know the name of an object's constructor. 
  ```

##### Properties & operators

- `constructor.name` 

  - constructors have a name property that returns the function's name (as a string) as specified when it was created.

  ```js
  console.log("Hello".constructor.name); // string
  console.log([1, 2, 3].constructor.name); // array
  console.log({ name: 'Srdjan' }.constructor.name); // object
  ```

  - Note that the `name` property is directly on the constructor and not the constructor's `prototype` object.

  ```js
  function Cat() {}
  
  let cat = new Cat();
  
  console.log(Cat.name); // Cat
  console.log(Cat.hasOwnProperty('name')); // true
  console.log(Cat.prototype.hasOwnProperty('name')); // false
  ```

- The **`typeof`** operator returns a string indicating the type of the unevaluated operand.

  ```js
  console.log(typeof Array); // 'function'
  console.log(typeof Function); // 'function'
  console.log(typeof Object); // 'function'
  ```

  ```js
  console.log(typeof "Hello"); // string
  console.log(typeof [1,2,3]); // object
  console.log(typeof {name: 'Srdjan'}); // object
  ```

- `instanceof`  

  - Definition: This operator tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object. The return value is a Boolean value. 

  ```js
  Object instanceof Constructor
  ```

  - The `instanceof` operator requires the object to the right to have a `prototype` property, such as a function object. In most cases, that means the object on the right is a constructor or class. 

  ```js
  let Animal = {};
  let Cat = Object.create(Animal);
  let fluffy = Object.create(Cat);
  console.log(fluffy instanceof Animal); // TypeError: Right-hand side of 'instanceof' is not callable 
  ```

##### Terminology Confusion: constructor's `prototype` property

- **<u>Constructor's `prototype` property</u>**

  - Also known as **constructor's prototype object / function prototype / `prototype` property**

  - `Constructor.prototype` references the constructor's prototype object.
    - The constructor stores the prototype object in its `prototype` property; that is, if the constructor's name is `Foo`, then `Foo.prototype` references the constructor's prototype object.

  - The **constructor's prototype object** is the object that the the instance object(inheriting object) created by a constructor inherits from. 
    - When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the current value of `Foo`'s `prototype` property. 
    - The inheriting object's prototype references `Foo.prototype`.
    - Even if you assign `constructor.prototype` to a different object, the instance object's prototype does not change: it's still the original constructor's prototype object defined during the constructor's invocation. 
    - Even if we define a methods on the constructor's`prototype` object after we create an instance object, it becomes available to that instance object. That is because objects hold a reference to their prototype object, if the prototype object changes in some way, the changes are reflected in the inheriting object as well. 

  - Every JavaScript function has this property but JS only uses it when you call that function as a constructor using the `new` keyword.

  - Constructor's prototype object also contains a `constructor` property. The `constructor` property points back to the function itself.  


    - Note: constructors <u>don't inherit</u> from the constructor's prototype object. 


- <u>**An object's prototype**</u>: 
  - In most cases, when we talk about a **prototype** without being more explicit, we mean an **object prototype**.

  - Referenced by  dunder proto `__proto__` or hidden `[[Prototype]]` property

  - An **object's prototype**  is what an inheriting object's `[[Prototype]]` or `__prototype__` property references. 
    - It is the object that the current object inherits from. 
    - If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. 

- Why it's confusing

  - By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.

  - The inheriting object's prototype, referenced by dunder proto and hidden `[[prototype]]` property, will usually reference `Constructor.prototype` (constructor `prototype` property) given that the constructor is the constructor function that created that object. 
  - In other words, If a function is used as a constructor, the returned object(instance object)'s `[[Prototype]]` will reference the constructor's prototype property. 

#### Object creation with constructors: constructor/ prototype pattern

- Constructors use the **constructor/prototype pattern** to create objects, also known as **pseudo-classical** object construction.

- In this pattern, we use a constructor function to define <u>state</u> and prototype object to define <u>shared behaviors</u> (common methods) in the instance objects. 

  -  A constructor creates an instance object with its own properties.
  -  The instance object inherits methods from the constructor's prototype object, referenced by `Constructor.prototype`. 

- Example 1

  ```js
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

- The constructor/prototype pattern forms the basis of **pseudo-classical inheritance**, also called **constructor inheritance**. 

- In **pseudo-classical inheritance**, a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a sub-type inherits from a super-type.

- We are creating a link without executing code in the parent constructor function. 

- This lets us inherit only the properties that have been defined on the parent constructor function's `prototype` object, not instance methods or properties on the parent constructor. 

Syntax

- Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then <u>restore the constructor</u> property of the **sub-type**'s prototype object back to the **sub-type** function. 
  - This must be done before you add new methods to the `subtype.prototype`
  - Reminder: Every <u>function</u> object has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself.

```js
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType; // restoring constructor property
```

- Constructor reuse: Use `call` to use the super-type constructor inside subtype. Invoke the `SuperType` constructor with its execution context explicitly set to the execution context of `SubType`.

```js
function SubType(parameter1) {
  SuperType.call(this, parameter1, parameter2);
}
```

------

#### Notes

Let's start by writing some code for the animals constructor. As I write code, I will demonstrate how constructor functions work and their differences between factory functions.

- To start, Definition: Constructors are functions that create and return an instance object of the constructor function.
- Like factory functions, constructors are also functions that create objects of the same **type**: which are objects with a particular set of methods and properties. Like factory functions,  the methods remain the same across the objects, while the property values can be customized by providing them as arguments. Each invocation of a constructor specifies the differences between the instance objects with arguments. 

Lets set the `name`parameter as a property on the instance object.

- constructor names are capitalized.
- we use `this` to set the instance object's properties and methods (assign the instance properties to the arguments).

```js
function Animals(name) {
  this.name = name;
}
```

This gets to the differences between construcors and factory functions.

- The methods that remain the same across the objects,are not the instance object's "own" property, rather, they are inherited from the constructor's prototype object. This gets to the differences between constructors and factory functions.

- Constructors have a  `prototype` property that references an object called the **Constructor's prototype object / function prototype.** 
- The instance object created by the constructor inherits from the Constructor's `prototype` object.
  - The instance object's internal `[[Prototype]]`or `__proto__` property will reference the constructor's `prototype` property. 
- This lets us set properties on the constructor's `prototype` object so that all instance objects created by the constructor will share them.  

In this case, `makeNoise` method will not be set directly on the instance object, but rather on the constructor's prototype object, referenced by `Animal.prototype`.

```js
function Animals(name) {
  this.name = name;
}

Animals.prototype.makeNoise = function () {
  console.log(`${this.name} growls`);
}

// test code
let animal = new Animals('Bobo');
animal.makeNoise(); // Bobo growls
```

This code also demonstrates how we use the **constructor/prototype** pattern or  to create objects, also known  as  **pseudo-classical** object construction. In this pattern, we use a constructor function to define <u>state</u> and prototype object to define <u>shared behaviors</u> (common methods) in the instance objects. 

Next I will create the `Cats` constructor which inherits from the `Animals constructor`. 

```js
function Cats (name) {
  this.name = name;
}

let cat = new Cats('Fluffy');
```

We want `Cat` objects to inherit the`makeNoise` method from the `Animals` objects. 

Constructors use **pseudo-classical inheritance**. In **pseudo-classical inheritance**, a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. 

- We are creating a link without executing code in the parent constructor function `Animals`.

- This lets us inherit only the properties that have been defined on the parent constructor function's `prototype` object, not instance methods or properties on the parent constructor. 

> Syntax
>
> - Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then <u>restore the constructor</u> property of the **sub-type**'s prototype object back to the **sub-type** function. 
>   - This must be done before you add new methods to the `subtype.prototype`
>   - Reminder: Every <u>function</u> object has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself.
>
> ```js
> SubType.prototype = Object.create(SuperType.prototype);
> SubType.prototype.constructor = SubType; // restoring constructor property
> ```
>
> - Constructor reuse: Use `call` to use the super-type constructor inside subtype. Invoke the `SuperType` constructor with its execution context explicitly set to the execution context of `SubType`.
>
> ```js
> function SubType(parameter1) {
>   SuperType.call(this, parameter1, parameter2);
> }
> ```

- Use `Object.create` to make the `Cats` constructor a subtype of `Animals` constrcutor. 
- Then <u>restore the constructor</u> property of `Cats` prototype object back to `Cats`. 
  - The constructor's prototype object has a constructor property that points back to the function itself. 
  - We can use the `name `property on the constructor to check whether we were successful in doing this.

```js
function Cats (name) {
  this.name = name;
}

Cats.prototype = Object.create(Animals.prototype);
Cats.prototype.constructor = Cats;

let cat = new Cats('Fluffy');
console.log(cat.constructor.name); // Cats
```

We could reuse the `Animals` constructor inside `Cats`. So we can rewrite the `Cats` constructor like this.

```js
function Cats (name) {
  Animals.call(this, name);
}

Cats.prototype = Object.create(Animals.prototype);
Cats.prototype.constructor = Cats;

let cat = new Cats('Fluffy');
```

Here we use `call` to use the super-type constructor inside subtype. We invoke the `Animals` constructor with its execution context explicitly set to the execution context of `Cats`.

Since `Cats` inherits from `Animals`, `cat` should be  now able to delegate the acesss of method `makeNoise` to its prototype object, `Cat.prototype`, which delegates access to `Animals.prototype`. 

```js
function Cats (name) {
  Animals.call(this, name);
}

Cats.prototype = Object.create(Animals.prototype);
Cats.prototype.constructor = Cats;

// test code
let cat = new Cats('Fluffy');
cat.makeNoise(); // Fluffy meows.
```

Oh! We run into an issue here. We don't want Fluffy to growl, we want Fluffy to meow because it is a cat. So now I will demonstrate polymorphism through inheritance, where we override the inherited `makeNoise` method by setting it as a method directly on the `Cat.prototype` object.

```js
function Cats (name) {
  Animals.call(this, name);
}

Cats.prototype = Object.create(Animals.prototype);
Cats.prototype.constructor = Cats;

Cats.prototype.makeNoise = function () {
  console.log(`${this.name} meows`);
};

// test code
let cat = new Cats('Fluffy');
cat.makeNoise(); // Fluffy meows.
```

Next, we should create a mix in object and mix it into the `Cats` constructor's prototype object so that instance objects created by `Cats` constructor can inherit the capability of `house`. So we use `Object.assign` to mix the mixIn object.  

```js
let mixIn = {
  house() {
  	console.log(`${this.name} lives indoors`);
  }
};

Object.assign(Cats.prototype, mixIn);

cat.house();  // Fluffy lives indoors
```

Finally, we create the Humans constructor. 

- Again, we use `this` to set the instance properties on the instance object.
- We mix the mix-in object into `Humans` constructor's prototype object.
- `Humans` constructor's prototype object has a method property `makeNoise` which is not inherited from `Animals` constructor's prototype object. This demonstrates polymorphism through duck-typing, where objects of different types use the same method name to perform different but related functions.

```js
function Humans(name) {
  this.name = name;
}

Humans.prototype.makeNoise = function () {
	console.log(`${this.name} talks`);
}
Object.assign(Humans.prototype, mixIn);


let human = new Humans('Sara');
human.makeNoise(); // Sara talks
human.house(); // Sara lives indoors
```

```js
/* heirarchy of objects template
animal
	- property: name
	- makeNoise(): 'growls'
cat 'inherits' from animals factory function
	- property: name
	- makeNoise(): 'meows' (polymorphism through inheritance: overriding a method inherited from a superclass.)
human
	- property: name
	- makeNoise(): 'talks' (polymorphism through ducktyping: objects of different unrelated types use the same method name to perform different but related functions.)
mixin object called mixIn
	- house() : cats and humans both live indoors. 
*/
```



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

## ES6 Classes

#### Definition

- The **class syntax**, a relatively new addition to JavaScript, is syntactic sugar (cleaner syntax) for creating objects that use constructors and prototypes. 
  - **syntactic sugar**  means syntax designed to be easier to read or use. 
  - ES6 classes are merely syntactic sugar: the `class` statement gets translated behind the scenes to a constructor function and a prototype object, and the class name refers to the constructor function.
  - ES6 classes provide a cleaner, more compact alternative to constructors and prototypes.
  - As with functions, they are first-class citizens and come in the form of declarations and expressions. 
  - Functionally, classes behave almost identically to the constructors and prototypes they aim to replace. 
- Why classes? 
  - The reason we use classes is it that classes provide a cleaner, more compact alternative to constructors and prototypes.
  - Functionally, classes behave almost identically to constructors and prototypes, but the class syntax is easier to read and write, and the enforced `new` keyword helps prevent bugs. 
    - A significant difference between classes and constructor/prototype pattern : you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.
  - JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages.

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

This code defines a `Dog` class with two methods. The `constructor` method initializes a new `Dog` object, which it does by assigning the instance property `this.name` to the dog's name specified by the argument. The `sayHello` instance method logs a message to the console that includes the dog's name in place of `${this.name}`. The instance method `sayHello` returns `undefined`.

"Upon instantiation, assigns the passed in argument to `year` property"

#### Syntax & Rules

- Constructor Method

  - When defining a class, you usually need to define the `constructor` method.
  - The method executes certain statements when a new instance object is initialized.

  - The constructor method initializes a new `Constructor Name` object by assigning the instance properties to the arguments. 

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

  This code defines a `Dog` class with two methods. The `constructor` method initializes a new `Dog` object, which it does by assigning the instance property `this.name` to the dog's name specified by the argument. The `sayHello` instance method logs a message to the console that includes the dog's name in place of `${this.name}`. The instance method `sayHello` returns `undefined`.

- Naming convention: Like constructors and prototypes, class names are capitalized. Use **PascalCase** for constructor functions and classes. 

- Classes are **first- class citizens**

  - Mainly means we can pass classes into functions as arguments. 
  - But also means we can treat JavaScript classes like any other value: passed around to functions, returned from functions, assigned to variables, and used anywhere that a value is expected.

  ```js
  function createObject(classDef) {
    return new classDef();
  }
  
  class Foo {
    sayHi() {
      console.log('Hi!');
    }
  }
  
  let obj = createObject(Foo);
  obj.sayHi(); //=> logs 'Hi!'
  ```

##### Class vs constructor/prototype

- Similarities between class and constructor/prototype pattern

  - Anything in the constructor method is the instance object's own properties, like the constructor/ prototype pattern.  

  - In most situations, instantiating a new object from a class is identical to creating one with the constructor/prototype pattern:

    ```js
    let rec = new Rectangle(10, 5); 
    ```

  - You can even call methods on `Rectangle.prototype` in the same way:

    ```js
    console.log(rec.getArea());            // 50
    ```

  - The class code and instantiation is so similar to the constructor/prototype code that `typeof`  returns `'function'`, and `instanceof` works, to test whether an object is an instance of the constructor function. 

    ```js
    console.log(typeof Rectangle); // "function"
    console.log(rec instanceof Rectangle); // true
    ```

- Differences between class and constructor/prototype pattern

  - A significant difference: you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.
  - Constructor is now a method named `constructor` inside our class instead of being a standalone function.
  - Other methods have no special meaning; you can define as many as you need. 
  - There are no commas between the properties in class.
  - Classes look similar to the simplified (concise) method definition / compact method syntax that you can use in object literals.
  - When we define a method, it gets placed in `Constructor.prototype` object automatically.
  - One minor difference is that `rec.constructor` may produce different results in the two patterns. For example, in Node, logging `rec.constructor` produces `[Function: Rectangle]` for the constructor/prototype example, and `[class Rectangle]` for the class example. This difference is implementation dependent, and not considered significant.

##### Difference between function and class

- Classes are functions

- ES6 classes are merely syntactic sugar: the `class` statement gets translated behind the scenes to a constructor function and a prototype object, and the class name refers to the constructor function.

  ```js
  typeof Class // function
  ```

- Unlike functions, **<u>classes are hoisted but its values are not initialized</u>**. Therefore, classes must be defined before they can be constructed.  Code like the following will throw a [`ReferenceError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError):

  ```js
  const p = new Rectangle(); // ReferenceError
  
  class Rectangle {}
  ```

- **hoisting**: the engine "effectively moves" function declarations to the top of the program file in which they're defined, or the top of the function in which they are nested. 

  - Hoisting is an internal step performed by the engine; it doesn't actually move code around. 

#### How to define a class

- Class Declarations
  - Class declarations begin with the `class` keyword, followed by the name of the class. The rest of the syntax looks similar to the simplified (concise) method definition that you can use in object literals.
  - Constructor method is invoked when the class is invoked.

```js
class Rectangle {
  constructor(length, width) { // constructor method 
    this.length = length;
    this.width = width;
  }

  getArea() { // is a prototype method / instance method
    return this.length * this.width; 
  }
}

let rec = new Rectangle(10, 5);
console.log(typeof Rectangle);         // function
console.log(rec instanceof Rectangle); // true
console.log(rec.constructor);          // [class Rectangle]
console.log(rec.getArea());            // 50
```

- Class Expressions
  - Functions have an expression form that does not require a name after the `function` keyword. Classes have a similar expression form. 
  - Aside from the syntax, class expressions are <u>functionally equivalent</u> to class declarations. Which you use is primarily a matter of style.
    - This means <u>class expressions are hoisted</u>, unlike function expressions.
    - **<u>However</u>** even though class expressions & class declarations are hoisted,  their values aren't initialized, so classes need to be defined before they are constructed. 


```js
let Rectangle = class {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() { // prototype method / instance method
    return this.length * this.width;
  }
};
// This code defines a `Rectangle` class with two methods. The `constructor` method initializes a new `Rectangle` object by assigning `this.length` to the argument `length` and `this.width` to the argument `width`. The instance method `getArea()` returns the product of instance properties`this.length` and `this.width`.  
```

#### Instance and Static Properties on Class

- **Instance properties**: properties stored directly on an instance object. or anywhere in the instance object's prototype chain.

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

- **Static properties** are defined and accessed directly on the <u>constructor</u> or class,  not on an instance or a prototype.

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

- The `extends` keyword is used to denote inheritance between classes.
  - The `extends` keyword signifies that the class named to the left of `extends` should inherit from the class specified to the right of `extends`.

- Class inheritance is alternative form of **pseudo-classical inheritance**. 
- However, unlike pseudo-classical inheritance with constructors and prototypes, a class created with class inheritance inherits <u>all the methods and properties</u> from the parent class/ superclass. 
  - In the constructor and prototype pattern, sub-type usually only inherits from the super-type's `.prototype` object. 
  - In class inheritance, the subclass inherits <u>all the properties and methods</u> that a new object(instance object) created from the parent constructor function would have access to, including the instance properties assigned to instance objects.

Why class inheritance 

- Classes reduce complexity: To reduce complexity, classes with similar behaviors can inherit from a superclass. The superclass implements the common behaviors while the inheriting classes invoke them.

##### `Super`

- Outside the `constructor` method, `super` keyword refers to the parent class. 

  - `super` keyword can be used to call functions on the object's parent. 
  - `super` allows us to override a property, but still have access to functionality from a parent class.

- When called inside the `constructor` method, the `super` keyword refers to the <u>constructor method</u> for the parent class. 

  - When called in the constructor method, `super()`invokes the parent constructor function with the execution context explicitly set to the child constructor's instance object. 
  - We call the parent's constructor method to get access to the parent's **instance** properties and methods. 

  ```js
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
  }
  
  class Square extends Rectangle {
    constructor(size) { // pass variables you want to the subClass
      super(size, size); // pass variables to the parent constructor method
    }
  }
  ```

  - Thus, `super(size, size)` performs the same role performed by this code from our constructor/prototype example. 

    ```js
    function Square() {
      Rectangle.call(this, size, size);
    }
    ```

- You don't need to use `super` in every subclass `constructor`, but in most cases you do. 

  - You don't need `super` if the parent constructor and subclass constructor's code / parameters are the same.
  - **When a sub-class is invoked, the parent constructor is automatically executed.** 

- When does `super` need to called in subclass `constructor` method?

  - If subclass's `constructor` method requires arguments that differ from `constructor` method in superclass, `super` must be called inside the subclass `constructor` method.

    - In particular, if the superclass's constructor creates any object properties, `super` must be called to set those properties on the subclass.

  - Also, you must call `super` in subclass' constructor  before you use `this` in that constructor.  

    - This ensures that subclass inherits <u>all the methods and properties</u> from parent class. 

    - For instance, in the `Rectangle` class above, we create two properties in the `Rectangle` constructor, so we must call `super` in `Square`'s constructor.

  - Whenever you create `constructor` method in the subclass, you will need to call `super`. 


**<u>Don't want method overriding</u>**

- To prevent **<u>method overriding</u>**, `super` keyword can also be used to call functions on the parent object, so we can use some functionality form parent class in the subtype class. 

  - super can only call instance methods and properties on the parent object, static methods and properties must be called using the constructor name. 

    ```js
    class Vehicle {
      startEngine() { // prototype/ instance method
        return 'Ready to go!';
      }
    }
    
    class Truck extends Vehicle {
      startEngine(speed) { // prototype/ instance method
        return super.startEngine() + ` Drive ${speed}, please!`
      }
    }
    
    let truck1 = new Truck();
    console.log(truck1.startEngine('fast'));
    
    let truck2 = new Truck();
    console.log(truck2.startEngine('slow'));
    ```

  - Although using `super`  unnecessary if no method overriding occurs, since sub-type class inherits all the methods from the parent class, so we can just call on an inherited method using `this`. 

    ```js
    class Vehicle {
      startEngine() {
        return 'Ready to go!';
      }
    }
    
    class Truck extends Vehicle {
      engine(speed) {
        return this.startEngine() + ` Drive ${speed}, please!`;
      }
    }
    
    let truck1 = new Truck();
    console.log(truck1.engine('fast'));
    
    let truck2 = new Truck();
    console.log(truck2.engine('slow'));
    ```


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

------

#### Notes

The **class syntax** is syntactic sugar for creating objects that use constructors and prototypes.  

- **Syntactic sugar** means syntax designed to be easier to read or use. 

- ES6 classes are merely syntactic sugar: the `class` statement gets translated behind the scenes to a constructor function and a prototype object, and the class name refers to the constructor function.

Why classes?

- The reason we use classes is it that classes provide a cleaner, more compact alternative to constructors and prototypes.
- Functionally, classes behave almost identically to constructors and prototypes, but the class syntax is easier to read and write, and the enforced `new` keyword helps prevent bugs. 
  - A significant difference between classes and constructor/prototype pattern : you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.
- JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages.

This means that we can rewrite our code to use class syntax instead of the constructor/prototype pattern. 

How to define Class

- When defining a class, we usually need to define a `constructor` method. Basically the constructor is now a method named `constructor` inside our class instead of being a standalone function.
- The `constructor` method initializes a new object by assigning the instance properties to the arguments.
- When we define instance methods, it get placed in the constructor's prototype object automatically. 

So let's rewrite our code to use the class syntax. We will use class declarations.

- When we define the instance method `makeNoise`, it gets placed in the constructor's prototype object automatically. 
- Methods look similar to the compact method syntax that we use in object literals. There are no commas between properties in a class.

```js
class Animals {
  constructor (name) {
    this.name = name;
  }
  
  makeNoise() {
    console.log(`${this.name} growls`);
  }
}
```

- Instantiating a new object is still the same as constructor/prototype pattern.

```js
// test code
let animal = new Animals('Bobo');
animal.makeNoise(); // Bobo growls
```

Let's rewrite all the constructors to use the class pattern.

- `Cats` class inherits from the `Animals` class. 
- We use `extends` keyword to denote inheritance between these two classes. 

> - Class inheritance is alternative form of **pseudo-classical inheritance**. 
> - However, unlike pseudo-classical inheritance with constructors and prototypes, a class created with class inheritance inherits <u>all the methods and properties</u> from the parent class/ superclass. 
>   - In the constructor and prototype pattern, sub-type usually only inherits from the super-type's `.prototype` object. 
>   - In class inheritance, the subclass inherits <u>all the properties and methods</u> that a new object(instance object) created from the parent constructor function would have access to, including the instance properties assigned to instance objects.

```js
class Cats extends Animals {
  constructor(name) {
    super(name);
  }

}

```

- We use the `super` keyword to refer to the constructor method for the parent class `Animals`. 
- So instead of using `call` method, we use `super` to call on `Animals`class' constructor method with the execution context set explicitly to the instance object of `Cats` class. 

> When called inside the `constructor` method, the `super` keyword refers to the <u>constructor method</u> for the parent class. 
>
> - When called in the constructor method, `super()`invokes the parent constructor function with the execution context explicitly set to the child constructor's instance object. 
> - We call the parent's constructor method to get access to the parent's **instance** properties and methods. 

And then the same thing, we want to do polymorphism through ducktyping, so we override the inherited `makeNoise` method by creating one on the `Cats.prototype` object. 

```js
class Cats extends Animals {
  constructor(name) {
    super(name);
  }

  makeNoise() {
    console.log(`${this.name} meows`);
  }
}
```

We can erase this code, we don't need to restore the constructor property in class syntax.

```js
// Cats.prototype.constructor = Cats;
```

This is the rest of the code.

```js
class Humans { 
  constructor(name) {
    this.name = name;
  }

  makeNoise = function () {
    console.log(`${this.name} talks`);
  }
}

Object.assign(Humans.prototype, mixIn);


let human = new Humans('Sara');
human.makeNoise(); // Sara talks
human.house(); // Sara lives indoors
```



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

# Vocabulary

- **Defining**: Declaring a function or class, or using expressions to define a function or class. 
- **Class constant**: a property that belongs to the class, defined by keyword `static`
- **Lexical scoping rules**: A lexical scope in JavaScript means that a variable defined outside a function can be accessible inside another function defined after the variable declaration. 
  -  the rule that a variable defined in an outer scope is available to an inner scope

# Diagram

<img src="C:\Users\jenny\Downloads\diagram1 (1).jpg" alt="diagram1 (1)" style="zoom: 25%;" />

- All Function objects have a prototype property that references an object which contains a constructor property, which usually points back to the Function Object itself. 
  - Function objects include the Object Function, Array Function, or regular functions and constructors 
- Diagram not accurate because Object Function & Array Function themselves DO NOT have a `constructor` property. Object Function's constructor is Function. 
  - This is because JavaScript will look through all of Object???s properties, not find a ???constructor??? property, and then will look for it in the object that it???s __proto__ references, which is `Function.prototype`. `Function.prototype` has a `constructor` property, which references Function and alas we have completed the journey!
- Test code

```js
let obj = {}; // is an instance of Object Function
console.log(obj.constructor); // [Function: Object]
console.log(obj.hasOwnProperty('constructor')); // false

console.log(obj.constructor.prototype.hasOwnProperty('constructor')); // true
console.log(obj.__proto__.hasOwnProperty('constructor')); // true
// obj.__proto__ references Object.prototype

console.log(obj.constructor.__proto__); // {} which is Function.prototype, a Function object
console.log(obj.constructor.constructor); // [Function: Function].

let arr = []; // arr is an instance of Array Function
console.log(arr.constructor); // [Function: Array]
console.log(arr.hasOwnProperty('constructor')); // false
console.log(arr.constructor.prototype.hasOwnProperty('constructor')); // true
console.log(arr.__proto__.hasOwnProperty('constructor')); // true
console.log(arr.constructor.constructor); // [Function: Function]

function func() {
}
console.log(func.constructor); // [Function: Function]
console.log(func.constructor.prototype); // {} which is Function.prototype
console.log(func.prototype.hasOwnProperty('constructor')); // true
console.log(func.constructor.constructor); // [Function: Function]

```

------

# Reminders

- Use mix-ins to enhance a commonality that multiple classes share 

- Invocation syntax `()`

- Careful to use `.constructor` or `.constructor.name`. 

- **Refering** to an object or function vs is a !!

- Default parameters

  - Careful to differentiate instance properties and static (object.prototype) properties!

  ```js
  function original () {
    this.a = true;
  }
  
  original.prototype.b = true;
  
  let copy = new original();
  console.log(copy.hasOwnProperty('a')); // true
  console.log(copy.hasOwnProperty('b')); // false
  ```

  - The instance object `copy`  of the `original` function has its own copy of `a`, not `b` because `b` is inherited from the constructor prototype object. 

  - Need default parameter in case no argument is passed to a function. 
    - to avoid the error: cannot read property 'property' of undefined.

  ```js
  function createInvoice(services = {}) { // default parameter in case no object is passed to the function. 
    let phoneCharge = services.phone || 3000;
    let internetCharge = services.internet || 5500;
  
    return {
      phone: phoneCharge,
      internet: internetCharge,
  
      total: function() {
        return this.phone + this.internet;
      }
    };
  }
  
  let invoices = [];
  invoices.push(createInvoice()); // no argument passed
  ```

- Undefined

  - TypeError: you can't call a method on `undefined`. 

- A method should do one thing

  - ```js
    // Don't add this to your code!gameOver() {  this.theWinner = this.whoWon();  return this.theWinner !== undefined || this.boardIsFull();}
    ```

  - This method determines whether game is over, and as a side effect, determines who the winner is. 

  - Methods that have both a side effect and a meaningful return value or that try to perform multiple actions are generally not recommended. 

  - It should return a useful value or have a side-effect, not both. 
  
- Logical or statement

  ```js
  let obj = {};
  obj[length] = obj[length] + 1 || length;
  ```

- Reduce: sums up an array.

  ```js
  reduce ((a, b) => a + b, 0) 
  // need initial value in case array is empty
  ```

  

------

# Summary 

- You should understand the different ways to create objects in JavaScript, including object literals, object factories, constructors and prototypes (the pseudo-classical approach), the OLOO pattern (prototypal inheritance), and ES6 classes. You should be able to compare and contrast the different ways of creating objects.
- You should understand encapsulation, polymorphism, and inheritance in a JavaScript context. In particular, you should understand prototypal inheritance.
- You should understand the difference between inheritance, collaboration, and mix-ins.
  - A collaborator object is an object that helps provide state for another object. 
  - Inheritance is when a constructor inherits the properties and methods of another constructor. 
  - Mix-ins are a way to share common behaviors between classes. When two more more classes share common behavior, you can move that behavior into a mix-in object. 
    - Mix-ins are useful for organizing similar methods that may be relevant to multiple classes. 
    - It addresses the limitation of single inheritance: objects can only have one prototype object. 
    - A mix-in is a collaborator object. It provides state for classes. 
- You should understand the execution context in JavaScript. In particular, you should be intimately familiar with how JavaScript determines execution context, how it can lose that context, and how you can prevent context loss.
- You should understand both the syntactical and behavioral differences between function declarations, function expressions, arrow functions, and the compact method syntax used in classes and objects.
- You should know how to use both instance and static properties and methods.

# Quizzes

<u>**Lesson 1 [reference](https://launchschool.com/lessons/fb892747/assignments/271844ae)**</u>

<u>**Lesson 2**</u>

- <u>**Quiz 1: [reference](https://launchschool.com/lessons/1eaf5e37/assignments/39b60e49)**</u>

  - ```js
    (function sum(number1, number2) { // function expression, also is error: expected function call but instead saw an expression. 
      return number1 + number2;
    });
    
    console.log(sum(3, 4));
    ```

    JS expects function call when you use method invocation (). 

  - ```js
    const OPERATIONS = {
      '+': (num1, num2) => num1 + num2,
      '-': (num1, num2) => num1 - num2,
      '*': (num1, num2) => num1 * num2,
      '/': (num1, num2) => num1 / num2,
    };
    
    let getOperation = operation => OPERATIONS[operation];
    
    let compute = function(operation, num1, num2) {
      return operation(num1, num2);
    };
    ```

    ```js
    // doesn't work because it calls Compute without providing num1 and num2. compute returns NaN. 
    compute(getOperation('/', 18, 6)) === 3;
    
    // works
    compute(getOperation('+'), 5, 9) === 14;
    
    // raises error because theres no % operator
    compute(getOperation('%'), 9, 4)) === 5;
    ```

- <u>**Quiz 2: [reference](https://launchschool.com/lessons/1eaf5e37/assignments/69e660e6)**</u>

  - ```js
    foo() { // foo is enclosing function for arrow function
      [1, 2, 3].forEach(number => {
        console.log(`${number}: ${names[number - 1]}`); // names is outside foo scope so code doesn't work
      });
    }
    ```

  - 

<u>**Lesson 3 [reference](https://launchschool.com/lessons/e3c64e3f/assignments/cb0a5ff7)**</u>

- Execution context is determined when a function or method is invoked, not by how it is defined. Therefore, factory functions don't set the execution context for the object's methods.

- ```js
  const Animal = function(species) {
    this.species = species;
    return species;
  };
  
  Animal.prototype.sleep = function() {
    console.log(`The ${this.species} is sleeping`);
  };
  
  let lion = Animal('Panthera leo');
  lion.sleep(); // TypeError
  ```

  - Problem is that `Animal` is invoked without the `new` operator.  Without the `new` operator, `Animal` isn't called as a constructor function. Thus, `this` refers to the global object instead of a new object, and the function returns a string instead of a new object.

- Borrowing array methods for strings syntax

  - Can use non-mutating array methods on strings using `call` or `apply`. 

  ```js
  // syntax 
  let anyArray = []; // can use any array
  let string = 'yes';
  
  string = anyArray.arrayMethod.call(string, callbackFn).join('');
  string = [].arrayMethod.call(string, callbackFn).join('');
  ```

  - This doesn't work

  ```js
  string.map.call()
  ```

- [Question 9](https://launchschool.com/quizzes/03e8241a) 0 / 1 Points**Incorrect**

  Your program needs to change the case of all letters in a string to the opposite case. That is, `Naveed Fida` should be converted to `nAVEED fIDA`. You already have a function called `convertCase` that does this for a single character. It takes a single character as an argument and returns the translated result.

  Given the `convertCase` function, which of the following code snippets can be used to convert the string contained by `str`? Select all answers that apply.

  Answers

  ```js
  str = [1, 2, 3].map.call(str, convertCase).join("");
  ```

  - Correct: This code uses `call` to invoke `map` with `str` as its context, a process that allows `map` to process the individual characters of `str`. Note that we use the array `[1, 2, 3]` to invoke `call`; any array will do.

  ```js
  str = str.map(convertCase).join("");
  ```

  - Incorrect: This code attempts to call a `map` method on a string. However, strings don't have a `map` method, and they won't use `Array.prototype.map` without more specific instructions, so this code raises a `TypeError`.

  ```js
  str = Array.from(str).map(convertCase).join("");
  ```

  - Correct: this code uses the `Array.from` static method to convert `str` to an array of characters. That lets us use `Array.prototype.map` and `Array.prototype.join` to translate the characters and recombined them as a string.

  ```js
  str = str.split("").map(convertCase);
  ```

  - Incorrect: This code returns an array, not a string.

- Question 12: 

  ```js
  function Foo(parm) {
    this.parm = parm;
  }
  
  Foo.bar = function() {
    // omitted code
  };
  
  Foo.prototype.qux = function() {
    // omitted code
  };
  
  let foo = new Foo(10);
  ```

  Which of the following code is equivalent, why below code doesn't work.

  ```js
  class Foo {
    constructor(parm) {
      this.parm = parm;
    }
  
    static bar() {
      // omitted code
    }
  
    prototype: { // Confusing but --> 'prototype' here is an instance property on the prototype object of Foo. 
      qux() {
        // omitted code
      }
    }
  }
  
  let foo = new Foo(10);
  ```

  

<u>**Lesson 4: [reference**](https://launchschool.com/lessons/d5964d17/assignments/b3268d0b)</u>

- The **`instanceof`** operator tests to see if the *prototype property* of a constructor appears *anywhere in the prototype chain* of an object. The return value is a Boolean value.

  ```markdown
  object instanceof Constructor
  ```

- The `instanceof` operator requires the object to the right to have a `prototype` property, such as a function object. In most cases, that means that the object on the right is a constructor function or class.

  ```js
  let Animal = {};
  let Cat = Object.create(Animal);
  let fluffy = Object.create(Cat);
  console.log(fluffy instanceof Animal); // TypeError: Right-hand side of 'instanceof' is not callable
  ```

- Prototypal inheritance is usually linear. A prototype isn't the prototype of multiple objects. 

- Mix-in pattern uses`Object.assign` to copy the methods and properties of one object into another. 

- Question 8 **Incorrect**

  ```js
  function Person(name) {
    this.name = name;
    this.school = undefined;
  }
  
  Person.prototype.speak = function() {
    return `Hello, my name is ${this.name}.`;
  };
  
  // missing code
  
  Child.prototype.learn = function() {
    return "I'm going to school!";
  };
  
  let child = new Child("Suzy", "PS 33");
  console.log(child instanceof Child);                               // true
  console.log(child instanceof Person === false);                    // true
  console.log(Object.getPrototypeOf(child) === Child.prototype);     // true
  console.log(Object.getPrototypeOf(child).constructor === Child);   // true
  console.log(child.school === "PS 33");                             // true
  console.log(child.learn() === "I'm going to school!");             // true
  console.log();
  
  let person = new Person("Pete");
  console.log(person instanceof Child === false);                    // true
  console.log(person instanceof Person);                             // true
  console.log(Object.getPrototypeOf(person) === Person.prototype);   // true
  console.log(Object.getPrototypeOf(person).constructor === Person); // true
  console.log(person.school === undefined);                          // true
  console.log(person.speak() === "Hello, my name is Pete.");         // true
  ```

  - Incorrect Answer

    ```js
    function Child(name, school) {
      this.school = school;
      Person.call(this, name);
    }
    ```

    This code initializes the `school` property before it calls the `Person` constructor(correction: function not constructor??), which, for some strange reason, sets the `school` property to `undefined`. That overrides the intended value of the `school` property in the object returned by `Child`.

  - Correct Answer 

    ```js
    // missing code
    function Child(name, school) {
      Person.call(this, name); // this line of code returns undefined
      this.school = school;
    }
    ```

    This code returns undefined, which means Person is called as a regular function to set properties for Child's instance object, not a constructor. Constructors need to be called with new. 

- Question 9  **Incorrect**

  - `Object.assign` with a single argument merely returns a reference to that argument. Thus, this code sets the `Child` prototype to the same object used as the `Person` prototype. That causes `person instanceof Child` to return `true` since both the `Child` prototype is the same object as the `Person` prototype.

    ```js
    Child.prototype = Object.assign(Person.prototype);
    Child.prototype.constructor = Child;
    ```

  - Prototypal(pseudo-classical) inheritance requires the `Child` prototype to be a reference to the `Person` prototype, not the `Person` constructor.

    ```js
    Child.prototype = Object.create(Person); // weird code --> child is not an instance of Person
    Child.prototype.constructor = Child;
    ```

    - This code means that child is not an instance of Person, since `instanceof` tests to see if the prototype property of `Person` appears anywhere in the prototype chain of `child`.
    - This code would work

    ```js
    Child.prototype = Object.create(new Person()); 
    Child.prototype.constructor = Child;
    ```


------

# Describing Code

##### Property and method delegation

```js
let foo = {
  bar: 42,
  qux() {
    console.log("Pudding");
  },
};

let baz = Object.create(foo);
baz.qux()
```

- On line 9, `baz` object delegates the invocation of `qux` to the `foo` object. `baz` doesn't have it's own copy of the `qux` method, so JavaScript searches the prototype chain for a `qux` property and finds the property in `foo`. 
- `Object.create` creates a new object that inherits properties from an existing object (the prototype object).
  - `baz` inherits from `foo`. 

```js
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);
```

- Line line 3, `baz` object delegates the property access of `foo` to the `qux` object.  `baz` doesn't have its "own" copy of the `foo` property, so JavaScript searches the prototype chain for a `foo` property and finds the property in `qux`. 

##### Overriding

```js
let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);
```

- On line 5, `baz.foo` returns 2 because on line 3, a property `foo` is created in the `baz` object and assigned the value `2`, which overrides `baz` object's inherited `foo` property from `qux`. Property assignment doesn't use the prototype chain; instead, it creates a new property in the `baz` object named `foo`. `qux.foo` returns 1 because there is a `foo` property in `qux` with that value. This means that `baz.foo` returns the value of its "own" `foo` property and `qux.foo` returns the value of its "own" `foo` property. When added together the result is 3. 

#####  Execution Contexts

- 'The first log operation is generated by `function` or `method` on line __'
- Careful to use **refers to** or **references ** object or function rather than "is a". 
- The return value of `bind` invocation on line __ is the new function which is bound to `obj`. 
- `bind` returns a function that is permanently bound to the execution context passed to it as argument. Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`.
- Since the global object doesn't have properties defined for `firstName`, `lastName`, or `occupation`, the output isn't what we expect.

# Important Concepts

#### Objects hold a reference to their prototype objects

**<u>Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are reflected  in the inheriting object as well.</u>** 

Example 1

```js
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype.swingSword = function() {
  return this.swung;
};

console.log(ninja.swingSword());
```

- Even though we define the `swingSword` method on the prototype after we create the `ninja`, all objects created by the `Ninja` constructor share the same prototype object. Thus, when we define `swingSword`, it immediately becomes available to the `ninja` object.
- Objects hold a reference to their prototype objects. `ninja` holds a reference to its prototype object which is referenced by  `Ninja.prototype`. When `swingSword` is defined on that prototype object, it becomes available to the `ninja` object

Example 2: 

```js
function Ninja() {
  this.swung = true;
}

let ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  },
};

console.log(ninja.swingSword());
```

```js
Uncaught TypeError: ninja.swingSword is not a function
```

- We reassigned `Ninja.prototype` to an entirely new object instead of mutating the original prototype object. The prototype for the `ninja` object doesn't change; it's still the original prototype defined during the constructor's invocation. Thus, JavaScript can't find the `swingSword` method in the prototype chain of `ninja`. 

------



```js
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    this.price -= discount;
    
    return this.price;
  },
};
```

- Problem is that the `discount` method is mutating the `item` object. Objects are mutable and changes made to the property `price` of the `item` object is compounded every time the `discount` method is called. To resolve this, the `discount` method should be modified so it doesn't mutate the original object. Here's one approach:

  ```js
  function discountItem(item, percent) {
    let discount = item.price * percent / 100;
    return item.price - discount;
  }
  ```

------



# Question

Question lesson 3 

When do you need to call `super`?

From 'gist' of lesson 3, it says that if the superclass's constructor creates object properties, then `super` has to be called. 

> You don't need to use `super` in every subclass, but in most cases you do. In particular, if the superclass's constructor creates any object properties, you must call `super` to ensure that those properties are set properly. 

```js
// example given
class Rectangle {
  constructor(length, width) {
    this.length = length;
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

However, in problem 6 of the 'Easy' exercise set, the solution showed that you don't need to call `super `, even though the parent constructor creates object properties. It seems that you don't need to call `super` when the parent constructor method is identical to the subclass' constructor method. 

```js
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
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Vehicle {
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
```

Lesson 4 Quiz Question 8 Discussion 

```js
function Child(name, school) {
  this.school = school;
  Person.call(this, name);
}
```

C : This code initializes the `school` property before it calls the `Person` constructor, which, for some strange reason, sets the `school` property to `undefined`. That overrides the intended value of the `school` property in the object returned by `Child`.

Q: On line 3, `Person` is invoked as a regular function, not a constructor, correct?

Notes about this : Calling a constructor without `new`

- Function acts like ordinary function
- Since functions that don't return an explicit value return `undefined`, calling constructor without `new` also returns undefined. 

Lesson 4 Quiz Question 9 Discussion https://launchschool.com/quizzes/5bd3d1f6

**C**: Prototypal inheritance requires the `Child` prototype to be a reference to the `Person` prototype, not the `Person` constructor.

referencing this code 

```js
Child.prototype = Object.create(Person);
Child.prototype.constructor = Child;
```

Q: This is pseudo-classical inheritance, not prototypal inheritance though?

