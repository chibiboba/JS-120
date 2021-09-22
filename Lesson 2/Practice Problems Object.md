# Practice Problems: Object Prototypes

1. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   console.log(baz.foo + qux.foo);
   ```

   ```terminal
   2
   ```

   Solution

   Naturally, `qux.foo` returns `1` since `qux` has a `foo` property with that value. However, `baz` doesn't have its "own" copy of the `foo` property. Thus, <u>JavaScript searches the prototype chain</u> for a `foo` property and finds the property in `qux`. Thus, `baz.foo` is also `1`, and the sum of the two values is `2`.

2. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
   let qux = { foo: 1 };
   let baz = Object.create(qux);
   baz.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```

   ```terminal
   3
   ```

   Solution

   This code is very similar to that in problem 1. However, this time, we assign `baz.foo` to a value of `2`. Property assignment doesn't use the prototype chain; instead, it creates a new property in the `baz` object named `foo`.

   When we add `baz.foo` and `qux.foo` together, `baz.foo` returns the value of its "own" `foo` property, while `qux.foo` returns the value of its "own" `foo` property. Thus, the result is `3`.

3. What will the following code log to the console? Explain why it logs that value. Try to answer without running the code.

   ```js
let qux = { foo: 1 };
   let baz = Object.create(qux);
   qux.foo = 2;
   
   console.log(baz.foo + qux.foo);
   ```
   
   ```terminal
4
   ```
   
   Solution

   This code is also very similar to problem 1. This time, though, we assign the value `2` to `qux.foo`. Since `baz` doesn't have its "own" copy of the `foo` property, JavaScript uses the prototype chain to look up `baz.foo`, and it finds the `foo` property in `qux`. The result is equivalent to `2 + 2`, or `4`.

   An important consideration when dealing with prototypes is that objects hold a reference to their prototype objects. If the object's prototype changes in some way, the changes are observable in the inheriting object as well.

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

   ```js 
   function assignProperty(obj, property, value) {
     while (obj !== null) { // stop loop when obj reaches null. 
       if (obj.hasOwnProperty(property)) {
         obj[property] = value;
         break;
       } else {
         obj = Object.getPrototypeOf(obj); // if property is not "own property", then search next prototype. 
       }
     }
   }
   ```

   Solution

   ```js
   // recursive solution
   function assignProperty(obj, property, value) {
     if (obj === null) { // property not found
       return;
     } else if (obj.hasOwnProperty(property)) {
       obj[property] = value;
     } else {
       assignProperty(Object.getPrototypeOf(obj), property, value); // calls on same function, passing the prototype of obj as argument 
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

   No, because `for...in` iterates over every property, whereas `Object.keys` only iterates over an object's own property. 

   Solution

   They don't always produce the same results since the second loop only iterates over `foo`'s "own" properties, but the first loop iterates over all of the object's enumerable properties, including those inside its prototype chain. For instance, assume that the following code precedes the loops:

   ```js
   let bar = { a: 1, b: 2 };
   let foo = Object.create(bar);
   foo.a = 3;
   foo.c = 4;
   ```

   With this code, the first loop outputs:

   ```plaintext
   a: 3        // from foo
   c: 4        // from foo
   b: 2        // from bar
   ```

   The second loop outputs:

   ```plaintext
   a: 3        // from foo
   c: 4        // from foo
   ```

   The two loops produce the same results only when the prototype chain doesn't contain enumerable properties. 

   (So when prototypechain doesn't contain enumerable properties, when we loop through it using `for...in` and `Object.keys`, it would produce the same results.)

   

6. How do you create an object that doesn't have a prototype? How can you determine whether an object has a prototype?

   ```js
   let obj = Object.create(null);
   ```
   
   ```js
   if (Object.getPrototypeOf(obj)) {
     // obj has a prototype
   } else {
     // obj does not have a prototype
   }
   ```
   
   
   
   

