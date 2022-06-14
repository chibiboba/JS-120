# To Do

Important

- [x] Exercise Sets
- [x] Their prompts -1
- [ ] Area of Focus

Extra

- [ ] My own Exercises

- [ ] Quizzes?

- [ ] Rest of exam 1?

  

# Areas of Focus

# this

- Any time `this` occurs outside of a function definition, its value is obvious. The majority of the time, `this` will be used as part of a function definition. In these cases, what `this` refers to depends entirely on how the function is invoked.

# Understanding context loss

- “What are the ways that context can be lost, and how can context loss be prevented in these situations?”
- A complete response needs to clearly indicate the differences between “Implicit” and “Explicit” execution context.

# `Function` Prototype methods and context

- The JS120 “*Functions and Execution Context*” lesson covers the `Function` prototype methods of `call`, `bind`, and `apply`. These methods can be used to set the context of a function. Just like with `Object` methods, I found it helpful to reproduce their behavior with my own functions in order to fully understand how they work.

# Object creation patterns

- The assessment requires detailed knowledge of all of these object creation patterns, including how to implement them and their nuances.
- Needless to say, being able to demonstrate this knowledge with examples on the fly requires a lot of practice.
- A good way to practice is to start from scratch and try to produce a functionally identical hierarchy of objects using each different object creation pattern. This practice is most effective if the hierarchy includes features such as inheritance, mix-ins, and polymorphism in order to illustrate how to implement these aspects in the different patterns.
- Lacking any and all creativity, I usually practiced with something like creating a hierarchy of vehicles using Factory Functions, Objects Linking Other Objects, Constructor Functions, and ES6 Classes. 

# Concepts for Object Creation Patterns

#### Inheritance

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

------

# Hierarchy of objects template

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

# Factory Functions

- Definition: Factory functions are functions that create and return objects of a particular **type**: objects with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments. Each invocation of the factory function specifies the differences between the objects with arguments. 
  - So the factory function handles the similarities (similar methods) , while each invocation specifies the differences between the object properties with arguments.
  - Instance objects created from factory functions have the same exact methods, whereas the property values of each object is customized based on the arguments. 
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
- Inheritance with factory functions

  - Factory functions do not use prototypes or prototypal inheritance. 
  - One factory function can reuse another factory function by using `Object.assign` to mix the object returned by another factory function into itself. 

  - Mix-ins with factory functions: Can use `Object.assign` to mix the return object of one factory function into the instance object of another factory function. 


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

# Objects Linking Other Objects

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

- Init: The initializer method customizes the state(properties) for each object. 

  - `init` is a function that initializes  property values in newly created objects. It also returns `this`, which is a reference to the object that called `init`
    - Returns a reference to the calling object, so we are able to method chain after calling `Object.create`, to refer to that new object!!
  - Similar to the constructor method in classes

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

# Constructor Functions

#### Constructors: 

- Definition: Constructors are functions that create and return an instance object of the constructor function.  
  - Like factory functions, constructors are also functions that create objects of the same **type**: which are objects with a particular set of methods and properties. Like factory functions,  the methods remain the same across the objects, while the property values can be customized by providing them as arguments. Each invocation of a constructor specifies the differences between the instance objects with arguments. 
  - However, the methods that remain the same across the objects,are not the instance object's "own" property, rather, they are inherited from the constructor's prototype object. This gets to the differences between constructors and factory functions.

- constructor vs ordinary functions
  - We use `new` keyword / operator preceding a <u>function invocation</u> to treat the function as a constructor.
  - Every constructor has a `prototype` property that references an object called the **Constructor's `prototype` object / function prototype.** 
  - The instance object created by the constructor inherits from the Constructor's `prototype` object. 
    - The instance object's internal `[[Prototype]]`or `__proto__` property will reference the constructor's `prototype` property. 
    - This lets us set properties on the constructor's `prototype` object so that all instance objects created by the constructor will share them. 
  - Naming convention: Capitalize the name of constructors and classes. Use **PascalCase** for constructor functions and classes. 
  - Use `this` to set object's properties and methods. 
  - Don't supply an explicit return value, because the constructor returns the newly created instance object provided that no errors occur.

Return value of a constructor

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


##### Constructor's `prototype` property

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

##### Terminology confusion:

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

#### Notes

Let's start by writing some code for the animals constructor. As I write code, I will demonstrate how constructor functions work and their differences between factory functions.

- To start, Definition: Constructors are functions that create and return an instance object of the constructor function.
- Like factory functions, constructors are also functions that create objects of the same **type**: which are objects with a particular set of methods and properties. Like factory functions,  the methods remain the same across the objects, while the property values can be customized by providing them as arguments. Each invocation of a constructor specifies the differences between the instance objects with arguments. 

Lets set the `name`parameter as a property on the instance object.

- constructor names are capitalized.
- we use `this` to set instance object's properties and methods. 

```js
function Animals(name) {
  this.name = name;
}
```

This gets to the differences between construcors and factory functions.

- The methods that remain the same across the objects,are not the instance object's "own" property, rather, they are inherited from the constructor's prototype object. This gets to the differences between constructors and factory functions.

-  Constructors have a  `prototype` property that references an object called the **Constructor's prototype object / function prototype.** 
-  The instance object created by the constructor inherits from the Constructor's `prototype` object.
   - The instance object's internal `[[Prototype]]`or `__proto__` property will reference the constructor's `prototype` property. 
-  This lets us set properties on the constructor's `prototype` object so that all instance objects created by the constructor will share them.  

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
>

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
// test code
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

#### Notes

##### Definition: 

- The **class syntax** is syntactic sugar for creating objects that use constructors and prototypes. 
  - **syntactic sugar** means syntax designed to be easier to read or use. 
  - ES6 classes are merely syntactic sugar: the `class` statement gets translated behind the scenes to a constructor function and a prototype object, and the class name refers to the constructor function.

- Why Classes?
  - Using classes, it's possible to do everything you can with the constructor and prototype pattern. However, the class syntax is easier to read and write, and the enforced  `new` keyword helps prevent bugs.
  - JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages.

Differences between class and constructor/prototype pattern

- A significant difference: you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.

- Constructor is now a method named `constructor` inside our class instead of being a standalone function.
- Other methods have no special meaning; you can define as many as you need. 
- There are no commas between the properties in class.
- When we define a method, it gets placed in `Constructor.prototype` object automatically.
- One minor difference is that `rec.constructor` may produce different results in the two patterns. For example, in Node, logging `rec.constructor` produces `[Function: Rectangle]` for the constructor/prototype example, and `[class Rectangle]` for the class example. This difference is implementation dependent, and not considered significant.

##### Completed Code



# Applying knowledge in unusual ways

All that said, one thing that can help is to keep a running list of anything that seems unusual while going through the course materials

- Use an object method to create and store a collaborator object— and then be able to reference that created object ([see this exercise](https://launchschool.com/exercises/4a1f0eb3))
  -  the `addStudent` method in `school` function creates a collaborator object and returns it.
- Pass a class as an argument and return a new object from a function. 

#### Unusual things about the `new` keyword

<u>Who can be a constructor</u>

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

<u>Who can't be a constructor</u>

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

#### Unusual things about arrow functions

- Don't use arrow functions as methods on an object, else it will take global object (even in strict mode) as the surrounding context. 

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

- `forEach` is not considered the enclosing function for arrow functions, why?
- Arrow functions cannot be called with `new` since they lose their surrounding context as the value of `this`. 

# Questions

- Practice problems Factory functions # 4

- Constructor property can be used to create new objects 

  ```js
  let rex = new Terrier();
  let spot = new rex.constructor(); // is invocation syntax necessary? 
  ```

# Their prompts

[reference](https://medium.com/launch-school/my-study-tips-for-the-js129-assessment-646b7f652c9f)

##### Q: See if an Object came from a constructor.

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
```

##### Q: See if an Object came from a constructor (practice)

```js
// Example constructors
function Cat() {}

function Dog() {}

let fluffy = new Cat();
let bobo = new Dog();

// instanceof
console.log(fluffy instanceof Cat);
console.log(bobo instanceof Dog);

// isPrototypeOf
console.log(Cat.prototype.isPrototypeOf(fluffy)); 
console.log(Dog.prototype.isPrototypeOf(bobo));

// constructor property
console.log(fluffy.constructor === Cat);
console.log(bobo.constructor === Dog);
```



------

##### Q: See if an Object came from a constructor --> create your own `instanceof`

Answer: 

- Definition: The operator `instanceof` tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object. The return value is a `boolean` value. In most cases, that means the object on the right is a constructor or class. 

- Syntax

  ```js
  object instanceof Constructor
  ```

- my own `instanceOf`

  ```js
  function isInstanceOf(obj, constructorFunction) {
    while (obj) { // loops until it reaches null
      obj = Object.getPrototypeof(obj);
      if (obj === constructorFunction.prototype) return true;
    }
    
    return false;
  }
  ```

------

##### Q: See if an object is in the prototype chain of another object --> create your own `isPrototypeOf`

Answer: 

- Definition: `Object.prototype.isPrototypeOf()` is an instance object method that determines whether the object is part of another object’s prototype chain. 

- Syntax

  ```js
  obj2.isPrototypeOf(obj1)
  ```

- my own `isPrototypeOf`

  ```js
  function prototypeOf (obj, prototypeObj) {
    while (obj) { // loops until it reaches null
      obj = Object.getPrototypeOf(obj);
      if (obj === prototypeObj) return true;
    }
    
    return false;
  }
  ```

- Testing

  ```js
  // Example constructors
  function Cat() {}
  
  let fluffy = new Cat();
  
  function isPrototypeOf (obj, prototypeObj) {
    while (obj) { // loops until it reaches null
      obj = Object.getPrototypeOf(obj);
      if (obj === prototypeObj) return true;
    }
    
    return false;
  }
  
  console.log(isPrototypeOf(fluffy, Cat.prototype)); // true
  ```

------

##### Q: See if an object contains a property as one of its own -> create your own `hasOwnProperty`

Answer: 

- Definition: `Object.prototype.hasOwnProperty()` is an instance method that takes name of a property as string and returns a `boolean` indicating whether the object has the specified property as its own property (as opposed to inheriting it).

- Syntax

  ```js
  obj.hasOwnProperty(string)
  ```

- My own

  ```js
  // Object.getOwnPropertyNames
  function hasOwnProperty(obj, property) {
    let arr = Object.getOwnPropertyNames(obj);
    return arr.includes(property);
  }
  ```

- Test code

  ```js
  let a = {1: 1};
  console.log(hasOwnProperty(a, '1')); // true
  ```

  

------

##### Q: Return all the property names of an object -> create your own `Object.getOwnPropertyNames`

Answer: 

- Definition: `Object.getOwnPropertyNames()` is a static Object method that returns an array of all of the object's “own” properties (keys) regardless if they’re enumerable or not. 

- Syntax

  ```js
  Object.getOwnPropertyNames(obj)
  ```

- own version

  ```js
  function getOwnPropertyNames(obj) {
    
  }
  ```

  

------

##### Q: Copy all properties from one object to another -> create your own `Object.assign`

Answer: 

- Definition: `Object.assign` is a static object method that copies all <u>enumerable</u> <u>own</u> properties from one or more *source objects* to a *target object*. It then returns the a reference to the modified target object, or the same object is only one argument is passed. 

- Syntax

  ```js
  Object.assign(targetObj, obj)
  Object.assign(Constructor.prototype, mixIn, mixIn ...)
  ```

- own `Object.assign`

  ```js
  function assignObj(targetObj, sourceObj = {}) { // in case one object is passed
    let sourceObjKeys = Object.keys(sourceObj);
    sourceObjkeys.forEach(key => {
      targetObj[key] = sourceObj[key];
    });
    return targetObj;
  }
  ```

- Test code

  ```js
  function Cat() {}
  let fluffy = new Cat();
  
  console.log(assignObj({1: 1}, {2: 2})); // {'1': 1, '2': 2}
  console.log(assignObj(Cat.prototype, {2: 2})) // {'2': 2}
  ```


------

# Problems about prototypes

##### Q: Searching prototype chain

(from practice problems: lesson 2)

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

```js
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

```js
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

```js
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

```js
let bareObj = Object.create(null);
```

##### Q: What is a bare object?

Object without a prototype. (Object created with a `null` prototype.)

##### **Q: How can you determine whether an object has a prototype?**

```js
if (Object.getPrototypeOf(obj)) {
  // obj has a prototype
} else {
  // obj does not have a prototype
}
```

#####  **Q: What value does `Object.getPrototypeOf({})` return?**

The default prototype object.

##### Q: What does this code mean?

```js
if (Object.getPrototypeOf(obj) && obj.isPrototypeOf(car)) {
  // obj has a non-null prototype AND
  // obj is in the prototype chain of car
}
```

------

# My Prompts

##### Q: Explain the difference between the constructor's prototype object and an object's prototype.

- <u>Constructor's `prototype` property</u>

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

- <u>**An object's prototype**</u> 

  - In most cases, when we talk about a **prototype** without being more explicit, we mean an **object prototype**.

  - Referenced by  dunder proto `__proto__` or hidden `[[Prototype]]` property

  - An **object's prototype**  is what an inheriting object's `[[Prototype]]` or `__prototype__` property references. 
    - It is the object that the current object inherits from. 
    - If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. 

Why it's confusing

- By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.
- The inheriting object's prototype, referenced by dunder proto and hidden `[[prototype]]` property, will usually reference `Constructor.prototype` (constructor `prototype` property) given that the constructor is the constructor function that created that object. 
  - In other words, If a function is used as a constructor, the returned object(instance object)'s `[[Prototype]]` will reference the constructor's prototype property. 

##### Q: Determining an Object's type

- Many object-oriented languages, like Java or C++, have a strong notion of object types. In most such languages, it's easy to determine the object's type, such as a dog or car. 
- JavaScript, however, treats objects and their types in a looser, more dynamic way. You can't determine the specific type of arbitrary JavaScript objects; they are dynamic structures with a type of `object`, no matter what properties and methods they have. 
- However, we can get some useful information about an object if we know which constructor created it.

- Remember that the `new` operator creates a new object. Suppose that you call the Car constructor with `new`. Informally, we can say that the resulting object is a car. More formally, we can say that the object is an **instance** of a `Car`.

The `instanceof` operator lets us determine whether a given constructor created an object:

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

One effect that we didn't mention when talking about the `new` operator is that the object it returns contains some information (the prototype chain) that ties it back to the constructor that created the object. The `instanceof` operator uses that information to determine what constructor created the object. 

Definition: The operator `instanceof` tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object. The return value is a `boolean` value. 

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

```js
// using instanceof 
function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last); // need return statement to avoid side effects
  }
  
  this.name = `${first} ${last}`;
  
}
```

```js
// using isPrototypeOf
function User(first, last) {
  if (!(User.prototype.isPrototypeOf(this))) {
    return new User(first, last);
  }
  
  this.name = `${first} ${last}`;
}
```



##### Q: What does this code log, and why does it log what it does?

```js
let obj = {
  foo() {
    return this;
  }
};

let foo = obj.foo;
console.log(foo());
```

Answer : This code logs undefined. On line 7, `foo` is assigned to the `foo` method in `obj`. On line 8, `foo` is invoked as a standalone function, or regular function call. Regular function calls, when in strict mode, have an implicit execution context of `undefined`. The function call returns `this`, which references the implicit execution context of `undefined`. 

------

##### Q: Create your own `Array.from` 

Answer: 

- Definition: `Array.from` Takes an array-like object as argument and returns a new array with the equivalent element values.

- Syntax

  ```terminal
  > Array.from({0: 'a', 1: 'b', 2: 'c', length: 3})
  ['a', 'b', 'c']
  
  > Array.from(‘string’)
  [‘s’, ‘t’, ‘r’, ‘i’, ‘n’, ‘g’]
  
  ```

```js

```

------

##### Q: string primitive vs `String`object

Answer: 

A string primitive's type is `'string'`, but the `String` object's type is `'object'`. JavaScript considers the two types of string as different types. Two string primitives that have the same value are equal, two `String` objects with the same value are not. For example

```terminal
> 'xyz' === 'xyz'
true

> new String('xyz') === new String('xyz')
false
```

------

##### Q: how can we call object or array methods on string primitives?

Answer: 

We can call use a string primitive value to access the properties and methods defined for String objects, because when we try to access a property or invoke a method on a string primitive, JavaScript wraps the string primitive in a `String` object, then uses the object to access properties or call methods. When the wrapping object has served its purpose, JavaScript discards that wrapping object. Properties and methods will always return strings as primitives.

##### Q: Log the name of constructor to which the code belongs to. What "type" is this code?

```js
console.log("Hello");
console.log([1,2,3]);
console.log({name: 'Srdjan'});
```

Expected Output

```
String
Array
Object
```

```js
console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);
```

The `constructor` property returns a reference to the `Object` constructor function that created the instance object. This constructor function has access to `name` property which returns the function's name as specified when it was created.

# My Own Exercises

##### Maybe redo

- [ ] JS 120 exercises easy # 11 https://launchschool.com/exercises/2b521c67
- [ ] 



##### Q: Rewrite these two classes to use constructor/prototype pattern. 

```js
class Person {
  greeting (text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting (text) {
    super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.
```

```js
// solution
function Person() {
}
Person.prototype.greeting = function(text) {
  console.log(text);
}

function Shouter() {
  Person.call(this);
}
Shouter.prototype = Object.create(Person.prototype)
Shouter.prototype.greeting = function(text) {
  Person.prototype.greeting.call(this, text.toUpperCase());
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.
```

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
```

```js
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



# JS 120 Exercise Sets

[Reference](https://launchschool.com/exercises#js120_object_oriented_javascript)

### Easy

1. ```js
   class Rectangle {
     constructor(width, length) {
       this.width = width;
       this.length = length;
   	}
     
     getWidth() {
       return this.width;
     }
     
     getLength() {
       return this.Length
     }
     
     getArea() {
       return this.width * this.length;
     }
   }
   ```

2. ```js
   class Square extends Rectangle {
     constructor(size) {
       super(size, size);
     }  
   }
   ```

3. ```js
   class Cat {
     constructor(name) {
       this.name = name;
     }
     speaks() {
       return `${this.name} says meowwww.`;
     }
   }
   
   let fakeCat = Object.create(Cat.prototype);
   console.log(fakeCat instanceof Cat); // logs true
   console.log(fakeCat.name);           // logs undefined
   console.log(fakeCat.speaks());       // logs undefined says meowwww.
   ```

4. ```js
   class Pet {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }
   
   class Cat extends Pet {
   
   }
   
   let pudding = new Cat('Pudding', 7, 'black and white');
   let butterscotch = new Cat('Butterscotch', 10, 'tan and white');
   
   console.log(pudding.info());
   console.log(butterscotch.info());
   ```

5. ```js
   class Animal {
     constructor(name, age, legs, species, status) {
       this.name = name;
       this.age = age;
       this.legs = legs;
       this.species = species;
       this.status = status;
     }
     introduce() {
       return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
     }
   }
   
   class Cat extends Animal {
     constructor(name, age, status) {
       super(name, age, 4, 'cat', status);
     }
   
     introduce() {
       return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}. Meow meow!`
     }
   }
   
   class Dog extends Animal {
     constructor(name, age, status, master) {
       super(name, age, 4, 'dog', status);
       this.master = master;
     }
   
     greetMaster() {
       return `Hello ${this.master}! Woof, woof!`;
     }
   }
   let cat = new Cat("Pepe", 2, "happy");
   console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
   // logs true
   ```

6. ```js
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

7. ```js
   class Something {
     constructor() {
       this.data = "Hello";
     }
   
     dupData() {
       return this.data + this.data;
     }
   
     static dupData() {
       return "ByeBye";
     }
   }
   
   let thing = new Something();
   console.log(Something.dupData());
   console.log(thing.dupData());
   ```

   ```
   ByeBye
   HelloHello
   ```

   

8. ```js
   class Person {
     greeting (text) {
       console.log(text);
     }
   }
   
   class Shouter extends Person {
     greeting (text) {
       super.greeting(text.toUpperCase());
     }
   }
   
   let person = new Person();
   let shouter = new Shouter();
   
   person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
   shouter.greeting("Hello my friend."); // HELLO MY FRIEND.
   ```

9. ```js
   let mixIn = {
     walk() {
       return `${this.name} ${this.gait()} forward`;
     }
   };
   
   class Person {
     constructor(name) {
       this.name = name;
     }
   
     gait() {
       return "strolls";
     }
   }
   
   Object.assign(Person.prototype, mixIn);
   
   class Cat {
     constructor(name) {
       this.name = name;
     }
   
     gait() {
       return "saunters";
     }
   }
   
   Object.assign(Cat.prototype, mixIn);
   
   class Cheetah {
     constructor(name) {
       this.name = name;
     }
   
     gait() {
       return "runs";
     }
   }
   
   Object.assign(Cheetah.prototype, mixIn);
   
   let mike = new Person("Mike");
   console.log(mike.walk());
   // "Mike strolls forward"
   
   let kitty = new Cat("Kitty");
   console.log(kitty.walk());
   // "Kitty saunters forward"
   
   let flash = new Cheetah("Flash");
   console.log(flash.walk());
   // "Flash runs forward"
   ```

##### 10: Pet Shelter

https://launchschool.com/exercises/2b521c67

```js
let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
```

Consider the code above. Write the classes and methods that will be necessary to make this code run, and log the following output:

```plaintext
P Hanson has adopted the following pets:
a cat named Butterscotch
a cat named Pudding
a bearded dragon named Darwin

B Holmes has adopted the following pets:
a dog named Molly
a parakeet named Sweetie Pie
a dog named Kennedy
a fish named Chester

P Hanson has 3 adopted pets.
B Holmes has 4 adopted pets.
```

```js
class Pet {
  constructor(animal, name) {
    this.animal = animal;
    this.name = name;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.owners = {};
  }

  adopt(owner, pet) {
    owner.addPet(pet);
    if (!this.owners[owner.name]) {
      this.owners[owner.name] = owner;
    }
  }

  printAdoptions() {
    for (let ownerName in this.owners) {
      let owner = this.owners[ownerName];
      console.log(`${ownerName} has adopted the following pets:`);
      owner.pets.forEach(pet => {
        console.log(`a ${pet.animal} named ${pet.name}`);
      });
      console.log();
    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);
```

11. 

```js
class Banner {
  constructor(message) {
    this.message = message;
    this.length = this.message.length;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.length)}-+`;
  }

  emptyLine() {
    return `| ${' '.repeat(this.length)} |`;
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

// let banner2 = new Banner('');
// banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+
```

### Objects

1: buggy code

2: buggy code : mutating object

```js
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;
    this.price -= discount; // error here
    
    return this.price;
  },
};
```

```terminal
> item.discount(20)   // should return 40
= 40
> item.discount(50)   // should return 25
= 20
> item.discount(25)   // should return 37.5
= 15
```

```js
let item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount: function(percent) {
    let discount = this.price * percent / 100;  
    return this.price - discount;
  },
};
```

##### 3: Testing Object Equality ( key/ value pairs)

[reference](https://launchschool.com/exercises/f387cdf5)

In JavaScript, comparing two objects either with `==` or `===` checks for object identity. In other words, the comparison evaluates as true if it's the same object on either side of `==` or `===`. This is a limitation, in a sense, because sometimes we need to check if two objects have the same key/value pairs. JavaScript doesn't give us a way to do that.

Write a function `objectsEqual` that accepts two object arguments and returns `true` or `false` depending on whether the objects have the same key/value pairs.

```js
console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
```

```js
// my solution
function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  return checkKeys(obj1, obj2) && checkValues(obj1, obj2);
}

function checkKeys(obj1, obj2) {
  let keys1 = Object.getOwnPropertyNames(obj1).sort();
  let keys2 = Object.getOwnPropertyNames(obj2).sort();

  if (keys1.length !== keys2.length) return false;

  return keys1.every((_, index) => {
    return keys1[index] === keys2[index];
  });
}

function checkValues(obj1, obj2) {
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
```

```js
// solution
function objectsEqual(a, b) {
  if (a === b) {
    return true;
  }

  return (keysMatch(a, b) && valuesMatch(a, b));
}

function keysMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();
  let bKeys = Object.getOwnPropertyNames(b).sort();

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key, index) => {
    return key === bKeys[index];
  });
}

function valuesMatch(a, b) {
  let aKeys = Object.getOwnPropertyNames(a).sort();

  return aKeys.every(key => a[key] === b[key]);
}
```

##### 4: Student

https://launchschool.com/exercises/0a8aaa5c

Create an object factory for a student object. The student object should have the following methods and it should produce the expected results demonstrated in the sample code:

- `info`: Logs the name and year of the student.
- `addCourse`: Enrolls student in a course. A course is an object literal that has properties for its `name` and `code`.
- `listCourses`: Returns a list of the courses student has enrolled in.
- `addNote`: Adds a `note` property to a course. Takes a `code` and a `note` as an argument. If a note already exists, the `note` is appended to the existing one.
- `updateNote`: Updates a `note` for a course. Updating a note replaces the existing note with the new note.
- `viewNotes`: Logs the notes for all the courses. Courses without notes are not displayed.

```js
// test code

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
```

```js
// my solution
function createStudent(name, year) {
 return {
   name: name, 
   year: year, 
   courses: [],

   info () {
    console.log(`${this.name} is a ${this.year} student`);
   },

   addCourse(course) {
    this.courses.push(course);
   }, 

   listCourses() {
    console.log(this.courses);
   }, 

   addNote(code, note) {
     // find that courseObj
    let course = this.courses.find(course => {
      return course['code'] === code;
    });

    if (course.note) {
      course.note = `${course.note}; ${note} `
    } else {
      course.note = note;
    }
   }, 

   viewNotes() {
    this.courses.forEach(course => {
      if (course.note) {
        console.log(`${course.name}: ${course.note}`);
      }
    });
   },

   updateNote(code, note) {
    let course = this.courses.find(course => {
      return course.code === code;
    });

    course.note = note;
   },
 }
}
```

##### 5: School

Unusual: Use an object method to create and store a collaborator object— and then be able to reference that created object ([see this exercise](https://launchschool.com/exercises/4a1f0eb3)) --> the `addStudent` method in `school` function creates a collaborator object and returns it.

Create a `school` object. The `school` object uses the `student` object from the previous exercise. It has methods that use and update information about the student. Be sure to check out the previous exercise for the other arguments that might be needed by the `school` object. Implement the following methods for the school object:

- `addStudent`: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: `'1st'`, `'2nd'`, `'3rd'`, `'4th'`, or `'5th'`. Returns a student object if year is valid otherwise it logs "Invalid Year".
- `enrollStudent`: Enrolls a student in a course.
- `addGrade`: Adds the grade of a student for a course.
- `getReportCard`: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
- `courseReport`: Logs the grades of all students for a given course name. Only student with grades are part of the course report.

To test your code, use the three student objects listed below. Using the three student objects, produce the following values from the `getReportCard` and `courseReport` methods respectively.

```javascript
// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects
foo;
{
  name: 'foo',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

bar;
{
  name: 'bar',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

qux;
{
  name: 'qux',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
   ],
}
```

```terminal
> school.getReportCard(foo);
= Math: 95
= Advanced Math: 90
= Physics: In progress
```

```terminal
> school.courseReport('Math');
= =Math Grades=
= foo: 95
= bar: 91
= qux: 93
= ---
= Course Average: 93

> school.courseReport('Advanced Math');
= =Advanced Math Grades=
= foo: 90
= qux: 90
= ---
= Course Average: 90

> school.courseReport('Physics');
= undefined
```

Hint:

The challenge for this question is locating the student to enroll, add a grade to, and generate the report card for. The key here is the returned value of the `addStudent` method.

```js
// test code
let school = createSchool();

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);
school.getReportCard(foo);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);
school.getReportCard(bar);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);
school.getReportCard(qux);

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');
```

```js
// my solution
function createSchool() {
  return {
    students: [],

    addStudent(name, year) {
      if (['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
        let student = createStudent(name, year);
        this.students.push(student);
        return student;
      } else {
        console.log('Invalid Year');
      }
    }, 

    enrollStudent(student, courseName, code) {
      student.addCourse({name: courseName, code: code});
    }, 

    addGrade(student, courseName, grade) {
      let course = student.courses.find(course => {
        return course.name === courseName;
      });

      course.grade = grade;
    }, 

    getReportCard(student) {
      student.courses.forEach(course => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    },

    courseReport(courseName) {
      let grades = [];
      console.log(`== ${courseName} Grades ==`);

      this.students.forEach(student => {
        let course = student.courses.find(course => {
          return course.name === courseName;
        });
      
        if (course && course.grade) {
          console.log(`${student.name}: ${course.grade}`);
          grades.push(course.grade);
        }
      });
      
      console.log(`---`);
      let courseSum = grades.reduce((a, b) => a + b, 0);
      let average = courseSum / grades.length;

      if (average > 0) {
        console.log(`Course Average: ${average}`);
      } else {
        console.log(undefined);
      }
    },
  };
}
```

### Function Context

https://launchschool.com/exercise_sets/59a39649

1. ```js
   let person = {
     firstName: 'Rick ',
     lastName: 'Sanchez',
     fullName: this.firstName + this.lastName,
   };
   
   console.log(person.fullName);
   ```

​		`NaN` is logged because `undefined + undefined` evaluates to `NaN`. `this` refers to the global object, because although we are in strict mode, `this` is outside of a function definition, so its bound to the global object. There are no `firstName` or `lastName` properties on the global object so they evaluate to `undefined`.

2. The method `franchise.allMovies` is supposed to return the following array:

   ```javascript
   [
     'How to Train Your Dragon 1',
     'How to Train Your Dragon 2',
     'How to Train Your Dragon 3'
   ]
   ```

   Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.

   ```javascript
   let franchise = {
     name: 'How to Train Your Dragon',
     allMovies: function() {
       return [1, 2, 3].map(function(number) {
         return this.name + ' ' + number;
       });
     },
   };
   ```

Solution: 	

Function as arguments lose their surrounding execution context.

```js
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }, this);
  },
};
```

3. ```js
   // passing a hard bound function to map
   let franchise = {
     name: 'How to Train Your Dragon',
     allMovies: function() {
       return [1, 2, 3].map(function(number) {
         return this.name + ' ' + number;
       }.bind(this));
     },
   };
   ```

4. In this exercise, we'll update an implementation of `myFilter` by adding the functionality of accepting an optional `thisArg` just like the original [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Parameters).

   Here's an implementation. We also show an example of how we want to call our modified function: the 3rd argument, `filter`, supplies the desired context (`thisArg`).

   ```javascript
   function myFilter(array, func) {
     let result = [];
   
     array.forEach(function(value) {
       if (func(value)) {
         result.push(value);
       }
     });
   
     return result;
   }
   
   let filter = {
     allowedValues: [5, 6, 9],
   }
   
   myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
     return this.allowedValues.indexOf(val) >= 0;
   }, filter); // returns [5, 6, 9]
   ```

   Modify the implementation such that the expected result is returned. Don't use the `thisArg` argument of `Array.prototype.forEach`.

   ```js
   function myFilter(array, func, thisArg) {
     let result = [];
   
     array.forEach(function(value) {
       if (func.call(thisArg, value)) {
         result.push(value);
       }
     });
   
     return result;
   }
   ```

   The solution is straightforward. Since there is always only one argument at a time passed to the callback function of `myFilter`, the solution uses `Function.prototype.call` on it and passes it the `thisArg` and `value` arguments.

### OO Basics: Classes

https://launchschool.com/exercise_sets/f675a2e9

##### 1: Name the Constructor

```js
console.log("Hello");
console.log([1,2,3]);
console.log({name: 'Srdjan'});
```

```
String
Array
Object
```

```js
console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);
```

The `constructor` property returns a reference to the `Object` constructor function that created the instance object. This constructor function has access to `name` property which returns the function's name as specified when it was created.

2. ```js
   class Cat {
     
   }
   ```

3. ```js
   let kitty = new Cat();
   ```

4. ```js
   class Cat {
     constructor() {
       console.log(`I'm a cat!`);
     }
   }
   
   let kitty = new Cat();
   ```

   When defining a class, you usually need to define the `constructor` method.

   Adding this method lets us execute certain statements when a new `Cat` object is initialized. In this case, we want to log `I'm a cat!`. We accomplish this by using `console.log()`.

5. ```js
   class Cat {
     constructor() {
     }
   }
   
   let kitty = new Cat('Sophie');
   ```

   ```js
   class Cat {
     constructor(name) {
       this.name = name;
       console.log(`Hello! My name is ${this.name}!`);
     }
   }
   
   let kitty = new Cat('Sophie');
   ```

   The `Cat` constructor expects one parameter: `name`. When it is called with the `new` keyword, it assigns the received parameter to the `name` property of the current instance. The property `name` can be accessed anywhere within the class using `this` keyword.

   To appease the exercise requirements, we only need to reference property `name` immediately following its initialization. We use `console.log()` to log `Hello! My name is Sophie` to the console. In this object, `'Sophie'` is dynamic, which means we used property `name` to print the value. `'Sophie'` could just as easily be `'Oliver'` if that string was passed instead of `'Sophie'`, like this:

   ```js
   class Cat {
     constructor(name) {
       this.name = name; // => Oliver
     }
   }
   
   let kitty = new Cat('Oliver');
   ```

   

6. ```js
   class Cat {
     constructor(name) {
       this.name = name;
       console.log(`Hello! My name is ${this.name}!`);
     }
   }
   
   let kitty = new Cat('Sophie');
   kitty.greet();
   ```

   ```js
   class Cat {
     constructor(name) {
       this.name = name;
     }
     greet() {
        console.log(`Hello! My name is ${this.name}!`);
     }
   }
   
   let kitty = new Cat('Sophie');
   kitty.greet();
   ```

7. ```js
   class Person {
     constructor(name = 'John Doe') {
       this.name = name;
    
     }
   }
   ```

8. ```js
   class Cat {
     constructor(name) {
       this.name = name;
     }
     
     rename(newName) {
       this.name = newName;
     }
   }
   
   let kitty = new Cat('Sophie');
   console.log(kitty.name); // Sophie
   kitty.rename('Chloe');
   console.log(kitty.name); // Chloe
   ```

9. ```js
   class Cat {
    static genericGreeting() {
      console.log(`Hello! I'm a cat!`);
    }
   }
   
   Cat.genericGreeting();
   ```

10. ```js
    class Cat {
      constructor(name) {
        this.name = name;
      }
      
      static genericGreeting() {
        console.log(`Hey I'm a cat`);
      }
      
      personalGreeting() {
        console.log(`Hi my name is ${this.name}`);
      }
    }
    
    let kitty = new Cat("Sophie");
    Cat.genericGreeting();
    kitty.personalGreeting();
    ```

### OO Basics: Inheritance and Mixins

https://launchschool.com/exercise_sets/80d91cb2

1. ```js
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   }
   
   Truck extends Vehicle {}
   
   Car extends Vehicle {}
   
   let truck = new Truck(2003);
   console.log(truck.year); // 2003
   
   let car = new Car(2015);
   console.log(car.year); // 2015
   ```

2. ```js
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   }
   
   class Truck extends Vehicle {
     constructor(year) {
       super(year);
       this.startEngine();
     }
     
     startEngine() {
       console.log('Ready to go!')
     }
   }
   
   let truck = new Truck(2003);
   console.log(truck.year); // 2003
   ```

3. ```js
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   }
   
   class Truck extends Vehicle {
     constructor(year, bedType) {
       super(year);
       this.bedType = bedType;
     }
   }
   
   class Car extends Vehicle {}
   
   let truck1 = new Truck(2003, 'Short');
   console.log(truck1.year);
   console.log(truck1.bedType);
   ```

4. ```js
   class Vehicle {
     startEngine() {
       return 'Ready to go!';
     }
   }
   
   class Truck {
     startEngine(speed) {
       return super.startEngine + `Drive ${speed}, please!`;
     }
   }
   
   let truck1 = new Truck();
   console.log(truck1.startEngine('fast'));
   
   let truck2 = new Truck();
   console.log(truck2.startEngine('slow'));
   ```

5. ```js
   let walkMixin = {
     walk() {
       console.log(`Let's go for a walk!`);
     }
   };
   
   class Cat {
     constructor(name) {
       this.name = name;
     }
   
     greet() {
       return `Hello! My name is ${this.name}!`;
     }
   }
   
   Object.assign(Cat.prototype, walkMixin);
   
   let kitty = new Cat("Sophie");
   console.log(kitty.greet());
   console.log(kitty.walk());
   ```

6. ```js
   const swimMixin = {
     swim() {
       return `${this.name} is swimming.`;
     }
   }
   
   class Fish {
     constructor(name) {
       this.name = name;
     }
   }
   
   class Dog {
     constructor(name) {
       this.name = name;
     }
   }
   
   class Maltese extends Dog {}
   
   Object.assign(Fish.prototype, swimMixin);
   Object.assign(Maltese.prototype, swimMixin);
   
   let dog1 = new Maltese("Buddy");
   let fish1 = new Fish("Nemo");
   
   console.log(dog1.swim());
   console.log(fish1.swim());
   ```

7. g

8. ```js
   const towMixin = {
     tow() {
       return "I can tow a trailer!";
     }
   }
   
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   }
   
   class Truck extends Vehicle {
     constructor(year) {
       super(year);
       Object.assign(this, towMixin); // adds a copy of the mixed-in methods directly to each new instance object.
     }
   }
   
   class Car extends Vehicle {}
   
   let truck = new Truck(2002);
   console.log(truck.year);
   console.log(truck.tow());
   
   let car = new Car(2015);
   console.log(car.year);
   ```

9. 

### Object Creation Patterns

##### 1: Ancestors

https://launchschool.com/exercises/7f3cd322

Implement an `ancestors` method that returns the prototype chain (ancestors) of a calling object as an array of object names. Here's an example output:

```javascript
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

```js
// my solution
Object.prototype.ancestors = function() {
  let ancestors = [];
  let obj = this;
  while (Object.getPrototypeOf(obj) !== null) {
    let ancestor = Object.getPrototypeOf(obj);
    if ('name' in ancestor) {
      ancestors.push(ancestor.name);
    } else {
      ancestors.push(`Object.prototype`);
    }
    obj = ancestor;
  }
  console.log(ancestors);
}
```

- Be mindful when adding methods to built-in Objects (e.g, `String.prototype`, `Object.prototype`. It may lead to confusing code and can have unintended consequences.

```js
// their solution (recursive)
Object.prototype.ancestors = function ancestors() {
  let ancestor = Object.getPrototypeOf(this);

  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }

  return ['Object.prototype'];
};
```

The problem lends itself well to a recursive solution. The resulting array is incrementally built by recursively calling on the `Object.prototype.ancestors` method. The base case is when `ancestor` does not have a `name` property anymore because it means that `ancestor` is `Object.prototype` already. When this is the case, there are no more prototype objects to add. The key for this solution is recognizing that the value of `this` is the calling object and that we have to add the `ancestors` method on `Object.prototype` so that all objects have access to it.

##### 2: Classical Object Creation

https://launchschool.com/exercises/a66716f6

Implement the following diagram using the pseudo-classical approach. Subclasses should inherit all of the superclass's methods. Reuse the constructors of the superclass when implementing a subclass.



![img](https://dbdwvr6p7sskw.cloudfront.net/js-exercises/object_creation_patterns/Classical.png)



For the methods, you can have it log out anything you want.

```js
// test code
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
```

The solution is a bit long, but it's not complicated. The points to note are the following:

- Use of `Function.prototype.call` to have the subclass "inherit" properties from the parent class.
- Use of `Function.prototype = Object.create(obj)` to "inherit" methods from the parent class.
- Use of `Function.prototype.constructor` to manually reset the property to point back to the appropriate constructor.

```js
// solution using constructor/prototype pattern of pseudo-classical inheritance.
function Person(firstName, lastName, age, gender) {
  this.firstName = firstName; 
  this.lastName = lastName;
  this.age = age; 
  this.gender = gender;
}

Person.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

Person.prototype.communicate = function () {
  console.log('communicating');
}

Person.prototype.eat = function() {
  console.log('eating');
}

Person.prototype.sleep = function() {
  console.log('sleeping');
}


function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function () {
  console.log('diagnosing');
}

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function () {
  console.log('studying');
}

function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender, degree);
  this.graduateDegree = graduateDegree;
}

GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function () {
  console.log('researching');
}
```



##### 3: Circular Queue

https://launchschool.com/exercises/1becc424

```js
// easier solution
class CircularQueue {
  constructor(buffer) {
    this.buffer = buffer;
    this.arr = [];
  }

  enqueue(num) {
    if (this.arr.length < this.buffer) {
      this.arr.push(num);
    } else {
      this.dequeue();
      this.arr.push(num);
    }
  }

  dequeue() {
    return this.arr.shift() || null; 
  }
}
```

```js
// using fill()
class CircularQueue {
  constructor(bufferSize) {
    this.bufferSize = bufferSize;
    this.queue = new Array(bufferSize).fill(null);
  }

  enqueue(obj) {
    if (this.queue.every(elem => elem !== null)) {
      this.dequeue();
    }
    let positionOfNull = this.queue.indexOf(null);
    this.queue[positionOfNull] = obj;
  }

  dequeue() {
    if (this.queue.every(elem => elem === null)) return null;
    let oldestObj = this.queue.shift();
    this.queue.push(null);
    return oldestObj;
  }
}
```

# Redo Quizzes

#### Lesson 1

[reference](https://launchschool.com/lessons/fb892747/assignments/271844ae)

#### Lesson 2

<u>**Quiz 1: [reference](https://launchschool.com/lessons/1eaf5e37/assignments/39b60e49)**</u>https://launchschool.com/lessons/1eaf5e37/assignments/39b60e49)

<u>**Quiz 2: [reference](https://launchschool.com/lessons/1eaf5e37/assignments/69e660e6)**</u>

#### Lesson 3

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/cb0a5ff7)

[Question 9](https://launchschool.com/quizzes/03e8241a) 0 / 1 Points

Your program needs to change the case of all letters in a string to the opposite case. That is, `Naveed Fida` should be converted to `nAVEED fIDA`. You already have a function called `convertCase` that does this for a single character. It takes a single character as an argument and returns the translated result.

Given the `convertCase` function, which of the following code snippets can be used to convert the string contained by `str`? Select all answers that apply.

Toggle Answer Display

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

#### Lesson 4

[reference**](https://launchschool.com/lessons/d5964d17/assignments/b3268d0b)



# Redo Exam Part 1

- [ ] 1
- [x] 2
- [x] 3 - static variables.

- [x] 4
- [x] 5
- [x] 6
- [ ] 7
- [ ] 8
- [x] 9
- [ ] 10
- [ ] 11
- [ ] 12
- [ ] 13
- [x] 14
- [ ] 15

# Exam Part 1 Redo

##### 1

##### 2 

[Question 2 ](https://launchschool.com/exams/19f6d031)5 / 5 Points**Ok**

Examine the two code examples below:

**Example 1**

```javascript
let sarah = {
  name: 'Sarah',
  introduce() {
    console.log(`Hi, my name's ${this.name}`);
  },
};

let paul = {
  name: 'Paul',
};

sarah.introduce();
```

The execution context of introduce is `sarah` because introduce is invoked as a method call by the `sarah` object. Method calls use the calling object as implicit execution context. 

**Example 2**

```javascript
let sarah = {
  name: 'Sarah',
  introduce() {
    console.log(`Hi, my name's ${this.name}`);
  },
};

let paul = {
  name: 'Paul',
};

sarah.introduce.call(paul);
```

For each example, identify the execution context of `introduce`. Explain how you determined the execution context, and outline the difference between the execution context in the two examples.

##### 3

[Question 3 ](https://launchschool.com/exams/19f6d031)5 / 5 Points**Ok**

The code below defines a constructor function, `Book`, and adds a method, `read`, to the prototype of that constructor:

```javascript
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.prototype.read = function() {
  console.log(`Reading ${this.title}`);
};
```

Objects created by this constructor have `title` and `author` properties, as well as a `read` method. However, we now need to add an `allTitles` method that returns an array of the titles of all the books created by the constructor. Think about where the array and the method should live and then update the code to create the array and implement the method.

```js
function Book(title, author) {
  this.title = title;
  this.author = author;
}

Book.titles = [];

Book.prototype.read = function() {
  console.log(`Reading ${this.title}`);
};

Book.allTitles = function() {
  return Book.titles;
}

let book1 = new Book('A', 'A author');
book1.read(); // Reading C
let book2 = new Book('B', 'B Author');
book2.read(); // Reading A
console.log(Book.allTitles()); // ['A', 'B'];
```



##### 4

[Question 4 ](https://launchschool.com/exams/19f6d031)3 / 3 Points**Ok**

Rewrite your answer from the previous question using classes.

```js
class Book {
  constructor (title, author) {
    this.title = title;
    this.author = author;
  }
  
  static titles = [];

  read = function() {
    Book.titles.push(this.title);
    console.log(`Reading ${this.title}`);
  }

  static allTitles = function () {
  return Book.titles;
  }
}

let a = new Book('A', 'Author A');
a.read();

let b = new Book('B', 'Author B');
b.read();

console.log(Book.allTitles());
```

##### 5

[Question 5 ](https://launchschool.com/exams/19f6d031)6 / 6 Points**Ok**

Examine the following code snippets:

snippet 1

```js
let obj = {
  foo() {
    return this;
  }
};

console.log(obj.foo());
```

This code logs `obj`. `foo` is invoked as a method. Method invocations use the calling object as implicit execution context. The calling object is `obj`. 

snippet 2

```js
let obj = {
  foo() {
    return this;
  }
};

let foo = obj.foo;
console.log(foo());
```

This code logs undefined. On line 7, `foo` is assigned to the `foo` method in `obj`. On line 8, `foo` is invoked as a standalone function, or regular function call. Regular function calls, when in strict mode, have an implicit execution context of `undefined`. The function call returns `this`, which references the implicit execution context of `undefined`. 

snippet 3

```js
let obj = {
  foo() {
    return this;
  }
};

let obj2 = {
  bar: 42,
  foo() {
    console.log(this.bar);
  }
};

console.log(obj.foo.call(obj2));
```

This code logs the return value of the method invocation `obj.foo` . `obj.foo` is invoked with an explicit execution context of `obj2`. Thus, `obj2` is returned and logged to the console. 

What does each snippet log, and why does it log what it does?

Snippet 1 logs `{ foo: [Function: foo] }`, which is the object `obj`. `foo` is invoked as a method so its implicit execution context is the calling object `obj`. `this` is the return value of the `foo`, and since `this` keyword inside `foo` references the object `obj`, `obj` is logged to the console.

Snippet 2 logs the global object. That is because `foo` is invoked as a regular function. Regular function calls have an implicit execution context that is set to the global object. `this` is the return value of the `foo` method, and since `this` references the global object, that is what is logged to the console. Inside node, the global object is `global`. In the window, global object is named `Window`.

Snippet 3 logs `{ bar: 42, foo: [Function: foo] }`, which is `obj2`. Here, `call` invokes the method `foo` with explicit execution context set to `obj2`. The `foo` method in `obj` returns the value of `this`. Since `this` now references `obj2`, `obj2` is returned and logged to the console.**Ok**

##### 6

[Question 6 ](https://launchschool.com/exams/19f6d031)5 / 5 Points**Ok**

What does the following code do? Explain why it does that.

```js
let obj = {
  a: "hello",
  b: "world",
  bar: {
    a: "completely",
    b: "different",
  },
  foo: function() {
    return `${this.a} ${this.b}`;
  },
};

let qux = obj.foo.bind(obj.bar);
console.log(qux());
```

This code logs the string `completely different`. On line 13, variable `qux` is declared and assigned to a function whose execution context is permanently bound to the object referenced by `obj.bar`. `bind` returns a new function that is permanently bound to the context passed to it as first argument. When that function is invoked on line 14, that function calls on the original method `obj.foo` with `obj.bar` as the execution context. The return value is ``${this.a} ${this.b}` which resolves to `completely different`. 

This code logs the string `'completely different'`. The log operation is on line 14, where `qux` is invoked as a regular function. Normally regular function calls implicitly use the global object as their execution context, in this case it doesn't. Here, `qux` references a function that is permanently bound to the explicit execution context object referenced by `obj.bar`, due to a `bind` invocation. That function returns `${this.a} ${this.b}`. Since `this` in that function is bound to `obj.bar`, `this.a` references the `a` property in object `bar`. and `this.b` references the `b` property of object `bar`. `${this.a} ${this.b}` thus resolves to `'completely different'`.

##### 7

##### 8

##### 9

[Question 9 ](https://launchschool.com/exams/19f6d031)3 / 3 Points**Ok**

What is the difference between string primitives and `String` objects? Explain why you can use a string primitive value to access the properties and methods defined for `String` objects.

A string primitive's type is `'string'`, but the `String` object's type is `'object'`. JavaScript considers the two types of string as different types. Two string primitives that have the same value are equal, two `String` objects with the same value are not. String objects are compare by identity/ reference, not value. For example

```terminal
> 'xyz' === 'xyz'
true

> new String('xyz') === new String('xyz')
false
```

We can call use a string primitive value to access the properties and methods defined for String objects, because when we try to access a property or invoke a method on a string primitive, JavaScript wraps the string primitive in a `String` object, then uses the object to access properties or call methods. When the wrapping object has served its purpose, JavaScript discards that wrapping object. Properties and methods will always return strings as primitives.

##### 10

##### 11

##### 12

##### 13

[Question 13 ](https://launchschool.com/exams/19f6d031)4 / 4 Points**Ok**

Examine the following code snippet:

```js
let greeter = {
  a: 'hello',
  b: 'world',
  greet() {
    function sayHello() {
      console.log(`${this.a} ${this.b}`);
    }

    sayHello();
  }
};

greeter.greet(); // logs 'undefined undefined'
```

We want the `greet` method to log `hello world`. Instead, it logs `undefined undefined`. There are multiple ways to fix this problem. Show two of those fixes.



##### 14

[Question 14 ](https://launchschool.com/exams/19f6d031)3 / 3 Points**Ok**

What does the following code do, and why?

```js
let str1 = new String("Hello, world");
let str2 = new String("Hello, world");
console.log(str1 === str2);
```

The code logs `false`. On line 1, a string object is created and assigned to variable `str1`. On line 2, another string object is created and assigned to variable `str2`. The code on line 3 compares the two objects and returns `false`. JavaScript considers `str1` and `str2` two different string objects. That is because objects are compared by reference, not value.

# Practice Problems from Lessons

## Lesson 1

#### OOP and Encapsulation

1. In your own words, what is Object Oriented Programming?

   Solution

   Object-Oriented Programming is a programming paradigm in which we think about a problem in terms of objects. In particular, it uses those objects to organize your program.

2. Describe some advantages and disadvantages of OOP.

   Solution

   **Advantages**

   - It lets programmers think about a problem at a higher-level of abstraction, which helps them break down and solve the problem.
   - OOP helps programmers write programs that reduce the dependencies in a program, which makes maintenance easier.
   - Done right, OOP makes code flexible, easy to understand, and easy to change.

   **Disadvantages**

   - OOP programs are often much larger than the equivalent procedural program.
   - OOP may lead to less efficient code; OO programs may require more memory, disk space, and computing power.

3. In your own words, what does encapsulation refer to in JavaScript?

   Solution

   In JavaScript, encapsulation is the idea of bundling data(state) and operations (behavior) associated with that data (state) in a single entity; that is, it's the grouping of related properties and methods in a single object.

4. In JavaScript, how does encapsulation differ from encapsulation in most other OO languages?

   Solution

   In other languages, encapsulation concerns hiding details of an object from code that uses the object. An object should only expose the methods and properties that other objects need to use the encapsulated object. However, JavaScript does not directly provide the means to limit exposure of methods and properties. There are ways to achieve a degree of access restriction, but they're not perfect.

#### Objects and Factories

[reference](https://launchschool.com/lessons/fb892747/assignments/957404de)

In these problems, we will develop a factory function for objects that represent books.

The following three books should give you an idea of what our first book object should look like:

```plaintext
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
```

1. Create three objects that represent the three books shown above. The method for the "Get Description" behavior should return a string like the following:

   ```js
   "Me Talk Pretty one day was written by David Sedaris."
   ```

   Solution

   ```js
   let book1 = {
     title: 'Mythos',
     author: 'Stephen Fry',
     getDescription: function() {
       return `${this.title} was written by ${this.author}.`;
     },
   };
   
   let book2 = {
     title: 'Me Talk Pretty One Day',
     author: 'David Sedaris',
     getDescription: function() {
       return `${this.title} was written by ${this.author}.`;
     },
   };
   
   let book3 = {
     title: "Aunts aren't Gentlemen",
     author: 'PG Wodehouse',
     getDescription: function() {
       return `${this.title} was written by ${this.author}.`;
     },
   };
   ```

2. Think about the code you wrote for problem #1. Is there any unnecessary code? Does it have duplication?

   Solution

   The method `getDescription` is duplicated in each object. However, each object must hold unique values for its `title` and `author` properties.

3. Given our observations about the code so far, implement a factory function for our book objects that we can use with the following code:

   Copy Code

   ```js
   let book1 = createBook('Mythos', 'Stephen Fry');
   let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
   let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');
   
   book1.getDescription();  // "Mythos was written by Stephen Fry."
   book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
   book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"
   ```

   Solution

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

   You can use a shorthand notation when a property and a variable have the same name. For instance, in the above, `title` and `author` are both property names and variable names, so we can use the following simplified syntax:

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

4. We now want to track which books we have and haven't read. Update the factory function so that it returns a book object that includes a property `read` that has an initial value of `false`.

   Solution

   ```js
   function createBook(title, author) {
     return {
       title,   // see solution for previous problem
       author,  // see solution for previous problem
       read: false,
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}.`;
       },
     };
   }
   
   let book1 = createBook('Mythos', 'Stephen Fry');
   let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
   let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');
   
   console.log(book1.getDescription());  // "Mythos was written by Stephen Fry."
   console.log(book2.getDescription());  // "Me Talk Pretty One Day was written by David Sedaris."
   console.log(book3.getDescription());  // "Aunts aren't Gentlemen was written by PG Wodehouse"
   
   console.log(book1.read); // => false
   console.log(book2.read); // => false
   console.log(book3.read); // => false
   ```

   

5. Suppose that we want to add a book that we've already read. Modify the factory function to use an optional `read` parameter with a default value of `false`.

   Solution

   ```js
   function createBook(title, author, read = false) {
     return {
       title,
       author,
       read,
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}.`;
       },
     };
   }
   
   let book1 = createBook('Mythos', 'Stephen Fry');
   let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
   let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);
   
   console.log(book1.read); // => false
   console.log(book2.read); // => false
   console.log(book3.read); // => true
   ```

   

6. Let's add a method, `readBook`, that marks a book object as read by setting the `read` property to `true`:

   Solution

   ```js
   function createBook(title, author, read = false) {
     return {
       title,
       author,
       read,
   
       readBook() {
         this.read = true;
       },
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}.`;
       },
     };
   }
   
   console.log(book1.read); // => false
   book1.readBook();
   console.log(book1.read); // => true
   ```

   

7. Finally, let's update `getDescription` function to reflect the `read` state directly, For instance:

   ```js
   book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
   book1.readBook();
   book1.getDescription(); // Mythos was written by David Fry. I have read it.
   ```

   Solution

   ```js
   function createBook(title, author, read = false) {
     return {
       title,
       author,
       read,
   
       readBook() {
         this.read = true;
       },
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}. ` +
                `I ${this.read ? 'have' : "haven't"} read it.`;
       },
     };
   }
   ```

   

------

## Lesson 2

#### Object Prototypes 

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/f7b8620b)

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
      break; // don't need this, loop ends with object is not null.
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

Another solution

```js
let baz = {prop3: 3};
let foo = {prop1: 1, prop2: 2};
Object.setPrototypeOf(foo, baz);

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
```



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

#### Implicit and Explicit Execution Contexts

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

#### Hard Binding Functions with Contexts

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

   Since `bar` is bound to `positivity` as the return value of the `bind` invocation on line 13, `positivity`'s property `message` is logged by the function call on the last line, despite the fact that the function is invoked as a method on the `negativity` object. 

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

#### Dealing with Context Loss

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

## Lesson 3

#### Factory Functions 

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/bf77a962)

1. What are two disadvantages of working with factory functions?

   Show Solution

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
       propA: 10,
       propB: 20,
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
   function createPayment(services = {}) { 
     return {
       phone: services.phone || 0,
       internet: services.internet || 0,
       amount: services.amount,
       total: function () {
         return services.amount || this.phone + this.internet;
       }   
     };
   }
   ```

   ```js
   // doesn't work
   function createPayment(services = {}) {
     return {
       internet: services.internet || 0,
       phone: services.phone || 0,
       amount: services.amount || this.internet + this.phone, // bug
       total() {
         return this.amount;
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
   
   let payment1 = createPayment({ amount: 2000 });
   let payment2 = createPayment({
     phone: 1000,
     internet: 1200
   });
   
   let payment3 = createPayment({ phone: 1000 });
   
   invoice.addPayment(payment1);
   invoice.addPayments([payment2, payment3]);
   invoice.amountDue();       // this should return 0
   ```

   Show Solution

   ```js
   function createInvoice(services = {}) { // default parameter in case no object is passed to the function.
     let phoneCharge = services.phone || 3000;
     let internetCharge = services.internet || 5500;
   
     return {
       phone: phoneCharge,
       internet: internetCharge,
       paymentTotal: 0,
   
       invoiceTotal: function () {
         return this.phone + this.internet;
       },
   
       addPayment: function (payment) {
         this.paymentTotal += payment.total();
       },
   
       addPayments: function (arr) {
         arr.forEach(payment => {
           this.addPayment(payment);
         });
       },
   
       amountDue() {
         console.log(this.invoiceTotal() - this.paymentTotal);
       }
     };
   }
   ```

------

#### Constructors

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/5ca112a7)

1. What naming convention separates constructor functions from other functions?

   Show Solution

   Capitalizing constructor function names. 

2. What happens if you run the following code? Why?

   ```js
   function Lizard() { // invoked as a normal function, function returns undefined.
     this.scamper = function() { 
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = Lizard(); // lizzy's value is undefined.
   lizzy.scamper(); // ?
   ```

   Show Solution

   On line 7, `Lizard` is invoked as a normal function. It doesn't have an explicit return value, so it returns `undefined`, which is the value of `lizzy`. On line 8, `lizzy.scamper()` evaluates to `undefined.scamper()` which throws a `TypeError`. 

   This code throws a `TypeError` since `scamper` is an undefined property on `lizzy`. Since `Lizard` was invoked without the `new` operator and it doesn't have an explicit return value, the return value is `undefined`. Thus, `lizzy` gets assigned to `undefined` which causes the call to `scamper` to throw an error: you can't call a method on `undefined`.

3. Alter the code in problem 2 so that it produces the desired output: `I'm scampering!`.

   Show Solution

   ```js
   function Lizard() { // 
     this.scamper = function() { 
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = new Lizard(); 
   lizzy.scamper(); 
   ```

------

#### Practice Problems - Constructors and Prototypes

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/ee0fee9d)

1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

   ```js
   let RECTANGLE = {
     area: function() {
       return this.width * this.height; // this refers to RECTANGLE
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) {
     this.width = width;
     this.height = height;
     this.area = RECTANGLE.area();
     this.perimeter = RECTANGLE.perimeter();
   }
   
   let rect1 = new Rectangle(2, 3);
   
   console.log(rect1.area);
   console.log(rect1.perimeter);
   ```

   Solution

   ```terminal
   NaN
   NaN
   ```

   When `RECTANGLE.area` is invoked, `this` refers to `RECTANGLE` instead of the instance object of the `Rectangle` constructor. `RECTANGLE` doesn't defined `width ` or `height` properties, so `this.width` and `this.height` evaluated to `undefined`.  Mathematical operations on `undefined` result in `NaN`. 

2. How would you fix the problem in the code from problem 1?

   Solution

   ```js
   // using call
   let RECTANGLE = {
     area: function() {
       return this.width * this.height; // this refers to RECTANGLE
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) {
     this.width = width;
     this.height = height;
     this.area = RECTANGLE.area.call(this);
     this.perimeter = RECTANGLE.perimeter.call(this);
   }
   
   let rect1 = new Rectangle(2, 3);
   
   console.log(rect1.area);
   console.log(rect1.perimeter);
   ```

   ```js
   // using mixin
   let RECTANGLE = {
     area: function() {
       return this.width * this.height;
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) {
     this.width = width;
     this.height = height;
     this.area = this.area();
     this.perimeter = this.perimeter();
   }
   
   Object.assign(Rectangle.prototype, RECTANGLE);
   let rect1 = new Rectangle(2, 3);
   
   
   console.log(rect1.area); // 6
   console.log(rect1.perimeter); // 10
   ```

   

3. Write a constructor function called `Circle` that takes a radius as an argument. You should be able to call an `area` method on any objects created by the constructor to get the [circle's area](https://www.mathsisfun.com/geometry/circle-area.html). Test your implementation with the following code:

   ```js
   let a = new Circle(3);
   let b = new Circle(4);
   
   a.area().toFixed(2); // => 28.27
   b.area().toFixed(2); // => 50.27
   a.hasOwnProperty('area'); // => false
   ```

   Solution

   ```js
   function Circle(radius) {
     this.radius = radius; 
   }
   
   Circle.prototype.area = function () {
     return Math.PI * this.radius * this.radius;
   }
   ```

4. What will the following code log to the console and why?

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

   Solution

   ```terminal
   true
   ```

   Even though we define the `swingSword` method on the prototype after we create the `ninja`, all objects created by the `Ninja` constructor share the same prototype object. Thus, when we define `swingSword`, it immediately becomes available to the `ninja` object.

5. What will the following code output and why? Try to answer without running the code.

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

   Solution

   ```terminal
   Uncaught TypeError: ninja.swingSword is not a function
   ```

   We reassigning `Ninja.prototype` to an entirely new object instead of mutating the original prototype object. The prototype for the `ninja` object doesn't change; it's still the original prototype defined during the constructor's invocation. Thus, JavaScript can't find the `swingSword` method in the prototype chain of `ninja`.

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

   Solution

   ```js
   function Ninja() {
     this.swung = false;
   }
   
   Ninja.prototype.swing = function () {
     this.swung = true;
     return this;
   }
   
   let ninjaA = new Ninja();
   let ninjaB = new Ninja();
   
   console.log(ninjaA.swing().swung);      // logs `true`
   console.log(ninjaB.swing().swung);      // logs `true`
   ```

   This pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object (in this case, `ninjaA` and `ninjaB`).

7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

   ```js
   let ninjaA;
   
   {
     const Ninja = function() {
       this.swung = false;
     };
   
     ninjaA = new Ninja();
   }
   
   let ninjaB = new ninjaA.constructor(); // create a `ninjaB` object here; don't change anything else
   
   ninjaA.constructor === ninjaB.constructor // => true
   ```

   Hint

   The value assigned to `ninjaA` is an object created by a constructor function. As such, this object has a `constructor` property that points back to its constructor. Think of a way to use this property; that should help lead you to a solution.

   Solution

   ```js
   let ninjaB = new ninjaA.constructor();
   ```

   Does your answer use `Object.create` instead?

   ```js
   let ninjaB = Object.create(ninjaA);
   ```

   This code works as well, but there is a flaw: it puts the `swung` property in the prototype object instead of in the `ninjaB` object where it belongs. Thus, `ninjaA` and `ninjaB` are somewhat different objects:

   ```plaintext
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

   Solution

   ```js
   function User(first, last) {
     if (!(this instanceof User)) {
       return new User(first, last); // need return statement to avoid side effects
     }
     
     this.name = `${first} ${last}`;
     
   }
   ```


------

#### Practice Problems - Classes

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/b29488f2)

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

   What does the `static` modifier do? How would we call the method `manufacturer`?

   The `static` modifier when used with a method declaration, marks the method as static. That means the method is defined directly on the class, not on the objects the class creates. We use it like this: 

   ```js
   Television.manufacturer();
   ```

   The `model`method, on the other hand, is an instance method and must be called by an instance object.

   ```js
   let tv = new Television();
   tv.model();
   ```

------

## Lesson 4

- Creation with Prototypes

Give us your feedback

#### Practice Problems: Object Creation with Prototypes

[reference](https://launchschool.com/lessons/d5964d17/assignments/02f965cb)

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
   let petPrototype = {  
     init(animal, name) {
       this.animal = animal;
       this.name = name;
       return this;
     }, 
     
     sleep: function() {
      console.log('I am sleeping');
     }, 
     
     wake: function() {
     	console.log('I am awake');
     }, 
   };
   ```

   

3. Consider the objects created by the programs in problems 1 and 2. How do objects for the same animal differ from each other?

   solution

   Objects created with the OLOO have a prototype object that contains the methods associated with the created objects. Since all pets created from the prototype share a single prototype object, they all share the same methods. With the factory function, each object has a copy of all the methods. Thus, objects created by OLOO are more efficient in terms of memory use.

   Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

------

#### Practice Problems:

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
Hello.hi();
```

This code also raises a `TypeError`. The `hi` method is defined on `Hello.prototype`, not on the `Hello` constructor itself. Thus, only instances of `Hello` have access to `hi`.

------

#### Practice Problems: Subtyping with Classes

[reference](https://launchschool.com/lessons/d5964d17/assignments/16921628)

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

   If we add a new `play` method to the `Bingo` class, objects created by `Bingo` will use that method instead of looking up the prototype chain and finding it in the `Game` class. As soon as JavaScript finds a method, it calls it. When a class redefines a method that a superclass defines, we call this "method overriding."

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
   
     play() {
       return 'Eyes down';
     }
   }
   
   let bingo = new Bingo();
   bingo.play(); // 'Eyes down'.
   ```

2. Let's practice creating a class hierarchy.

   Create a class named `Greeting` that has a single method named `greet`. The method should take a string argument, and it should print that argument to the console.

   Now, create two more classes that inherit from `Greeting`: one named `Hello`, and the other `Goodbye`. The `Hello` class should have a `hi` method that takes no arguments and logs `"Hello"`. The `Goodbye` class should have a `bye` method that logs `"Goodbye"`. Use the `greet` method from the `Greeting` class when implementing `Hello` and `Goodbye`; don't call `console.log` from either `Hello` or `Goodbye`.

   Solution

   ```js
   class Greeting {
     greet(str) {
       console.log(str);
     }
   }
   
   class Hello extends Greeting() {
     hi() {
       this.greet('Hello');
     }
   }
   
   class Goodbye extends Greeting() {
     bye() {
       this.greet('Goodbye');
     }
   }
   ```

------

#### Practice Problems: Mix-ins

[reference](https://launchschool.com/lessons/d5964d17/assignments/e7850b07)

1. If we have a `Car` class and a `Truck` class, how can you use the `Speed` object as a mix-in to make them `goFast`? How can you check whether your `Car` or `Truck` can now go fast?

   ```js
   const Speed = {
     goFast() {
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

   To add the `goFast` method to the `Car` and `Truck` classes, we need to mix `Speed` into the prototypes of both constructors.

   ```js
   const Speed = {
     goFast() {
       console.log(`I'm a ${this.constructor.name} and going super fast!`);
     }
   };
   
   class Car {
     goSlow() {
       console.log(`I'm safe and driving slow.`);
     }
   }
   
   Object.assign(Car.prototype, Speed);
   
   class Truck {
     goVerySlow() {
       console.log(`I'm a heavy truck and like going very slow.`);
     }
   }
   
   Object.assign(Truck.prototype, Speed);
   ```

   Testing that we can make our cars and trucks go fast is simple; all we must do is call `goFast` on a car or truck object:

   ```js
   let blueTruck = new Truck();
   blueTruck.goFast(); // => logs "I'm a Truck and going super fast!"
   
   let smallCar = new Car();
   smallCar.goFast(); // => logs "I'm a Car and going super fast!"
   ```

   If you need to check whether an object responds to a specific method, you can use the `in` operator:

   ```js
   'goFast' in smallCar;  // => true
   'goFast' in blueTruck; // => true
   ```

   

2. In the last question, we used a mix-in named `Speed` that contained a `goFast` method. We included the mix-in in the `Car` class and then called the `goFast` method from an instance of the `Car` class. You may have noticed that the string printed when we call `goFast` includes the name of the type of vehicle we are using. How is that done?

   Hint: Since the `constructor` property references a function object, `constructor.name` references the `name` property on that object. Use MDN to lookup the definition of `Function.name`.

   Solution

   We used `this.constructor.name` to determine the name. It works like this:

   1. Within `goFast`, `this` refers to the object that invoked the method. In this case, we used `Car` and `Truck` objects.
   2. The `constructor` property of an object references the class that the object belongs to, i.e., `Car` or `Truck`.
   3. Constructors have a `name` property that merely contains the name of the class as a string, and that's what we output in `goFast`.

3. Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named `Auto` and `Motorcycle` to represent automobiles and motorcycles. After they noticed that the information and calculations performed was common to both vehicle types, they decided to break out the commonality into a separate class named `WheeledVehicle`. Their code, thus far, looks like this:

   ```js
   class WheeledVehicle {
     constructor(tirePressure, kmTravelledPerLiter) {
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
   const MixIn = {
   	range() {
       return this.fuelEfficiency * this.fuelCap;
     } 
   };
   
   class WheeledVehicle {
     constructor(tirePressure, kmTravelledPerLiter) {
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
   
   Object.assign(WheeledVehicle.prototype, MixIn);
   
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
   
   Object.assign(Catamaran.prototype, MixIn);
   ```

   We've moved the code shared by `Catamaran` and `WheeledVehicles` to the `Moveable` mix-in. The definitions of `Auto` and `Motorcycle` remain unchanged since they both inherit from `WheeledVehicle`.

##### 