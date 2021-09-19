What is encapsulation?

- In JavaScript, encapsulation is the idea of bundling data and operations associated with that data in a single entity; that is, it's the grouping of related properties and methods in a single object.

In JavaScript, how does encapsulation differ from encapsulation in most other OO languages?

- In other languages, encapsulation concerns hiding details of an object (methods and properties) from code that uses the object. 
  - An object should only expose the methods and properties that other objects need - to use the encapsulated object. 
- However, JavaScript does not directly provide the means to limit exposure of methods and properties. There are ways to achieve a degree of access restriction, but they're not perfect.

------

**Encapsulation** 

- Definition: Bundling state (data) and behavior (operations / methods) to form an object. 

- At its core, encapsulation describes the idea of bundling or combining the data and the operations that work on that data into a single entity, e.g., an object.
  - For example banking applications. State (data) would be data about the bank accounts(account number, balance, account type) and users (name, address, phone). Behavior (operations) that manipulate the data. 
- Encapsulation has a broader purpose in most OOP languages. It also refers to restricting access to the state and certain behaviors. An object only exposes the data and behaviors that other parts of the application need to work. 
  - Objects expose a **public interface** for interacting with other objects and keep their implementation details hidden. Thus, other objects can't change the data of an object without going through the proper interface. Unfortunately, JS doesn't support access restrictions. 

