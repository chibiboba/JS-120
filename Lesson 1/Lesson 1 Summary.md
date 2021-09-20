# Summary

In this lesson, we learned about some foundational concepts of Object Oriented programming and how we can apply those in JavaScript.

Here's a summary of what we learned in this lesson. Make sure you're fully comfortable with these concepts before moving forward.

- **Encapsulation** is the idea of bundling data and operations related to that data in a cohesive unit called an object. In OOP, encapsulation also refers to the idea of restricting access to state and some behavior, but JavaScript objects don't support that type of encapsulation.
- The simplest way to create a JavaScript object is to use the object literal syntax: a pair of opening and closing curly braces. Adding methods to an objects is as simple as adding a function as the value of a property.
- You can access the properties and methods of an object from within a method using the `this` keyword.
- Objects **collaborate** with other objects by using them as part of their state. We say that two objects have a collaborator relationship if one of them is part of the state of the other.
- One way to automate the creation of objects is to use the **factory function** pattern. A factory function returns an object with a particular set of methods and properties. The methods remain the same across the objects, while the property values can be customized by providing them as arguments.
- One object factory can reuse another object factory by mixing the object returned by another factory function into itself by using `Object.assign`.