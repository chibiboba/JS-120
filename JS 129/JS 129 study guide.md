# Questions

- One **object factory** can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.

# Lesson 1

##### OOP

- **OOP** (object oriented programming) is a programming **paradigm** in which we think about a problem in terms of objects,  by using objects to organize a program. 
  -  Strive to understand the core concepts of OO before focusing on finding optimal designs. In this course, the core concepts are far more crucial; learning how to find optimal designs and architectures may take years.
  - Choosing an approach for an OO problem always comes down to making tradeoffs.

##### Advantage and Disadvantage of OOP

- Advantages 
  - Large, complex programs can be difficult to maintain due to dependencies throughout the program. OOP lets programmers write programs in a manner that reduces dependencies and makes maintenance easier.
  - Complex coding problems are often difficult to break down and solve clearly and systematically. Using OOP to model objects and using real-world nouns to represent objects lets programmers think at a higher level of abstraction. That, in turn, helps them break down and solve problems.
  - If done right, OOP makes code flexible, easy to understand, and easy to change. 
  - Large complex procedural programs end up with functions all throughout the code split up from the data they operate on. 
- Disadvantages
  - OOP programs are often much larger than the equivalent procedural program. 
  - OOP may lead to less efficient code; OO programs may require more memory, disk space, and computing power.

------

##### Encapsulation

- **Encapsulation** is the idea of bundling data and operations related to that data in a cohesive unit called an object (grouping related properties and methods in a single object). 
- bundle state(data) and behavior(operations related to data) into a single entity (an object). 
- In OOP, encapsulation also refers to the idea of restricting access to state and some behavior, but JavaScript objects don't support that type of encapsulation.
- **Interface of an object**: the state and behaviors exposed by the object for other objects to use.
  - Encapsulation has a broader purpose in most OOP languages. It also refers to restricting access to the state and certain behaviors. An object only exposes the data and behaviors that other parts of the application need to work.  
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. Thus, other objects can't change the data of an object without going through the proper interface. Unfortunately, JS doesn't support access restrictions. 

------

##### Compact Method Syntax

- Using functions as object values (methods) is so common that there's short hand syntax called compact syntax for it. 

```js
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    raceCar.engineOn = true;
  },

  drive() {
    raceCar.fuelLevel -= 0.1;
  },

  stopEngine() {
    raceCar.engineOn = false;
  },

  refuel(percent) {
    if ((raceCar.fuelLevel + (percent / 100)) <= 1) {
      raceCar.fuelLevel += (percent / 100);
    } else {
      raceCar.fuelLevel = 1;
    }
  },
};
```

- ------

 ##### Methods

- **Methods**  are object properties that have function values. 
- You can use any valid JavaScript value, including a function object (method ) or another object, as the value of a property in an object.


```js
const cat = {
  name() { // property key is name, and value is the function. 
    return "Butterscotch";
  },

  age() {
    return 13;
  },
};
```

- **behavior** (method) change the **state** of an object. 
  - **State** means data in an object. 

------

##### this

- when you use **this** <u>inside a method</u>, it refers to the <u>object that contains the method.</u> 

  - 'this' can only be used inside a method, to refer to the object that contains the method.
  - You can access properties and methods of an object from within a method using `this` keyword. 


```js
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true; // this refers to raceCar
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};
```

```js
// both of these cause syntax error when trying to define the properties in the object. 

let cat = {
  this.name: "Butterscotch", // 'this' can only be used inside a function or method, to refer to the object that contains the method.
  this.age: 13,
};

let cat = {
  name = "Butterscotch", // incorrect syntax to define property in an object.
  age = 13
};
```

```js
// however this works
function cat() {
  this.name = 'Butterscotch';
  this.age = 13;
}
```

------

##### Collaborator Objects

- Objects that help provide state within another object are called **collaborator objects**. Objects **collaborate** with other objects by using them as part of their state. 

  - We say that two objects have a collaborator relationship if one of them is part of the state of the other.
  - Collaborator objects represent the connections between various actors in your program.
  - Collaborator objects let you chop up and modularize the problem domain into cohesive pieces. 

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
  
  pets.printInfo();
  ```

  ```js
  let cat = {
    name: 'Fluffy',
  
    makeNoise() {
      console.log('Meow! Meow!');
    },
  
    eat() {
      // implementation
    },
  };
  
  let pete = {
    name: 'Pete',
    pet: cat,
  
    printName() {
      console.log(`My name is ${this.name}!`);
      console.log(`My pet's name is ${this.pet.name}`); // can access collaborator object (cat) properties
    },
  };
  ```


------

##### Factory Functions (object factory)

- **Object factories **are functions that create and return objects of a particular type.
  - Object factories, or factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template. 
  - **Type** means an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them arguments. 
  - Each invocation of the factory function specifies the differences between the objects with arguments. 

  - Lets you automate the creation of objects. 

    - It reuses code. 
- One **object factory** can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.

```js
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true;
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};
```

```terminal
#  implement createCar on your own, then use it to create a new race car with the following details:
Make: Jaguar
Fuel Level: 0.4
Engine Status: off
```

```js
function createCar(make, fuelLevel, engineOn) {
  // To be implemented by you.
  return {
    make: 'Jaguar',
    fuelLevel: 0.4,
    engineOn: false,

    startEngine() {
      this.engineOn = true;
    },

    drive() {
      this.fuelLevel -= 0.1;
    },

    stopEngine() {
      this.engineOn = false;
    },

    refuel(percent) {
      if ((this.fuelLevel + (percent / 100)) <= 1) {
        this.fuelLevel += (percent / 100);
      } else {
        this.fuelLevel = 1;
      }
    },
  };
}

let raceCar1 = createCar('Jaguar', 0.4, false);
raceCar1.drive();
```

------

##### When solving a problem - Steps to planning an object-oriented application

1. Write a textual description of the problem or exercise. 
2. Extract the **significant** nouns and verbs from the description. 
3. Organize and associate the verbs with the nouns. 

- nouns : are the types of objects
- Verbs: are the methods, which alter state of the objects. 

------

##### Tips

- You don't want a factory function to create an object whose behavior relies on the object's property. You don't want to use if / else conditionals to create objects of different kinds. 
  - For now, we are using separate factory functions to deal with this issue.
  - **Class Inheritance**: child types inherit common properties and methods from parent type. 
    - handles this problem, but we talk about this later. 

- Good practice to initialize object properties explicitly. It makes it easy to see what the initial state of the object looks like at a glance. It also shows the state of all properties in one place. 
- Sub-types (objects) often share multiple properties and methods. JS provides some constructs that help extract such duplications to once place. We will learn about this later when we talk about constructors, prototypes, and classes. 
  -  For now, lets move common properties to a separate factory function. This function returns an object with the property. 
  -  Then use `Object.assign` to merge the two objects. 

------

##### Principles

- Extract duplicated code to a single place. It makes changes to the code less error-prone and tedious. In the long run, it often leads to less work.

------

##### Other vocab

**interface of an object**: the state and behaviors exposed by the object for other objects to use. 

- Encapsulation has a broader purpose in most OOP languages. It also refers to restricting access to the state and certain behaviors. An object only exposes the data and behaviors that other parts of the application need to work. 
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. Thus, other objects can't change the data of an object without going through the proper interface. Unfortunately, JS doesn't support access restrictions. 

------

##### Lesson 1 Summary

In this lesson, we learned about some foundational concepts of Object Oriented programming and how we can apply those in JavaScript.

Here's a summary of what we learned in this lesson. Make sure you're fully comfortable with these concepts before moving forward.

- **Encapsulation** is the idea of bundling data and operations related to that data in a cohesive unit called an object. In OOP, encapsulation also refers to the idea of restricting access to state and some behavior, but JavaScript objects don't support that type of encapsulation.
- The simplest way to create a JavaScript object is to use the object literal syntax: a pair of opening and closing curly braces. Adding methods to an objects is as simple as adding a function as the value of a property.
- You can access the properties and methods of an object from within a method using the `this` keyword.
- Objects **collaborate** with other objects by using them as part of their state. We say that two objects have a collaborator relationship if one of them is part of the state of the other.
- One way to automate the creation of objects is to use the **factory function** pattern. A factory function returns an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments.
- One object factory can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.

------

##### Practice Problems: Objects and Factories

In these problems, we will develop a factory function for objects that represent books.

The following three books should give you an idea of what our first book object should look like:

Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description

```js
// factory function
function createBook(title, author, read = false) { // default parameter
  return {
    title: title, 
    author: author, 
    read, 
    
    readBook() {
      this.read = true;
    }, 
    
    getDescription() {
      return `${this.title} was written by ${this.author}. ` +
             `I ${this.read ? 'have' : "haven't"} read it.`; // tenery operator & + to concatenate
    },
  };
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"
```

##### Quiz

-  Using `=` and `this` in this code is a syntax error.

```js
let cat = {
  name = "Butterscotch",
  age = 13
};
```

```js
let cat = {
  this.name: "Butterscotch",
  this.age: 13,
};
```

------

# Lesson 2

### Review objects

##### Objects

- are collections of properties where each property has a key and value. 
- one of  8 fundamental types. (first 5 are the primitive ones)
  - String
  - Number
  - Boolean
  - Null: null's type is object! 
  - Undefined
  - Object
  - BigInt (you don't need to know about this)
  - Symbol (you don't need to know about this)
- Object values can be any type, but **property keys are always strings**. If you define a property with a non-key string, it will first be converted into a string. 

```js
let obj = {};
obj[[1, 2, 3]] = 'three';

obj['1, 2, 3'] // 'three'
```

##### Add property

- "add" new properties to object by giving it a value , not "declare" new properties. 
- The `delete` keyword deletes a property from an object

##### Accessing Properties

- **member access notation** (**dot notation**)

  - Requires valid variable names. 

- **computed member access notation** (**bracket notation**). 

  - Can take any UTF-8-compatible string as the key. 
  - Can be computed on the fly -- any expression between the brackets gets evaluated as a string and used to reference the property. 

  ```js
  obj['a-key'] = 'four';
  
  obj.a-key 						 // SyntaxError(a-key is not a valid variable name)
  obj['a' + '-' + 'key'] // 'four'
  ```

##### Property Existence

- We get `undefined` when accessing a non-existent property. However we also get same value if we try to access a property set to `undefined`. 

- Two ways to distinguish a non-existent property from an property with value of `undefined`: 

  - `in` operator (`property in object`)
  - `hasOwnProperty` (is an instance method): Returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).

  ```js
  Object.keys(obj) = ['7', 'false', '1, 2, 3', 'a-key'];
  
  'false' in obj // true
  'true'  in obj // false
  
  obj.hasOwnProperty('7') // true
  obj.hasOwnProperty('8') // true
  ```

- Other ways to check for property existence is to enumerate(iterate over) the properties of an object.  
  
  - `Object.keys`: Returns an array of object's <u>own</u> <u>enumerable</u> property names. 
  - `Object.getOwnPropertyNames`: returns an array of <u>all</u> of object's <u>own</u> property names regardless if they’re enumerable or not. (including non-enumerable properties except for those which use Symbol) found directly on an object. 
  - `for...in` iterates over <u>all</u> <u>enumerable</u> properties of an object, including those in prototype chain. 

```js
Object.keys(obj)                    // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
Object.getOwnPropertyNames(obj)     // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
```

|                              | Enumerable | Includes Non-Enumerable | Own  | Prototype Chain |
| ---------------------------- | ---------- | ----------------------- | ---- | --------------- |
| For … in loop                | ✅          |                         |      | ✅               |
| Object.keys(obj)             | ✅          |                         | ✅    |                 |
| Object.getOwnPropertyNames() |            | ✅                       | ✅    |                 |

**Enumerable properties**: means the property can be iterated over. 

- Not all properties are enumerable. In particular, most properties and methods of the built-in types are not. 
- Usually, any properties or methods you define on for an object are enumerable. 
- You can check whether a property is enumerable with the `Object.prototype.propertyIsEnumerable` method. ( don't have to remember this)
- All properties created by simple assignment or property initializer are enumerable by default. 
- Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. 

------

### Object Prototypes

##### Object Factories

**Object factories **are functions that create and return objects of a particular type. 

- Factory functions are one way to automate object creation.  
- Extracts code to one place so multiple objects can use it. 
- Entities that are common to multiple objects such as `start` and `stop` methods get declared in one place. On the other hand, arguments passed to the factory function distinguish one object from another, such as make, model and year. 
- Serves two purposes. 

1. Returns an object that represent data of a specific type. 
2. It reuses code. 

```js
function createCar(make, model, year) {
  return {
    make,             // Same as "make: make"
    model,            // Same as "model: model"
    year,             // Same as "year: year"
    started: false,

    start() {         // Same as "start: function() {"
      this.started = true;
    },

    stop() {          // Same as "stop: function() {"
      this.started = false;
    },
  };
}

let car = createCar('Toyota', 'Corolla', 2021);
console.log(car.make); // Toyota
console.log(car.model); // Corolla
```

With the `createCar` object factory, we can create as many car objects as our program needs.

```js
let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);
```

##### Prototypes

- Although factory functions are useful to extract code into one place so multiple objects can use it, JavaScript relies heavily on prototypes. 
- In JavaScript, objects can inherit properties and behavior from other objects. If another object, for instance, has a `language` property and a `speak` behavior, a new object can access and use `language` and `speak` without explicitly defining them in the new object. 

##### prototypal inheritance(prototypal delegation)

- **Prototypal inheritance**: a feature in JS where an object can inherit the properties and methods of another object (the prototype object). 
- **Prototypal delegation**: objects lower in the prototype chain can delegate responsibility to prototypes higher up in the prototype chain. 
  - inherting objects delegate property and method access to its prototype. 
  - Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above.  
  
  Process
  
  - If the requested property isn't found, the object delegates the request to the object's prototype object.
  - If the requested property isn't there either, the prototype object delegates the request to its own prototype object. 
  - This process follows the prototype chain until the property or method is found or the end of the prototype chain is found.
- Also known as **object inheritance** since it works with one object at a time.
- **prototype**: the object that you inherit properties and methods from.
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

- The default prototype is the prototype object of the `Object` constructor (We'll see what this means later) 
  - For now, know that `Object.prototype`  provides the default prototype object. 
  - That means the default prototype is the object referenced by `.prototype` property of the `Object` constructor. 
  - This object is the "highest" in the prototypal chain of an object. 

- All JavaScript objects have access to the `hasOwnProperty` method. But where does JS get that method? Because when we create a new object, we don't have to add our own `hasOwnProperty` method. 
- JavaScript obtains the method from the object's prototype.
- All JavaScript objects inherit from a prototype. 
- By default, all object literals inherit from `Object.prototype` constructor. 

For example

```js
> let a = {}
undefined

> Object.getPrototypeOf(a)
{} // a default prototype object, which is the object returned by Object.prototype
```

- Passing an empty object to `Object.getPrototypeOf` returns a reference to the **default prototype** object. 
- The default prototype object is the prototype of all objects created using object literal syntax `{}` or `{a:2}`
- The default prototype is the prototype object of the `Object` constructor, `Object.prototype`. (We'll see what this means later) 
  - For now, know that `Object.prototype` constructor provides the default prototype object. 
  - 

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

- JS does not have classes, and functions are actually objects. The difference is that function objects are callable. 

##### The Prototype Chain (what is it, what is it used for)

- ##### What is prototype chain

  - The prototype chain is a chain of objects that are prototypes of an object. All objects in JavaScript inherit from another object called the prototype. Since the prototype of an object is also an object, the prototype can also have a prototype from which it inherits.  Objects lower in the chain inherit properties and behaviors from objects in the chain above. 

  ##### What it's used for. 

  - The prototype chain is used to look up and access properties, and this is done through **prototypal delegation**. 
  - **Prototypal delegation**: objects lower in the prototype chain delegate property and method access to prototypes higher up in the prototype chain. 

  ##### Property Access

  - When you access a property on an object, JavaScript looks for the property first in the object, then its prototype chain, all the way up to `Object.prototype`.If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`. 

    - In more detail, when I try to access a property on an object, JavaScript first looks for an "own" property with that name on the object. If the object does not define the specified property, JavaScript looks for it in the object's prototype, then if it can't find, it looks for it in the prototype's prototype.  This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.
  - When two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence.
    - A downstream object overrides an inherited property if it has a property with the same name. 
    - (Overriding is similar to shadowing, but it doesn't completely hide the overridden properties). 
  - What happens when you set a property to a different value? 

    - Property assignment creates a new "own " property in the object.
      - It assumes that the property belongs to the object named to the left of the property name. 
      - Even if the prototype chain already has a property with that name, it assigns the "own" property. 

  ##### Usefulness

  - This means that the prototype chain allows us to store an object's data and behaviors not just directly in the object itself, but anywhere in the prototype chain. It saves memory because properties can be shared through the prototype chain, rather than every object needing an own copy of each property. 
  - Looking up a property in the prototype chain is the basis for prototypal inheritance. 

  ##### Implications

  - Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well.

------

https://dev.to/aman_singh/an-easy-explanation-to-prototypal-delegation-in-javascript-3ok2

- All JavaScript objects could inherit from another object using the prototype model. 
- Since the prototype of an object is itself an object, the prototype can also have a prototype from which it inherits. 

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

- **prototype chain**: is a chain of objects that are prototypes of an object. 

  - The complete prototype chain also includes the default prototype, which is the prototype of object `a` in this case. 
  - Since the prototype of `Object.prototype` is `null`, the complete prototype chain looks like this: 

  ```
  c --> b --> a --> Object.prototype --> null
  ```
  
  - `null` has no prototype and acts as the final link in the prototype chain. 

##### The `__proto__` Property 

- The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property.
- Older JS programs use a property called  `__proto__`: **dunder proto** instead of `Object.setPrototypeOf` and `Object.getPrototypeOf`. 
  - "dunder" is shortented version of "double underscore".
  - The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property.
- As a rule, you should only use `__proto__` if you need to support very old browsers or old versions of Node, or as a convenient shortcut with temporary code or debugging operations. 

##### Property Look-Up in the Prototype Chain 

- Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above. 
- When you access a property on an object, JavaScript first looks for an "own" property with that name on the object. 
  - If the object does not define the specified property, JavaScript looks for it in the object's prototype, then if it can't find, it looks for it through the prototype chain. 
  - The process continues until it finds the property or it reaches `Object.prototype`. 
  - If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.
- When two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence. 
  - A downstream object overrides an inherited property if it has a property with the same name. 
  - (Overriding is similar to shadowing, but it doesn't completely hide the overridden properties).

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

What happens when you set a property to a different value? 

- When assigning a property on a JavaScript object, the property is always treated as an "own" property. 
  - It assumes that the property belongs to the object named to the left of the property name. 
  - Even if the prototype chain already has a property with that name, it assigns the "own" property. 

```js
console.log(c.hasOwnProperty('foo')); // => true, foo becomes an "own" property of c. 
```

- Inheriting properties from other objects also applies to methods. Methods in JS are merely properties that refer to functions. So when we discuss object properties, that also means methods. 

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

- This means that inherited objects can never alter prototype properties ( downstream objects can't alter upstream properties)
- But altering a prototype object's property alters the property of an inherited object, because inherited objects are using prototype chain to look up the value of property. 
- Property assignment creates a new "own" property in the object. 
- For property look up, it stops at `Object.prototype`, but the complete prototype chain is `null` at top? 

##### Q A 

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

##### Methods on Object.prototype

- The `Object.prototype` object is at the top of all JavaScript prototype chains. That means its methods are available from any JavaScript object, as long as you don't use `null` as the prototype object. 

  3 useful (instance) methods

  - `Object.prototype.toString()` returns a string representation of the object.
  - `Object.prototype.isPrototypeOf(obj)` determines whether the object is part of another object's prototype chain.
  - `Object.prototype.hasOwnProperty(prop)` determines whether the object contains the property.

##### Objects Without Prototypes

- Several times we've said that JavaScript objects all have a prototype object and that the prototype chain ends with `Object.prototype`
  -  In reality, there is a way to create objects that don't have a prototype and, hence, do not have a prototype chain that ends with `Object.prototype`.
- Do this by setting the prototype to `null`.
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
    - `obj.isPrototypeOf` instance method
  - If you don't first check whether `obj` has a non-`null` prototype, this code will raise an exception if `obj` has a `null` prototype. Even this code won't work properly if `obj` inherits from an object whose prototype is `null`.

##### Summary

- JavaScript objects can inherit properties from other objects. 
  - The object that another object inherits properties from is its prototype. 
  - In most cases, we use `Object.create` to create objects whose prototype we need to set explicitly. 
  - We can also use `Object.setPrototypeOf` to set the prototype of an object that already exists.
- By default, all object literals inherit from `Object.prototype`.
- When you access a property on an object, JavaScript looks for the property first in the object, then its prototype chain, all the way up to `Object.prototype`.

------

### Practice Problems 

1. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   console.log(baz.foo + qux.foo);
   ```

   Solution

   ```js
    2
   ```

   `qux.foo` returns 1 because `qux` has a `foo` property with that value. `baz` doesn't have its "own" copy of the `foo` property, so JavaScript searches the prototype chain for a `foo` property and finds the property in `qux`. 

   

2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   baz.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```

   Solution

   ```js
   3
   ```

   Their solution: We assign `baz.foo` to a value of 2. Property assignment doesn't use the prototype chain; instead, it creates a new property in the `baz` object named `foo`. When we add `baz.foo` and `qux.foo` together, `baz.foo` returns the value of its "own" `foo` property, while `qux.foo` returns the value of its "own" `foo` property. Thus, the result is 3. 

3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   qux.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```

   Solution

   ```js
   4
   ```

   On line 3, property `foo` is reassigned to value of 2 in object `qux`. On line 5, `baz.foo` returns 2 because it doesn't have an own property `foo` so JavaScript searches the prototype chain for `foo` and finds it on `qux`. `qux.foo` returns 2 because `qux` has an own `foo` property with value of 2. Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well. 

4. As we saw in problem 2, the following code creates a new property in the `baz` object instead of assigning the property in the prototype object.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   baz.foo = 2;
   ```

Write a function that searches the prototype chain of an object for a given property and assigns it a new value. If the property does not exist in any of the prototype objects, the function should do nothing. The following code should work as shown:

```js
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
```

**Iterative Solution**

```js
function assignProperty(obj, property, value) {
  while (obj !== null) { // loops until obj reaches the null prototype
    if (obj.hasOwnProperty(property)) { 
      obj[property] = value;
      break; // need this to prevent infinite looping
    }

    obj = Object.getPrototypeOf(obj); // // if property is not "own property", then search next prototype. 
  }
}
```

**Recursive Solution**

```js
function assignProperty(obj, property, value) {
  if (obj === null) { // property not found
    return;
  } else if (obj.hasOwnProperty(property)) {
    obj[property] = value;
  } else {
    assignProperty(Object.getPrototypeOf(obj), property, value); // calls on same funciton, passing prototype of obj as argument 
  }
}
```

5. Consider the following loops. 

```js
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
```

```js
Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});
```

Q: If `foo` is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.

- They don't always produce the same results since the second loop only iterates over `foo`'s "own" enumerable properties, but the first loop iterates over all of the object's enumerable properties, including those inside its prototype chain. 
- An example of when the results differ is 

```js
let bar = {a: 1, b: 2};
let foo = Object.create(bar);
foo.a = 3; 
foo.c = 4;
```

```js
// first loop outputs
a: 3 		// from foo
c: 4 	  // from foo
b: 2 		// from bar
```

```js
// second loop outputs 
a: 3 	// from foo
c: 4 	// from foo
```

- The two loops only produce the same results if the prototype chain doesn't include enumerable properties.

##### Q: How do you create an object that doesn't have a prototype? 

```js
let bareObj = Object.create(null);
```

##### Q: How can you determine whether an object has a prototype?

```js
if (Object.getPrototypeOf(obj)) {
  // obj has a prototype
} else {
  // obj does not have a prototype
}
```

------

### Function Expressions

##### 3 ways to define a function (review + new)

1. **Function declaration**: when function definition is the first thing on a line. 

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

   - Function expressions are not **hoisted** : can't use function expressions before you define them. 

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

   - Wrapping what looks like a function declaration in parentheses creates a function expression

     ```js
     // Function expression, not declaration
     (function greetPeople() {
       console.log("Good Morning!");
     }); 
     ```

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

   - Function expressions **<u>don't</u>** have to be anonymous: You can name a function expression. 

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

**Anonymous Function**: a function with no name. 

- Call back functions p methods like `forEach` and `map` are **<u>often</u>** anonymous functions, but <u>don't have to be!</u>   

```js
let name = function (x) { // function expression
  
});

let name = () => console.log('My name is'); // arrow function
```

------

##### Function Declarations vs Function Expressions

- Functions defined with function declaration syntax can be invoked before the declaration in the program. 

- This code works since the JavaScript engine runs our code in two passes. During the first pass, it does some preparatory work, while the second executes the code. 

  - One action that occurs during the first pass is called **hoisting**: the engine "effectively moves" function declarations to the top of the program file in which they're defined, or the top of the function in which they are nested. 

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

##### First Class Functions

Have these charactersitics ( from summary)

- You can add them to objects and execute them in the respective object's context.
- You can remove them from their objects, pass them around, and execute them in entirely different contexts.
- **<u>They're initially unbound</u>** but dynamically bound to a context object at **execution time**.

**first-class functions** or **first-class objects**:   means that functions are treated like any other variable: functions in JavaScript are values that we can assign to variables and properties, pass them to other functions, or return them from another function.

- Functions of all kinds, including declared functions, can be treated as values:

  - both `say` and `speak` refer to the same function.

  ```js
  function say(words) {
    console.log(words);
  }
  
  let speak = say;
  
  speak('Howdy!');   // logs 'Howdy'
  ```

  - In this case, we're passing the function `logNum` as an argument to the `forEach` method, which calls it three times. During each iteration, `logNum` is invoked and `forEach` passes it one of the array elements as an argument.
    - Notice that we don't use invocation syntax, `()`, when passing `logNum` as an argument to `forEach`. We pass the identifier that references the function. 
    - If we did, it would throw a `TypeError` exception since `forEach` expects a function.  Instead of passing a function, though, we would be passing `undefined`, the return value of `logNum()`.

  ```js
  function logNum(num) {
    console.log('Number: ' + num);
  }
  
  [1, 2, 3].forEach(logNum); // no parentheses, don't want to pass the return value of logNum()
  // Number: 1
  // Number: 2
  // Number: 3
  ```

  ```js
  function logNum(num) {
    console.log('Number: ' + num);
  }
  
  [1, 2, 3].forEach(logNum());
  // Uncaught TypeError: undefined is not a function
  ```

- Takeaways: 

  - Don't invoke functions when you want to use them as values. Use invocation only when you need to run the code in the function. 
  - Treat any function as any other JS value: remove the invocation syntax, and you got an expression whose value is a function. 
  

##### Type of a Function Value

```js
let myFunc = function() {};
typeof myFunc; // => "function"
```

- Functions are a kind of object: they are a compound type that has its own properties and methods. 
- Definition of **function**: a kind of object with properties and methods.

##### Summary

- Functions in JavaScript are first-class values, just like any other value in JavaScript. You can use them any place that you can use an expression. 
- To use a function as an expression, write its name without the parentheses of invocation. 
- All functions' type is  `function`, which is a kind of object with properties and methods.

------

### Higher Order Functions

**Higher-order function**: A function that has at least one of the following properties

1. It takes a function as argument.
2. It returns a function. 

##### Functions that Accept Functions as Arguments

- We've seen many examples of functions that have the first property. 

  - Specifically, array methods like `forEach`, `map`, `filter`, and `reduce` each take a function argument. 
  - As these methods show, functions that take other functions give the developer a lot of power and flexibility.

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

  - This approach is valid, and you'll see functions like this in languages that don't have first-class functions (nor the closely related concept of lambdas(?))

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

  - The only difference between the two functions is on line 6, where we either square a number or uppercase a string. 
  - Everything else follows same general structure
    - Declare and initialize the result array.
    - Iterate over the input array.
      - Add mapped values to the result.
    - Return the result. 

- Can we abstract away the similar structure of the two functions and leave the specific mapping operation up to the function's caller? 

  - `map` does this : it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. 
  - Does this by providing a function as argument. 
  - `map` method, along with several other array methods, are higher-order functions since it takes another function as argument. 

##### Functions That Return a Function

- Previously, we saw example of how higher-order function that takes another function lets us write elegant and flexible code.Let's look at another useful application of higher-order functions by having one return another function. 

- Can think of a function that returns another function as a function factory: it creates and returns a new function. 

  - Typically, the function factory uses the arguments you pass to it to determine the specific job performed by the function it returns.

  - To truly appreciate how useful this is, I would need to understand "closure", but we're not ready for that yet. 

  - For now, let's use an example to demonstrate the mechanics of functions returning other functions. 

    ```js
    function greet(language) {
      switch (language) {
        case 'en':
          console.log('Hello!');
          break;
        case 'es':
          console.log('Hola!');
          break;
        case 'fr':
          console.log('Bonjour!');
      }
    }
    
    greet('fr'); // logs 'Bonjour!'
    ```

    This implementation works, but if we're using a particular language over and over, we need to provide the language string every time. Instead of a `greet` function, let's implement a greeter factory that let us create a greater function for a given language. 

    ```js
    function createGreeter(language) {
      switch (language) {
        case 'en':
          return () => console.log('Hello!'); // arrow function with 0 parameters
        case 'es':
          return () => console.log('Hola!');
        case 'fr':
          return () => console.log('Bonjour!');
      }
    }
    
    let greeterEs = createGreeter('es'); // createGreeter returns a function
    greeterEs(); // logs 'Hola!' // Using variable to invoke the function. 
    greeterEs(); // logs 'Hola!'
    greeterEs(); // logs 'Hola!'
    
    let greeterEn = createGreeter('en');
    greeterEn(); // logs 'Hello!'
    ```

- This code doesn't provide a significant improvement or convenience for the developer, but it does illustrate how we might use a function that returns another function in our code.

##### Summary

- Higher-order functions are functions that return another function or take another function as an argument. 
- Higher-order functions let the programmer use powerful and flexible abstractions.

------

### The Global object

- JavaScript creates a global object when it starts running. 
  - In Node.js, the global object is the object named `global`. [object global]
  - In the browser, it's the `window` object. 
- This global object is the **implicit execution context** for function invocations. 
- Can investigate this in the node REPL or a browser's console. 

```terminal
> global
Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(util.promisify.custom)]: [Function]
  },
  __filename: '[eval]',
  exports: {},
  __dirname: '.'
```

- The global object is available everywhere in your program and houses important global properties. 
  - In the previous course, we talked about global values such as `Infinity` and `NaN`, and global functions, such as `isNaN` and `parseInt`. All these entities are properties of the global object! 
  - In your console, you can look at the global object to examine those properties.

```node
> global.isNaN      // [Function: isNaN]
> global.Infinity   // Infinity
```

- Note: don't use `isNaN` in your code. Use `Number.isNaN` instead. The bare `isNaN` function has some odd behavior:

```node
Number.isNaN('I am not a number');   // false - this is a correct value
isNaN('I am not a number');          // true - string gets coerced to NaN
```

- As with other JavaScript objects, you can add properties to the global object at any time:

```js
// in Node
> global.foo = 1
> global.foo       // 1
```

```js
// in a browser
> window.foo = 1
> window.foo       // 1
```

##### The Global Object and Undeclared Variables

- Undeclared variables are added to the global object as property. 
- The global object has an interesting property: whenever you assign a value to a variable without using the `let`, `const`, or `var` keywords (we'll discuss `var` later), the variable gets added to the global object as a property. 

```js
foo = 'bar';
global.foo; // => 'bar' (in Node)
window.foo; // => 'bar' (in a browser)
```

- Without a keyword, the variable gets added to the global object as a property. You can even access such variables without using the global object as the caller:

```js
foo = 'bar';
foo; // 'bar'
```

- Whenever you try to access a variable for which there are no local or global variables with the variable's name, JavaScript looks at the global object and looks for a property with that name. 
- In this example, since there are no local or global variables named `foo`, JavaScript looks in the global object and finds the `foo` property. As a result, line `2` is identical to `global.foo`; it returns the value of the property `foo` from the global object.

- We discuss the global object here since you need to know where JavaScript gets all those global entities like `NaN`, `Infinity`, and `setTimeout`. 
  - It's not very often that you'll need to modify the global object, but you'll sometimes use it to set properties in Node that you need in multiple modules. 

------

### Implicit and Explicit Execution Context

##### Execution Context

- Earlier, we said that `this` refers to the object that contains the method. That's true, but there's a bit more nuance to how JavaScript determines the value of `this` in a function or method call. 
- **Execution context**:  the **environment** in which a function executes. 
  - The current value of the `this` keyword. 
  - `this` refers to the **environment** (an object) in which a function executes. 
  - Execution context of a function or method call is the value of `this` when that code executes.
- The context depends on how the function or method was invoked, not on where the function was defined. 
  - In other words, <u>***how you invoke***</u> a function or method determines its execution context for that invocation. It doesn't matter how you define the function or method, nor does it matter where or when you called it. 
  - So two invocations of the same function or method can have very different execution contexts depending on how you make those calls. 
- There are two basic ways to set the context when calling a function or method
  1. **Explicit**: The execution context that you set explicitly.
  2. **Implicit**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context.
- Setting the execution context is also called **binding** **`this`** or **setting the binding**. 
  - A call binds `this` to a specific object when the function or method is called. 

##### Function Execution Context(Implicit)

- **<u>Every JavaScript function call has an execution context.</u>** 
  - This means `this` keyword is available to every function in your JavaScript program. 
  - Every time you *call* that function, JavaScript binds some object to `this`. 

```js
function foo() {
  console.log("this refers to: " + this);
}

foo();
// this refers to: [object global]
```

- Regular function calls use the global object as their execution context. 
- Within a regular function call (`foo()`), JavaScript implicitly sets the binding for `this` to the global object. 
  - Remember in Node, global object is `global` and in browser, global object is `window`. 
  - This means that when you use `this` inside the function, it refers to the global object. 
  - Can use `this` to modify access or modify properties of global object. 

```js
function foo() {
  this.bar = 'bar';
}

foo();
global.bar; // 'bar'
```

- Regular function calls do not provide explicit context, JavaScript supplies an implicit context: the global object. 
  - We say the execution context is implicit because the function invocation doesn't supply an explicit alternative. 

##### Strict Mode and Implicit Context

- When strict mode is enabled,  implicit `this` is assigned to `undefined` instead of the global object. 
  - For now, just be aware of this behavioral change. For example, strict mode shows up in JS classes and Coderpad.

```js
"use strict"; // the quotes are required

function foo() {
  console.log("this refers to: " + this);
}

foo(); // this refers to: undefined
```

##### Method Execution Context (Implicit)

- Method calls implicitly use the calling object as its execution context. 

- Method calls / method execution syntax provide an implicit execution context. 
  - We are using an explicit object to call the method, but JavaScript interprets the object as the implicit context. 

```js
let foo = {
  bar: function() {
    console.log(this);
  }
};

foo.bar(); // `foo` is the implicit execution context for `bar`
// { bar: [Function: bar] }
```

- The execution context inside a method call is the object used to call the method. 
- Be careful, however. The first-class nature of JavaScript functions has ramifications for the execution context. <u>Remember that the context is determined solely by how you call the function or method.</u> 
  - Here, `foo.bar()` is considered a method call since we *call it as a method*; that is, we use the method call syntax `object.method()`.
  - Since JavaScript functions are first-class objects, `bar` can be called in other ways that change the context:

```js
let baz = foo.bar;
baz(); // Object [global] {...}
```

- In this code, we assign the `foo.bar` method to the `baz` variable. The `foo.bar` property and the `baz` variable now refer to the same function object. 

- What should `baz()` log? 

  - Since `baz` references a method of the `foo` object, you may think that its execution context is foo. But this is wrong. 
  - Since we are calling `baz` as a standalone function, its execution context is the global object, *not* the `foo` object. 

- Question: so if we instead did this

  ```js
  foo.bar(); // Then the implicit execution context would be foo object, because we use foo object to invoke the bar method. 
  ```

##### Explicit Function and Method Execution Context

- Using parenthesis after a function or method name is not the only way to invoke it. As we've seen, 
  - When you invoke a function with parentheses, JavaScript uses the global object as the implicit context. 
  - When you invoke a method, it uses the object that you used to call the method as the implicit context. 
- You can provide an explicit context to any function or method, and it doesn't have to be the global object or the object that contains the method. 
- Instead, you can use any object -- or even `null` -- as the execution context for any function or method. 
- There are two main ways to do that in JavaScript: `call` and `apply`.

##### Explicit Execution Context with `Call`

- Remember that all JavaScript functions are objects: they have properties and methods just like any other object. 
- The general syntax for `call` is 

```js
someObject.someMethod.call(context, arg1, arg2, arg3, ...)
```

- One method that all JavaScript functions have is the `call` method. 

  - The **`call`** method calls a function with an explicit execution context. 
  - The first argument to `call` provides the <u>explicit context</u> for the function invocation. 
  - `Call` does not mutate the object passed as argument to `call`

  ```js
  // calls logNum and sets explicit execution context to obj (binds this to obj). 
  // obj becomes the explicit context. 
  function logNum() {
    console.log(this.num);
  }
  
  let obj = {
    num: 42
  };
  
  logNum.call(obj); // logs 42 
  // This code shows how the execution context is explicitely set to `obj` isntead of global object.
  // obj is not mutated. 
  ```

  The code is functionally similar to the following

  ```js
  // Makes logNum a method(property) inside obj.
  // Invokes logNum using obj, so the implicit context is obj. 
  // Mutates obj. 
  function logNum() {
    console.log(this.num);
  }
  
  let obj = {
    num: 42
  };
  
  obj.logNum = logNum; // added new property to obj. 
  obj.logNum(); // logs 42
  ```

  ```js
  // above code becomes like to this 
  function logNum() {
    console.log(this.num);
  }
  
  let obj = {
    num: 42, 
    logNum : logNum, // Note that there's no parentheses, just the logNum function identifier, not the logNum() which returns value of undefined. 
  };
  
  obj.logNum(); // logs 42
  ```

  - This code is different however because we add a new property to the `obj` object, which mutates `obj`. 
  - we don't mutate the object when we used `call`. 

- Can also use `call` to explicitly set the execution context on methods, not just functions. 

```js
// Calls the method logNum and sets explicit execution context to obj2. 
let obj1 = {
  logNum() { // logNum is a method
    console.log(this.num);
  }
};

let obj2 = {
  num: 42
};

obj1.logNum.call(obj2); // logs 42
// This code shows how the execution context is set to obj2 instead of obj1, which is the calling object of method logNum. 
```

The behavior here is similar to: 

```js
// Makes obj1.logNum a method (property) of obj2. 
// So the implicit execution context becomes obj2. 
// obj2 is mutated. 
let obj1 = {
  logNum() {
    console.log(this.num);
  }
};

let obj2 = {
  num: 42
};

obj2.logNum = obj1.logNum;
obj2.logNum(); // logs 42
```

```js
// above code becomes like this
let obj1 = {
  logNum() {
    console.log(this.num);
  }
};

let obj2 = {
  num: 42, 
  logNum : obj1.logNum, // Note: no parentheses, we are setting it to the function, not return value of the function. 
};

obj2.logNum(); // logs 42
```

- Again there is a difference because `obj2` is mutated when we give it a `logNum` property. 
  - That's the problem with this pattern. 
- Supposed our function takes arguments.

```js
function sumNum(num1) {
  return this.num + num1;
}

let obj = {
  num: 42
};
```

```js
obj.num = sumNum.call(obj, 5);
console.log(obj.num); // => 42 + 5 = 47
```

- We want to call `sumNum` in a way that it updates `obj.num`. 
- Fortunately `call`method allows you to pass multiple arguments. 

```js
// Again, can understand code better if we write it directly, which is making sumNum a method inside obj, and passing 5 to sumNum. 
function sumNum(num1) {
  return this.num + num1;
}

let obj = {
  num: 42
};

obj.sumNum = sumNum;
obj.num = obj.sumNum(5);
console.log(obj.num); // => 47
```

##### Explicit Execution Context with `apply`

- `apply`: calls a function or method with an explicit execution context (the first argument passed to it), and also (optionally) passes an array of arguments to the called function or method. 

- Only difference between `apply` and `call` is that `apply` uses an array to pass any arguments to the function. 
- General syntax of `apply`: 

```js
someObject.someMethod.apply(context, [arg1, arg2, arg3, ...])
```

- Useful if you have a list of arguments in an array.
- But with modern JS(ES6 + ) `apply` isn't needed since you can use `call` in conjunction with the spread operator to accomplish the same thing. 

```js
let args = [arg1, arg2, arg3];
someObject.someMethod.call(context, ...args);
```

> Reminder definition of **spread operator**: allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs(for object literals) are expected. 

##### Summary

- All JavaScript functions and methods execute within an execution context, sometimes called its `this` binding. 
  - How `this` gets bound depends entirely on how the function is invoked. 
  - You can't tell a function's execution context by merely looking at how the function is defined or where it's defined: you must examine the invocation itself. 
- Regular function calls implicitly use the global object as their execution context, while method calls implicitly use the calling object as their context. 
  - You can override this behavior by setting the execution context explicitly with either `call` or `apply`. 
- The mechanics of context binding is an essential but difficult concept. Most difficulties arise from forgetting that JavaScript does not use *lexical scoping rules* to determine the binding. 
  -  For instance, if you use `this` inside a method of `obj`, you expect that `this` refers to `obj`. However, that's not always the case.
  -  It's important to remember that the rules for `this` are entirely different from the rules for variable scope. 
  -  While a variable's scope is determined by where you write the code, `this` depends on how you invoke it.

------

### Practice Problems: Implicit and Explicit Function Execution Contexts

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/a6c48cbb)

1. What will the following code output? Try to determine the results without running the code.

   ```js
   function func() {
     return this;
   }
   
   let context = func();
   
   console.log(context);
   ```

   Show Solution

   The global object. In Node it's `global`; in a browser, it's `window`. Line 5 calls `func` as a function. Regular function calls implicitely use the global object as their execution context, so the implicit context for `func` is the global object, and it returns the global object. 

2. What will the following code output? Explain the difference, if any, between this output and that of problem 1.

   ```js
   let obj = {
     func: function() {
       return this;
     },
   };
   
   let context = obj.func();
   
   console.log(context);
   ```

   Show Solution

   The output is `obj`. That is because on line 7, there is a method invocation. `Func` is invoked as a method and uses the calling object `obj` as its implicit execution context. 

3. What will the following code output?

   ```js
   message = 'Hello from the global scope!';
   
   function deliverMessage() {
     console.log(this.message);
   }
   
   deliverMessage();
   
   let foo = {
     message: 'Hello from the function scope!',
   };
   
   foo.deliverMessage = deliverMessage;
   
   foo.deliverMessage();
   ```

   Show Solution

   ```terminal
   Hello from the global scope
   Hello from the function scope!
   ```

   The first log operation is generated by the function call `deliverMessage()` on line 7. Since this is a regular function call, which means that `deliverMessage` is invoked as a standalone function, the implicit execution context is the global object. `this.message` refers to the global property `message` . The second log operation occurs on line 15 where `deliverMessage()` is invoked as a method. The implicit execution context for method calls is the calling object `foo`, so `this.message` resolves to `foo.message`.  

4. What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

   Show Solution

   `call` `apply` `bind`

5. Take a look at the following code snippet. Use `call` to invoke the `add` method but with `foo` as execution context. What will this return?

   ```js
   let foo = {
     a: 1,
     b: 2,
   };
   
   let bar = {
      a: 'abc',
      b: 'def',
      add: function() {
        return this.a + this.b;
      },
   };
   ```

   Show Solution

   ```js
   bar.add.call(foo); // 3
   ```

   Since we invoke `call` on `bar.add` with `foo` as the explicit context, the `add` method uses `foo.a` and `foo.b` to determine the results, not `bar.a` and `bar.b`. Thus, the return value is 3. 

------

### Hard Binding Functions with Contexts

- JavaScript has a third way to specify the execution context: the `bind` method on function objects.

##### `bind`

- Definition: **Bind** returns a new function that is permanently bound to the context passed to **bind**  as first argument. 

  - Hard binds a function to an explicit execution context. 
  - We have to call on the new function using `()`. 

- Syntax

  ```js
  newFunc = someObject.someMethod.bind(context)
  // Or 
  function.bind(context)
  ```

- Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. Instead it returns a new function that is permanently bound to the context argument.  

  - In detail: `bind`'s context is the *original* function and it returns a new function that is permanently bound to the context passed to `bind` as first argument. When we call this new function using `()`, this new function calls on the original function/method using `apply` or `call`, passing the permanent context to it. The original function and its context is not changed.
  - What's important is to recognize that `bind`'s context is the original function, and it <u>returns a new function that calls the original function with the context supplied to bind as its first argument.</u> 
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

##### Summary

- In this assignment, we saw a third way to specify the execution context.

- Unlike `call` and `apply`, though, `bind` returns a new function that is permanently bound to the context that's provided to `bind` as the first argument. 
- You cannot alter the execution context of the resulting function, even if you use `call`, `apply`, or try calling `bind` a second time.

------

### Practice Problems: Hard Binding Functions with Contexts

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/ed3a72f0)

1. What method can we use to bind a function permanently to a particular execution context?

   Show Solution

   ```markdown
   Function.prototype.bind()
   ```

   We can use the `bind` method on function objects to permanently bind a function to an execution context. 

2. What will the following code log to the console?

   ```js
   let obj = {
     message: 'JavaScript',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   foo.bind(obj);
   ```

   Show Solution

   ```terminal
   
   ```

   Nothing is logged to the console because unlike `call` or `apply`, `bind` doesn't invoke the function used to call it. Instead, it returns a new function that is permanently bound to the context argument. 

3. What will the following code output?

   ```js
   let obj = {
     a: 2,
     b: 3,
   };
   
   function foo() {
     return this.a + this.b;
   }
   
   let bar = foo.bind(obj);
   
   console.log(foo());
   console.log(bar());
   ```

   Show Solution

   ```terminal
   NaN
   
   5
   ```

   On line 12 `foo` is invoked as a standalone function so its implicit execution context is the global object. `foo` looks for properties on the global object. Both `this.a` and `this.b` evaluate to `undefined`, resulting in a `NaN` value. `bar` refers to a function that is permanently bound to object `obj` as its explicit execution context, so when `bar` is called on line 13, it references `obj`'s properties. `this.a` and `this.b` evaluate to 2 and 3, resulting in the 5 value. 

4. What will the code below log to the console?

   ```js
   let positivity = {
     message: 'JavaScript makes sense!',
   };
   
   let negativity = {
     message: 'JavaScript makes no sense!',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   let bar = foo.bind(positivity);
   
   negativity.logMessage = bar;
   negativity.logMessage();
   ```

   My Solution 

   ```terminal
   Javascript makes sense!
   ```

   On line 15, property `logMessage` is added to the `negativity` object and assigned to `bar`. `logMessage` is invoked on line 16. `logMessage` references `bar`, which references a function that is explicitly bound to the object `positivity` as its execution context. That function invokes `foo` with `this` referring to `positivity`, and `this.message` resolves to 'JavaScript makes sense'. So even though a method is invoked on the `negativity` object, it references a property from the `positivity` object. 

   Their Solution

   Since `bar` is bound to `positivity` as the return value of the `bind` invocation on line 13, `positivity`'s property `message` is logged by the function call on the last line, despite the fact that the function is invoked as a method on the `negativity` object

5. What will the code below output?

   ```js
   let obj = {
     a: 'Amazebulous!',
   };
   let otherObj = {
     a: "That's not a real word!",
   };
   
   function foo() {
     console.log(this.a);
   }
   
   let bar = foo.bind(obj);
   
   bar.call(otherObj);
   ```

   Show Solution

   ```terminal
   Amazebulous
   ```

   `bind` returns a function that is permanently bound to the execution context passed to it as argument. So `bar` references a function that is permanently bound to `obj`. Even when `bar` is invoked by `call` on line 14, `bar`'s execution context is still `obj`.

   Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`. In keeping with this, the last line of our code outputs "Amazebulous!", because the function `bar`'s context has been permanently bound to `obj`.

------

### Dealing with Context Loss I

- Functions and methods can "lose context". Quoted because functions don't lose their execution context in reality - they always have one, but it may not be the context you expect. 
- If you understand how execution context is determined, you shouldn't be surprised by the value of `this` in any given scenario. 
- However how a specific context arrived isn't always intuitive. even when you understand the rules, the context for a given invocation may surprise you. 

##### Method Copied from Object

- Context loss when a method is copied out of an object and used elsewhere. 

- When we took a method out of an object and execute it as a function or method on another object, the function's context was no longer the original object. 

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

```js
// we would have to write this code instead
let foo = john.greetings.bind(john); // bind returns a function
foo(); // => need to invoke foo here in order to run greetings() 

// or simply
let foo = john.greetings; 
foo.call(john)
```

##### Unideal Solutions

- You can use `foo.call(john)` to restore the original context, but suppose you don't execute the function right away or you need to pass it to another function for execution? Context passed to `call` may be out of scope by then. 
  - By the time `foo` gets called, `john` made be out of scope. 
- Another way to solve this problem is to change the original function to accept context object as second parameter, then pass context to original function when calling it(problem is you can't always change methods, and not good to pass a lot of arguments to functions)
  - change `repeatThreeTimes` to accept the context object as the second parameter, then pass the context to `repeatThreeTimes` when calling it. 

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

```js
function repeatThreeTimes(func, context) {
  func.call(context);
  func.call(context);
  func.call(context);
}

function foo() {
  let john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    },
  };

  repeatThreeTimes(john.greetings, john);
}

foo();

// hello, John Doe
// hello, John Doe
// hello, John Doe
```

- Some of JavaScript's built-in methods, such as the Array abstraction methods like `forEach`, `map`, and `filter`, use this technique. 
  - Such methods take a callback function as an argument and an optional `thisArg` context object that gets used as the callback's execution context.
- However, it's not always possible to pass a context argument to a function or method, you may not even be able to change the function, if say, it belongs t a third-arty library. 
  - It's also not a good idea to pass a lot of arguments to your functions; the more arguments a function can accept, the harder the function is to use. 

##### Best solution: `bind`

- Another approach is to hard-bind the method's context using `bind`. 

```js
function repeatThreeTimes(func) {
  func();
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

  repeatThreeTimes(john.greetings.bind(john));
}

foo();

// => hello, John Doe
// => hello, John Doe
// => hello, John Doe
```

##### Advantage and Disadvantage of `bind`

- `bind` has one significant advantage: once you bind a context to a function, that binding is permanent and does not need to be repeated if it gets called more than once. 
- The disadvantage of `bind` is that it is no longer possible to determine the context by looking at the invocation of the final function. 

------

### Dealing with Context Loss II

In this assignment we'll see how nested functions suffer from context loss. Loss of surrounding context is a common issue when dealing with functions nested within object methods.

##### Nested Functions: Inner Function Not Using the Surrounding Context

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

- By now, you should be able to understand why this code logs `undefined undefined` instead of `hello world`. 
  - Here, `bar`is invoked as a standalone function on line 9. Thus, its execution context is the global object, not the `obj` object that you may have expected. (Every function invocation has an execution context, look at the most specific one inside of a method call... if that makes sense. )
  - Once again, a function or method's execution context depends solely on how you invoke it, now on how and where it's defined. 
- Let's examine solutions to this problem. 

##### Solution1: Preserve Context with a Variable in Outer Scope

- Use `let self = this` or `let that = this` in the outer function. 
  - Basically, set `this` to a variable to access the correct context object. 
- If you define the `self` or `that` variable -- these names are idiomatic, not a required name-- in the outer scope, you can use that variable and whatever value it contains inside your nested inner function(s).

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

##### Solution2 : Call Inner Function with Explicit Context

- Use `call` or `apply` to explicitly provide a context when calling the inner function. 

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

##### Solution 3: Use `bind`

- Call `bind` on the inner function and get a new function with its execution context permanently set to the object. 

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

    // still more code
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

- Advantage of `bind` is that you can do it once and then call it as often as needed without an explicit context. 

##### Solution 4: Using an Arrow Function

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

------

### Dealing with Context Loss III

- Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 

##### Function as Argument Losing Surrounding Context

- Here we use `john` object to call the `greetings` method, with `john` as its context. `greetings` then calls `repeatThreeTimes` function with a function argument whose body refers to `this`. `repeatThreeTimes` calls its argument three times with an implicit context. 
- Since context is determined by how a function is invoked, the context for all three invocations will be the global object. Thus, the `this` inside the function passed to `repeatThreeTimes` is the global object, not `john`. 

```js
function repeatThreeTimes(func) {
  func(); // `this` loses context here. Now the context is the global object. 
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function() {
    repeatThreeTimes(function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName); // this refers to john. 
    });
  },
};

john.greetings(); // john.greetings would be the function, but john.greetings() invokes the function

// => hello, undefined undefined
// => hello, undefined undefined
// => hello, undefined undefined
```

- Problem in code below is that the callback function expression is passed as argument to `forEach` so it gets executed with the global object as context. 
  - Remember: array iteration methods like `forEach` invoke and executes the callback function on every element in the array. 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b); // context loss from passing callback function as argument. 
    });
  },
};

obj.foo();

// => 1 undefined undefined
// => 2 undefined undefined
// => 3 undefined undefined
```

##### Solution 1: Preserve the Context with a Variable in Outer Scope

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

##### Solution 2 : Use `bind`

```js
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

##### Solution 3 : Use arrow function

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

##### Solution 4: Use the optional `thisArg` argument

- Some methods that take function arguments allow an optional argument that specifies the context to use when invoking the function. 
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

##### Summary

- Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 
- This problem is identical to the problem of copying a method from an object and using it as a bare function. 
- These two code do the same thing

```js
array.forEach(obj.logData);
```

```js
let logData = obj.logData;
array.forEach(logData);
```

- In both code, `obj.logData` method gets invoked by `forEach` with the global object as the context, not`obj`. 

------

### Practice Problems: Dealing with Context Loss

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/408c20c3)

1. The code below should output `"Christopher Turk is a Surgeon"`. Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.

   ```js
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription() {
         return this.firstName + ' ' + this.lastName + ' is a '
                                     + this.occupation + '.';
     }
   };
   
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription);
   ```

   Show Solution

   ```terminal
   undefined undefined is a undefined.
   ```

   Functions as arguments lose surrounding context. When we pass `turk.getDescription` to `logReturnVal` as an argument, we remove the method from its context.  When it is executed as `func`, the context is set to the global object instead of `turk`. Since the global object doesn't have properties defined for `firstName`, `lastName`, or `occupation`, the output isn't what we expect.

2. Modify the program from the previous problem so that `logReturnVal` accepts an additional `context` argument. If you then run the program with `turk` as the context argument, it should produce the desired output.

   Show Solution

   ```js
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
   
   logReturnVal(turk.getDescription, turk);
   ```

   By using `call` to invoke `func` and passing it the `context` argument, we can provide the desired context for the function. On line 16, we invoke `logReturnVal` with `turk` as the `context` argument, then pass that value to `call`; the result is our desired output. 

   We can use `bind` but given the condition that `logReturnVal` must accept a context argument, the solution would lead to odd code. 

   ```js
   let returnVal = func.bind(context)();
   ```

3. Suppose that we want to extract `getDescription` from `turk`, but we always want it to execute with `turk` as its execution context. How would you modify your code to do that?

   Show Solution

   ```js
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription() {
         return this.firstName + ' ' + this.lastName + ' is a '
                                     + this.occupation + '.';
     }
   };
   
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription.bind(turk));
   ```

   

4. Consider the following code:

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ': ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   Will this code produce the following output? Why or why not?

   ```plaintext
   The Elder Scrolls: Arena
   The Elder Scrolls: Daggerfall
   The Elder Scrolls: Morrowind
   The Elder Scrolls: Oblivion
   The Elder Scrolls: Skyrim
   ```

   Show Solution

   ```terminal
   undefined: Arena
   undefined: Daggerfall
   undefined: Morrowind
   undefined: Oblivion
   undefined: Skyrim
   ```

   No because on line 5, a callback function is passed to `forEach` as argument. When functions are passed as arguments to another function, they lose their surrounding context and the function argument gets invoked with the execution context set to the global object. So on line 6, the execution context is not `TESgames` object, but the global object. `this.seriesTitle` resolves to `undefined` as there is no `seriesTitle` property on the global object. 

5. Use `let self = this;` to ensure that `TESgames.listGames` uses `TESGames` as its context and logs the proper output.

   Show Solution

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       let self = this;
       this.titles.forEach(function(title) {
         console.log(self.seriesTitle + ': ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

6. The `forEach` method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:

   Show Solution

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ': ' + title);
       }, this);
     }
   };
   
   TESgames.listGames();
   ```

7. Use an arrow function to achieve the same result:

   Show Solution

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(title => {
         console.log(this.seriesTitle + ': ' + title);
     	});
     }
   };
   
   TESgames.listGames();
   ```

   

8. Consider the following code:

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment();
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   What will the value of `foo.a` be after this code runs?

   Show Solution

   ```terminal
   0
   ```

   When the code on line 5 runs, the value of `this` is the global object. That is because the function `increment` is invoked as a standalone function on line 8. `this.a` on line 5 references a property of the global object rather than a property of `foo`. Thus, property `foo.a` is never modified in the code, its value remains 0. 

   The value of `foo.a` will be `0`. Since `increment` gets invoked as a function, `this.a` on line 5 references a property of the global object rather than a property of `foo`. Thus, the property `foo.a` isn't modified by the `increment`; its value remains 0.

9. Use one of the methods we learned in this lesson to invoke `increment` with an explicit context such that `foo.a` gets incremented with each invocation of `incrementA`.

   Show Solution

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment.call(this);
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   We can use `apply` or `call` to invoke `increment` on line 8 with explicit context. We pass `this` as the context argument since inside `incrementA` but outside of `increment`, `this` references the containing object, namely `foo`.

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment.bind(this)(); // bind also works but code is strange
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

------

### Lesson 2 Summary

- **Default prototype**: The default prototype is the prototype object of the `Object` constructor, referenced by `Object.prototype`
  - `Object.prototype` is the `prototype`property of the Object constructor. 

- Every object has an internal `[[Prototype]]` property that points to a special object, the object's prototype. It is used to look up properties that don't exist on the object itself. 
  - `Object.create` returns a new object with the passed-in argument as its prototype.
  - You can use `Object.getPrototypeOf` and `obj.isPrototypeOf` to check for prototype relationships between objects.
- Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above. 
  - In other words, **downstream** objects can delegate properties or behaviors to **upstream** objects. 
  - A downstream object overrides an inherited property if it has a property with the same name. (Overriding is similar to shadowing, but it doesn't completely hide the overridden properties).
  - `Object.getOwnPropertyNames` and `obj.hasOwnProperty` can be used to test whether an object owns a given property.
- Function invocations (e.g., `parseInt(numberString)`) rely upon implicit execution context that resolves to the global object. Method invocations (e.g., `array.forEach(processElement)`) rely upon implicit context that resolves to the object that holds the method.
- All JavaScript code executes within a context. The top-level context is the `window` object in browsers and the `global` object in Node. All global methods and objects, such as `parseInt` and `Math`, are properties of `window` or `global`.
- The value of `this` is the current execution context of a function or method.
- The value of `this` changes based on how you invoke a function, not how you define it.
- JavaScript has first-class functions that have the following characteristics:
  - You can add them to objects and execute them in the respective object's context.
  - You can remove them from their objects, pass them around, and execute them in entirely different contexts.
  - **<u>They're initially unbound</u>** but dynamically bound to a context object at **execution time**.
- The `call` and `apply` methods invoke a function with an explicit execution context.
- The `bind` method returns a new function that permanently binds a function to a context.
- Arrow functions are permanently bound to the execution context of the enclosing function invocation. When defined at the top level, the context of an arrow function is the global object.

### My Summary of Important Concepts

##### This

Definition

- The value of `this` is the current execution context of a function or method.
- The value of `this` changes based on how you invoke a function, not how or where you define it.
- When strict mode is enabled,  implicit `this` is assigned to `undefined` instead of the global object.

Implications

- Every time a function is called, JS binds some object to `this` --> **setting the binding** / setting the execution context. 
- `this` keyword is available to every function in JS, because every JS function call has an execution context.
  - All JS functions and methods execute within an execution context , aka the `this` binding. 

Clarifications about `this`

- When is the execution context / `this`/ bound? 

  - It is bound based on how function is invoked. 
  - It is usually bound during function invocation /execution actually, there are exceptions such as `bind`, where the function is not immediately invoked and a copy of the function is returned with the execution context bound to the copy.

- If `this` is outside a function

  - If `this` is outside a function, it is bound to the global object. 

  ```js
  let person = {
    firstName: 'Rick ',
    lastName: 'Sanchez',
    fullName: this.firstName + this.lastName, // execution context is global
  };
  
  console.log(person.fullName); 
  ```

  - But if `this` is inside a function/method, then the execution context is dependent solely on how the function is invoked, not on how and where the function is defined. 

    ```js
    let person = {
      firstName: 'Rick ',
      lastName: 'Sanchez',
      fullName() {
        return this.firstName + this.lastName; // how is fullName invoked
      },
    };
    
    console.log(person.fullName()); // invoked as a method
    ```

##### Execution Context Rules

- **Execution context**: the environment (an object) in which a function executes. 

- Every single javascript invocation/ call has its own **execution context**

- Execution context depends on how a function/method is invoked, not how or where it's defined.

  - **Regular function** calls (**standalone** function) <u>implicitly</u> use the global object as their execution context, while **method calls** <u>implicitly</u> use the calling object as their context.
    - In Node, global object is `global` and in browser, global object is `window`. 
  - You can override this behavior by setting the execution context explicitly with either `call`,  `apply`, or `bind`.   
  - While a variable's scope is determined by lexical scoping, meaning where you write the code, `this` depends on how you invoke it. 
  - Arrow functions are also exceptions to this rule. 

- **Arrow functions** inherit execution context from the surrounding scope. 

  -  Arrow functions are permanently bound to the execution context of the (surrouding scope)**enclosing function invocation** . 
  - **enclosing function invocation** (surrounding scope): the most <u>immediate</u> function scope in which the arrow function is defined. 
    - This enclosing function is likely a function declaration or expression, in which case its execution context is determined by how its invoked. 
    - The execution context of this enclosing function is determined by  how it is invoked. 
    - Tricky: `forEach` is not considered the enclosing function for arrow functions, why? Because arrow functions are passed to `forEach` - it's not defined inside `forEach`. 
  - Arrow functions are permanently bound to the enclosing function execution context, but it doesn't mean the context can't change. If the enclosing function context changes, it also changes. 
  - Exception: don't use arrow functions as methods on an object, else it will take global object as the surrounding context. 

  ```js
  let obj = {
    a: 5,
  
    foo: () => {
      console.log(this.a);
    },
  };
  
  obj.foo(); // => undefined
  // Arrow functions ignore method invocation rule for implicit execution context, uses lexical scoping instead. The surrouding context here is the global object, not obj. 
  ```

##### Context Loss & their solutions

- Method is copied out of an object and used elsewhere. 

  Best Solution

  - Hard-bind the method's context by using `bind`. 

  Unideal solutions

  - Use `call`
    - problem is if you pass it to another function or don't execute function right away, the context passed to `call` may be out of scope by then. 

  - Change the original function to accept context object as second parameter, then pass context to original function when calling it
    - problem is you can't always change function or methods, and not good to pass a lot of arguments to functions
    - JS built-in methods like `forEach` `map` `filter` use this technique by taking a callback function as argument and optional `thisArg` context object that is used as the callback's execution context. 

- Nested Functions: inner function not using surrounding context
  - Preserve context with variable in outer scope (`let self = this` in the outer function)
  - Call Inner function with explicit context(`call`)
  - use `bind`
  - Use arrow function
  
- Function as argument losing surrounding context: Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 

  - Variable
  - `bind`
  - arrow function
  - `thisArg`

### Miscellaneous Notes

##### Tricky

- Why is `forEach` executed with global context? 
  - It's not. 
  - It's the callback function that is executed with global context. The implicit execution context of `forEach` is the calling object, the array `[1, 2, 3]`. In the case of the function expression, we know that the execution context is determined by how the function is invoked. The function expression will be invoked within the body of the `forEach` function, but because of context loss from callback function being passed as argument to `ForEach`, , the execution context will be implicitly set to the global object. 

 ##### Enclosing function invocation demonstration

```js
// Question 7 of Practice Problems: Dealing with Context Loss
// solution
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title); // this refers to TESgames
    });
  }
};

TESgames.listGames();
```

```js
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    TESgames.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title); // `this` now refers to undefined
    });
  }
};

// TESgames.listGames();

let copy = TESgames.listGames;
copy();
```

```js
// shows that the enclosing function is the context of the immediate function, not the most outer function invocation
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    return (function innerFunc() { // new inner function ( not innerFunc) is the arrow function's enclosing function
      this.titles.forEach(title => {
        console.log(this.seriesTitle + ': ' + title);
      });
    }).bind(TESgames2); // returns a function that is permanently bound to Tesgames2, so arrow funciton context becomes Tesgames2. Bind 
  }
};

// new object
const TESgames2 = { 
  titles: ['TestArena', 'TestDaggerfall', 'TestMorrowind', 'TestOblivion', 'TestSkyrim'],
  seriesTitle: 'The Elder Scrolls 2',
};

TESgames.listGames()(); // Tes.games.listGames() returns a function that has context of Tesgames2, and is then invoked
```

```js
// NOW compare it to this code, without arrow function
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    return (function innerFunc() { 
      this.titles.forEach(function (title) {
        console.log(this.seriesTitle + ': ' + title); // this would refer to context of `forEach`, whith is global. 
      });
    }).bind(TESgames2);
  }
};

// new object
const TESgames2 = {
  titles: ['TestArena', 'TestDaggerfall', 'TestMorrowind', 'TestOblivion', 'TestSkyrim'],
  seriesTitle: 'The Elder Scrolls 2',
};

TESgames.listGames()(); // outputs undefined... etc
```

- Arrow Function exception: 

  -  Don't use arrow functions as methods on an object. The surrounding context may be the **global object**. 
  -  Never use arrow functions to write methods. As long as you don't use arrow functions as methods, you can ignore this exception. 

```js
let obj = {
  a: 5,

  foo: () => { // arrow function used as method here
    console.log(this.a);
  },
};

obj.foo(); // => undefined, because the surrounding object is the global object since `obj` is defined as a variable in the global object.  
```

vs this code

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    let bar = () => { // the surrounding object is `obj` because the arrow function is defined in a method, and the method's execution context is `obj`. 
      console.log(this.a + ' ' + this.b);
    }
    bar(); 
};

obj.foo();
// => hello world
```

##### Miscellaneous Reminders

- **forEach** works internally like this (simplified view): 

```js
// the context argument passed to context comes from the 2nd argument passed to forEach. If there is no second argument, then the global object is used.
function forEach(callback, context) {
  if (context === undefined) {
    context = global;
  }

  // this[index] refers to the array element
  for (let index = 0; index < this.length; ++index) {
    callback.call(context, this[index]);
  }
}
```

- Pass or reference functions by using the identifier only. Parentheses () invokes a function. 

```js
function repeatThreeTimes(func) { // passing a function
  func();  
  func();
  func();
}

let john = {
  firstName: 'John',
  lastName: 'Doe',
  greetings: function() {
    repeatThreeTimes(function() {
      console.log('hello, ' + this.firstName + ' ' + this.lastName);
    });
  },
};

john.greetings(); // john.greetings would reference the method, but john.greetings() invokes the method

// => hello, undefined undefined
// => hello, undefined undefined
// => hello, undefined undefined
```

- You can chain method calls on function expressions

```js
let obj = {} 
let a  = function () { // this is an anonymous function expression because it doesn't start with function at beginning of line
  
}.bind(obj)
```

- Every single javascript call has its own **execution context**! 

  -  (Bind is not an invocation but also sets execution context)

  ```js
  // That's why bar has execution context of the global object, rather than `obj`. 
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      function bar() {
        console.log(this.a + ' ' + this.b);
      }
  
      bar(); // bar is invoked as a standalone function. 
    },
  };
  
  obj.foo();        // => undefined undefined
  ```

##### Linguistic Reminders

- `call` / `apply` **invokes** function or method
- function / method **invokes** `bind`. 
- A context is **bound** to an object. A function is also **bound** to a context. 

##### Word: Delegate

- Rule: Downstream objects delegate properties and behaviors to upstream objects. 

```js
let foo = {
  bar: 42,
  qux() {
    console.log("Pudding");
  },
};

let baz = Object.create(foo);
baz.qux() // baz delegates the invocation of qux to its prototype foo object. 
```

- Confusing but makes sense if you think about the definition of "delegate": a person sent or authorized to represent others. 


------

### Questions

##### Why is `forEach` not the enclosing function for an arrow function? 

```js
// Practice Problems: losing context question 7
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};
```

> Note that this solution does not pass `this` to `forEach`.

Why is `this` not passed to`ForEach`? Why is `forEach` not the enclosing function of arrow function? 

Wes' Answer

- Because arrow functions take the context of the enclosing function invocation. We are **passing** the arrow function to `forEach`. The arrow function is not created inside `forEach`, so `forEach` is not considered the enclosing function!
- Suppose you give the arrow function an (implicit) name and pass it in via that reference. In that case, you can better see that the arrow function is not created in the enclosing environment of `forEach`. So, these two snippets are functionally equivalent:

```js
function example1 (arr) {
    arr.forEach (() => console.log (this));
}

example1 ([1, 2, 3]);
```

```js
function example2 (arr) {
    const printContextObjOfExecutionContext =
        () =>
            console.log (this);
    arr.forEach (printContextObjOfExecutionContext);
}

example2 ([1, 2, 3]);

```

- However, this next one (where the arrow function is created inside of `myOwnForEach` rather than passed in) is not functionally equivalent to the above two:

```js
Array.prototype.myOwnForEach =
    function () {
        const printContextObjOfExecutionContext =
            () =>
                console.log (this);
        for (let idx = 1; idx < this.length + 1; idx += 1) {
            printContextObjOfExecutionContext ();
        }
    };


function example3 (arr) {
    arr.myOwnForEach ();
}

example3 ([1, 2, 3]);
```

Mia's answer

- there's a function not directly visible to us that wraps around the code you write in a JS file when using Node. It looks something like this:

```js
(function (exports, require, module, __filename, __dirname) {
   // the code you write in the JS file is here
});
```

- Just so we're on the same page, let's run the code from here on out in the browser in "sloppy" mode.

```js
// forEach with a function expression as the callback 
[1, 2, 3].forEach(function(num) {
  console.log(this);
});

// forEach with an arrow function as the callback
[1, 2, 3].forEach(() => {
  console.log(this);
});
```

- In both examples, `forEach` will invoke the callback within its own scope. This logic is abstracted from us as the programmer, but we can view `forEach` like any other function that takes another function as an argument. 
- The implicit execution context of `forEach` is the calling object, the array `[1, 2, 3]`. ...
- For arrow functions we know that their execution context is based on its surrounding scope, which in this example in the browser is `window`. I think Wes does a good job of explaining the "why" above.

------

##### Why is `forEach` executed with global object as context? Answer: it's not. 

[source:Dealing with context loss III](https://launchschool.com/lessons/1eaf5e37/assignments/72c5b578)

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

> The explanation said: The problem is that `forEach` executes the function expression passed to it, so it(the function expression) gets executed with the global object as context.

- CLARIFICATION: It's the callback function that is being executed with global object as context, not `forEach`. 

- EXPLANATION: On line 5, The implicit execution context of `forEach` is its calling object, the array `[1, 2, 3]`.   But a function expression is passed to `forEach` as argument, and when functions are passed as arguments, they lose surrounding context, so the execution context is then implicitly set to the global object.  If `forEach` took a `thisArg` argument, then the execution context would be `thisArg`. 

- OTHER EXPLANATION( my own reasoning):

  - `forEach` will invoke the callback within its own scope? 
  - In this case of callback function being a function expression, we know that the execution context is determined by how the function is invoked. 
  - When functions are passed as arguments, they become invoked as standalone functions which means they will have global object context. 
  - That is why when functions are passed as arguments, they lose the original surrounding context of `this`. 

  ```js
  function repeatThreeTimes(func) {
    func(); // this loses context here. Now the context is the global object. 
    func(); // invoked as standalone functions
    func();
  }
  
  let john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      repeatThreeTimes(function() {
        console.log('hello, ' + this.firstName + ' ' + this.lastName); // this refers to john. 
      });
    },
  };
  
  john.greetings(); // john.greetings would be the function, but john.greetings() invokes the function
  
  // => hello, undefined undefined
  // => hello, undefined undefined
  // => hello, undefined undefined
  ```

- if `forEach` does not take a `thisArg` argument, the context *for the callback function* set to `global`

  ```js
  // what forEach looks like internally (simplified)
  // the context argument passed to context comes from the 2nd argument passed to forEach. If there is no second argument, then the global object is used.
  function forEach(callback, context) {
    if (context === undefined) {
      context = global;
    }
  
    // this[index] refers to the array element
    for (let index = 0; index < this.length; ++index) {
      callback.call(context, this[index]);
    }
  ```
  

##### Solution to above problem

- use lexical scoping rules, such as solution 3: arrow function
-  solution1: preserve context with variable in outer scope
- thisArg
- invoke callback function with `call`. 

------

#####  Downstream objects can delegate properties or behaviors to upstream objects. ?? 

- What does "delegate" mean? What does "delegate properties and behaviors" mean? 
  - Downstream objects delegate method and property access to upstream objects. 
  - Delegate = "grant access to"

```js
// quiz 1 question 1
let foo = {
  bar: 42,
  qux() {
    console.log("Pudding");
  },
};

let baz = Object.create(foo);
baz.qux() // baz delegates the invocation of qux to its prototype foo object. 
```

------

### Quiz 1

Question 1 

Examine the following code:

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

Which of the following statements about the invocation on line 9 are true? Choose all that apply:

Correct : C. The `baz` object delegates the invocation of `qux` to the `foo` object.

What does delegate mean? Does it just mean "access property"? 

Downstream objects can delegate properties or behaviors to upstream objects.

------

### Quiz 2 

Question 2

```js
console.log(global.hasOwnProperty('global'));   // A: true
console.log(global.hasOwnProperty('foo'));      // B: true
console.log(global.hasOwnProperty('isFinite')); // C: true
console.log(global.hasOwnProperty('bar'));      // D: false
console.log(global.hasOwnProperty('xyz'));      // E: true
console.log(global.hasOwnProperty('console'));  // F: true
console.log(global.hasOwnProperty('log'));      // G: false
```



Question 7 

Question 7: When does JavaScript bind an object to `this` ? Select all answers that apply.

> D: It binds the execution context based on when the function gets invoked.
>
> **Incorrect:**
>
> **B**, **D**: The execution context is determined by how a function is called, not by where it is defined or when it gets invoked.

You're correct in that there is some truth to answer choice D, but there's a bit more nuance to it. The point that this question tries to underscore is the importance of *how* a function is called when determining the execution context. The exception I can think of to answer choice D is when `bind` is used to provide an execution context. Recall that `bind` differs from `call` and `apply` in that the function is *not* immediately invoked and a copy of the function is returned with the supplied execution context bound to said copy.

# Lesson 3

### Introduction

- In lesson 1, we saw the power of object creation mechanism when we studied the object favotry pattern for creating objects. 
- In this lesson, we'll review that pattern and talk about some other patterns. 
- Unlike other mainstream languages, JavaScript doesn't implement behavior sharing using class-based inheritance even though ES6 introduced the `class` keyword to the language
  - Instead, it uses the object prototype to share properties.
  - This distinction is crucial to understanding how JavaScript generates individual objects; it forms the basis of all object-creation patterns in JavaScript that feature behavior sharing.
- We'll begin by looking at different ways to generate individual objects and then explore object prototypes. 
  - Next, we'll highlight two ways to create objects in an object-oriented pattern - one which simulates a classical approach, and another that uses the `class` syntax.
- The topics covered by this lesson are at the heart of OOP in JavaScript. Prototype-based object-orientation is not a straightforward concept to grasp, and it takes time to get used to this way of thinking. Take it slow, read the assignment multiple times, and be sure to work through all the practice problems to let the concepts sink in. Let's start!

------

### Review - OOP Principles: Encapsulation

- Problem that procedural programming has: as a program grows, so does its complexity, and you end up functions throughout the code split up from the data they operate on. 
- OOP solves this problem. Objects provide a means to group related data and functions into one unit. 
  - In the context of the object, the data and functions are commonly called state and methods respectively. 

##### Encapsulation

- The grouping together of related data and functions is what’s called encapsulation and is one of the fundamental principles of object-oriented programming.

```javascript
let overtime = 10;
let baseSalary = 6000;
let rate = 50;

function computeWage(baseSalary, overtime, rate) {
  return baseSalary + (overtime * rate)
}
```

- Up top are the data related to the employee’s wage and a function that operates on the data. The object-oriented way of solving this problem by using encapsulation is done by simply combining data and related functions into one unit like so:

```javascript
// instantiated an object using the object literal syntax. 
let employee = {
  baseSalary: 6000,
  overtime: 10,
  rate: 50,
  computeWage: function() {
    return this.baseSalary + (this.overtime * this.rate)
  }
}
```

- As you can see, everything that's related to the `employee` object are bundled. This is the beauty of object-oriented programming. It organizes code into logical units.

##### Summary

- We've just reviewed the concept of encapsulation and how it's relevant to object-oriented programming. 
- In the example given, we **instantiated** an object using the object literal syntax. 
- There are other more sophisticated patterns of object creation that we'll cover over the remaining assignments. 
- However keep in mind that, at the very core, we are essentially doing the same thing: grouping data and related functions together.

------

### Review - Factory Functions

In lesson 1, we learned how to create objects in bulk by using the *factory function* pattern. We'll review that concept before we move forward and discuss some other object creation patterns.

##### Factory Functions

- **Object factories** / factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template. 

```js
// simplify code by returning an object literal
function createPerson(firstName, lastName = '') {
  return {
    firstName: firstName,
    lastName: lastName,

    fullName: function() {
      return `${this.firstName} ${this.lastName}`.trim();
    }
  };
}

let john = createPerson('John', 'Doe');
let jane = createPerson('Jane');

john.fullName();        // => "John Doe"
jane.fullName();        // => "Jane"
```

Advantages

- The factory function lets us create multiple objects of the same "type" with a pre-defined "template."

Disadvantages

- Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
- No way to be sure you are working with the right kind of object. 
  - There is no way to inspect an object and learn whether we created it with a factory function, or which factory function. 
  - That effectively makes it impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics.

------

### Practice Problems - Factory Functions

1. What are two disadvantages of working with factory functions?

   - Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
   - There is no way to tell which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 

2. Rewrite the following code to use object-literal syntax to generate the returned object:

   ```js
   function makeObj() {
     let obj = {};
     obj.propA = 10;
     obj.propB = 20;
     return obj;
   }
   ```

   Show

   ```js
   function makeObj() {
   	return {
   		obj.propA = 10; 
   		obj.propB = 20;
   	};
   }
   ```

3. In this problem and the remaining problems, we'll build a simple invoice processing program. To get you started, here's the code to process a single invoice:

   ```js
   let invoice = {
     phone: 3000,
     internet: 6500
   };
   
   let payment = {
     phone: 1300,
     internet: 5500
   };
   
   let invoiceTotal = invoice.phone + invoice.internet;
   let paymentTotal = payment.phone + payment.internet;
   let remainingDue = invoiceTotal - paymentTotal;
   
   console.log(paymentTotal);         // => 6800
   console.log(remainingDue);         // => 2700
   ```

   To process multiple invoices, we need a factory method that we can use to create invoices. The requirements for the factory function are as follows:

   1. It returns an invoice object, with `phone` and `internet` properties, and a `total` method.
   2. The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
   3. The function takes an object argument whose attributes override the default values.

   Your function should work with the following code:

   ```js
   function createInvoice(services) {
     // implement the factory function here
   }
   
   function invoiceTotal(invoices) {
     let total = 0;
   
     for (let index = 0; index < invoices.length; index += 1) {
       total += invoices[index].total();
     }
   
     return total;
   }
   
   let invoices = [];
   invoices.push(createInvoice());
   invoices.push(createInvoice({ internet: 6500 }));
   invoices.push(createInvoice({ phone: 2000 }));
   invoices.push(createInvoice({
     phone: 1000,
     internet: 4500,
   }));
   
   console.log(invoiceTotal(invoices)); // 31000
   ```

   Show Solution

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

4. Now we can build a factory function to create payments. The function can take an object argument in one of 3 forms:

   - Payment for one service, e.g., `{ internet: 1000 }` or `{ phone: 1000 }`.
   - Payment for both services, e.g., `{ internet: 2000, phone: 1000 }`.
   - Payment with just an amount property, e.g., `{ amount: 2000 }`.

   The function should return an object that has the amount paid for each service and a `total` method that returns the payment total. If the `amount` property is not present in the argument, it should return the sum of the phone and internet service charges; if the `amount` property is present, return the value of that property.

   Your function should work with the following code:

   ```js
   function createPayment(services) {
   	// implement the factory function here 
   }
   
   function paymentTotal(payments) {
     return payments.reduce((sum, payment)  => sum + payment.total(), 0);
   }
   
   let payments = [];
   payments.push(createPayment());
   payments.push(createPayment({
     internet: 6500,
   }));
   
   payments.push(createPayment({
     phone: 2000,
   }));
   
   payments.push(createPayment({
     phone: 1000,
     internet: 4500,
   }));
   
   payments.push(createPayment({
     amount: 10000,
   }));
   
   console.log(paymentTotal(payments));      // => 24000
   ```

   Show Solution

   ```js
   // their solution
   function createPayment(services = {}) {
     let payment = {
       phone: services.phone || 0,
       internet: services.internet || 0,
       amount: services.amount,
     };
   
     payment.total = function () {
       return this.amount || (this.phone + this.internet); // why assign the method here, rather than just set the method already in the payment object? Since this method will always be invoked by method invocation, `this` will always refer to the payment object. 
     }
   
     return payment;
   }
   ```

   ```js
   // this also works. 
   function createPayment(services = {}) {
     return {
       phone: services.phone || 0, 
       internet: services.internet || 0, 
       amount: services.amount, 
       
       total: function () {
         return this.amount || (this.phone + this.internet);
       }
     }
   }
   ```

5. Update the `createInvoice` function so that it can add payment(s) to invoices. Use the following code as a guideline:

   ```js
   let invoice = createInvoice({
     phone: 1200,
     internet: 4000,
   });
   
   let payment1 = createPayment({ amount: 2000 }); //payment1 is an object
   let payment2 = createPayment({
     phone: 1000,
     internet: 1200
   });
   
   let payment3 = createPayment({ phone: 1000 });
   
   invoice.addPayment(payment1);
   invoice.addPayments([payment2, payment3]);
   invoice.amountDue();       // this should return 0
   ```

   ```js
   let invoice = function createInvoice(services = {}) { 
     let phoneCharge = services.phone || 3000;
     let internetCharge = services.internet || 5500;
   
     return {
       phone: phoneCharge,
       internet: internetCharge,
       payments[], // an array of objects 
   
       total: function() {
         return this.phone + this.internet;
       }, 
       
       addPayment: function(payment) {
         this.payments.push(payment);
       }, 
       
       addPayments: function(payments) {
         payments.forEach(this.addPayment, this); // syntax is forEach(callback fn, thisArg)
       }, 
        
       paymentTotal: function() {
         return this.payments.reduce((sum, payment) => sum + payment.total(), 0); //sums up the payments array, "payment" references objects of data. 
       }
       amountDue: function() {
         return this.total() - this.paymentTotal();
       }
     };
   }
   
   ```

------

### Constructors

**object constructors **/ constructors are another way to create objects in JavaScript. 

- They are an object form of functions! 

- Think of it as a little factory that can create an endless number of objects of the same type. 
- Superficially, a constructor looks and acts a lot like a factory function: you define a constructor once then invoke it each time you want to create an object of that type. 

```js
let car = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2016,
  started: false,

  start() {
    this.started = true;
  },

  stop() {
    this.started = false;
  },
};
```

We don't just want *a* car, however. We want a mechanism that creates any car that has those properties and methods. To do that, we can use a factory function to create individual cars:

```js
function createCar(make, model, year) {
  return {
    make, // shorthand for `make: make`
    model,
    year,
    started: false,

    start() {
      this.started = true;
    },

    stop() {
      this.started = false;
    },
  };
}

let corolla = createCar('Toyota', 'Corolla', 2016);
let leaf = createCar('Nissan', 'LEAF', 2018);
let nova = createCar('Chevrolet', 'Nova', 1974);
```

Another way to accomplish the same thing is to use a constructor function and the `new` keyword:

```js
// very similar to function factory
function Car(make, model, year) { // constructors use uppercase
  this.make = make;
  this.model = model;
  this.year = year;
  this.started = false;

  this.start = function() { // assigning function to property 
    this.started = true;
  };

  this.stop = function() {
    this.started = false;
  };
} // no explicit return value

let corolla = new Car('Toyota', 'Corolla', 2016);
let leaf = new Car('Nissan', 'LEAF', 2018);
let nova = new Car('Chevrolet', 'Nova', 1974);
```

- Notice that we gave the constructor a name that begins with a capital letter: `Car`. Capitalizing the name isn't a language requirement, but it is a convention employed by most JavaScript developers.

- The function parameters, in general, match the properties associated with each `Car` object. In this case, we supply parameters for all of the properties except `started`, which receives an initial value instead. The initial value for such properties can come from anywhere. For instance, we can compute the value from other properties or retrieve a value from a database.

##### Calling a Constructor Function

- The most striking features that distinguish constructors from ordinary functions are that:
  - we call it with the `new` keyword,
  - we use `this` to set the object's properties and methods, and
  - we don't supply an explicit return value (we can, but usually don't).

##### Question: so contructors implicitely return an object? 

- What object does `this` refer to in the constructor function? Of course, we know `this` depends on how we call the function. 
- Calling constructors is where you see the most significant difference between them and other functions. 

Let's create a car object. 

```js
let corolla = new Car('Toyota', 'Corolla', 2016);

corolla.make;    // => 'Toyota'
corolla.model;   // => 'Corolla'
corolla.year;    // => 2016
corolla.started; // => false

corolla.start();
corolla.started; // => true
```

##### New

- Notice that the `new` keyword precedes the function invocation. This combination of using `new` with a function call treats the function as a constructor.
- What's significant about using `new` keyword to invoke a function? 
- JavaScript takes the following steps when you invoke a function with `new`. 
  1. It creates an entirely new object(the instance). 
  2. It sets the prototype of the new object to the object that is referenced by the constructor's `prototype` property. 
  3. It sets the value of `this` inside the function to point to the new object. 
  4. It invokes the consturctor function. Since `this` refers to the new object, we use it within the function to set the object's properties and methods.
  5. Finally, once the function finishes running, `new` returns the new object "automatically"; we don't explicitly return anything.

We can now use the new object in any manner appropriate for a `Car` object.

**JavaScript won't complain about a missing `new` keyword**.

```js
Car(); // => undefined
```

- If you don't use the `new` keyword, the constructor function won't work as intended, but will still run.  Instead, it acts like an ordinary function. 
- In particular, no new objects are created, so `this` won't point to a new object.

- Furthermore, since functions that don't return an explicit value return `undefined`, calling a constructor without `new` also returns `undefined`. 
- When you use `new`, however, the function doesn't have to return anything explicitly: it returns the newly created object automatically.

##### Who can be a Constructor

- You can use `new` to call almost any JavaScript function that you create. 
- Exception: However, you cannot call arrow functions with `new` since they use their surrounding context as the value of `this`:

```js
let Car = (make, model, year) => {
  this.make = make;
  this.model = model;
  this.year = year;
}

new Car(); // TypeError: Car is not a constructor
```

- You can also use `new` on methods that you define in objects. Consider:
  - But can't use concise syntax 

```js
let foo = {
  Car: function(make, model, year) { // car is a method in an object
    this.make = make;
    this.model = model;
    this.year = year;
  }
};

let car1 = new foo.Car('Toyota', 'Camry', 2019);
car1.make; //=> 'Toyota'
```

- Exception: Calling a method defined with concise syntax (also called a concise method) won't work:

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

- In addition, many -- but not all -- built-in objects and methods are incompatible with `new`:

```js
new console.log(); //=> Uncaught TypeError: console.log is not a constructor
new Math();        //=> Uncaught TypeError: Math is not a constructor
new parseInt("3"); //=> Uncaught TypeError: parseInt is not a constructor

new Date();        //=> 2019-06-26T02:50:20.191Z
```

- `new` is also incompatible with special functions known as **generators** (a topic that we don't currently cover at Launch School).

##### Constructors With Explicit Return Values

What happens when you use `new` to call a function that returns an explicit value?

```js
function Cat(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  return 'a cat';
}

let fluffy = new Cat('fluffy', 'Persian', 15);
fluffy.weight; // 15
```

- That's curious. Even though we explicitly returned the string `'a cat'`, our constructor returned the cat object with `name`, `breed` and `weight` as its properties.

- Note that `'a cat'` is a primitive value. Suppose we returned an object instead. What would happen, then?

```js
function Cat(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  return { foo: 1 };
}

let fluffy = new Cat('fluffy', 'Persian', 15);
fluffy.weight; // undefined
fluffy.foo; // 1
```

- This time the constructor returned the object `{ foo: 1 }`, not a cat object.

- Rule: constructor that explicitly tries to return an object returns that object instead of a new object of the desired type. In all other situations, it returns the newly created object, provided no errors occur. In particular, the constructor ignores primitive return values and returns the new object instead.

##### Supplying Constructor Arguments with Plain Objects

- Can shorten arguments in a constructor by merging object argument with instance object. 

Constructor functions sometimes have to grow with the needs of a program. That often means adding more arguments to the constructor. For instance, our `Car` constructor may one day end up looking like this:

```js
function Car(make, model, year, color, passengers, convertible, mileage) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;
  this.passengers = passengers;
  this.convertible = convertible;
  this.mileage = mileage;
  this.started = false;

  this.drive = function() {
    this.started = true;
  };

  // rest of the methods
}
```

That's quite a few parameters, with plenty of opportunities for mistakes. 

- For instance, we may pass the arguments in the wrong order, and JavaScript won't complain. That might seem like a minor inconvenience, but it causes more bugs than you might think. Not only that, those bugs are often quite nasty and hard to diagnose. 
- The more parameters a function needs, the harder it is to read the code and the more likely that problems will arise.

- One common technique that we can use to manage our parameters better involves passing them to our constructor with an object argument:

```js
let civicArgs = {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000
}

let civic = new Car(civicArgs);
```

Of course, that means that we now have to rework our `Car` constructor to accept an object as an argument:

```js
function Car(args) {
  this.make = args.make;
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

With `Object.assign`, we can simplify this constructor considerably:

```js
function Car(args) {
  Object.assign(this, args); // merges the two objects into single object. 

  this.drive = function() {
    this.started = true;
  };

  // rest of the methods
}
```

- However, one drawback of the `Object.assign` approach is that the `args` object may contain properties that the `Car` object doesn't need. Those additional properties will, nevertheless, get added to the `Car` object. Those properties may just be excess baggage for the objects to carry around, but they may also cause trouble.

##### Determining an Object's Type

- Many object-oriented languages, like Java or C++, have a strong notion of object types. In most such languages, it's easy to determine the object's type, such as a dog or car. 

- JavaScript, however, treats objects and their types in a looser, more dynamic way. You can't determine the specific type of arbitrary JavaScript objects; they are dynamic structures with a type of `object`, no matter what properties and methods they have. However, we can get some useful information about an object if we know which constructor created it.

- Remember that the `new` operator creates a new object. Suppose that you call the Car constructor with `new`. Informally, we can say that the resulting object is a car. More formally, we can say that the object is an **instance** of a `Car`.

- The `instanceof` operator lets us determine whether a given constructor created an object:

  - Syntax

  - ```md
    Object instanceof function
    ```

```js
let civicArgs = {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000
};

let civic = new Car(civicArgs);

if (civic instanceof Car) {
  console.log("It's a car!");
} else {
  console.log("It's not a car.");
}
```

- One effect that we didn't mention when talking about the `new` operator is that the object it returns contains some information that ties it back to the constructor that created the object. The `instanceof` operator uses that information to determine what constructor created the object. We'll talk more about how this mechanism works in the next assignment.

##### `new` and Implicit Execution Context

- In an earlier lesson, we discussed how a function could receive an implicit execution context. In particular, function and method calls provide an implicit context. For a function call, the implicit context is the global object; for a method call, it's the object used to call the method.

- Now that we know about constructors, we can add a constructor call with `new` as a third way to provide an implicit execution context. When you call a function with `new`, its implicit context is the new object.

##### Constructor.name

- The `constructor` property returns a reference(not string name!) to the `Object` constructor function that created the instance object. 
- This constructor function has access to `name` property which returns the function's name as specified when it was created.

```js
console.log("Hello".constructor.name); // String
console.log([1, 2, 3].constructor.name); // Array
console.log({ name: 'Srdjan' }.constructor.name); // Object
```

##### Problems

1. What naming convention separates constructor functions from other functions?

   Constructor function names are capitalized. 

2. What happens if you run the following code? Why?

   ```js
   function Lizard() {
     this.scamper = function() { // this refers to global object, creating a propery scamper inside global object 
       console.log("I'm scampering!");
     };
   } // this function doesn't have explicit return value, so return value is undefined. 
   
   let lizzy = Lizard();
   lizzy.scamper(); // typeError, can't call method on undefined. 
   ```

   Show Solution

   This throws a `TypeError` since `scamper` is an undefined property on `lizzy`. Since `Lizard` was invoked without the `new` operator and doesn't have an explicit return value, the return value is undefined. Thus, `lizzy` gets assigned to `undefined` which causes the call to `scamper` to throw an error: you can't call a method on `undefined`. 

3. Alter the code in problem 2 so that it produces the desired output: `I'm scampering!`.

   Show Solution

   ```js
   function Lizard() {
     this.scamper = function () {
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = new Lizard(); // all we need to add is the new keyword 
   lizzy.scamper();
   ```



------

### Constructors with Prototypes

- Why do we need constructors if we can just use object factories. 

```js
function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  this.bark = function() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  };
}

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

maxi.bark(); // 'Woof!'
```

```js
maxi.hasOwnProperty('bark');   // true
dexter.hasOwnProperty('bark'); // true
biggie.hasOwnProperty('bark'); // true
maxi.bark === dexter.bark;     // false
maxi.bark === biggie.bark;     // false
dexter.bark === biggie.bark;   // false
```

- Dog object `maxi`, `dexter`, and `biggie` have different `name`, `breed`, and `weight` properties, and also have their own `bark` method, even though that method is the same in all of them. 
- Every time we create a new dog object, we must create new `bark`method so we can add it to the object as its own property. 
- This is inefficient and wasteful on memory. How do we create the `bark` method just once, rather than use a different copy of that method in every dog object? 

##### Method Delegation to Prototypes

- We can define a method once in the prototype object, and let the inheriting objects delegate the method calls to the prototype.

- Use prototypes in conjunction with constructors to achieve the same result: 

```js
// creating separate object to use as prototype?? Just for a shared method. 
let DogPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, DogPrototype); // first thing we do is set DogPrototype as the prototype of the newly created dog object.
  this.name = name;
  this.breed = breed;
  this.weight = weight;
  // this.bark method removed.
}

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

maxi.bark(); // 'Woof!'
```

- This time, `bark` method isn't defined on the individual objects, but is, instead, defined on the `[[Prototype]]` property.

```js
maxi.hasOwnProperty('bark'); // false
dexter.hasOwnProperty('bark'); // false
biggie.hasOwnProperty('bark'); // false
Object.getPrototypeOf(maxi).bark === DogPrototype.bark; // true
Object.getPrototypeOf(dexter).bark === DogPrototype.bark; // true
Object.getPrototypeOf(biggie).bark === DogPrototype.bark; // true
```

- The `DogPrototype` object has the only copy of the method; all dog objects delegate `bark` to the `DogPrototype` object. This is better use of memory.

Okay, we now have a constructor and a related prototype object. Together, they **construct** objects of some type. It would be better if we could establish their relationship more concretely. 

```js
// Delete DogPrototype

function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype); // this is really interesting! We are creating the property after "invoking" it? --> recursion happening. 
  // rest of the code
}

Dog.myPrototype = { 
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};
```

- Since JavaScript functions are objects, we can add properties to them. 
- Here we assign the prototype object to a `myPrototype` property on the `Dog` function object. Note that it's the `Dog` function, not the instance object created by `Dog`!! 

- This code is confusing, but it works. Kind of like working with recursive functions. 

```js
// the complete code. 
function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.myPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);
maxi.bark(); // 'Woof!'

maxi.hasOwnProperty('bark'); // false
dexter.hasOwnProperty('bark'); // false
biggie.hasOwnProperty('bark'); // false
Object.getPrototypeOf(maxi).bark === Dog.myPrototype.bark; // true
Object.getPrototypeOf(dexter).bark === Dog.myPrototype.bark; // true
Object.getPrototypeOf(biggie).bark === Dog.myPrototype.bark; // true
```

##### The Constructor `prototype` Property

- What makes constructors special is a characteristic of all function objects in JavaScript: they all have a `prototype` property that we call the **function prototype** to distinguish them from the prototypes used when creating ordinary objects. 
  - Every function has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself. 

  - All function objects have a `prototype` property. 
- Dunder proto will usually equal `constructor.prototype` (constructor `prototype` property) given that the constructor is the constructor function that created that object. 
- References the default prototype object. . ?
- The code in the previous section emulates something that JavaScript bundles with constructors. 

```terminal
Dog.prototype; // => Dog {}
```

- When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the current value of `Foo`'s `prototype` property. 
  - That is, the constructor creates an object that inherits from the constructor function's prototype (`Foo.prototype`)
  - Since inheritance in JS uses prototypes, we can also say that the constructor creates an object whose prototype references`Foo.prototype`. 

------

##### Terminology confusion: prototype

- prototype refers to an object's prototype
- It also refers to a property called "prototype" on a constructor. 

<u>**An object's prototype**</u>: 

- Referenced by  dunder proto `__proto__`

- If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. 

- An **object's prototype**  is what the current object's `[[prototype]]` or `__prototype__` property references. 
  - It is the object that the current object inherits from. 
  - By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.

<u>**Constructor's prototype object**</u> 

- Known as **constructor's prototype object** /  **function prototype** / **`prototype` property**

- Referenced by `Constructor.prototype`

- "prototype" is the name for a specific property in the object form of Functions (constructors). 
- The constructor stores the prototype object in its `prototype` property; that is, if the constructor's name is `Foo`, then `Foo.prototype` references the constructor's prototype object.
  - This  prototype object is the object that instance objects inherit from. 
  - each object that the constructor creates inherits from the constructor's prototype object. 
  - Note, it's not the constructor**'s** prototype! It's the constructor prototype. 

- In most cases, when we talk about a **prototype** without being more explicit, we mean an **object prototype**. We'll talk about the constructor's prototype, the function prototype, or the `prototype` property when talking about a constructor's prototype object.
- Note that constructors don't inherit from the constructor's prototype object. Instead, the objects that the constructor creates inherit from it.
- At this point, you may want to rewatch the first 12 minutes of the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you watched earlier. The discussion of the differences between the object prototype (what the speaker calls *dunder proto* or `__proto__`) and the constructor's prototype object should help clarify these differences.

------

##### The Constructor `prototype` Property Continued..

- Every JavaScript function has a `prototype` property. However, JavaScript only uses it when you call that function as a constructor, that is, by using the `new` keyword. 
- With this information, we can abandon our home-grown constructor-prototype pairing and use the one that JavaScript provides instead:

```js
function Dog(name, breed, weight) {
  // deleted Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = function() { // new object already inherits from the function prototype, so if we add properties to the prototype object, new object can delegate those properties. 
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
maxi.bark(); // 'Woof!'

let biggie = new Dog('Biggie', 'Whippet', 9);
biggie.bark(); // 'Yip!'
```

- Note that our constructor doesn't have to explicitly set the prototype of `this` (the new object) to `Dog.prototype`. JavaScript does that for us when we call the function with `new`. We left this detail out earlier, so let's restate those steps with updated information. We'll assume that the constructor function is named `Foo`:

1. It creates an entirely new object.
2. It sets `Foo.prototype` as the prototype for the new object. That is, the new object inherits from the object referenced by `Foo.prototype`.
3. It sets the execution context (`this`) for the function to point to the new object.
4. It invokes the function.
5. It returns the new object unless the function returns another **object**.

![Diagram](https://dbdwvr6p7sskw.cloudfront.net/images/js120/constructor-prototype-map.png)

##### Note about `this`

- Since the `bark` method refers to `this` and `bark` belongs to the prototype object, you may think that `this` in `this.weight` refers to the prototype object rather than the object itself (e.g., `maxi` or `biggie`). However, that's not how `this` binding works. 
- You already know those rules, so take a moment to think about what it means inside the `bark` method.
- When you call a method on an object, JavaScript binds `this` to the object whose method you used to call it. If it doesn't find the method in that object, but it does find it in the prototype, that doesn't change the value of `this`. 
- `this` always refers to the original object -- that is, the object used to call the method --even if the method is in the prototype. If we find the `bark` method in the prototype, `this` references the original dog object, not the prototype.

##### Constructor Property

- `Object.prototype.constructor`, `.constructor`

- Better explanation: this property returns a reference to the constructor function that created the instance object.  

```js
Dog.prototype.constructor; // [Function: Dog]
```

- As with the `instanceof` operator, the `constructor` property lets us determine the type of an object:

```js
let maxi = new Dog('Maxi', 'German Shepherd', 32);

if (maxi.constructor === Dog) {
  console.log("It's a dog");
} else {
  console.log("It's not a dog");
}
```

- Be careful, however. It's possible to reassign the `constructor` property to something else. We'll learn about reassigning the `constructor` property in the next assignment. In that case, the test shown above would fail, even though the object is still a dog.

```js
Dog.prototype.constructor = function() {};

maxi.constructor === Dog; // false
maxi instanceof Dog;      // true
```

- Note that `instanceof` still works.

- Can be used to create new objects 

  ```js
  let rex = new Terrier();
  let spot = new rex.constructor;
  // is the equivalent of calling new Terrier();
  // Can use this method if we don't know the name of an object's constructor. 
  ```

##### Overriding the Prototype

- Inheriting methods from a prototype doesn't mean that the inheriting object is stuck with those methods. JavaScript objects are incredibly dynamic and flexible. 
- Two objects created with the same constructor may end up looking completely different from each other because of changes and additions made after constructing the object. 
- For instance, suppose we have a `dexter` dog that has an unusually loud and deep bark. We want to change the `bark` method to log `WOOF!` instead of `Woof!`. We can do that easily by defining a custom `bark` method on `dexter`.

```js
let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);

dexter.bark = function() { // dexter now has OWN property called bark
  console.log('WOOF!')
}

maxi.bark();   // Woof!
dexter.bark(); // WOOF!
```

- The `dexter` object now has its own `bark` method that **overrides** the `bark` method from `Dog.prototype`. Each time we call `bark` on `dexter`, JavaScript looks for it first in the `dexter` object itself. Since it finds it there, it doesn't need to check the prototype.

>  It's time to return to the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you began watching earlier. The portion of the video that pertains to this assignment starts at about the 00:39:18 mark, and continues through examples 5 and 7 until the 01:25:15 point. Note that we haven't covered inheritance yet, but the video talks about it. If those sections confuse you, just ignore them for now.

> If you want a refresher, you can also watch the earlier parts of the video.

> You may also want to read this student article: [A shallow dive into the constructor property in JavaScript](https://medium.com/@patel.aneeesh/a-shallow-dive-into-the-constructor-property-in-javascript-b0a89747058b) to get a better handle on the `constructor` property from the perspective of a student at roughly the same point in the JavaScript curriculum as you. The article is meant to be a companion to the JS OOP video above.

------

### Practice Problems - Constructors and Prototypes

1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

   ```js
   let RECTANGLE = {
     area: function() {
       return this.width * this.height;
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) { // constructor 
     this.width = width;
     this.height = height;
     this.area = RECTANGLE.area(); // invokes the method!, now area represents the invoked value.
     this.perimeter = RECTANGLE.perimeter();
   }
   
   let rect1 = new Rectangle(2, 3); // rect1 is an object
   
   console.log(rect1.area);
   console.log(rect1.perimeter);
   ```

   ```terminal
   NaN
   NaN
   ```

   Solution

   THe value of `this` within the `RECTANGLE` object is set to the `RECTANGLE` object when it is called. `RECTANGLE` doesn't define `width` and `height` properties, so the property access both return `undefined`. Mathematical operations on `undefined` produce value of `NaN` , so the return value of the methods is `NaN`. 

2. How would you fix the problem in the code from problem 1?

   ```js
   console.log(rect1.area()); 
   console.log(rect1.perimeter()); // invoke the function
   ```

   ```js
   // my solution I used bind. 
   let RECTANGLE = {
     area: function () {
       return this.width * this.height;
     },
     perimeter: function () {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) { // constructor 
     this.width = width;
     this.height = height;
     this.area = (RECTANGLE.area).bind(this)(); // invokes the method!, now area represents the invoked value.
     this.perimeter = (RECTANGLE.perimeter).bind(this)();
   }
   
   let rect1 = new Rectangle(2, 3); // rect1 is an object
   
   console.log(rect1.area);
   console.log(rect1.perimeter);
   
   ```

   Solution

   ```js
   let RECTANGLE = {
     area: function() {
       return this.width * this.height;
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     }
   };
   
   function Rectangle(width, height) {
     this.width = width;
     this.height = height;
     this.area = RECTANGLE.area.call(this);
     this.perimeter = RECTANGLE.perimeter.call(this);
   }
   
   let rect1 = new Rectangle(2, 3);
   console.log(rect1.area);      // => 6
   console.log(rect1.perimeter); // => 10
   ```

3. Write a constructor function called `Circle` that takes a radius as an argument. You should be able to call an `area` method on any objects created by the constructor to get the [circle's area](https://www.mathsisfun.com/geometry/circle-area.html). Test your implementation with the following code:

   ```js
   let a = new Circle(3);
   let b = new Circle(4);
   
   a.area().toFixed(2); // => 28.27
   b.area().toFixed(2); // => 50.27
   a.hasOwnProperty('area'); // => false
   ```

   ```js
   // it runs the same but not sure if this is good style
   function Circle(radius) {
     this.radius = radius; // remember to set the new object's properties! 
     Circle.prototype.area = function () {
       return Math.PI * Math.pow(this.radius, 2);
     }
   }
   ```

   Solution

   ```js
   const Circle = function(radius) {
     this.radius = radius;
   };
   
   Circle.prototype.area = function() {
     return Math.PI * this.radius * this.radius;
   };
   ```

4. What will the following code log to the console and why?

   ```js
   function Ninja() { // constructor
     this.swung = true;
   }
   
   let ninja = new Ninja(); // ninja is the object
   
   Ninja.prototype.swingSword = function() {
     return this.swung;
   };
   
   console.log(ninja.swingSword());
   ```

   Solution

   ```
   true
   ```

   Even though we define the `swingSword` method on the prototype after we create the `ninja`, all objects created by the `Ninja` constructor share the same prototype object. Thus, when we define `swingSword`, it immediately becomes available to the `ninja` object.

5. What will the following code output and why? Try to answer without running the code.

   ```js
   function Ninja() {
     this.swung = true;
   }
   
   let ninja = new Ninja();
   
   Ninja.prototype = { // reassigning to a new object instead of mutating original prototype object. 
     swingSword: function() {
       return this.swung;
     },
   };
   
   console.log(ninja.swingSword()); // there is no swingsword function in ninja
   ```

   Solution

   ```js
   Uncaught TypeError: ninja.swingSword is not a function
   ```

    We're reassigning `Ninja.prototype` to an entirely new object instead of mutating the original prototype object.  The prototype for the `ninja` object doesn't change; it's still the original prototype defined during the constructor's invocation. Thus, JavaScript can't find the `swingSword` method in the prototype chain of `ninja`.

6. Implement the method described in the comments below:

   ```js
   function Ninja() {
     this.swung = false;
   }
   
   // Add a swing method to the Ninja prototype which
   // modifies `swung` and returns the calling object
   
   let ninjaA = new Ninja();
   let ninjaB = new Ninja();
   
   console.log(ninjaA.swing().swung);      // logs `true`
   console.log(ninjaB.swing().swung);      // logs `true`
   ```

   ```js
   function Ninja() {
     this.swung = false;
   }
   
   Ninja.prototype.swing = function () { // creating a methood in the Ninja Prototype called swing which sets swung to true and returns the calling object. 
     this.swung = true;
     return this; 
   }
   
   // Add a swing method to the Ninja prototype which
   // modifies `swung` and returns the calling object
   
   let ninjaA = new Ninja();
   let ninjaB = new Ninja();
   
   console.log(ninjaA.swing().swung);      // logs `true`
   console.log(ninjaB.swing().swung);      // logs `true`
   ```

   Solution

   ```js
   Ninja.prototype.swing = function() {
     this.swung = true;
     return this;
   };
   ```

   This pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object (in this case, `ninjaA` and `ninjaB`).

7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

   ```js
   let ninjaA;
   
   { // what are these brackets for??
     const Ninja = function() {
       this.swung = false;
     };
   
     ninjaA = new Ninja();
   }
   
   // create a `ninjaB` object here; don't change anything else
   
   ninjaA.constructor === ninjaB.constructor // => true
   ```

   Hint

   The value assigned to `ninjaA` is an object created by a constructor function. As such, this object has a `constructor` property that points back to its constructor. Think of a way to use this property; that should help lead you to a solution.

   ```js
   let ninjaB = Object.create(ninjaA.constructor.prototype); // works but is flawed
   ```

   ```js
   ninjaA // => Ninja { swung: false }
   ninjaB // => Ninja {} 
   ```

   - This has the same flaw as `Object.create(ninjaA)`, the swung property is inside the prototype object, instead of `ninjaB`. 
   - This is because `Object.create` creates a new object that inherits properties from an object, rather than the new object having its own properties. 

   Solution

   ```js
   let ninjaB = new ninjaA.constructor(); // Note, we can use `new` many times, on the same constructor, to create a new object! 
   ```

   ```js
   ninjaA // => Ninja { swung: false }
   ninjaB // => Ninja { swung: false }
   ```

   ```js
   console.log(ninjaA.hasOwnProperty("swung")); // true
   console.log(ninjaB.hasOwnProperty('swung')); // true
   ```

   - better to use `new` and `.constructor` to create an object, because `new` implicitly creates a new object with its own properties 
   - Note we can use `new` as many times as we want on an existing constructor, to create new objects with their own properties! 

   ```js
   let ninjaB = Object.create(ninjaA); // this worked but is flawed
   ```

   - This code works as well, but there is a flaw: it puts the `swung` property in the prototype object instead of in the `ninjaB` object where it belongs. Thus, `ninjaA` and `ninjaB` are somewhat different objects:

   ```js
   ninjaA:
     swung: false
     constructor: Ninja
     prototype: {}
   
   ninjaB:
     constructor: Ninja
     prototype: {
       swung: false
     }
   ```

8. Since a constructor is just a function, you can call it without the `new` operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the `new` operator. The function should return the same result with either form. Use the code below to check your solution:

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

   Hint

   In the constructor function, check the value of `this` to see whether it is an instance created by the constructor function. If it is, then the function was called with the `new` operator; otherwise, the function was called without `new`. You can use this in your code; if you determine that `new` wasn't used, then you can have the constructor call itself with the `new` keyword and use its return value.

   ```js
   function User(first, last) {
   	if (this.constructor === User) {
     	this.name = first + ' ' + last;
     } else {
       return newUser(first, last); // sort of recursive
     }
   }
   ```

   Solution

   ```js
   function User(first, last){
     if (!(this instanceof User)) { // note this syntax for instanceof
       return new User(first, last); // rescursive or not? Is it creating a new User function? No. New does not create a new function, it invokes an existing function. 
     }
   
     this.name = first + ' ' + last;
   }
   
   let name = 'Jane Doe';
   let user1 = new User('John', 'Doe');
   let user2 = User('John', 'Doe');
   
   console.log(name);         // => Jane Doe
   console.log(user1.name);   // => John Doe
   console.log(user2.name);   // => John Doe
   ```

   Constructor functions built this way are called **scope-safe constructors**. 

   - **Scope- safe constructor**: designed to return the same result regardless of whether it's called with or without new. 

   - Most, but not all, of JavaScript's built-in constructors, such as `Object`, `RegExp`, and `Array`, are scope-safe. `String` is not:

   ```js
   new Object();          // Object {}
   Object();              // Object {}
   
   new Array(1, 2, 3);    // [1, 2, 3]
   Array(1, 2, 3);        // [1, 2, 3]
   
   new String("abc");     // [String: 'abc']
   String("abc");         // 'abc'
   ```

------

### Static and Instance Properties and Methods

- **Instance**: individual objects of a specific data type (OOP term)

  - For example, in the `Dog` example from the [Constructors with Prototypes assignment](https://launchschool.com/lessons/e3c64e3f/assignments/bdc27fe0), `maxi` and `dexter` are instances of the `Dog` type. 
  - Definition: An instance is just another term for the objects created using any means of defining multiple objects of the same kind (e.g., dogs). 
  - The term *object* is more general, while *instance* is more specific.

- Objects created by facotry functions are also considered **instances**, even if there is no way to test that in code. 

  - > So far, we've been using constructors to create instances of the `Dog` type. We can also think of objects created by factory functions as instances. Later, we'll see even more ways to create new objects, all of which can be called instances.
    >
    > Hold on there. Factory functions can create instances? How can that be? There's no way to tell that the objects created by, say, a `createDog` factory are indeed dogs, so how can we have instances?
    >
    > That's a good point. However, in the end, we know that the `createDog` factory is going to create a bunch of objects that we know to represent dogs. We may not be able to tell whether an arbitrary object is a dog object, but all of the objects created by `createDog` should be dogs. They have a type -- dog -- even if there is no way to test that in your code. Thus, they are instances of a dog type.

#### Instance Properties

**instance properties**: properties of an instance. 

- These properties belong to a specific instance of some type. 
- Thus, in our `Dog` example from the earlier assignment, we say that the `name`, `breed`, and `weight` properties are all instance properties of the various instances of the `Dog` type. If we want to access the weight for `Maxi` from the above example, we must use the `maxi` object:

```js
maxi.weight; // 32
```

- If we try to use constructor, it won't work: 

```js
Dog.weight; // undefined
```

- This code returns `undefined` since `weight` isn't a property of the constructor; it's a property of the instances created by that constructor. 
  - It also doesn't make sense to define it on the constructor function: weight is a property of an individual dog, not one that is related to dogs as a type.

#### Instance Methods

**Instance methods**: any method defined in any prototype in the prototype chain of an object is considered to be an instance method of an object. 

- Methods usually aren't stored directly in instances. Instead, they are usually defined in the object's prototype object (the object referenced by **prototype** property)

```js
function yes () {
  this.method = function () {}; // usually this doesn't occur
  
}

yes.prototype.method = function () {} // this is what occurs usually, but normally we use class syntax
```

```js
// class syntax

class yes () {
  constructor () {
    this.property = ''; // instance property
  }
  
  method = function () {} // instance method, omits .prototype
}
```



- While methods defined in the prototype object aren't stored in the instance object, they still operate on individual instances. Therefore, we usually refer to them as instance methods. In our `Dog` example, `bark` is an instance method since it's defined on the `Dog.prototype` object.
- As with weight, we must use an object created by the Dog constructor to invoke bark

```js
maxi.bark(); // Woof!
```

- Again, we can't use the constructor to call this method:

```js
Dog.bark(); // TypeError: Dog.bark is not a function
```

In this specific example, we can call `Dog.prototype.bark()`, but that doesn't always work well. For instance, calling `Dog.prototype.bark()` won't recognize the fact that `dexter` has a different version of `bark`.

Any method defined in any prototype in the prototype chain of an object is considered to be an instance method of the object.

#### Static Properties

**Static properties** are defined and accessed directly on the <u>constructor</u>, not on an instance or a prototype.

- Typically, static properties belong to the type (e.g., `Dog`) rather than to the individual instances or the prototype object.
- static properties are properties about a constructor. 

- For instance, dogs belong to the species "Canis lupus". That property of dogs doesn't have anything to do with individual dogs; it's information that is pertinent about all dogs. Therefore, it makes sense to add this property directly to the `Dog` constructor as a static property:

```js
Dog.species = "Canis lupus";
```

Now, when our application needs to know the species that dogs belong to, we can access it from the constructor directly:

```js
console.log(`Dogs belong to the species ${Dog.species}`);
```

One common use of static properties is to keep track of all of the objects created by a constructor. For instance:

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

#### Static Methods

Static properties don't have to be ordinary data properties. You can also define static methods:

```js
Dog.showSpecies = function() {
  console.log(`Dogs belong to the species ${Dog.species}`);
};

Dog.showSpecies();
```

You've already seen examples of static methods on built-in JavaScript constructors. `Object.assign`, `Array.isArray`, and `Date.now` are all examples of static methods.

- `forEach` is a static method of the `Array` constructor then?
  - No, `forEach` is an instance method of the `Array` constructor, because you are using an object (array object) to invoke an instance method of the `Array` constructor, rather than calling the `Array` constructor directly. 

------

### Built - in Constructors

JavaScript comes with a variety of built-in constructors and prototypes that let you instantiate useful objects. These constructors work like constructors for other objects; they're used with the `new` keyword to create objects. In this assignment, we will discuss some of JavaScript's built-in constructors, their prototypes, and how you can extend them.

#### The `Array` constructor

- Simplest way to create an array object uses the bracket syntax:

```terminal
> let numbers = [1, 2, 3, 4]
> numbers
[ 1, 2, 3, 4 ]
```

- Can also use the `Array` constructor:

```terminal
> let emptyArray = new Array()
> emptyArray
[]
```

- Calling `new Array()` creates and returns a new array. That array is empty unless you also pass some arguments to the constructor. Each argument you provide gets added to the new array as an element:

```terminal
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

- You can think of `[ <3 empty items> ]` as an array that has three empty slots. In effect, it's an empty array that happens to contain spaces for three items; alternatively, it's a non-empty array that contains no values. Call it Schrödinger's array if you wish.

- Note that the single-number form of the constructor does not accept non-integers or negative numbers:

```terminal
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

- Interestingly, `Array` lets you omit the `new` keyword:

```terminal
> Array(1, 2, 3)
[1, 2, 3]
```

Stay consistent and use `new` unless there's a good reason to omit it.

#### `Array.prototype` property

- `Array.prototype` property  references the prototype object that the `Array` constructor uses to create array objects. 
  - Remember that The **constructor's prototype object** /  **function prototype** / **`prototype` property**is an object that the constructor uses as the object prototype for the objects it creates. 
- As with any JavaScript function, the `Array` constructor has a `prototype` property. All arrays inherit from the object referenced by this property:
  - Remember that all functions have a `prototype` property, but JS only uses it if it's a constructor. For non array constructors `new` needs to be used.  

```terminal
> let numbers = [1, 2, 3]
> Object.getPrototypeOf(numbers) === Array.prototype
true
```

- Since all arrays inherit from the object referenced by `Array.prototype`, that means that every array can use the methods defined in `Array.prototype`. 
  - In particular, that means that all arrays can use methods like `forEach`, `map`, `includes`, as well as all the other methods defined on `Array.prototype`:
  - These methods that use this syntax, `Array.prototype.method` are the **instance** methods for the Array type. 

```node
> numbers.map(number => number * number);
[ 1, 4, 9 ]

> numbers.includes(3)
true
```

#### Static Array Methods

- Remember: static methods belong directly to the constructor function; they aren't part of the prototype used to create new objects. 
- As a result, their names don't include `.prototype`. 
- Moreover, you usually use the constructor to invoke the static methods, not the object created by that constructor. (This definition isn't complete, but it will do for our purposes.)

##### Array.isArray

- The `Array.isArray` method takes one argument and returns `true` if the argument is an array object, and `false` if it is not:

```node
> Array.isArray([])
true

> Array.isArray({})
false

> Array.isArray(5)
false
```

- Why do we need it? Won't `typeof` tell us whether the argument is an array? Unfortunately, no. The `typeof` operator returns an unexpected and somewhat useless value when used with an array:

```node
> typeof []
'object'
```

- You already know that all arrays are objects. That doesn't make it any less useless, however, so we need `Array.isArray` to distinguish between arrays and other objects.

#### Array like object

- All objects with a `length` property is an array-like object. 
  - Does it need properties with keys that are non-negative integers?

##### Array.from

- The `Array.from` method takes an **array-like object** as an argument and returns a new array with the equivalent element values. 
- An **array-like object** is any object that has a `length` property and provides indexed access to some of its properties with the `[index]` notation. 
  - Such objects have properties whose keys are non-negative integers. 
  - In many cases, the `length` property won't self-update if you add or remove properties to or from the object.

```node
> Array.from({0: 'a', 1: 'b', 2: 'c', length: 3})
['a', 'b', 'c']
```

The following code shows one way to implement the logic behind `Array.from`. Studying this code should help you make sense of what `Array.from` does:

```js
let arrayFrom = obj => {
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

- In the degenerate(??) case, all arrays are themselves array-like objects.

#### The `Object` constructor

As with the `Array` constructor, the `Object` constructor creates new objects:

```node
> new Object()
{}
```

- You can invoke `Object` without the `new` keyword, just as you can omit `new` with the `Array` constructor:

```node
> Object()
{}
```

- To repeat ourselves, omitting `new` is probably not a good practice.

#### Object.prototype

- All objects created by the `Object` constructor or with object literal syntax (e.g., `{ a: 1, b: 2 }`, inherit from `Object.prototype`. 
- Thus, all such objects have access to the instance methods defined in `Object.prototype`. We've already seen some of these methods in action, such as `Object.prototype.hasOwnProperty` and `Object.prototype.isPrototypeOf`.

- Since arrays are a subtype of objects, <u>all</u> array objects have access to <u>all</u> the methods on `Object.prototype`.

```terminal
> ['a', 'b', 'c'].hasOwnProperty(1) # integer indices are properties of the array. 
true
```

- You can think of the integer indices as properties of the array. In our example, `0`, `1`, `2` are the properties and `'a'`, `'b'`, `'c'` are the values. We can verify that `Array` is a subtype of `Object` by checking whether `Array.prototype` inherits from `Object.prototype`:

```node
> Object.getPrototypeOf(Array.prototype) === Object.prototype
true
```

**Almost all JavaScript objects, whether built-in or custom-created, inherit from `Object.prototype`(the default prototype), either directly or further down the prototype chain.** 

- That includes prototype objects of constructors. 
- Note that we said "almost all"; as discussed in an earlier lesson, it is possible to create objects that don't inherit from `Object.prototype`

- Another oft-used  method is `Object.prototype.toString`. It returns a string representation of the object that it's called on. Since `toString` is a method on `Object.prototype`, all JavaScript objects -- including arrays, functions, and dates -- inherit this method.
  - However, the default behavior of `Object.prototype.toString` is not very useful; it merely returns `[object Object]` for objects that don't override this method to provide smarter behavior:

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

#### Static `Object` Methods

The list below shows some commonly used static `Object` methods. You've already seen and used several. Feel free to follow the links and read more about these methods, but you don't have to memorize them. Instead, learn what's available. You can look them up later when you need to use them:

- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
- [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
- [`Object.isFrozen`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
- [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
- [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

#### The Date Constructor

The `Date` constructor creates objects, commonly called a **date object**, that represent a specific date and time. 

- Calling `Date` without arguments returns a date object that represents the creation date and time of the object:

```node
> let now = new Date()
> now
2019-06-07T05:03:26.813Z
```

- You can create date objects that represent any given date and time by passing additional arguments to the `Date` constructor. For instance, to create a date object that represents "May 1, 1983", you can write:

```node
> let birthday = new Date("May 1, 1983")
> birthday
1983-05-01T07:00:00.000Z
```

- You can get even more specific by including the time:

```node
> birthday = new Date("May 1, 1983 05:03 am")
> birthday
1983-05-01T12:03.00.000Z
```

- The dates shown by the above code may appear as 1983-05-02. This issue is caused by the time zone of the environment where you run the code. Working with time zones is messy; we won't get into that in this course.

- There are several other ways to specify the date and time, including variations on the date strings shown above, and by providing other arguments to the `Date` constructor. Check the [MDN documentation for Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) to learn more.

#### Date.prototype

The `Date` prototype object provides a variety of convenient methods for working with dates. We'll mention a few here.

**Date.prototype.toString**

The `toString` method returns a string that represents the date (it's pretty verbose):

```terminal
> let now = new Date()
> now.toString()
'Sat Jun 01 2019 01:15:06 GMT+0500 (Pakistan Standard Time)'
```

**Date.prototype.getFullYear**

The `getFullYear` method returns the year from the date as a number:

```terminal
> now.getFullYear()
2019
```

**Date.prototype.getDay**

The `getDay` method returns a number that represents the day of the week that corresponds to the date object. 

- The return value is `0` for Sunday, `1` for Monday, and so on until it returns `6` for Saturday.

```terminal
> now.getDay()
4 // (represents Thursday)
```

The `Date` prototype has a bunch of useful methods for working with dates and times. Be sure to check the [MDN documentation page for Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and explore a few more methods.

#### The `String` Constructor

Why do we need a constructor for strings? Aren't JavaScript strings a primitive type? We know they are since the strict equality operator compares strings by value rather than identity:

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
```

Interestingly, we can access properties and call methods on strings:

```node
> 'abc'.length
3

> 'abc'.toUpperCase()
'ABC'
```

How is that possible given that strings are primitive values? Primitive values aren't objects, so where does JavaScript find those properties and methods?

We'll return to those questions shortly. 

##### String primitive vs `String` object

- First, though, we need to learn that JavaScript has two kinds of strings: string primitives and `String` objects. 
- Thus far, all the strings we've created and used have been string primitives. We create string primitives by using quotes (single or double) or back-tick characters to define a string's value. To create a `String` object, on the other hand, we must use the `String` constructor:

```node
> let strPrimitive = 'abc'
> typeof strPrimitive
'string'

> let strObject = new String('xyz')
> typeof strObject
'object'
```

That's interesting: a string primitive's type is `'string'`, but the `String` object's type is `'object'`. It's clear that JavaScript considers the two types of string as different types. That difference has implications. Consider this code:

```node
> 'abc' === 'abc'
true

> new String('abc') === new String('abc')
false
```

Wow! Two string primitives that have the same value are equal, but not two `String` objects. If you're confused by that, think of poor JavaScript. What's an OOP language to do with weirdness like that? Fortunately, JavaScript is pretty good about remembering what's what.

That still leaves us with a big question: why in the world do we need a `String` object? That goes back to our original question: 

##### How can we call methods on string primitives?

- The answer is that when you try to access a property or invoke a method on a string primitive, JavaScript *wraps* the string primitive in a `String` object behind the scenes. 
  - The process sounds complicated and costly in computing resources, but the implementation is reasonably lightweight; there is little impact on your program. Best of all, the process is invisible.

- Once JavaScript has wrapped your string primitive in a `String` object, it then uses the object to access the property or call the method. When the wrapping object has served its purpose, JavaScript <u>discards</u> it.

- Properties and Methods always return strings as primitive, so you also don't have to worry about converting `String` objects to primitives.

- As a general rule, you should not create `String` objects explicitly. That's where you're likely to run into problems with the distinction between string primitives and `String` objects. However, if you're writing code where you may have to operate on `String` objects, you can use `String.prototype.valueOf()` to retrieve the value of the `String` object as a primitive.

#### `String` Without `new`

As with most constructors, with the notable exception of `Array` and `Object`, calling the constructor without the `new` keyword does *not* create an object. In the case of `String`, it simply returns a new string, not an object, when you omit the `new` keyword:

```terminal
> let str = String('abc')
> typeof str
'string'
```

The `String` function takes non-string values as arguments as well. In that case, it converts the value to a string:

```node
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
  - When called without `new`, the `Number` function converts its argument to a number, and the `Boolean` function converts its argument to a boolean.

```node
> Number('123');
123

> Boolean(0);
false

> Boolean('abc');
true
```

- As with strings, numbers and booleans both have primitive and object forms, and JavaScript invisibly wraps primitives in objects to access methods and properties. 
- You should also avoid creating `Number` and `Boolean` objects explicitly.

#### Extending Built-in Prototypes

Change prototypes to add new capabilities to our built-in objects. Best to avoid this though. 

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

- Use non-mutating array methods on strings. 

```JS
let anyArray = [];
let string = 'yes';

string = anyArray.map.call(string, callbackFn).join('');
```

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
// invoking every with string as its context 
```

Why does method borrowing work? Let's look at a simplified implementation of `Array.prototype.every`:

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

### ES6 Classes

#### Gist

S6 introduced a new `class` keyword to JavaScript. We take a brief look at the `class` keyword [this Gist](https://launchschool.com/gists/6ba85481).

- The ECMAScript 6 (ES6) standard added the `class` keyword to JavaScript. 

- In effect, classes act like **syntactic sugar** -- syntax designed to be easier to read or use -- that makes it easier for programmers to migrate to JavaScript from other OOP languages. 
  - In essence, they provide little more than a more natural and possibly familiar way to create constructors and prototypes.

- That's not the entire story, of course. In JavaScript, there always seems to be some unusual or unexpected behavior behind every feature, no matter how ordinary it looks. It should come as no surprise that classes are no different. We'll barely touch on that in this assignment. For now, think of classes as syntactic sugar, and you'll be okay.

- The syntax for defining classes is similar to that of defining functions. In particular, both functions and classes have two significant definition styles: declarations and expressions. We'll examine how classes do that in this assignment.

#### A Simple Type

Before we get into the `class` syntax, let's first define a simple `Rectangle` type using the familiar constructor and prototype pattern:

```js
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.prototype.getArea = function() { // adding method to constructor.prototype is outside the constructor function :( 
  return this.length * this.width;
};

let rec = new Rectangle(10, 5);
console.log(typeof Rectangle);         // function
console.log(rec instanceof Rectangle); // true
console.log(rec.constructor);          // [Function: Rectangle]
console.log(rec.getArea());            // 50
```

- This code is straightforward and easy to follow, and the outputs should be exactly what you expect. In particular, the object created by the `Rectangle` constructor, `rec`, is an instance of the `Rectangle` type, and we can call the `getArea` method from its prototype to calculate the area.

- It's interesting to note that you can call the `Rectangle` constructor without the `new` keyword. However, if you do, the constructor won't work properly. It's possible to write constructors that work with or without the `new` keyword, but most JavaScript developers won't bother.

Now, let's see what this code looks like using the `class` keyword.

#### Class Declarations

The simplest way to create classes in JavaScript is with the **class declaration**, which looks similar to classes in other languages.

```js
class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() { // don't need .prototype to put methods and properties inside Rectangle.prototype object
    return this.length * this.width; 
  }
}

let rec = new Rectangle(10, 5);
console.log(typeof Rectangle);         // function
console.log(rec instanceof Rectangle); // true
console.log(rec.constructor);          // [class Rectangle]
console.log(rec.getArea());            // 50
```

- Class declarations begin with the `class` keyword, followed by the name of the class. The rest of the syntax looks similar to the simplified (concise) method definition that you can use in object literals.
- Differences
  - However, there are no commas between the properties of the class.
  - One significant difference is that the constructor is now a method named `constructor` inside our class instead of being a standalone function. Other methods have no special meaning; you can define as many as you need. 
  - In this case, we define `getArea`, and it gets placed in `Rectangle.prototype`.
  - Another significant difference: you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.

- In most situations, instantiating a new object from a class is identical to creating one with the constructor/prototype pattern:

```js
let rec = new Rectangle(10, 5);
```

You can even call methods on `Rectangle.prototype` in the same way:

```js
console.log(rec.getArea());            // 50
```

The class code and instantiation is so similar to the constructor/prototype code that `typeof` even returns `'function'`, and the object checks out as an instance of `Rectangle`:

```js
console.log(typeof Rectangle); // "function"
console.log(rec instanceof Rectangle); // true
```

- One minor difference is that `rec.constructor` may produce different results in the two patterns. For example, in Node, logging `rec.constructor` produces `[Function: Rectangle]` for the constructor/prototype example, and `[class Rectangle]` for the class example. This difference is implementation dependent, and not considered significant.

- There is one significant difference, however: you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.

- Using classes, it's possible to do everything you can with the constructor and prototype pattern. However, the class syntax is easier to read and write, and the enforced `new` keyword helps prevent bugs.

#### Class Expressions

Functions have an expression form that does not require a name after the `function` keyword. Classes have a similar expression form. Consider the following code:

```js
let Rectangle = class {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }
};
```

- Aside from the syntax, class expressions are <u>functionally equivalent</u> to class declarations. Which you use is primarily a matter of style.
  - This means <u>class expressions are hoisted.</u> 

#### Classes as First-Class Citizens

- In programming, a **first-class citizen** is a value that can be passed into a function, returned from a function, and assigned to a variable. 
- Like JavaScript functions, JavaScript classes are also first-class values. For example, you can pass classes into functions as arguments:

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

If that doesn't surprise you, that's good! Earlier, we mentioned that classes are just functions, and demonstrated that with `typeof`:

```js
typeof Foo; // => "function"
```

Since functions are first-class objects, classes must also be first-class objects!

#### Static Methods and Properties

You may remember seeing some methods like `Array.isArray` and `Object.keys` that are invoked with `Array` or `Object` as the caller instead of an actual array or object. For instance:

```js
Array.isArray([1, 2, 3]); // => true
[1, 2, 3].isArray();      // raises a TypeError
```

- Don't call methods defined on constructor *class methods*, call them **static methods**. 

- Ordinary methods -- those defined on a prototype object -- are sometimes called **instance methods** or **object methods** since you need an instance of (an object) the type. More commonly, they are simply called methods.

- You can define static methods on your custom constructor methods. For instance, let's add one to the `Rectangle` type we defined earlier:

```js
// non class example
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.getDescription = function() {
  return 'A rectangle is a shape with 4 sides';
}

console.log(Rectangle.getDescription()); // A rectangle is a shape with 4 sides
```

This code defines a static method named `getDescription` on the `Rectangle` constructor. To use this method, you invoke it with the `Rectangle` function object.

- Use the `static` keyword to define static methods in a `class` constructor. 

```js
class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  static getDescription() { // instead of `Rectangle.getDescription`..., use static keyword
    return 'A rectangle is a shape with 4 sides';
  }

  getArea() {
    return this.length * this.width; // instance method
  }
}

console.log(Rectangle.getDescription()); // A rectangle is a shape with 4 sides
```

As before, we call the method with the name of the constructor function -- in the case of a `class`, the constructor function's name is the name of the class.

- You can also define **static properties**. Static properties are properties that are defined on the constructor function instead of the individual objects. 
  - One well-known example of a static property is the `length` property used by the `String` type. To define a static property with the constructor and prototype pattern, just add it to the constructor function object:

```js
Rectangle.description = 'A rectangle is a shape with 4 sides';
```

- To define static property with a `class`, just use the `static` keyword inside the `class`:

```js
class Rectangle {
  static description = 'A rectangle is a shape with 4 sides';
}
```

As of this writing in late 2020, static properties are a recent addition to JavaScript. They aren't completely supported, yet. Fortunately, recent versions of Node support them, which means we can use them in our code in this course. If you want to use static properties in a browser or an older version of Node that doesn't support them, you *can* accomplish the same effect by adding a property directly to the class:

```js
Rectangle.description = 'A rectangle is a shape with 4 sides';
```

Yes, that code is identical to what we would write if we were using the constructor/prototype pattern.

Once you've finished with the Gist, you can finish watching the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you began watching earlier. The portion of the video that pertains to this assignment starts at about the 01:25:10 mark and continues through the end of the video (about 14 minutes remaining).

#### Summary

ES6 classes provide a cleaner, more compact alternative to constructors and prototypes. As with functions, they are first-class citizens and come in the form of declarations and expressions. Functionally, classes behave almost identically to the constructors and prototypes they aim to replace. Classes allow for static methods by using the `static` modifier.

------

### Practice Problems - Classes

1. What do we mean when we say that classes are first-class values?

   Solution

   We can treat JavaScript classes like any other JavaScript value. They can be passed around to functions, returned from functions, assigned to variables, and used anywhere a value is expected. 

2. Consider the following class declaration:

   ```js
   class Television {
     static manufacturer() {
       // omitted code
     }
   
     model() {
       // method logic
     }
   }
   ```

   `static` modifier creates a `manufacturer` method on the `Television` constructor. 

   Call it by `Television.manufacturer`. 

   Solution

   The `static` modifier, when used with a method declaration, marks the method as static. That is, the method is defined directly on the class, not on the objects the class creates. We use it like this:

   ```js
   Television.manufacturer();
   ```

   The `model` method, on the other hand, is an instance method and must be called by an instance object:

   ```js
   let tv = new Television();
   tv.model();
   ```

------

### Lesson 3 Summary

- Factory functions instantiate and return a new object in the function body. They let us create new objects based on a predefined template. However they have 2 downsides.
  - There is no way to tell whether a factory function created a given object. 
  - All objects created by a factory function have separate copies of the methods, which can be redundant and wasteful and memory intensive.
- Constructor functions are meant to be invoked with the `new` operator. They instantiate a new object behind the scenes and let the developer manipulate it through the `this` keyword. A typical constructor uses the following pattern: 
  - The constructor is invoked with `new`.
  - The JS runtime creates a new object that inherits from the constructor's prototype object.
  - The new object is assigned to `this` within the function body.
  - The code in the function body is executed.
  - The function returns the object referenced by `this` unless the function returns an explicit object. 
- Every <u>function</u> has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself. If `Kumquat` is a constructor function, then `Kumquat.prototype.constructor === Kumquat`.
  - If the function is used as a constructor, the returned object(instance object)'s `[[Prototype]]` will reference the constructor's prototype property
  - This lets us set properties on the constructor's prototype object so that all objects created by the constructor will share them. We call this the *pseudo-classical* pattern of object creation. 
- Every function also has a `constructor` property that points to `Function`. 
- The **pseudo-classical** **object creation pattern** generates objects using a constructor function that defines state and a prototype object that defines shared behaviors.
- The **pseudo-classical inheritance pattern** has types (e.g., classes) inherit from other types. This way, all objects of a given type can share behaviors from the same source.
- The **class syntax**, a relatively new addition to JavaScript, is syntactic sugar (cleaner syntax) for creating objects that use constructors and prototypes. JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages.

------

### Concepts Summarized

##### Factory Functions

- **Object factories** / factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template. 

Advantages

- The factory function lets us create multiple objects of the same "type" with a pre-defined "template."

Disadvantages

- Every object created with a factory function has a full copy of all the methods. That's redundant, and it can place a heavy load on system memory.
- There is no way to inspect an object and learn whether we created it with a factory function. That effectively makes it impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics.

##### Constructors 

- just remember its used to create objects 

- **Constructor**  is a function that creates and returns an object/ the **instance** of the constructor function. 
- Use `new` keyword / operator preceding a <u>function invocation</u>, to treat the function as a constructor. 
- What `new` does. 
  - Creates an entirely new object (the **instance**), with its **own** properties. 
  - Sets prototype of the new object to the object referenced by the constructor's `prototype` property. 
  - Sets the execution context / value of `this` for the function to point to the new object. 
  - It invokes the constructor function. 
  - Returns the new object unless the function returns another object. 
- Summary of what `new` does
  -  if used before a function, it invokes an existing function as a constructor and returns the instance of the constructor function. 
  -  Also used to create arrays and objects
- What `new` DOESNT do
  - It does not create a new function. 
- Return value of constructor 
  - If there is an explicit return object, then that object is returned. 
  - In all other situations, constructor returns the newly created object, provided no errors occur. 
  - Constructor in particular ignores primitive return values and returns the new object instead. 
- Use `instanceof`  or `fuc.constructor` to determine what constructor created the object. 
- **scope-safe constructors**: designed to return the same result whether its called with `new` or without new. 
  - Most, but not all, of JavaScript's built-in constructors, such as `Object`, `RegExp`, and `Array`, are scope-safe. `String` is not:

##### Constructors with Prototypes

- The constructor creates an object that inherits from the constructor's prototype object. (`constructor.prototype`)
- **object prototype**: the object from which an object inherits from. 
  - By default, constructor functions set the object prototype for the objects they create to the *constructor's prototype object.*
- The **constructor's prototype object** /  **function prototype** / **`prototype` property** is an object that the constructor uses as the object prototype for the instance object (objects it creates).
  - Every JavaScript function has a `prototype` property. However, JavaScript only uses it when you call that function as a constructor, that is, by using the `new` keyword. 
  - Even if you reassign this prototype property to a new object, the prototype for the instance object created by constructor doesn't change. It's still the original prototype defined during the constructor's invocation. (practice problem 5)
- **`Object.constructor` property**
  - Returns a reference to the constructor function that created the instance object. 

##### Instance vs Static 

- **Instance Methods**: methods defined on an instance. 
  - any method defined in any prototype in the prototype chain of an object is considered to be an instance method of an object. 
  - methods that require an instance of object of its type to be created (usually by a constructor) before you can call a method on the instance. 
  - also called **object methods**/ or just methods. 
- **Instance Properties**: properties defined on an an instance. 
- **Static properties:** properties defined and accessed directly on the <u>constructor</u>, not on an instance or a prototype.
  - Use `static` keyword to define properties & methods on a `class` constructor. Rather than `constructor.property = `
- **Static Methods**: methods defined on on a constructor.  

##### Built in constructors

- Object constructor
  - can omit `new`
- Array constructor
  - can omit `new`
- String constructor
  - can't omit `new`
  - Don't create `String` objects explicitly. 
  - When calling a method on a string, JS converts the string to a `String` object, then discards it when done. 
- Number & Boolean constructor
  - can't omit `new`
  - Don't create `Number` or `Boolean` objects explicitly. 

##### Extending built in prototypes

- Borrowing array methods for strings by using explicit context binding. 
- Array methods that mutate the array won't work with strings. Again, that makes sense: strings are immutable.
- The `call` and `apply` functions don't change a function's logic or return values; they merely change what object the method uses for its context. 
  - Array methods that return an array will still do so even when called on a string value. If you need a string result, you can use `join` to convert the array to a string

------

### Vocabulary

- **"oft-used"**: frequently used 

- **degenerate case**?

- **instantiate** 

- **instance**: the object created by a constructor function(or factory function). 

- **Delegate** means 

  -  *delegating* the responsibility to the *prototype* higher up in the internal prototype [[*Prototype*]] chain. 

- **A scope-safe constructor** is designed to return the same result regardless of whether it's called with or without `new`

  - Most, but not all, of JavaScript's built-in constructors, such as `Object`, `RegExp`, and `Array`, are scope-safe. `String` is not. 

  ```js
  new Object();          // Object {}
  Object();              // Object {}
  
  new Array(1, 2, 3);    // [1, 2, 3]
  Array(1, 2, 3);        // [1, 2, 3]
  
  new String("abc");     // [String: 'abc']
  String("abc");         // 'abc'
  ```

- **Array like object**:  is any object that has a `length` property and provides indexed access to some of its properties with the `[index]` notation. 

  - Such objects have properties whose keys are non-negative integers. 
  - In many cases, the `length` property won't self-update if you add or remove properties to or from the object.

- **The Prototype Chain**: is how JavaScript inherits properties from other objects. If we try to look for a property that is not owned by an object, JavaScript will traverse up the prototype chain until it finds it. 

  - For example if we try to access a property on an object (`obj`) and it's not a property owned directly by that object then JavaScript then looks for the property in the object that `obj`'s  `__proto__` or `[[Prorotype]]` property points to. 

------

### Question

Explain what prototype chain is. 

Why does this code work? Line 4. Recursion. 

```js
// Delete DogPrototype

function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype); // this is really interesting! We are creating the property after "invoking" it?
  // rest of the code
}

Dog.myPrototype = { // is it better to do this assignment, outside of the Dog function? 
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};
```

- We don't need line 4, because `new` already sets  constructor prototype as the prototype for the new object. That is, the new object inherits from the object referenced by the constructor prototype. 

------

##### Using `this` inside Math methods

```js
function Circle(radius) {
  this.radius = radius; 
  Circle.prototype.area = function () {
    return Math.PI * Math.pow(this.radius, 2); //!!
  }
}
```

##### Is it better to set properties outside the constructor function or inside it? 

- better outside. I think they both work the same way, but style is to not confuse constructor methods & constructor's prototype methods. 

```js
// not like this
function Circle(radius) {
  this.radius = radius; // remember to set the new object's properties! 
  Circle.prototype.area = function () { // Circle.prototype is the function prototype/ prototype property that instance inherits from. We are not defining a method on the Circle constructor -> remember this!! 
    return Math.PI * Math.pow(this.radius, 2);
  }
}
```

```js
// like this. 
function Circle(radius) {
  this.radius = radius; // remember to set the new object's properties! 
}

Circle.prototype.area = function () {
  return Math.PI * Math.pow(this.radius, 2);
}
```

------

### Lesson 3 Quiz 1

Question 3) 

```js
function Dog() {
}

function Pet(type) {
  if (type === 'dog') {
    return new Dog();
  } else if (type === 'lion') {
    return 'not a pet!';
  }
}

let dog = new Pet('dog'); // returns a `Pet` object
let lion = new Pet('lion'); // lion returns a `Dog` object
let cat = new Pet('cat'); // returns a `Pet` object
```

Question 5) wrong

```js
let arr1 = new Array(1, 2, 3);
let arr2 = Array(1, 2, 3);

console.log(arr1 === arr2); // => false
```

Both arrays are identical: they are both objects of type Array, and they both have the same values in their elements. JavaScript does not require the `new` keyword when creating arrays; the `Array` constructor works the same regardless of whether `new` is used.

Question 7 ) wrong

Why is the `Array.isArray` static method useful? Choose all answers that apply.

- The `typeof` operator returns `object` when used with an array, so cannot be used to detect an array.

- It helps improve readability and show intent.

- `Array.isArray` helps distinguish between arrays and other objects.

Question  8) wrong

Which of the following are Array-like objects? Choose all answers that apply.

- All objects that have a `length` property. 

Anwers that are wrong

- All objects that let you use computed member access notation, e.g., `obj["3"]`, to access properties of the object.
  - The ability to use **computed member access notation** is native to all JavaScript objects, not just array-like objects. 
  - So all objects have computed member access notation. 
- All objects that have one or more properties whose key is a non-negative integer.

Question 9) wrong

```js
str = [1, 2, 3].map.call(str, convertCase).join("");
// this syntax uses an array(any array would work) to invoke call, which invokes map to execute convertCase with str as the context. 

str = Array.from(str).map(convertCase).join(""); 
// This code uses the Array.from static method to convert str to an array of characters.
// That lets us use Array.prototype.map and Array.prototype.join to translate the characters and recombined them as a string.
```



Question 12) 

```js
function Foo(parm) {
  this.parm = parm;
}

Foo.bar = function() { // static method called bar
  // omitted code
};

Foo.prototype.qux = function() { // instance method calle qux
  // omitted code
};

let foo = new Foo(10);
```

```js
class Foo {
  constructor(parm) {
    this.parm = parm;
  }

  static bar() {
    // omitted code
  }

  prototype: {  // here you are assigning a property called prototype in the Foo.prototype objec, rather than qu Foo.prototype object is initially an empty object / undefined. 
    qux() {
      // omitted code
    }
  }
}

let foo = new Foo(10);
```

# Lesson 4

### Introduction

So far in this course, we've discussed a number of different concepts which underpin the Object Oriented Programming paradigm. We've also explored various different ways in which these concepts are implemented in the context of a JavaScript program.

- By this point you should be comfortable with the concept of using objects to *encapsulate* data and behavior in order to add structure to your code, and the importance of function *execution context* when working with objects in this way. You should have an understanding of using *prototypes* to delegate property and method access. You should also be familiar with using object creation patterns in order to create multiple objects of the same *type*.

The advantages of using an object-oriented approach really start to become apparent when you combine some of these concepts together.

-  In this lesson, we'll explore how you can leverage prototypal delegation to create object *subtypes*. This is one way of enabling code re-use within your programs. 
-  Another way of enabling code re-use is by using *mix-ins*, we'll look at how to do that too. 
-  Finally, we'll tie these ideas together by discussing another of the fundamental pillars of OOP: *polymorphism*.

-  As well as this, we'll demonstrate the flexibility of object-orientation in JavaScript by exploring another object creation pattern, the OLOO pattern.

------

### Object Creation with Prototypes (OLOO)

In a prior lesson, we showed an example of an object creation pattern called the factory function. We'll revisit that example and use it to illustrate another object creation pattern that uses prototypes. Here's the code that we saw earlier:

```js
function createCar(make, model, year) {
  return {
    make,
    model,
    year,
    started: false,

    start() { // in factory functions, methods are the new object's OWN property rather than a property of parent object like constructor.prototype.
      this.started = true;
    },

    stop() {
      this.started = false;
    },
  };
}
```

The `createCar` function takes three arguments and returns a car object with four properties and two methods. We can use it like this:

```js
let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);
```

#### The OLOO Pattern

- Summary

  - The *Objects Linking to Other Objects* (OLOO) pattern of object creation uses a prototype object, an initializer method, and the `Object.create` method to create objects that inherit from the prototype. 

  - The initializer customizes the state for each object, and is usually named `init`.  `init` returns `this`, a reference to the calling object. 

  - Create new objects using that object prototype with this code`let newObj = Object.create(obj).init(state)`

  - Compare the two creation patterns

    ```js
    // pseudo-classical(constructor inheritance)
    let newObj = new Obj(); // newObj is an instance of Obj
    
    // OLOO
    let newObj = Object.create(obj).init();
    ```

- Subtyping with OLOO

  - ```js
    let superType = {
      initializer(variable) {
        
      }
    }
    
    let subType = Object.create(superType);
    subType.init = function() {
      return this.initialize(variable);
    }
    
    // creating a subType object
    // code essentially does what super() does in class syntax
    let newobj = Object.create(subType).init();
    ```

- **OLOO** pattern: **Objects Linking to Other Objects**.

  - Another pattern to create objects in bulk
  - does not use a function. Uses an object as prototype, then `Object.create` to create new objects that inherit from the prototype. Uses `init` method to customize state of each object, `init` returns `this`, a reference to the calling object. 
  - It uses prototypes and involves extracting properties common to all objects of the same type (e.g., car objects) to a prototype object. All objects of the same type then inherit from that prototype.

Let's do that with car objects. What properties are common to all car objects? Here, those properties are the `start` and `stop` methods. All cars have `make`, `model`, `year`, and `started` properties as well, but each object has different values for those properties. Thus, we don't count them as being common to all cars.

We can extract the `start` and `stop` methods to a prototype object.

```js
let carPrototype = {
  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },
};
```

Now that we have a car prototype object, all car objects can inherit from it:

```js
let car1 = Object.create(carPrototype);
car1.make = 'Toyota';
car1.model = 'Corolla';
car1.year = 2016;
```

We can now call `start` and `stop` on the `car1` object since both are accessible through its prototype, `carPrototype`.

```js
car1.start();
car1.started; // => true

car1.stop();
car1.started; // => false
```

Calling `start` and `stop` on the `car1` object changes the state of `car1` even though those methods don't belong to `car1`. That shouldn't come as a surprise since we're using `car1` as the execution context for the calls. When we call these methods, `this` is set to `car1`, so the methods change the `started` property in `car1`.

That's all well and good. We've set up a car prototype that all our car objects can inherit.

However, we still have a small problem: we must set the `make`, `model`, and `year` properties manually every time we create a car object. Can we automate that? Fortunately, yes; there's more than one way.

#### Init 

- The initializer method that customizes the state for each object. 

- The most common technique uses an `init` method on the prototype object:
  - `init` is a function that initializes values in newly created objects. It also returns `this`, which is a reference to the object that called `init`
    - so we are able to method chain after calling `Object.create`!! 

```js
let carPrototype = { // is an object, not a function. 
  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },

  init(make, model, year) { // customzies state of object
    this.make = make;
    this.model = model;
    this.year = year;
    return this;
  },
};
```

Since `init` now returns a reference to the car object it was called on, we can chain `create` and `init` and assign the result to the `car1` variable:

```js
let car1 = Object.create(carPrototype).init('Toyota', 'Corolla', 2016);
```

#### Advantage of OLOO over Factory Function

- You can use both factory functions and the OLOO pattern to bulk create objects of the same type. 
- Though the result is an object creation mechanism in both cases, the OLOO pattern has one significant advantage over factory functions: memory efficiency. 
  - Since all objects created with the OLOO pattern inherit methods from a single prototype object, the objects that inherit from that prototype object share the same methods. 
  - Factory functions, on the other hand, create copies of all the methods for each new object. That can have a significant performance impact, especially on smaller devices with limited memory.
- An advantage of the factory pattern is that it lets us create objects with private state. If that doesn't make sense to you yet, don't worry. We'll return to this topic in a later course when we discuss closures.
  - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

------

### Practice Problems: Object Creation with Prototypes

1. Use a factory function to create pet objects. The factory should let us create and use pets like this:

   ```js
   let pudding = createPet("Cat", "Pudding");
   console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
   pudding.sleep(); // I am sleeping
   pudding.wake();  // I am awake
   
   let neptune = createPet("Fish", "Neptune");
   console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
   neptune.sleep(); // I am sleeping
   neptune.wake();  // I am awake
   ```

   Solution

   ```js
   function createPet(animal, name) {
     return {
     	animal: animal, 
     	name: name, 
       
       sleep() {
         console.log('I am sleeping');
       }, 
         
       wake() {
         console.log('I am awake');
       }
     };
   }
   ```

2. Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:

   ```js
   let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
   console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
   pudding.sleep(); // I am sleeping
   pudding.wake();  // I am awake
   
   let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
   console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
   neptune.sleep(); // I am sleeping
   neptune.wake();  // I am awake
   ```

   Solution

   ```js
   let PetPrototype = {
       init (animal, name) {
       	this.animal = animal;
       	this.name = name;
       	return this;
     	}
       sleep() {
         console.log('I am sleeping');
       }, 
         
       wake() {
         console.log('I am awake');
       }, 
     
   }
   ```

   

3. Consider the objects created by the programs in problems 1 and 2. How do objects for the same animal differ from each other?

   Objects created by the factory function has methods as its own property. Objects created using the OLOO pattern share methods with the prototype object. 

   solution

   Objects created with the OLOO have a prototype object that contains the methods associated with the created objects. Since all pets created from the prototype share a single prototype object, they all share the same methods. With the factory function, each object has a copy of all the methods. Thus, objects created by OLOO are more efficient in terms of memory use.
   
   Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

------

### Subtyping with Constructors and Prototypes

- Constructors and prototypes mimic classes in JavaScript.
  - One may argue that they exist in the language solely to make it easier for developers to switch to JavaScript. 
- The combination of constructors and prototypes gives us something that resembles a **class**, a construct used in classical OOP languages like Java, Python, and Ruby. Class is a blueprint for creating objects. Traditional OOP languages use classes to create distinct objects of a particular type and give those objects the behaviors and state that they need. 

- An essential part of the OO paradigm is the concept of inheritance. In most OOP languages, inheritance means something a bit different from the way we use it in conjunction with JavaScript. That can make JavaScript inheritance confusing if you've seen inheritance in other languages. For now, it may be wise to forget what you think you know about inheritance based on those other languages.

Let's look at an example that shows why we might need inheritance in an application. Assume that we have a drawing application that lets the user work with shapes. In this app, the constructor/prototype combination for rectangles might look like this:

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
```

We can create and manipulate `Rectangle` objects like so:

```js
let rect = new Rectangle(10, 5);
rect.getArea();     // => 50
rect.toString();    // => "[Rectangle 10 x 5]"
```

Our `Rectangle` constructor creates rectangle objects that have `width` and `length` as properties and the methods `getArea` and `toString`.

Suppose our application also needs squares. We can set up another constructor/prototype combination for those squares, and then follow the same pattern we used for rectangles:

```js
function Square(size) {
  this.length = size;
  this.width = size;
}

Square.prototype.getArea = function() {
  return this.length * this.width;
};

Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
};

let sqr = new Square(5);
sqr.getArea();     // => 25
sqr.toString();    // => "[Square 5 x 5]"
```

There's some code duplication between this code and the `Rectangle` code. In particular, `Square.prototype.getArea` and `Rectangle.prototype.getArea` are identical. That gives us a chance to reuse some code.

We can use prototypal inheritance to our advantage here. One way to think about the relationship between `Square` and `Rectangle` is that a square is a special kind of rectangle where both the length and width are the same. We say that `Square` is a **sub-type** of `Rectangle`, or that `Rectangle` is a **super-type** of `Square`. Consider the following code:

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

Since a function's `prototype` property is writable -- we can change what object it references -- we can reassign `Square.prototype` to an object that inherits from `Rectangle.prototype`. The result is a prototype chain that looks like this:

```plaintext
sqr ---> Square.prototype ---> Rectangle.prototype ---> Object.prototype
```

All objects created by the `Square` constructor inherit from `Square.prototype`, which we have set up to inherit from `Rectangle.prototype`. Thus, all square objects have access to methods on `Rectangle.prototype`. Since `toString` must be different for squares, we override it in `Square.prototype`. That is, we customize `Square.prototype.toString`. Since `getArea` requires no customization, we can let square objects use the inherited `Rectangle.prototype.getArea`.

#### Restoring the `constructor` property

One side-effect of this approach is that the `constructor` property on square objects points to `Rectangle` when it should point to `Square` instead:

```js
// omitted code

sqr.constructor === Rectangle; // => true
```

Why does that happen? It happens since we reassign `Square.prototype` to a new object that inherits from `Rectangle.prototype`, and the `constructor` property for `Rectangle.prototype` points back to `Rectangle`. Thus, `Square.prototype.constructor` points to `Rectangle`. To fix this situation, we merely need to reassign `Square.prototype.constructor` to `Square`:

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

Why do we need to reassign the `constructor` property? In most cases, failure to reassign it won't hurt anything, and it certainly doesn't in this code. However, there are [situations where the value of the `constructor` property is important](http://2ality.com/2011/06/constructor-property.html).

#### Constructor Reuse

If you examine the bodies of the `Rectangle` and `Square` functions, you'll see that they're similar. That suggests that we may be able to use the `Rectangle` constructor in `Square`. To do that, we must invoke `Rectangle` with its execution context explicitly set to the execution context of `Square`:

```js
function Square(size) {
  Rectangle.call(this, size, size);
}
```

Our code now looks like this:

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

#### Prototypal Inheritance vs. Pseudo-Classical Inheritance

As used in JavaScript, the term *inheritance* is an overloaded word. It describes two related but distinct forms of inheritance: *prototypal* and *pseudo-classical* (constructor inheritance)

- Both pseudo-classical and prototypal inheritance use prototypal delegation under the hood. If the requested property isn't found, the object delegates the request to the object's prototype object. If the requested property isn't there either, the prototype object delegates the request to its own prototype object. 
- This process follows the prototype chain until the property or method is found or the end of the prototype chain is found.

##### prototypal inheritance (prototypal delegation)

- simplier

- We sometimes call this form of inheritance **object inheritance** since it works with one object at a time.

- An object's internal `[[Prototype]]` property points to another object, and the object can delegate method calls to that other object. 

  

  We've seen plenty of examples of prototypal inheritance in earlier assignments. For instance

```js
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

Here, the `will` object inherits from the `personPrototype` object which, in turn, inherits from `humanPrototype`. `will`'s `[[Prototype]]` property refers to `personPrototype`, and the `[[Prototype]]` property of `personPrototype` refers to `humanPrototype`. When we invoke `toString`, it finds the methods `myName` and `myAge` on the `humanPrototype` object.

##### pseudo-classical inheritance (constructor inheritance)

- Uses functions to create objects. 

**pseudo-classical** object construction, also known as the **constructor/prototype pattern**. 

- A constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a **sub-type** inherits from a **super-type**.

- The term "pseudo-classical" refers to the fact that the pattern mimics classes from other OO languages but doesn't actually use classes.

- Two ways to do it

  - Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then make the constructor property of the **sub-type**'s prototype object back to the **sub-type** function. 

  ```js
  Square.prototype = Object.create(Rectangle.prototype);
  Square.prototype.constructor = Square;
  ```

  - Use `extends`. 

- In this pattern, we use a constructor function and a prototype object to create objects and provide common methods for those objects. For instance:

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.toString = function() {
  return `My name is ${this.name} and I'm ${this.age} years old.`;
};
```

- This pattern forms the basis of **pseudo-classical inheritance**, also called **constructor inheritance**. 

- When people talk about *inheritance* in the context of JavaScript, they often mean this kind of inheritance. 
- In pseudo-classical inheritance, a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a sub-type inherits from a super-type.

For instance, we can rewrite the prototypal inheritance example to use pseudo-classical inheritance:

```js
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

#### Practice Problem

Consider the following code:

```js
function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};
```

What happens in each of the following cases? Try to answer without running the code.

**Case 1**

```js
let hello = new Hello();
hello.hi();
```

 This code logs `Hello!` to the console.

**Case 2**

```js
let hello = new Hello();
hello.bye();
```

This code raises a `TypeError`. Neither `Hello.prototype` nor its prototype, `Greeting.prototype`, have a `bye` method defined.

**Case 3**

```js
let hello = new Hello();
hello.greet();
```

This code logs `undefined` to the console. Since `Hello` inherits from `Greeting`, the `hello` object has access to `greet`. However, `greet` takes an argument, which isn't supplied by this code.

**Case 4**

```js
let hello = new Hello();
hello.greet('Goodbye');
```

 This code logs `Goodbye` to the console.

**Case 5**

```js
Hello.hi(); // invoking function Hello as a normal function. There is no `hi` method inside `Hello`. 
```

This code also raises a `TypeError`. The `hi` method is defined on `Hello.prototype`, not on the `Hello` constructor itself. Thus, only instances of `Hello` have access to `hi`.

------

#### Further Reading

The following article summarizes the topics we've studied so far in this lesson and brings up some interesting aspects of constructors and prototypes that we haven't mentioned. (When is a cat a person?) Be sure to give it a read before you move forward:

#### Read 1

[JavaScript Constructors and Prototypes](http://tobyho.com/2010/11/22/javascript-constructors-and/)

- If we call a function as a function (without `new`), `this` is set to the global object. It returns undefined, and we unintentionally create a global variable. 
- To prevent polluting of namespace(creating global variables), do this

``` js
function Person(name){
    if (!(this instanceof Person))
        return new Person(name)
    this.name = name
} 
// checks whether `this` is really a person, which would be if it was called using new. 
// if not a person, use a `new` to create a Person, the correct way and return it. 
```

##### Methods , Inheritance

- Methods are the behaviors of an object - what the object can do. 
- We use constructors for inheritance
- JavaScript is different from traditional object-oriented languages in that it uses *prototype inheritance*. In a nutshell, prototype inheritance in JavaScript works like this:
  1. An object has a number of properties. *This includes any attributes or functions(methods).*
  2. An object has a special parent property, this is also called the prototype of the object(`__proto__`). An object inherits all the properties of its parent. 
  3. An object can override a property of its parent by setting the property on itself.
  4. A constructor creates objects. Each constructor has an associated `prototype` object, which is simply another object.
  5. When an object is created, it’s parent is set to the prototype object associated with the constructor that created it.

##### Prototypes

```js
childFucntion.prototype = new Parent();
childFunction.prototype.constructor = childFunction; // be sure to set the prototype object's constructor in child function to itself. 
```

- declaring methods on prototype is more memory efficient. 
  - Definint methods on objects causes the method to be the object's own property. Defining methods on prototype allows it to be shared amongst all objects that inherit from the prototype. 

##### Apply, Call

- `apply` method belongs to `Function.prototype` 
- takes any argument, even strings. 

##### New Method

- create a `new` method for `Function.protoype`, so we can call constructors with the `new` method rather than the `new` statement. 

```js
Function.prototype.new = function(){
    var args = arguments
    var constructor = this
    function Fake(){
         constructor.apply(this, args)
    }
    Fake.prototype = constructor.prototype
    return new Fake
}
```

```js
let bob = Person.new('Bob');
```

- we create a `Fake` constructor which will `apply` our real constructor as a method when created. 
- In the context of the `new` method, `this` is the *real* constructor - we save it to be used in the `Fake` constructor.

- We also save the arguments with which `new` was called to reuse in the `Fake` constructor. 
- Next we set `Fake.prototype` to the original constructor. 
  - Since the prototype’s `constructor` property is still set to the original constructor, any object created by `Fake` will still be an `instanceof` the original constructor.'
- Now you can do things like

```js
var children = [new Person('Ben'), new Person('Dan')]
var args = ['Bob'].concat(children)
var bob = Person.new.apply(Person, args)
```

------

Note that the referenced article takes advantage of JavaScript's automatic semicolon insertion mechanism. See the [On Semicolons section](https://launchschool.com/books/javascript/read/preparations#stylishjavascript) of our Introduction to Programming With JavaScript book for more information on why the author can do that.

------

#### Read 2

A Launch School student also wrote [a great article](https://medium.com/launch-school/javascript-design-patterns-building-a-mental-model-68c2d4356538) that may help solidify these concepts in your mind.

##### Prototype Chain

- Every object in JavaScript has an internal `[[prototype]]` property that can be accessed directly by a `__proto__` property. This property, referred to as the ‘dunder proto’, essentially points to another object.

- If a property is not found on an object it will check the object referenced by this `__proto__` property.

- The prototype Chain, or Prototypal Inheritance, is how JS 'inherits'  properties from other objects. If we try to access a property on an object and it's not a property directly owned by that object, the next port of call is the object pointed to by the __proto__ property. 

  - Any properties defined anywhere on an object’s prototype chain will be available to said object.

- `Object.create(obj)` is used to create a new object and link it’s `__proto__` property to the object passed in as an argument (`obj` ).

  - This will create a new object, who’s `__proto__` property is set to point at `obj`, the object passed in as an argument. 

  ```js
  newObj.__proto__ === obj; // true
  obj.isPrototypeOf(newObj); // true
  Object.getPrototypeOf(newObj); === newObj // true
  ```

- JavaScript does not have classes in the traditional sense. Prototypal inheritance is used to link objects together.

  

##### OLOO

- Objects linked to other objects (OLOO) is a JavaScript Design Pattern that lets us define a parent object from which we can create other objects. All shared properties will be defined on this parent object. 
  - Shared properties are defined on a parent object. Other objects can then be created from this parent object using `Object.create(obj)` .
  - An `init()` method defined on the parent object is used to initialize newly created objects with properties. This method is optional but commonly used.

##### Factory Functions

Drawbacks to factory function approach

- Wastes memory (each object has its own copy of the methods)
- Can't identify which function created an object

**Psuedo-classical** (constructor inheritance)

- New objects are created from constructor functions using the keyword `new` .

- Calling `new` on a function creates a new object. The code within the function executes with the execution context (`this`) set to the new object. The newly created object’s `__proto__` property is set to point at the object referenced by the functions `prototype` property. The newly created object is then implicitly returned.

- `obj.constructor` can be used to find out the name of the constructor function that created an object.

- Inheritance can be emulated by changing where a functions `.prototype` property points to (Just remember to reset where the `.constructor` property points to).

- `new`

  - There is a keyword `new` in JavaScript that when used before a function call will create a new object and execute all the code in that function. Any reference to `this` within the body of the function will point to the new object. Finally, this new object will be returned if no other object is explicitly returned. Let’s see this with some code.

- have access to a property called `.constructor` that tells us the name of the function that created our object. 

  - Where does `.constructor` come from? 
  - `.constructor` is not a property on animal, but on the `.prototype` object 
  - `.constructor` property points back to the constructor function. 

  ![img](https://miro.medium.com/max/537/1*HDuEwXsSt1Ih51Y_qg_3cw.png)

  ![img](https://miro.medium.com/max/905/1*0CwAzfdKgA5PNdCx6W8p2g.png)

  ```js
  animal.constructor === Animal;
  
  Object.keys(animal) // ["type", "breathe"]
  Object.getOwnPropertyNames(animal); // ["type", "breathe"]
  
  // constructor is a not a property in animal, so it must be a property in animal.__proto__
  // animal.__proto__ points to an object that contains the constructor property. This object is referenced by the prototype property of the Animal function. Animal.prototype
  animal.__proto__ === Animal.prototype; // true
  
  Animal.prototype.constructor === Animal; // true
  ```

  - Use `Object.keys(animal)` or `Object.getOwnPropertyNames(animal)`

##### Inheritance

- Two ways of inheritance

  - The first way lets us inherit all the properties and methods that a new object created from the parent constructor function would have access to

    - The body of the parent constructor function is executed.
    - With `new` we’re causing the code within the constructor function to run and creating a link with a prototype chain. 
    -  Setting `Dog.prototype` to point to the instance object of parent constructor function. 
  
    ```js
    // using new
    Dog.prototype = new Animal();
    Dog.prototype.constructor = Dog; // gotta point the constructors back
    ```

  - The second let’s us inherit only the properties that have been defined on the parent constructor function’s `prototype` object 

    - properties defined in the body of the function will not be inherited. 
    - with `Object.create(obj)` we’re simply creating the link without executing the code in the constructor function .
    
    ```js
    // using Object.create(Super-type.prototype)
    Dog.prototype = new Animal(); // setting it to the instance object of Animal
    Dog.prototype.constructor = Dog;
    Terrier.prototype = Object.create(Dog.prototype);
    Terrier.prototype.constructor = Terrier;
    ```
    
    - Terrier does not have access to Dog constructor's instance properties or methods. 
    - For example, Terrier doesn't have access to `legs`, in the instance object of Dog constructor. 
    
    ![img](https://miro.medium.com/max/897/1*kcJQhry0z7xda4PFCC9keg.png)



##### Using constructor property to create new objects

```js
let rex = new Terrier();
let spot = new rex.constructor;
// is the equivalent of calling new Terrier();
// Can use this method if we don't know the name of an object's constructor. 
```

------

### Subtyping with Classes

#### Reducing Complexity

- When designing an Object Oriented program, it's common to have multiple classes that perform similar actions. To reduce complexity, classes with similar behaviors can inherit from a superclass. The superclass implements the common behaviors while the inheriting classes invoke them.
- The `extends` keyword is used to denote inheritance between classes.

#### Gist

Of course, the new `class` keyword also supports subtyping. You'll learn how to do that in [this Gist](https://launchschool.com/gists/cdba6a8e).

##### Inheritance With Class Declarations

In a prior assignment, we learned how one constructor's prototype can inherit from another constructor's prototype. For example:

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

function Square(size) {
  Rectangle.call(this, size, size);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
};
```

Let's convert that code to use classes instead of constructors and prototypes. The `Square` constructor's prototype inherits from `Rectangle.prototype`, which gives square objects access to methods defined for rectangle objects. We can do the same thing with classes, but we now use the clean, straightforward syntax provided for JavaScript classes:

```js
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

The `extends` keyword signifies that the class named to the left of `extends` should inherit from the class specified to the right of `extends`. Note that we don't define `getArea` on the `Square` class since `Square` inherits it from `Rectangle` and doesn't need to customize or override the method.

##### `super`

- When called inside the `constructor` method, the `super` keyword refers to the constructor method for the parent class (the class that we inherit from). Thus, `super(size, size)` performs the same role performed by this code from our constructor/prototype example:

```js
function Square() {
  Rectangle.call(this, size, size);
}
```

- You don't need to use `super` in every subclass, but in most cases you do. In particular, if the superclass's constructor creates any object properties, you must call `super` to ensure that those properties are set properly. For instance, in the `Rectangle` class above, we create two properties in the `Rectangle` constructor, so we must call `super` in `Square`'s constructor.

- If you do call `super` in a subclass's constructor, you must call it before you use `this` in that constructor.  

- However, `super` keyword can also be used to call functions on the parent object.

  ```js
  class Vehicle {
    startEngine() {
      return 'Ready to go!';
    }
  }
  
  class Truck extends Vehicle {
    startEngine(speed) {
      return super.startEngine() + ` Drive ${speed}, please!`
      // calling function on parent object using super. This way we can use some functionality from parent class Vehicle in the Truck class. 
    }
  }
  
  let truck1 = new Truck();
  console.log(truck1.startEngine('fast'));
  
  let truck2 = new Truck();
  console.log(truck2.startEngine('slow'));
  ```

##### Inheritance With Class Expressions

Let's look at another example of inheritance with classes:

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

After reading this Gist, you might want to review the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) in part in full. We realize that this is a long video, but in this case, the repetition is worth your while if you have any shakiness surrounding these concepts.

------

#### A shallow dive into constructor property

If you haven't already read it, you may also want to read [A shallow dive into the constructor property in Javascript](https://medium.com/@patel.aneeesh/a-shallow-dive-into-the-constructor-property-in-javascript-b0a89747058b) to get a better handle on the `constructor` property from the perspective of a student at roughly the same point in the JavaScript curriculum as you.

- *you can think of __proto__ as a public interface to access [[Prototype]].*

- An object literal referenced by aneesh

  ```js
  Object.prototype.hasOwnProperty('constructor') // logs true
  
  ```

  - Since JavaScript couldn't find 'constructor' property on the aneesh object, it looked to its `[[Prototype]]` property and found the 'constructor' property in the object that the `[[Prototype]]` property references, which is Object.prototype. 
  - As we can see from this diagram, the object referenced by aneesh does not contain the ‘constructor’ property, but instead it is found after looking at the the object that aneesh’s __proto__ references, namely Object.prototype.

![img](https://miro.medium.com/max/1186/1*Ku9_8eGktsnpccJA2gszRg.jpeg)

- Notice how Object itself does not have a ‘constructor’ property. Object's constructor is Function. 
  - This is because Javascript will look through all of Object’s properties, not find a ‘constructor’ property, and then will look for it in the object that it’s __proto__ references, which is Function.prototype. Function.prototype has a ‘constructor’ property, which references Function and alas we have completed the journey!
- Test code 

```js
let obj = {};
console.log(obj.constructor); // [Function: Object]
console.log(obj.hasOwnProperty('constructor')); // false
console.log(obj.__proto__.hasOwnProperty('constructor')); // true
console.log(obj.constructor.constructor); // [Function: Function]

let arr = [];
console.log(arr.constructor); // [Function: Array]
console.log(arr.hasOwnProperty('constructor')); // false
console.log(arr.__proto__.hasOwnProperty('constructor')); // true
console.log(arr.constructor.constructor); // [Function: Function]

function func() {
}
console.log(func.constructor); // [Function: Function]
console.log(func.prototype.hasOwnProperty('constructor')); // true
console.log(func.constructor.constructor); // [Function: Function]

```

##### Summary

- all Function objects have a prototype property that references an object which contains a constructor property, which usually points back to the Function Object itself. 

- When using `Object.create` , we must manually define a `constructor` property on the new object. 

------

### Practice Problems: Subtyping with Classes

1. Suppose we have the following classes:

   ```js
   class Game {
     play() {
       return 'Start the game!';
     }
   }
   
   class Bingo extends Game {
     rulesOfPlay() {
       // rules of play
     }
   }
   ```

   What would happen if we added a `play` method to the `Bingo` class, keeping in mind that there is already a method of this name in the `Game` class from which the `Bingo` class inherits? Explain your answer. What do we call it when we define a method like this?

   Solution

   It's called **method overriding.** If we add a new `play` method to the `Bingo` class, objects created by `Bingo` will use that method instead of looking up the prototype chain and finding it in the `Game` class. As soon as JavaScript finds a method, it calls it. When a class redefines a method that a superclass redefines, it's called 'method overriding'. 

2. Let's practice creating a class hierarchy.

   Create a class named `Greeting` that has a single method named `greet`. The method should take a string argument, and it should print that argument to the console.

   Now, create two more classes that inherit from `Greeting`: one named `Hello`, and the other `Goodbye`. The `Hello` class should have a `hi` method that takes no arguments and logs `"Hello"`. The `Goodbye` class should have a `bye` method that logs `"Goodbye"`. Use the `greet` method from the `Greeting` class when implementing `Hello` and `Goodbye`; don't call `console.log` from either `Hello` or `Goodbye`.

   ```js
   class Greeting {
     greet(message) {
       console.log(message);
     }
   }
   
   class Hello extends Greeting {
     hi() {
       this.greet("Hello");
     }
   }
   
   class Goodbye extends Greeting {
     bye() {
       this.greet("Goodbye");
     }
   }
   
   ```

------

### Rewriting OO RPS with Constructors and Classes

In the first lesson of this course, we wrote an RPS game using factory functions. In this assignment, we'll take everything we've learned about constructors and classes and rewrite the game twice: first with constructors and prototypes, and then with classes.

Before we begin, here's the RPS code that we will convert:

```js
let readline = require('readline-sync');

function createPlayer() {
  return {
    move: null,
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();
  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play();
```



#### OO RPS With Constructors and Prototypes

If you've read and understood the assignments thus far in this lesson, converting the RPS game to use constructors and prototypes shouldn't be too challenging. We encourage you to try doing it on your own before you read the rest of the assignment. The conversion is mostly a mechanical process:

1. Write a constructor function for each factory function.
2. Move the initialization code from the factory function into the constructor.
3. Move all the other methods from the factory function into the constructor's prototype.
4. Replace the factory function invocations with constructor calls.

#### Converting the `RPSGame` Object

The `RPSGame` object is a singleton object that doesn't use a factory function since we only need one object. Should we convert it to a constructor? By the same reasoning that we don't need a factory function, we probably don't need a constructor. However, since our objective is to practice using constructors and prototypes, let's write a constructor for it as well.

Our `RPSGame` object currently looks like this:

```js
const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};
```

- As we've learned, we typically initialize the state of an object in its constructor and put the instance methods in the constructor's prototype. 

```js
// We'll use the constructor to create and initialize these properties for each new object:
function RPSGame() {
  this.human = createHuman();
  this.computer = createComputer();
}
```

- Next, we can move all of the methods from the `RPSGame` object and put them in the constructor's prototype:

```js
RPSGame.prototype = {
  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') ||
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie");
    }
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }
};
```

Finally, we can make sure that the prototype points back to the constructor:

oo_rps_cp.js

```js
RPSGame.prototype.constructor = RPSGame;
```

To start playing the game with the new `RPSGame` constructor, we need to instantiate a game object and call its `play` method:

oo_rps_cp.js

```js
let game = new RPSGame();
game.play();
```

That's all there is to the `RPSGame` conversion.

#### Converting the Player Creation Factories

Let's now turn our attention to the simplest factory function in the program, `createPlayer`. There's not much to this function, and the corresponding constructor is even simpler:

oo_rps_cp.js

```js
function Player() {
  this.move = null;
}
```

That's it. We don't need to add any methods to the `Player` constructor's prototype.

Next, we'll convert the `createHuman` factory function. Recall that `createHuman` reuses the `createPlayer` factory to create a human object. In terms of constructors, that means that the `Human` constructor must inherit from `Player`. We can do that by using `call` to invoke `Player`'s constructor with the `Human` object as context:

oo_rps_cp.js

```js
function Human() {
  Player.call(this);
}

Human.prototype.choose = function () {
  let choice;

  while (true) {
    console.log('Please choose rock, paper, or scissors:');
    choice = readline.question();
    if (['rock', 'paper', 'scissors'].includes(choice)) break;
    console.log('Sorry, invalid choice.');
  }

  this.move = choice;
};
```

Since `Player.prototype` doesn't have any methods, `Human.prototype` doesn't need to inherit from it. We only need to reuse the `Player` constructor in our `Human` constructor. We'll give the same treatment to the `createComputer` factory function:

oo_rps_cp.js

```js
function Computer() {
  Player.call(this);
}

Computer.prototype.choose = function() {
  const choices = ['rock', 'paper', 'scissors'];
  let randomIndex = Math.floor(Math.random() * choices.length);
  this.move = choices[randomIndex];
};
```

If you later add methods to `Player.prototype`, you must remember to inherit from it:

```js
Player.prototype.doSomething = function() { /* omitted code */ };

Human.prototype = Object.create(Player.prototype);
Human.prototype.constructor = Human;
Human.prototype.choose = { /* omitted code */ };

Computer.prototype = Object.create(Player.prototype);
Computer.prototype.constructor = Computer;
Computer.prototype.choose = { /* omitted code */ };
```

The transformation is almost complete. The final task is to change the `RPSGame` constructor to use the `Human` and `Computer` constructors instead of the factory functions.

oo_rps_cp.js

```js
function RPSGame() {
  this.human = new Human();
  this.computer = new Computer();
}
```

We now have a working RPS game created using constructors and prototypes. Make sure you run the new code and verify that it works as expected.

#### OO RPS with Classes

You've learned enough about constructors and classes and their similarities to attempt a version of OO RPS using classes. As with the conversion from factory functions to constructors and prototypes, the conversion of constructors and prototypes to classes is straightforward and mostly mechanical:

1. Write a class with the same name as the original constructor function.
2. Move the constructor function into the class and rename it as `constructor`.
3. Move all the prototype functions into the class.

Go ahead and try to convert the game yourself. When you've finished, compare your code with our solution:

Show Solution

------

### Code Reuse with Mixins

- There's a limitation with the inheritance pattern, which is that objects can only directly 'inherit' from one super-type object. In other words, an object can have only one prototype object. Mixins provide a way of addressing this limitation. The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix* that object *into* another object.

- **Single Inheritance**: 
  - Objects can only have one prototype object.
  - And classes can extend only one other class. 
  - Objects/class can inherit from chain of prototypes, but it's not considered direct, so therefore it's single inheritance where each object directly inherits only from one other object. 
- This restriction can be limiting and sometimes makes modeling some problem domains challenging. For instance, suppose we have a `Pet` class from which several other specific classes inherit. The inheritance relationship might look like this:

![module class hierarchy](https://dbdwvr6p7sskw.cloudfront.net/images/js120/object_hierarchy_with_mixins.png)

- Note that the `swim` method is in two classes: `Dog` and `Fish`. Assuming that they have the same implementation, we would like to provide that method in one place, perhaps in a class. However, where can we move it? 
- Some programming languages allow classes to inherit from multiple classes, a functionality known as **multiple inheritance**. JavaScript doesn't support multiple inheritance, so a class can only inherit from one class.

> To be clear, when we say that an object can only have one prototype or that a class can only inherit from one class, we don't mean that the object or class can't inherit from an entire chain of prototypes or classes. It's perfectly acceptable for a `Whale` class to inherit from a `Mammal` class, which in turn inherits from an `Animal` class, which again inherits from the built-in `Object` type. Some students see this as multiple inheritance, but it is not: each object or class inherits directly from a single thing, so it is single inheritance. The chain of prototypes or superclasses merely comes along for the ride.

#### Mix-ins

- **Mix-ins**:  pattern that adds methods and properties from one object to another. It's not  (inheritance) delegation with prototpes; the mix-in pattern copies the properties of one object to another with `Object.assign` or some similar technique. 
  - Mixins are useful for organizing similar methods that may be relevant to multiple classes.
  - More appropriate in a "has - a" relationship
    - use mix-in over defining a parent class. 
    - Use parent class if you want to extend the abilities of a parent class
    - Extending the abilities of a class coincides with an is-a relationship, not has-a.
  - A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all of the methods in the object.
  - The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix* that object *into* another object.
    - Aka: Move code shared by 2 (or more) classes into a mix-in object then `Object.assign` the `.prototype` object of all the classes which share the code, with the mix-in Object
  - Addresses the limitation that objects can only have one prototype object. 
  - Inheritance works best when there is an "is a" relationship between two classes. The inheriting class is a type of the superclass. The mix-in pattern works best when an object has a capability that another object needs.
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

How would we model this in JavaScript with inheritance? We start like this:

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

That was easy enough. However, there's a lot of duplication going on here: 4 of the various bird classes each have their own copy of the `swim` method, while 4 have their own copy of the `fly` method. In all likelihood, those 4 `fly` methods are identical, as are the 4 `swim` methods.

One way we can try to reduce the duplication is by using inheritance and a new class. Let's start with the `fly` method. We can define a `FlyingBird` type to handle this:

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

Great! Let's see what happens when we try to refactor the `swim` method:

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

We've hit a roadblock. The `Duck` and `Goose` classes represent both flying birds and swimming birds, but JavaScript only allows single inheritance. The lack of support for multiple inheritance means we can't just add a new class in and inherit from it.

Instead of using inheritance, we can use a **mix-in** instead. A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all of the methods in the object. It's the only real workaround for the lack of multiple inheritance short of duplication. Let's see what mix-ins look like:

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

In this code, we've created a `Swimmable` object that has a `swim` method. To mix it into our various swimming birds, we've used `Object.assign` to add the methods from `Swimmable` to the prototype objects of those classes. It's a bit tedious, but not too difficult, and it works well.

For consistency, we could even eliminate the inheritance aspect entirely:

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

#### Mix-ins vs. Inheritance

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

We suggest a balance of mix-in and classical inheritance pattern instead:

1. Inheritance works well when one object type is positively a sub-type of another object. In our example, it's natural for a penguin to also be a swimming bird. These types have an **is a** relationship: a penguin *is a* swimming bird. 
   - Whenever two object types have an "**is a**" relationship, constructor or class inheritance makes sense.
2. On the other hand, the ability to swim doesn't have that kind of relationship with storks. Swimming is a capability that penguins have. Similarly, flying is a capability that storks have. 
   - When you want to endow your objects with some capability, a mix-in may be the correct choice.

------

#### Summary

JavaScript objects can only inherit from one other object. This limitation makes it difficult to model certain domains using class or constructor-based inheritance. You can use mix-ins to share behavior between otherwise unrelated classes.

------

### Practice Problems

[reference](https://launchschool.com/lessons/d5964d17/assignments/e7850b07)

1. If we have a `Car` class and a `Truck` class, how can you use the `Speed` object as a mix-in to make them `goFast`? How can you check whether your `Car` or `Truck` can now go fast?

   ```js
   const Speed = {
     goFast() {
       // need .name because .constructor returns reference to the object 
       console.log(`I'm a ${this.constructor.name} and going super fast!`);
     }
   };
   
   class Car {
     goSlow() {
       console.log(`I'm safe and driving slow.`);
     }
   }
   
   class Truck {
     goVerySlow() {
       console.log(`I'm a heavy truck and like going very slow.`);
     }
   }
   ```

   Solution

   ```js
   Object.assign(Car.prototype, Speed);
   Object.assign(Truck.prototype, Speed);
    
   let blueTruck = new Truck();
   blueTruck.goFast(); // need an instance object to invoke method
   
   let smallCar = new Car();
   smallCar.goFast();
   ```

   ```js
   // Check whether an object responds to a specific method, can use the 'in' operator
   'goFast' in smallCar; // true
   'goFast' in bluTruck; // true
   ```

2. In the last question, we used a mix-in named `Speed` that contained a `goFast` method. We included the mix-in in the `Car` class and then called the `goFast` method from an instance of the `Car` class. You may have noticed that the string printed when we call `goFast` includes the name of the type of vehicle we are using. How is that done?

   Hint

   Since the `constructor` property references a function object, `constructor.name` references the `name` property on that object. Use MDN to lookup the definition of `Function.name`.

   Solution

   We used `this.constructor.name` to determine the name. It works like this:

   1. Within `goFast`, `this` refers to the object that invoked the method. In this case, we used `Car` and `Truck` objects.
   2. The `constructor` property of an object references the class that the object belongs to, i.e., `Car` or `Truck`.
   3. Constructors have a `name` property that merely contains the name of the class as a string, and that's what we output in `goFast`.

3. Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named `Auto` and `Motorcycle` to represent automobiles and motorcycles. After they noticed that the information and calculations performed was common to both vehicle types, they decided to break out the commonality into a separate class named `WheeledVehicle`. Their code, thus far, looks like this:

   ```js
   class WheeledVehicle {
     constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
       this.tires = tirePressure;
       this.fuelEfficiency = kmTravelledPerLiter;
       this.fuelCap = fuelCapInLiter;
     }
   
     tirePressure(tireIdx) {
       return this.tires[tireIdx];
     }
   
     inflateTire(tireIdx, pressure) {
       this.tires[tireIdx] = pressure;
     }
   
     range() {
       return this.fuelCap *  this.fuelEfficiency;
     }
   }
   
   class Auto extends WheeledVehicle {
     constructor() {
       // the array represents tire pressure for four tires
       super([30,30,32,32], 50, 25.0);
     }
   }
   
   class Motorcycle extends WheeledVehicle {
     constructor() {
       // array represents tire pressure for two tires
       super([20,20], 80, 8.0);
     }
   }
   ```

   Their boss now wants them to incorporate a new type of vehicle: a `Catamaran`.

   ```js
   class Catamaran {
     constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
       // catamaran specific logic
   
       this.propellerCount = propellerCount;
       this.hullCount = hullCount;
     }
   }
   ```

   This new class doesn't fit well with our existing class hierarchy: Catamarans don't have tires, and aren't wheeled vehicles. However, we still want to share the code for tracking fuel efficiency and range. Modify the class definitions and move code into a mix-in, as needed, to share code between the `Catamaran` and the wheeled vehicle classes.

   Solution

   ```js
   let mixInObject = {
     range () {
       return this.fuelCap * this.fuelEfficiency;
     }
   }
   
   
   class WheeledVehicle {
     constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
       this.tires = tirePressure;
       this.fuelEfficiency = kmTravelledPerLiter;
       this.fuelCap = fuelCapInLiter;
     }
   
     tirePressure(tireIdx) {
       return this.tires[tireIdx];
     }
   
     inflateTire(tireIdx, pressure) {
       this.tires[tireIdx] = pressure;
     }
   }
   
   Object.assign(WheeledVehicle.prototype, mixInObject);
   
   class Auto extends WheeledVehicle {
     constructor() {
       // the array represents tire pressure for four tires
       super([30,30,32,32], 50, 25.0);
     }
   }
   
   class Motorcycle extends WheeledVehicle {
     constructor() {
       // array represents tire pressure for two tires
       super([20,20], 80, 8.0);
     }
   }
   
   class Catamaran {
     constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
       // catamaran specific logic
   
       this.propellerCount = propellerCount;
       this.hullCount = hullCount;
       this.fuelEfficiency = kmTravelledPerLiter;
       this.fuelCap = fuelCapInLiter;
     }
   }
   
   Object.assign(Catamaran.prototype, Moveable);
   ```

   We've moved the code shared by `Catamaran` and `WheeledVehicles` to the `Moveable` mix-in. The definitions of `Auto` and `Motorcycle` remain unchanged since they both inherit from `WheeledVehicle`.

------

### Polymorphism

- Polymorphism refers to the ability of objects with different types to respond to the same method invocation. It can be implemented through inheritance by *method overriding*. It can also be implemented through **duck typing**; by ensuring that objects of different *types* use the same method *name* to perform different but related functions, those objects can be interacted with in a uniform way.

**Polymorphism** refers to the ability of objects with different types to respond in different ways to the same message (or method invocation). 

- That is, data of different types can respond to a common interface. 
- It's a crucial concept in OO programming that can lead to more maintainable code.

- When two or more object types have a method with the same name, we can invoke that method with any of those objects.
- **When we don't care what type of object is calling the method, we're using polymorphism**. 
- Often, polymorphism involves inheritance from a common superclass. However, inheritance isn't necessary as we'll see in this assignment.

For example, assume we have a method that expects an argument that has a `move` method. We can pass it any type of argument, provided it has a compatible `move` method. The object might represent a human, a cat, a jellyfish, or, conceivably, even a car or train. That is, it lets objects of different types respond to the same method invocation.

There are two chief ways to implement polymorphism.

1. Polymorphism through inheritance: 

   - Two different object types can respond to the same method call simply by **overriding** a method inherited from a superclass.

2. **Duck-typing**: Objects of different *types* use the same method *name* to perform different but related functions

   - when objects of different unrelated types both respond to the same method name. 

   - An informal way to classify or ascribe a type to objects- whereas Classes and constructors provide a formal way to do that. 

   - *If an object quacks like a duck, we can treat it as a duck*. 
   - We aren't concerned with the class or type of an object, but whether the object has a particular behavior. 
   - As long as the objects involved use the same method name and take the same number of arguments, we can treat the object as belonging to a specific category of objects. 

#### Polymorphism Through Inheritance

Examine the following code:

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

- An example of inheritance-based polymorphism in action is the JavaScript `toString` method. The `Object` type provides a default implementation of `toString()` that other types inherit. Other types can also override the method to return a customized string representation of the object. Without customization, `toString` returns the string `'[object Object]'` when called on an object. With customization, it can return something more meaningful and useful. For instance, arrays and dates are objects that have customized `toString` methods:

```terminal
> [1, 2, 3].toString()
'1,2,3'

> (new Date()).toString()
'Fri Jun 28 2019 20:50:13 GMT-0700 (Pacific Daylight Time)'
```

#### Polymorphism Through Duck Typing

**Duck typing** occurs when objects of different *unrelated* types both respond to the same method name. - With duck typing, we aren't concerned with the class or type of an object, but we do care whether an object has a particular behavior. *If an object quacks like a duck, then we can treat it as a duck.* Specifically, duck typing is a form of polymorphism. As long as the objects involved use the same method name and take the same number of arguments, we can treat the object as belonging to a specific category of objects.

- For example, an application may have a variety of elements that can respond to a mouse click by calling a method named something like `handleClick`. Those elements may be completely different -- for instance, a checkbox vs. a text input field -- but they're all *clickable* objects. Duck typing is an informal way to classify or ascribe a type to objects. Classes and constructors provide a more formal way to do that.

- In the next example, we define a `Wedding` class and several preparer classes. The example attempts to implement polymorphic behavior without using duck typing; it shows you how you **shouldn't** do it!

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

The problem with this code is that the `prepare` method has too many dependencies; it relies on specific classes and their names. It also needs to know which method it should call on each type of object, as well as the arguments that each method requires. If you change the way any of those methods are used or add a new type of preparer, you must also change `Wedding.prototype.prepare`. For instance, if we need to add a dressmaker, we must add another `else` clause. With only 4 preparers, `prepare` is already becoming long and messy.

The right way to implement this program is to use duck typing to implement polymorphism:

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

Though there is no inheritance in this example, each of the preparer-type classes provides a `prepare` method. We still have polymorphism since all of the objects respond to the `prepare` method call. If we later need to add another preparer type, we can create another class and implement the `prepare` method to perform the appropriate actions.

Note that merely having two different objects that have a method with the same name and compatible arguments doesn't mean that you have polymorphism. In theory, those methods might be used polymorphically, but that doesn't always make sense. Consider the following two classes:

```js
class Circle {
  draw() {}
}

class Blinds {
  draw() {}
}
```

These classes each have a method named `draw`, and the methods take no arguments. In the `Circle` class, `draw` presumably draws a circle on the screen. In the `Blinds` class, `draw` may cause the window blinds in an office building to be drawn (as in close or open). In theory, you could write some code that uses these methods polymorphically:

```js
[new Circle(), new Blinds()].forEach(obj => obj.draw());
```

However, it's unlikely that this would ever make sense in real code. Unless you're actually calling the method in a polymorphic manner, you don't have polymorphism. In practice, polymorphic methods are intentionally designed to be polymorphic; if there's no intention, you probably shouldn't use them polymorphically.

------

### Summary

- The *Objects Linking to Other Objects* (OLOO) pattern of object creation uses a prototype object, an initializer method, and the `Object.create` method to create objects with shared behavior. The initializer customizes the state for each object, and is usually named `init`.
- The combination of constructors and prototypes provides a way of mimicking classical inheritance with JavaScript. This lets us create **sub-type** objects, which can 'inherit' methods from a **super-type** object. This is one way of facilitating code re-use.
- There's a limitation with the inheritance pattern, which is that objects can only directly 'inherit' from one super-type object. In other words, an object can have only one prototype object. Mixins provide a way of addressing this limitation. The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix* that object *into* another object.
- Polymorphism refers to the ability of objects with different types to respond to the same method invocation. It can be implemented through inheritance by *method overriding*. It can also be implemented through **duck typing**; by ensuring that objects of different *types* use the same method *name* to perform different but related functions, those objects can be interacted with in a uniform way.

------

### Vocabulary

- **Method overriding**: when a class redefines a method that a superclass defines. 
- Object creation patterns
  - Constructor and Prototype
  - Pseudo-Classical
  - Factory Function
  - Objects Linking to Other Objects

------

### Quiz

[Question 1](https://launchschool.com/quizzes/5bd3d1f6/edit)

Without running the code, which of the following snippets will log `true`? Choose all that apply.

### Your Answer

```js
let Animal = {};
let Cat = Object.create(Animal);
let fluffy = Object.create(Cat);
console.log(fluffy instanceof Animal); // not an instance because there is no constructor
```

```js
function Animal() {}
function Cat() {}
Cat.prototype = new Animal();
let fluffy = new Cat();
console.log(fluffy instanceof Animal); // constructor property not restored, should log true
```

- Fluffy is an instance of Animal because  we assigned `Cat.prototype` to a new object that inherits from `Animal.prototype`, and the constructor property for `Animal.prototype` points to Animal. The constructor property wasn't restored here. 

- Every function has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself. 

```js
class Animal {}
class Cat extends Animal {}
let fluffy = new Cat();
console.log(fluffy instanceof Animal);
```

- we use class syntax to establish the prototype chain. Since `fluffy` is a `Cat`, and since `Cat` extends `Animal`, `fluffy` is an instance of `Animal`. 

```js
function Animal() {}
function Cat() {}
Cat.prototype = new Animal();
function makeCat() {
  return {};
}

let fluffy = makeCat();
console.log(fluffy instanceof Animal); // false
```

```js
class Animal {}
class Cat extends Animal {}
let fluffy = new Cat();
console.log(fluffy instanceof Animal); // false, fluffy is an instance of Cat
```

Q2 Select all of the following statements about prototypal inheritance that are true:

The object that you inherit from is the prototype of another object.

Question 5

- `Critter` is a super-type of `Snake` and `Rattler`.

```js
class Critter {}
class Snake extends Critter {}
class Rattler extends Snake {}
```

Question 6

- Inheritance works best when there is an "is a" relationship between two classes. The inheriting class is a type of the superclass. The mix-in pattern works best when an object has a capability that another object needs.

- The mix-in pattern does not use delegation.

Question  8 

```js
function Child(name, school) {
  Person.call(this, name);
  this.school = school;
}

function Person(name) {
  this.name = name;
  this.school = undefined;
}

Person.prototype.speak = function() { // inside constructor prototype object
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

Question 9 

```js
function Person(name) {
  this.name = name;
  this.school = undefined;
}

Person.prototype.speak = function() {
  return `Hello, my name is ${this.name}.`;
};

// your code from the previous question.

// more missing code

Child.prototype.learn = function() {
  return "I'm going to school!";
};

let child = new Child("Suzy", "PS 33");
console.log(child instanceof Child);                               // true
console.log(child instanceof Person);                              // true
console.log(Object.getPrototypeOf(child) === Child.prototype);     // true
console.log(Object.getPrototypeOf(child).constructor === Child);   // true
console.log(child.school === "PS 33");                             // true
console.log(child.learn() === "I'm going to school!");             // true
console.log(child.speak() === "Hello, my name is Suzy.");          // true
console.log();

let person = new Person("Pete");
console.log(person instanceof Child === false);                    // true
console.log(person instanceof Person);                             // true
console.log(Object.getPrototypeOf(person) === Person.prototype);   // true
console.log(Object.getPrototypeOf(person).constructor === Person); // true
console.log(person.school === undefined);                          // true
console.log(person.speak() === "Hello, my name is Pete.");         // true
console.log(person.learn === undefined);                           // true
```

```js
// test.js
class a {
  constructor() {
    console.log('hello');
  }
}

class b extends a {
  constructor() {
    super();
  }
}

let c = new b();
console.log(c instanceof a); // true
```

```terminal
# output
hello
true
```

### Your Answer

**B**

Copy Code

```js
Child.prototype = Object.create(Person.prototype);
Child.prototype["constructor"] = Child;
```

### Discussion

**Incorrect:**

**A**: `Object.assign` with a single argument merely returns a reference to that argument. Thus, this code sets the `Child` prototype to the same object used as the `Person` prototype. That causes `person instanceof Child` to return `true` since both the `Child` prototype is the same object as the `Person` prototype.

```js
Child.prototype = Object.assign(Person.prototype);
Child.prototype.constructor = Child;
```

**C**: Prototypal inheritance requires the `Child` prototype to be a reference to the `Person` prototype, not the `Person` constructor.

```js
Child.prototype = Object.create(Person); // prototype object shouldn't be a function or constructor
Child.prototype.constructor = Child;
```

**D**: This code almost works, but it fails to reset the constructor for the `Child` prototype. That causes `Object.getPrototypeOf(child).constructor` to return `Person` instead of `Child`

```js
Child.prototype = Object.create(Person.prototype);
```

------

### Notes

- `Object.assign` with a single argument merely returns a reference to that argument. 
- Prototypal inheritance requires the `Child` prototype to be a reference to the `Person` prototype, not the `Person` constructor.
- The mix-in pattern does not use delegation, because it is not inheritance. 

- **Inheritance** establishes a prototype chain that JavaScript can use to delegate method calls and property accesses
- : Inheritance works best when there is an "is a" relationship between two classes. The inheriting class is a type of the superclass. The mix-in pattern works best when an object has a capability that another object needs.

# Lesson 5

## OO Tic Tac Toe Overview

In this and the next few assignments, we'll build a Tic Tac Toe game similar to the one we built in a prior course. This game is more complicated than Rock, Paper, Scissors since we must deal with the notion of a *game state* that represents the current state of the board. The RPS game doesn't have a game state, only choices.

We'll take an object-oriented approach to design our game, so we'll employ the steps we learned earlier:

1. Write a textual description of the problem or exercise.
2. Extract the significant nouns and verbs from the description.
3. Organize and associate the verbs with the nouns.

### Description

Let's begin by writing a textual description of the game.

- Tic Tac Toe is a 2-player board game.
- The board is a 3x3 grid.
- Players take turns marking a square with a marker that identifies the player.
- Traditionally, the player to go first uses the marker `X` to mark her squares, and the player to go second uses the marker `O`.
- The first player to mark 3 squares in a row with her marker wins the game.
- A row can be a horizontal row, a vertical column, or either of the two diagonals (top-left to bottom-right and top-right to bottom-left).
- There is one human player and one computer player.
- The human player always moves (places a marker) first in the initial version of our game; you can change that later.

This description provides a little more detail than the one we used in the earlier course, but it's effectively the same.

### Identify the Nouns and Verbs

On the surface, Tic Tac Toe is a straightforward and simple game. There aren't many nouns and verbs:

|           |                                                              |
| :-------- | :----------------------------------------------------------- |
| **Nouns** | game, board, square, grid, marker, row, player, human, computer |
| **Verbs** | play, mark, move, place                                      |

Some of these words aren't significant to the game design so we won't discuss them further. For instance, *grid* is a synonym for *board*, so we probably don't need to concern ourselves with grids. Similarly, *move* and *place* are synonyms for *mark*.

### Organize

Let's organize our words a bit by writing down the significant nouns and the verbs in a way that shows some of the most likely relationships between words:

- Game (n)
- Board (n)
- Row (n)
- Square (n)
- Marker (n)
- Player (n)
  - Mark (v)
  - Play (v)
  - Human (n)
  - Computer (n)

None of our verbs appear to apply to the *game*, *board* or *square*. However, that doesn't matter; remember, we had a similar issue when we started working on the Rock, Paper, Scissors game.

Note that we wrote *Human* and *Computer* beneath *Player* to indicate that they are subclasses of *Player*. A similar situation may apply to *Row*, *Square*, and *Marker*, but that isn't entirely clear at this point.

This list isn't necessarily final. It's entirely possible that we'll add additional nouns or verbs as we go along to fill in some gaps. It's also possible that some of our words may end up not being significant. Our primary purpose in writing this list is to give us a starting point for our program.

Our list of nouns and verbs provides a general list of the types of objects we'll need (the nouns), and the behaviors that each object should implement (the verbs).

### Code

Now that we have a general idea of the objects we'll need and their behaviors, it's time to begin coding our solution. We'll use JavaScript classes in our program, though you can also use the constructor/prototype approach, factory functions, and so on.

------

## OO Tic Tac Toe with Classes - Part 1

As we've seen, there are different ways that one can create objects in JavaScript. In this walkthrough, we'll use ES6 classes for the simple OO model it provides.

### Scaffolding

We've already identified the nouns and verbs we expect to need in our program. Let's put that to work by building some skeletal classes; scaffolding, if you will. We'll need a `constructor` method in each class, and we should also think about the possible states for each class's objects. We won't go into any great detail yet, and won't make any significant design decisions just yet.

oo_ttt.js

```js
class Board {
  constructor() {
    //STUB - we'll talk about stubs a bit later
    // We need a way to model the 3x3 grid. Perhaps "squares"?
    // What data structure should we use? An Array? An Object? Something else?
    // What should the data structure store? Strings? Numbers? Square objects?
  }
}

class Square {
  constructor() {
    //STUB
    // We need some way to keep track of this square's marker.
  }
}

class Row {
  constructor() {
    //STUB
    // We need some way to identify a row of 3 squares
  }
}

class Marker {
  constructor() {
    //STUB
    // A marker is something that represents a player's "piece" on the board.
  }
}

class Player {
  constructor() {
    //STUB
    // maybe a "marker" to keep track of this player's symbol (i.e., 'X' or 'O')
  }

  mark() {
    //STUB
    // We need a way to mark the board with this player's marker.
    // How do we access the board?
  }

  play() {
    //STUB
    // We need a way for each player to play the game.
    // Do we need access to the board?
  }
}

class Human extends Player {
  constructor() {
    //STUB
  }
}

class Computer extends Player {
  constructor() {
    //STUB
  }
}

class TTTGame {
  constructor() {
    //STUB
    // Need a board and two players
  }

  play() {
    //STUB
    // orchestrate game play
  }
}

let game = new TTTGame();
game.play();
```

Some questions remain about where the various responsibilities lie and how to organize those behaviors. There's even a question as to whether we need all of the classes shown above. For example, do we need the `Square` and `Player` classes? How about the `Human` and `Computer` classes that extend the `Player` class? We don't have clear answers for any of these questions. We need to explore the problem and get a better feel for the code. Another outstanding question is whether we need additional classes.

Note that we've changed the name of proposed `Game` class to `TTTGame`. We don't have to do that, but this class will be our **orchestration engine**: a class that controls the flow of the application or some part of the application. It's common practice to make the orchestration engine the last class in a file, and to give it a name that is likely to be unique.

The last two lines kick off the game by creating a `TTTGame` object, then calling the `play` method.

That's a good start on our program. There's no real functionality yet, but this code should run without error, even though it does nothing useful.

We'll explain the `//STUB` comments shortly. `

### Orchestrating the Game

In this section, we'll sketch out the behavior for the `play` method in the `TTTGame` class.

At this point, you might want to start thinking about the algorithm that `play` should use. That suggests that maybe we need a formal problem-solving approach like the PEDAC approach you met in the previous course. Here, though, we'll be a little less formal and write a **spike**.

Here's the spike that we'll use for the `play` method:

oo_ttt.js

```js
class TTTGame {
  // omitted code

  play() {
    //SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.displayBoard();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    //STUB
    // show a welcome message
  }

  displayGoodbyeMessage() {
    //STUB
    // show a goodbye message
  }

  displayResults() {
    //STUB
    // show the results of this game (win, lose, tie)
  }

  displayBoard() {
    //STUB
    // display the board, including its current state
  }

  firstPlayerMoves() {
    //STUB
    // the first player makes a move
  }

  secondPlayerMoves() {
    //STUB
    // the second player makes a move
  }

  gameOver() {
    //STUB
    return false;
  }
}
```

For now, we'll assume that all these methods belong to the `TTTGame` class, so we call them with `this` to provide context.

### Spike / Stub

- **Spike**: some exploratory code to help you begin sketching out your program's structure and design
  - The idea behind a spike is to provide a general outline of how the program flows
  - Spikes take a high-level view, focusing on the general logic of the program; they don't concern ourselves with details like what it means for the game to be over.
  - Spikes, in general, look similar to pseudocode in their general outline, but they more closely resemble the final code. 
  - In fact, it is code, and some of it may not change.
- **Stub**: empty methods that serve as placeholders for functions and methods to be written or removed later. 
  - Most stubs are either empty or return a constant value. 
  - It is enough to let us test code without having to build the entire program first. 
  - It's common to insert a comment that identifies the method as a stub or spike, as we did above with  `STUB` and `SPIKE`.
  - Such comments help the developer keep track of what remains to be done. For brevity, we won't show these comments in the rest of our code.

Spikes and stubs are more common in OO code than procedural code since OO code doesn't have that top-to-bottom flow that characterizes procedural code.

### Initial Test

Let's make sure that the program runs. We don't expect it to do much; however, it should start and stop without displaying any messages. Let's try it:

```terminal
$ node ttt.js
```

Nothing. Really, nothing at all. If you've been following along carefully, the program doesn't display any output, and it doesn't stop. That's a bug. To terminate the game, press Control-C.

Note that the `gameOver` stub always returns `false`; thus, the program never executes either `break` statement in the `while` loop. Instead, it enters an infinite loop. For now, we can work around that by adding a `break` statement to the end of the loop:

```js
class TTTGame {
  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.displayBoard();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;
      break; // <= execute loop only once for now
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }
}
```

The loop should now exit after one iteration, which is enough for us to test that the code does what we expect:

```terminal
$ node ttt.js
$
```

The program doesn't display anything yet, which is good -- it didn't throw an error. Furthermore, it stops running automatically. That's all that we expect of it at this point.

### Welcome and Goodbye Messages

Let's return to the `play` spike. Two of the easiest steps to implement are to display the welcome and goodbye messages. This code is *low-hanging fruit*, meaning we can implement it quickly then focus our attention on the more complex parts of the program. Here's our code:

oo_ttt.js

```js
class TTTGame {
  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }
}
```

We can see the results immediately:

```terminal
$ node ttt.js
Welcome to Tic Tac Toe!
Thanks for playing Tic Tac Toe! Goodbye!
```

Ta-da!

### What's Next?

In the next assignment, we'll implement code to display the board and its current state.

------

## OO Tic Tac Toe with Classes - Part 2

Now that we've completed the easy parts, it's time to tackle the harder stuff. In this assignment, we'll implement the code needed to display the board and its current state (the player's positions). Here's the state of our code thus far:

### Display the Board

To begin, we must first decide how we want to depict the board. That's not hard: the Tic Tac Toe board is a 3x3 grid of squares, and players place their markers in the central part of each square. It's called *ASCII art*, but you don't have to be an artist to come up with something like this:

```plaintext
     |     |
  O  |     |  O
     |     |
-----+-----+-----
     |     |
     |  X  |
     |     |
-----+-----+-----
     |     |
  X  |     |
     |     |
```

We show the game board in an in-progress state after each player has made two moves.

We can readily convert that diagram into a series of `console.log` invocations:

```js
class TTTGame {
  displayBoard() {
    console.log("");
    console.log("     |     |     ");
    console.log("  O  |     |  O  ");
    console.log("     |     |     ");
    console.log("-----+-----+-----");
    console.log("     |     |     ");
    console.log("     |  X  |     ");
    console.log("     |     |     ");
    console.log("-----+-----+-----");
    console.log("     |     |     ");
    console.log("  X  |     |     ");
    console.log("     |     |     ");
    console.log("");
  }
}
```

Let's see what happens when we run this code:

```terminal
$ node ttt.jsWelcome to Tic Tac Toe!     |     |  O  |     |  O     |     |-----+-----+-----     |     |     |  X  |     |     |-----+-----+-----     |     |  X  |     |     |     |Thanks for playing Tic Tac Toe! Goodbye!
```

That's what we expected to see.

We have some extraneous spaces at the end of each line that we don't need; trailing spaces are rarely a problem, but they can be a nuisance in some circumstances. It's a common practice to remove trailing spaces when they aren't needed, so let's delete them:

```js
class TTTGame {
  displayBoard() {
    console.log("");
    console.log("     |     |");
    console.log("  O  |     |  O");
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log("     |  X  |");
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log("  X  |     |");
    console.log("     |     |");
    console.log("");
  }
}
```

Test your code one more time to make sure it still works.

### Getting Started with the Board Class

Wait a minute. Why isn't `displayBoard` in the `Board` class? Indeed, it should be; the board object should know everything it needs to keep track of its state and to render itself.

Before we move it, though, `TTTGame` needs a board object that it can use during the game. Let's create it in the `TTTGame` constructor.

```js
class TTTGame {
  constructor() {
    this.board = new Board();
  }
}
```

Now we can move `displayBoard` to the `Board` class, and use the `board` property (`this.board`) of the `TTTGame` object to access it:

```js
class Board {
  display() {
    console.log("");
    console.log("     |     |");
    console.log("  O  |     |  O");
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log("     |  X  |");
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log("  X  |     |");
    console.log("     |     |");
    console.log("");
  }
}

class TTTGame {
  play() {
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.firstPlayerMoves();
      if (this.gameOver()) break;

      this.secondPlayerMoves();
      if (this.gameOver()) break;
      break; // <= execute loop only once for now
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  // Delete this method
  // displayBoard() {
  //   omitted code
  // }
}
```

Note that we changed the name of the method to `display` rather than `displayBoard`. Since we'll always use a board object to invoke the method, using the word "Board" in the name is redundant. It's not like `this.board.display` might decide to display a picture of the *Mona Lisa* instead.

Test the code and verify that it displays the board correctly. Unfortunately, it always displays the initial board; there's no way yet for it to display the game in progress,

### The Board's State

The primary responsibility of a board object is to maintain and represent the state of the board, so it makes sense to initialize that state in the `constructor` method for the `Board` class. First, though, how should we represent the board?

Let's first assume that the squares on the board are numbered from 1 through 9, like so:

```plaintext
 1 | 2 | 3---+---+--- 4 | 5 | 6---+---+--- 7 | 8 | 9
```

An obvious choice is to represent the board as a 3x3 matrix. In JavaScript, we can represent a matrix as an array whose elements are nested subarrays. That means we can implement the board as a 3 element array of subarrays, each of which contains 3 squares. However, that may be messier and more complicated than you might expect. For starters:

- If we ask the user to choose a square by entering a number from 1-9, we have to map that number to a specific row and column number in the matrix.
- If we want to avoid the mapping, we need to ask the player to enter a row and column number instead of a single number. The user will soon go find something better to do with his time.
- Nested arrays are messy in general. You must access everything with two indices; keeping the indices straight can be very confusing.

Let's give that choice a pass. (You can try it for fun later on if you're feeling confident or a need to be humbled.)

Another approach we might try would represent the board as an array of 9 square objects. However, array indices start at 0, and our square keys start at 1. That leads to several tradeoffs we might have to make:

- Use keys 0-8 instead of 1-9 so that the keys and the array indices have a simple correspondence. However, that may confuse users of your game; most people are unaccustomed to thinking of item 0 as the first item in a list.
- Use 10 elements in the array indexed 0-9, but don't use the element at index 0. That's a bit awkward, though, and may cause issues with iteration methods like `forEach` and `map`. It may also confuse programmers looking at your code.
- Translate back and forth between square keys and array indices, adding or subtracting 1 when needed. That, too, can be confusing, and it complicates your logic noticeably.

Hmm. Neither a matrix nor an array seems like a great choice. What can we do instead? One solution that seems a bit strange at first is to create an object that has 9 properties with the names `"1"`, `"2"`, `"3"`, and so on:

```js
class Board {  constructor() {    this.squares = {      "1": "X",      "2": " ",      "3": " ",      "4": " ",      "5": "O",      "6": " ",      "7": " ",      "8": " ",      "9": " ",    };  }}
```

The value for each property is the marker associated with that square: `"X"` for player 1, `"O"` for player 2, and `" "` (space) for unmarked squares. With this structure, we can access the marker for the square with key `"5"` as `this.squares["5"]`. The one significant tradeoff is that we must remember that we're using an ordinary object, not an array. It may still confuse other programmers a bit, but any errors that arise should be easier to debug.

Turning our attention back to the `display` method, it looks like we can use `this.squares` directly to retrieve the marker for each square:

```js
class Board {  display() {    console.log("");    console.log("     |     |");    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);    console.log("     |     |");    console.log("-----+-----+-----");    console.log("     |     |");    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);    console.log("     |     |");    console.log("-----+-----+-----");    console.log("     |     |");    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);    console.log("     |     |");    console.log("");  }}
```

Note that we're using template literals on the lines that access `this.squares`, so we need to use backticks instead of quotes.

The rest of the code is unchanged thus far, but the program now initializes and displays the board correctly.

### The Square Class

At this time, the `Board` class uses a simple string to represent the state of each of the 9 squares. Our scaffolding code suggests that we might want to use a `Square` class to represent squares instead. What are the states and behaviors we might need in a `Square` class?

- State: The current marker: either `X`, `O`, or `" "` (a space).
- Behavior: create a new square
- Behavior: retrieve the current marker from the square
- Behavior: test whether the square is unmarked

That's not a lot, and it should be possible to write our `Board` class without a `Square` class. However, there are some pros and cons involved, as well:

- Pros
  - It makes the `Square` class available for possible reuse.
  - Using `Square` objects instead of strings shows our intent better
- Cons
  - More code
  - More indirection

It seems that we really could go either way, without much benefit or disadvantage to either approach. Since we're learning about OOP, though, let's go ahead and use a `Square` class:

```js
class Square {  constructor(marker) {    this.marker = marker;  }}class Board {  constructor() {    this.squares = {      "1": new Square(" "),      "2": new Square(" "),      "3": new Square(" "),      "4": new Square(" "),      "5": new Square(" "),      "6": new Square(" "),      "7": new Square(" "),      "8": new Square(" "),      "9": new Square(" "),    };  }}
```

Note that we've moved the `Square` class from our scaffolding code to the top of the file to ensure that `Board`'s `constructor` method knows about the `Square` class. If we left the `Square` class where it was, the calls to `new Square` would raise an error. There are other ways to ensure that `Board` recognizes the `Square` class, but in most cases, this technique is easy to use and understand.

- Are classes not hoised?? 

For now, squares only need to keep track of the marker that they contain. We won't need it in our game, but for debugging purposes, we'll let the `Square` constructor set the marker's value explicitly when it creates a new square. That lets us set up and test custom board scenarios.

We can take advantage of the fact that new squares are almost always unused squares. That lets us invokes the constructor without arguments to create unused squares:

```js
class Square {
  constructor(marker = " ") {
    this.marker = marker;
  }
}

class Board {
  constructor() {
    this.squares = {
      "1": new Square(),
      "2": new Square(),
      "3": new Square("X"), // testing -- remove "X" later
      "4": new Square(),
      "5": new Square("O"), // testing -- remove "O" later
      "6": new Square(),
      "7": new Square("X"), // testing -- remove "X" later
      "8": new Square(),
      "9": new Square(),
    };
  }
}
```

Let's see what happens when we try to run this code:

```terminal
$ node ttt.js
Welcome to Tic Tac Toe!

     |     |
  [object Object]  |  [object Object]  |  [object Object]
     |     |
-----+-----+-----
     |     |
  [object Object]  |  [object Object]  |  [object Object]
     |     |
-----+-----+-----
     |     |
  [object Object]  |  [object Object]  |  [object Object]
     |     |

Thanks for playing Tic Tac Toe! Goodbye!
```

Oops! That's not what we want. Can you see where the problem lies? Try to determine what's wrong before proceeding. You don't need to fix it; identify it for now, and we'll fix it in a bit.

Show Answer

The problem here is that `new Square` returns a `Square` object instead of a string. Thus, `this.board` is a collection of `Square` objects, not a collection of strings. Moreover, `this.squares[key]` returns a square object, not a string.

How can we fix this problem? If you want to try it on your own, take a look at the [Object.prototype.toString documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString). Whether or not you try it on your own, be sure to check our solution before you continue.

Show Solution

At first glance, you might think that the `display` method can use the square's `marker` property directly. That would work, and it's perfectly acceptable for small classes and classes that you have no control over. The `Board` class is relatively small, so we could reasonably take that approach.

However, <u>you shouldn't generally access properties directly unless you have no choice</u>, as with the built-in types and classes from 3rd party libraries. Since we can modify the `Square` class in this application, let's try to use a more OO approach.

Perhaps we can add a `getMarker` method to the `Square` class that returns the square's marker.

```js
// Don't add this to your code!class Square {  getMarker() {    return this.marker;  }}
```

That's simple enough, and it's safer than accessing the square's marker directly from the `Board` class. However, we'll need to call `getMarker` from the `display` method instead of just accessing the square:

```js
console.log(`  ${this.squares["1"].getMarker()}  |  ${this.squares["2"].getMarker()}  |  ${this.squares["3"]}.getMarker()`);
```

That's a bit tedious and ugly.

#### Object.prototype.toString

- Since JavaScript uses `toString` to implicitly convert something to string representation, we can override this method in our class (create a custom `toString`  method). So when the squares value objects are logged to console in the `display()` method, it will be a string instead of `[object object]`. 

- A cleaner solution leverages the `Object.prototype.toString` method. 
- Since every object normally inherits from `Object.prototype` either directly or indirectly, every object, by default, has access to this method. 
- JavaScript uses `toString` when it must implicitly convert something to a string representation. However, it returns the unhelpful `[object Object]` when passed an object. 
- Fortunately, you can **override** `toString` in your classes; that is, you can define a `toString` method in your class that JavaScript should call instead. In the case of a square object, we want to return the associated marker as a string: `"X"`, `"O"`, or `" "`. Here's our code:

```js
class Square {  toString() {    return this.marker;  }}
```

That's identical to the `getMarker` method shown above, but we don't need to call it explicitly. Though we haven't changed the `display` method, the board should now display correctly.

### Refactor: Eliminate Magic Constants

For readability, let's create a symbolic constant for the "magic constant" we're using to represent unused squares (a space character in this case). We'll also add symbolic constants for the `X` and `O` markers that the human and computer players will use:

```js
class Square {  static UNUSED_SQUARE = " ";  static HUMAN_MARKER = "X";  static COMPUTER_MARKER = "O";  constructor(marker = Square.UNUSED_SQUARE) {    this.marker = marker;  }}
```

The `static` keyword defines a property that belongs to the class, not the individual objects created from the class. It's useful for defining **class constants** like those provided in other languages. Note that we must qualify the constant name with the class name, e.g., `Square.UNUSED_SQUARE`, even if we reference it from somewhere in the class.

> As of this writing, the `static` keyword for defining class-level non-method properties is still a work in progress: it hasn't been finalized in the ECMAScript standard. Most recent browsers and Node support it, but you may have some problems with older versions, and it is still subject to change. If you prefer to avoid it, you can rewrite the above code like this:

```js
class Square {  constructor(marker = Square.UNUSED_SQUARE) {    this.marker = marker;  }}Square.UNUSED_SQUARE = " "; // outside of class bracketsSquare.HUMAN_MARKER = "X";Square.COMPUTER_MARKER = "O";
```

We don't need the `HUMAN_MARKER` and `COMPUTER_MARKER` constants yet, but we're anticipating that we will. One significant advantage of setting up constants for these markers is that you can easily replace them with something else, such as ❌ and 🔵. You may need to install some Node packages to handle Unicode output with `npm` if you decide to do that, though.

>  Note that the `Square` class probably isn't an ideal location for `HUMAN_MARKER` and `COMPUTER_MARKER`. First, these constants couple the `Square` class to the idea of a human and a computer marker. That could be useful in many games, but a more general `Square` class may not care about humans and computers, especially if there are more than 2 players in the game. Secondly, they're not used by the `Square` class at all; we won't use them in our future code either.
>
>  Leaving the constants in place has benefits as well. For instance, it's easy to see what values are valid markers for the squares.
>
>  Ideally, `HUMAN_MARKER` belongs in the `Human` class, and `COMPUTER_MARKER` belongs in the `Computer` class. Another approach would involve the `Marker` class, but the `Square` class, so far, seems too simple to bother with a separate `Marker` class. That may change, but for now, we'll avoid the extra complexity and leave them here.

### Refactor: DRY Board Initialization

The initialization of `this.squares` in the board object is repetitive; let's DRY up that code (**D**on't **R**epeat **Y**ourself) with a loop:

```js
class Board {  constructor() {    this.squares = {};    for (let counter = 1; counter <= 9; ++counter) {      this.squares[String(counter)] = new Square(); // String() unecessary    }  }}
```

Note that using `String()` on line 5 isn't strictly necessary. JavaScript always treats object keys as strings.

### What's Next?

In the next assignment, we'll create human and computer players, then implement the code that lets them each make a move.

------

## OO Tic Tac Toe with Classes - Part 3

Currently, our game can display the playing board together with the current game state, but little else. It's time to create our players - a human and a computer. We'll also implement the code needed to let both players make one move. We'll implement turn taking and valid-move detection in the next assignment. Here's the state of our code thus far:

View Code

### Creating the Players

For now, let's assume that the human player always plays first and that the computer plays second. We can update `TTTGame` to make this distinction clearer:

```js
class TTTGame {  play() {    this.displayWelcomeMessage();    while (true) {      this.board.display();      this.humanMoves();      if (this.gameOver()) break;      this.computerMoves();      if (this.gameOver()) break;      break; // <= execute loop only once for now    }    this.displayResults();    this.displayGoodbyeMessage();  }  humanMoves() { // was firstPlayerMoves    console.log("human moves");  }  computerMoves() { // was secondPlayerMoves    console.log("computer moves");  }}
```

```terminal
$ node ttt.jsWelcome to Tic Tac Toe!     |     |     |     |     |     |-----+-----+-----     |     |     |     |     |     |-----+-----+-----     |     |     |     |     |     |human movescomputer movesThanks for playing Tic Tac Toe! Goodbye!
```

Since the human and computer are both players in this game, we should create a couple of `Player` objects (a `Human` and a `Computer`) when we start the game:

```js
class Human extends Player {  constructor() {    super();  }}class Computer extends Player {  constructor() {    super();  }}class TTTGame {  constructor() {    this.board = new Board();    this.human = new Human();    this.computer = new Computer();  }}
```

Remember: the `Human` and `Computer` classes extend the `Player` class.

### Get The Human's Move

Let's write some code that lets the human player pick a square, a value between 1 and 9, inclusive. The code displays a prompt, reads and validates the human's input, and then marks the selected square. If the human enters an invalid selection, we'll ask her to try again. We can use our old friend, `readline-sync`, to prompt her and read her choice:

```js
let readline = require("readline-sync"); // first line in ttt.js

class TTTGame {
  humanMoves() {
    let choice;

    while (true) {
      choice = readline.question("Choose a square between 1 and 9: ");

      let integerValue = parseInt(choice, 10);
      if (integerValue >= 1 && integerValue <= 9) {
        break;
      }

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    // mark the selected square with the human's marker
  }
}
```

This code is relatively straightforward. It uses a loop to solicit the human's choice of squares, then validates it with `parseInt`. If the input is valid, the loop ends. If it isn't valid, the loop issues an error message and asks her to try again.

By the way: if you think our validation is a bit too forgiving, it is. Since the code uses `parseInt` to validate input, it can accept invalid numbers such as `4.32`, `6b`, and `3 + 4`. We probably should reject those answers. We'll fix that later without even trying.

>  The two argument form of `parseInt` lets you specify the **radix** or **base** that you want to use when parsing a numeric string. For instance, the decimal numbers that most people work with every day use base-10 or a radix of 10. Such numbers are comprised of one or more digits from the 10-digit range 0 through 9. In a similar vein, computers use binary numbers: base-2 or radix 2, and the digits used are 0 and 1. You can provide the base or radix as the 2nd argument to `parseInt`.
>
>  Over the years, `parseInt` has seen several changes in its behavior depending on whether it receives a radix argument and the value of the string argument. Worse yet, the behavior is implementation-dependent, which means you might get different results in different engines:

```js
// possible result from engine 1parseInt('077');   // => 77// possible result from engine 2parseInt('077');   // => 63
```

> Both results are correct! The difference is that engine 2 interprets a number that begins with `0` as an octal number (radix 8), while engine 1 interprets it as a decimal number (radix 10). The octal value `077` is equivalent to the decimal value `63`.
>
> Most contemporary JavaScript engines work like engine 1, but there may be some that work like engine 2. To avoid problems, always specify the radix argument.
>
> See [MDN's parseInt documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt) for more information on how `parseInt` works, especially with respect to the radix.

### Placing the Player's Move on the Board

The `humanMoves` method is unfinished; we need to somehow mark the selected square with the human's marker (`X`). There are two main approaches that we can use depending on how we want to divide class responsibilities. One approach has the human player accept that responsibility:

```js
this.human.mark(choice, Square.HUMAN_MARKER);
```

The other approach is to have the board accept the responsibility:

```js
this.board.markSquareAt(choice, Square.HUMAN_MARKER);
```

How to choose? Either should work, but there's a minor problem with the first approach that makes it more difficult to implement -- `Player` objects don't have a board. That means that we would have to pass in a board object each time we need to mark a square:

```js
this.human.mark(choice, Square.HUMAN_MARKER, this.board);
```

That seems a bit awkward. Furthermore, we still need a `markSquareAt` method in `Board` that we can call from `mark`.

The second approach is more direct since `TTTGame` already has a `Board` object that we can use to call the method. We'll take this approach:

```js
class Square {  setMarker(marker) {    this.marker = marker;  }}class Board {  markSquareAt(key, marker) {    this.squares[key].setMarker(marker);  }}class TTTGame {  humanMoves() {    // omitted code    this.board.markSquareAt(choice, Square.HUMAN_MARKER);  }}
```

### Defining a Player's Marker

In the `humanMoves` method, we pass the human player's marker (`X`) to the board object. You probably realize that somewhere else in this program, we also need to pass the computer's marker (`O`) to `markSquareAt`. With that in mind, it might be wise to let each player object define its marker. Let's try it:

```js
class Player {  constructor(marker) {    this.marker = marker;  }  getMarker() {    return this.marker;  }  // Delete this code - `Board` provides `markSquareAt` instead  // mark() {  //   ...  // }}class Human extends Player {  constructor() {    super(Square.HUMAN_MARKER);  }}class Computer extends Player {  constructor() {    super(Square.COMPUTER_MARKER);  }}class TTTGame {  humanMoves() {    // omitted code    this.board.markSquareAt(choice, this.human.getMarker());  }}
```

### Testing the Human Player's Moves

Let's test the program and make sure the board updates as expected. We'll add an extra call to `this.board.display` so we can see the results of the human's move.

```js
class TTTGame {  play() {    this.displayWelcomeMessage();    while (true) {      this.board.display();      this.humanMoves();      this.board.display(); // so we can see human's move      if (this.gameOver()) break;      this.computerMoves();      if (this.gameOver()) break;    }    this.displayResults();    this.displayGoodbyeMessage();  }}
```

```terminal
$ node ttt.js
Welcome to Tic Tac Toe!

     |     |
     |     |  X
     |     |
-----+-----+-----
     |     |
     |     |
     |     |
-----+-----+-----
     |     |
  O  |     |
     |     |

Choose a square between 1 and 9: 2

     |     |
     |  X  |  X
     |     |
-----+-----+-----
     |     |
     |     |
     |     |
-----+-----+-----
     |     |
  O  |     |
     |     |

computer moves
Thanks for playing Tic Tac Toe! Goodbye!
```

Looks good! Try some other tests on your own. Be sure to choose each possible square, and to pay attention to the buggy behavior that occurs when you enter invalid input or choose a square that already has a marker.

### The Computer's Move

We've got a pretty dumb computer, so we won't strain its processors by making it think about complicated stuff like strategy. Instead, it will pick squares at random; that should be an effective strategy. Here's our code:

```js
class TTTGame {  play() {    this.displayWelcomeMessage();    while (true) {      this.board.display();      this.humanMoves();      this.board.display(); // so we can see the human's move      if (this.gameOver()) break;      this.computerMoves();      this.board.display(); // so we can see the computer's move      if (this.gameOver()) break;      break; // <= execute loop only once for now    }    this.displayResults();    this.displayGoodbyeMessage();  }  computerMoves() {    let choice = Math.floor((9 * Math.random()) + 1);    this.board.markSquareAt(choice, this.computer.getMarker());  }}
```

Not much to it other than the expression that generates a random integer between 1 and 9, inclusive. The line that marks the square with the computer's marker is almost identical to the corresponding line in `humanMoves`. We also added a 3rd call to `this.board.display` so we can see the board after the computer plays.

Go ahead and "play" the game several times. Make sure you play it often enough to see the bug caused by choosing a random square for the computer's move. You'll fix that bug later.

### Possible Refactor: Move the Move Methods?

You may have noticed that `humanMoves` and `computerMoves` are part of `TTTGame` rather than part of the `Human` and `Computer` classes, respectively. If that seems odd, it is, but just a bit. As it happens, though, how a player moves is an aspect of the game, not the player. Though it seems like `humanMoves` and `computerMoves` should be part of the `Human` and `Computer` classes, they should instead be part of `TTTGame`.

If you're confused by that, you're not alone. Our initial attempt at this program placed the player-move methods in the `Human` and `Computer` classes. However, as the game grew increasingly complex, the `Human` and `Computer` classes became ever more tightly coupled with the `Board` and `TTTGame` classes. That made the program inflexible and hard to modify. Eventually, we decided to keep the player-move methods in `TTTGame`. It's a tradeoff, and an example of how choosing the right design isn't always easy.

### Refactor: Remove the Marker Class

Our original design called for a `Marker` class: something that the `Player` class might use to represent the markers associated with each player. While our design isn't complete yet, our decision to use single-character strings to represent the markers seems like it will do the job. If we were to use something more complex as a marker -- say an image file of some kind -- then a `Marker` class might be worth the effort. For now, though, the built-in `String` class should do the trick. Go ahead and remove the `Marker` class from your code:

```js
// DELETE THIS CODE// class Marker {//   constructor() {//     // A marker is something that represents a player's "piece" on the board.//   }// }
```

### What's Next?

In the next assignment, we'll implement turn taking and valid-move detection.

------

## OO Tic Tac Toe with Classes - Part 4

Our game is starting to look a bit like a complete Tic Tac Toe game. However, each player only gets one shot to play. Furthermore, both players can make invalid moves, and the game will accept them. We'll address both issues in this assignment. Here's the state of our code thus far:

View Code

### Taking Turns

The human and computer should take turns playing until the game is over. Most of that is easy to do with what we have so far: remove the `break` statement from the loop in `play` method in `TTTGame`. We'll also remove the extraneous calls to `this.board.display` so the board only displays when the human is ready to make a move:

oo_ttt.js

Copy Code

```js
class TTTGame {  play() {    this.displayWelcomeMessage();    while (true) {      this.board.display();      this.humanMoves();      // this.board.display(); -- Delete this line      if (this.gameOver()) break;      this.computerMoves();      // this.board.display(); -- Delete this line      if (this.gameOver()) break;      // break; -- Delete this line    }    this.displayResults();    this.displayGoodbyeMessage();  }}
```

Go ahead and play again. This time you'll find that there's no obvious way for the game to end; gameplay keeps going long after the board is full or either player gets 3 markers in a row. Furthermore, both players can choose any square at any time, including squares that already have a marker. Such great fun! (To quit the game, press Control-C at the `Choose a square` prompt.)

### Validating Moves

Let's see what we can do about that bug that lets the players choose any square on the board, regardless of whether it's available.

One approach that we may want to consider involves asking the board object to check whether a square is available. For instance, we may start writing code like this:

copy_of_ttt.js

Copy Code

```js
// Don't add this code to your game!

class Square {
  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Board {
  isUnusedSquare(key) {
    return this.squares[key].isUnused();
  }
}
```

This approach might work. However, if we look at `humanMoves` in the `TTTGame` class, we'll see that we tell the user to enter a value between 1 and 9. However, some squares will no longer be available; by the human player's second turn, there should be 2 squares that she can't choose. Ideally, we want to change our prompt to reflect the available choices:

Copy Code

```plaintext
Choose a square (1, 2, 4, 6, 7, 8, 9):
```

Furthermore, those items should be the only choices that the game accepts.

One way to build the desired prompt is to build an array that contains the keys for all unused squares on the board. We can use that array to construct the prompt. We can also use the array to determine whether the human's move is valid and repeat the same process to determine whether the computer's move is valid. That suggests that a list of unused square's keys may be more useful than merely checking whether a single square is available.

First, let's create an `unusedSquares` method on the `Board` class that returns an array of the unused squares; the array should contain the keys associated with those squares, not square objects. We could also call this method something like `keysForUnusedSquares` to be more explicit, but `unusedSquares` should be okay; mentioning keys is a bit wordy:

oo_ttt.js

Copy Code

```js
class Square {  isUnused() {    return this.marker === Square.UNUSED_SQUARE;  }}class Board {  unusedSquares() {    let keys = Object.keys(this.squares);    return keys.filter(key => this.squares[key].isUnused());  }};
```

We can use the return value of `unusedSqures` to construct the prompt:

oo_ttt.js

Copy Code

```js
class TTTGame {
  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${validChoices.join(", ")}): `;
      choice = readline.question(prompt);

      let integerValue = parseInt(choice, 10);
      if (integerValue >= 1 && integerValue <= 9) {
        break;
      }

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }
}
```

The prompt now changes based on which squares are available.

We can use the same array to determine whether the human's choice is valid:

oo_ttt.js

Copy Code

```js
class TTTGame {
  humanMoves() {
    let choice;

    while (true) {
      let validChoices = this.board.unusedSquares();
      const prompt = `Choose a square (${validChoices.join(", ")}): `;
      choice = readline.question(prompt);

      if (validChoices.includes(choice)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    this.board.markSquareAt(choice, this.human.getMarker());
  }
}
```

Finally, we can use `unusedSquares` to validate the computer's choice:

oo_ttt.js

Copy Code

```js
class TTTGame{
  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let choice;

    do {
      choice = Math.floor((9 * Math.random()) + 1).toString();
    } while (!validChoices.includes(choice));

    this.board.markSquareAt(choice, this.computer.getMarker());
  }
}
```

If you run this code now, you should find that gameplay proceeds as expected, up until the point when the computer makes its final move. At that point, it enters an infinite loop (again!); press Control-C to exit the program.

The infinite loop occurs since the computer has no moves available, so the `do...while` loop never finds a valid choice. We could add some code to this method to handle that more cleanly, but this situation should never occur in the final game; the game should never call `moves` in the `Computer` or `Human` class when the board is full.

### Refactor: Remove `play` Method from `Player` Class

At this point, it's clear that we don't need the `play` method in `Player`, so let's go ahead and remove it:

oo_ttt.js

Copy Code

```js
class Player {  // Delete this method  // play() {  //   // We need a way for each player to play the game.  //   // Do we need access to the board?  // }}
```

### What's Next?

In the next assignment, we'll implement end-of-game and winner detection.

------

## OO Tic Tac Toe with Classes - Part 5

All that remains at this point is to determine whether the game is over and to determine who won: the human, the computer, or neither (a tie game). Here's the state of our code thus far:

View Code

### Is the Game Over?

Currently, the program enters an infinite loop when the board is full. While that loop occurs in the `computerMoves` method on the `TTTGame` class due to the lack of valid moves on a full board, the root of the problem is that we shouldn't call `computerMoves` at all when the board is full. It's one of two conditions we must check for to determine when the game is over. The other occurs when one player or the other plays a winning marker.

Let's implement the game-over functionality. We'll begin with a `gameOver` method that checks for both game-over conditions. For clarity, we'll make each check in a separate method:

oo_ttt.js

Copy Code

```js
class TTTGame {
  gameOver() {
    return this.boardIsFull() || this.someoneWon();
  }

  boardIsFull() {
    //STUB
    return false;
  }

  someoneWon() {
    //STUB
    return false;
  }
}
```

Note that we don't care yet about who won; all we need to know right now is that someone won. We also don't need to distinguish between a full-board tie and a full-board win, so the order in which we call `boardIsFull` and `someoneWon` isn't important; we could swap the order of tests in `gameOver` and get the same results.

It's tempting to do something like this:

```js
// Don't add this to your code!

gameOver() {
  this.theWinner = this.whoWon();
  return this.theWinner !== undefined || this.boardIsFull();
}
```

That method is relatively easy to understand, but it does two separate things: it determines whether the game is over and, as a side effect, it also determines who the winner is if there is a winner. Methods that have both a side effect and a meaningful return value or that try to perform multiple actions are generally not recommended; as much as possible, a method should do one thing. It should return a useful value or have a side-effect, but not both.

#### Is the Board Full?

Recall that `unusedSquares` in the `Board` class returns an array that contains the keys of all remaining unused squares. That provides a convenient way to determine whether the board is full -- all we have to do is check whether the return value is an empty array:

```js
class TTTGame {
  boardIsFull() {
    let unusedSquares = this.board.unusedSquares();
    return unusedSquares.length === 0;
  }
}
```

Run the program and confirm that it quits once the board is full.

Notice that the board has all the information it needs to determine whether it is full. That suggests that `boardIsFull` should be in the `Board` class instead of `TTTGame`. For instance:

```js
class Board {
  isFull() {
    return this.unusedSquares().length === 0;
  }
}

class TTTGame {
  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }
}
```

Whether you put `boardIsFull` in `TTTGame` or `isFull` in `Board` is a decision that can go either way. On one hand, the `Board` class has all the information it needs to determine that the board is full and it seems likely that other games that use the `Board` class will need to know whether the board is full. On the other hand, the rules of the game require that we be able to detect a full-board condition; perhaps that code belongs in the `TTTGame` class. Either choice is reasonable. We'll move the code into the `Board` class as shown above.

#### Did Someone Win the Game?

Now comes the fun part -- how to determine whether someone won the game. In the previous step, we moved the test for a full board to the `Board` class; the board has all the information it needs to determine whether it is full. The board also has all the information it needs to determine whether someone has won the game; it just needs to detect 3 squares in a row.

However, the board is just a 3x3 grid of squares and markers. It doesn't know and doesn't care about the game we're playing. It happens to be Tic Tac Toe, but, in theory, we could use this board in another game that uses a grid of 3x3 squares and markers. That strongly suggests that we should determine whether someone won elsewhere. Since the rules of the game determine the winner, the best place to determine who won is in the `TTTGame`.

The question now is how to determine whether someone won. One way to accomplish that is to search all of the possible 3-in-a-row combinations for 3 squares that share the same marker. Let's look at some pseudocode:

```plaintext
For every possible winning combination of squares (a row):
  If the human has marked all 3 squares or the player has marked all 3 squares:
    Someone won! Return true.

Nobody won. Return false.
```

That pseudocode provides the algorithm we need to determine whether there's been a winner, but it lacks some crucial details. How do we determine "every possible winning combination of squares"? How do we determine whether a given player has marked all 3 squares?

Let's first look at how we can determine the possible winning combinations. One way to do that is to provide a nested array in which each inner array is a 3-element array that identifies the keys in a given row, and the outer array is just a list of those rows. We might define that array like this:

oo_ttt.js

Copy Code

```js
class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    [ "1", "2", "3" ],            // top row of board
    [ "4", "5", "6" ],            // center row of board
    [ "7", "8", "9" ],            // bottom row of board
    [ "1", "4", "7" ],            // left column of board
    [ "2", "5", "8" ],            // middle column of board
    [ "3", "6", "9" ],            // right column of board
    [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
    [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
  ];
}
```

We also need a method that counts the number of squares that contain a player's marker. The method should work for a list of specific squares, so we'll need two arguments: a player, and a list of keys for the squares we want to examine:

oo_ttt.js

Copy Code

```js
class Square {
  getMarker() {
    return this.marker;
  }
}

class Board{
  countMarkersFor(player, keys) {
    let markers = keys.filter(key => {
      return this.squares[key].getMarker() === player.getMarker();
    });

    return markers.length;
  }
}
```

Note that the first argument to `countMarkersFor` is the player for whom we are counting squares; the second is an array of keys from the board's grid, e.g., `[1, 4, 7]`, from which we need to count the player's markers. Note that we also added a `getMarker` method to the `Square` class, despite having decided earlier that we didn't need one. We could, in theory, use `toString` as we did earlier. However, our interest here is the value of the marker, not what it looks like on the board. Using a `getMarker` method makes the intent easier to discern.

We can now use that array and method to determine whether we have a winner:

oo_ttt.js

Copy Code

```js
class TTTGame {
  someoneWon() {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(this.human, row) === 3 ||
             this.board.countMarkersFor(this.computer, row) === 3;
    });
  }
}
```

Note that the `Array.prototype.some` method returns `true` if any invocation of the callback function returns `true`, `false` if every invocation returns `false`. `some` is a great way to detect whether any element of an array meets some criterion.

Our method iterates through the list of possible winning rows and checks each to see whether it contains a winning set of markers. For each row, we merely count the number of markers belonging to each player -- if either one has 3 markers, we have a winning row.

We should now have a fully functioning game. It doesn't yet tell us who won or even whether someone won, but it works correctly.

#### Who Won the Game?

Now that we know whether someone won the game, we're also going to need to know who won the game. We'll need that information in the `displayResults` method in `TTTGame`:

oo_ttt.js

Copy Code

```js
class TTTGame {
  displayResults() {
    if (this.isWinner(this.human)) {
      console.log("You won! Congratulations!");
    } else if (this.isWinner(this.computer)) {
      console.log("I won! I won! Take that, human!");
    } else {
      console.log("A tie game. How boring.");
    }
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    });
  }
}
```

The `isWinner` method determines whether a specified player won the game. It determines whether any row contains 3 occurrences of the specified player's marker.

Our game application is now almost complete. It should work as-is.

### Refactor: Clean Up someoneWon

Though the implementations differ, `someoneWon` and `isWinner` are also similar; in fact, we can rewrite `someoneWon` by using `isWinner` to determine the winning marker. The resulting code is much simpler:

oo_ttt.js

Copy Code

```js
class TTTGame {
  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }
}
```

Be sure to test that your game still works.

### Refactor: Remove the Row Class

We made use of the concept of a "row" in the `TTTGame.POSSIBLE_WINNING_ROWS` array of arrays and we pass each "row" of that array to `countMarkersFor` method of the board. We could, in theory, abstract the winning rows to `Row` class, but it hardly seems worth it. Feel free to try it if you want, but save your code; you may need to back out your changes to finish the assignment.

If you don't implement a `Row` class, you can delete the skeleton class we created earlier:

oo_ttt.js

Copy Code

```js
// DELETE THIS CODE
// class Row {
//   constructor() {
//     // We need some way to identify a row of 3 squares
//   }
// }
```

### Improving the UI: Clearing the Screen

The TTT game currently writes all its output to the console, one line after the other, scrolling the screen upward as it runs. The game screen tends to look cluttered, which so much going on the display that it's sometimes hard to see what's happening. Can we do something to improve the UI?

Yes, we can. One solution is to clear the display each time you display the board so that it always appears at the top of the screen, with no clutter to get in the player's way. Unfortunately, clearing the screen is trickier than it sounds -- how you clear the screen depends on your computer's operating system; Macs and Windows machines, for instance, clear the screen in different ways.

A simple solution to this compatibility issue is to simply call `console.clear()`:

oo_ttt.js

Copy Code

```js
console.clear();
```

Let's implement screen clears in the TTT game. Before we do, though, try to do it yourself. When you're ready, take a look at our solution.

Try to arrange things so that:

- The user can see the welcome message and the board simultaneously when she starts the game.
- Don't display the welcome message after the human's first move.
- Try to always display the board at the same location on the screen regardless of whether the welcome message is present.

View Code

### ESLint

Now would be an excellent time to run ESLint:

Copy Code

```terminal
npx eslint ttt.js
```

If you've followed along carefully, ESLint shouldn't detect any problems. If it does detect any problems, try to fix them before moving on.

### The Completed Game

View Code

### What's Next?

Congratulations! The game is now complete.

------

## OO Tic Tac Toe Code Discussion

### Summary

- Mitigate ripples effects of change but not having all classes collaborate with each other, only some. 
- Use specific, detailed names that are less likely to conflict since generic names are in the global namespace. 
- When working with a class, focus on the behaviors and data in that class. Make each class a generic type. `Board` knows nothing about `Square` or `Player` or even `TTTGame`. 
- in OOP, there are poor designs, but rarely one *right* design. It all comes down to tradeoffs between tighly coupled dependencies or loosely coupled dependencies. 
  - Tightly coupled dependencies are easier to understand but offer less flexibility. 
  - Loosely coupled dependencies are more challenging to understand but offer more long term flexibility. 

Below are some ideas for you to ponder. You don't need to implement any solutions.

1. Did you notice how tiresome it is to test for regression after every small change or refactoring? Besides being careful, what else can we do to ease this burden? If you said "tests," you are right. One of the most fundamental reasons for testing is to prevent regression. We'll talk about testing in detail in a later course.

   Using testing to drive design is another primary reason to use tests. However, that's an entirely different topic that we'll cover much later in the program.

2. While it's usually harder to write OO code from scratch, do you think it was easier or felt safer to modify the OO TTT program than the procedural version we wrote earlier? You should have! OOP forces you to use indirection, but that indirection helps isolate concerns so that they don't ripple across an entire codebase. Changes are encapsulated in a class or object. The interface used to interact with a class or object can remain the same while the specific implementation can change. That's one of the chief benefits of object-oriented programming.

### Indirection

- Definition: the ability to reference something indirectly, you have to have to look elsewhere to determine what a name -- a variable or a function, for instance - refers to. 
- Examples
  - Calling a function or method 
  - `obj.foo` is 2 levels of indirection

**Indirection**, in the sense we're using it, refers to the ability to reference something indirectly. 

- For instance, calling a function or a method is an example of indirection -- we're using the function name to invoke some action. If that function calls another function, then that's yet another level of indirection.

- Using variables to represent values is also an example of indirection. For instance:

```js
let foo = "bar";
console.log(foo);
```

On line 2, we're using indirection to access the value of `foo`, which is `"bar"`.

- If you want to determine the value of an object property, there are at least two levels of indirection involved: the variable name for the object, and the name of the property:

```js
let obj = { foo: "bar" };
console.log(obj.foo); // 2 levels of indirection
```

- Indirection effectively means that you have to have to look elsewhere to determine what a name -- a variable or a function, for instance - refers to. 
- In one sense, it makes programs a little harder to read since the actual values or behaviors are somewhere else in the code base. In practice, though, indirection makes code easier to understand, particularly if you use good variable and function names. The names tell you what you're working with without actually revealing more information than you need.

3. Most of our classes have generic names, like `Player` or `Board`. Suppose we want to put our game in a library and let other developers use it. Our generic class names are now in the global namespace where they may conflict with names those other developers are using. How do we fix that? Answer: use a module; we'll talk about modules in another course. In the short term, we can use names that are less likely to conflict, such as `TTTPlayer` and `TTTBoard`.
4. As we write programs with more classes, we start to build a *dependency graph* of the classes. In OOP, we don't want the dependency graph to look like a spider web. Put another way: classes should collaborate with *some* other classes. If **all** classes collaborate with each other, though, you should reconsider your OO design. For example, our dependency graph looks like this:

- `TTTGame` collaborates with `Human`.
- `TTTGame` collaborates with `Computer`.
- `TTTGame` collaborates with `Board`.
- `Board` collaborates with `Square`.

Notice that the `Human`, `Computer`, and `Player` classes know nothing about the `Square` class, and `Board` knows nothing about `Human`, `Computer`, and `Player`. That's how we encapsulate and mitigate the ripple effects of change.

5. Analyze the `Board` and `Square` classes. Look at methods (behaviors) in those classes:

| Board              | Square      |
| :----------------- | :---------- |
| `display`          | `getMarker` |
| `displayWithClear` | `setMarker` |
| `markSquareAt`     | `isUnused`  |
| `countMarkersFor`  | `toString`  |
| `unusedSquares`    |             |
| `isFull`           |             |

- Notice how the methods only deal with concerns related to the class.

- While developing this program, we placed the `isWinner` method in `TTTGame`. It uses `Board.protoype.countMarkersFor` to determine whether a player has 3 markers in a row; we could easily create a `Board.prototype.threeInARow` method instead. The choice of where to put a particular behavior is often unclear. Sometimes, there is no advantage or disadvantage to putting it in one class instead of another.

- When working with classes, you must focus on the behaviors and data in that class. It's tempting to inject additional collaborators into a class, but keep in mind that doing so introduces additional dependencies. The `Board` knows about `Square`, but it doesn't know anything about `Player` or even the `TTTGame`. In that way, it tries to be a generic type.

6. What we just talked about in the previous point is hard to understand without more experience. Consider our decision to put `humanMoves` and `computerMoves` in the `TTTGame` class. We could have instead put a `moves` method in the `Human` and `Computer` classes. However, if we did that, we would have to pass a `Board` object to those two methods, thus introducing dependencies between `Human` and the `Board` class, and between the `Computer` and `Board` classes.

- Would those dependencies be wrong? The answer is unclear; it depends on the tradeoffs you're willing to make. We opted to keep the move behavior in `TTTGame` to avoid introducing the dependencies describe above.

- In OOP, there are poor designs, but there is rarely one *right* design. It all comes down to tradeoffs between tightly coupled dependencies or loosely coupled dependencies. Tightly coupled dependencies are easier to understand but offer less flexibility. Loosely coupled dependencies are more challenging to understand but offer more long term flexibility. Which path is right depends on your application. Most of the time, beginners tend to over-apply design patterns. Don't prematurely optimize or build for large-scale architecture when you don't need it. On the other hand, recognize when you're introducing coupling and dependency, and eliminate unnecessary coupling when you can.

- That's the *art* component of programming. It's a small taste of software design, patterns, and architecture. Mastering this art is a lifelong journey, and your intuition will slowly improve as you gain experience.

7. Given that the general lack of behaviors or state in the `Human` and `Computer` classes, you might consider deleting them. For now, though, you can leave them in place. You may find them useful in the next assignment.

------

## OO Tic Tac Toe with Constructors and Prototypes

Of course, there's more than one way to create an OO program in JavaScript. For practice, try to rewrite the TTT program using constructors and prototypes and the pseudo-classical pattern instead of classes. To get you started, here's how you would rewrite the Square class.

```js
function Square(marker) {
  this.marker = marker || Square.UNUSED_SQUARE;
}

Square.UNUSED_SQUARE = " ";
Square.HUMAN_MARKER = "X";
Square.COMPUTER_MARKER = "O";

Square.prototype.toString = function() {
  return this.marker;
};

Square.prototype.setMarker = function(marker) {
  this.marker = marker;
};

Square.prototype.isUnused = function() {
  return this.marker === Square.UNUSED_SQUARE;
};

Square.prototype.getMarker = function() {
  return this.marker;
};
```

Here's a complete reference solution:

Solution

------

## OO Tic Tac Toe with OLOO

Now try to rewrite the TTT program using the OLOO pattern. To get you started, here's how you would rewrite the Square class.

```js
let Square = {
  UNUSED_SQUARE:   " ",
  HUMAN_MARKER:    "X",
  COMPUTER_MARKER: "O",

  init(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
    return this;
  },

  toString() {
    return this.marker;
  },

  setMarker(marker) {
    this.marker = marker;
  },

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  },

  getMarker() {
    return this.marker;
  },
};

let square = Object.create(Square).init();
```

Solution

------

## OO Twenty-One Overview

This assignment doesn't change much from the [procedural Twenty-One](https://launchschool.com/lessons/fb4809a8/assignments/62238c60) game. Review that first, but skip the part about implementation steps (Tips on Getting Started). We'll take a more OO approach here.

We'll follow a familiar pattern to tackle the OO Twenty-One game:

1. Write a textual description of the problem or exercise.
2. Extract the significant nouns and verbs from the description.
3. Organize and associate the verbs with the nouns.
4. Write scaffolding and spike code.

### Description

Let's begin by writing a textual description of the game.

- Twenty-One is a card game with a dealer and a player.

- The participants try to get as close to 21 points as possible without going over.

- The game starts by dealing cards from a 52-card deck consisting of cards from 4 suits of 13 ranks each.

- Both participants receive two cards.

  - The dealer hides one of his cards (places it face-down) so that the player can't see what it is.
  - The player can see both of her cards.

- The player takes the first turn, and can hit or stay

  - If the player hits, she gets another card, and again has the opportunity to hit (get another card) or stay.
- If the player goes over 21 points, she busts.
  - If the player stays, the dealer plays next.

- If the player didn't bust, it's now the dealer's turn.

  - The dealer reveals his face-down card.
  - If the dealer's total points are less than 17, he must hit and receive another card.
  - If the dealer goes over 21 points, he busts.
  - If the dealer has 17 points or more, he must stay.

- Results of the game are determined.

This description provides both more and less detail than the one we used in the earlier course, but it's effectively the same. Where we provide less detail, as in determining the number of points in a hand, you can get that information from the procedural game description.

As before, the player is the human running the program, while the computer plays the part of the dealer.

### Identify the Nouns and Verbs

|           |                                                              |
| :-------- | :----------------------------------------------------------- |
| **Nouns** | game, player, dealer, participant, turn, deck, card, suit, rank, score, points |
| **Verbs** | start, deal, hit, stay, win, lose, tie, bust, hide, reveal   |

As with the Tic Tac Toe game, some of these words aren't significant to the game design so we won't discuss them further. For instance, we probably don't need to talk about *suit* and *rank* as nouns; they are merely characteristics of a card. We can probably also ignore *turn* since that's merely an element of gameplay that describes the player or dealer's play.

On the surface, it makes some sense to treat *bust*, *win*, *lose*, and *tie* as verbs. However, when you think about it, none of these are actions that get performed by one of our nouns. At best, they're game states: in this case, a state that defines the end state of the game from a given participant's viewpoint. For now, we'll treat *bust* as a state for each participant, and mostly ignore *win*, *lose*, and *tie*.

### Organize

Let's organize our words a bit by writing down the significant nouns and the verbs in a way that shows some of the most likely relationships between words:

- Game (n)
  - start (v)
- Deck (n)
  - deal (v) (should this be here, or in Dealer?)
- Card (n)
- Participant (n)
- Player (n)
  - hit (v)
  - stay (v)
  - bust (state)
  - Score (n, state)
- Dealer (n)
  - hit (v)
  - stay (v)
  - deal (v) (should this be here, or in Deck?)
  - bust (state)
  - Score (n, state)

The first thing we notice is the considerable redundancy in the `Player` and `Dealer` classes. A natural place to extract that redundancy seems to be a superclass -- perhaps `Participant`? Our reference implementation will take that approach.

None of our verbs appear to apply to the *card* or *participant* nouns, though we will use participant in our reference implementation. We had a similar issue in previous programs -- some nouns didn't have any associated verbs -- so it shouldn't surprise you here.

One noun, *score*, ended up as a state for the *Player* and *Dealer*. It may still end up as a class in our final code, but, for now, it doesn't feel like we need to treat it specially.

This list isn't necessarily final. It's entirely possible that we'll add additional nouns or verbs as we go along to fill in some gaps. It's also possible that some of our words may end up not being significant. Our primary purpose in writing this list is to give us a starting point for our program.

Our list of nouns and verbs provides a general list of the types of objects we'll need (the nouns), and the behaviors that each object should implement (the verbs).

### Additional Requirements

Welcome the player to the game, and say good bye when they quit.

Each time the player has an opportunity to hit or stay:

- Display the computer's hand; one card should remain hidden.
- Display the player's hand and her point total.

For the dealer's turn:

- The dealer doesn't play at all if the player busts.
- Display the dealer's hand, including the hidden card, and report his point total.
- Redisplay the dealer's hand and point total and each time he hits.
- Display the results when the dealer stays.

After each game is over, ask the player if they want to play again. Start a new game if they say yes, else end the game.

When the program starts, give the player 5 dollars with which to bet. Deduct 1 dollar each time she loses, and add 1 dollar each time she wins. The program should quit when she is broke (0 dollars) or rich (has a total of 10 dollars).

Be prepared to run out of cards. You can either create a new deck for each game, or keep track of how many cards remain and create a new deck as needed.

### All requirements

- Twenty-One is a card game with a dealer and a player.
- The participants try to get as close to 21 points as possible without going over.
- The game starts by dealing cards from a 52-card deck consisting of cards from 4 suits of 13 ranks each.
- Both participants receive two cards.
  - The dealer hides one of his cards (places it face-down) so that the player can't see what it is.
  - The player can see both of her cards.
- The player takes the first turn, and can hit or stay.
  - If the player hits, she gets another card, and again has the opportunity to hit (get another card) or stay.
  - If the player goes over 21 points, she busts.
  - If the player stays, the dealer plays next.
- If the player didn't bust, it's now the dealer's turn.
  - The dealer reveals his face-down card.
  - If the dealer's total points are less than 17, he must hit and receive another card.
  - If the dealer goes over 21 points, he busts.
  - If the dealer has 17 points or more, he must stay.
- Results of the game are determined.

##### Additional Requirements

- Welcome the player to the game, and say good bye when they quit.
- Each time the player has an opportunity to hit or stay:
  - Display the computer's hand; one card should remain hidden.
  - Display the player's hand and her point total.
- For the dealer's turn:
  - The dealer doesn't play at all if the player busts.
  - Display the dealer's hand, including the hidden card, and report his point total.
  - Redisplay the dealer's hand and point total and each time he hits.
  - Display the results when the dealer stays.
- After each game is over, ask the player if they want to play again. Start a new game if they say yes, else end the game.
- When the program starts, give the player 5 dollars with which to bet. Deduct 1 dollar each time she loses, and add 1 dollar each time she wins. The program should quit when she is broke (0 dollars) or rich (has a total of 10 dollars).
- Be prepared to run out of cards. You can either create a new deck for each game, or keep track of how many cards remain and create a new deck as needed.

### Scaffolding and Spike

Now that we have a general idea of the objects we'll need and their behaviors, it's time to begin coding our solution. We'll use JavaScript classes in our program, though you can also use other approaches such as the constructor/prototype approach or factory functions.

We'll start by writing some scaffolding and a spike for our orchestration engine. We'll base this code on our noun/verb list:

```js
class Card {
  constructor() {
    //STUB
    // What sort of state does a card need?
    // Rank? Suit? Points?
  }
}

class Deck {
  constructor() {
    //STUB
    // What sort of state does a deck need?
    // 52 Cards?
    // obviously, we need some data structure to keep track of cards
    // array, object, something else?
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class Participant {
  constructor() {
    //STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? all the redundant behaviors from Player and Dealer?
  }
}

class Player extends Participant {
  constructor() {
    //STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  isBusted() {
    //STUB
  }

  score() {
    //STUB
  }

  hide() {
    //STUB
  }

  reveal() {
    //STUB
  }

  deal() {
    //STUB
    // does the dealer or the deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    //STUB
    // What sort of state does the game need?
    // A deck? Two participants?
  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    //STUB
  }

  showCards() {
    //STUB
  }

  playerTurn() {
    //STUB
  }

  dealerTurn() {
    //STUB
  }

  displayWelcomeMessage() {
    //STUB
  }

  displayGoodbyeMessage() {
    //STUB
  }

  displayResult() {
    //STUB
  }
}

let game = new TwentyOneGame();
game.start();
```

Remember: this code doesn't necessarily reflect the final program's structure and code; it's just scaffolding. It leaves all kinds of details out of the picture and is certainly not a complete outline of the code that you'll write. It's likely, even, that your program won't need some of these classes and methods.

We'll show our reference implementation in the next assignment. However, our solution isn't the only way to write this game. Your game may indeed be different, even with the spike we provided above.

Feel free to request a code review when you've completed the game. First, though, take some time to perform a self-review: compare your code with the reference solution and the code reviews for other students. Use that self-review to help improve your program on your own. Even good programmers look at other programmer's code to find better solutions to shared problems and to learn.

Hint

### $ npm install shuffle-array

```node
$ npm install shuffle-array
```

Usage 

```js
var shuffle = require('shuffle-array'),
    collection = [1,2,3,4,5];
 
shuffle(collection);
 
console.log(collection); // returns [4, 3, 1, 5, 2]
```

```js
const readline = require("readline-sync");
// use as global constant 
const shuffle = require("shuffle-array");
```





------

## OO Twenty-One: Reference Implementation with Classes

Here's our reference implementation. Remember, your solution doesn't have to look like this, but try to look at the tradeoffs in design.

```js
const readline = require("readline-sync");
const shuffle = require("shuffle-array");

class Card {
  static SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
  static RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
                  "Jack", "Queen", "King", "Ace"];

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }

  toString() {
    if (this.isHidden()) return "Hidden";
    return `${this.getRank()} of ${this.getSuit()}`;
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }

  isAce() {
    return this.getRank() === "Ace";
  }

  isKing() {
    return this.getRank() === "King";
  }

  isQueen() {
    return this.getRank() === "Queen";
  }

  isJack() {
    return this.getRank() === "Jack";
  }

  isFaceCard() {
    return this.isKing() || this.isQueen() || this.isJack();
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }

  isHidden() {
    return this.hidden;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    Card.SUITS.forEach(suit => {
      Card.RANKS.forEach(rank => {
        this.cards.push(new Card(suit, rank));
      });
    });

    this.shuffleCards();
  }

  // it may be useful to shuffle the deck at any time
  shuffleCards() {
    shuffle(this.cards);
  }

  dealCardFaceUp() {
    return this.cards.pop();
  }

  dealCardFaceDown() {
    let card = this.dealCardFaceUp();
    card.hide();
    return card;
  }
}

let Hand = {
  addToHand(newCard) {
    this.cards.push(newCard);
  },

  resetHand() {
    this.cards = [];
  },

  showHand(caption) {
    console.log(caption);
    console.log("");

    this.cards.forEach(card => console.log(`  ${card}`));
    console.log("");
  },

  getCards() {
    return this.cards;
  },

  revealAllCards() {
    this.cards.forEach(card => card.reveal());
  },

  numberOfCards() {
    return this.cards.length;
  },
};

class Player {
  static INITIAL_PURSE = 5;
  static WINNING_PURSE = 2 * Player.INITIAL_PURSE;

  constructor() {
    this.money = Player.INITIAL_PURSE;
    this.resetHand();
  }

  winBet() {
    this.money += 1;
  }

  loseBet() {
    this.money -= 1;
  }

  isBroke() {
    return this.money <= 0;
  }

  isRich() {
    return this.money >= Player.WINNING_PURSE;
  }

  showPurse() {
    console.log(`You have $${this.money}`);
    console.log("");
  }
}

class Dealer {
  constructor() {
    this.resetHand();
  }
}

// Hand is a "mix-in"; we add its methods to the Player and Dealer classes.
// This is an alternative to inheritance when inheritance isn't appropriate
Object.assign(Player.prototype, Hand);
Object.assign(Dealer.prototype, Hand);

class TwentyOneGame {
  static TARGET_SCORE = 21;
  static DEALER_MUST_STAY_SCORE = this.TARGET_SCORE - 4;
  static HIT = 'h';
  static STAY = 's';

  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.playOneGame();
      if (this.player.isBroke() || this.player.isRich()) break;
      if (!this.playAgain()) break;
    }

    if (this.player.isBroke()) {
      console.log("You're broke!");
    } else if (this.player.isRich()){
      console.log("You're rich!");
    }

    this.displayGoodbyeMessage();
  }

  playOneGame() {
    this.dealCards();
    this.showCards();
    this.player.showPurse();
    this.playerTurn();

    if (!this.isBusted(this.player)) {
      this.dealerTurn();
    }

    console.clear();
    this.showCards();
    this.displayResult();

    this.updatePurse();
    this.player.showPurse();
  }

  playAgain() {
    let answer;

    while (true) {
      answer = readline.question("Play again (y/n)? ").toLowerCase();

      if (["y", "n"].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    console.clear();
    return answer === "y";
  }

  hit(hand) {
    hand.addToHand(this.deck.dealCardFaceUp());
    if (this.isBusted(hand)) return;

    console.clear();
    this.showCards();
  }

  playerTurn() {
    while (this.hitOrStay() === TwentyOneGame.HIT) {
      this.hit(this.player);
      if (this.isBusted(this.player)) break;
    }
  }

  dealerContinue() {
    readline.question("Press Return to continue...");
  }

  dealerTurn() {
    this.dealer.revealAllCards();

    console.clear();
    this.showCards();

    while (true) {
      let score = this.computeScoreFor(this.dealer);
      if (score >= TwentyOneGame.DEALER_MUST_STAY_SCORE) break;
      this.dealerContinue();
      this.hit(this.dealer);
    }
  }

  dealCards() {
    this.deck = new Deck();
    this.player.resetHand();
    this.dealer.resetHand();

    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceUp());
    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceDown());
  }

  showCards() {
    this.dealer.showHand("Dealer's Cards");
    this.showScoreFor(this.dealer);

    this.player.showHand("Your Cards");
    this.showScoreFor(this.player);
  }

  displayWelcomeMessage() {
    console.clear();
    console.log("Welcome to 21!");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing 21! Goodbye!");
  }

  whoWon() {
    if (this.isBusted(this.player)) {
      return this.dealer;
    } else if (this.isBusted(this.dealer)) {
      return this.player;
    } else {
      let playerScore = this.computeScoreFor(this.player);
      let dealerScore = this.computeScoreFor(this.dealer);

      if (playerScore > dealerScore) {
        return this.player;
      } else if (playerScore < dealerScore) {
        return this.dealer;
      } else {
        return null; // tie game
      }
    }
  }

  displayResult() {
    if (this.isBusted(this.player)) {
      console.log("You busted! Dealer wins.");
    } else if (this.isBusted(this.dealer)) {
      console.log("Dealer busted! You win.");
    } else {
      let playerScore = this.computeScoreFor(this.player);
      let dealerScore = this.computeScoreFor(this.dealer);

      if (playerScore > dealerScore) {
        console.log("You win!");
      } else if (playerScore < dealerScore) {
        console.log("Dealer wins!");
      } else {
        console.log("Tie game.");
      }
    }

    console.log("");
  }

  hitOrStay() {
    let answer;

    while (true) {
      answer = readline.question("Hit or Stay (h/s)? ").toLowerCase();

      if ([TwentyOneGame.HIT, TwentyOneGame.STAY].includes(answer)) break;

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    return answer;
  }

  computeScoreFor(hand) {
    let cards = hand.getCards();
    let score = cards.reduce((total, card) => total + this.valueOf(card), 0);

    cards.filter(card => card.isAce() && !card.isHidden())
         .forEach(() => {
           if (score > TwentyOneGame.TARGET_SCORE) {
             score -= 10;
           }
         });

    return score;
  }

  isBusted(hand) {
    return this.computeScoreFor(hand) > TwentyOneGame.TARGET_SCORE;
  }

  updatePurse() {
    switch (this.whoWon()) {
      case this.player:
        this.player.winBet();
        break;
      case this.dealer:
        this.player.loseBet();
        break;
      default:
        break;
    }
  }

  valueOf(card) {
    if (card.isHidden()) {
      return 0;
    } else if (card.isAce()) {
      return 11;
    } else if (card.isFaceCard()) {
      return 10;
    } else {
      return parseInt(card.getRank(), 10);
    }
  }

  showScoreFor(hand) {
    console.log(`  Points: ${this.computeScoreFor(hand)}`);
    console.log("");
  }
}

let game = new TwentyOneGame();
game.start();
```

Note that our solution replaced the proposed `Participant` superclass with a mix-in object called `Hand`. Here, we used `Object.assign` to mix in `Hand` with the `Player` and `Dealer` classes instead of using inheritance. You can write this program without mix-ins, but it doesn't make sense; the relationships aren't "is a" relationships, so a mix-in is a better fit.

Our `Card` class doesn't try to associate specific point values with the different cards; the point values are specific to the game of 21, not to a general purpose playing card. For much the same reason, the point values aren't provided by the `Hand` mix-in either.

------

## Exercise Sets

Before you begin the assessments, you should complete all of the [Object Oriented JavaScript exercise sets](https://launchschool.com/exercises#js120_object_oriented_javascript). Complete the sets in the following sequence:

1. Easy
2. Objects
3. Function Context
4. OO Basics: Classes
5. OO Basics: Inheritance and Mixins
6. Object Creation Patterns

------

## Summary

This lesson should have helped you solidify your object-oriented knowledge. Despite all the work you've done so far, you're still very new to the world of OOP. If you're still fuzzy on the design aspects of OOP -- how to organize your classes and objects and their behaviors -- that's natural and expected. It's normal to be a bit confused when trying to determine the best way to break down your program into its OOP components, the objects and behaviors. Even developers with years of experience can struggle with these aspects of OOP.

However, there shouldn't be any confusion about how JavaScript implements OOP. You should be familiar with the topics we've covered in this course. In particular:

- You should understand the different ways to create objects in JavaScript, including object literals, object factories, constructors and prototypes (the pseudo-classical approach), the OLOO pattern (prototypal inheritance), and ES6 classes. You should be able to compare and contrast the different ways of creating objects.
- You should understand encapsulation, polymorphism, and inheritance in a JavaScript context. In particular, you should understand prototypal inheritance.
- You should understand the difference between inheritance, collaboration, and mix-ins.
- You should understand the execution context in JavaScript. In particular, you should be intimately familiar with how JavaScript determines execution context, how it can lose that context, and how you can prevent context loss.
- You should understand both the syntactical and behavioral differences between function declarations, function expressions, arrow functions, and the compact method syntax used in classes and objects.
- You should know how to use both instance and static properties and methods.

If you're comfortable with the above, then you're ready to continue on your journey. Mastering OOP is a life-long journey that requires knowledge of design patterns, architectural tradeoffs, and best practices. Only time and experience can provide that knowledge.

That concludes the instructional part of this course. Next up, the assessment!

------

## Vocabulary

- **Spike**: exploratory code

  - Spikes take a high-level view, focusing on the general logic of the program; they don't concern ourselves with details like what it means for the game to be over.

- Question: are classes not hoisted?

- you shouldn't generally access properties directly unless you have no choice

- Object.prototype.toString

  - Since Javascript returns `[object Object]` when passed an object, we can instead 
  - **override** `toString` in classes, which means we can define a `toString` method in class that JavaScript should call on instead. 
  - Since every object normally inherits from `Object.prototype` either directly or indirectly, every object, by default, has access to this method.

- **Class constant**: a property that belongs to the class, defined by keyword `static`

  - The `static` keyword defines a property that belongs to the class
  - We must qualify the constant name with the class name, e.g., `Square.UNUSED_SQUARE`, even if we reference it from somewhere in the class.

- DRY up that code (**D**on't **R**epeat **Y**ourself) 

- JavaScript always treats object keys as strings.

- <u>you shouldn't generally access properties directly unless you have no choice</u>,

- Be careful about whether you are passing a method or invoking the method! 

- - A method should do one thing

    - ```js
      // Don't add this to your code!gameOver() {  this.theWinner = this.whoWon();  return this.theWinner !== undefined || this.boardIsFull();}
      ```

    - This method determines whether game is over, and as a side effect, determines who the winner is. 

    - Methods that have both a side effect and a meaningful return value or that try to perform multiple actions are generally not recommended. 

    - It should return a useful value or have a side-effect, not both. 

