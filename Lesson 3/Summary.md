# Summary

- Factory functions instantiate and return a new object in the function body. They let us create new objects based on a predefined template. However, they have two significant downsides:

  - There is no way to tell whether a factory function created a given object.
  - All objects created by a factory function have separate copies of the methods, which can be redundant and wasteful.

- Constructor functions are meant to be invoked with the `new` operator. They instantiate a new object behind the scenes and let the developer manipulate it through the `this` keyword. A typical constructor uses the following pattern:

  - The constructor is invoked with `new`.
  - The JS runtime creates a new object that inherits from the constructor's prototype object.
  - The new object is assigned to `this` within the function body.
  - The code in the function body is executed.
  - The function returns the object referenced by `this` unless the function returns an explicit object.

- Every function has a `prototype` property that points to an object that contains a `constructor` property. The `constructor` property points back to the function itself. Thus, if `Kumquat` is a construction function, then `Kumquat.prototype.constructor === Kumquat`.

  If the function is used as a constructor, the returned object's `[[Prototype]]` will reference the constructor's `prototype` property. That lets us set properties on the constructor's prototype object so that all objects created by the constructor will share them. We call this the *pseudo-classical* pattern of object creation.

- The pseudo-classical object creation pattern generates objects using a constructor function that defines state and a prototype object that defines shared behaviors.

- The pseudo-classical inheritance pattern has types (e.g., classes) inherit from other types. This way, all objects of a given type can share behaviors from the same source.

- The class syntax, a relatively new addition to JavaScript, is syntactic sugar (cleaner syntax) for creating objects that use constructors and prototypes. JavaScript classes make it look more like a classical OO language to make the transition smoother for developers who have experience working with other OO languages.