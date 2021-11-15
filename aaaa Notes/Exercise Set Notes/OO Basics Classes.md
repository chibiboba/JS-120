1. ```js
   console.log("Hello".constructor.name); // String
   console.log([1, 2, 3].constructor.name); // Array
   console.log({ name: 'Srdjan' }.constructor.name); // Object
   ```

   - The `constructor` property returns a reference to the `Object` constructor function that created the instance object. This constructor function has access to `name` property which returns the function's name as specified when it was created.

2. ```js
   class Cat {
     
   } // empty class
   ```

   - The simplest way to create classes in JavaScript is with the class declaration which begins with the `class` keyword followed by the name of the class and open and closed curly braces.

3. ```js
   class Cat {
     
   } // empty class
   
   let kitty = new Cat();
   ```

   - To instantiate a new `Cat` object, we use the keyword `new` in front of the function call. This keyword turns the function call into a constructor call.
   - To make use of this new `Cat` object, we need to assign it to a variable. In the solution, we assign the object to a variable named `kitty`. This variable can be used to interact with the object in various ways. We'll expand on this topic in the next few exercises

4. ```js
   class Cat {
   	constructor() {
       console.log(`I'm a cat!`);
     }
   }
   
   let kitty = new Cat();
   ```

   - When defining a class, you usually need to define the `constructor` method.
   - Adding this method lets us execute certain statements when a new `Cat` object is initialized. In this case, we want to log `I'm a cat!` when the new `Cat` object is initialized. We accomplish this by using `console.log()`

5. ```js
   class Cat {
   	constructor(name) {
       this.name = name;
       console.log(`Hello! My name is ${this.name}!`);
     }
   }
   
   let kitty = new Cat('Sophie');
   ```

- The `Cat` constructor expects one parameter: `name`. When it is called with the `new` keyword, it assigns the received parameter to the `name` property of the current instance. The property `name` can be accessed anywhere within the class using `this` keyword.
- To appease the exercise requirements, we only need to reference property `name` immediately following its initialization. We use `console.log()` to log `Hello! My name is Sophie` to the console. In this object, `'Sophie'` is dynamic, which means we used property `name` to print the value. `'Sophie'` could just as easily be `'Oliver'` if that string was passed instead of `'Sophie'`, like this:

```js
class Cat {
  constructor(name) {
    this.name = name; // => Oliver
  }
}

let kitty = new Cat('Oliver');
```

6. ```js
   class Cat {
     constructor(name) {
       this.name = name;
     }
     
     greet: function() {
     	console.log(`Hello! My name is ${this.name}!`);
     }
   }
   
   let kitty = new Cat('Sophie');
   kitty.greet();
   ```

   - Instance methods are only available when there's an instance of the class. For example, `kitty` is an instance of the `Cat` class. This means, if we add the `greet` method, we're able to invoke it, like this:

     ```js
     let kitty = new Cat('Sophie');
     kitty.greet(); // => Hello! My name is Sophie!
     ```

   - As mentioned in the previous exercise, the property `name` can be accessed anywhere within the class using `this` keyword. This lets us print `Hello! My name is Sophie!` from `greet` simply by moving the statement from `constructor` to `greet`.

7. ```js
   class Person {
     constructor(name = "John Doe") {
       this.name = name;
     }
   }
   
   let person1 = new Person();
   let person2 = new Person("Pepe");
   
   console.log(person1.name); // John Doe
   console.log(person2.name); // Pepe
   ```

   - In the solution we have used `ES6` feature, default parameters, to set the default value of parameter to a string "John Doe". Then, in the constructor function, we have just assigned value of parameter `name` to a property `name`.

8. ```js
   class Cat {
     constructor(name) {
       this.name = name;
     }
     
     rename(newName) {
       this.name = newName;
     }
   }
   
   let kitty = new Cat('Sophie');
   console.log(kitty.name); // Sophie
   kitty.rename('Chloe');
   console.log(kitty.name); // Chloe
   ```

   - In the solution, `rename` accepts one argument, which represents a new name. To rename `kitty`, we just need to reassign property `name` to the value provided by the argument.

9. ```js
   class Cat {
     // don't need a constructor
     static genericGreeting() {
       console.log(`Hello! I'm a cat!`);
     }
   
   }
   
   Cat.genericGreeting();
   ```

   - When looking at the initial example, the first thing you should notice is the invocation of `genericGreeting`. It's being invoked on the `Cat` class, not an instance of `Cat`. This indicates that `genericGreeting` is a static method.

     We define static methods on classes by using the `static` keyword.

     To invoke static methods, they must be called on the class itself, not an instance of the class. If we invoke a static method on an instance of the class, we'll get a `TypeError`:

   - ```js
     class Cat {
       static genericGreeting() {
         console.log("Hello! I'm a cat!");
       }
     }  
     
     let kitty = new Cat();
     kitty.genericGreeting(); // => kitty.genericGreeting is not a function
     ```

10. ```js
    class Cat {
      constructor(name) {
        this.name = name;
      }
      
      static genericGreeting() {
        console.log(`Cats are mean.`);
      }
      
      personalGreeting() {
        console.log(`But ${this.name} is a cute cat.`);
      }
    }
    
    let kitty = new Cat("Sophie");
    Cat.genericGreeting();
    kitty.personalGreeting();
    ```

    - The most notable difference between static and instance method is that static methods are called on a class(constructor function), not any instance of the class. Think of static methods as generic actions a class may perform, like this:

      ```js
      class Cat {
        static speak() {
          console.log("Meow!");
        }
      }
      Cat.speak() // "Meow!"
      ```

      