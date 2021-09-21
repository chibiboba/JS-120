#### Lesson 1 Notes

**OOP** (object oriented programming) is thinking about a problem in terms of objects, using objects to organize program. 

- A programming paradigm in which we think about a problem in terms of objects.

**Encapsulation**: bundle state(data) and behavior(operations realted to data) into a single entity (an object).  

- In OOP, encapsulation also refers to the idea of restricting access to state and some behavior, but JavaScript objects don't support that type of encapsulation. 
- **interface of an object**: the state and behaviors exposed by the object for other objects to use. 
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. 
  - Thus, other objects can't change the data of an object without going through the proper interface. 
  - Unfortunately, JS doesn't support access restrictions. 

------

- **Methods**  are object properties that have function values. 


```js
const cat = {
  name() { // property key is name, and value is the function. 
    return "Butterscotch";
  },

  age() {
    return 13;
  },
};
```

- **behavior** (method) change the **state** of an object. 
  - **State** means data in an object. 

------

- when you use **this** <u>inside a method</u>, it refers to the <u>object that contains the method.</u> 

  - 'this' can only be used inside a method, to refer to the object that contains the method.
  - You can access properties and methods of an object from within a method using `this` keyword. 

- ```js
  // both of these cause syntax error when trying to define the properties in the object. 
  
  let cat = {
    this.name: "Butterscotch", // 'this' can only be used inside a method, to refer to the object that contains the method.
    this.age: 13,
  };
  
  let cat = {
    name = "Butterscotch", // incorrect syntax to define property in an object.
    age = 13
  };
  ```

  ```js
  // however this works
  function cat() {
    this.name = 'Butterscotch';
    this.age = 13;
  }
  ```

------

- Objects that help provide state within another object are called **collaborator objects**. Objects **collaborate** with other objects by using them as part of their state. 


- Collaborator objects represent the connections between various actors in your program.

- We say that two objects have a collaborator relationship if one of them is part of the state of the other. 

- Collaborator objects let you chop up and modularize the problem domain into cohesive pieces. 

  ```js
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
  
  pets.printInfo();
  ```
  
  ```js
  let cat = {
    name: 'Fluffy',
  
    makeNoise() {
      console.log('Meow! Meow!');
    },
  
    eat() {
      // implementation
    },
  };
  
  let pete = {
    name: 'Pete',
    pet: cat,
  
    printName() {
      console.log(`My name is ${this.name}!`);
      console.log(`My pet's name is ${this.pet.name}`); // can access collaborator object (cat) properties
    },
  };
  ```
  
- One way to automate the creation of objects is to use the **factory function** (aka object factory) pattern. A factory function returns an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them arguments. 

  - Returns objects that represent data of a specific type.
  - It reuses code 
- One **object factory** can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`

------

When solving a problem - Steps to planning an object-oriented application

1. Write a textual description of the problem or exercise. 
2. Extract the **significant** nouns and verbs from the description. 
3. Organize and associate the verbs with the nouns. 

- nouns : are the types of objects
- Verbs: are the methods, which alter state of the objects. 

------

Tips

- You don't want a factory function to create an object whose behavior relies on the object's property. You don't want to use if / else conditionals to create objects of different kinds. 
  - For now, we are using separate factory functions to deal with this issue.
  - **Class Inheritance**: child types inherit common properties and methods from parent type. 
    - handles this problem, but we talk about this later. 
  
- Good practice to initialize object properties explicitly. It makes it easy to see what the initial state of the object looks like at a glance. It also shows the state of all properties in one place. 
- Sub-types (objects) often share multiple properties and methods. JS provides some constructs that help extract such duplications to once place. We will learn about this later when we talk about constructors, prototypes, and classes. 
  -  For now, lets move common properties to a separate factory function. This function returns an object with the property. 
  -  Then use `Object.assign` to merge the two objects. 

------

Principals

- Extract duplicated code to a single place. It makes changes to the code less error-prone and tedious. In the long run, it often leads to less work.

------

Other vocab

**interface of an object**: the state and behaviors exposed by the object for other objects to use. 

- Encapsulation has a broader purpose in most OOP languages. It also refers to restricting access to the state and certain behaviors. An object only exposes the data and behaviors that other parts of the application need to work. 
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. Thus, other objects can't change the data of an object without going through the proper interface. Unfortunately, JS doesn't support access restrictions. 



