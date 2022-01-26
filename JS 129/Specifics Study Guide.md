#### Questions

- Losing reference to `object.prototype` if it is reassigned to a different object. 

- instance properties include the ones inherited from `object.prototype`??

  

## Specific Topics of Interest

#### Objects, object factories, constructors and prototypes, OLOO, and ES6 classes 1, 3,4 

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

##### Constructors  (main points)

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

##### Constructors with Prototypes

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

##### Classes

------

#### Methods and properties; instance and static methods and properties 1, 3

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

- **Instance Methods**: any method defined in any prototype in the prototype chain of an object is considered to be an instance method of an object. 
  - Methods usually aren't stored directly in instances, but rather in the object's prototype object (the object referenced by **prototype** property). 
  - Methods aren't stored in the object object, but still operate on individual instances so we refer to them as instance methods. 

##### Static Properties

- **Static properties** are defined and accessed directly on the <u>constructor</u>, not on an instance or a prototype.

  - Static properties are properties about a constructor. 

  - Typically, static properties belong to the type (e.g., `Dog`) rather than to the individual instances or the prototype object.

    

------

#### Prototypal and pseudo-classical inheritance 4

- Prototypal Inheritance (prototypal delegation)
- Pseudo-classical inheritance (constructor inheritance)
  - Using functions to create objects. 

------

#### Encapsulation - 1, 3

- **Encapsulation**: grouping related properties and methods in a single object. 
  - bundle state(data) and behavior (operations related to that data) into a single entity (object). 

------

#### Polymorphism- 4

------

#### Collaborator objects - 1

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

#### Single vs multiple inheritance

------

#### Mix-ins; mix-ins vs. inheritance 4

------

#### Higher-order functions 2

- **Higher-order function**:  are functions that return another function or take another function as an argument. 
- Higher-order functions let the programmer use powerful and flexible abstractions.
  - abstracts away similar structures of functions and leave specific mapping up to function's caller. 
  - `map` does this : it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. 
  - `map` method, along with several other array methods, are higher-order functions since it takes another function as argument. 
- Function factories are higher- order functions

------

#### The global object 2

- JavaScript creates a global object when it starts running. 
  - In Node.js, the global object is the object named `global`. [object global]
  - In the browser, it's the `window` object. 
- This global object is the **implicit execution context** for function invocations. 
- Undeclared variables are added to the global object as property. 
  - When you assign a value to a variable without using `let` `const` or `var` keywords, the variable gets added to global object as property. 

------

#### Method and property lookup sequence 2

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

#### Implicit and explicit execution context 2

- **Execution context**:  the **environment** in which a function executes.
- There are two basic ways to set the context when calling a function or method
  1. **Explicit**: The execution context that you set explicitly: using `call` `apply` or `bind`. 

  2. **Implicit**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context.

     3 ways to provide an implicit execution context. 

     - Regular function calls, JavaScript supplies an implicit context: the <u>global object.</u>
     - Method calls use the <u>calling object</u> as its implicit execution context. 
     - A constructor call with `new` uses the <u>new object</u> as its implicit execution context. 

------

#### Methods and functions; method invocation vs. function invocation 1,2 

- **Regular function** calls (**standalone** function) <u>implicitly</u> use the **global object** as their execution context
- **method calls** <u>implicitly</u> use the calling object as their context.
  - When you call a method on an object, JavaScript binds`this` to the calling object. If it doesn't find the method in that object, but does find it in the prototype, that doesn't change the value of `this`. 

------


#### Function execution context and `this` 2

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

------

#### Dealing with context loss 2

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

#### `call`, `apply`, and `bind` 2

- `call`: invokes a function or method with an explicit execution context - the first argument passed to it 

  - Syntax

    ```
    someObject.someMethod.call(context, arg1, arg2 …)
    someObject.someMethod.call(context, ...args);
    function.call(context)
    ```

  - Can also pass a second array argument using spread operator. 

    ```js
    let args = [arg1, arg2, arg3]
    function.call(context, ...args);
    ```

- `apply`: Calls a function or method with an explicit execution context(the first argument passed to it), and optionally passes an array of arguments to the called function or method. 

  - Syntax

    ```js
    someObject.someMethod.apply(context, [arg1, arg2, arg3…])
    function.apply(context)
    ```

- `bind`: **Bind** returns a new function that is permanently bound to the context passed to **bind**  as first argument. 

  - Syntax

    ```js
    newFunc = someObject.someMethod.bind(context)
    // Or 
    function.bind(context)
    ```

  - Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. Instead it returns a new function that is permanently bound to the context argument.  

  - We have to call on the new function using (). 

  - You cannot alter the execution context of the resulting function, even if you use `call` `apply` or call `bind` a second time. 

------

#### `Object.assign` and `Object.create`

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

#### Built-in constructors like `Array`, `Object`, `String` and `Number` 3

------

#### Reading OO code

------

#### Reminders

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

