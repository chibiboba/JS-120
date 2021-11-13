Objects are one of the eight fundamental types in JavaScript:

- String
- Number
- Boolean
- Null
- Undefined
- Object
- BigInt (you don't need to know about this)
- Symbol (you don't need to know about this)

They are basically a collection of properties where each property has a key and value. While values can be any of the JavaScript types, **property keys are always strings**. If you define a property with a non-string key, it will first be converted to a string.

```js
let myObject = { };

myObject[false] = "one"
myObject[7] = "two"
myObject[[1, 2, 3]] = "three"

Object.keys(myObject);                // ["7", "false", "1,2,3"]

myObject["false"]                     // "one"
myObject["7"]                         // "two"
myObject["1,2,3"]                     // "three"
```

#### Property Access

When dealing with objects, we are basically doing either one of two things: setting a property or accessing a property. We do both operations through the property key by using the bracket notation or the dot notation.

```javascript
myObject["foo"] = "bar";
myObject.foo              // "bar"
myObject["foo"]           // "bar"
```

Dot notation is also called **member access notation**, while bracket notation is called **computed member access notation**. The main difference between the two is that brackets notation can take any UTF-8-compatible string as the key, while member access notation requires valid variable names. Most importantly, computed member access notation can be computed on the fly -- any expression between the brackets gets evaluated as a string and used to reference the property.

Copy Code

```javascript
myObject["a-key"] = "four"

myObject.a-key              // SyntaxError (a-key is not a valid variable name)
myObject["a-key"]           // "four"
myObject["a" + "-" + "key"] // "four"
```

#### Property Existence

What happens if we access a non-existent property on an object? We get `undefined`. However, we also get the same value when we try to access a property that is explicitly set to `undefined`.

```javascript
Object.keys(myObject)                       //  [ '7', 'false', '1,2,3', 'a-key' ]
myObject[undefinedKey] = undefined

myObject.undefinedKey                       // undefined
myObject.missingKey                         // undefined
```

That’s a dilemma. How do we distinguish one from each other? There are two ways to do that:

- `in` operator
- `hasOwnProperty`

Both methods check if a property exists in an object. If it does, `true` is returned, and `false` otherwise.

Copy Code

```javascript
"false" in myObject                    // true
"true" in myObject                     // false

myObject.hasOwnProperty("7")           // true
myObject.hasOwnProperty("8")           // false
 
```

If they both do the same thing, why the need for duplication? They are not exactly identical. There is a difference but it’s something we have to cover in future assignments. What’s important to note for now is that both `in` operator as well as `hasOwnProperty` allows us to check for property existence in an object.

Another indirect way of checking for property existence is to enumerate the properties of an object via `Object.keys` or `Object.getOwnPropertyNames`. Both return an array of the object’s properties. The difference is that Object.keys returns an array of enumerable properties while `Object.getOwnPropertyNames` returns all properties regardless if they’re enumerable or not. For more on enumerable properties, check [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) out.

```javascript
Object.keys(myObject)                    // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
Object.getOwnPropertyNames(myObject)     // [ '7', 'false', '1,2,3', 'a-key', 'undefinedKey' ]
```

#### Summary

We’ve reviewed some basic concepts on objects. Specifically, we talked about objects as a collection of properties, setting and accessing properties, as well as checking for property existence. In the next assignments, we’ll dig deeper into objects and discuss topics that are essential to understanding object-oriented JavaScript.