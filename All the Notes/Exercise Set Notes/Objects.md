1. ```js
   function createGreeter(name) {
     return {
       name: name,
       morning: 'Good Morning',
       afternoon: 'Good Afternoon',
       evening: 'Good Evening',
       greet: function(timeOfDay) {
         let msg = '';
         switch (timeOfDay) {
           case 'morning':
             msg += `${morning} ${name}`; // error here
             break;
           case 'afternoon':
             msg += `${afternoon} ${name}`; // error here
             break;
           case 'evening':
             msg += `${evening} ${name}`; // error here
             break;
         }
   
         console.log(msg);
       },
     };
   }
   ```

- the bug is that it didn't use `this` keyword to access properties of the object returned by the `createGreater` function. 

2. ```js
   let item = {
     name: 'Foo',
     description: 'Fusce consequat dui est, semper.',
     price: 50,
     quantity: 100,
     discount: function(percent) {
       let discount = this.price * percent / 100;
       this.price -= discount;
       
       return this.price;
     },
   };
   ```

- The problem is that the `discount` method is mutating the `item` object. 
- Objects are mutable and thus changes made to the property of the `item` object are compounded every time that the `discount` method is called. 
- To resolve this, the `discount` method should be modified so it doesn't mutate the object.

```js
function discountItem(item, percent) {
  let discount = item.price * percent / 100;
  return item.price - discount;
}
```

3. ```js
   // my first solution
   function objectsEqual(obj1, obj2) {
     let obj1Entries = Object.entries(obj1); // shouldn't use entries
     // because it only enumerates over object's own properties, but we want to check for all properties
     let obj2Entries = Object.entries(obj2);
     if (obj1Entries.length !== obj2Entries.length) return false;
   
     return obj1Entries.every((pair, index) => {
       if (pair[0] !== obj2Entries[index][0]) {
         return false;
       } else if (pair[1] !== obj2Entries[index][1]) {
         return false;
       } else {
         return true;
       }
     });
   }
   ```

   ```js
   // their solution
   function objectsEqual(a, b) {
     if (a === b) {
       return true;
     }
   
     return (keysMatch(a, b) && valuesMatch(a, b));
   }
   
   function keysMatch(a, b) {
     let aKeys = Object.getOwnPropertyNames(a).sort();
     let bKeys = Object.getOwnPropertyNames(b).sort();
   
     if (aKeys.length !== bKeys.length) {
       return false;
     }
   
     return aKeys.every((key, index) => {
       return key === bKeys[index];
     });
   }
   
   function valuesMatch(a, b) {
     let aKeys = Object.getOwnPropertyNames(a).sort();
   
     return aKeys.every(key => a[key] === b[key]);
   }
   ```

   ```js
   // my second solution
   function objectsEqual(obj1, obj2) {
     return compareKeys(obj1, obj2) && compareValues(obj1, obj2);
   }
   
   function compareKeys(obj1, obj2) {
     let obj1Keys = Object.getOwnPropertyNames(obj1);
     let obj2Keys = Object.getOwnPropertyNames(obj2);
   
     return obj1Keys.every((key, index) => key === obj2Keys[index]);
   }
   
   // couldn't use for...in here because we want to check all properties, not just own properties. 
   function compareValues(obj1, obj2) {
     let obj1Keys = Object.getOwnPropertyNames(obj1);
     return obj1Keys.every(key => obj1[key] === obj2[key]);
   }
   
   ```

   4. ```js
      ```

   5. 