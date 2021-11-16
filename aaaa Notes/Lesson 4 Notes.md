### Introduction

So far in this course, we've discussed a number of different concepts which underpin the Object Oriented Programming paradigm. We've also explored various different ways in which these concepts are implemented in the context of a JavaScript program.

- By this point you should be comfortable with the concept of using objects to *encapsulate* data and behavior in order to add structure to your code, and the importance of function *execution context* when working with objects in this way. You should have an understanding of using *prototypes* to delegate property and method access. You should also be familiar with using object creation patterns in order to create multiple objects of the same *type*.

The advantages of using an object-oriented approach really start to become apparent when you combine some of these concepts together.

-  In this lesson, we'll explore how you can leverage prototypal delegation to create object *subtypes*. This is one way of enabling code re-use within your programs. 
- Another way of enabling code re-use is by using *mix-ins*, we'll look at how to do that too. 
- Finally, we'll tie these ideas together by discussing another of the fundamental pillars of OOP: *polymorphism*.

- As well as this, we'll demonstrate the flexibility of object-orientation in JavaScript by exploring another object creation pattern, the OLOO pattern.

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

  - 

- **OLOO** pattern: **Objects Linking to Other Objects**.
  - Another pattern to create objects in bulk
  - does not use a function. Uses an object as prototype, then `Object.create` to create new objects that inherit from the prototype. Uses `init` method to customize state of each object, `init` returns `this`, a reference to the calling object. 
  -  It uses prototypes and involves extracting properties common to all objects of the same type (e.g., car objects) to a prototype object. All objects of the same type then inherit from that prototype.

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
-  An advantage of the factory pattern is that it lets us create objects with private state. If that doesn't make sense to you yet, don't worry. We'll return to this topic in a later course when we discuss closures.
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

------

### Subtyping with Constructors and Prototypes

- Constructors and prototypes mimic classes in JavaScript.
  - They exist in the language solely to make it easier for developers to switch to JavaScript. 
- Class is a blueprint for creating objects. Traditional OOP languages use classes to create distinct objects of a particular type and give those objects the behaviors and state that they need. 

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
Hello.hi(); // invoking function Hello as a normal function. There is no `hi` method inside `Hello`. So nothing should be printed. 
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
- Javascript is different from traditional object-oriented languages in that it uses *prototype inheritance*. In a nutshell, prototype inheritance in Javascript works like this:
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

- Every very object in JavaScript has an internal `[[prototype]]` property that can be accessed directly by a `__proto__` property. This property, referred to as the ‘dunder proto’, essentially points to another object.
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

  - The first way lets us inherit all the properties and methods that a new object created from the parent constructor function would have access to (the body of the function is executed). 

    - With `new` we’re causing the code within the constructor function to run and creating a link with a prototype chain. 

    ```js
    // using new
    Dog.prototype = new Animal();
    Dog.prototype.constructor = Dog; // gotta point the constructors back
    ```

  - The second let’s us inherit only the properties that have been defined on the parent constructor function’s `prototype` object (properties defined in the body of the function will not be inherited).

    - with `Object.create(obj)` we’re simply creating the link without executing the code in the constructor function .

    ```js
    // using Object.create(Super-type.prototype)
    Dog.prototype = new Animal();
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

- Notice how Object itself does not have a ‘constructor’ property. Objcect's constructor is Function. 
  - This is because Javascript will look through all of Object’s properties, not find a ‘constructor’ property, and then will look for it in the object that it’s __proto__ references, which is Function.prototype. Function.prototype has a ‘constructor’ property, which references Function and alas we have completed the journey!

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
     
     constructor () {
   
     }
     
     greet(str) {
       console.log(str);
     }
   }
   
   class Hello extends Greeting {
     hi () {
       this.greet('Hello');
     }
   }
   
   class Goodbye extends Greeting {
     bye () {
       this.greet('Goodbye');
     }
   }
   
   Greeting
   
   ```
   

------

### Rewriting OO RPS with Constructors and Classes

In the first lesson of this course, we wrote an RPS game using factory functions. In this assignment, we'll take everything we've learned about constructors and classes and rewrite the game twice: first with constructors and prototypes, and then with classes.

Before we begin, here's the RPS code that we will convert:

Show

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

**Duck typing** occurs when objects of different *unrelated* types both respond to the same method name. With duck typing, we aren't concerned with the class or type of an object, but we do care whether an object has a particular behavior. *If an object quacks like a duck, then we can treat it as a duck.* Specifically, duck typing is a form of polymorphism. As long as the objects involved use the same method name and take the same number of arguments, we can treat the object as belonging to a specific category of objects.

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
-  The mix-in pattern does not use delegation, because it is not inheritance. 

- **Inheritance** establishes a prototype chain that JavaScript can use to delegate method calls and property accesses
- : Inheritance works best when there is an "is a" relationship between two classes. The inheriting class is a type of the superclass. The mix-in pattern works best when an object has a capability that another object needs.
