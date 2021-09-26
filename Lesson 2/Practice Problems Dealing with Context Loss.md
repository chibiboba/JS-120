# Practice Problems: Dealing with Context Loss

1. The code below should output `"Christopher Turk is a Surgeon"`. Without running the code, what will it output? If there is a difference between the actual and desired output, explain the difference.

   ```js
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription() {
         return this.firstName + ' ' + this.lastName + ' is a '
                                     + this.occupation + '.';
     }
   };
   
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription); method is passed to logReturnVal. 
   ```

   On line 16, the context for logReturnVal is global object, since logReturnVal is called as a standalone function. On line 12, func() is invoked as a standalone function too, so the execution context is the global object. 

   ```terminal
   # the actual output is 
   undefined undefined is a undefined.
   ```

   Show Solution

   When we pass `turk.getDescription` to `logReturnVal` as an argument, we remove the method from its context. As a result, when we execute it as `func`, `this` points to the global object rather than `turk`. Since `global` doesn't have properties defined for `firstName`, `lastName`, or `occupation`, the output isn't what we expect.

2. Modify the program from the previous problem so that `logReturnVal` accepts an additional `context` argument. If you then run the program with `turk` as the context argument, it should produce the desired output.

   ```js
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription() {
         return this.firstName + ' ' + this.lastName + ' is a '
                                     + this.occupation + '.';
     }
   };
   
   function logReturnVal(func, context) {
     let returnVal = func.call(context);
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription, turk); 
   ```

   Show Solution

   ```js
   function logReturnVal(func, context) {
     let returnVal = func.call(context);
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription, turk);
   ```

   By using `call` to invoke `func` and passing it the `context` argument, we can provide the desired context for the function. On line 16, we invoke `logReturnVal` with `turk` as the `context` argument, then pass that value to `call`; the result is our desired output.

   Note that we can use `apply` instead of `call`:

   ```js
   let returnVal = func.apply(context);
   ```

   It's also possible to use `bind`, but given the condition that `logReturnVal` must accept a `context` argument, that solution leads to this slightly odd code:

   ```js
   let returnVal = func.bind(context)(); // need parentheses to invoke the returned function
   ```

   This code is slightly unclear since it implies that we want the binding to be permanent. Use `call` or `apply` instead.

3. Suppose that we want to extract `getDescription` from `turk`, but we always want it to execute with `turk` as its execution context. How would you modify your code to do that?

   ```js
   function logReturnVal(func, context) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription.bind(turk));
   ```

   Show Solution

   ```js
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   let getTurkDescription = turk.getDescription.bind(turk);
   logReturnVal(getTurkDescription);
   ```

4. Consider the following code:

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ': ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   Will this code produce the following output? Why or why not?

   ```plaintext
   The Elder Scrolls: Arena
   The Elder Scrolls: Daggerfall
   The Elder Scrolls: Morrowind
   The Elder Scrolls: Oblivion
   The Elder Scrolls: Skyrim
   ```

   No because on line 5, forEach invokes the callback function, this method invocation sets the execution context to `forEach` and `forEach` is a method in the global object. 

   Show Solution

   Since functions lose their surrounding context when used as arguments to another function, the context of line 6 is not the `TESgames` object. Instead, it is the global object. Thus, `this.seriesTitle` resolves to `undefined` rather than `"The Elder Scrolls"`.

5. Use `let self = this;` to ensure that `TESgames.listGames` uses `TESGames` as its context and logs the proper output.

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       let self = this;
       this.titles.forEach(function(title) {
         console.log(self.seriesTitle + ': ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   Show Solution

6. The `forEach` method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(function(title) {
         console.log(this.seriesTitle + ': ' + title);
       }, this);
     }
   };
   
   TESgames.listGames();
   ```

   Show Solution

7. Use an arrow function to achieve the same result:

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(title => { // arrow function inherits from surrounding context, what does that mean? So instead of inherting from forEach, which invokes the arrow function, it inherits from the context of listGames(), which is TESgames?
         console.log(this.seriesTitle + ': ' + title);
       });
     }
   };
   
   TESgames.listGames();
   ```

   Show Solution

   **<u>Note that this solution does not pass `this` to `forEach`.</u>**

8. Consider the following code:

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment(); // invoked as a standalone function, so `this.a` on line 5 references a property of global object rather than a property of foo. 
       // Example of losing context in nested functions. 
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   What will the value of `foo.a` be after this code runs?

   The value of `foo.a` will be `0`. Since `increment` gets invoked as a function, `this.a` on line 5 references a property of the global object rather than a property of `foo`. Thus, the property `foo.a` isn't modified by the `increment`; its value remains 0.

   

   

   Show Solution

9. Use one of the methods we learned in this lesson to invoke `increment` with an explicit context such that `foo.a` gets incremented with each invocation of `incrementA`.

   Show Solution

