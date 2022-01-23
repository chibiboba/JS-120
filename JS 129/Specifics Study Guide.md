## Specific Topics of Interest

Objects, object factories, constructors and prototypes, OLOO, and ES6 classes 1, 3,4 

- **object-literal syntax**
- 

- **Object factories** (factory functions): are functions that create and return objects of a particular type. 

  - Object factories, or factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template. 
  - **Type** means an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them arguments. 
  - Each invocation of the factory function specifies the differences between the objects with arguments. 

- Advantages of object factory

  - Create multiple objects of same "type" with a predefined "template". 
  - Lets you automate the creation of objects. 

  - Reuses code. 

- Disadvantage of object factory

  - Each Object created by the factory function has a copy of all the methods, which can be redundant and memory intensive. 
  - There is no way to tell which factory function created an object, so there's no way to be sure that you are working with the right kind of object. 
    - No way to inspect the object and learn whether we created it with a factory function, or which factory function. 
    - It's impossible to identify the specific "type" of the object; at best, you can only determine that an object has some specific characteristics. 

Methods and properties; instance and static methods and properties 1, 3

Prototypal and pseudo-classical inheritance 4

- Prototypal Inheritance (prototypal delegation)
- Pseudo-classical inheritance (constructor inheritance)
  - Using functions to create objects. 

Encapsulation - 1, 3

- **Encapsulation**: grouping related properties and methods in a single object. 
  - bundle state(data) and behavior (operations related to that data) into a single entity (object). 

Polymorphism- 4

Collaborator objects - 1

- **Collaborator Objects**: objects that help provide state in another object. 

  - We say that two objects have a collaborator relationship if one of them is part of the state of the other.
  - Collaborator objects represent the connections between various actors in your program.
  - Collaborator objects let you chop up and modularize the problem domain into cohesive pieces. 

  ```js
  // cat is collaborator object of pets. 
  let cat = {
    noise: 'meow',
  };
  
  let pets = {
    dog: {
      noise: 'woof',
    },
  
    cat: cat.noise,
  
    printInfo() {
      console.log(`My dog makes this noise ${this.dog.noise}`);
      console.log(`My cat makes this noise: ${this.cat}`);
    },
  };
  ```

  

Single vs multiple inheritance

Mix-ins; mix-ins vs. inheritance 4

Higher-order functions 1

The global object 2

Method and property lookup sequence 2

Implicit and explicit execution context 2

Methods and functions; method invocation vs. function invocation 1,2 

Function execution context and `this` 2

Dealing with context loss 2

`call`, `apply`, and `bind` 2

`Object.assign` and `Object.create`

Built-in constructors like `Array`, `Object`, `String` and `Number` 3

Reading OO code