## Note For CoderPad

CoderPad runs JavaScript code in *strict mode*, which we discuss in depth in the next course. While you don't need to be familiar with all facets of strict mode, there is one aspect that may arise during this assessment: the implicit execution context is `undefined`, **not** the global object. That means that the value of `this` may be `undefined` at times. For instance:

```js
function foo() {
  console.log(this);
}

foo(); // undefined
```

Be prepared for this change before the interview. If you wish to practice on your own system instead of on CoderPad, add `"use strict";` to the top of your JavaScript code:

```js
"use strict"; // the quotes are required

function foo() {
  console.log(this);
}

foo(); // undefined
```

------

## Areas of Focus

- General knowledge of OOP concepts as they pertain to JavaScript.
- Conventional techniques for constructing objects, including the use of prototypal inheritance.
- The ability to come up with code examples to illustrate concepts. Be prepared! Know what examples you want to use.
- The ability to integrate what you've learned and put it to work to understand unusual situations.
- An ability to speak clearly and with precision.