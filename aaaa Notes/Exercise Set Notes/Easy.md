1. ```js
   class Rectangle {
     constructor(width, length) {
       this.width = width;
       this.length = length;
     }
   
     getWidth() {
       return this.width;
     }
   
     getLength() {
       return this.length;
     }
   
     getArea() {
       return this.width * this.length;
     }
   }
   
   let rect = new Rectangle(4, 5);
   
   console.log(rect.getWidth()); // 4
   console.log(rect.getLength()); // 5
   console.log(rect.getArea()); // 20
   ```

   

2. ```js
   class Square extends Rectangle {
     constructor(lengthOfSide) {
       super(lengthOfSide, lengthOfSide)
     }
   }
   ```

   The key thing to note for this problem is that we must call `super` in `constructor` method of `Square` class, and that `Square` inherits the `area` method from `Rectangle`.

3. 

   ```js
   class Cat {
     constructor(name) {
       this.name = name;
     }
     speaks() {
       return `${this.name} says meowwww.`;
     }
   }
   
   let fakeCat = Object.create(Cat.prototype);
   console.log(fakeCat instanceof Cat); // logs true;
   console.log(fakeCat.name);           // logs undefined
   console.log(fakeCat.speaks());       // logs undefined says meowwww.
   ```

   - In the solution, we are using `Object.create()` to create a new object that can't be distinguished from a `Cat` instance. 
   - `Object.create()` uses an existing object as the prototype of the newly created object.

4. ```js
   class Pet {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }
   
   class Cat extends Pet {
     constructor(name, age, color) {
       super(name, age);
       this.color = color;
     }
   
     info() {
       return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`;
     }
   }
   
   ```

   Since `constructor` method in `Cat` class requires arguments that differ from `constructor` method in `Pet` class, we must define a `constructor` method for `Cat`, and that method must be sure to call `super`.

5. ```js
   class Animal {
     constructor(name, age, legs, species, status) {
       this.name = name;
       this.age = age;
       this.legs = legs;
       this.species = species;
       this.status = status;
     }
     introduce() {
       return `Hello, my name is ${this.name}, I am ${this.age} years old and ${this.status}.`;
     }
   }
   
   class Cat extends Animal {
     constructor(name, age, status) {
       super(name, age, 4, "cat", status);
     }
     introduce() {
       return `${super.introduce()} Meow meow!`;
     }
   }
   
   class Dog extends Animal {
     constructor(name, age, status, master) {
       super(name, age, 4, "dog", status);
       this.master = master;
     }
     greetMaster() {
       return `Hello ${this.master}! Woof, woof!`;
     }
   }
   ```

   In the `Cat` class constructor method we are using `super` keyword to invoke constructor method of the parent class `Animal`. We need to pass 5 arguments to it (name, age, legs, species and status), as this is how many arguments `Animal` constructor method takes.

   As `introduce()` method in `Cat` class is just a slight modification of the method with the same name, from the parent class, we can again use `super` keyword to invoke that method on the object's parent, like this `super.introduce()`. Finally, we just need to concatenate to the return value of this method string " Meow, meow!", which we did using template strings.

   In the `Dog` class constructor method, we are, like in the `Cat` class, using `super` keyword to invoke constructor method from `Animal` class. Also, within this method, we are instantiating a new property called `master`. Then, within `greetMaster()` method, we are accessing the value of this property using `this` keyword.

6. ```js
   class Vehicle {
     constructor(make, model) {
       this.make = make;
       this.model = model;
     }
   
     info() {
       return `${this.make} ${this.model}`;
     }
   }
   
   class Car extends Vehicle {
     getWheels() {
       return 4;
     }
   }
   
   class Motorcycle extends Vehicle {
     getWheels() {
       return 2;
     }
   }
   
   class Truck extends Vehicle {
     constructor(make, model, payload) {
       super(make, model);
       this.payload = payload;
     }
     getWheels() {
       return 6;
     }
   }
   ```

   - My notes
     - Since `Mororcyle` and `Car`'s constructor methods don't require different arguments from the arguments of the constructor method in the super class `Vehicle`,  we don't need to define a`constructor` method for `Motorcycle` or `Car`. 
   - Our first task is to decide on an appropriate class name for our superclass. It should be a more general type than the individual class names. A good name here is Vehicle, since cars, motorcycles, and trucks are all types of vehicles.
   - All of our constructor methods take `make` and `model` parameters, and store them in `make` and `model` properties. We can refactor all of this commonality into `Vehicle` by moving `constructor` from one of the classes into `Vehicle`, and deleting it from both `Car` and `Motorcycle`. However, our `Truck` class takes a 3rd parameter `payload`, so we can't just delete `constructor` method in `Truck` class.
   - Our `info` method is identical in all 3 of the original classes, so we just move that into `Vehicle` and remove it from the original classes.
   - The `getWheels` method is different in each of the original classes, so we don't move this into `Vehicle`.
   
7. sdf

8. ```js
   function Person() {
   }
   Person.prototype.greeting = function(text) {
     console.log(text);
   }
   
   function Shouter() {
     Person.call(this); // same as super()
   }
   Shouter.prototype = Object.create(Person.prototype)
   Shouter.prototype.greeting = function(text) {
     Person.prototype.greeting.call(this, text.toUpperCase()); 
     // method invocation on object's parent
   }
   
   let person = new Person();
   let shouter = new Shouter();
   
   person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
   shouter.greeting("Hello my friend."); // HELLO MY FRIEND.
   ```

9. #### Discussion

   You can use the `walkMixin` with any class that defines properties `gait` and `name`. You can also define a parent class and make the other classes inherit from that class.

   Mixins are more appropriate in a has-a relationship. While it is sometimes tricky to choose one or the other, a great guideline is to decide if you want some additional functionality, or if you want to extend the abilities of the class. In this case, it is pretty clear that we need the functionality of walking; we don't need to extend the abilities of class `Person`(extending the abilities of a class coincides with an is-a relationship, not has-a).

