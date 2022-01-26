### My Own

```js
// Create a function that returns the sum of obj.num and a number passed to the function as argument, and then use call() to log that sum as obj.num. 
let obj = {
	 num: 42;
}
```

```js
// solution

function sum (number) {
  return this.num + number;
}

obj.num = sum.call(obj);
console.log(obj.num);
```

------

## Lesson 2

#### Object Prototypes 

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/f7b8620b)

1. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   console.log(baz.foo + qux.foo);
   ```

   Solution

   ```js
    2
   ```

   `qux.foo` returns 1 because `qux` has a `foo` property with that value. `baz` doesn't have its "own" copy of the `foo` property, so JavaScript searches the prototype chain for a `foo` property and finds the property in `qux`. 

   

2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   baz.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```

   Solution

   ```js
   3
   ```

   Their solution: We assign `baz.foo` to a value of 2. Property assignment doesn't use the prototype chain; instead, it creates a new property in the `baz` object named `foo`. When we add `baz.foo` and `qux.foo` together, `baz.foo` returns the value of its "own" `foo` property, while `qux.foo` returns the value of its "own" `foo` property. Thus, the result is 3. 

3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   qux.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```

   Solution

   ```js
   4
   ```

   On line 3, property `foo` is reassigned to value of 2 in object `qux`. On line 5, `baz.foo` returns 2 because it doesn't have an own property `foo` so JavaScript searches the prototype chain for `foo` and finds it on `qux`. `qux.foo` returns 2 because `qux` has an own `foo` property with value of 2. Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well. 

4. As we saw in problem 2, the following code creates a new property in the `baz` object instead of assigning the property in the prototype object.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   baz.foo = 2;
   ```

Write a function that searches the prototype chain of an object for a given property and assigns it a new value. If the property does not exist in any of the prototype objects, the function should do nothing. The following code should work as shown:

```js
let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false
```

**Iterative Solution**

```js
function assignProperty(obj, property, value) {
  while (obj !== null) { // loops until obj reaches the null prototype
    if (obj.hasOwnProperty(property)) { 
      obj[property] = value;
      break; // need this to prevent infinite looping
    }

    obj = Object.getPrototypeOf(obj); // // if property is not "own property", then search next prototype. 
  }
}
```

**Recursive Solution**

```js
function assignProperty(obj, property, value) {
  if (obj === null) { // property not found
    return;
  } else if (obj.hasOwnProperty(property)) {
    obj[property] = value;
  } else {
    assignProperty(Object.getPrototypeOf(obj), property, value); // calls on same funciton, passing prototype of obj as argument 
  }
}
```

5. Consider the following loops. 

```js
for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}
```

```js
Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});
```

Q: If `foo` is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.

- They don't always produce the same results since the second loop only iterates over `foo`'s "own" enumerable properties, but the first loop iterates over all of the object's enumerable properties, including those inside its prototype chain. 
- An example of when the results differ is 

```js
let bar = {a: 1, b: 2};
let foo = Object.create(bar);
foo.a = 3; 
foo.c = 4;
```

```js
// first loop outputs
a: 3 		// from foo
c: 4 	  // from foo
b: 2 		// from bar
```

```js
// second loop outputs 
a: 3 	// from foo
c: 4 	// from foo
```

- The two loops only produce the same results if the prototype chain doesn't include enumerable properties.

##### Q: How do you create an object that doesn't have a prototype? 

```js
let bareObj = Object.create(null);
```

##### Q: How can you determine whether an object has a prototype?

```js
if (Object.getPrototypeOf(obj)) {
  // obj has a prototype
} else {
  // obj does not have a prototype
}
```

------

#### Implicit and Explicit Execution Contexts

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/a6c48cbb)

1. What will the following code output? Try to determine the results without running the code.

   ```js
   function func() {
     return this;
   }
   
   let context = func();
   
   console.log(context);
   ```

   Show Solution

   The global object. In Node it's `global`; in a browser, it's `window`. Line 5 calls `func` as a function. Regular function calls implicitely use the global object as their execution context, so the implicit context for `func` is the global object, and it returns the global object. 

2. What will the following code output? Explain the difference, if any, between this output and that of problem 1.

   ```js
   let obj = {
     func: function() {
       return this;
     },
   };
   
   let context = obj.func();
   
   console.log(context);
   ```

   Show Solution

   The output is `obj`. That is because on line 7, there is a method invocation. `Func` is invoked as a method and uses the calling object `obj` as its implicit execution context. 

3. What will the following code output?

   ```js
   message = 'Hello from the global scope!';
   
   function deliverMessage() {
     console.log(this.message);
   }
   
   deliverMessage();
   
   let foo = {
     message: 'Hello from the function scope!',
   };
   
   foo.deliverMessage = deliverMessage;
   
   foo.deliverMessage();
   ```

   Show Solution

   ```terminal
   Hello from the global scope
   Hello from the function scope!
   ```

   The first log operation is generated by the function call `deliverMessage()` on line 7. Since this is a regular function call, which means that `deliverMessage` is invoked as a standalone function, the implicit execution context is the global object. `this.message` refers to the global property `message` . The second log operation occurs on line 15 where `deliverMessage()` is invoked as a method. The implicit execution context for method calls is the calling object `foo`, so `this.message` resolves to `foo.message`.  

4. What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

   Show Solution

   `call` `apply` `bind`

5. Take a look at the following code snippet. Use `call` to invoke the `add` method but with `foo` as execution context. What will this return?

   ```js
   let foo = {
     a: 1,
     b: 2,
   };
   
   let bar = {
      a: 'abc',
      b: 'def',
      add: function() {
        return this.a + this.b;
      },
   };
   ```

   Show Solution

   ```js
   bar.add.call(foo); // 3
   ```

   Since we invoke `call` on `bar.add` with `foo` as the explicit context, the `add` method uses `foo.a` and `foo.b` to determine the results, not `bar.a` and `bar.b`. Thus, the return value is 3. 

------

#### Hard Binding Functions with Contexts

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/ed3a72f0)

1. What method can we use to bind a function permanently to a particular execution context?

   Show Solution

   ```markdown
   Function.prototype.bind()
   ```

   We can use the `bind` method on function objects to permanently bind a function to an execution context. 

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

   ```terminal
   
   ```

   Nothing is logged to the console because unlike `call` or `apply`, `bind` doesn't invoke the function used to call it. Instead, it returns a new function that is permanently bound to the context argument. 

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

   On line 12 `foo` is invoked as a standalone function so its implicit execution context is the global object. `foo` looks for properties on the global object. Both `this.a` and `this.b` evaluate to `undefined`, resulting in a `NaN` value. `bar` refers to a function that is permanently bound to object `obj` as its explicit execution context, so when `bar` is called on line 13, it references `obj`'s properties. `this.a` and `this.b` evaluate to 2 and 3, resulting in the 5 value. 

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

   My Solution 

   ```terminal
   Javascript makes sense!
   ```

   On line 15, property `logMessage` is added to the `negativity` object and assigned to `bar`. `logMessage` is invoked on line 16. `logMessage` references `bar`, which references a function that is explicitly bound to the object `positivity` as its execution context. That function invokes `foo` with `this` referring to `positivity`, and `this.message` resolves to 'JavaScript makes sense'. So even though a method is invoked on the `negativity` object, it references a property from the `positivity` object. 

   Their Solution

   Since `bar` is bound to `positivity` as the return value of the `bind` invocation on line 13, `positivity`'s property `message` is logged by the function call on the last line, despite the fact that the function is invoked as a method on the `negativity` object

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
   
   bar.call(otherObj);
   ```

   Show Solution

   ```terminal
   Amazebulous
   ```

   `bind` returns a function that is permanently bound to the execution context passed to it as argument. So `bar` references a function that is permanently bound to `obj`. Even when `bar` is invoked by `call` on line 14, `bar`'s execution context is still `obj`.

   Once a function's context gets bound using `bind`, its context can't be changed, even with `call` and `apply`. In keeping with this, the last line of our code outputs "Amazebulous!", because the function `bar`'s context has been permanently bound to `obj`.

------

#### Dealing with Context Loss

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/408c20c3)

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
   
   logReturnVal(turk.getDescription);
   ```

   Show Solution

   ```terminal
   undefined undefined is a undefined.
   ```

   Functions as arguments lose surrounding context. When we pass `turk.getDescription` to `logReturnVal` as an argument, we remove the method from its context.  When it is executed as `func`, the context is set to the global object instead of `turk`. Since the global object doesn't have properties defined for `firstName`, `lastName`, or `occupation`, the output isn't what we expect.

2. Modify the program from the previous problem so that `logReturnVal` accepts an additional `context` argument. If you then run the program with `turk` as the context argument, it should produce the desired output.

   Show Solution

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

   By using `call` to invoke `func` and passing it the `context` argument, we can provide the desired context for the function. On line 16, we invoke `logReturnVal` with `turk` as the `context` argument, then pass that value to `call`; the result is our desired output. 

   We can use `bind` but given the condition that `logReturnVal` must accept a context argument, the solution would lead to odd code. 

   ```js
   let returnVal = func.bind(context)();
   ```

3. Suppose that we want to extract `getDescription` from `turk`, but we always want it to execute with `turk` as its execution context. How would you modify your code to do that?

   Show Solution

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
   
   logReturnVal(turk.getDescription.bind(turk));
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

   Show Solution

   ```terminal
   undefined: Arena
   undefined: Daggerfall
   undefined: Morrowind
   undefined: Oblivion
   undefined: Skyrim
   ```

   No because on line 5, a callback function is passed to `forEach` as argument. When functions are passed as arguments to another function, they lose their surrounding context and the function argument gets invoked with the execution context set to the global object. So on line 6, the execution context is not `TESgames` object, but the global object. `this.seriesTitle` resolves to `undefined` as there is no `seriesTitle` property on the global object. 

5. Use `let self = this;` to ensure that `TESgames.listGames` uses `TESGames` as its context and logs the proper output.

   Show Solution

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

6. The `forEach` method provides an alternative way to supply the execution context for the callback function. Modify the program from the previous problem to use that technique to produce the proper output:

   Show Solution

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

7. Use an arrow function to achieve the same result:

   Show Solution

   ```js
   const TESgames = {
     titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
     seriesTitle: 'The Elder Scrolls',
     listGames: function() {
       this.titles.forEach(title => {
         console.log(this.seriesTitle + ': ' + title);
     	});
     }
   };
   
   TESgames.listGames();
   ```

   

8. Consider the following code:

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment();
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   What will the value of `foo.a` be after this code runs?

   Show Solution

   ```terminal
   0
   ```

   When the code on line 5 runs, the value of `this` is the global object. That is because the function `increment` is invoked as a standalone function on line 8. `this.a` on line 5 references a property of the global object rather than a property of `foo`. Thus, property `foo.a` is never modified in the code, its value remains 0. 

   The value of `foo.a` will be `0`. Since `increment` gets invoked as a function, `this.a` on line 5 references a property of the global object rather than a property of `foo`. Thus, the property `foo.a` isn't modified by the `increment`; its value remains 0.

9. Use one of the methods we learned in this lesson to invoke `increment` with an explicit context such that `foo.a` gets incremented with each invocation of `incrementA`.

   Show Solution

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment.call(this);
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

   We can use `apply` or `call` to invoke `increment` on line 8 with explicit context. We pass `this` as the context argument since inside `incrementA` but outside of `increment`, `this` references the containing object, namely `foo`.

   ```js
   let foo = {
     a: 0,
     incrementA: function() {
       function increment() {
         this.a += 1;
       }
   
       increment.bind(this)(); // bind also works but code is strange
     }
   };
   
   foo.incrementA();
   foo.incrementA();
   foo.incrementA();
   ```

## Lesson 3

#### Factory Functions 

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/bf77a962)

1. What are two disadvantages of working with factory functions?

   Show Solution

   - Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
   - There is no way to tell which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 

2. Rewrite the following code to use object-literal syntax to generate the returned object:

   ```js
   function makeObj() {
     let obj = {};
     obj.propA = 10;
     obj.propB = 20;
     return obj;
   }
   ```

   Show

   ```js
   function makeObj() {
     return {
       propA: 10,
       propB: 20,
     };  
   }
   ```

3. In this problem and the remaining problems, we'll build a simple invoice processing program. To get you started, here's the code to process a single invoice:

   ```js
   let invoice = {
     phone: 3000,
     internet: 6500
   };
   
   let payment = {
     phone: 1300,
     internet: 5500
   };
   
   let invoiceTotal = invoice.phone + invoice.internet;
   let paymentTotal = payment.phone + payment.internet;
   let remainingDue = invoiceTotal - paymentTotal;
   
   console.log(paymentTotal);         // => 6800
   console.log(remainingDue);         // => 2700
   ```

   To process multiple invoices, we need a factory method that we can use to create invoices. The requirements for the factory function are as follows:

   1. It returns an invoice object, with `phone` and `internet` properties, and a `total` method.
   2. The default value for the phone service is 3000, and the internet service is 5500 (in cents, of course!).
   3. The function takes an object argument whose attributes override the default values.

   Your function should work with the following code:

   ```js
   function createInvoice(services) {
     // implement the factory function here
   }
   
   function invoiceTotal(invoices) {
     let total = 0;
   
     for (let index = 0; index < invoices.length; index += 1) {
       total += invoices[index].total();
     }
   
     return total;
   }
   
   let invoices = [];
   invoices.push(createInvoice());
   invoices.push(createInvoice({ internet: 6500 }));
   invoices.push(createInvoice({ phone: 2000 }));
   invoices.push(createInvoice({
     phone: 1000,
     internet: 4500,
   }));
   
   console.log(invoiceTotal(invoices)); // 31000
   ```

   Show Solution

   ```js
   function createInvoice(services = {}) { // default parameter in case no object is passed to the function. 
     let phoneCharge = services.phone || 3000;
     let internetCharge = services.internet || 5500;
   
     return {
       phone: phoneCharge,
       internet: internetCharge,
   
       total: function() {
         return this.phone + this.internet;
       }
     };
   }
   ```

4. Now we can build a factory function to create payments. The function can take an object argument in one of 3 forms:

   - Payment for one service, e.g., `{ internet: 1000 }` or `{ phone: 1000 }`.
   - Payment for both services, e.g., `{ internet: 2000, phone: 1000 }`.
   - Payment with just an amount property, e.g., `{ amount: 2000 }`.

   The function should return an object that has the amount paid for each service and a `total` method that returns the payment total. If the `amount` property is not present in the argument, it should return the sum of the phone and internet service charges; if the `amount` property is present, return the value of that property.

   Your function should work with the following code:

   ```js
   function createPayment(services) {
     // implement the factory function here
   }
   
   function paymentTotal(payments) {
     return payments.reduce((sum, payment)  => sum + payment.total(), 0);
   }
   
   let payments = [];
   payments.push(createPayment());
   payments.push(createPayment({
     internet: 6500,
   }));
   
   payments.push(createPayment({
     phone: 2000,
   }));
   
   payments.push(createPayment({
     phone: 1000,
     internet: 4500,
   }));
   
   payments.push(createPayment({
     amount: 10000,
   }));
   
   console.log(paymentTotal(payments));      // => 24000
   ```

   Show Solution

   ```js
   function createPayment(services = {}) { 
     return {
       phone: services.phone || 0,
       internet: services.internet || 0,
       amount: services.amount,
       total: function () {
         return services.amount || this.phone + this.internet;
       }   
     };
   }
   ```

5. Update the `createInvoice` function so that it can add payment(s) to invoices. Use the following code as a guideline:

   ```js
   let invoice = createInvoice({
     phone: 1200,
     internet: 4000,
   });
   
   let payment1 = createPayment({ amount: 2000 });
   let payment2 = createPayment({
     phone: 1000,
     internet: 1200
   });
   
   let payment3 = createPayment({ phone: 1000 });
   
   invoice.addPayment(payment1);
   invoice.addPayments([payment2, payment3]);
   invoice.amountDue();       // this should return 0
   ```

   Show Solution

   ```js
   function createInvoice(services = {}) { // default parameter in case no object is passed to the function.
     let phoneCharge = services.phone || 3000;
     let internetCharge = services.internet || 5500;
   
     return {
       phone: phoneCharge,
       internet: internetCharge,
       paymentTotal: 0,
   
       invoiceTotal: function () {
         return this.phone + this.internet;
       },
   
       addPayment: function (payment) {
         this.paymentTotal += payment.total();
       },
   
       addPayments: function (arr) {
         arr.forEach(payment => {
           this.addPayment(payment);
         });
       },
   
       amountDue() {
         console.log(this.invoiceTotal() - this.paymentTotal);
       }
     };
   }
   ```

------

1. 

------

#### Constructors

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/5ca112a7)

1. What naming convention separates constructor functions from other functions?

   Show Solution

   Capitalizing constructor function names. 

2. What happens if you run the following code? Why?

   ```js
   function Lizard() { // invoked as a normal function, function returns undefined.
     this.scamper = function() { 
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = Lizard(); // lizzy's value is undefined.
   lizzy.scamper(); // ?
   ```

   Show Solution

   On line 7, `Lizard` is invoked as a normal function. It doesn't have an explicit return value, so it returns `undefined`, which is the value of `lizzy`. On line 8, `lizzy.scamper()` evaluates to `undefined.scamper()` which throws a `TypeError`. 

   This code throws a `TypeError` since `scamper` is an undefined property on `lizzy`. Since `Lizard` was invoked without the `new` operator and it doesn't have an explicit return value, the return value is `undefined`. Thus, `lizzy` gets assigned to `undefined` which causes the call to `scamper` to throw an error: you can't call a method on `undefined`.

3. Alter the code in problem 2 so that it produces the desired output: `I'm scampering!`.

   Show Solution

   ```js
   function Lizard() { // 
     this.scamper = function() { 
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = new Lizard(); 
   lizzy.scamper(); 
   ```

------

#### Practice Problems - Constructors and Prototypes

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/ee0fee9d)

1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

   ```js
   let RECTANGLE = {
     area: function() {
       return this.width * this.height; // this refers to RECTANGLE
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) {
     this.width = width;
     this.height = height;
     this.area = RECTANGLE.area();
     this.perimeter = RECTANGLE.perimeter();
   }
   
   let rect1 = new Rectangle(2, 3);
   
   console.log(rect1.area);
   console.log(rect1.perimeter);
   ```

   Solution

   ```terminal
   NaN
   NaN
   ```

   When `RECTANGLE.area` is invoked, `this` refers to `RECTANGLE` instead of the instance object of the `Rectangle` constructor. `RECTANGLE` doesn't defined `width ` or `height` properties, so `this.width` and `this.height` evaluated to `undefined`.  Mathematical operations on `undefined` result in `NaN`. 

2. How would you fix the problem in the code from problem 1?

   Solution

   ```js
   let RECTANGLE = {
     area: function() {
       return this.width * this.height; // this refers to RECTANGLE
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) {
     this.width = width;
     this.height = height;
     this.area = RECTANGLE.area.call(this);
     this.perimeter = RECTANGLE.perimeter.call(this);
   }
   
   let rect1 = new Rectangle(2, 3);
   
   console.log(rect1.area);
   console.log(rect1.perimeter);
   ```

3. Write a constructor function called `Circle` that takes a radius as an argument. You should be able to call an `area` method on any objects created by the constructor to get the [circle's area](https://www.mathsisfun.com/geometry/circle-area.html). Test your implementation with the following code:

   ```js
   let a = new Circle(3);
   let b = new Circle(4);
   
   a.area().toFixed(2); // => 28.27
   b.area().toFixed(2); // => 50.27
   a.hasOwnProperty('area'); // => false
   ```

   Solution

   ```js
   function Circle(radius) {
     this.radius = radius; 
   }
   
   Circle.prototype.area = function () {
     return Math.PI * this.radius * this.radius;
   }
   ```

4. What will the following code log to the console and why?

   ```js
   function Ninja() {
     this.swung = true;
   }
   
   let ninja = new Ninja();
   
   Ninja.prototype.swingSword = function() {
     return this.swung;
   };
   
   console.log(ninja.swingSword());
   ```

   Solution

   ```terminal
   true
   ```

   Even though we define the `swingSword` method on the prototype after we create the `ninja`, all objects created by the `Ninja` constructor share the same prototype object. Thus, when we define `swingSword`, it immediately becomes available to the `ninja` object.

5. What will the following code output and why? Try to answer without running the code.

   ```js
   function Ninja() {
     this.swung = true;
   }
   
   let ninja = new Ninja();
   
   Ninja.prototype = {
     swingSword: function() {
       return this.swung;
     },
   };
   
   console.log(ninja.swingSword());
   ```

   Solution

   ```terminal
   Uncaught TypeError: ninja.swingSword is not a function
   ```

   We reassigning `Ninja.prototype` to an entirely new object instead of mutating the original prototype object. The prototype for the `ninja` object doesn't change; it's still the original prototype defined during the constructor's invocation. Thus, JavaScript can't find the `swingSword` method in the prototype chain of `ninja`.

6. Implement the method described in the comments below:

   ```js
   function Ninja() {
     this.swung = false;
   }
   
   // Add a swing method to the Ninja prototype which
   // modifies `swung` and returns the calling object
   
   let ninjaA = new Ninja();
   let ninjaB = new Ninja();
   
   console.log(ninjaA.swing().swung);      // logs `true`
   console.log(ninjaB.swing().swung);      // logs `true`
   ```

   Solution

   ```js
   function Ninja() {
     this.swung = false;
   }
   
   Ninja.prototype.swing = function () {
     this.swung = true;
     return this;
   }
   
   let ninjaA = new Ninja();
   let ninjaB = new Ninja();
   
   console.log(ninjaA.swing().swung);      // logs `true`
   console.log(ninjaB.swing().swung);      // logs `true`
   ```

   This pattern of "chainable" methods invocations and property accesses on an object requires that methods defined on the prototype always return the context object (in this case, `ninjaA` and `ninjaB`).

7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

   ```js
   let ninjaA;
   
   {
     const Ninja = function() {
       this.swung = false;
     };
   
     ninjaA = new Ninja();
   }
   
   let ninjaB = new ninjaA.constructor(); // create a `ninjaB` object here; don't change anything else
   
   ninjaA.constructor === ninjaB.constructor // => true
   ```

   Hint

   The value assigned to `ninjaA` is an object created by a constructor function. As such, this object has a `constructor` property that points back to its constructor. Think of a way to use this property; that should help lead you to a solution.

   Solution

   ```js
   let ninjaB = new ninjaA.constructor();
   ```

   Does your answer use `Object.create` instead?

   ```js
   let ninjaB = Object.create(ninjaA);
   ```

   This code works as well, but there is a flaw: it puts the `swung` property in the prototype object instead of in the `ninjaB` object where it belongs. Thus, `ninjaA` and `ninjaB` are somewhat different objects:

   ```plaintext
   ninjaA:
     swung: false 
     constructor: Ninja
     prototype: {}
   
   ninjaB:
     constructor: Ninja
     prototype: {
       swung: false
     }
   ```

8. Since a constructor is just a function, you can call it without the `new` operator. However, that can lead to unexpected results and errors, especially for inexperienced programmers. Write a constructor function that you can use with or without the `new` operator. The function should return the same result with either form. Use the code below to check your solution:

   ```js
   function User(first, last) {
     // ...
   }
   
   let name = 'Jane Doe';
   let user1 = new User('John', 'Doe');
   let user2 = User('John', 'Doe');
   
   console.log(name);         // => Jane Doe
   console.log(user1.name);   // => John Doe
   console.log(user2.name);   // => John Doe
   ```

   Hint

   In the constructor function, check the value of `this` to see whether it is an instance created by the constructor function. If it is, then the function was called with the `new` operator; otherwise, the function was called without `new`. You can use this in your code; if you determine that `new` wasn't used, then you can have the constructor call itself with the `new` keyword and use its return value.
   
   Solution
   
   ```js
   function User(first, last) {
     if (!(this instanceof User)) {
       return new User(first, last); // need return statement to avoid side effects
     }
     
     this.name = `${first} ${last}`;
     
   }
   ```
   

------

#### Practice Problems - Classes

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/b29488f2)

1. What do we mean when we say that classes are first-class values?

   Solution

2. Consider the following class declaration:

   Copy Code

   ```js
   class Television {
     static manufacturer() {
       // omitted code
     }
   
     model() {
       // method logic
     }
   }
   ```

   What does the `static` modifier do? How would we call the method `manufacturer`?

   Solution

------

## Lesson 4

- Creation with Prototypes

Give us your feedback

#### Practice Problems: Object Creation with Prototypes

[reference](https://launchschool.com/lessons/d5964d17/assignments/02f965cb)

1. Use a factory function to create pet objects. The factory should let us create and use pets like this:

   ```js
   let pudding = createPet("Cat", "Pudding");
   console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
   pudding.sleep(); // I am sleeping
   pudding.wake();  // I am awake
   
   let neptune = createPet("Fish", "Neptune");
   console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
   neptune.sleep(); // I am sleeping
   neptune.wake();  // I am awake
   ```

   Solution

2. Use the OLOO pattern to create an object prototype that we can use to create pet objects. The prototype should let us create and use pets like this:

   ```js
   let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
   console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
   pudding.sleep(); // I am sleeping
   pudding.wake();  // I am awake
   
   let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
   console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
   neptune.sleep(); // I am sleeping
   neptune.wake();  // I am awake
   ```

   Solution

3. Consider the objects created by the programs in problems 1 and 2. How do objects for the same animal differ from each other?

   solution

------

#### Practice Problems: Subtyping with Classes

[reference](https://launchschool.com/lessons/d5964d17/assignments/16921628)

1. Suppose we have the following classes:

   ```js
   class Game {
     play() {
       return 'Start the game!';
     }
   }
   
   class Bingo extends Game {
     rulesOfPlay() {
       // rules of play
     }
   }
   ```

   What would happen if we added a `play` method to the `Bingo` class, keeping in mind that there is already a method of this name in the `Game` class from which the `Bingo` class inherits? Explain your answer. What do we call it when we define a method like this?

   Solution

2. Let's practice creating a class hierarchy.

   Create a class named `Greeting` that has a single method named `greet`. The method should take a string argument, and it should print that argument to the console.

   Now, create two more classes that inherit from `Greeting`: one named `Hello`, and the other `Goodbye`. The `Hello` class should have a `hi` method that takes no arguments and logs `"Hello"`. The `Goodbye` class should have a `bye` method that logs `"Goodbye"`. Use the `greet` method from the `Greeting` class when implementing `Hello` and `Goodbye`; don't call `console.log` from either `Hello` or `Goodbye`.

   Solution
