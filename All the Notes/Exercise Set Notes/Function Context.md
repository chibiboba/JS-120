1. ```js
   let person = {
     firstName: 'Rick ',
     lastName: 'Sanchez',
     fullName: this.firstName + this.lastName,
   };
   
   console.log(person.fullName); // logs NaN
   ```

   - Anywhere outside a function, the keyword `this` is bound to the global object. If the keyword is used inside a function, then its value depends on how the function was invoked. 
   - Snce `global.firstName` and `global.lastName` are not defined, the operation being performed here is `undefined + undefined` which results in fullName having the value `NaN`.

2. ```js
   let franchise = {
     name: 'How to Train Your Dragon',
     allMovies: function() {
       return [1, 2, 3].map(function(number) {
         return this.name + ' ' + number;
       });
     },
   };
   ```

   - This problem here is that `this` is bound to the global object.  When `map` is invoked on line 4, its implicit execution context is the calling object, the array `[1, 2, 3]`. But the anonymous function is passed to `map` as argument, and when functions are passed as arguments, they lose surrounding context, so the execution context is then implicitely set to the global object. If `map` took a `thisArg` argument, then the execution context would be `thisArg`. 
   - Passing a function as an argument to another function strips it of its execution context, which means the function argument gets invoked with the context set to the global object. 
   
   ```js
   let franchise = {
     name: 'How to Train Your Dragon',
     allMovies: function() {
       let self = this;
       return [1, 2, 3].map(function(number) {
         return self.name + ' ' + number;
       });
     },
   };
   ```
   
   - This uses lexical scoping rules as a solution: the rule that a varaible defined in outer scope is available in an inner scope. 
   
   3. ```js
      let franchise = {
        name: 'How to Train Your Dragon',
        allMovies: function() {
          return [1, 2, 3].map(function(number) {
            return this.name + ' ' + number;
          }.bind(this)); // hard bound anonymous function 
        },
      };
      ```
   
   - `bind` returns a new function that invokes the original function which is now <u>permanently</u> bound to the execution context, which is the first argument passed to `bind`. 
   
   - Another solution is to use an arrow function as a callback to `map` method call, as with arrow functions `this` is lexically bound :
   
     ```js
     let franchise = {
       name: 'How to Train Your Dragon',
       allMovies: function() {
         return [1, 2, 3].map(number => {
           return `${this.name} ${number}`;
         });
       },
     };
     ```

4. ```js
   function myFilter(array, func) {
     let result = [];
   
     array.forEach(function(value) {
       if (func(value)) {
         result.push(value);
       }
     });
   
     return result;
   }
   
   let filter = {
     allowedValues: [5, 6, 9],
   }
   
   myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
     return this.allowedValues.indexOf(val) >= 0;
   }, filter); // returns [5, 6, 9]
   ```

4. ```js
   // using call
   function myFilter(array, func, context) {
     let result = [];
   
     array.forEach(function (value) {
       if (func.call(context, value)) {
         result.push(value);
       }
     });
   
     return result;
   }
   
   let filter = {
     allowedValues: [5, 6, 9],
   };
   
   let returned = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function (val) {
     return this.allowedValues.indexOf(val) >= 0;
   }, filter); // returns [5, 6, 9]
   
   console.log(returned);
   ```

   - The solution is straightforward. Since there is always only one argument at a time passed to the callback function of `myFilter`, the solution uses `Function.prototype.call` on it and passes it the `thisArg` and `value` arguments.

   ```js
   // using bind
   function myFilter(array, func, context) {
     let result = [];
     func = func.bind(context);
   
     array.forEach(function (value) {
       if (func(value)) {
         result.push(value);
       }
     });
   
     return result;
   }
   
   let filter = {
     allowedValues: [5, 6, 9],
   };
   
   let returned = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function (val) {
     return this.allowedValues.indexOf(val) >= 0;
   }, filter); // returns [5, 6, 9]
   
   console.log(returned);
   ```

   ```js
   // also using bind 
   function myFilter(array, func, context) {
     let result = [];
   
     array.forEach(function (value) {
       if (func.bind(context)(value)) {
         result.push(value);
       }
     });
   
     return result;
   }
   
   let filter = {
     allowedValues: [5, 6, 9],
   };
   
   let returned = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function (val) {
     return this.allowedValues.indexOf(val) >= 0;
   }, filter); // returns [5, 6, 9]
   
   console.log(returned);
   ```

   

