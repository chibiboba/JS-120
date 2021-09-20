### Review objects

**Objects** 

- are collections of properties where each property has a key and value. 
- one of  8 fundamental types.

- value can be any type, but **property keys are always strings**. If you define a property with a non-key string, it will first be converted into a string. 

```js
let obj = {};
obj[[1, 2, 3]] = 'three';

obj['1, 2, 3'] // 'three'
```

Accessing Properties

- **member access notation**: dot notation

  - Requires valid variable names. 

- **computed member access notation**: bracket notation. 

  - Can take any UTF-8-compatible string as the key. 
  - Can be computed on the fly -- any expression between the brackets gets evaluated as a string and used to reference the property. 

  ```js
  obj['a-key'] = 'four';
  
  obj.a-key 						 // SyntaxError(a-key is not a valid variable name)
  obj['a' + '-' + 'key'] // 'four'
  ```

Property Existence

- We get `undefined` when accessing a non-existent property. However we also get same value if we try to access a property set to `undefined`. 

- Two ways to distinguish one from another. 

  - `in` operator
  - `hasOwnProperty`

  ```js
  Object.keys(obj) = ['7', 'false', '1, 2, 3', 'a-key'];
  
  'false' in obj // true
  'true'  in obj // false
  
  obj.hasOwnProperty('7') // true
  obj.hasOwnProperty('8') // true
  ```

- Another indirect way of checking for property existence is to enumerate the properties of an object via `Object.keys` or `Object.getOwnPropertyNames`. 

  - Both return an array of the object's properties. 
  - Difference is that Obect.keys returns an array of enumerable properties while `Object.getOwnPropertyNames` returns all properties.
    - **Enumerable properties**: means the property can be iterated over using `for..in` loop or `Object.keys()` method. All properties created by simple asssignment or property itnializer are enumerable by default. 
      - Properties defined via `Object.defineProperty` and such default enumerable flag to false. 
      - Enumerable properties show up in for...in loops unless the property's key is a Symbol. 
      - Ownership of properties is determined by whether the property belongs to the object directly and not to its prototype chain. 

  ```js
  Object.keys(obj)                    // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
  Object.getOwnPropertyNames(obj)     // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
  ```

------

### Object Prototypes

 **Object factories**: functions that create and return objects of a particular type. 

- Factory functions are one way to autmate object creation.  
- Extracts code to one place so multiple objects can use it. 
- Entities that are common to multiple objects such as `start` and `stop` methods get declared in one place. On the other hand, arguments passed to the factory function distinguish one object from another, such as make, model and year. 
- Serves two purpose. 

1. Returns object that represent data of a specific type. 
2. It reuses code. 

```js
function createCar(make, model, year) {
  return {
    make,             // Same as "make: make"
    model,            // Same as "model: model"
    year,             // Same as "year: year"
    started: false,

    start() {         // Same as "start: function() {"
      this.started = true;
    },

    stop() {          // Same as "stop: function() {"
      this.started = false;
    },
  };
}
```

With the `createCar` object factory, we can create as many car objects as our program needs.

```js
let car1 = createCar('Toyota', 'Corolla', 2016);
let car2 = createCar('Honda', 'Civic', 2017);
```

Prototypes

- Although factory functions are useful to extract code into one place so multiple objects can use it, JavaScript relies heavily on prottypes. 
