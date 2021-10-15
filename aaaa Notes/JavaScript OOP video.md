t's time to return to the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you began watching earlier. The portion of the video that pertains to this assignment starts at about the 00:39:18 mark, and continues through examples 5 and 7 until the 01:25:15 point. Note that we haven't covered inheritance yet, but the video talks about it. If those sections confuse you, just ignore them for now

Once you've finished with the Gist, you can finish watching the [JavaScript OOP video](https://www.youtube.com/watch?v=-N9tBvlO9Bo&feature=youtu.be) that you began watching earlier. The portion of the video that pertains to this assignment starts at about the 01:25:10 mark and continues through the end of the video (about 14 minutes remaining).

### Example 1

```js
// Example 1

const obj = {
  monkey: 'yep',
}; 

console.log(obj.hasOwnproperty('monkey')); // true

console.log(obj.__proto__ === Object.prototype) // true. deprecated.
console.log(Object.getPrototypeOf(obj)) === Object.prototype // true

console.log(obj.constructor === Object) // true;
```

- Why are we able to call `hasOwnProperty` on `obj`? 
- **ANSWER**:  we are able to use instance methods from that default Object such as `hasOwnproperty`, because here is the chain of events. 
  - when we use a period, the prototype delegation occurs. JavaScript looks inside `obj` first to find `hasOwnproperty`, doesn't find it, then looks up the prototype chain, which is referenced by dunder proto. 
  - Dunder proto references the prototype object of the `obj` object, which in this case is `Object.prototype`.`Object.property` is the `prototype` property of `Object` constructor, which also references an object that contains `hasOwnPropery`. 
  - The `prototype` property refers to an object that stores the info including methods like `hasOwnProperty`, for objects to "look up to". 

##### Example 1 Notes

- It's recommended to use `Object.getPrototypeOf(obj)` rather than dunder proto

<u>Properties that all objects have</u>

- Every object has a dunder proto property and a constructor property. 
  
- **constructor property**
  
  - the constructor property is not actually an own property of the object.
  - It exists in the default object: object that the parent function's prototype property (`Object.prototype`) points to. 
  - Inside the object referenced by `Object.prototype`, there is a `constructor` property that points back to the `[Function: Object]`
  
  ```js
  let a = {};
  a.constructor // [Function: Object]
  a.__proto__ === Object.prototype // true
  a.constructor === Object.prototype.constructor // true
  ```
  
- **dunder proto property** `__proto___`/ hidden `[[Prototype]]` 
  
  - This property is also not an own property of an object. It exists inside `Object.prototype`, the default object. 
  - This property references the object that instances inherit from. 
  - Dunder proto will usually equal `consturctor.prototype` (aka the **prototype property**) given that the constructor is the constructor function that created that object. 
  - Dunder proto.  is what JavaScript uses to keep looking up the prototypal chain for properties it doesn't find on the current object. 
  - Dunder proto is deprecated, non-hidden version of the `[[Prototype]]` property. 
  - `Object.prototype` also provides the default prototype, the one highest in the prototypal chain. 

<u>Function Object</u>

- Every function has a **prototype property**

- All object forms of functions have their own hidden property called "prototype property"
  - **prototype property**: refers to an object that stores all the info including prototype methods for other objects down the chain to inherit from. 
- Object is a function. 
  - All functions are objects, so think of them as a function but having an object form as well. 

------

### Example 2

- We all know that we can invoke a function with a specific context using `call`, but why? 
  - **ANSWER**: JavaScript looks for a `call` property within `func` but doesn't find it, so it goes to its dunder proto property, which then looks up the prototype chain and finds `call` inside the `Function` object. Particularly, it finds `call` inside the object referenced by `Function.prototype`. 
  - `Function.prototype` is the `prototype` property of Function, which references an object. `Call` is then  then invoked with `func` as its context. 

```js
// Example 2

const func = function() {};
func.call();

console.log(func.__proto__ === Function.prototype); // true 
console.log(func.constructor === Function) // true
```

##### Example 2 Notes

- `call` is inside 

- the `prototype` property references an object, which stores all the functionality / infromation for functions to inherit from.  
- All objects have a dunder proto & constructor property.
- Function objects are also given a prototype property. 
  - In this case, the prototype property in `func` is an empty object, because no methods are defined inside it yet. `prototype` property references an object that we want instance objects to inherit from, if we made `func` a constructor.  To add methods to it, we use the `func.prototype` syntax. 

------

### Example 3

```js
const arr = ['a', 'b'];
console.log(arr.join('')) // 'ab'

console.log(arr.__proto === Array.prototype) // true
console.log(arr.constructor === Array) // true

console.log(typeof arr); 'object'
console.log(arr[0]); // 'a'
console.log(arr[1]); // 'b'
console.log(arr.prototype); // undefined, arr object is not a function so it is not given a prototype property 
```



------

### Example 4

- Explain why we can invoke `hasOwnProperty` on `arr`? 
  - functions use `this` keyword. 

```js
// Example 4
const arr = ['a', 'b']; 
console.log(arr.hasOwnProperty(0)) // true;
console.log(arr.constructor === Array); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null 
console.log(arr.HasOwnProperty('fantastical')); // false
console.log(arr.fantastical); // undefined

console.log(Array.from(arguments)); // creating an array from arguments
console.log(Array.hasOwnProperty('from')); // true

// how JS works, it uses its own prototypal nature to retrieve stuff
console.log(typeof Array); // 'function'
console.log(typeof Function); // 'function'
console.log(typeof Object); // 'function'
console.log(Array.__proto__ === Function.prototype); // true
console.log(Array.constructor === Function); // true

console.log(Function.__proto__ === Function.prototype); // true
console.log(Function.constructor === Function); // true

console.log(Function.prototoype.__proto__ === Object.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype) // true\

console.log(typeof Array.prototype); // 'object'
console.log(typeof Object.prototype); // 'object'
console.log(typeof Function.prototype); // 'function'

```

- `Object.prototype`'s dunder proto is `null` because its the last link in the chain. `Object.protoype` references the default object. 
- Note that prototype property of `Function` references a function object, not a regular object. 

```js
// the constructor of the prototype property refers back to the constructor itself
console.log(Array.prototype.constructor === Array); // true
console.log(Object.prototype.constructor === Object); // true 
console.log(Fucntion.prototype.constructor === Function); // true
```

------

### Example 5

```js
const userFUnctions = { // plain object, not a function
  add : function () {this.points += 1}, 
  login: function() {console.log("You're logged in")}. 
}

function userCreator(name, points) {
  const newUser = Object.create(userFunctions);
  newUser.name = name;
  newUser.points = points;
  return newUser; // have to explicitely return here
}

const user = userCreator("Ryan", 3);
// Remember how we find .create(). Example 4 diagram

console.log(user.constructor === Object); // true
console.log(user.__proto__ === userFunctions); // true

console.log(userFunctions.constructor === Object); // true
console.log(userFunctions.__proto__ Object.prototype); // true 

// Confusion with prototype here
	// 1. prototype property on either object here?
	// 2. still refer to userFunctions as the prototype of user.

user.add();
// console.log(user.points);
```

- Neither `User` nor `User Functions` has a `prototype` property, since they are regular objects instead of functions. 

### Example 6

```js
function UserCreator(name, points) {
  this.name = name;
  this.points = points;
}

UserCreator.ptotoype.add = function() {
  this.points += 1;
}

const user = new UserCreator("Ryan", 3);
```

1. Constructor Function. Intended to be called with the `new` keyword. If you don't, you clobber the global object (#3 subpart #2 below). 
2. `new` provides a new execution context. 
3. Does 4 main things for us automatically. 
   1. creates an empty object for us. Before, we had to use Object.create()
   2. New execution context: Assigns the `this` keyword to refer to that empty object. Before we had to refer to the object itself to put property/values on it. 
   3. Sets the `__proto__` property of the empty object to the function's prototype property. This is the handy dandy convenient place that JS gives us to store functions we want to share. 
   4. Returns the object automatically. Before, we had to explicitly return it out. 

```js
// Confusion check
console.log(user.__proto__ === UserCreator.prototype); // true
console.log(user.__proto__ === UserCreator); // false
console.log(user.constructor === userCreator); // true
// So what is user's prototype object? It is UserCreator.prototype. 

// Confusion Check
// Where will JS keep looking up the prototypal chain?
// Console.log(UserCreator.prototype.__proto__ === Object.prototype);
// Not:
// Console.log(UserCreator.__proto__ === Function.prototype);
```

------

### Example 7

```js
function UserCreator(name) {
  this.name = name;
}

UserCreator.prototype.sayName = function() {
  console.log(`I'm ${this.name}`);
}

function paidUserCreator(paidName, balance) {
  UserCreator.call(this, paidName);
  this.balance = balance;
}

PaidUserCreator.prototype = Object.create(UserCreator.prototype);
// here you created a new object and set the prototype property to that. 
// the problem with this code is that you replaced the old object with a whole new one, so old constructor property is gone. The new object's constructor points to UserCreator.  
console.log(PaiduserCreator.prototype.constructor === UserCreator); // true
// Now that prototype property object constructor points to UserCreator, which is not what we want.

PaidUserCreator.prototype.constructor = PaidUserCreator; 
// In this code, we try to set the constructor property back to PaidUserCreator

// A different method, but performance issues:
PaidUserCreator.prototype.__proto__ = UserCreator.prototype;

console.log(PaidUserCreator.prototype.__proto__ === Object.prototype); // false
console.log(PaidUserCreator.prototype.__proto__ === UserCreator.prototype) // true

PaidUserCreator.prototype.increase = function() {
  this.balance += 1;
}

const user1 = new UserCreator("Dean");

const paidUser1 = new paidUserCreator('Ryan', 3);
```

------

### Example 8

```js
class UserCreator {
  constructor (name) {
    this.name = name;
  }
  
  // class is different in that you don't have to reference the prototype property
  sayName() {
    console.log(`I'm ${this.name}`);
  }
}

// extends also sets PaidUserCreator's dunder proto automatically to UserCreator
class PaidUserCreator extends UserCreator {
  constructor(paidName, balance) {
    super(paidName); // super allows us to call parent constructor 
    this.balance = balance;
  }
  
  increase() {
    this.balance += 1;
  }
}

console.log(typeof UserCreator); // 'function'
console.log(typeof PaiduserCreator); // 'function'

const user1 = new UserCreator("Dean");
console.log(user1.__proto__ === UserCreator.prototype); // true
console.log(user1.constructor === UserCreator); // true

const paidUser1 = new PaidUserCreator("Ryan, 3");
console.log(paidUser1.__proto__ === PaidUserCreator.prototype); // true
console.log(paidUser1.constructor === PaidUserCreator); // true 

console.log(Creator.prototype.__proto === UserCreator.prototype); // true 
console.log(UserCreator.prototype.__proto__ === Object.prototype); // true 

```

**extends: **

- The **`extends`** keyword is used in [class declarations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class) or [class expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) to create a class that is a child of another class
- The **super** keyword is used to access and call functions on an object's parent.

------

### Importants

##### Dot references a property.

- Which is why methods are invoked by the `.`, since methods are properties of an object.
- Examples of properties
  - `.Constructor` / `Object.prototype.constructor`
  - `.prototype` / `Constructor.prototype`

##### Note: there is no "prototype property" on a regular object. 

- There's certain built -in properties that JavaScript put on every object (dunder proto & constructor properties)
- It does not give you a prototype property on plain objects. 

##### Note: Every function is given a Prototype property. 

- Every **function object** by default is always given a built -in prototype property. 
- If you were to create your own function like `func`, it would have a prototype property in it that refers to an empty object. 

##### Note: Prototype Property is not the same as  `[[prototype]]` / `__proto__`

- Remember: prototype property is also called **function prototype** or **constructor prototype** property. 
  - Only function objects have this property. 
  - It refers to an object that the instance object of a constructor inherits from. 
  - The syntax is `Constructor.prototype` 
- `[[prototype]]` / `__proto__`
  - Exists in all regular objects, and refers to the prototype object of an object. 
- Confusing thing is that ``[[prototype]]` / `__proto__` often reference `Constructor.prototype` 

##### Difference between `Object.prototype` and `Constructor.prototype`?

- THERE IS NO DIFFERENCE
- They are the same thing. `.prototype` always references the **prototype** property of a constructor. 
- `Constructor.prototype` is the prototype property of a constructor / function object. 

