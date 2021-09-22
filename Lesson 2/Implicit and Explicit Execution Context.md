- Execution Context

# Implicit and Explicit Execution Context

### Execution Context

Earlier, we met the keyword `this` when talking about object methods. At the time, we said that `this` refers to the object that contains the method. That's true, but there's a bit more nuance to how JavaScript determines the value of `this`. In this assignment, we'll discuss `this` and how JavaScript determines its value in a function or method call.

If we're discussing `this`, why, then, does this section's title refer to **execution context**? The execution context -- or **context** -- is a concept that refers to the **environment** in which a function executes. In JavaScript, it most commonly refers to the current value of the `this` keyword. When we talk about the execution context of a function or method call, we're talking about the value of `this` when that code executes. The context depends on how the function or method was invoked, not on where the function was defined.

Put another way, how you invoke a function or method determines its execution context for that invocation. It doesn't matter how you define the function or method, nor does it matter where or when you call it. The only factor that determines the context is how you call the function or method. In other words, two invocations of the same function or method can have very different contexts depending on how you make those calls. Remember this point: it's crucial to understanding JavaScript.

There are two basic ways to set the context when calling a function or method:

1. **Explicit**: The execution context that you set explicitly.
2. **Implicit**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context.

Setting the execution context is also called **binding `this`** or **setting the binding**. A binding is something that ties two things together. In this case, it refers to the fact that a call binds `this` to a specific object when the function or method is called.

### Function Execution Context (Implicit)

Every JavaScript function call has an execution context. In other words, the `this` keyword is available to every function in your JavaScript program. Every time you call that function, JavaScript binds some object to `this`.

Let's define a function and use `this` within it to see what happens:

Copy Code

```js
function foo() {
  console.log("this refers to: " + this);
}

foo();
// this refers to: [object global]
```

Within a regular function call (e.g., `foo()`), JavaScript sets the binding for `this` to the global object. (Remember: in Node, the global object is called `global`; in a browser, it is `window`.) That means that when you use `this` inside the function, it refers to the global object. If you use `this` to access or modify properties, you will access or modify properties on the global object:

Copy Code

```js
function foo() {
  this.bar = 'bar';
}

foo();
global.bar; // 'bar'
```

That makes sense at some level. Since all function calls have an execution context, and since a regular function call does not provide an explicit context, JavaScript supplies an implicit context: the global object. We say that this execution context is implicit since the function invocation doesn't supply an explicit alternative.

#### Strict Mode and Implicit Context

We're not yet ready to learn about JavaScript's "strict mode", but there is one aspect of strict mode that you should be aware of: when strict mode is enabled, the implicit `this` is assigned to `undefined` instead of the global object:

Copy Code

```js
"use strict"; // the quotes are required

function foo() {
  console.log("this refers to: " + this);
}

foo(); // this refers to: undefined
```

We'll learn more in the next course. For now, just be aware of this behavioral change. You may run into strict mode without realizing it. For instance, it shows up in JavaScript classes and in Coderpad, the environment we use for assessment interviews.

### Method Execution Context (Implicit)

We learned earlier that when you call a method that belongs to an object, the execution context inside that method call is the object used to call the method. We call that **method execution context**. Is this an implicit or explicit execution context, however? At first glance, it's easy to look at that calling object as explicitly providing the context. You're not really wrong if that's how you see it. However, method execution syntax is usually said to provide an implicit context; we're using an explicit object to call the method, but JavaScript is interpreting that object as the implicit context. For this reason, we usually say that method calls provide an implicit execution context.

Copy Code

```js
let foo = {
  bar: function() {
    console.log(this);
  }
};

foo.bar(); // `foo` is the implicit execution context for `bar`
// { bar: [Function: bar] }
```

It's easy to see that the execution context inside a method call is the object used to call the method.

Be careful, however. The first-class nature of JavaScript functions has ramifications for the execution context. Remember that the context is determined solely by how you call the function or method. Here, `foo.bar()` is considered a method call since we *call it as a method*; that is, we use the method call syntax `object.method()`. Since JavaScript functions are first-class objects, `bar` can be called in other ways that change the context:

Copy Code

```js
let baz = foo.bar;
baz(); // Object [global] {...}
```

In this code, we assign the `foo.bar` method to the `baz` variable. The `foo.bar` property and the `baz` variable now refer to the same function object. What should `baz()` log then? Since `baz` references a method of the `foo` object, you may think that its execution context must be `foo`. That's wrong though: as we've repeated several times, the execution context is determined entirely by how a function or method is called. Since we're calling `baz` as a standalone function, its execution context is the global object, *not* the `foo` object.

### Explicit Function and Method Execution Context

Using parenthesis after a function or method name is not the only way to invoke it. As we've seen, when you invoke a function with parentheses, JavaScript uses the global object as the implicit context; when you invoke a method, it uses the object that you used to call the method as the implicit context.

There are, however, several ways to subvert this behavior. You can provide an explicit context to any function or method, and it doesn't have to be the global object or the object that contains the method. Instead, you can use any object -- or even `null` -- as the execution context for any function or method. There are two main ways to do that in JavaScript: `call` and `apply`.

#### Explicit Execution Context with `call`

In previous assignments, we said that JavaScript functions are objects: they have properties and methods just like any other object. One method that all JavaScript functions have is the `call` method. The `call` method calls a function with an explicit execution context. Let's see how that works:

Copy Code

```js
function logNum() {
  console.log(this.num);
}

let obj = {
  num: 42
};

logNum.call(obj); // logs 42
```

That's interesting! We can call the `logNum` function and tell it to use `obj` as its execution context. When we use `call` in this manner, `this` refers to the `obj` object inside the `logNum` function. The first argument to `call` provides the explicit context for the function invocation.

Again, we see that a function's definition has no bearing on its execution context. The context doesn't get determined until we invoke the function; in this case, we're using `call` to invoke it and set the context.

The code is functionally similar to the following:

Copy Code

```js
function logNum() {
  console.log(this.num);
}

let obj = {
  num: 42
};

obj.logNum = logNum;
obj.logNum(); // logs 42
```

Those last two code examples aren't identical, however. In the second example, we add a new property to the `obj` object; we don't mutate the object when we use `call`.

You can also use `call` to explicitly set execution context on methods, not just functions:

Copy Code

```js
let obj1 = {
  logNum() {
    console.log(this.num);
  }
};

let obj2 = {
  num: 42
};

obj1.logNum.call(obj2); // logs 42
```

The behavior here is similar to:

Copy Code

```js
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

Again, there is a difference: in this case, we mutate `obj2` when we give it a `logNum` property that it didn't have before.

You may have already spotted a problem with this pattern. Suppose our function takes arguments. How do we provide them? Let's see an example to illustrate this point:

Copy Code

```js
function sumNum(num1) {
  return this.num + num1;
}

let obj = {
  num: 42
};
```

We want to call `sumNum` in such a way that it updates `obj.num`. Fortunately, the `call` method lets us pass arguments as a comma-separated list to our function:

Copy Code

```js
obj.num = sumNum.call(obj, 5);
console.log(obj.num); // => 47
```

Again, we can understand this better if we try to write the code more directly:

Copy Code

```js
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

You can, of course, add as many arguments to the `call` method invocation as the function needs. Let's see another, more complex example:

Copy Code

```js
let iPad = {
  name: 'iPad',
  price: 40000,
};

let kindle = {
  name: 'Kindle',
  price: 30000,
};

function printLine(lineNumber, punctuation) {
  console.log(`${lineNumber}: ${this.name}, ${this.price / 100} dollars${punctuation}`);
}

printLine.call(iPad, 1, ';');        // => 1: iPad, 400 dollars;
printLine.call(kindle, 2, '.');      // => 2: Kindle, 300 dollars.
```

The general syntax for `call` is as follows:

Copy Code

```js
someObject.someMethod.call(context, arg1, arg2, arg3, ...)
```

#### Explicit Execution Context with `apply`

The `apply` method works in much the same way as `call`. The only difference is that `apply` uses an array to pass any arguments to the function. Here's the general syntax:

Copy Code

```js
someObject.someMethod.apply(context, [arg1, arg2, arg3, ...])
```

`apply` is handy when you have the list of arguments in an array. With modern JavaScript (ES6 and higher), `apply` isn't needed since you can use `call` in conjunction with the spread operator to accomplish the same thing:

Copy Code

```js
let args = [arg1, arg2, arg3];
someObject.someMethod.call(context, ...args);
```

### Summary

All JavaScript functions and methods execute within an execution context, sometimes called its `this` binding. How `this` gets bound depends entirely on how the function is invoked. You can't tell a function's execution context by merely looking at how and where it's defined; you must examine the invocation itself.

Regular function calls use the global object as their execution context, while method calls use the calling object as their context. You can override this behavior by setting the execution context explicitly with either `call` or `apply`.

The mechanics of context binding is an essential but difficult concept. Most difficulties arise from forgetting that JavaScript does not use lexical scoping rules to determine the binding. For instance, if you use `this` inside a method of `obj`, you expect that `this` refers to `obj`. However, that's not always the case. It's important to remember that the rules for `this` are entirely different from the rules for variable scope. While a variable's scope is determined by where you write the code, `this` depends on how you invoke it.

The execution context is determined by how you invoke a function or method. We can't emphasize this enough.