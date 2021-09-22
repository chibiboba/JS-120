Before you start this assignment, take a little time to review the section on [the three ways to define a function](https://launchschool.com/books/javascript/read/functions#threewaystodefineafunction) from our introductory JavaScript book.

### Function Declarations vs Function Expressions

Take a look at the following function definition.

```js
function prompt(message) {
  console.log(`=> ${message}`);
}
```

Functions defined with this syntax can be invoked before the declaration in the program:

```js
prompt('How are you today?');

function prompt(message) {
  console.log(`=> ${message}`);
}
```

This code works since the JavaScript engine runs our code in two passes. During the first pass, it does some preparatory work, while the second executes the code. One action that occurs during the first pass is called **hoisting**; the engine effectively moves function declarations to the top of the program file in which they're defined, or the top of the function in which they are nested. The result is that the above code acts as though you wrote it like this:

```js
function prompt(message) {
  console.log(`=> ${message}`);
}

prompt('How are you today?');
```

Note that you'll never see this hoisted code when working with JavaScript. Hoisting is an internal step performed by the engine; it doesn't move any code around. However, it's useful to think of hoisting in this way, so long as you understand that your code is not changed.

Hoisting isn't limited to function declarations. We'll discuss it in more detail later in the curriculum.

Function definitions that are the first thing on a line are known as **function declarations**. On the other hand, **function expressions** are function definitions that are part of an expression. For instance, the code in the above example shows `prompt` as a function declaration; the next example shows `foo` as a function expression: it is *not* a declaration.

```js
(function foo() {

});
```

You can test whether a function definition is a function declaration by trying to call it before the declaration. You can't call a function expression until after the expression is evaluated:

functions.js

```js
// NOTE: Run this code from a file; don't use the REPL

bar();
function bar() {
  console.log("this is bar");
}

foo();
const foo = function() {
  console.log("this is foo");
};
```

```terminal
$ node functions.js
this is bar
/Users/foobar/projects/functions.js:6
foo();
^

ReferenceError: Cannot access 'foo' before initialization
```

Typically, we assign a function expression to a variable or object property, pass it to another function, or return it to a calling function. For instance:

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

Notice that we can define function expressions without giving them a name. You may argue that `prompt` is the name of the function we defined on line 1, but that's not the case: instead, we've assigned an unnamed function to the `prompt` variable. Such unnamed functions are called **anonymous functions**. Anonymous functions are commonplace in JavaScript code, so be prepared to understand them. You've already seen examples with the callback functions for array methods like `forEach` and `map`: the callback functions for these methods are often anonymous functions.

```js
let squaredNums = [1, 2, 3].map(function(num) {
  return num * num;
}); // => [1, 4, 9]
```

Function expressions don't have to be anonymous. You can name a function expression:

```js
let squaredNums = [1, 2, 3].map(function squareNum(num) {
  return num * num;
}); // => [1, 4, 9]
```

The main advantage of naming a function expression occurs when the function throws an error (raises an exception). If the function has a name, the stack trace uses that name to help you determine where the error occurred. Without the name, JavaScript merely reports the location as "anonymous."

The function name given to a function expression is **not visible** in the scope that includes the function expression.

```js
let foo = function bar() {};
foo();         // This works
bar();         // This does not work
```

`foo` is a local variable that contains a reference to the function, so we can invoke the function using `foo()`. However, the function name, `bar`, is not in scope on line 3, so `bar()` does not work.

The function name on a function expression is visible inside the function, which is useful when working with recursive functions. We won't trouble you with an example at this time.

### Arrow Functions

There's no declaration syntax for arrow functions; arrow functions are always function expressions. That means that we often pass them around or assign them to variables or properties. Also, arrow functions are always anonymous: there's no way to define a named arrow function. Arrow functions are either immediately invoked, assigned to variables or properties, or passed around as arguments and return values. We'll discuss immediately invoked functions in a later course.

### First-Class Functions

You'll often see the phrase **first-class functions** or **first-class objects** when discussing JavaScript functions. It merely refers to the fact that functions in JavaScript are values that we can assign to variables and properties, pass them to other functions, or return them from another function.

Functions of all kinds, including declared functions, can be treated as values:

```js
function say(words) {
  console.log(words);
}

let speak = say;

speak('Howdy!');   // logs 'Howdy'
```

In this example, we declare a function `say` and then assign it to the variable `speak`. We then invoke the function using `speak` as a handle. Note that we can still call the function using `say` as well -- both `say` and `speak` refer to the same function.

Here's another example:

```js
function logNum(num) {
  console.log('Number: ' + num);
}

[1, 2, 3].forEach(logNum);
// Number: 1
// Number: 2
// Number: 3
```

In this case, we're passing the function `logNum` as an argument to the `forEach` method, which calls it three times. With each invocation of `logNum`, `forEach` passes it one of the array elements as an argument.

Notice that we don't use invocation syntax, `()`, when passing `logNum` as an argument to `forEach`. If we did, it would throw a `TypeError` exception since `forEach` expects a function; instead of passing a function, though, we would be passing `undefined`, the return value of `logNum()`.

```js
function logNum(num) {
  console.log('Number: ' + num);
}

[1, 2, 3].forEach(logNum());
// Uncaught TypeError: undefined is not a function
```

The takeaway is that you should not invoke functions when you want to use them as values. Use invocation only when you need to run the code in the function.

Let's return to the following example:

```js
function logNum(num) {
  console.log('Number: ' + num);
}

[1, 2, 3].forEach(logNum);
// Number: 1
// Number: 2
// Number: 3
```

This code is functionally identical to the following code:

```js
[1, 2, 3].forEach(function logNum(num) {
  console.log('Number: ' + num);
});
```

The only difference is that we're using a function expression instead of a variable.

We can also use an arrow function to do the same thing:

```js
[1, 2, 3].forEach(num => {
  console.log('Number: ' + num);
});
```

In this case, though, the function is anonymous. The results, however, are identical.

The point we want you to remember is that you can treat any function as you would any other JavaScript value: remove the invocation syntax, and you've got an expression whose value is a function. You can do whatever you want with that value (at least within the limits of what JavaScript can do).

### Type of a Function Value

Since functions are first-class values in JavaScript, and all values in JavaScript have a type, functions must also have a type. Right? That's correct! Let's use the handy `typeof` operator to determine the type of a function value:

```js
let myFunc = function() {};
typeof myFunc; // => "function"
```

There are no surprises here. It makes sense for functions to be of type `function`. However, what kind of value is a function? Is it a primitive value or an object? The answer is that functions are objects: they are a compound type that has its own properties and methods. We'll discuss some of those properties and methods in the upcoming assignments.

### Summary

Functions in JavaScript are first-class values, just like any other value in JavaScript. You can use them any place that you can use an expression. To use a function as an expression, write its name without the parentheses of invocation. All functions have a type of `function`, which is a kind of object with properties and methods.