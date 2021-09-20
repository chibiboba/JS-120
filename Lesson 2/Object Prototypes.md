# Object Prototypes

In an earlier lesson, we learned about the concept of automating object creation and talked about why we need such automation. We studied factory functions as one way to automate object creation. An object factory serves two purposes:

1. It returns objects that represent data of a specific type.
2. It reuses code.

Let's examine another factory function:

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

With this `createCar` object factory, you can create as many car objects as your program needs:

```js
let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);
```

Factory functions give us the ability to create objects of the same type by merely calling a function. Entities that are common to multiple objects, such as the `start` and `stop` methods, get declared in one place. On the other hand, arguments are passed to the factory function to distinguish one object from another, such as the make, model, and year. Some entities, like `started`, don't fall easily into either category, but that's not important here.

As useful as factory functions are, there are other ways to extract code into one place so that multiple objects can use it. In JavaScript, we rely heavily on prototypes to accomplish this.

### Prototypes

In JavaScript, objects can inherit properties and behavior from other objects. If another object, for instance, has a `language` property and a `speak` behavior, a new object can access and use `language` and `speak` without explicitly defining them in the new object.

More specifically, JavaScript objects use something called **prototypal inheritance**. The object that you inherit properties and methods from is called the **prototype**. The function `Object.create` creates a new object that inherits properties from an existing object. It takes an object that is called the **prototype object** as an argument, and returns a new object that inherits properties from the prototype object. The newly created object has access to all the properties and methods that the prototype object provides.

```js
let a = {
  foo: 1,
  bar: 2,
};

let b = Object.create(a);
b.foo; // => 1
```

An unusual aspect of this relationship is that the inheriting object (`b` above) doesn't receive any properties or methods of its own. Instead, it **delegates** property and method access to its prototype. You can see this in the node console:

```node
> let a = { foo: 1, bar: 2 }
undefined

> let b = Object.create(a)
undefined

> b.foo
1

> b
{}
```

Evaluating `b` in the node console gives us an empty object, which demonstrates that `b` doesn't have any properties of its own. We can also use the `hasOwnProperty` method to demonstrate this:

```js
let a = {
  foo: 1,
  bar: 2,
};

let b = Object.create(a);

console.log(a.hasOwnProperty('foo')); // => true
console.log(b.hasOwnProperty('foo')); // => false
```

The `hasOwnProperty` method is available on all JavaScript objects. It takes the name of a property as a string and returns `true` if the object has a property by that name, `false` if it does not.

JavaScript objects use an internal `[[Prototype]]` property to keep track of their prototype. When you create an object with `Object.create`, the new object's `[[Prototype]]` property gets assigned to the prototype object.

Note that `[[Prototype]]` is an *internal* property: you cannot access it directly in your code. However, you can access and replace its value with `Object` functions. For instance, `Object.getPrototypeOf` takes an object as an argument and returns its prototype object:

```node
> Object.getPrototypeOf(b)
{ foo: 1, bar: 2 }
```

You can use `Object.setPrototypeOf` to set the prototype object of an object:

```js
let a = {
  foo: 1,
  bar: 2,
};

let b = {};
Object.setPrototypeOf(b, a);

console.log(b.foo);                    // => 1
console.log(b);                        // => {}
console.log(Object.getPrototypeOf(b)); // => { foo: 1, bar: 2 }
```

The code on lines 6 and 7 is effectively identical to the code that we used on line 6 of the `Object.create` example. However, in this example, we declare and initialize `b` to an empty object rather than using `Object.create`; we then use `Object.setPrototypeOf` to set the prototype object.

An important consideration when dealing with prototypes is that objects hold a *reference* to their prototype objects through their internal `[[Prototype]]` property. If the object's prototype changes in some way, the changes are observable in the inheriting object as well.

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

#### The Default Prototype

As mentioned above, all JavaScript objects have access to the `hasOwnProperty` method. Where does JavaScript get that method? When we create a new object, we don't have to add our own `hasOwnProperty` method. Instead, JavaScript obtains the method from the object's prototype. All JavaScript objects inherit from a prototype. For instance:

```node
> let a = {}
undefined

> Object.getPrototypeOf(a)
{}
```

Passing an empty object to `Object.getPrototypeOf` returns a default prototype object. That object is the prototype for all objects created by using the object literal syntax (e.g., `{ a: 2 }`). The default prototype is the prototype object of the `Object` constructor, `Object.prototype`. We'll see what that means a little later. For now, all you need to know is that `Object.prototype` provides the default prototype.

#### Iterating Over Objects with Prototypes

Now is an excellent time to revisit the [Iteration](https://launchschool.com/books/javascript/read/objects#iteration) section from the Objects chapter of our Introduction to Programming With JavaScript book. It discusses the impact of object prototypes on iteration. In particular:

- A `for/in` loop iterates over an object's properties. The iteration includes properties from the objects in its prototype chain. Use `hasOwnProperty` to skip the prototype properties.
- `Object.keys` returns an object's "own" property keys -- you do not need to use `hasOwnProperty`.

Note that both `for/in` and `Object.keys` deal with **enumerable properties**, which is merely a way of talking about properties you can iterate over. Not all properties are enumerable. In particular, most properties and methods of the built-in types are not. Usually, any properties or methods you define on for an object are enumerable. You can check whether a property is enumerable with the `Object.prototype.propertyIsEnumerable` method.

```js
let arr = [1, 2, 3];
console.log(arr.propertyIsEnumerable('length'));                     // false
console.log(arr.propertyIsEnumerable('2'));                          // true
console.log(arr.propertyIsEnumerable('forEach'));                    // false
console.log(Array.prototype.propertyIsEnumerable('forEach'));        // false

function Foo() {
  this.bar = "qux"
}

Foo.prototype.baz = function() {};
let foo = new Foo();
console.log(foo.propertyIsEnumerable('bar'));                        // true
console.log(Object.getPrototypeOf(foo).propertyIsEnumerable('baz')); // true
```

You do not have to remember how to use `propertyIsEnumerable`.

#### The Prototype Chain

Earlier, we said that all JavaScript objects could inherit from another object using the prototype model. Since the prototype of an object is itself an object, the prototype can also have a prototype from which it inherits. For example:

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

In this code, object `c` inherits from object `b` which, in turn, inherits from `a`. Stated differently, `b` is the prototype of `c` and `a` is the prototype of `b`. All properties that you can access on `a` or `b` are now available on `c`. We say that objects `b` and `a` are part of the **prototype chain** of object `c`. The complete prototype chain also includes the default prototype, which is the prototype of object `a` in this case. Since the prototype of `Object.prototype` is `null`, the complete prototype chain looks like this:

```plaintext
c --> b --> a --> Object.prototype --> null
```

### The `__proto__` Property

Many older JavaScript programs use a property named `__proto__`, which is pronounced **dunder proto**, instead of `Object.setPrototypeOf` and `Object.getPrototypeOf`. "dunder" is a shortened version of "double underscore", which alludes to the double underscores at the beginning and end of the name. The `__proto__` property is a *deprecated*, non-hidden version of the `[[Prototype]]` property. As a rule, you should only use `__proto__` if you need to support very old browsers or old versions of Node, or as a convenient shortcut with temporary code or debugging operations. You may run into code that uses it, so you need to at least be aware of it.

### Property Look-Up in the Prototype Chain

When you access a property on an object, JavaScript first looks for an "own" property with that name on the object. If the object does not define the specified property, JavaScript looks for it in the object's prototype. If it can't find the property there, it next looks in the prototype's prototype. This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evaluates to `undefined`.

The implication here is that when two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence. Let's see an example:

Copy Code

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

How about setting a property? What do you think happens when we set the `foo` property on object `c` to a different value?

```js
c.foo = 42;
```

Is `b.foo` assigned to `42` by this code? How can you test that in node?

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
console.log(c.foo); // => 42
console.log(b.foo); // => 2
```

Interesting! Object `b` wasn't mutated! When assigning a property on a JavaScript object, it always treats the property as an "own" property. That is, it assumes that the property belongs to the object named to the left of the property name. Even if the prototype chain already has a property with that name, it assigns the "own" property. Here, `foo` becomes an "own" property of `c`:

```js
console.log(c.hasOwnProperty('foo')); // => true
```

The discussion of inheriting *properties* from other objects applies to methods as well. Methods in JavaScript are merely properties that refer to functions. Thus, when we talk about object properties, we also mean methods.

### Methods on Object.prototype

The `Object.prototype` object is at the top of all JavaScript prototype chains. Thus, its methods are available from any JavaScript object provided you don't explicitly use something like `null` as the prototype object. Here are 3 useful methods:

- `Object.prototype.toString()` returns a string representation of the object.
- `Object.prototype.isPrototypeOf(obj)` determines whether the object is part of another object's prototype chain.
- `Object.prototype.hasOwnProperty(prop)` determines whether the object contains the property.

### Objects Without Prototypes

Several times we've said that JavaScript objects all have a prototype object and that the prototype chain ends with `Object.prototype`. In reality, there is a way to create objects that don't have a prototype and, hence, do not have a prototype chain that ends with `Object.prototype`. However, as you're well aware by now, JavaScript is full of surprises waiting to bite the unwary developer.

It turns out that you *can* create an object that doesn't have a prototype by setting the prototype to `null`. This technique is a bit unusual and not seen very often. However, it lets you create a "clean" or "bare" object for use as a general key/value data structure. The bare object doesn't carry around a bunch of excess baggage in the form of unneeded properties and prototypes:

```node
> let a = Object.create(null)
undefined

> Object.getPrototypeOf(a)
null
```

Note that objects created in this way do not have access to Object methods like `Object.prototype.hasOwnProperty` or `Object.prototype.toString`. They also don't have a prototype chain that ends with `Object.prototype` -- it ends with `null`.

For the most part, you can assume that all JavaScript objects have `Object.prototype` at the top of their inheritance chain. You can also assume that all objects can use the usual selection of `Object` properties. However, be wary of situations where bare objects may be in use. If you have bare objects in your program, you must remember that the usual Object properties and methods don't exist on those objects. That's why you sometimes see code like this:

```js
if (Object.getPrototypeOf(obj) && obj.isPrototypeOf(car)) {
  // obj has a non-null prototype AND
  // obj is in the prototype chain of car
}
```

If you don't first check whether `obj` has a non-`null` prototype, this code will raise an exception if `obj` has a `null` prototype. Even this code won't work properly if `obj` inherits from an object whose prototype is `null`.

Library developers often write code to check for the bare object edge cases. Since their code will see use in many different environments, they need to be ready for such unusual objects.

### JavaScript OOP Video

One of our students created an informative video that goes into a lot of depth about these concepts. In particular, he spends a lot of time clarifying how the prototype chain works. We believe it's worth watching the first part of the video now, even though it goes into some detail about constructors and the `prototype` property of function objects. We'll talk about constructors and the `prototype` property later, after which you might want to rewatch the first part of the video.

[Watch the video here.](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) You can stop anytime after reaching the 00:39:20 mark (the end of Example 4).

### Summary

JavaScript objects can inherit properties from other objects. The object that another object inherits properties from is its prototype. In most cases, we use `Object.create` to create objects whose prototype we need to set explicitly. We can also use `Object.setPrototypeOf` to set the prototype of an object that already exists.

By default, all object literals inherit from `Object.prototype`.

When you access a property on an object, JavaScript looks for the property first in the object, then its prototype chain, all the way up to `Object.prototype`.