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
- value can be any type, but **property keys are always strings**. If you define a property with a non-key string, it will first be converted into a string. 

```js
let obj = {};
obj[[1, 2, 3]] = 'three';

obj['1, 2, 3'] // 'three'
```

Accessing Properties

- **member access notation**: dot notation

  - Requires valid variable names. 

- **computed member access notation**: bracket notation. 

  - Can take any UTF-8-compatible string as the key. 
  - Can be computed on the fly -- any expression between the brackets gets evaluated as a string and used to reference the property. 

  ```js
  obj['a-key'] = 'four';
  
  obj.a-key 						 // SyntaxError(a-key is not a valid variable name)
  obj['a' + '-' + 'key'] // 'four'
  ```

Property Existence

- We get `undefined` when accessing a non-existent property. However we also get same value if we try to access a property set to `undefined`. 

- Two ways to distinguish one from another. 

  - `in` operator
  - `hasOwnProperty`

  ```js
  Object.keys(obj) = ['7', 'false', '1, 2, 3', 'a-key'];
  
  'false' in obj // true
  'true'  in obj // false
  
  obj.hasOwnProperty('7') // true
  obj.hasOwnProperty('8') // true
  ```

- Another indirect way of checking for property existence is to enumerate the properties of an object via `Object.keys` or `Object.getOwnPropertyNames`. 

  - Both return an array of the object's properties. 
  - Difference is that Object.keys returns an array of enumerable properties while `Object.getOwnPropertyNames` returns all properties. 
  - **Enumerable properties**: means the property can be iterated over. 
    - Not all properties are enumerable. In particular, most properties and methods of the built-in types are not. 
    - Usually, any properties or methods you define on for an object are enumerable. 
    - You can check whether a property is enumerable with the `Object.prototype.propertyIsEnumerable` method. ( don't have to remember this)
    - All properties created by simple assignment or property initializer are enumerable by default. 
    - Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. 
  - `for...in` iterates over all enumerable properties, including those in prototype chain. 
  - `Object.keys(obj)` only iterates over an object's "own" properties. 

  ```js
  Object.keys(obj)                    // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
  Object.getOwnPropertyNames(obj)     // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
  ```

------

### Object Prototypes

 **Object factories**: functions that create and return objects of a particular type. 

- Factory functions are one way to automate object creation.  
- Extracts code to one place so multiple objects can use it. 
- Entities that are common to multiple objects such as `start` and `stop` methods get declared in one place. On the other hand, arguments passed to the factory function distinguish one object from another, such as make, model and year. 
- Serves two purpose. 

1. Returns object that represent data of a specific type. 
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
```

With the `createCar` object factory, we can create as many car objects as our program needs.

```js
let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);
```

##### Prototypes

- Although factory functions are useful to extract code into one place so multiple objects can use it, JavaScript relies heavily on prototypes. 
- In JavaScript, objects can inherit properties and behavior from other objects. If another object, for instance, has a `language` property and a `speak` behavior, a new object can access and use `language` and `speak` without explicitly defining them in the new object. 
- **prototypal inheritance**
  - the object that you inherit properties and methods from is called the **prototype**. 
  - The function `object.create` creates a new object that inherits properties from an existing object. 
  - It takes an object called the **prototype object** as argument, and returns a new object that inherits properties from the prototype object. 
  - The newly created object has access to all properties and methods that the prototype object provides. 

```js
let a = {
  foo: 1,
  bar: 2,
};

let b = Object.create(a);
b.foo; // => 1
```

- unusual aspect is that the **inheriting object** (b) doesn't receive properties or methods of its own. Instead, it **delegates** property and method access to its prototype. 

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

- JavaScript objects use an internal `[[Prototype]]` property to keep track of their prototype. When you create an object with `Object.create`, the new object's `[[Prototype]]` property gets assigned to the prototype object.
  - `[[Prototype]]` is an *internal property* : you cannot access it directly in your code. 
  - However, you can access and replace its value with `Object` functions. 
  - For instance, `Object.getPrototypeOf` takes an object as an argument and returns its prototype object:

```js
> Object.getPrototypeOf(b)
{ foo: 1, bar: 2 }
```

- You can use `Object.setPrototypeOf` to set the prototype object of an object:
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

- All JavaScript objects have access to the `hasOwnProperty` method. But where does JS get that method? Because when we create a new object, we don't have to add our own `hasOwnProperty` method. 
- JavaScript obtains the method from the object's prototype.
- All JavaScript objects inherit from a prototype. 
- By default, all object literals inherit from `Object.prototype` constructor. 

For example

```js
> let a = {}
undefined

> Object.getPrototypeOf(a)
{}
```

- Passing an empty object to `Object.getPrototypeOf` returns a **default prototype** object. 
- The default prototype object is the prototype of all objects created using object literal syntax `{}`. 
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

##### The Prototype Chain

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

- **prototype chain**: objects that are prototypes of an object. 

  - The complete prototype chain also includes the default prototype, which is the prototype of object `a` in this case. 
  - Since the prototype of `Object.prototype` is `null`, the complete prototype chain looks like this: 

  ```
  c --> b --> a --> Object.prototype --> null
  ```

##### The `__proto__` Property 

- Older JS programs use a property called  `__proto__`: **dunder proto** instead of `Object.setPrototypeOf` and `Object.getPrototypeOf`. 
  - "dunder" is shortented version of "double underscore".
  -  The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property.
- As a rule, you should only use `__proto__` if you need to support very old browsers or old versions of Node, or as a convenient shortcut with temporary code or debugging operations. 

##### Property Look-Up int the Prototype Chain

- When you access a property on an object, JavaScript first looks for an "own" property with that name on the object. 
  - If the object does not define the specified property, JavaScript looks for it in the object's prototype, then if it can't find, it looks for it through the prototype chain. 
  - The process continues until it finds the property or it reaches `Object.prototype`. 
  - If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.
- So when two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence. 

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
```

What happens when you set a property to a different value? 

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
console.log(b.foo); // => 2 Object b was not mutated, because with assignment, properties are always treated as "own" property of current object.
```

- When assigning a property on a JavaScript object, the property is always treated as an "own" property. 
  - It assumes that the property belongs to the object named to the left of the property name. 
  - Even if the prototype chain already has a property with that name, it assigns the "own" property. 

```js
console.log(c.hasOwnProperty('foo')); // => true, foo becomes an "own" property of c. 
```

- Inherting properties from other objects also applies to methods. Methods in JS are merely properties that refer to functions. So when we discuss object properties, that also means methods. 

##### Implications

- This means that inherited objects can never alter prototype properties. 
- But altering a prototype object's property alters the property of an inherited object, because for inherited objects, are using prototype chain to look up the value of property. 
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
  
  Object.setPrototypeOf(dog, cat);
  
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
  says:' woof'
};

Object.setPrototypeOf(dog, cat);

console.log(cat.says); // meow
console.log(dog.says); // woof
```

**Q: What happens if you alter prototype property from inherited object?** 

A: Inherited objects can never alter prototype properties, because you are unable to reassign the prototype object's property value, by using an inherited object identifier. When you access the prototype object value by the inherited object's identifier to "alter" something you instead assign a property to the inherited object, which becomes inherited object's "own" property. 

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

  3 useful methods

  - `Object.prototype.toString()` returns a string representation of the object.
  - `Object.prototype.isPrototypeOf(obj)` determines whether the object is part of another object's prototype chain.
  - `Object.prototype.hasOwnProperty(prop)` determines whether the object contains the property.

##### Objects Without Prototypes

- Several times we've said that JavaScript objects all have a prototype object and that the prototype chain ends with `Object.prototype`
  -  In reality, there is a way to create objects that don't have a prototype and, hence, do not have a prototype chain that ends with `Object.prototype`.
-  Do this by setting the prototype to `null`.
  -  It lets you create a "clean" or "bare" object for use as a general key/value data structure.
  - The bare object doesn't carry around a bunch of excess baggage in the form of unneeded properties and prototypes:

```js
> let a = Object.create(null)
undefined

> Object.getPrototypeOf(a)
null
```

- Hoever, note that 

  - Objects created in this way do not have access to Object methods like `Object.prototype.hasOwnProperty` or `Object.prototype.toString`. 
  - They also don't have a prototype chain that ends with `Object.prototype` -- it ends with `null`.

- For the most part, you can assume that all JavaScript objects have `Object.prototype` at the top of their inheritance chain

  - You can also assume that all objects can use the usual selection of `Object` properties. 
  - However, be wary of situations where bare objects may be in use. If you have bare objects in your program, you must remember that the usual Object properties and methods don't exist on those objects. That's why you sometimes see code like this:

  ```js
  if (Object.getPrototypeOf(obj) && obj.isPrototypeOf(car)) {
    // obj has a non-null prototype AND
    // obj is in the prototype chain of car
  }
  ```

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
      break;
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

5. 

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

They don't always produce the same results since the second loop only iterates over `foo`'s "own" properties, but the first loop iterates over all of the object's enumerable properties, including those inside its prototype chain. 

The two loops produce the same results only when the prototype chain doesn't contain enumerable properties. 

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

   - Function declaration binds a function to an identifier, declares the existence of the function. 

   - Function declarations can't be anonymous.
   - Function declarations are **hoisted**: can be called before function is defined. 

   ```js
   functionName(); // can invoke function before function is defined.   
   
   function functionName() {
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
     let functionName = (parameter) => {
       
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

   - Function expressions are often anonymous. Such as callback functions for array methods like `forEach` and `map`. 

     ```js
     let squaredNums = [1, 2, 3].map(function(num) {
       return num * num;
     }); // => [1, 4, 9]
     ```

   - Function expressions **<u>don't</u>** have to be anonymous: You can name a function expression. 

     -  use `Function` keyword can be used to define a function inside an expression. 

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

     - The main advantage of naming a function expression occurs when the function throws an error (raises an exception). If the function has a name, the stack trace uses that name to help you determine where the error occurred. Without the name, JavaScript merely reports the location as "anonymous.

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

   - Arrow functions are always function expressions
   - Are always anonymous. 

   ```js
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

- No declaration syntax for arrow functions. 
- Arrow functions are always function expressions. 
  - Which means they be invoked by the variable name. 
  - Also means we often pass them around or assign them to variables or properties. 

- Arrow functions are always anonymous: there's no way to define a named arrow function. 
  - Arrow functions are <u>immediately invoked</u>(will discuss later) assigned to variables or properties, or passed around as arguments and return values. 
- Call back functions for methods like `forEach` and `map` are **<u>often</u>** anonymous functions, but <u>don't have to be!</u>   

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

##### First-Class Functions

- **first-class functions** or **first-class objects**:   means that functions are treated like any other variable: functions in JavaScript are values that we can assign to variables and properties, pass them to other functions, or return them from another function.

- Functions of all kinds, including declared functions, can be treated as values:

  - both `say` and `speak` refer to the same function.

  ```js
  function say(words) {
    console.log(words);
  }
  
  let speak = say;
  
  speak('Howdy!');   // logs 'Howdy'
  ```

  - In this case, we're passing the function `logNum` as an argument to the `forEach` method, which calls it three times. With each invocation of `logNum`, `forEach` passes it one of the array elements as an argument.
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

- 3 ways to do the same thing 

  ```js
  // variable 
  function logNum(num) {
    console.log('Number: ' + num);
  }
  
  [1, 2, 3].forEach(logNum);
  ```

  ```js
  // funcion expression 
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

##### Type of a Function Value

```js
let myFunc = function() {};
typeof myFunc; // => "function"
```

- Functions are a kind of object: they are a compound type that has its own properties and methods. 

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

-  Suppose that we need another function that uppercases all the elements in an array of strings. The solution may look like this:

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

  -  Typically, the function factory uses the arguments you pass to it to determine the specific job performed by the function it returns.

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
- This global object is the **implicit execution context** for function invocations. 
  - In Node.js, the global object is the object named `global`. 
  - In the browser, it's the `window` object. 
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
-  In this example, since there are no local or global variables named `foo`, JavaScript looks in the global object and finds the `foo` property. As a result, line `2` is identical to `global.foo`; it returns the value of the property `foo` from the global object.

- We discuss the global object here since you need to know where JavaScript gets all those global entities like `NaN`, `Infinity`, and `setTimeout`. 
  - It's not very often that you'll need to modify the global object, but you'll sometimes use it to set properties in Node that you need in multiple modules. 

------

### Implicit and Explicit Execution Context

