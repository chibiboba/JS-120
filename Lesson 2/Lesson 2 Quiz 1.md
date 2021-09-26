[Question 14](https://launchschool.com/quizzes/ac949c3a/edit)

Consider the following code:

Copy Code

```js
const OPERATIONS = {
  '+': (num1, num2) => num1 + num2,
  '-': (num1, num2) => num1 - num2,
  '*': (num1, num2) => num1 * num2,
  '/': (num1, num2) => num1 / num2,
};

let getOperation = operation => OPERATIONS[operation]; // getOperation is a function that takes one argument, the operation, then returns a function from the OPERATIONS object. 

compute(getOperation(operation), num1, num2)
let compute = function(operation, num1, num2) { 
  return operation(num1, num2);
};
```

Without running this code, determine which of the following expressions will return `true`:

### Your Answer

Copy Code

```js
compute(getOperation('/', 18, 6)) === 3;
```

Copy Code

```js
compute('*', 2, 8) === 16;
```

Copy Code

```js
compute(getOperation('+'), 5, 9) === 14;
```

Copy Code

```js
compute(getOperation('%'), 9, 4)) === 5;
```

