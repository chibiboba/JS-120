#### .Questions

- Losing reference to `object.prototype` if it is reassigned to a different object. 

- instance properties include the ones inherited from `object.prototype`??

  

## Specific Topics of Interest

### Encapsulation - 1, 3

- **Encapsulation**: grouping related properties and methods in a single object. 
  - bundle state(data) and behavior (operations related to that data) into a single entity (object). 

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

### Higher-order functions 2

- **Higher-order function**:  are functions that return another function or take another function as an argument. 
- Higher-order functions let the programmer use powerful and flexible abstractions.
  - abstracts away similar structures of functions and leave specific mapping up to function's caller. 
  - `map` does this : it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. 
  - `map` method, along with several other array methods, are higher-order functions since it takes another function as argument. 
- Function factories are higher- order functions

##### First Class Functions

- Have these charactersitics ( from summary)

  - You can add them to objects and execute them in the respective object's context.
  - You can remove them from their objects, pass them around, and execute them in entirely different contexts.
  - **<u>They're initially unbound</u>** but dynamically bound to a context object at **execution time**.

- **first-class functions** or **first-class objects**:   means that functions are treated like any other variable: functions in JavaScript are values that we can assign to variables and properties, pass them to other functions, or return them from another function.
- Functions in JavaScript are first-class values, just like any other value in JavaScript. You can use them any place that you can use an expression. 

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

- Definition: Merges two or more objects into a single object and <u>returns</u> a reference to the modified object. 

- Syntax 

  ```js
  object.assign(obj, obj)
  ```


Uses

- One **object factory** can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.

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

##### Object.create

- Is a static method of the Object Function

- Definition: Creates a new object that inherits properties from an existing object (the prototype object).

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
  - Is a creation type. 
- Advantages of object factory

  - Create multiple objects of same "type" with a predefined "template". 
  - Lets you automate the creation of objects. 
  - Reuses code. 
  - Create objects with private state. 
- Disadvantage of object factory

  - Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
  - There is no way to tell which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 
    - No way to inspect the object and learn whether we created it with a factory function, or which factory function. 
    - It's impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics. 
- Advantage of function factory
  - An advantage of the factory pattern is that it lets us create objects with private state. If that doesn't make sense to you yet, don't worry. We'll return to this topic in a later course when we discuss closures.

##### Prototypes

- All objects in JavaScript inherit from another object called the prototype. Since the prototype of an object is also an object, the prototype can also have a prototype from which it inherits. 
- **prototype**: the object that you inherit properties and methods from.

- Although factory functions are useful to extract code into one place so multiple objects can use it, JavaScript relies heavily on prototypes. 
- In JavaScript, objects can inherit properties and behavior from other objects. If another object, for instance, has a `language` property and a `speak` behavior, a new object can access and use `language` and `speak` without explicitly defining them in the new object. 

##### prototypal inheritance & prototypal delegation

- **Prototypal delegation**: objects lower in the prototype chain can delegate responsibility to prototypes higher up in the prototype chain. 

  - inherting objects delegate property and method access to its prototype. 
  - Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above.  

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

- The default prototype is the prototype object of the `Object` constructor 
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

- ##### What is prototype chain (summary)

  - The prototype chain is a chain of objects that are prototypes of an object. The prototype chain is how objects inherit properties from other objects. All objects in JavaScript inherit from another object called the prototype. Since the prototype of an object is also an object, the prototype can also have a prototype from which it inherits.  Objects lower in the chain inherit properties and behaviors from objects in the chain above. 
  - The prototype chain is  used to look up and access properties, which is done through prototypal delegation: objects lower in the prototype chain delegate property and method access to prototypes higher up in the prototype chain. 
  - If we try to access a property on an object and it's not a property directly owned by that object, JavaScript looks for it in the object's prototype, which is the object pointed to by the internal `[[prototype]]` or `__proto__`  property. Then if JavaScript can't find it ,the next port of call is the prototype's prototype. This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.
  - The prototype chain allows us to store an object's data and behaviors not just directly in the object itself, but anywhere in the prototype chain. It increases memory efficiency because properties can be shared through the prototype chain, rather than every object needing an own copy of each property. 

  ##### What it's used for. 

  - The prototype chain is used to look up and access properties, and this is done through **prototypal delegation**. 
  - **Prototypal delegation**: objects lower in the prototype chain delegate property and method access to prototypes higher up in the prototype chain. 

  ##### Property Access

  - When you access a property on an object, JavaScript looks for the property first in the object, then its prototype chain, all the way up to `Object.prototype`.If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`. 
  - If we try to access a property on an object and it's not a property directly owned by that object, the next port of call is the object pointed to by the __proto__ property. 
    - In more detail, when I try to access a property on an object, JavaScript first looks for an "own" property with that name on the object. If the object does not define the specified property, JavaScript looks for it in the object's prototype(the object pointed to by the internal `[[prototype]]` or dunder proto property) then if it can't find, it looks for it in the prototype's prototype.  This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.
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
  - An object can override a property of its parent by setting the property on itself.
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

#### Constructors (3)

##### Main Points

- 1st definition: **Constructors** is a function that creates and returns an object (**the instance**) of the constructor function.
  - Second definition: are an <u>object form of functions</u> used to create objects in JavaScript. 
  - Acts like a factory function: define a constructor once and invoke it each time you want to create an object of that type. 
  - Capitalizing name of constructor is a convention. 
  - Use `new` keyword / operator preceding a <u>function invocation</u> to treat the function as a constructor.
- Constructors vs ordinary functions
  - Call it with `new` keyword
  - Use `this` to set object's properties and methods
  - Don't supply an explicit return value (we can, but usually don't).
  - Has a `prototype` property called the function prottoype. 
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

##### `Constructor` property 

- `constructor` property

  ```js
  obj.constructor 
  ```

- Returns a reference(not string name!) to the constructor function that created the instance object. 

- Every <u>function</u> object has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself. If `Kumquat` is a constructor function, then `Kumquat.prototype.constructor === Kumquat`.

  ```js
  function func() {
  }
  console.log(func.prototype.hasOwnProperty('constructor')); // true
  ```

  - Careful: this could be reassigned, and needs to be restored when using pseudo-classical inheritance pattern by pointing the subtype's `prototype` object's  `constructor` property back to the subtype. 

- Constructor property can be used to create new objects 

  ```js
  let rex = new Terrier();
  let spot = new rex.constructor;
  // is the equivalent of calling new Terrier();
  // Can use this method if we don't know the name of an object's constructor. 
  ```


##### Other notes about constructor

- Calling a constructor without `new`

  - Function acts like ordinary function
  - Since functions that don't return an explicit value return `undefined`, calling constructor without `new` also returns undefined. 

- Who can be a constructor

  - almost every JavaScript function that you create. 
  - Exception: arrow functions cannot be called with `new` since they lose their surrounding context as the value of `this`. 
  - Exception: Calling a method defined with concise syntax won't work.  
  - Many (but not all) built-in objects and methods are incompatible with `new`

- The **`typeof`** operator returns a string indicating the type of the unevaluated operand.

  ```js
  console.log(typeof Array); // 'function'
  console.log(typeof Function); // 'function'
  console.log(typeof Object); // 'function'
  ```

- `instanceof`   

  - This operator tests whether the object is an instance of this constructor function then returns  a boolean value.

  - Detailed explanation: This operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. 

  - Syntax

    ```md
    Object instanceof function
    ```

- `Constructor.name` 

  - Constructors have a name property that returns the function's name (as a string) as specified when it was created. 

    ```js
    console.log("Hello".constructor.name); // String
    console.log([1, 2, 3].constructor.name); // Array
    console.log({ name: 'Srdjan' }.constructor.name); // Object
    ```

- **scope-safe constructors**: designed to return the same result whether its called with `new` or without new. 

  - Most, but not all, of JavaScript's built-in constructors, such as `Object`, `RegExp`, and `Array`, are scope-safe. `String`, `Number` and `Boolean` is not:

##### Advantage of constructor 

- Can determine an Object's type(which constructor created the object) using `instanceof` or `constructor` property
- Memory efficiency: Saves memory because constructors create objects that inherit from constructor's prototype object. So instance objects created by a constructor can have own properties as well as inherited properties, unlike factory functions where inheriting objects must have an own copy of every property.
  - constructors have a prototype property that references an object that instance objects inherit from. 
  - So properties defined on the constructor `prototype` property are shared through the prototype chain. 
  - Instance methods are usually stored in the constructor's `prototype` object rather than directly on the instance object. 
- Prototypes can be overridden by assigning inheriting objects their own properties. 

##### Constructors with Prototypes: terminology confusion

- Constructor `prototype` property 

  - Known as **constructor's prototype object** /  **function prototype** / **`prototype` property**
  - Every JavaScript function has this property but JS only uses it when you call that function as a constructor using the `new` keyword. 
  - `Constructor.prototype` references the constructor's prototype object.
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
      - In other words, If a function is used as a constructor, the returned object(instance object)'s `[[Prototype]]` will reference the constructor's prototype property. 

##### Terminology Confusion: prototype

- An object's prototype is not the same as constructor's prototype object, but often times an object's prototype references the Constructor's prototype object, given that the constructor is the constructor function that created the object. 
  - Object's `__proto__` or hidden `[[prototype]]` references an object's prototype. It also references `constructor.prototype`.
- A constructor's `[[prototype]]` !== `constructor.prototype` , but the inheriting object's `[[prototype]]` references `constructor.prototype`. 

#### ES6 Classes (4)

##### Definition

- The **class syntax**, a relatively new addition to JavaScript, is syntactic sugar (cleaner syntax) for creating objects that use constructors and prototypes. JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages.

- classes act like **syntactic sugar** -- syntax designed to be easier to read or use. 
  - In essence, they provide little more than a more natural and possibly familiar way to create constructors and prototypes.
  - Cleaner, more compact alternative to constructors and prototypes.
  - Similar to functions that they are first-class citizens and come in in the form of declarations and expressions. 
  - Behave similar to constructors and prototypes.
  - Classes allow for static methods by using the `static` modifier. 

##### Constructor and prototype pattern

- Constructors

  - Creates an instance object with its own properties (not methods usually)
  - Instance object inherits methods from `Constructor.prototype`. 

- Can call the `Rectangle` constructor without `new` keyword.  However, if you do, the constructor won't work properly. It's possible to write constructors that work with or without the `new` keyword, but most JavaScript developers won't bother.

  ```js
  function Rectangle(length, width) {
    this.length = length; // instance object's own properties
    this.width = width;
  }
  
  Rectangle.prototype.getArea = function() { // instance method syntax
    return this.length * this.width;
  };
  
  let rec = new Rectangle(10, 5);
  console.log(typeof Rectangle);         // function
  console.log(rec instanceof Rectangle); // true
  console.log(rec.constructor);          // [Function: Rectangle]
  console.log(rec.getArea());            // 50
  ```

- This code is straightforward and easy to follow, and the outputs should be exactly what you expect. In particular, the object created by the `Rectangle` constructor, `rec`, is an instance of the `Rectangle` type, and we can call the `getArea` method from its prototype to calculate the area.

##### Class Declarations

- Remember that : you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.

```js
class Rectangle {
  constructor(length, width) { 
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

- Class declarations begin with the `class` keyword, followed by the name of the class. The rest of the syntax looks similar to the simplified (concise) method definition that you can use in object literals.

- Differences

  - However, there are no commas between the properties of the class.
  - One significant difference is that the constructor is now a method named `constructor` inside our class instead of being a standalone function. Other methods have no special meaning; you can define as many as you need. 
  - In this case, we define `getArea`, and it gets placed in `Rectangle.prototype`.
  - Another significant difference: you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.

- Similarities

  - anything in the constructor method is the instance object's own properties, like the constructor prototoype pattern

  - In most situations, instantiating a new object from a class is identical to creating one with the constructor/prototype pattern:

    ```js
    let rec = new Rectangle(10, 5);
    ```

  - You can even call methods on `Rectangle.prototype` in the same way:

    ```js
    console.log(rec.getArea());            // 50
    ```

  - The class code and instantiation is so similar to the constructor/prototype code that `typeof` even returns `'function'`, and the object checks out as an instance of `Rectangle`:

    ```js
    console.log(typeof Rectangle); // "function"
    console.log(rec instanceof Rectangle); // true
    ```

  - One minor difference is that `rec.constructor` may produce different results in the two patterns. For example, in Node, logging `rec.constructor` produces `[Function: Rectangle]` for the constructor/prototype example, and `[class Rectangle]` for the class example. This difference is implementation dependent, and not considered significant.

  - There is one significant difference, however: you **must** use the `new` keyword to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.

  - Using classes, it's possible to do everything you can with the constructor and prototype pattern. However, the class syntax is easier to read and write, and the enforced `new` keyword helps prevent bugs.

##### Class Expressions

- Functions have an expression form that does not require a name after the `function` keyword. Classes have a similar expression form. 

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
```

- Aside from the syntax, class expressions are <u>functionally equivalent</u> to class declarations. Which you use is primarily a matter of style.
  - This means <u>class expressions are hoisted</u>, unlike function expressions. 

##### Classes as First-Class Citizens

- This means that we can treat JavaScript classes like any other JavaScript value. They can be passed around to functions, returned from functions, assigned to variables, and used anywhere a value is expected. 

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

- If that doesn't surprise you, that's good! Earlier, we mentioned that classes are just functions, and demonstrated that with `typeof`:

```js
typeof Foo; // => "function"
```

- Since functions are first-class objects, classes must also be first-class objects!

##### Difference between function and class

- An important difference between **function(constructor) declarations** and **class declarations** is that while functions can be called in code that appears before they are defined, classes must be defined before they can be constructed. Code like the following will throw a [`ReferenceError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError):

  ```
  const p = new Rectangle(); // ReferenceError
  
  class Rectangle {}
  ```

- This occurs because while the class is [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting) its values are not initialized.

- **hoisting**: the engine "effectively moves" function declarations to the top of the program file in which they're defined, or the top of the function in which they are nested. 

  - Hoisting is an internal step performed by the engine; it doesn't actually move code around. 

##### Static Methods and Properties

###### Static Methods

- You may remember seeing some methods like `Array.isArray` and `Object.keys` that are invoked with `Array` or `Object` as the caller instead of an actual array or object. For instance:

```js
Array.isArray([1, 2, 3]); // => true
[1, 2, 3].isArray();      // raises a TypeError
```

- Don't call methods defined on constructor *class methods*, call them **static methods**. 
- Ordinary methods -- those defined on a prototype object -- are sometimes called **instance methods** or **object methods** since you need an instance of (an object) the type. More commonly, they are simply called methods.
- You can define static methods on your custom constructor methods. For instance, let's add one to the `Rectangle` type we defined earlier:
  - This code defines a static method named `getDescription` on the `Rectangle` constructor. To use this method, you invoke it with the `Rectangle` function object.

```js
// constructor prototype pattern example
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.getDescription = function() { // is outside the function
  return 'A rectangle is a shape with 4 sides';
}

console.log(Rectangle.getDescription()); // A rectangle is a shape with 4 sides
```

- Use the `static` keyword to define static methods in a `class` constructor. 

```js
// class example
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

###### Static Properties

- You can also define **static properties**. Static properties are properties that are defined on the constructor function instead of the individual objects. 
  - One well-known example of a static property is the `length` property used by the `String` type. 
  - To define a static property with the constructor and prototype pattern, just add it to the constructor function object:

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

------

### Methods and properties; instance and static methods and properties 1, 3

##### Overriding

- If we add a new `play` method to the `Bingo` class, objects created by `Bingo` will use that method instead of looking up the prototype chain and finding it in the `Game` class. 

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

- As soon as JavaScript finds a method, it calls it. When a class redefines a method that a superclass defines, we call this "**method overriding**."

- When two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence. 

  - An object can override a property of its parent by setting the property on itself.
  - A downstream object overrides an inherited property if it has a property with the same name. 
  - (Overriding is similar to shadowing, but it doesn't completely hide the overridden properties).

##### Property syntax 

- Syntax errors when trying to define properties in an object. 

  - `this` is an execution context that that refers to the calling method or function. 

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

  - `in` operator 

    ```js
    property in object // syntax
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

**Enumerable properties**: means the property can be **iterated** over. 

- Not all properties are enumerable. In particular, most properties and methods of the built-in types are not. 
- Usually, any properties or methods you define on for an object are enumerable. 
- You can check whether a property is enumerable with the `Object.prototype.propertyIsEnumerable` method. ( don't have to remember this)
- All properties created by simple assignment or property initializer are enumerable by default. 
- Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. 

##### Instance 

- **Instance **: objects created using any means of defining multiple objects of the same kind. 

  - Objects created by factory functions are considered instances, even if there's no way to test that in code. 

- In JavaScript, "instance" does not have this technical meaning because JavaScript does not have this difference between classes and instances. However, in talking about JavaScript, "instance" can be used informally to mean an object created using a particular constructor function. 

- Must use instance object to invoke instance properties or methods.

- **Instance Properties** : properties of an instance.

  - Properties of instances created by a constructor. 
  - May be stored directly on the instance, or its prototype. Its prototype is `Constructor.prototype`

- **Instance Methods**:  (object methods / methods) : any method defined in any prototype in the prototype chain of an object is considered to be an instance method of an object. 

  - Methods usually aren't stored directly in instances, but rather in the object's prototype object (the object referenced by **prototype** property). 
  - Methods aren't stored in the object, but still operate on individual instances so we refer to them as instance methods. 
  - Ordinary methods -- those defined on a prototype object -- are sometimes called **instance methods** or **object methods** since you need an instance of (an object) the type. More commonly, they are simply called **methods**.
  - The methods that use this syntax: `Constructor.prototype.method` are the **instance** methods for the Constructor type. 
    - `forEach` is an instance method of the`Array` constructor. 

- Constructor and prototype pattern

  ```js
  function Rectangle(length, width) {
    this.length = length; // not instance properties
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
    	this.length = length; // not instance properties
    	this.width = width;
    }
    
    getArea() { // instance method
       return this.length * this.width;
    }
    
    value = 2; // instance property ??
  }
  
  let rect = new Rectangle();
  console.log(rect.getArea());
  ```

##### Static 

- use constructor to invoke static properties and methods. 

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
    
    static description = 'A rectangle is a shape with 4 sides'; // static property 
  }
  
  let rect = new Rectangle();
  console.log(Rectangle.getArea());
  ```


------

### Creation Patterns

##### Compare and Contrast

| Creation type                  | Disadvantages                     | Disadvantages      |
| ------------------------------ | --------------------------------- | ------------------ |
| Factory Function               | create objects with private state | memory inefficient |
| OLOO                           | memory efficient                  |                    |
| Pseudo-classical (constructor) | memory efficient                  |                    |

#### Factory functions

- Definition:  A factory function returns an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments. 

  - Object factories, or factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to automate the creation related objects based on a predefined template. 
  - are functions that create and return objects of a particular type. 
    - **Type** means an object with a particular set of methods and properties. 
  - Each invocation of the factory function specifies the differences between the objects with arguments. 

- Advantages of factory function

  - Create multiple objects of same "type" with a predefined "template". 
  - Lets you automate the creation of objects. 
  - Reuses code. 
  - Create objects with private state. 
    - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

- Disadvantage of object factory

  - Wastes memory: Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
  - Can't identify which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 
    - No way to inspect the object and learn whether we created it with a factory function, or which factory function. 
    - It's impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics. 

- Code example:

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

- Incorrect syntax to define property in factory function object

  ```js
  // All of these cause syntax error when trying to define the properties in the object. 
  
  function createPet(animal, name) {
    return {
    	this.animal = animal, //  'this' can only be used inside a function or method, to refer to the object that contains the method.
      this.name : name, // incorrect syntax
      
      sleep() {
        console.log('I am sleeping');
      }, 
        
      wake() {
        console.log('I am awake');
      }
    };
  }
  
  let cat = {
    this.name: "Butterscotch", // 'this' can only be used inside a function or method, to refer to the object that contains the method.
    this.age: 13,
  };
  
  let cat = {
    name = "Butterscotch", // incorrect syntax to define property in an object.
    age = 13
  };
  ```

#### OLOO

Definitions

- Summary :  Objects linked to other objects (OLOO) is a JavaScript Design Pattern that lets us define a parent object from which we can create other objects with shared behavior. All shared properties will be defined on this parent object. 

  - Shared properties are defined on a parent object. Other objects can then be created from this parent object using `Object.create(obj)` .
  - An `init()` method defined on the parent object is used to initialize newly created objects with its own properties.

- Details:

  - OLOO uses prototypes and extracts the properties common to all objects of the same type (e.g., car objects) to a prototype object. All objects of the same type then inherit from that prototype.
  - Does not use a function. It uses an object as the prototype, then `Object.create` to create new objects that inherit from the prototype. It uses a `init` method to customize the state of each object. `init` returns `this`, a reference to the calling object. 

- Create new objects using that object prototype with this code

  ```js
  let newObj = Object.create(obj).init(state)
  ```

- Compare the two creation patterns

  ```js
  // OLOO
  let newObj = Object.create(obj).init();
  
  // pseudo-classical(constructor inheritance)
  let newObj = new Obj(); // newObj is an instance of Obj
  ```

Example

- Let's do that with car objects. What properties are common to all car objects? Here, those properties are the `start` and `stop` methods. All cars have `make`, `model`, `year`, and `started` properties as well, but each object has different values for those properties. Thus, we don't count them as being common to all cars.
  - We can extract the `start` and `stop` methods to a prototype object.

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

- Now that we have a car prototype object, all car objects can inherit from it:

```js
let car1 = Object.create(carPrototype);
car1.make = 'Toyota';
car1.model = 'Corolla';
car1.year = 2016;
```

- We can now call `start` and `stop` on the `car1` object since both are accessible through its prototype, `carPrototype`.

```js
car1.start();
car1.started; // => true

car1.stop();
car1.started; // => false
```

- Calling `start` and `stop` on the `car1` object changes the state of `car1` even though those methods don't belong to `car1`. That shouldn't come as a surprise since we're using `car1` as the execution context for the calls. When we call these methods, `this` is set to `car1`, so the methods change the `started` property in `car1`.

- That's all well and good. We've set up a car prototype that all our car objects can inherit.

- However, we still have a small problem: we must set the `make`, `model`, and `year` properties manually every time we create a car object. Can we automate that? Fortunately, yes; there's more than one way. The most common technique uses an `init` method on the prototype object:

##### Init 

- The initializer method customizes the state for each object. 
  - `init` is a function that initializes values in newly created objects. It also returns `this`, which is a reference to the object that called `init`
    - Returns a reference to the calling object, so we are able to method chain after calling `Object.create`, to refer to that new object!!


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

##### Advantage of OLOO over Factory Function

- You can use both factory functions and the OLOO pattern to bulk create objects of the same type. 
- OLOO pattern has one significant advantage over factory functions: memory efficiency. 
  - Since all objects created with the OLOO pattern inherit methods from a single prototype object, the objects that inherit from that prototype object share the same methods. 
  - Factory functions, on the other hand, create copies of all the methods for each new object. That can have a significant performance impact, especially on smaller devices with limited memory.

- An advantage of the factory pattern is that it lets us create objects with private state. 
  - Objects created with the factory function can have private state. Any state stored in the body of the factory function instead of in the returned object is private to the returned object. They can't be accessed or modified unless one of the object methods exposes the state. With OLOO, there is no way to define private state. All object state can be accessed and modified by outside code.

##### Subtyping with OLOO

```js
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

#### **Pseudo-classical** object creation pattern 

- Definition: generates objects using a constructor function that defines state and a prototype object that defines shared behaviors.
  - If the function is used as a constructor, the returned object(instance object)'s `[[Prototype]]` will reference the constructor's `prototype` property
  - This lets us set properties on the constructor's prototype object so that all objects created by the constructor will share them. 
- New objects are created from constructor functions using the keyword `new` .
- Calling `new` on a function creates a new object. The code within the function executes with the execution context (`this`) set to the new object. The newly created object’s `__proto__` property is set to point at the object referenced by the functions `prototype` property. The newly created object is then implicitly returned.
- `obj.constructor` can be used to find out the name of the constructor function that created an object.

- Inheritance can be emulated by changing where a functions `.prototype` property points to (Just remember to restore where the `.constructor` property points to).


------

### Subtyping (pseudo-classical inheritance) (4)

- Subtyping what defines **pseudo-classical inheritance**, aka constructor inheritance. 

#### Subtyping with constructors and prototypes

- Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then restore the `constructor` property of the **sub-type**'s prototype object back to the **sub-type** function. 

```js
SubType.prototype = Object.create(SuperType.prototype);
SubType.prototype.constructor = SubType; // restoring constructor property
```

```js
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;
```

- We are creating a link without executing code in the parent constructor function. 
- This lets us inherit only the properties that have been defined on the parent constructor function's `prototype` object, not instance methods or properties on the parent constructor. 

Example

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

##### Restoring the `constructor` property

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

##### Constructor Reuse

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

#### Subtyping with classes

##### Definition

-  A class created with class inheritance inherits <u>all the methods and properties</u> from the parent class. 
   - Can access parent class properties (or methods) using `super` inside its constructor.
   - Unlike constructor and prototype pattern, where sub-type usually only inherits from the super-type's `.prototype` object. 

Reducing Complexity

- Classes reduce complexity by having classes with similar behaviors inherit from a super class. This is because in OOP, it's common to have multiple classes that perform similar actions. The superclass implements the common behaviors while the inheriting classes invoke them. 
- The `extends` keyword is used to denote inheritance between classes.

##### `Super`

- The `super()` method refers to the parent class. 

- When called inside the `constructor` method, the `super` keyword refers to the <u>constructor method</u> for the parent class. We call the parent's constructor method and get access to the parent's properties and methods. 

  ```js
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
  }
  
  class Square extends Rectangle {
    constructor(size, size) {
      super(size, size);
    }
  }
  ```

  - Thus, `super(size, size)` performs the same role performed by this code from our constructor/prototype example. 

  ```js
  function Square() {
    Rectangle.call(this, size, size);
  }
  ```

- You don't need to use `super` in every subclass, but in most cases you do. In particular, if the superclass's constructor creates any object properties, you <u>must</u> call `super` to ensure that those properties are set properly. For instance, in the `Rectangle` class above, we create two properties in the `Rectangle` constructor, so we must call `super` in `Square`'s constructor.

- If you do call `super` in a subclass's constructor, you must call it before you use `this` in that constructor.  

- To prevent method overriding, `super` keyword can also be used to call functions on the parent object, so we can use some functionality form parent class in the subtype class. 

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

- Although it's unnecessary if no method overriding occurs, since sub-type class inherits all the methods from the parent class, so we can just call on an inherited method using `this`. 

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

- The `extends` keyword signifies that the class named to the left of `extends` should inherit from the class specified to the right of `extends`.

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

#### Two ways of inheritance (from Read 2)

- The first way lets us inherit all the properties and methods that a new object created from the parent constructor function would have access to

  - Class inheritance uses this way. 
    - If the superclass's constructor creates object properties, `super` must be called to set those properties on the subclass. 
    - `super` must be called before you use `this` in the subclass's constructor. 
    - This ensures that subclass inherits <u>all the methods and properties</u> from parent class. 
  - The body of the parent constructor function is executed.
  - With `new` we’re causing the code within the constructor function to run and creating a link with a prototype chain. 
  - Setting `Dog.prototype` to point to the instance object of parent constructor function. 

  ```js
  // using new
  Dog.prototype = new Animal(); // // setting it to the instance object of Animal
  Dog.prototype.constructor = Dog; // gotta point the constructors back
  ```

- The second let’s us inherit only the properties that have been defined on the parent constructor function’s `prototype` object 

  - properties defined in the body of the function will not be inherited. 
  - with `Object.create(obj)` we’re simply creating the link without executing the code in the constructor function .

  ```js
  // using Object.create(Super-type.prototype)
  Dog.prototype = new Animal(); 
  Dog.prototype.constructor = Dog;
  Terrier.prototype = Object.create(Dog.prototype); // 
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

------

### Prototypal Inheritance vs pseudo-classical inheritance (4)

##### Similarities

- Both use prototypal delegation under the hood. 
  -  If the requested property isn't found, the object delegates the request to the object's prototype object.
  -  If the requested property isn't there either, the prototype object delegates the request to its own prototype object. 
  -  This process follows the prototype chain until the property or method is found or the end of the prototype chain is found.
- JavaScript does not have classes in the traditional sense. Prototypal inheritance is used to link objects together.

#### Prototypal Inheritance (object inheritance)

- simplier
- We sometimes call this form of inheritance **object inheritance** since it works with one object at a time.
- An object's internal `[[Prototype]]` property points to another object, and the object can delegate method calls to that other object. 
- Use `object.create` to create a new object that inherits properties from the prototype object.  
  - It takes an object called the **prototype object** as argument, and returns a new object that inherits properties from the prototype object. 
  - The newly created object has access to all properties and methods that the prototype object provides. 
- We've seen plenty of prototypal inheritance. For example: 

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

#### Pseudo-classical Inheritance pattern (constructor inheritance)

- Using functions to create objects. 

- Definition from lesson 3 summary: has types (e.g., classes) inherit from other types. This way, all objects of a given type can share behaviors from the same source.

- Also known as **constructor/prototype pattern**

  - a constructor's prototype object (the object referenced by its `prototype` property) inherits from another constructor's prototype. That is, a sub-type inherits from a super-type.

- Two syntaxes  to do inheritance 

  - Use `Object.create` to make one constructor a **sub-type** of the other, the **super-type**. Then restore the constructor property of the **sub-type**'s prototype object back to the **sub-type** function. 

  ```js
  Square.prototype = Object.create(Rectangle.prototype);
  Square.prototype.constructor = Square;
  ```

  - Use `extends` in class syntax

Example

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

------

### Single vs multiple inheritance (4)

- **Single Inheritance**: 
  - Objects can only have one prototype object.
  - And classes can extend only one other class. 
  - Objects/class can inherit from chain of prototypes, but it's not considered direct, so therefore it's single inheritance where each object directly inherits only from one other object. 
- This restriction can be limiting and sometimes makes modeling some problem domains challenging. For instance, suppose we have a `Pet` class from which several other specific classes inherit. The inheritance relationship might look like this:

![module class hierarchy](https://dbdwvr6p7sskw.cloudfront.net/images/js120/object_hierarchy_with_mixins.png)

- Note that the `swim` method is in two classes: `Dog` and `Fish`. Assuming that they have the same implementation, we would like to provide that method in one place, perhaps in a class. However, where can we move it? 
- Some programming languages allow classes to inherit from multiple classes, a functionality known as **multiple inheritance**. JavaScript doesn't support multiple inheritance, so a class can only inherit from one class.

> To be clear, when we say that an object can only have one prototype or that a class can only inherit from one class, we don't mean that the object or class can't inherit from an entire chain of prototypes or classes. It's perfectly acceptable for a `Whale` class to inherit from a `Mammal` class, which in turn inherits from an `Animal` class, which again inherits from the built-in `Object` type. Some students see this as multiple inheritance, but it is not: each object or class inherits directly from a single thing, so it is single inheritance. The chain of prototypes or superclasses merely comes along for the ride.

------

### Mix-ins; mix-ins vs. inheritance (4)

#### Mix-ins

- Summary: 

  - JavaScript objects can only inherit from one other object. This limitation makes it difficult to model certain domains using class or constructor-based inheritance. You can use mix-ins to share behavior between otherwise unrelated classes.
  - **Mixins** provide a way of addressing single inheritance: limitation that objects can only have one prototype object - can only directly 'inherit' from one super-type object.
  - The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix* that object *into* another object. 

- **Mix-ins**:  

  - Mix-ins are useful for organizing similar methods that may be relevant to multiple classes.
  - It's the only real workaround for the lack of multiple inheritance short of duplication. 
  - Addresses the limitation that objects can only have one prototype object
  - pattern that adds methods and properties from one object to another. 
  - It's not  inheritance / delegation with prototypes; the mix-in pattern copies the properties of one object to another with `Object.assign` or some similar technique. 

- Literal definition: 

  - A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all of the methods in the object.
    - The mix-in pattern involves creating a mix-in object containing certain methods, and using `Object.assign()` to *mix* that object *into* another object.

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

------

### Polymorphism (4)

- Summary : Polymorphism refers to the ability of objects of <u>different types</u> to respond to the <u>same</u> method invocation. It can be implemented through inheritance by *method overriding*. It can also be implemented through **duck typing**; by ensuring that objects of *different types* use the same method *name* to perform different but related functions, those objects can be interacted with in a uniform way.

**Polymorphism** refers to the ability of objects of different types to respond in different ways to the same message (or method invocation). 

-  <u>Object type</u>:  As long as the objects involved use the same method name and take the same number of arguments, we can treat the object as belonging to a specific category of objects.

- That is, data of different types can respond to a common interface. 
- When two or more object types have a method with the same name, we can invoke that method with any of those objects.
- When we don't care what type of object is calling the method, we're using polymorphism.
- Often, polymorphism involves inheritance from a common superclass. However, inheritance isn't necessary as we'll see in this assignment.
- It's a crucial concept in OO programming that can lead to more maintainable code.

- For example, assume we have a method that expects an argument that has a `move` method. We can pass it any type of argument, provided it has a compatible `move` method. The object might represent a human, a cat, a jellyfish, or, conceivably, even a car or train. That is, it lets objects of different types respond to the same method invocation.

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

------

### Reading OO code

#### Assignment: Twenty- One

[reference](https://launchschool.com/lessons/fb4809a8/assignments/62238c60)

[solution](https://launchschool.com/lessons/fb4809a8/assignments/2b1f136c)

- Rules
  - 

#### Assignment: OO Twenty-One

[reference](https://launchschool.com/lessons/93a83d87/assignments/ab05d402)

[solution](https://launchschool.com/lessons/93a83d87/assignments/83ff3989)





------

### Diagram

<img src="C:\Users\jenny\Downloads\diagram1 (1).jpg" alt="diagram1 (1)" style="zoom: 25%;" />

- All Function objects have a prototype property that references an object which contains a constructor property, which usually points back to the Function Object itself. 
  - Function objects include the Object Function, Array Function, or regular functions and constructors 
- Diagram not accurate because Object Function & Array Function themselves DO NOT have a `constructor` property. Object Function's constructor is Function. 
  - This is because JavaScript will look through all of Object’s properties, not find a ‘constructor’ property, and then will look for it in the object that it’s __proto__ references, which is `Function.prototype`. `Function.prototype` has a `constructor` property, which references Function and alas we have completed the journey!
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

