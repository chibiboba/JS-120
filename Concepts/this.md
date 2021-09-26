when you use **this** <u>inside a method</u>, it refers to the <u>object that contains the method.</u> (but not always)

- 'this' can only be used inside a method, to refer to the object that contains the method.
- You can access properties and methods of an object from within a method using `this` keyword. 

- ```js
  // both of these cause syntax error when trying to define the properties in the object. 
  
  let cat = {
    this.name: "Butterscotch", // 'this' can only be used inside a method, to refer to the object that contains the method.
    this.age: 13,
  };
  
  let cat = {
    name = "Butterscotch", // incorrect syntax to define property in an object.
    age = 13
  };
  ```

  ```js
  // however this works
  function cat() {
    this.name = 'Butterscotch';
    this.age = 13;
  }
  ```

- By default , if there is no function invocation, the execution context or value of `this` is the object that contains the method that `this` is in. 

- But if `this` is inside a function,  then the execution context is dependent soley on how the function is invoked, not on how and where the function is defined. 

- Every single javascript invocation/ call has its own **execution context**

  - Regular function calls (functions called as **standalone** function) implicitly use the global object as their execution context, while method calls implicitly use the calling object as their context. 
  - When strict mode is enabled,  implicit `this` is assigned to `undefined` instead of the global object. 
  - You can override this behavior by setting the execution context explicitly with either `call` , `apply`, or `bind`
  - Arrow functions are also exceptions to this rule. 
