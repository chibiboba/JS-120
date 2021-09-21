### Review objects

**Objects** 

- are collections of properties where each property has a key and value. 
- one of  8 fundamental types.
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
  - **Enumerable properties**: means the property can be iterated over using `for..in` loop or `Object.keys()` method. 
    - All properties created by simple assignment or property initializer are enumerable by default. 
    - Properties defined via `Object.defineProperty` and such default enumerable flag to false. 
    - Enumerable properties show up in for...in loops unless the property's key is a Symbol. 
    - Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. 

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

##### Property Look-Up int he Prototype Chain

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
- But altering a prototype object's property alters the property of an inherited object. 

##### Q A 

**Q: Does changing a property in a prototype object change the property in the inherited object?**

A: Yes. The inherited object is accessing properties from prototype object. 

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

