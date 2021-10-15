#### Lesson 1 Notes

##### What is OOP

**OOP** (object oriented programming) is thinking about a problem in terms of objects, using objects to organize program. 

- A programming paradigm in which we think about a problem in terms of objects
- Problem that procedural programming has: as a program grows, so does its complexity, and you end up functions throughout the code split up from the data they operate on. 
- OOP solves this problem. Objects provide a means to group related data and functions into one unit. 

##### Advantage and Disadvantage of OOP

- Advantages
  - lets programmers think about a problem at a higher-level of abstraction, which helps them break down and solve the problem.
  - OOP helps programmers write programs that reduce dependencies in a program, which makes maintenance easier. 
  - If done right, OOP makes code flexible, easy to understand, and easy to change. 
  - Large complex procedural programs end up with functions all throughout the code split up from the data they operate on. 
- Disadvantages
  - OOP programs are often much larger than the equivalent procedural program. 
  - OOP may lead to less efficient code; OO programs may require more memory, disk space, and computing power.

------

##### Encapsulation

- bundle state(data) and behavior(operations realted to data) into a single entity (an object).  

- In OOP, encapsulation also refers to the idea of restricting access to state and some behavior, but JavaScript objects don't support that type of encapsulation. 
- **interface of an object**: the state and behaviors exposed by the object for other objects to use. 
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. 
  - Thus, other objects can't change the data of an object without going through the proper interface. 
  - Unfortunately, JS doesn't support access restrictions. 

------

##### Compact Method Syntax

- Using functions as object values (methods) is so common that there's s hrothand syntax called compact syntax for it. 

```js
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    raceCar.engineOn = true;
  },

  drive() {
    raceCar.fuelLevel -= 0.1;
  },

  stopEngine() {
    raceCar.engineOn = false;
  },

  refuel(percent) {
    if ((raceCar.fuelLevel + (percent / 100)) <= 1) {
      raceCar.fuelLevel += (percent / 100);
    } else {
      raceCar.fuelLevel = 1;
    }
  },
};
```

- ------

  **Methods**  are object properties that have function values. 


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

##### this

- when you use **this** <u>inside a method</u>, it refers to the <u>object that contains the method.</u> 

  - 'this' can only be used inside a method, to refer to the object that contains the method.
  - You can access properties and methods of an object from within a method using `this` keyword. 


```js
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true; // this refers to raceCar
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};
```



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

##### Collaborator Objects

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

------

##### Factory Functions

```js
function createPet(animal, name) {
  return {
    animal: animal,
    name: name,

    sleep: function() {
      console.log("I am sleeping");
    },

    wake: function() {
      console.log("I am awake");
    },
  };
}
```


- One way to automate the creation of objects is to use the **factory function** (aka object factory) pattern. 


  - A factory function returns an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them arguments. 
  - Object factories, or factory functions (also called the *Factory Object Creation Pattern*), provide a simple way to create related objects based on a predefined template
  - Returns objects that represent data of a specific type.
  - It reuses code 

- One **object factory** can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`

------

##### When solving a problem - Steps to planning an object-oriented application

1. Write a textual description of the problem or exercise. 
2. Extract the **significant** nouns and verbs from the description. 
3. Organize and associate the verbs with the nouns. 

- nouns : are the types of objects
- Verbs: are the methods, which alter state of the objects. 

------

##### Tips

- You don't want a factory function to create an object whose behavior relies on the object's property. You don't want to use if / else conditionals to create objects of different kinds. 
  - For now, we are using separate factory functions to deal with this issue.
  - **Class Inheritance**: child types inherit common properties and methods from parent type. 
    - handles this problem, but we talk about this later. 
  
- Good practice to initialize object properties explicitly. It makes it easy to see what the initial state of the object looks like at a glance. It also shows the state of all properties in one place. 
- Sub-types (objects) often share multiple properties and methods. JS provides some constructs that help extract such duplications to once place. We will learn about this later when we talk about constructors, prototypes, and classes. 
  -  For now, lets move common properties to a separate factory function. This function returns an object with the property. 
  -  Then use `Object.assign` to merge the two objects. 

------

##### Principles

- Extract duplicated code to a single place. It makes changes to the code less error-prone and tedious. In the long run, it often leads to less work.

------

##### Other vocab

**interface of an object**: the state and behaviors exposed by the object for other objects to use. 

- Encapsulation has a broader purpose in most OOP languages. It also refers to restricting access to the state and certain behaviors. An object only exposes the data and behaviors that other parts of the application need to work. 
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. Thus, other objects can't change the data of an object without going through the proper interface. Unfortunately, JS doesn't support access restrictions. 

------

##### Summary

In this lesson, we learned about some foundational concepts of Object Oriented programming and how we can apply those in JavaScript.

Here's a summary of what we learned in this lesson. Make sure you're fully comfortable with these concepts before moving forward.

- **Encapsulation** is the idea of bundling data and operations related to that data in a cohesive unit called an object. In OOP, encapsulation also refers to the idea of restricting access to state and some behavior, but JavaScript objects don't support that type of encapsulation.
- The simplest way to create a JavaScript object is to use the object literal syntax: a pair of opening and closing curly braces. Adding methods to an objects is as simple as adding a function as the value of a property.
- You can access the properties and methods of an object from within a method using the `this` keyword.
- Objects **collaborate** with other objects by using them as part of their state. We say that two objects have a collaborator relationship if one of them is part of the state of the other.
- One way to automate the creation of objects is to use the **factory function** pattern. A factory function returns an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments.
- One object factory can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.
