#### .Questions

- Losing reference to `object.prototype` if it is reassigned to a different object. 

- instance properties include the ones inherited from `object.prototype`??

  

## Specific Topics of Interest

### Objects, object factories, constructors and prototypes, OLOO, and ES6 classes 1, 3,4 

#### Objects

##### Object creation

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

##### Object Factories

- **Object factories** (factory functions): are functions that create and return objects of a particular type. 
  - Object factories, or factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to automate the creation related objects based on a predefined template. 
  - **Type** means an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them arguments. 
  - Each invocation of the factory function specifies the differences between the objects with arguments. 
  
- Advantages of object factory

  - Create multiple objects of same "type" with a predefined "template". 
  - Lets you automate the creation of objects. 

  - Reuses code. 

- Disadvantage of object factory

  - Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
  - There is no way to tell which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 
    - No way to inspect the object and learn whether we created it with a factory function, or which factory function. 
    - It's impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics. 

#### Constructors 

##### Main Points

- **Constructors** is a function that creates and returns an object (**the instance**) of the constructor function.
  - are an <u>object form of functions</u> used to create objects in JavaScript. 
  - Acts like a factory function: define a constructor once and invoke it each time you want to create an object of that type. 
  - Capitalizing name of constructor is a convention. 
  - Use `new` keyword / operator preceding a <u>function invocation</u> to treat the function as a constructor.
- Constructors vs ordinary functions
  - Call it with `new` keyword
  - Use `this` to set object's properties and methods
  - Don't supply an explicit return value (we can, but usually don't).
- Return value of a constructor.
  - If there is an explicit return <u>object</u>, then that object is returned. 
  - In all other situations, constructor returns the newly created object, provided <u>no errors</u> occur. 
  - In particular, Constructor ignores primitive return values and returns the new object instead. 

##### New

- Summary of what `new` does
  - If used before a function, it invokes an existing function as a constructor and returns the instance of the constructor function. 
  - Also used to create arrays and objects. 
- What `new` does. 
  1. It creates an entirely new object(the **instance**), with its **own** properties.
  2. It sets the prototype of the new object to the object that is referenced by the constructor's `prototype` property. 
  3. It sets the execution context(value of `this` ) inside the function to point to the new object. 
     - Since `this` refers to the new object, we use it within the function to set the object's properties and methods. 
  4. It invokes the constructor function. 
  5. Finally, once the function finishes running `new` returns the new object "automatically"; we don't explicitly return anything.
- What `new` doesn't do.
  - It does not create a new function. 

##### Other notes about constructor

- Calling a constructor without `new`

  - Function acts like ordinary function
  - Since functions that don't return an explicit value return `undefined`, calling constructor without `new` also returns undefined. 

- Who can be a constructor

  - almost every JavaScript function that you create. 
  - Exception: arrow functions cannot be called with `new` since they lose their surrounding context as the value of `this`. 
  - Exception: Calling a method defined with concise syntax won't work.  
  - Many (but not all) built-in objects and methods are incompatible with `new`

- Determining an Object's Type: determine what constructor created the function. 

  -  `instanceof`   

    - This operator tests whether the object is an instance of this constructor function then returns  a boolean value.

    - Detailed explanation: This operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. 

    - Syntax

      ```md
      Object instanceof function
      ```

  -  `constructor` property

    - Returns a reference(not string name!) to the constructor function that created the instance object. 

    - Careful: this could be reassigned. 

      ```md
      obj.constructor 
      ```

  - `Constructor.name` 

    - Constructors have a name property that returns the function's name as specified when it was created. 

      ```js
      console.log("Hello".constructor.name); // String
      console.log([1, 2, 3].constructor.name); // Array
      console.log({ name: 'Srdjan' }.constructor.name); // Object
      ```

- **scope-safe constructors**: designed to return the same result whether its called with `new` or without new. 

  - Most, but not all, of JavaScript's built-in constructors, such as `Object`, `RegExp`, and `Array`, are scope-safe. `String` is not:

##### Advantage of constructor 

Advantage of Constructor 

- Can determine an Object's type(which constructor created the object) using `instanceof` or `constructor` property
- Saves memory because constructors create objects that inherit from constructor's prototype object. So instance objects created by a constructor can have own properties as well as inherited properties, unlike factory functions where inheriting objects must have an own copy of every property.
  - constructors have a prototype property that references an object that instance objects inherit from. 
  - So properties defined on the constructor `prototype` property are shared through the prototype chain. 
- Prototypes can be overridden by assigning inheriting objects their own properties. 

##### Constructors with Prototypes: terminology confusion

- Constructor `prototype` property 

  - Known as **constructor's prototype object** /  **function prototype** / **`prototype` property**
  - Every JavaScript function has this property but JS only uses it when you call that function as a constructor using the `new` keyword. 
  -  `Constructor.prototype` references the constructor's prototype object.
    - The constructor stores the prototype object in its `prototype` property; that is, if the constructor's name is `Foo`, then `Foo.prototype` references the constructor's prototype object.
  - The **constructor's prototype object** is the object that the the instance object(inheriting object) created by a constructor inherits from. 
    - When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the current value of `Foo`'s `prototype` property. 
    - The inheriting object's prototype references `Foo.prototype`.
    - Even if you assign `constructor.prototype` to a different object, the inheriting object's prototype does not change: it's still the original constructor's prototype object defined during the constructor's invocation. 
  - Constructor's prototype object also contains a `constructor` property. The `constructor` property points back to the function itself.  
  - Note: constructors <u>don't inherit</u> from the constructor's prototype object. 

- <u>**An object's prototype**</u>: 

  - In most cases, when we talk about a **prototype** without being more explicit, we mean an **object prototype**.

  - Referenced by  dunder proto `__proto__` or hidden `[[prototype]]` property

  - An **object's prototype**  is what an inheriting object's `[[prototype]]` or `__prototype__` property references. 
    - It is the object that the current object inherits from. 
    - If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. 
    - By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.
    - The inheriting object's prototype, referenced by dunder proto and hidden `[[prototype]]` property, will usually reference `Constructor.prototype` (constructor `prototype` property) given that the constructor is the constructor function that created that object. 

##### Terminology Confusion: prototype

- An object's prototype is not the same as constructor's prototype object, but often times an object's prototype references the Constructor's prototype object, given that the constructor is the constructor function that created the object. 
  - Object's `__proto__` or hidden `[[prototype]]` references an object's prototype. It also references `constructor.prototype`.
- A constructor's `[[prototype]]` !== `constructor.prototype` , but the inheriting object's `[[prototype]]` references `constructor.prototype`. 

#### ES6 Classes (4)

- Definition: classes act like **syntactic sugar** -- syntax designed to be easier to read or use. 
  - In essence, they provide little more than a more natural and possibly familiar way to create constructors and prototypes.
  - makes it easier for programmers to migrate to JavaScript from other OOP languages. 

##### Constructor and prototype pattern





------

### Methods and properties; instance and static methods and properties 1, 3

##### Property Existence

- `in` operator (`property in object`)
- `obj.hasOwnProperty`: Returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).
- `Object.keys`: Returns an array of object's <u>own</u> <u>enumerable</u> property names. 
- `Object.getOwnPropertyNames`: returns an array of <u>all</u> of object's <u>own</u> property names regardless if they’re enumerable or not. (including non-enumerable properties except for those which use Symbol) found directly on an object. 
- `for...in` iterates over <u>all</u> <u>enumerable</u> properties of an object, including those in prototype chain. 

##### Instance 

- **Instance **: objects created using any means of defining multiple objects of the same kind. 
  - Objects created by factory functions are considered instances, even if there's no way to test that in code. 
- In JavaScript, "instance" does not have this technical meaning because JavaScript does not have this difference between classes and instances. However, in talking about JavaScript, "instance" can be used informally to mean an object created using a particular constructor function'
- **Instance Properties** : properties of an instance.
  - Properties of instances created by a constructor. 
  - May be stored directly on the instance, or its prototype. 
  
- **Instance Methods**: any method defined in any prototype in the prototype chain of an object is considered to be an instance method of an object. 
  - Methods usually aren't stored directly in instances, but rather in the object's prototype object (the object referenced by **prototype** property). 
  - Methods aren't stored in the object, but still operate on individual instances so we refer to them as instance methods. 
  - The methods that use this syntax: `Constructor.prototype.method` are the **instance** methods for the Constructor type. 

##### Static 

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

- **Static methods**: are also stored on the constructor. 

  - ```js
    Dog.showSpecies = function() {
      console.log(`Dogs belong to the species ${Dog.species}`);
    };
    
    Dog.showSpecies();
    ```
  
  - You've already seen examples of static methods on built-in JavaScript constructors. `Object.assign`, `Array.isArray`, and `Date.now` are all examples of static methods.
  - Is `forEach`  static method of the `Array` constructor then?
    - No, `forEach` is an instance method of the `Array` constructor, because you are using an object (array object) to invoke an instance method of the `Array` constructor, rather than calling the `Array` constructor directly. 


------

### Prototypal and pseudo-classical inheritance 4

- Prototypal Inheritance (prototypal delegation)
- Pseudo-classical inheritance (constructor inheritance)
  - Using functions to create objects. 

------

### Encapsulation - 1, 3

- **Encapsulation**: grouping related properties and methods in a single object. 
  - bundle state(data) and behavior (operations related to that data) into a single entity (object). 

------

### Polymorphism- 4

------

### Collaborator objects - 1

- **Collaborator Objects**: objects that help provide state in another object. 

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
  ```

  

------

### Single vs multiple inheritance

------

### Mix-ins; mix-ins vs. inheritance 4

------

### Higher-order functions 2

- **Higher-order function**:  are functions that return another function or take another function as an argument. 
- Higher-order functions let the programmer use powerful and flexible abstractions.
  - abstracts away similar structures of functions and leave specific mapping up to function's caller. 
  - `map` does this : it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. 
  - `map` method, along with several other array methods, are higher-order functions since it takes another function as argument. 
- Function factories are higher- order functions

------

### The global object 2

- JavaScript creates a global object when it starts running. 
  - In Node.js, the global object is the object named `global`. [object global]
  - In the browser, it's the `window` object. 
- This global object is the **implicit execution context** for function invocations. 
- Undeclared variables are added to the global object as property. 
  - When you assign a value to a variable without using `let` `const` or `var` keywords, the variable gets added to global object as property. 

------

### Method and property lookup sequence 2

##### What is prototype chain

- The prototype chain is a chain of objects that are prototypes of an object. All objects in JavaScript inherit from another object called the prototype. Since the prototype of an object is also an object, the prototype can also have a prototype from which it inherits.  Objects lower in the chain inherit properties and behaviors from objects in the chain above. 

##### What it's used for. 

- The prototype chain is used to look up properties, and this is done through **prototypal delegation**. 
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

### Implicit and explicit execution context 2

- **Execution context**:  the **environment** in which a function executes.
- There are two basic ways to set the context when calling a function or method
  1. **Explicit**: The execution context that you set explicitly: using `call` `apply` or `bind`. 

  2. **Implicit**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context.

     3 ways to provide an implicit execution context. 

     - Regular function calls, JavaScript supplies an implicit context: the <u>global object.</u>
     - Method calls use the <u>calling object</u> as its implicit execution context. 
     - A constructor call with `new` uses the <u>new object</u> as its implicit execution context. 

------

### Methods and functions; method invocation vs. function invocation 1,2 

- **Regular function** calls (**standalone** function) <u>implicitly</u> use the **global object** as their execution context
- **method calls** <u>implicitly</u> use the calling object as their context.
  - When you call a method on an object, JavaScript binds`this` to the calling object. If it doesn't find the method in that object, but does find it in the prototype, that doesn't change the value of `this`. 

------


### Function execution context and `this` (2)

- Every JavaScript call has an execution context. 
- Regular function invocations use the global object as its implicit execution context. 

##### This

Definition

- The value of `this` is the current execution context of a function or method.
- The value of `this` changes based on how you invoke a function, not how or where you define it. Context binding is not based on lexical scoping rules. 
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

  - But if `this` is inside a function/method, then the execution context is dependent soley on how the function is invoked, not on how and where the function is defined. 

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
  -  **enclosing function invocation** (surrounding scope): the most <u>immediate</u> function scope in which the arrow function is defined. 
     - This enclosing function is likely a function declaration or expression, in which case its execution context is determined by how its invoked. 
     - The execution context of this enclosing function is determined by  how it is invoked. 
     - Tricky: `forEach` is not considered the enclosing function for arrow functions, why? Because arrow functions are passed to `forEach` - it's not defined inside `forEach`. 
  -  Arrow functions are permanently bound to the enclosing function execution context, but it doesn't mean the context can't change. If the enclosing function context changes, it also changes. 
  -  Exception: don't use arrow functions as methods on an object, else it will take global object as the surrounding context. 

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

------

### Dealing with context loss (2)

#### Context Loss 1 : Method is copied out of an object and used elsewhere.

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

##### Best Solution

- Hard-bind the method's context by using `bind`

```js
let foo = john.greetings.bind(john); // bind returns a function
foo(); // => need to invoke foo here in order to run greetings() 

// using call
let foo = john.greetings; 
foo.call(john)
```

##### Unideal solutions

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

#### Context Loss 2: Nested Functions: inner function not using surrounding context

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

##### Solution 1 : Preserve context with variable in outer scope 

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

##### Solution 2 : Call Inner function with explicit context

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

##### Solution 3: use `bind`

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

##### Solution 4: Use arrow function

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

#### Context Loss 3: Function as argument losing surrounding context

- Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 

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

------

### `call`, `apply`, and `bind` 2

##### `call`

- Definition: invokes a function or method with an explicit execution context - the first argument passed to it 

- Syntax

  ```
  someObject.someMethod.call(context, arg1, arg2 …)
  someObject.someMethod.call(context, ...args);
  function.call(context)
  ```

- Can also pass a second array argument using spread operator. 

  ```js
  function.call(context, ...args);
  ```

##### `apply`

- Definition: Calls a function or method with an explicit execution context(the first argument passed to it), and optionally passes an array of arguments to the called function or method. 

- Syntax

  ```js
  someObject.someMethod.apply(context, [arg1, arg2, arg3…])
  function.apply(context)
  ```

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

------

### `Object.assign` and `Object.create`

##### Object.assign

- Definition: Merges two or more objects into a single object and <u>returns</u> a reference to obj. 

- Syntax 

  ```js
  object.assign(obj, obj)
  ```

- Uses

  - One **object factory** can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.

  - Can shorten arguments in a constructor by merging object argument with instance object. 

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

    

##### Object.create



------

### Built-in constructors like `Array`, `Object`, `String` and `Number` 3

##### The `Array` constructor

- Simplest way to create an array object uses the bracket syntax:

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

  - You can think of `[ <3 empty items> ]` as an array that has three empty slots. In effect, it's an empty array that happens to contain spaces for three items; alternatively, it's a non-empty array that contains no values. Call it Schrödinger's array if you wish.

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

- Interestingly, `Array` lets you omit the `new` keyword:

  ```terminal
  > Array(1, 2, 3)
  [1, 2, 3]
  ```

- Stay consistent and use `new` unless there's a good reason to omit it.

##### `Array.prototype` property

- `Array.prototype` property references the prototype object that the `Array` constructor uses to create array objects. 

-  All arrays inherit from the object referenced by this property:

  ```js
  > let numbers = [1, 2, 3] 
  > Object.getPrototypeOf(numbers) === Array.prototype
  true
  // even arrays defined using bracket syntax inherit from Array.prototye
  ```

- This implies that every array can use the methods defined in `Array.prototype`. 

  - In particular, that means that all arrays can use methods like `forEach`, `map`, `includes`, as well as all the other methods defined on `Array.prototype`:

- The methods that use this syntax: `Array.prototype.method` are the **instance** methods for the Array type. 

  ```js
  > numbers.map(number => number * number);
  [ 1, 4, 9 ]
  
  > numbers.includes(3)
  true
  ```

##### Static Array Methods

- Remember: static methods belong directly to the constructor function; they aren't part of the prototype used to create new objects. 
- As a result, their names don't include `.prototype`. 
- Moreover, you usually use the constructor to invoke the static methods, not the object created by that constructor. 

- **`Array.isArray`**

  - The `Array.isArray` method takes one argument and returns `true` if the argument is an array object, and `false` if it is not:

    ```terminal
    > Array.isArray([])
    true
    
    > Array.isArray({})
    false
    
    > Array.isArray(5)
    false
    ```

  - Why do we need it? Won't `typeof` tell us whether the argument is an array? Unfortunately, no. The `typeof` operator returns an unexpected and somewhat useless value when used with an array:

    ```terminal
    > typeof []
    'object'
    ```

  - You already know that all arrays are objects. That doesn't make it any less useless, however, so we need `Array.isArray` to distinguish between arrays and other objects.

- `Array.from`

  - The `Array.from` method takes an **array-like object** as an argument and returns a new array with the equivalent element values. 

  - An **array-like object** is any object that has a `length` property and provides indexed access to some of its properties with the `[index]` notation. 

    ```node
    > Array.from({0: 'a', 1: 'b', 2: 'c', length: 3})
    ['a', 'b', 'c']
    ```
  
    - Does it need properties with keys that are non-negative integers? (yes)
  
    - Such objects have properties whose keys are non-negative integers. 
  
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

  - In the degenerate(??) case, all arrays are themselves array-like objects.

##### The `Object` constructor

- As with the `Array` constructor, the `Object` constructor creates new objects:

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

##### Static `Object` Methods

- The list below shows some commonly used static `Object` methods. You've already seen and used several. Feel free to follow the links and read more about these methods, but you don't have to memorize them. Instead, learn what's available. You can look them up later when you need to use them:

  - [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  - [`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  - [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
  - [`Object.freeze`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)
  - [`Object.isFrozen`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen)
  - [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  - [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

##### The Date Constructor

- The `Date` constructor creates objects, commonly called a **date object**, that represent a specific date and time. 

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

##### `Date.prototype` 

- The `Date` prototype object provides a variety of convenient methods for working with dates. We'll mention a few here.

- `Date.prototype.toString`

  The `toString` method returns a string that represents the date (it's pretty verbose):

  ```terminal
  > let now = new Date()
  > now.toString()
  'Sat Jun 01 2019 01:15:06 GMT+0500 (Pakistan Standard Time)'
  ```

- `Date.prototype.getFullYear`

  The `getFullYear` method returns the year from the date as a number:

  ```terminal
  > now.getFullYear()
  2019
  ```

- `Date.prototype.getDay`

  The `getDay` method returns a number that represents the day of the week that corresponds to the date object. 

  - The return value is `0` for Sunday, `1` for Monday, and so on until it returns `6` for Saturday.

  ```terminal
  > now.getDay()
  4 // (represents Thursday)
  ```

  The `Date` prototype has a bunch of useful methods for working with dates and times. Be sure to check the [MDN documentation page for Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) and explore a few more methods.

##### The `String` constructor

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
  
  ```node
  > 'abc'.length
  3
  
  > 'abc'.toUpperCase()
  'ABC'
```
  
How is that possible given that strings are primitive values? Primitive values aren't objects, so where does JavaScript find those properties and methods?
  
We'll return to those questions shortly. 

###### String primitive vs `String` object

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

###### How can we call methods on string primitives?

- The answer is that when you try to access a property or invoke a method on a string primitive, JavaScript *wraps* the string primitive in a `String` object behind the scenes. 
  - The process sounds complicated and costly in computing resources, but the implementation is reasonably lightweight; there is little impact on your program. Best of all, the process is invisible.
- Once JavaScript has wrapped your string primitive in a `String` object, it then uses the object to access the property or call the method. When the wrapping object has served its purpose, JavaScript <u>discards</u> it.
- Properties and Methods always return strings as primitive, so you also don't have to worry about converting `String` objects to primitives.
- As a general rule, you should not create `String` objects explicitly. That's where you're likely to run into problems with the distinction between string primitives and `String` objects. 
  - However, if you're writing code where you may have to operate on `String` objects, you can use `String.prototype.valueOf()` to retrieve the value of the `String` object as a primitive.

##### `String` without `new` 

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


##### The `Number` and `Boolean` Constructors

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

##### Extending Built-in Prototypes

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

##### Borrowing Array Methods for Strings

###### Summary

- Definition: Can use non-mutating array methods on strings by using `call` or `apply`. 

  - The `call` and `apply` functions don't change a function's logic or return values; they merely change what object the method uses for its context. 
  - Array methods that return an array will still do so even when called on a string value. If you need a string result, you can use `join` to convert the array to a string:
  - Strings are immutable, so can only use non-mutating array methods. 

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

###### Why does method borrowing work? 

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

### Reading OO code

------

### Reminders

##### Default parameters

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


##### Undefined

- TypeError: you can't call a method on `undefined`. 

------

