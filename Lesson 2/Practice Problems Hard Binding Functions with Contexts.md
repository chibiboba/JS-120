# Practice Problems: Hard Binding Functions with Contexts

1. What method can we use to bind a function permanently to a particular execution context?

   Show Solution

   We can use the `bind` method to bind a function permanently to a particular execution context. 

2. What will the following code log to the console?

   ```js
let obj = {
     message: 'JavaScript',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   foo.bind(obj);
   ```
   
   Show Solution

   Nothing is logged to the console. Unlike `call` and `apply`, `bind` doesn't invoke the function used to call it. Instead it returns a new function that is permanently bound to the context argument. 

3. What will the following code output?

   ```js
   let obj = {
     a: 2,
     b: 3,
   };
   
   function foo() {
     return this.a + this.b;
   }
   
   let bar = foo.bind(obj);
   
   console.log(foo());
   console.log(bar());
   ```

   Show Solution

   ```terminal
   NaN
   5
   ```

   The function `foo` looks for properties `a` and `b` on the global object since it is invoked as a function and `this` is bound to the global object. Both `this.a` and `this.b` is evaluated to `undefined` which results in `NaN` when added together. Bar is explicitely bound to `obj` on line 10, and as a result, references that object's `a` and `b` properties when it is invoked. 

   >  If you use strict mode (discussed in more detail in JS130) to run the code, it will raise a `TypeError: Cannot read property 'a' of undefined` error when calling `foo()`.

4. What will the code below log to the console?

   ```js
let positivity = {
     message: 'JavaScript makes sense!',
   };
   
   let negativity = {
     message: 'JavaScript makes no sense!',
   };
   
   function foo() {
     console.log(this.message);
   }
   
   let bar = foo.bind(positivity);
   
   negativity.logMessage = bar;
   negativity.logMessage();
   ```
   
   ```
JavaScript makes sense!
   ```
   
   On line 13,  the `bind` invocation returns a function that is explicitely bound to the context `positivity`, and this function is assigned to identifier `bar`.  On line 15, a property called `logMessage` is declared in object `negativity` and assigned to the value of bar. On line 16, the method `logMessage` is invoked. `logMessage` now does what bar does, which is invoke `foo` with the permanent context `positivity`. The message "JavaScript makes sense!" is logged to the console. 

   Show Solution

   Since `bar` is bound to `positivity` as the return value of the `bind` invocation on line 13, `positivity`'s property `message` is logged by the function call on the last line, despite the fact that the function is invoked as a method on the `negativity` object.

5. What will the code below output?

   

   ```js
   let obj = {
     a: 'Amazebulous!',
   };
   let otherObj = {
     a: "That's not a real word!",
   };
   
   function foo() {
     console.log(this.a);
   }
   
   let bar = foo.bind(obj); 
   
   bar.call(otherObj); // technicaly foo.bind(obj).call(otherObj) works?? 
   ```

   On line 12, the `bind` invocation returns a function which is explicitly  bound to `obj`. This function is assigned to identifier `bar`. On line 14, `call` invokes `bar` with context otherObj. However since `bar` is a function with a permanent context, `bar` then calls on `foo` with the same context `obj`, and logs "Amazebulous!'" to the console. 
   
   Show Solution
   
   Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`. In keeping with this, the last line of our code outputs "Amazebulous!", because the function `bar`'s context has been permanently bound to `obj`.