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
  - Object factories, or factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template. 
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
  - are an object form of functions used to create objects in JavaScript. 
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
  3. It sets the value of `this` inside the function to point to the new object. 
  4. It invokes the constructor function. Since `this` refers to the new object, we use it within the function to set the object's properties and methods. 
  5. Finally, once the function finishes running `new` returns the new object "automatically"; we don't explicitely return anything.
- What `new` doesn't do.
  - It does not create a new function. 

##### Side notes about constructor

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

##### Constructors with Prototypes

- Advantage of Constructor 
  - Can determine an Object's type(which constructor created the object) using `instanceof` or `constructor` property
  - Saves memory because constructors have a prototype property that references an object that instance objects inherit from. 
    - The instance object(inheriting objects) delegate method calls to `Object.prototype`. 
    - Thus, properties are shared through the prototype chain, unlike factory functions where every object create has an own copy of each property. 
- Constructor `prototype` property 
  - Constructors have a  `prototype` property, also known as the **function prototype**. 
  - This property points to an object that the the instance object created by a constructor inherits from. 
    - When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the current value of `Foo`'s `prototype` property. 
    - The inheriting object's prototype references `Foo.prototype`. 
  - Every function has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself. 

#### Methods and properties; instance and static methods and properties 1, 3

#### Prototypal and pseudo-classical inheritance 4

- Prototypal Inheritance (prototypal delegation)
- Pseudo-classical inheritance (constructor inheritance)
  - Using functions to create objects. 

#### Encapsulation - 1, 3

- **Encapsulation**: grouping related properties and methods in a single object. 
  - bundle state(data) and behavior (operations related to that data) into a single entity (object). 

#### Polymorphism- 4

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

  

#### Single vs multiple inheritance

#### Mix-ins; mix-ins vs. inheritance 4

#### Higher-order functions 2

- **Higher-order function**:  are functions that return another function or take another function as an argument. 
- Higher-order functions let the programmer use powerful and flexible abstractions.
  - abstracts away similar structures of functions and leave specific mapping up to function's caller. 
  - `map` does this : it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. 
  - `map` method, along with several other array methods, are higher-order functions since it takes another function as argument. 
- Function factories are higher- order functions

#### The global object 2

- JavaScript creates a global object when it starts running. 
  - In Node.js, the global object is the object named `global`. [object global]
  - In the browser, it's the `window` object. 
- This global object is the **implicit execution context** for function invocations. 
- Undeclared variables are added to the global object as property. 
  - When you assign a value to a variable without using `let` `const` or `var` keywords, the variable gets added to global object as property. 

#### Method and property lookup sequence 2

##### Property Look-Up in the Prototype Chain 

- When you access a property on an object, JavaScript looks for the property first in the object, then its prototype chain, all the way up to `Object.prototype`.If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.

- Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above. 
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

- Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well. 
- Property assignment creates a new "own" property in the object. 

#### Implicit and explicit execution context 2

- **Execution context**:  the **environment** in which a function executes.
- There are two basic ways to set the context when calling a function or method
  1. **Explicit**: The execution context that you set explicitly: using `call` `apply` or `bind`. 

  2. **Implicit**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context.

     3 ways to provide an implicit execution context. 

     - Regular function calls, JavaScript supplies an implicit context: the <u>global object.</u>
     - Method calls use the <u>calling object</u> as its implicit execution context. 
     - A constructor call with `new` uses the <u>new object</u> as its implicit execution context. 

#### Methods and functions; method invocation vs. function invocation 1,2 

- **Regular function** calls (**standalone** function) <u>implicitly</u> use the **global object** as their execution context
- **method calls** <u>implicitly</u> use the calling object as their context.


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



#### Built-in constructors like `Array`, `Object`, `String` and `Number` 3

#### Reading OO code

#### Reminders

##### Default parameters

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

