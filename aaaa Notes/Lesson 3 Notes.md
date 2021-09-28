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
   
   let payment1 = createPayment({ amount: 2000 }); //payment1 is an object
   let payment2 = createPayment({
     phone: 1000,
     internet: 1200
   });
   
   let payment3 = createPayment({ phone: 1000 });
   
   invoice.addPayment(payment1);
   invoice.addPayments([payment2, payment3]);
   invoice.amountDue();       // this should return 0
   ```

   ```js
   let invoice = function createInvoice(services = {}) { 
     let phoneCharge = services.phone || 3000;
     let internetCharge = services.internet || 5500;
   
     return {
       phone: phoneCharge,
       internet: internetCharge,
       payments[], // an array of objects 
   
       total: function() {
         return this.phone + this.internet;
       }, 
       
       addPayment: function(payment) {
         this.payments.push(payment);
       }, 
       
       addPayments: function(payments) {
         payments.forEach(this.addPayment, this); // syntax is forEach(callback fn, thisArg)
       }, 
        
       paymentTotal: function() {
         return this.payments.reduce((sum, payment) => sum + payment.total(), 0); //sums up the payments array, "payment" references objects of data. 
       }
       amountDue: function() {
         return this.total() - this.paymentTotal();
       }
     };
   }
   
   ```
   

------

### Constructors

**object constructors **/ constructors are another way to create objects in JavaScript. 

- Think of it as a little factory that can create an endless number of objects of the same type. 
- Superficially, a constructor looks and acts a lot like a factory function: you define a constructor once then invoke it each time you want to create an object of that type. 

```js
let car = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2016,
  started: false,

  start() {
    this.started = true;
  },

  stop() {
    this.started = false;
  },
};
```

We don't just want *a* car, however. We want a mechanism that creates any car that has those properties and methods. To do that, we can use a factory function to create individual cars:

```js
function createCar(make, model, year) {
  return {
    make, // shorthand for `make: make`
    model,
    year,
    started: false,

    start() {
      this.started = true;
    },

    stop() {
      this.started = false;
    },
  };
}

let corolla = createCar('Toyota', 'Corolla', 2016);
let leaf = createCar('Nissan', 'LEAF', 2018);
let nova = createCar('Chevrolet', 'Nova', 1974);
```

Another way to accomplish the same thing is to use a constructor function and the `new` keyword:

```js
// very similar to function factory
function Car(make, model, year) { // constructors use uppercase
  this.make = make;
  this.model = model;
  this.year = year;
  this.started = false;

  this.start = function() { // assigning function to property 
    this.started = true;
  };

  this.stop = function() {
    this.started = false;
  };
} // no explicit return value

let corolla = new Car('Toyota', 'Corolla', 2016);
let leaf = new Car('Nissan', 'LEAF', 2018);
let nova = new Car('Chevrolet', 'Nova', 1974);
```

- Notice that we gave the constructor a name that begins with a capital letter: `Car`. Capitalizing the name isn't a language requirement, but it is a convention employed by most JavaScript developers.

- The function parameters, in general, match the properties associated with each `Car` object. In this case, we supply parameters for all of the properties except `started`, which receives an initial value instead. The initial value for such properties can come from anywhere. For instance, we can compute the value from other properties or retrieve a value from a database.

##### Calling a Constructor Function

- The most striking features that distinguish constructors from ordinary functions are that:
  - we call it with the `new` keyword,
  - we use `this` to set the object's properties and methods, and
  - we don't supply an explicit return value (we can, but usually don't).

##### Question: so contructors implicitely return an object? 

- What object does `this` refer to in the constructor function? Of course, we know `this` depends on how we call the function. 
- Calling constructors is where you see the most significant difference between them and other functions. 

Let's create a car object. 

```js
let corolla = new Car('Toyota', 'Corolla', 2016);

corolla.make;    // => 'Toyota'
corolla.model;   // => 'Corolla'
corolla.year;    // => 2016
corolla.started; // => false

corolla.start();
corolla.started; // => true
```

##### New

- Notice that the `new` keyword precedes the function invocation. This combination of using `new` with a function call treats the function as a constructor.
- What's significant about using `new` keyword to invoke a function? 
- JavaScript takes the following steps when you invoke a function with `new`. 
  1. It creates an entirely new object.
  2. It sets the prototype of the new object to the object that is referenced by the constructor's `prototype` property. We'll discuss this in a later assignment. We mention it now for completeness.
  3. It sets the value of `this` inside the function to point to the new object. 
  4. It invokes the consturctor function. Since `this` refers to the new object, we use it within the function to set the object's properties and methods.
  5. Finally, once the function finishes running, `new` returns the new object "automatically"; we don't explicitly return anything.

We can now use the new object in any manner appropriate for a `Car` object.

**JavaScript won't complain about a missing `new` keyword**.

```js
Car(); // => undefined
```

- If you don't use the `new` keyword, the constructor function won't work as intended, but will still run.  Instead, it acts like an ordinary function. 
- In particular, no new objects are created, so `this` won't point to a new object.

- Furthermore, since functions that don't return an explicit value return `undefined`, calling a constructor without `new` also returns `undefined`. 
- When you use `new`, however, the function doesn't have to return anything explicitly: it returns the newly created object automatically.

##### Who can be a Constructor

- You can use `new` to call almost any JavaScript function that you create. 
- Exception: However, you cannot call arrow functions with `new` since they use their surrounding context as the value of `this`:

```js
let Car = (make, model, year) => {
  this.make = make;
  this.model = model;
  this.year = year;
}

new Car(); // TypeError: Car is not a constructor
```

- You can also use `new` on methods that you define in objects. Consider:
  - But can't use concise syntax 

```js
let foo = {
  Car: function(make, model, year) { // car is a method in an object
    this.make = make;
    this.model = model;
    this.year = year;
  }
};

let car1 = new foo.Car('Toyota', 'Camry', 2019);
car1.make; //=> 'Toyota'
```

- Calling a method defined with concise syntax (also called a concise method) won't work:

```js
let foo = {
  Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
};

new foo.Car(); //=> Uncaught TypeError: foo.Car is not a constructor
```

- In addition, many -- but not all -- built-in objects and methods are incompatible with `new`:

```js
new console.log(); //=> Uncaught TypeError: console.log is not a constructor
new Math();        //=> Uncaught TypeError: Math is not a constructor
new parseInt("3"); //=> Uncaught TypeError: parseInt is not a constructor

new Date();        //=> 2019-06-26T02:50:20.191Z
```

- `new` is also incompatible with special functions known as **generators** (a topic that we don't currently cover at Launch School).

##### Constructors With Explicit Return Values

What happens when you use `new` to call a function that returns an explicit value?

```js
function Cat(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  return 'a cat';
}

let fluffy = new Cat('fluffy', 'Persian', 15);
fluffy.weight; // 15
```

- That's curious. Even though we explicitly returned the string `'a cat'`, our constructor returned the cat object with `name`, `breed` and `weight` as its properties.

- Note that `'a cat'` is a primitive value. Suppose we returned an object instead. What would happen, then?

```js
function Cat(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  return { foo: 1 };
}

let fluffy = new Cat('fluffy', 'Persian', 15);
fluffy.weight; // undefined
fluffy.foo; // 1
```

- This time the constructor returned the object `{ foo: 1 }`, not a cat object.

- Rule: constructor that explicitly tries to return an object returns that object instead of a new object of the desired type. In all other situations, it returns the newly created object, provided no errors occur. In particular, the constructor ignores primitive return values and returns the new object instead.

##### Supplying Constructor Arguments with Plain Objects

Constructor functions sometimes have to grow with the needs of a program. That often means adding more arguments to the constructor. For instance, our `Car` constructor may one day end up looking like this:

```js
function Car(make, model, year, color, passengers, convertible, mileage) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;
  this.passengers = passengers;
  this.convertible = convertible;
  this.mileage = mileage;
  this.started = false;

  this.drive = function() {
    this.started = true;
  };

  // rest of the methods
}
```

That's quite a few parameters, with plenty of opportunities for mistakes. 

- For instance, we may pass the arguments in the wrong order, and JavaScript won't complain. That might seem like a minor inconvenience, but it causes more bugs than you might think. Not only that, those bugs are often quite nasty and hard to diagnose. 
- The more parameters a function needs, the harder it is to read the code and the more likely that problems will arise.

- One common technique that we can use to manage our parameters better involves passing them to our constructor with an object argument:

```js
let civicArgs = {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000
}

let civic = new Car(civicArgs);
```

Of course, that means that we now have to rework our `Car` constructor to accept an object as an argument:

```js
function Car(args) {
  this.make = args.make;
  this.model = args.model;
  this.year = args.year;
  this.color = args.color;
  this.passengers = args.passengers;
  this.convertible = args.convertible;
  this.mileage = args.mileage;
  this.started = false;

  this.drive = function() {
    this.started = true;
  };

  // rest of methods
}
```

With `Object.assign`, we can simplify this constructor considerably:

```js
function Car(args) {
  Object.assign(this, args); // merges the two objects into single object. 

  this.drive = function() {
    this.started = true;
  };

  // rest of the methods
}
```

- However, one drawback of the `Object.assign` approach is that the `args` object may contain properties that the `Car` object doesn't need. Those additional properties will, nevertheless, get added to the `Car` object. Those properties may just be excess baggage for the objects to carry around, but they may also cause trouble.

##### Determining an Object's Type

- Many object-oriented languages, like Java or C++, have a strong notion of object types. In most such languages, it's easy to determine the object's type, such as a dog or car. 
- JavaScript, however, treats objects and their types in a looser, more dynamic way. You can't determine the specific type of arbitrary JavaScript objects; they are dynamic structures with a type of `object`, no matter what properties and methods they have. However, we can get some useful information about an object if we know which constructor created it.

- Remember that the `new` operator creates a new object. Suppose that you call the Car constructor with `new`. Informally, we can say that the resulting object is a car. More formally, we can say that the object is an **instance** of a `Car`.

- The `instanceof` operator lets us determine whether a given constructor created an object:

```js
let civicArgs = {
  make: 'Honda',
  model: 'Civic',
  year: 2016,
  color: 'black',
  passengers: 5,
  convertible: false,
  mileage: 16000
};

let civic = new Car(civicArgs);

if (civic instanceof Car) {
  console.log("It's a car!");
} else {
  console.log("It's not a car.");
}
```

- One effect that we didn't mention when talking about the `new` operator is that the object it returns contains some information that ties it back to the constructor that created the object. The `instanceof` operator uses that information to determine what constructor created the object. We'll talk more about how this mechanism works in the next assignment.

##### `new` and Implicit Execution Context

- In an earlier lesson, we discussed how a function could receive an implicit execution context. In particular, function and method calls provide an implicit context. For a function call, the implicit context is the global object; for a method call, it's the object used to call the method.

- Now that we know about constructors, we can add a constructor call with `new` as a third way to provide an implicit execution context. When you call a function with `new`, its implicit context is the new object.

##### Problems

1. What naming convention separates constructor functions from other functions?

   Constructor function names are capitalized. 

2. What happens if you run the following code? Why?

   ```js
   function Lizard() {
     this.scamper = function() { // this refers to global object, creating a propery scamper inside global object 
       console.log("I'm scampering!");
     };
   } // this function doesn't have explicit return value, so return value is undefined. 
   
   let lizzy = Lizard();
   lizzy.scamper(); // typeError, can't call method on undefined. 
   ```

   Show Solution

   This throws a `TypeError` since `scamper` is an undefined property on `lizzy`. Since `Lizard` was invoked without the `new` operator and doesn't have an explicit return value, the return value is undefined. Thus, `lizzy` gets assigned to `undefined` which causes the call to `scamper` to throw an error: you can't call a method on `undefined`. 

3. Alter the code in problem 2 so that it produces the desired output: `I'm scampering!`.

   Show Solution

   ```js
   function Lizard() {
     this.scamper = function () {
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = new Lizard(); // all we need to add is the new keyword 
   lizzy.scamper();
   ```



------

### Constructors with Prototypes

- Why do we need constructors if we can just use object factories. 

```js
function Dog(name, breed, weight) {
  this.name = name;
  this.breed = breed;
  this.weight = weight;

  this.bark = function() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  };
}

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

maxi.bark(); // 'Woof!'
```

```js
maxi.hasOwnProperty('bark');   // true
dexter.hasOwnProperty('bark'); // true
biggie.hasOwnProperty('bark'); // true
maxi.bark === dexter.bark;     // false
maxi.bark === biggie.bark;     // false
dexter.bark === biggie.bark;   // false
```

- Dog object `maxi`, `dexter`, and `biggie` have different `name`, `breed`, and `weight` properties, and also have their own `bark` method, even though that method is the same in all of them. 
- Every time we create a new dog object, we must create new `bark`method so we can add it to the object as its own property. 
- This is inefficient and wasteful on memory. How do we create the `bark` method just once, rather than use a different copy of that method in every dog object? 

##### Method Delegation to Prototypes

- We can define a method once in the prototype object, and let the inheriting objects delegate the method calls to the prototype.

- Use prototypes in conjunction with constructors to achieve the same result: 

```js
// creating separate object to use as prototype?? Just for a shared method. 
let DogPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, DogPrototype); // first thing we do is set DogPrototype as the prototype of the newly created dog object.
  this.name = name;
  this.breed = breed;
  this.weight = weight;
  // this.bark method removed.
}

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

maxi.bark(); // 'Woof!'
```

- This time, `bark` method isn't defined on the individual objects, but is, instead, defined on the `[[Prototype]]` property.

```js
maxi.hasOwnProperty('bark'); // false
dexter.hasOwnProperty('bark'); // false
biggie.hasOwnProperty('bark'); // false
Object.getPrototypeOf(maxi).bark === DogPrototype.bark; // true
Object.getPrototypeOf(dexter).bark === DogPrototype.bark; // true
Object.getPrototypeOf(biggie).bark === DogPrototype.bark; // true
```

- The `DogPrototype` object has the only copy of the method; all dog objects delegate `bark` to the `DogPrototype` object. This is better use of memory.

Okay, we now have a constructor and a related prototype object. Together, they **construct** objects of some type. It would be better if we could establish their relationship more concretely. 

```js
// Delete DogPrototype

function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype); // this is really interesting! We are creating the property after "invoking" it?
  // rest of the code
}

Dog.myPrototype = { 
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};
```

- Since JavaScript functions are objects, we can add properties to them. 
- Here we assign the prototype object to a `myPrototype` property on the `Dog` function object. Note that it's the `Dog` function object, not the object created by `Dog`!! 

- This code is confusing, but it works. Kind of like working with recursive functions. 

```js
// the complete code. 
function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.myPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);
maxi.bark(); // 'Woof!'

maxi.hasOwnProperty('bark'); // false
dexter.hasOwnProperty('bark'); // false
biggie.hasOwnProperty('bark'); // false
Object.getPrototypeOf(maxi).bark === Dog.myPrototype.bark; // true
Object.getPrototypeOf(dexter).bark === Dog.myPrototype.bark; // true
Object.getPrototypeOf(biggie).bark === Dog.myPrototype.bark; // true
```

##### The Constructor `prototype` Property

- The reason for why we need constructors! 

- So far, so good. We have a constructor function and a prototype object that work together. Between them, they create dog objects for us that don't waste memory with multiple copies of methods. However, we still haven't explained why we should bother with constructors. We can pair a prototype with a factory function and get the same effect.
- What makes constructors special is a characteristic of all function objects in JavaScript: they all have a `prototype` property that we call the **function prototype** to distinguish them from the prototypes used when creating ordinary objects. 
  - **Function prototype**: the `prototype` property that is a characteristic of all function objects in JavaScript, which distinguishes them from prototypes used when creating ordinary objects. This is what makes constructors special. 
- The code in the previous section emulates something that JavaScript bundles with constructors. 

```terminal
Dog.prototype; // => Dog {}
```

- When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the current value of `Foo`'s `prototype` property. 
  - That is, the constructor creates an object that inherits from the constructor function's prototype (`Foo.prototype`)
  - Since inheritance in JS uses prototypes, we can also say that the consturctor creates an object whose prototype references`Foo.prototype`. 

------

##### Terminology: Object prototype vs Constructor's prototype object

- The terminology of constructor prototypes and object prototypes is extremely confusing. Note in particular that we use the term "prototype" to refer to 2 distinct but related concepts:
  - If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. 
    - By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.
  - The **constructor's prototype object** /  **function prototype** / **`prototype` property** is an object that the constructor uses as the object prototype for the objects it creates. 
    - In other words, each object that the constructor creates inherits from the constructor's prototype object. 
    - The constructor stores its prototype object in its `prototype` property; that is, if the constructor's name is `Foo`, then `Foo.prototype` references the constructor's prototype object.
- It's easy to get confused about the differences between these two kinds of prototypes. Be sure you understand the differences before moving on. 
- In most cases, when we talk about a **prototype** without being more explicit, we mean an **object prototype**. We'll talk about the constructor's prototype, the function prototype, or the `prototype` property when talking about a constructor's prototype object.
- Note that constructors don't inherit from the constructor's prototype object. Instead, the objects that the constructor creates inherit from it.
- At this point, you may want to rewatch the first 12 minutes of the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you watched earlier. The discussion of the differences between the object prototype (what the speaker calls *dunder proto* or `__proto__`) and the constructor's prototype object should help clarify these differences.

------

##### The Constructor `prototype` Property Continued..

- Every JavaScript function has a `prototype` property. However, JavaScript only uses it when you call that function as a constructor, that is, by using the `new` keyword. 
- With this information, we can abandon our home-grown constructor-prototype pairing and use the one that JavaScript provides instead:

```js
function Dog(name, breed, weight) {
  // deleted Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.prototype.bark = function() { // new object already inherits from the function prototype, so if we add properties to the prototype object, new object can delegate those properties. 
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
maxi.bark(); // 'Woof!'

let biggie = new Dog('Biggie', 'Whippet', 9);
biggie.bark(); // 'Yip!'
```

- Note that our constructor doesn't have to explicitly set the prototype of `this` (the new object) to `Dog.prototype`. JavaScript does that for us when we call the function with `new`. We left this detail out earlier, so let's restate those steps with updated information. We'll assume that the constructor function is named `Foo`:

1. It creates an entirely new object.
2. It sets `Foo.prototype` as the prototype for the new object. That is, the new object inherits from the object referenced by `Foo.prototype`.
3. It sets the execution context (`this`) for the function to point to the new object.
4. It invokes the function.
5. It returns the new object unless the function returns another **object**.

![Diagram](https://dbdwvr6p7sskw.cloudfront.net/images/js120/constructor-prototype-map.png)

##### Note about `this`

- Since the `bark` method refers to `this` and `bark` belongs to the prototype object, you may think that `this` in `this.weight` refers to the prototype object rather than the object itself (e.g., `maxi` or `biggie`). However, that's not how `this` binding works. 
- You already know those rules, so take a moment to think about what it means inside the `bark` method.
- When you call a method on an object, JavaScript binds `this` to the object whose method you used to call it. If it doesn't find the method in that object, but it does find it in the prototype, that doesn't change the value of `this`. 
- `this` always refers to the original object -- that is, the object used to call the method --even if the method is in the prototype. If we find the `bark` method in the prototype, `this` references the original dog object, not the prototype.

##### Constructor Property

- A property of interest on a prototype object is the `constructor` property. For instance:

```js
Dog.prototype.constructor; // [Function: Dog]
```

- As with the `instanceof` operator, the `constructor` property lets us determine the type of an object:

```js
let maxi = new Dog('Maxi', 'German Shepherd', 32);

if (maxi.constructor === Dog) {
  console.log("It's a dog");
} else {
  console.log("It's not a dog");
}
```

- Be careful, however. It's possible to reassign the `constructor` property to something else. We'll learn about reassigning the `constructor` property in the next assignment. In that case, the test shown above would fail, even though the object is still a dog.

```js
Dog.prototype.constructor = function() {};

maxi.constructor === Dog; // false
maxi instanceof Dog;      // true
```

- Note that `instanceof` still works.

##### Overriding the Prototype

- Inheriting methods from a prototype doesn't mean that the inheriting object is stuck with those methods. JavaScript objects are incredibly dynamic and flexible. 
- Two objects created with the same constructor may end up looking completely different from each other because of changes and additions made after constructing the object. 
- For instance, suppose we have a `dexter` dog that has an unusually loud and deep bark. We want to change the `bark` method to log `WOOF!` instead of `Woof!`. We can do that easily by defining a custom `bark` method on `dexter`.

```js
let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);

dexter.bark = function() { // dexter now has OWN property called bark
  console.log('WOOF!')
}

maxi.bark();   // Woof!
dexter.bark(); // WOOF!
```

- The `dexter` object now has its own `bark` method that **overrides** the `bark` method from `Dog.prototype`. Each time we call `bark` on `dexter`, JavaScript looks for it first in the `dexter` object itself. Since it finds it there, it doesn't need to check the prototype.

>  It's time to return to the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you began watching earlier. The portion of the video that pertains to this assignment starts at about the 00:39:18 mark, and continues through examples 5 and 7 until the 01:25:15 point. Note that we haven't covered inheritance yet, but the video talks about it. If those sections confuse you, just ignore them for now.

> If you want a refresher, you can also watch the earlier parts of the video.

> You may also want to read this student article: [A shallow dive into the constructor property in JavaScript](https://medium.com/@patel.aneeesh/a-shallow-dive-into-the-constructor-property-in-javascript-b0a89747058b) to get a better handle on the `constructor` property from the perspective of a student at roughly the same point in the JavaScript curriculum as you. The article is meant to be a companion to the JS OOP video above.

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

##### Constructors 

- **Constructor**  is a function that creates and returns an object/ the **instance** of the constructor function. 
- Use `new` keyword / operator preceding a <u>function invocation</u>, to treat the function as a constructor. 
- What `new` does. 
  - Creates an entirely new object (the **instance**)
  - Sets prototype of the new object to the object referenced by the constructor's `prototype` property. 
  - Sets the execution context / value of `this` for the function to point to the new object. 
  - It invokes the constructor function. 
  - Returns the new object unless the function returns another object. 
- Return value of constructor 
  - If there is an explicit return object, then that object is returned. 
  - In all other situations, constructor returns the newly created object, provided no errors occur. 
  - Constructor in particular ignores primitive return values and returns the new object instead. 
- Use `instanceof` to determine what constructor created the object. 

##### Constructors with Prototypes

- The constructor creates an object that inherits from the constructor function's prototype (`func.prototype`)
-  **object prototype**: the object from which an object inherits from. 
  - By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.

- The **constructor's prototype object** /  **function prototype** / **`prototype` property** is an object that the constructor uses as the object prototype for the objects it creates.
  - Every JavaScript function has a `prototype` property. However, JavaScript only uses it when you call that function as a constructor, that is, by using the `new` keyword. 
- **`constructor` property**: a property of interest on a prototype object. 

------

### Vocabulary

- instantiate 
- Delegate means 'request'

### Question

Why does this code work? Line 4. Recursion. 

```js
// Delete DogPrototype

function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype); // this is really interesting! We are creating the property after "invoking" it?
  // rest of the code
}

Dog.myPrototype = { // is it better to do this assignment, outside of the Dog function? 
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};
```



