Object creation patterns

- The assessment requires detailed knowledge of all of these object creation patterns, including how to implement them and their nuances.
- Needless to say, being able to demonstrate this knowledge with examples on the fly requires a lot of practice.
- A good way to practice is to start from scratch and try to produce a functionally identical <u>hierarchy of objects</u> using each different object creation pattern. This practice is most effective if the hierarchy includes features such as inheritance, mix-ins, and polymorphism in order to illustrate how to implement these aspects in the different patterns.
- Lacking any and all creativity, I usually practiced with something like creating a hierarchy of vehicles using Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. 

------

## Concepts

### Inheritance

- Inheritance describes two related but distinct forms of inheritance: prototypal and pseudo-classical inheritance

##### Prototypal inheritance

- A simple form of inheritance that works with one object at a time, which is why it's often called **object inheritance** or **prototypal delegation**. 

- Use `Object.create` to create an object that inherits properties from from a prototype object. The newly created object has access to all properties and methods on the prototype object. 
- An objects internal `[[prototype]]` property points to the prototype object, and the object can delegate method calls to the prototype object. 
- OLOO uses prototypal inheritance.
- Example: 

```js
let animal =  {};

let cat = Object.create(animal);
```

##### pseudo-classical inheritance

- In pseudo-classical inheritance, a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a sub-type inherits from a super-type.

  - We are creating a link without executing code in the parent constructor function. 
  - This lets us inherit only the properties that have been defined on the parent constructor function's `prototype` object, not instance methods or properties on the parent constructor. 

- Also known as **constructor inheritance**, works with functions / constructors. 

  - The **pseudo-classical** object construction, also known as the **constructor/prototype pattern**, forms the basis of pseudo-classical inheritance. 

- Syntax

  - Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then <u>restore the constructor</u> property of the **sub-type**'s prototype object back to the **sub-type** function. 
    - This must be done before you add new methods to the `subtype.prototype`

  ```js
  SubType.prototype = Object.create(SuperType.prototype);
  SubType.prototype.constructor = SubType; // restoring constructor property
  ```

  - Use `call` to use the super-type constructor inside subtype. 

  ```js
  function SubType(parameter1) {
    SuperType.call(this, parameter1, parameter2);
  }
  ```

- `class` and the `extends` keyword is an alternative form of pseudo-classical inheritance. 

  - Inlike pseudo-classical inheritance with constructors and prototypes, a class created with class inheritance inherits <u>all the methods and properties</u> from the parent class/ superclass. 

  - In the constructor and prototype pattern, sub-type usually only inherits from the super-type's `.prototype` object. 

- Example

  ```js
  function Animals() {}
  
  function Cats() {}
  
  Cats.prototype = Object.create(Animals.prototype);
  ```

### Mix-Ins: 

- Definition: A mix-in is an object that defines the common behavior between multiple classes. 

- Definition:  Mix-ins are used to share behavior between otherwise unrelated classes.

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

### Polymorphism

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


## Hierarchy of objects template

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
  - house: cats and humans live indoors. 'has - a ' relationship vs 'is - a' relationship. Cats and humans both have this capability, but are not related to each other. 

## Factory Functions 

- Definition: Factory functions create and return objects of a particular **type**: objects with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments. 

  - Each object created by a factory function has an own copy of all the methods, which is redundant and memory intensive. 
  - Factory functions provide a simple way to automate the creation related objects based on a predefined template. 
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
  - Factory functions can create objects with prototypal inheritance.??

- Mix-ins with factory functions

  - Can use `Object.assign` to mix the return object of one factory function into the instance object of another factory function. 

##### Code Example

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
  let obj = {};
  Object.assign(obj, animal, mixIn); // mix-ins
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
console.log(cat.hasOwnProperty('eep'));

let human = humans('sara');
human.makeNoise();  // sara talks
human.house(); // sara lives in a house
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

## Objects Linking Other Objects (OLOO)

- Defintion: In OLOO, we have a prototype object and use `Object.create` to create new objects that inherit from that prototype. An `init` method defined on the prototype is used to customize the state of each object: initializing newly created objects with their own properties.  `init` returns `this`, a reference to the calling object. 

- Syntax

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


##### Inheritance with OLOO

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


##### Code Example

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

let cats = Object.create(animals); // OLOO, prototypal inheritance
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

## Constructor Functions

- Definition: Like factory functions, constructors are also functions that create objects of the same **type**. Constructors are functions that create and return an instance object of the constructor function. The instance object inherits from the Constructor's `prototype` object. Constructors use the **constructor/prototype pattern** to create objects: the constructor function defines <u>state</u> for the instance object, and constructor's prototype object defines <u>shared behaviors</u> (common methods) in the instance objects. 
  - We use the `new` keyword preceding a function invocation to treat the function as a constructor. 
  - If the function is used as a constructor, the returned object(instance object)'s `[[Prototype]]` will reference the constructor's `prototype` property
  - Inheritance can be emulated by changing where a functions `.prototype` property points to (Just remember to restore where the `.constructor` property points to).

- Constructors vs ordinary functions
  - Like factory functions, constructors are also functions that create objects of the same **type**.
  - What's different is that 
    - Constructor names are capitalized.
    - we call it with the `new` keyword,
    - we use `this` to set the object's properties and methods, and
    - we don't supply an explicit return value (we can, but usually don't).
    - constructors have a `prototype` property that references an object that instance objects inherit from
- Advantage of constructor 
  - Can determine an Object's type(which constructor created the object) using `instanceof` or `constructor` property
  - Memory efficiency: Saves memory because constructors create objects that inherit from constructor's prototype object. So instance objects created by a constructor can have own properties as well as inherited properties, unlike factory functions where inheriting objects must have an own copy of every property.
    - constructors have a prototype property that references an object that instance objects inherit from. 
    - So properties defined on the constructor `prototype` object are shared through the prototype chain. 
    - Instance methods are usually stored in the constructor's `prototype` object rather than directly on the instance object. 
  - Prototypes can be overridden by assigning inheriting objects their own properties. 

- What `new` does

  - `new` creates an entirely new object(the **instance**), with its **own** properties. 
  - It sets the prototype of the new object( instance object's `__proto__` property) to the object that is referenced by the constructor's `prototype` property. 
  - It sets the execution context(value of `this` ) inside the function to point to the new object. 
    - Since `this` refers to the new object, we use it within the function to set the object's properties and methods. 
  - It invokes the constructor function. 
  - Finally, once the function finishes running `new` returns the new object implicitly (automatically); we don't explicitly return anything.

- Constructors use the **constructor/prototype pattern** to create objects, also known as **pseudo-classical** object construction: 

  - In this pattern, we use a constructor function to define <u>state</u>, and prototype object to define <u>shared behaviors</u> (common methods) in the instance objects. 
    -  A constructor creates an instance object with its own properties.
    - The instance object inherits methods from the constructor's prototype object, referenced by `Constructor.prototype`. 

  - Example: 

  ```js
  function Cat(name, age) {
    this.name = name;
    this.age = age;
  }
  
  Cat.prototype.info = function () {
    console.log(`My name is ${this.name}. My age is ${this.age}.`);
  }
  
  let cat = new Cat('Fluffy', 3); // Instantiating a new Cat object.
  cat.info(); // My name is Fluffy. My age is 3.
  ```

  In this code, `cat` object inherits from the `Cat`

##### Inheritance with constructors

- The constructor/prototype pattern forms the basis of **pseudo-classical inheritance**, also called **constructor inheritance**. 

- In **pseudo-classical inheritance**, a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a sub-type inherits from a super-type.

- Syntax

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

##### Code Example

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
Cats.prototype.constructor = Cats;
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

let animal = new Animals('Bobo');
animal.makeNoise(); // Bobo growls.

let cat = new Cats('Fluffy');
cat.makeNoise(); // Fluffy meows.
cat.house();  // Fluffy lives indoors.

let human = new Humans('Sara');
human.makeNoise(); // Sara talks.
human.house(); // Sara lives indoors.


```

## ES6 Classes

##### Definition

- The **class syntax**, a relatively new addition to JavaScript, is syntactic sugar (cleaner syntax) for creating objects that use constructors and prototypes. JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages.
- Why classes? 
  - Using classes, it's possible to do everything you can with the constructor and prototype pattern. However, the class syntax is easier to read and write, and the enforced `new` keyword helps prevent bugs.

- The **class syntax** is **syntactic sugar** - syntax designed to be easier to read or use. 

  - ES6 classes provide a cleaner, more compact alternative to constructors and prototypes.
  - As with functions, they are first-class citizens and come in the form of declarations and expressions. 
  - Functionally, classes behave almost identically to the constructors and prototypes they aim to replace. 

  - Classes allow for static methods by using the `static` modifier.

More Info

##### Precision of Language

- The constructor method initializes a new `Constructor Name` object by assigning the instance properties to the arguments. 

Example

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

##### Syntax & Rules

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

<u>Difference between function and class</u>

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
- Classes look similar to the simplified (concise) method definition / compact method syntax that you can use in object literals.

<u>Class vs constructor/prototype</u>

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
  - Constructor is now a method named `constructor` inside our class instead of being a standalone function.
  -  Other methods have no special meaning; you can define as many as you need. 
  - There are no commas between the properties in class.
  - When we define a method, it gets placed in `Constructor.prototype` object automatically.
  - A significant difference: you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.
  - One minor difference is that `rec.constructor` may produce different results in the two patterns. For example, in Node, logging `rec.constructor` produces `[Function: Rectangle]` for the constructor/prototype example, and `[class Rectangle]` for the class example. This difference is implementation dependent, and not considered significant.

##### How to define a class

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



##### Inheritance with Classes

- The `extends` keyword is used to denote inheritance between classes.
  - The `extends` keyword signifies that the class named to the left of `extends` should inherit from the class specified to the right of `extends`.

- Class inheritance is alternative form of pseudo-classical inheritance. 
- However, unlike pseudo-classical inheritance with constructors and prototypes, a class created with class inheritance inherits <u>all the methods and properties</u> from the parent class/ superclass. 
  - In the constructor and prototype pattern, sub-type usually only inherits from the super-type's `.prototype` object. 

`Super`

- Outside the `constructor` method, `super` keyword refers to the parent class. 

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

- You don't need to use `super` in every subclass constructor, but in most cases you do. 

  - You don't need `super` if the parent constructor and subclass constructor's code / parameters are redundant. 
  - When a sub-class is invoked, the parent constructor is automatically executed. 

- In particular, if the superclass's constructor creates any object properties, you <u>must</u> call `super` to ensure that those properties are set properly. For instance, in the `Rectangle` class above, we create two properties in the `Rectangle` constructor, so we must call `super` in `Square`'s constructor.

  - Also, you must call `super` in subclass' constructor  before you use `this` in that constructor.  

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


##### Code Example

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

- Defining: Declaring a function or class, or using expressions to define a function or class. 