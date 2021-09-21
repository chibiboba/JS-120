when you use **this** <u>inside a method</u>, it refers to the <u>object that contains the method.</u> 

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

