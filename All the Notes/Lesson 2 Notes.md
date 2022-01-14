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

##### `[[Prototype]]`  property

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

##### The Prototype Chain

- https://dev.to/aman_singh/an-easy-explanation-to-prototypal-delegation-in-javascript-3ok2

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

- The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property.

- Older JS programs use a property called  `__proto__`: **dunder proto** instead of `Object.setPrototypeOf` and `Object.getPrototypeOf`. 
  - "dunder" is shortented version of "double underscore".
  - The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property.
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
  - In Node.js, the global object is the object named `global`. [object global]
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

##### Execution Context

- Earlier, we said that `this` refers to the object that contains the method. That's true, but there's a bit more nuance to how JavaScript determines the value of `this` in a function or method call. 
- **Execution context**:  the **environment** in which a function executes.
  - In JavaScript, it most commonly refers to the current value of the `this` keyword. 
    - in other words, `this` refers to the **environment** in which a function executes. 
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
  - We say the execution context is implicit because function invocation doesn't supply an explicit alternative. 

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
  let baz = foo();
  baz.bar; // Then the implicit execution context would be baz object, or foo object? Because when invoking a method, it uses the object used to call the method as the implicit context. 
  ```

##### Explicit Function and Method Execution Context

- Using parenthesis after a function or method name is not the only way to invoke it.
  - When you invoke a function with parentheses, JavaScript uses the global object as the implicit context. 
  - When you invoke a method, it uses the object that you used to call the method as the implicit context. 
- You can provide an explicit context to any function or method, and it doesn't have to be the global object or the object that contains the method. 
- Instead, you can use any object -- or even `null` -- as the execution context for any function or method. 
-  There are two main ways to do that in JavaScript: `call` and `apply`.

##### Explicit Execution Context with `Call`

- Remember that all JavaScript functions are objects: they have properties and methods just like any other object. 

- One method that all JavaScript functions have is the `call` method. 

  - The **`call`** method calls a function with an explicit execution context. 
  - The first argument to `call` provides the explicit context for the function invocation. 
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
  // code becomes like this 
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
  logNum() {
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
// code becomes like this
let obj1 = {
  logNum() {
    console.log(this.num);
  }
};

let obj2 = {
  num: 42, 
  logNum = obj1.logNum, // Note: no parentheses, we are setting it to the function, not return value of the function. 
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
console.log(obj.num); // => 47
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

- The general syntax for `call` is 

```js
someObject.someMethod.call(context, arg1, arg2, arg3, ...)
```

##### Explicit Execution Context with `apply`

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

##### Summary

- All JavaScript functions and methods execute within an execution context, sometimes called its `this` binding. 
  - How `this` gets bound depends entirely on how the function is invoked. 
  - You can't tell a function's execution context by merely looking at how the function is defined or where it's defined: you must examine the invocation itself. 
- Regular function calls implicitly use the global object as their execution context, while method calls implicitly use the calling object as their context. 
  - You can override this behavior by setting the execution context explicitly with either `call` or `apply`. 
- The mechanics of context binding is an essential but difficult concept. Most difficulties arise from forgetting that JavaScript does not use *lexical scoping rules* to determine the binding. 
  -  For instance, if you use `this` inside a method of `obj`, you expect that `this` refers to `obj`. However, that's not always the case.
  - It's important to remember that the rules for `this` are entirely different from the rules for variable scope. 
  - While a variable's scope is determined by where you write the code, `this` depends on how you invoke it.

------

### Practice Problems: Implicit and Explicit Function Execution Contexts

1. What will the following code output? Try to determine the results without running the code.

   ```js
   function func() {
     return this;
   }
   
   let context = func();
   
   console.log(context);
   ```

   

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

4. What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

   

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

------

### Hard Binding Functions with Contexts

- JavaScript has a third way to specify the execution context: the `bind` method on function objects.
- Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. Instead it returns a new function that is permanently bound to the context argument.  
  - In detail: `bind`'s context is the original function and returns a new function that is permanently bound to the context passed to `bind` as first argument. When we call this new function, this new function calls on the original function/method using `apply` or `call`, passing the permanent context to it. The original function and its context is not changed.
  - So basically `bind` just creates a new function which implements an `apply` or `call`, with a permanent context passed to it. 
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

- we don't call the function `sumNum` immediately as we do with `call` and `apply`. Instead `bind` returns a new function `sumNum2`. The new function is **permanently ** bound to the object passed as `bind`'s first argument. 
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

JavaScript implements `bind` method like this: 

```js
Function.prototype.bind = function (...args) {
  let fn = this; // bind's context is the original function function ()
  let context = args.shift();

  return function () {  										// bind returns a function function(), which is permanently bound to context. 
    return fn.apply(context, args); // this function calls the original function fn. using apply. 
  };
};
```

- While you learned enough to understand most of the code, it's not really important to wrap your head around it. 
- What's important is to recognize that `bind`'s context is the original function, and it <u>returns a new function that calls the original function with the context supplied to bind as its first argument.</u> 
  - This code shows why binding makes permanent changes -- no mater what you do to the returned function, you can't change the value of `context`. 
- It's also important to know that `bind` does not contradict the statement that context is determined entirely based on how you call a function or method, not where you call it or how you define it. 
  - Technically, `bind` defines a new function. However, when we call that function, its implementation -- as shown above-- calls the original function using `apply`. 
  - Therefore, it's still the "how" of the call that determines the context, not the definition or location. 

> - A trap is thinking that `bind` permanently alters the original function. 
> - It's important to remember that `bind` returns a new function, and the new function is permanently context-bound to the object provided as the first argument to `bind`. 
> - The original function isn't changed and doesn't have its context changed. 

```js
let greetings = {
  morning: 'Good morning, ',
  afternoon: 'Good afternoon, ',
  evening: 'Good evening, ',

  greeting: function(name) {
    let currentHour = (new Date()).getHours();

    if (currentHour < 12) {
      console.log(this.morning + name);
    } else if (currentHour < 18) {
      console.log(this.afternoon + name);
    } else {
      console.log(this.evening + name);
    }
  }
};

let spanishWords = {
  morning: 'Buenos dias, ',
  afternoon: 'Buenas tardes, ',
  evening: 'Buena noches, '
};

let spanishGreeter = greetings.greeting.bind(spanishWords);

spanishGreeter('Jose'); // spanishGreeter calls on greeting method, with spanishWords as the permanent context. 
spanishGreeter('Juan');
```

- `spanishGreeter('Jose')` will log something like `'Buenas tardes, Jose'` instead of `'Good afternoon, Jose'`.

##### Summary

- In this assignment, we saw a third way to specify the execution context.

- Unlike `call` and `apply`, though, `bind` returns a new function that is permanently bound to the context that's provided to `bind` as the first argument. 
- You cannot alter the execution context of the resulting function, even if you use `call`, `apply`, or try calling `bind` a second time.

------

### Practice Problems: Hard Binding Functions with Contexts

1. What method can we use to bind a function permanently to a particular execution context?

   Show Solution

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

   Show Solution

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
   
   ```plaintext
   Amazebulous!
   ```
   
   Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`. In keeping with this, the last line of our code outputs "Amazebulous!", because the function `bar`'s <u>context has been permanently bound to `obj`.</u>

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

- You can use `foo.call(john)` to restore the original context, but suppose you don't execute the function right away or you need to pass it to another function for execution? By the time `foo` gets called, `john` made be out of scope. 

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

- One way to solve this problem is to change `repeatThreeTimes` to accept the context object as the second parameter, then pass the context to `repeatThreeTimes` when calling it. 

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

##### Inner Function Not Using the Surrounding Context

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
  - Once again, a function or method's execution context depends soley on how you invoke it, now on how and where it's defined. 
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
      console.log(self.a + ' ' + self.b); // Can use self instead of `this` to access ths the correct context object. 
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

##### Exception 1: 

- Arrow functions ignore the rule that a function or method's execution context depends soley on how you invoke it, now on how and where it's defined. 
- This exception comes in very handy when dealing with context loss. 
- A property of arrow functions is that <u>they inherit their execution context from the surrounding scope</u>. 
- An Arrow function defined inside another function always has the same context as the outer function: 
  - Does that mean the most outer function scope?? 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
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

##### Arrow function Exception 2

- Don't try to use arrow functions as methods on an object. 

```js
let obj = {
  a: 5,

  foo: () => {
    console.log(this.a);
  },
};

obj.foo(); // => undefined
```

- This code doesn't work because arrow functions always get the value of `this` from the surrounding context. 
- The surrounding context is the **global object**. The reason for that is simple: the `let` statement in this example is in the program's top level code, so its context is the global object. That means `this` inside the object literal is also the global object, so `this` on line 5 refers to the global object, not `obj`. 
- Note that `this` in `obj.foo` is not determined by how the method is called. 
  - We call the method on line 9, and we seem to be telling JavaScript to use `obj` as the context. 
  - Instead, the context ends up being the global object. 
  - That seems to contradict our repeated statements that the context is determined entirely by how a function or method is invoked. That's clearly not the case here; it certainly violates the rule.
  -  However, you won't usually see code like this in practice.
  - In general, do not use arrow functions ro write methods. As long as you don't use arrow functions as methods, you can ignore this exception (only exception 2)

------

### Dealing with Context Loss III

- Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 

##### Function as Argument Losing Surrounding Context

- Here we use `john` object to call the `greetings` method, with `john` as its context. `greetings` then calls `repeatThreeTimes` function with a function argument whose body refers to `this`. `repeatThreeTimes` calls its argument three times with an implicit context. 
- Since context is determined by how a function is invoked, the context for all three invocations will be the global object. Thus, the `this` inside the function passed to `repeatThreeTimes` is the global object, not `john`. 

```js
function repeatThreeTimes(func) {
  func(); // this loses context here. Now the context is the global object. 
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

- Problem here is the function expression is passed as argument to `forEach` so its executed with the global object as context. 
  - Remember: array iteration methods like `forEach` invoke and executes the callback function on every element in the array. 

```js
let obj = {
  a: 'hello',
  b: 'world',
  foo: function() {
    [1, 2, 3].forEach(function(number) {
      console.log(String(number) + ' ' + this.a + ' ' + this.b); // forEach invokes the callback function, and `forEach` is in the global object?
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
    }.bind(this)); // binding foo method, which is a function expression. 
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world
```

- `this` on line 6 refers to `obj` because the order of method calls starts from line 11, where method `foo` is invoked by `obj` and the context is set to `obj`. Then on line 7, a new function is permanently bound to context of `this`, which still refers to `obj`. The new function invokes the original `foo` function with permanent context of `obj`, so on line 6, `this` refers to `obj`.  

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
   
   logReturnVal(turk.getDescription); method is passed to logReturnVal. 
   ```

   On line 16, the context for logReturnVal is global object, since logReturnVal is called as a standalone function. On line 12, func() is invoked as a standalone function too, so the execution context is the global object. 

   ```terminal
   # the actual output is 
   undefined undefined is a undefined.
   ```

   Show Solution

   When we pass `turk.getDescription` to `logReturnVal` as an argument, we remove the method from its context. As a result, when we execute it as `func`, `this` points to the global object rather than `turk`. Since `global` doesn't have properties defined for `firstName`, `lastName`, or `occupation`, the output isn't what we expect.

2. Modify the program from the previous problem so that `logReturnVal` accepts an additional `context` argument. If you then run the program with `turk` as the context argument, it should produce the desired output.

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

   Show Solution

   ```js
   function logReturnVal(func, context) {
     let returnVal = func.call(context);
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription, turk);
   ```

   By using `call` to invoke `func` and passing it the `context` argument, we can provide the desired context for the function. On line 16, we invoke `logReturnVal` with `turk` as the `context` argument, then pass that value to `call`; the result is our desired output.

   Note that we can use `apply` instead of `call`:

   ```js
   let returnVal = func.apply(context);
   ```

   It's also possible to use `bind`, but given the condition that `logReturnVal` must accept a `context` argument, that solution leads to this slightly odd code:

   ```js
   let returnVal = func.bind(context)(); // need parentheses to invoke the returned function
   ```

   This code is slightly unclear since it implies that we want the binding to be permanent. Use `call` or `apply` instead.

3. Suppose that we want to extract `getDescription` from `turk`, but we always want it to execute with `turk` as its execution context. How would you modify your code to do that?

   ```js
   function logReturnVal(func, context) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription.bind(turk));
   ```

   Show Solution

   ```js
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   let getTurkDescription = turk.getDescription.bind(turk);
   logReturnVal(getTurkDescription);
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

   No because on line 5, forEach invokes the callback function, this method invocation sets the execution context to `forEach` and `forEach` is a method in the global object. 

   Show Solution

   Since functions lose their surrounding context when used as arguments to another function, the context of line 6 is not the `TESgames` object. Instead, it is the global object. Thus, `this.seriesTitle` resolves to `undefined` rather than `"The Elder Scrolls"`.

5. Use `let self = this;` to ensure that `TESgames.listGames` uses `TESGames` as its context and logs the proper output.

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

   Show Solution

6. The `forEach` method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:

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

   Show Solution

7. Use an arrow function to achieve the same result:

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(title => { // arrow function inherits from surrounding context, what does that mean? So instead of inherting from forEach, which invokes the arrow function, it inherits from the context of listGames(), which is TESgames?
         console.log(this.seriesTitle + ': ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   Show Solution

   **<u>Note that this solution does not pass `this` to `forEach`.</u>**

8. Consider the following code:

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment(); // invoked as a standalone function, so `this.a` on line 5 references a property of global object rather than a property of foo. 
       // Example of losing context in nested functions. 
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   What will the value of `foo.a` be after this code runs?

   Show Solution

   The value of `foo.a` will be `0`. Since `increment` gets invoked as a function, `this.a` on line 5 references a property of the global object rather than a property of `foo`. Thus, the property `foo.a` isn't modified by the `increment`; its value remains 0.

9. Use one of the methods we learned in this lesson to invoke `increment` with an explicit context such that `foo.a` gets incremented with each invocation of `incrementA`.

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
     let increment = () => {
     	this.a += 1;
      }
     	increment();
     },
    
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   Show Solution

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment.apply(this);
     }
   };
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

------

### Lesson 2 Summary

- **Default prototype**: The default prototype is the prototype object of the `Object` constructor, referenced by `Object.prototype`
  - `Object.prototype` is the `prototype`property of the Object constructor. 

- Every object has an internal `[[Prototype]]` property that points to a special object, the object's prototype. It is used to look up properties that don't exist on the object itself. 
  - `Object.create` returns a new object with the passed-in argument as its prototype.
  - You can use `Object.getPrototypeOf` and `obj.isPrototypeOf` to check for prototype relationships between objects.
- Looking up a property in the prototype chain is the basis for prototypal inheritance, or property sharing through the prototype chain. Objects lower in the chain inherit properties and behaviors from objects in the chain above. 
  - In other words, **downstream** objects can delegate properties or behaviors to **upstream** objects. ??
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

##### Context Loss & their solutions

- Method is copied out of an object and used elsewhere. 
  - Accept context object as second parameter (not ideal approach since you can't always change methods, and not good to pass a lot of arguments to functions)
  - Hard-bind the method's context by using `bind`. 
- Nested Functions
  - Variable in outer scope
  - Call Inner function with explicit context
  - use `bind`
  - Use arrow function
- Passing functions as arguments: Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 
  - Variable
  - `bind`
  - arrow function
  - `thisArg` 

##### Execution context rules

```js
function foo() {
  console.log("this refers to: " + this);
}

foo();
// this refers to: [object global]
// Foo is passed to console.log, and foo is invoked as a standalone object.  
```

- When is the execution context / `this`/ bound? 
  - It is bound based on how function is invoked. 
  - It is usually bound during function invocation /execution actually, there are exceptions such as `bind`, where the function is not immediately invoked and a copy of the function is returned with the execution context bound to the copy.

- Depends on where `this` is

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
        return this.firstName + this.lastName; // inside a method, so context is person which is what the method is in
      },
    };
    
    console.log(person.fullName); // Rick Sanchez
    ```

    

- Every single javascript invocation/ call has its own **execution context**

  - Regular function calls (functions called as **standalone** function) **implicitly** use the global object as their execution context, while method calls **implicitly** use the calling object as their context. 
    - Tricky: Why is `forEach` executed with global context? It's not. It's the callback function that is executed with global context. The implicit execution context of `forEach` is the calling object, the array `[1, 2, 3]`. In the case of the function expression, we know that the execution context is determined by how the function is invoked. The function expression will be invoked within the body of the `forEach` function, but because of context loss, the execution context will be implicitly set to the global object. 
  - When strict mode is enabled,  implicit `this` is assigned to `undefined` instead of the global object. 
  - You can override this behavior by setting the execution context explicitly with either `call` , `apply`, or `bind`
  - Arrow functions are also exceptions to this rule.

- **Arrow functions** are permanently bound to the execution context of the **enclosing function invocation**.

  - **enclosing function invocation**: the most <u>immediate</u> function scope in which the arrow function is defined. This enclosing function is likely a function declaration or expression, in which case its execution context is determined by how its invoked. 
    - The execution context of this enclosing function is determined by  how it is invoked. 
    - Tricky: `forEach` is not considered enclosing function for arrow functions, why? Because arrow functions are passed to `forEach` - it's not defined inside `forEach`. 
  - They are permanently bound to the enclosing function execution context, but it doesn't mean the context can't change. If the enclosing function context changes, it also changes. 
  - Exception: don't use arrow functions as object methods. 

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
  - Never use arrow functions to write methods. As long as you don't use arrow functions as methods, you can ignore this exception. 

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
  // That's why bar() has execution context of the global object, rather than `obj`. 
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      function bar() {
        console.log(this.a + ' ' + this.b);
      }
  
      bar(); // bar() is invoked as a standalone function. 
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

- EXPLANATION: On line 5, The implicit execution context of `forEach` is its calling object, the array `[1, 2, 3]`.   But a function expression is passed to `map` as argument, and when functions are passed as arguments, they lose surrounding context, so the execution context is then implicitly set to the global object.  If `map` took a `thisArg` argument, then the execution context would be `thisArg`. 

- OTHER EXPLANATION( my own reasoning):
  - `forEach` will invoke the callback within its own scope? 
  - In this case of callback function being a function expression, we know that the execution context is determined by how the function is invoked. 
  - What's happening here is that a *function* is invoking / executing another function- so the function expression is almost like being invoked as a standalone function. Normally,  execution context(`this`) depends on the *object* that invoked the method that `this` is in. 
  - That is why when functions are passed as arguments, they lose the original surrounding context of `this`. 

  ```js
  function repeatThreeTimes(func) {
    func(); // this loses context here. Now the context is the global object. 
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
  }
  ```

  

##### Solution to above problem

- use lexical scoping rules, such as solution 3: arrow function, or solution1: preserve context with variable in outer scope.

------

#####  Downstream objects can delegate properties or behaviors to upstream objects. ?? 

- What does "delegate" mean? What does "delegate properties and behaviors" mean? 

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

- Here a downstream object is delegating a behavior to an upstream object.
- My understanding: does "delegate" mean "access" a property? 



------

##### 
