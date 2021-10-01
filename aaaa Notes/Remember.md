### Reminders

- Can use **default parameters** to set default values in case no value is passed to the function, instead  of using **arguments** object like `if arguments.length < 1`

- Use **logical or** assignment in case values are undefined 

  ```js
  obj = {};
  let a = obj.property || 0
  ```

- Mathematical operations on `undefined` produce value of `NaN`

- Pass or reference functions by using the identifier only. Parentheses () invokes a function. 

- You can chain method calls on function expressions

  ```js
  let obj = {} 
  let a  = function () { // this is an anonymous function expression because it doesn't start with function at beginning of line
    
  }.bind(obj)
  ```


- Every single javascript call has its own **execution context**. (Bind is not an invocation but also sets execution context)