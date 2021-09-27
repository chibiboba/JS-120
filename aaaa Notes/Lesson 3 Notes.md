### Introduction

- In lesson 1, we saw the power of object creation mechanism when we studied the object favotry pattern for creating objects. 
- In this lesson, we'll review that pattern and talk about some other patterns. 
- Unlike other mainstream languages, JavaScript doesn't implement behavior sharing using class-based inheritance even though ES6 introduced the `class` keyword to the language
  - Instead, it uses the object prototype to share properties.
  - This distinction is crucial to understanding how JavaScript generates individual objects; it forms the basis of all object-creation patterns in JavaScript that feature behavior sharing.
- We'll begin by looking at different ways to generate individual objects and then explore object prototypes. 
  - Next, we'll highlight two ways to create objects in an object-oriented pattern - one which simulates a classical approach, and another that uses the `class` syntax.
- The topics covered by this lesson are at the heart of OOP in JavaScript. Prototype-based object-orientation is not a straightforward concept to grasp, and it takes time to get used to this way of thinking. Take it slow, read the assignment multiple times, and be sure to work through all the practice problems to let the concepts sink in. Let's start!

------

### Review - OOP Principles: Encapsulation

- Problem that procedural programming has: as a program grows, so does its complexity, and you end up functions throughout the code split up from the data they operate on. 
- OOP solves this problem. Objects provide a means to group related data and functions into one unit. 
  - In the context of the object, the data and functions are commonly called state and methods respectively. 

##### Encapsulation

- The grouping together of related data and functions is what’s called encapsulation and is one of the fundamental principles of object-oriented programming.

```javascript
let overtime = 10;
let baseSalary = 6000;
let rate = 50;

function computeWage(baseSalary, overtime, rate) {
  return baseSalary + (overtime * rate)
}
```

- Up top are the data related to the employee’s wage and a function that operates on the data. The object-oriented way of solving this problem by using encapsulation is done by simply combining data and related functions into one unit like so:

```javascript
// instantiated an object using the object literal syntax. 
let employee = {
  baseSalary: 6000,
  overtime: 10,
  rate: 50,
  computeWage: function() {
    return this.baseSalary + (this.overtime * this.rate)
  }
}
```

- As you can see, everything that's related to the `employee` object are bundled. This is the beauty of object-oriented programming. It organizes code into logical units.

##### Summary

- We've just reviewed the concept of encapsulation and how it's relevant to object-oriented programming. 
- In the example given, we **instantiated** an object using the object literal syntax. 
- There are other more sophisticated patterns of object creation that we'll cover over the remaining assignments. 
- However keep in mind that, at the very core, we are essentially doing the same thing: grouping data and related functions together.

------

### Review - Factory Functions

In lesson 1, we learned how to create objects in bulk by using the *factory function* pattern. We'll review that concept before we move forward and discuss some other object creation patterns.

##### Factory Functions

- **Object factories** / factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template. 

```js
// simplify code by returning an object literal
function createPerson(firstName, lastName = '') {
  return {
    firstName: firstName,
    lastName: lastName,

    fullName: function() {
      return `${this.firstName} ${this.lastName}`.trim();
    }
  };
}

let john = createPerson('John', 'Doe');
let jane = createPerson('Jane');

john.fullName();        // => "John Doe"
jane.fullName();        // => "Jane"
```

Advantages

- The factory function lets us create multiple objects of the same "type" with a pre-defined "template."

Disadvantages

- Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
- No way to be sure you are working with the right kind of object. 
  - There is no way to inspect an object and learn whether we created it with a factory function, or which factory function. 
  - That effectively makes it impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics.

------

### Practice Problems - Factory Functions

1. What are two disadvantages of working with factory functions?

   - Each Object created by the factory function has a copy of all the methods, which can be redundant and memroy intensive. 
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
   		obj.propA = 10; 
   		obj.propB = 20;
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
   // their solution
   function createPayment(services = {}) {
     let payment = {
       phone: services.phone || 0,
       internet: services.internet || 0,
       amount: services.amount,
     };
   
     payment.total = function () {
       return this.amount || (this.phone || this.internet); // why assign the method here, rather than just set the method already in the payment object? Since this method will always be invoked by method invocation, `this` will always refer to the payment object. 
     }
   
     return payment;
   }
   ```

   ```js
   // this also works. 
   function createPayment(services = {}) {
     return {
       phone: services.phone || 0, 
       internet: services.internet || 0, 
       amount: services.amount, 
       
       total: function () {
         return this.amount || (this.phone || this.internet);
       }
     }
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

------

### Constructors

------

### Constructors with Prototypes

------

### Practice Problems - Constructors and Prototypes

------

### Static and Instance Properties and Methods

------

### Built - in Constructors

------

### ES6 Classes

------

### Practice Problems - Classes

------

### Summary

------

### Lesson 3 Quiz 1

------

### Concepts Summarized

##### Factory Functions

- **Object factories** / factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template. 

Advantages

- The factory function lets us create multiple objects of the same "type" with a pre-defined "template."

Disadvantages

- Every object created with a factory function has a full copy of all the methods. That's redundant, and it can place a heavy load on system memory.
- There is no way to inspect an object and learn whether we created it with a factory function. That effectively makes it impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics.



------

### Vocabulary

- instantiate 



