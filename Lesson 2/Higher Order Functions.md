# Higher Order Functions

The fact that JavaScript treats functions as values means that we can have a special kind of function in our programs: a **higher-order function**. A higher-order function is a function that has at least one of the following properties:

1. It takes a function as an argument.
2. It returns a function.

### Functions That Accept Functions as Arguments

We've seen many examples of functions that have the first property. Specifically, array methods like `forEach`, `map`, `filter`, and `reduce` each take a function argument. As these methods show, functions that take other functions give the developer a lot of power and flexibility.

Let's pretend that we don't have a `map` method on JavaScript arrays. If we want to implement some code that squares all the elements of an array, we'd probably come up with something like this:

Copy Code

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

This approach is valid, and you'll see functions like this in languages that don't have first-class functions (nor the closely related concept of lambdas). However, squaring the numbers in an array almost certainly won't be the only type of mapping you'll need in your application. Suppose that we need another function that uppercases all the elements in an array of strings. The solution may look like this:

Copy Code

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

The only significant difference between these two functions is line 6 of each function where we either square a number or uppercase a string; everything else follows the same general structure:

- Declare and initialize the result array.
- Iterate over the input array.
  - Add mapped values to the result.
- Return the result.

Can we abstract away the similar structure of the two functions and leave the specific mapping operation up to the function's caller to decide? That's what `map` does for us: it abstracts away the mechanics of mapping an array and leaves the details for the developer to provide at runtime. She does that by providing a function as an argument. The result is much more powerful and versatile:

Copy Code

```js
arrayOfNums.map(num => num * num);
arrayOfStrings.map(string => string.toUpperCase());
```

The `map` method, along with several other array methods, is a higher-order function since it takes another function as an argument.

### Functions That Return a Function

In the previous section, we saw an example of how a higher-order function that takes another function lets us write elegant and flexible code. Let's look at another useful application of higher-order functions by having one return another function.

You can think of a function that returns another function as a function factory: it creates and returns a new function. Typically, the function factory uses the arguments you pass to it to determine the specific job performed by the function it returns.

To truly appreciate how useful this is, you need to understand closure; we're not ready for that, though -- we'll discuss the topic later. For now, we can use a contrived example to demonstrate the mechanics of functions returning other functions. Let's use a simple `greeter` function as an example, one that can log greetings in multiple languages:

Copy Code

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

This implementation works, but if we're using a particular language over and over, we need to provide the language string every time. That's not a big deal, but it would be useful if we only had to provide the language once. Instead of a `greet` function, let's implement a greeter factory that lets us create a greeter function for a given language.

Copy Code

```js
function createGreeter(language) {
  switch (language) {
    case 'en':
      return () => console.log('Hello!');
    case 'es':
      return () => console.log('Hola!');
    case 'fr':
      return () => console.log('Bonjour!');
  }
}

let greeterEs = createGreeter('es');
greeterEs(); // logs 'Hola!'
greeterEs(); // logs 'Hola!'
greeterEs(); // logs 'Hola!'

let greeterEn = createGreeter('en');
greeterEn(); // logs 'Hello!'
```

This code doesn't provide a significant improvement or convenience for the developer, but it does illustrate how we might use a function that returns another function in our code.

### Summary

Higher-order functions are functions that return another function or take another function as an argument. Higher-order functions let the programmer use powerful and flexible abstractions.