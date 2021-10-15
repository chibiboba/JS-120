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

- probably the simplest design pattern for prototypal inheritance. 

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

- **OLOO** pattern: **Objects Linking to Other Objects**.
  - Another pattern to create objects in bulk
  - does not use a function. Uses an object as prototype, then `Object.create` to create new objects that inherit from the prototype. Uses `init` method to store properties, `init` returns `this`, a reference to the calling object. 
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

- The most common technique uses an `init` method on the prototype object:
  - `init` is a function that initializes values in newly created objects. It also returns `this`, which is a reference to the object that called `init`
    - so we are able to method chain after calling `Object.create`. 

```js
let carPrototype = { // is an object, not a function. 
  start: function() {
    this.started = true;
  },

  stop: function() {
    this.started = false;
  },

  init(make, model, year) {
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

As used in JavaScript, the term *inheritance* is an overloaded word. It describes two related but distinct forms of inheritance: *prototypal* and *pseudo-classical*.

- Both pseudo-classical and prototypal inheritance use prototypal delegation under the hood. If the requested property isn't found, the object delegates the request to the object's prototype object. If the requested property isn't there either, the prototype object delegates the request to its own prototype object. 
- This process follows the prototype chain until the property or method is found or the end of the prototype chain is found.

##### **prototypal inheritance** (**prototypal delegation**)

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

Note also that the `Square` constructor calls a function that is represented by the keyword `super`. When called inside the `constructor` method, the `super` keyword refers to the constructor method for the parent class (the class that we inherit from). Thus, `super(size, size)` performs the same role performed by this code from our constructor/prototype example:

```js
function Square() {
  Rectangle.call(this, size, size);
}
```

You don't need to use `super` in every subclass, but in most cases you do. In particular, if the superclass's constructor creates any object properties, you must call `super` to ensure that those properties are set properly. For instance, in the `Rectangle` class above, we create two properties in the `Rectangle` constructor, so we must call `super` in `Square`'s constructor.

If you do call `super` in a subclass's constructor, you must call it before you use `this` in that constructor.

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

### Vocabulary

- **Method overriding**: when a class redefines a method that a superclass defines. 