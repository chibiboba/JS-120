# The Global Object

JavaScript creates a global object when it starts running. It serves as the **implicit execution context** for function invocations, a term that we'll study later in this lesson. For now, we'll use the term casually, but we'll learn much more later.

In Node.js, the global object is the object named `global`; in the browser, it's the `window` object. You can investigate this in the node REPL or a browser's console:

```node
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

The global object is available everywhere in your program and houses important global properties. In the previous course, we talked about global values such as `Infinity` and `NaN`, and global functions, such as `isNaN` and `parseInt`. All these entities are properties of the global object! In your console, you can look at the global object to examine those properties.

```node
> global.isNaN      // [Function: isNaN]
> global.Infinity   // Infinity
```

Note: don't use `isNaN` in your code. Use `Number.isNaN` instead. The bare `isNaN` function has some odd behavior:

```node
Number.isNaN('I am not a number');   // false - this is a correct value
isNaN('I am not a number');          // true - string gets coerced to NaN
```

As with other JavaScript objects, you can add properties to the global object at any time:

```node
// in Node
> global.foo = 1
> global.foo       // 1
```

```node
// in a browser
> window.foo = 1
> window.foo       // 1
```

### The Global Object and Undeclared Variables

The global object has an interesting property: whenever you assign a value to a variable without using the `let`, `const`, or `var` keywords (we'll discuss `var` later), the variable gets added to the global object as a property. Let's see an example:

```js
foo = 'bar';
global.foo; // => 'bar' (in Node)
window.foo; // => 'bar' (in a browser)
```

Without a keyword, the variable gets added to the global object as a property. You can even access such variables without using the global object as the caller:

Copy Code

```js
foo = 'bar';
foo; // => 'bar'
```

Whenever you try to access a variable for which there are no local or global variables with the variable's name, JavaScript looks at the global object and looks for a property with that name. In this example, since there are no local or global variables named `foo`, JavaScript looks in the global object and finds the `foo` property. As a result, line `2` is identical to `global.foo`; it returns the value of the property `foo` from the global object.

We discuss the global object here since you need to know where JavaScript gets all those global entities like `NaN`, `Infinity`, and `setTimeout`. It's not very often that you'll need to modify the global object, but you'll sometimes use it to set properties in Node that you need in multiple modules. We'll discuss Node modules in the next course.