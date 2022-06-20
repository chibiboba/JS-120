## My Own

1. 

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

2. Practice OLOO. Rewrite this program by using the OLOO pattern.

```js
function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.eat = function () {
  console.log('Eating');
};

Person.prototype.communicate = function () {
  console.log('Communicating');
};

Person.prototype.sleep = function () {
  console.log('Sleeping');
};

function Doctor(firstName, lastName, age, gender, specialty) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialty = specialty;
}

Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor;

Doctor.prototype.diagnose = function () {
  console.log(`Diagnosing`);
};


function Student(firstName, lastName, age, gender, undergradSubject) {
  Person.call(this, firstName, lastName, age, gender);
  this.undergradSubject = undergradSubject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function () {
  console.log(`Studying`);
};


function GraduateStudent(firstName, lastName, age, gender, undergradSubject, gradSubject) {
  Student.call(this, firstName, lastName, age, gender, undergradSubject);
  this.gradSubject = gradSubject;
}
GraduateStudent.prototype = Object.create(Student.prototype);
GraduateStudent.prototype.constructor = GraduateStudent;

GraduateStudent.prototype.research = function () {
  console.log(`Researching`);
};

let person = Person.initialize('foo', 'bar', 21, 'gender');
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

let doctor = Doctor.init('foo', 'bar', 21, 'gender', 'Pediatrics');

doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

let graduateStudent = GraduateStudent.init2('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements

graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'
```



------

## Lesson 1

#### OOP and Encapsulation

1. In your own words, what is Object Oriented Programming?

   Solution

   OOP is a programming paradigm where we think about problems in terms of objects, using objects to organize a program. 

2. Describe some advantages and disadvantages of OOP.

   Solution

   **Advantages**

   - OOP reduces dependencies and makes maintenance of code easier.
   - Using OOP to model objects and using real-world nouns to represent objects lets programmers think about a problem at a higher-level of abstraction, which helps them breakdown and solve problems. 
   - OOP makes code flexible, easy to understand, and easy to change.

   **Disadvantages**

   - OOP programs are often much larger than the equivalent procedural program. 
   - OOP may lead to less efficient code: OOP programs may require more memory, disk space, and computing power.

3. In your own words, what does encapsulation refer to in JavaScript?

   Solution

   In JavaScript, encapsulation is the idea of bundling data and operations associated with that data in a single entity; that is, it's the grouping of related properties and methods in a single object.

4. In JavaScript, how does encapsulation differ from encapsulation in most other OO languages?

   Solution

   In other languages, encapsulation concerns hiding details of an object from code that uses the object. An object should only expose the methods and properties that other objects need to use the encapsulated object. However, JavaScript does not directly provide the means to limit exposure of methods and properties. There are ways to achieve a degree of access restriction, but they're not perfect.

#### Objects and Factories

In these problems, we will develop a factory function for objects that represent books.

The following three books should give you an idea of what our first book object should look like:

```plaintext
Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description
```

1. Create three objects that represent the three books shown above. The method for the "Get Description" behavior should return a string like the following:

   ```js
   "Me Talk Pretty one day was written by David Sedaris."
   ```

   Solution

   ```js
   let book1 = {
     title: 'Mythos',
     author: 'Stephen Fry',
     getDescription: function() {
       return `${this.title} was written by ${this.author}.`;
     },
   };
   
   let book2 = {
     title: 'Me Talk Pretty One Day',
     author: 'David Sedaris',
     getDescription: function() {
       return `${this.title} was written by ${this.author}.`;
     },
   };
   
   let book3 = {
     title: "Aunts aren't Gentlemen",
     author: 'PG Wodehouse',
     getDescription: function() {
       return `${this.title} was written by ${this.author}.`;
     },
   };
   ```

2. Think about the code you wrote for problem #1. Is there any unnecessary code? Does it have duplication?

   Solution

   The method `getDescription` is duplicated in each object. However, each object must hold unique values for its `title` and `author` properties.

3. Given our observations about the code so far, implement a factory function for our book objects that we can use with the following code:

   ```js
   let book1 = createBook('Mythos', 'Stephen Fry');
   let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
   let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');
   
   book1.getDescription();  // "Mythos was written by Stephen Fry."
   book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
   book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"
   ```

   Solution

   ```js
   function createBbook(title, author) {
     return {
       title, 
       author, 
       getDescription() {
         return `${this.title} was written by ${this.author}.`;
       }
     }
   }
   ```

   

4. We now want to track which books we have and haven't read. Update the factory function so that it returns a book object that includes a property `read` that has an initial value of `false`.

   Solution

   ```js
   function createBbook(title, author) {
     return {
       title, 
       author, 
       read: false,
       getDescription() {
         return `${this.title} was written by ${this.author}.`;
       }
     }
   }
   ```

   

5. Suppose that we want to add a book that we've already read. Modify the factory function to use an optional `read` parameter with a default value of `false`.

   Solution

   ```js
   function createBbook(title, author, read = false) {
     return {
       title, 
       author, 
       read,
       getDescription() {
         return `${this.title} was written by ${this.author}.`;
       }
     }
   }
   ```

   

6. Let's add a method, `readBook`, that marks a book object as read by setting the `read` property to `true`:

   Solution

   ```js
   function createBbook(title, author, read = false) {
     return {
       title, 
       author, 
       read,
       getDescription() {
         return `${this.title} was written by ${this.author}.`;
       }, 
       
       readBook() {
         this.read = true;
       }
     }
   }
   ```

   

7. Finally, let's update `getDescription` function to reflect the `read` state directly, For instance:

   ```js
   book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
   book1.readBook();
   book1.getDescription(); // Mythos was written by David Fry. I have read it.
   ```
   
   Solution

   ```js
   function createBbook(title, author, read = false) {
     return {
       title, 
       author, 
       read,
       getDescription() {
         if (this.read) {
           return `${this.title} was written by ${this.author}. I have read it`;
         } else {
           return `${this.title} was written by ${this.author}.I haven't read it`;
         }
       }, 
       
       readBook() {
         this.read = true;
       }
     }
   }
   ```
   
   

------

## Lesson 2

#### Object Prototypes

1. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   console.log(baz.foo + qux.foo);
   ```

   Solution

   This code logs 2 to the console because `baz.foo` returns `1` because Javascript looks for property `foo` in the `baz` object, and then finds it in the prototype chain of `baz` on the `qux` object, which has a value of `1`. `qux.foo` resolves to `1` because there is a `foo` property directly on the `qux` object. 

2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   baz.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```

   Solution

   This code logs `3` to the console. On line 5, Javascript looks for `foo` and finds it on `baz`, who has a property `foo` with value `2`. Property assignment creates a new property in `baz` object named `foo`. `qux.foo` returns the value of its own `foo` property, which is `2`. 

3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   qux.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```

   Solution

   This code logs 4. On line 3, property `foo` is reassigned to value of 2 in object `qux`.  On line 5, `baz.foo` returns 2 because it doesn't have an own property `foo` so JavaScript searches the prototype chain for `foo` and finds it on `qux`. `qux.foo` returns 2 because `qux` has an own `foo` property with value of 2. Objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well. 

   

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
   // my solution, doesn't work
   function assignProperty(obj, prop, value) {
     while (obj !== null) {
     	if (obj.hasOwnProperty(prop)) {
         obj.prop = value; // bug here!! Dot notation doesn't work for variable properties
         break;
       }
       obj = Object.getPrototypeOf(obj);
   	}
   }
   ```

   ```js
   // their solution
   function assignProperty(obj, property, value) {
     while (obj !== null) { // loops until obj reaches the null prototype
       if (obj.hasOwnProperty(property)) { 
         obj[property] = value;
         break; // don't need this, loop ends with object is not null.
       }
   
       obj = Object.getPrototypeOf(obj); // // if property is not "own property", then search next prototype. 
     }
   }
   ```

   

5. Consider the following two loops:

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

   If `foo` is an arbitrary object, will these loops always log the same results to the console? Explain why they do or do not. If they don't always log the same information, show an example of when the results differ.

   Solution

   They don't always produce the same results because `Object.keys` only iterates over `foo`'s own enumerable properties, but `for...in` loop iterates over all the object's enumerable properties, including those inside the prototype chain. 

   ```js
   let baz = {prop3: 3};
   let foo = {prop1: 1, prop2: 2};
   Object.setPrototypeOf(foo, baz);
   
   Object.keys(foo).forEach(property => {
     console.log(`${property}: ${foo[property]}`);
   });
   
   for (let property in foo) {
     console.log(`${property}: ${foo[property]}`);
   }
   ```

   

6. How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?

   Solution

##### Q: How do you create an object that doesn't have a prototype? 

```js
let bareObj = Object.create(null);
```

##### Q: How can you determine whether an object has a prototype?

```js
if (Object.getPrototypeOf(obj)) {
  // object has a prototype
} else {
  // object doesn't have a prototype
}
```

------

#### Implicit and Explicit Execution Contexts

1. What will the following code output? Try to determine the results without running the code.

   ```js
   function func() {
     return this;
   }
   
   let context = func();
   
   console.log(context);
   ```

   Show Solution

   This code outputs `undefined`, because we are in strict mode, and in strict mode, the implicit execution context for regular function calls is `undefined` instead of the global object. If we weren't in strict mode, regular function calls would implicitly use the global object as the execution context. 

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

   This outputs `obj`. That is because on line 7, `func` is invoked as a method by the object `obj`. Method invocation uses the calling object as its implicit execution context. 

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

   ```
   Hello from the global scope
   Hello from the function scope
   ```

   

4. What built-in methods have we learned about that we can use to specify a function's execution context explicitly?

   Show Solution

   function.prototype.call

   function.prototype.apply

   function.prototype.bind

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
   bar.add.call(foo); // returns 3
   ```
   
   Since we invoke `call` on `bar.add` with `foo` as the explicit context, the `add` method uses `foo.a` and `foo.b` to determine the results, not `bar.a` and `bar.b`. Thus, the return value is 3. 

------

#### Hard Binding Functions with Contexts

[reference](https://launchschool.com/lessons/1eaf5e37/assignments/ed3a72f0)

1. What method can we use to bind a function permanently to a particular execution context?

   Show Solution

   `bind`

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

   javascript

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

   Error -> cannot read properties of undefined.

   5

   

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

   On line 15, property `logMessage` is added to the `negativity` object and assigned to `bar` which references a function that is permanently bound to the positivity object. When `logMessage` is invoked, `bar` invokes the `foo.bind` method with `positivity` as the execution context. `this.message` resolves to `JavaScript makes sense!` and gets logged to the console. Even though `logMessage` is invoked by the `negativity` object, it references a property `message` from the `positivity` object. 

   My Solution 

   ```terminal
   Javascript makes sense!
   ```

   On line 15, property `logMessage` is added to the `negativity` object and assigned to `bar`. `logMessage` is invoked on line 16. `logMessage` references `bar`, which references a function that is explicitly bound to the object `positivity` as its execution context. That function invokes `foo` with `this` referring to `positivity`, and `this.message` resolves to 'JavaScript makes sense'. So even though a method is invoked on the `negativity` object, it references a property from the `positivity` object. 

   Their Solution

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
   
   bar.call(otherObj);
   ```

   Show Solution
   
   ```
   Amazebulous
   ```
   
   Even though `bar` is invoked by `call`, `bar` references a function that is permanently bound to `obj`, and this binding of execution context cannot be changed. 

------

#### Dealing with Context Loss

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

   In strict mode, this code raises an error. On line 6: TypeError: cannot read properties of undefined. 

   If we aren't in strict mode, it logs

   ```js
   undefined undefined is a undefined
   ```

   `this` refers to the global object, and when trying to access properties that don't exist on that global object, `undefined` is returned. 

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

   

3. Suppose that we want to extract `getDescription` from `turk`, but we always want it to execute with `turk` as its execution context. How would you modify your code to do that?

   Show Solution

   ```js
   // this code doesn't work
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription: function() {
         return this.firstName + ' ' + this.lastName + ' is a '
                                     + this.occupation + '.';
     }.bind(this)
   };
   
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription);
   ```

   ```js
   // also doesn't work work
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription: function() {
         return this.firstName + ' ' + this.lastName + ' is a '
                                     + this.occupation + '.';
     }.bind(turk) // ReferenceError: cannot access turk before initialization
   };
   
   function logReturnVal(func) {
     let returnVal = func();
     console.log(returnVal);
   }
   
   logReturnVal(turk.getDescription);
   ```

   ```js
   // this works
   let turk = {
     firstName: 'Christopher',
     lastName: 'Turk',
     occupation: 'Surgeon',
     getDescription: function() {
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

   No, it will log 

   ```
   undefined: Area
   undefined: daggerfall
   undefined: Morrowind
   undefined: Oblivion
   undefined: Skyrim
   ```

   When functions are passed as argument they lose surrounding context. 

   Solution: 

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

   0

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
   
   

------

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
       propB: 20
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
   function createInvoice(services = {}) {
     // implement the factory function here
     return {
       phone: services.phone || 3000, 
       internet: services.internet || 5500,
       total() {
         return this.phone + this.internet;
       },
     };
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

4. Now we can build a factory function to create payments. The function can take an object argument in one of 3 forms:

   - Payment for one service, e.g., `{ internet: 1000 }` or `{ phone: 1000 }`.
   - Payment for both services, e.g., `{ internet: 2000, phone: 1000 }`.
   - Payment with just an amount property, e.g., `{ amount: 2000 }`.

   The function should return an object that has the amount paid for each service and a `total` method that returns the payment total. If the `amount` property is not present in the argument, it should return the sum of the phone and internet service charges; if the `amount` property is present, return the value of that property.

   Your function should work with the following code:

   ```js
   function createPayment(services = {}) {
     // implement the factory function here
     return {
       internet: services.internet || 0,
       phone: services.phone || 0,
       amount: services.amount || this.internet + this.phone, // bug
       total() {
         return this.amount;
       }
     };
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
     // implement the factory function here
     return {
       internet: services.internet || 0,
       phone: services.phone || 0,
       amount: services.amount, 
       total() {
         return this.amount || this.internet + this.phone;
       }
     };
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
   function createInvoice(services = {}) {
     // implement the factory function here
     return {
       phone: services.phone || 3000, 
       internet: services.internet || 5500,
       paymentTotal: 0,
       
       invoiceTotal() {
         return this.phone + this.internet;
       },
       
       addPayment(payment) {
   			this.paymentTotal += payment.total();
       }, 
       
       addPayments(payments) {
         payments.forEach(payment => {
           this.addPayment(payment);
         });
       }, 
       
       amountDue() {
         console.log(this.invoiceTotal - this.paymentTotal;
       }
     };
   }
   ```

------

#### Constructors

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/5ca112a7)

1. What naming convention separates constructor functions from other functions?

   Show Solution

   Capitalizing constructor names

2. What happens if you run the following code? Why?

   ```js
   function Lizard() {
     this.scamper = function() {
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = Lizard();
   lizzy.scamper(); // ?
   ```

   Show Solution

   Typeerror: cannot read properties of undefined.

3. Alter the code in problem 2 so that it produces the desired output: `I'm scampering!`.

   Show Solution
   
   ```js
   function Lizard() {
     this.scamper = function() {
       console.log("I'm scampering!");
     };
   }
   
   let lizzy = new Lizard();
   lizzy.scamper(); // ?
   ```
   
   

------

####  Constructors and Prototypes

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/ee0fee9d)

1. What does the following code log to the console? Try to answer without running the code. Can you explain why the code produces the output it does?

   ```js
   let RECTANGLE = {
     area: function() {
       return this.width * this.height;
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

   ```
   NaN
   NaN
   ```

   on lines 13, and 14, the implicit execution context for when `area` method is called is the `RECTANGLE` object, which doesn't have `width` or `height` properties. 

2. How would you fix the problem in the code from problem 1?

   Solution

   ```js
   // using call
   let RECTANGLE = {
     area: function() {
       return this.width * this.height;
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
   
   console.log(rect1.area); // 6
   console.log(rect1.perimeter); // 10
   ```

   ```js
   // using mixin
   let RECTANGLE = {
     area: function() {
       return this.width * this.height;
     },
     perimeter: function() {
       return 2 * (this.width + this.height);
     },
   };
   
   function Rectangle(width, height) {
     this.width = width;
     this.height = height;
     this.area = this.area();
     this.perimeter = this.perimeter();
   }
   Object.assign(Rectangle.prototype, RECTANGLE);
   let rect1 = new Rectangle(2, 3);
   
   console.log(rect1.area); // 6
   console.log(rect1.perimeter); // 10
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
   
   Circle.prototype.area = function() {
     return Math.PI * this.radius * this.radius;
   }
   
   let a = new Circle(3);
   let b = new Circle(4);
   
   console.log(a.area().toFixed(2)); // => 28.27
   console.log(b.area().toFixed(2)); // => 50.27
   console.log(a.hasOwnProperty('area')); // => false
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

   true

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

   We assign `Ninja.prototype` to a new object instead of mutating the original prototype object. The prototype object for `ninja` hasn't changed, it's still the original prototype defined during the constructor's invocation. 

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
   
   // Add a swing method to the Ninja prototype which
   // modifies `swung` and returns the calling object
   
   Ninja.prototype.swing = function() {
     this.swung = true;
     return this;
   }
   
   let ninjaA = new Ninja();
   let ninjaB = new Ninja();
   
   console.log(ninjaA.swing().swung);      // logs `true`
   console.log(ninjaB.swing().swung);      // logs `true`
   ```

   

7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

   ```js
   let ninjaA;
   
   {
     const Ninja = function() {
       this.swung = false;
     };
   
     ninjaA = new Ninja();
   }
   
   // create a `ninjaB` object here; don't change anything else
   
   ninjaA.constructor === ninjaB.constructor // => true
   ```

   Hint

   Solution

   ```js
   let ninjaA;
   
   {
     const Ninja = function() {
       this.swung = false;
     };
   
     ninjaA = new Ninja();
   }
   
   let ninjaB = new ninjaA.constructor(); // create a `ninjaB` object here; don't change anything else
   
   console.log(ninjaA.constructor === ninjaB.constructor) // => true
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

   Solution
   
   ```js
   function User(first, last) {
     if (!(this instanceof User)) {
       return new User(first, last);
     }
     
     this.first = first; 
     this.last = last;
     this.name =  `${this.first} ${this.last}`;
   }
   
   let name = 'Jane Doe';
   let user1 = new User('John', 'Doe');
   let user2 = User('John', 'Doe');
   
   console.log(name);         // => Jane Doe
   console.log(user1.name);   // => John Doe
   console.log(user2.name);   // => John Doe
   ```
   
   

------

#### Classes

[reference](https://launchschool.com/lessons/e3c64e3f/assignments/b29488f2)

1. What do we mean when we say that classes are first-class values?

   Solution

2. Consider the following class declaration:

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
   
   The `static` modifier when used with a method declaration, marks the method as static. That means the method is defined directly on the class rather than instance object that class creates.

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

   ```js
   function createPet(animal, name) {
     return {
     	animal: animal,
     	name: name,
       sleep() {
         console.log(`I am sleeping`);
       }, 
       
       wake() {
         console.log(`I am awake`);
       }
     };
   }
   ```

   

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

   ```js
   let PetPrototype = {
     sleep() {
       console.log(`I am sleeping`);
     }, 
     
     wake() {
       console.log(`I am awake`);
     }, 
     
     init(animal, name) {
       this.animal = animal;
       this.name = name;
       return this;
     }
   };
   ```

   

3. Consider the objects created by the programs in problems 1 and 2. How do objects for the same animal differ from each other?

   solution
   
   in OLOO, instance object inherits methods from the prototype object, and has its own properties. In factory function, instance object has an own copy of all the properties and methods. Thus, objects created by OLOO are more efficient in terms of memory use.

------

#### Practice Problems:

Consider the following code:

```js
function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};
```

What happens in each of the following cases? Try to answer without running the code.

**Case 1**

```js
let hello = new Hello();
hello.hi();
```

```
hello!
```

**Case 2**

```js
let hello = new Hello();
hello.bye();
```

```
error
```

This code raises a `TypeError`. Neither `Hello.prototype` nor its prototype, `Greeting.prototype`, have a `bye` method defined.

**Case 3**

```js
let hello = new Hello();
hello.greet();
```

```js
undefined
```

`greet` takes an argument. Since no argument is given, it logs `undefined`. 

**Case 4**

```js
let hello = new Hello();
hello.greet('Goodbye');
```

```
Goodbye
```

**Case 5**

```js
Hello.hi();
```

This code also raises a `TypeError`. The `hi` method is defined on `Hello.prototype`, not on the `Hello` constructor itself. Thus, only instances of `Hello` have access to `hi`.

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

   This is method overriding, which occurs when two objects in the prototype chain have the same method name. The method in the object lower in the prototype chain overrides the method of a parent object and sets the method property on itself, as an own property. 

2. Let's practice creating a class hierarchy.

   Create a class named `Greeting` that has a single method named `greet`. The method should take a string argument, and it should print that argument to the console.

   Now, create two more classes that inherit from `Greeting`: one named `Hello`, and the other `Goodbye`. The `Hello` class should have a `hi` method that takes no arguments and logs `"Hello"`. The `Goodbye` class should have a `bye` method that logs `"Goodbye"`. Use the `greet` method from the `Greeting` class when implementing `Hello` and `Goodbye`; don't call `console.log` from either `Hello` or `Goodbye`.

   Solution
   
   ```js
   class Greeting {
     constructor() {
      
     }
     
     greet(msg) {
       console.log(`${msg}`);
     }
   }
   
   class Hello extends Greeting {
     constructor() {
       super();
     }
     
     hi() {
       this.greet(`hello`);
     }
   }
   
   class Goodbye extends Greeting {
     constructor() {
       super();
     }
     
     bye() {
       this.greet(`bye`);
     }
   }
   ```
   
   

------

#### Practice Problems: Mix-ins

[reference](https://launchschool.com/lessons/d5964d17/assignments/e7850b07)

1. If we have a `Car` class and a `Truck` class, how can you use the `Speed` object as a mix-in to make them `goFast`? How can you check whether your `Car` or `Truck` can now go fast?

   ```js
   const Speed = {
     goFast() {
       console.log(`I'm a ${this.constructor.name} and going super fast!`);
     }
   };
   
   class Car {
     goSlow() {
       console.log(`I'm safe and driving slow.`);
     }
   }
   
   class Truck {
     goVerySlow() {
       console.log(`I'm a heavy truck and like going very slow.`);
     }
   }
   ```

   Solution

   ```js
   Object.assign(Car.prototype, Speed);
   Object.assign(Truck.prototype, Speed);
   ```

   

2. In the last question, we used a mix-in named `Speed` that contained a `goFast` method. We included the mix-in in the `Car` class and then called the `goFast` method from an instance of the `Car` class. You may have noticed that the string printed when we call `goFast` includes the name of the type of vehicle we are using. How is that done?

   Hint: Since the `constructor` property references a function object, `constructor.name` references the `name` property on that object. Use MDN to lookup the definition of `Function.name`.

   Solution

3. Ben and Alyssa are working on a vehicle management system. Thus far, they have created classes named `Auto` and `Motorcycle` to represent automobiles and motorcycles. After they noticed that the information and calculations performed was common to both vehicle types, they decided to break out the commonality into a separate class named `WheeledVehicle`. Their code, thus far, looks like this:

   ```js
   class WheeledVehicle {
     constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
       this.tires = tirePressure;
       this.fuelEfficiency = kmTravelledPerLiter;
       this.fuelCap = fuelCapInLiter;
     }
   
     tirePressure(tireIdx) {
       return this.tires[tireIdx];
     }
   
     inflateTire(tireIdx, pressure) {
       this.tires[tireIdx] = pressure;
     }
   
     range() {
       return this.fuelCap *  this.fuelEfficiency;
     }
   }
   
   class Auto extends WheeledVehicle {
     constructor() {
       // the array represents tire pressure for four tires
       super([30,30,32,32], 50, 25.0);
     }
   }
   
   class Motorcycle extends WheeledVehicle {
     constructor() {
       // array represents tire pressure for two tires
       super([20,20], 80, 8.0);
     }
   }
   ```

   Their boss now wants them to incorporate a new type of vehicle: a `Catamaran`.

   ```js
   class Catamaran {
     constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
       // catamaran specific logic
   
       this.propellerCount = propellerCount;
       this.hullCount = hullCount;
     }
   }
   ```

   This new class doesn't fit well with our existing class hierarchy: Catamarans don't have tires, and aren't wheeled vehicles. However, we still want to share the code for tracking fuel efficiency and range. Modify the class definitions and move code into a mix-in, as needed, to share code between the `Catamaran` and the wheeled vehicle classes.

   Solution