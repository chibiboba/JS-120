1. ```js
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   }
   
   class Truck extends Vehicle {
     constructor(year) {
       super(year);
     }
   }
   
   class Car extends Vehicle {
     constructor(year) {
       super(year);
     }
   }
   let truck = new Truck(2003);
   console.log(truck.year); // 2003
   
   let car = new Car(2015);
   console.log(car.year); // 2015
   ```

   - When designing an Object Oriented program, it's common to have multiple classes that perform similar actions. For example, both `Truck` and `Car` use the property `year`. To reduce complexity, classes with similar behaviors can inherit from a superclass. The superclass implements the common behaviors while the inheriting classes invoke them.
   - The `extends` keyword is used to denote inheritance between classes.

2. ```js
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   }
   
   class Truck extends Vehicle {
     constructor(year) {
       super(year);
       this.startEngine();
     }
     startEngine() {
       console.log('Ready to go!');
     }
   }
   
   let truck = new Truck(2003);
   console.log(truck.year); // 2003
   ```

   - When working with class inheritance, it's possible for methods to overlap. It's easy to override an inherited method. For example:

   ```js
   class Vehicle {
     startEngine() {
       console.log('Ready to go!')
     }
   }
   
   class Truck extends Vehicle {
     startEngine() { // this one executes, overriding property in parent class
       console.log("I'm a truck! Let's go!")
     }
   }
   
   let truck = new Truck();
   truck.startEngine(); // "I'm a truck! Let's go!"
   ```

   - We can see that the `startEngine()` method from `Truck` class executes instead of the method with the same name from `Vehicle` class. The reason for this is that JavaScript doesn't really have "methods" in the form that class-based languages defines them. Here, any function can be added to an object in the form of a property. Thus, once we have defined property `startEngine` in `Truck` class, we have **overridden** the property from `Vehicle` class.
   - What if we want to override a property, but still have access to functionality from a parent class? JavaScript provides a reserved word for this: `super`.
   - When you invoke `super` within constructor, like we did in this solution, it appears alone and must be used before the `this` keyword is used. However, `super` keyword can also be used to call functions on the object's parent and we will see that in the next problem.

3. #### 

   ```js
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   }
   
   class Truck extends Vehicle {
     constructor(year, bedType) {
       super(year);
       this.bedType = bedType;
     }
   }
   
   class Car extends Vehicle {}
   
   let truck1 = new Truck(2003, 'Short');
   console.log(truck1.year);
   console.log(truck1.bedType);
   ```

   #### Discussion

   Knowing that all vehicles don't have beds, it makes sense for only `Truck` to accept a `bedType` argument. However, we still want to keep the `year` property in `Vehicle`. To accomplish this, we need to use `super`. Unlike the previous exercise, though, we only want to pass one argument - `year` - instead of all of them.

   To pass specific arguments with `super`, we need to list the arguments within parentheses, like this:

   ```js
   aMethod(one, two, three) {
     super(one, two);
   }
   ```

   In the solution, we added `constructor` method to `Truck` instead of modifying `constructor` in `Vehicle` because we didn't want `Car` to accept the `bedType` parameter.

4. #### 

   ```js
   class Vehicle {
     startEngine() {
       return 'Ready to go!';
     }
   }
   
   class Truck extends Vehicle {
     startEngine(speed) {
       return super.startEngine() + ` Drive ${speed}, please!`
     }
   }
   
   let truck1 = new Truck();
   console.log(truck1.startEngine('fast'));
   
   let truck2 = new Truck();
   console.log(truck2.startEngine('slow'));
   ```

   - Here we are using the `super` keyword to call function on the object's parent. This way we are able to use some functionality from the parent class `Vehicle` in the `Truck` class.

5. ```js
   const walkMixin = {
     walk() {
       return "Let's go for a walk!";
     }
   }
   
   class Cat {
     constructor(name) {
       this.name = name;
     }
   
     greet() {
       return `Hello! My name is ${this.name}!`;
     }
   }
   
   Object.assign(Cat.prototype, walkMixin);
   
   let kitty = new Cat("Sophie");
   console.log(kitty.greet());
   console.log(kitty.walk());
   ```

   - Mixins are typically used to contain methods that may be useful for multiple classes, but not all classes. When you mix a module into a class, you're allowing the class to invoke the contained methods.

     In our solution, we create a mixin named `walkMixin` that contains a method named `walk`. We give `Cat` access to this method by including `walkMixin` in the class's prototype, like this:

     ```js
     const walkMixin = {
       walk() {
         return "Let's go for a walk!";
       }
     }
     
     class Cat {
       // code omitted
     }
     
     Object.assign(Cat.prototype, walkMixin);
     ```

   - This lets us invoke `walk` on any instance of `Cat`. In this case, if we invoke `kitty.walk()`, then `Let's go for a walk!` will be returned.

6. ```js
   const swimMixin = {
     swim() {
       return `${this.name} is swimming.`;
     }
   }
   
   class Fish {
     constructor(name) {
       this.name = name;
       Object.assign(this, swimMixin);
     }
   }
   
   class Dog {
     constructor(name) {
       this.name = name;
     }
   }
   
   class Maltese extends Dog {
     constructor(name) {
       super(name);
       Object.assign(this, swimMixin);
     }
   }
   
   let dog1 = new Maltese("Buddy");
   let fish1 = new Fish("Nemo");
   
   console.log(dog1.swim());
   console.log(fish1.swim());
   ```

   - Methods inside a mixin can be added to a class by simply using `Object.assign` method inside of the `constructor` method and passing `this` and a name of the mixin as its arguments.

   - However, note that using `Object.assign` like this adds a copy of the mixed-in methods directly to each new object. It is <u>**better**</u> to assign the mixins to the prototype object, like so:

   ```js
   class Fish {
     constructor(name) {
       this.name = name;
     }
   }
   
   class Maltese extends Dog {
     constructor(name) {
       super(name);
     }
   }
   
   Object.assign(Fish.prototype, swimMixin);
   Object.assign(Maltese.prototype, swimMixin);
   ```

7. ```js
   const towMixin = {
     tow() {
       return "'I can tow a trailer!'";
     }
   }
   
   class Truck {}
   
   Object.assign(Truck.prototype, towMixin);
   
   class Car {}
   
   let truck = new Truck();
   console.log(truck.tow());
   ```

   - Mixins are useful for organizing similar methods that may be relevant to multiple classes. For instance, the mixin `towMixin` contains the method `tow`. Typically, you use a `Truck` for towing, not a `Car`, which means `tow` is only relevant to `Truck` objects.

   - With mixins, we have the ability to include them in specific classes. In the solution, we used `Object.assign` to include methods from `towMixin` in the `Truck.prototype` object.

8. ```js
   const towMixin = {
     tow() {
       return "I can tow a trailer!";
     }
   };
   
   class Vehicle {
     constructor(year) {
       this.year = year;
     }
   
   }
   class Truck extends Vehicle {
     constructor(year) {
       super(year);
       Object.assign(this, towMixin);
     }
   }
   
   class Car extends Vehicle {
     constructor(year) { // constructor actualy isnt' needed, can omit this and line 31 still works : see explanation below
       super(year);
     }
   }
   
   let truck = new Truck(2002);
   console.log(truck.year);
   console.log(truck.tow());
   
   let car = new Car(2015);
   console.log(car.year);
   ```

   - Mixins are useful for containing similar methods, however, sometimes class inheritance is also needed. This exercise illustrates that it's possible to inherit from a class and, at the same time, include a mixin.
   - In the solution, we've rewritten the `Vehicle` class used in earlier exercises. Then, to allow `Truck` and `Car` to access `year`, we have both classes inherit from `Vehicle`.

- When you don't specify a constructor *at all*, the JavaScript engine inserts a default one for you. In a base class, the default looks like this:

  ```js
  constructor() {
  }
  ```

  In a subclass, it look like this:

  ```js
  constructor(...args) {
      super(...args);
  }
  ```
