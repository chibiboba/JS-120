1. ```js
   // my solution
   Object.prototype.ancestors = function() {
     let arr = [];
     let self = this;
   
     while (self.hasOwnProperty('name')) {
       let ancestor = Object.getPrototypeOf(self);
       if (ancestor.name !== undefined) arr.push(ancestor.name);
       self = Object.getPrototypeOf(self);
     }
   
     arr.push('Object.prototype');
     console.log(arr);
   };
   ```

   - `Object.prototype.name` is undefined. which means `Object.prototype` does not have a `name` property. 

   ```js
   // my second solution
   Object.prototype.ancestors = function() {
     Object.prototype.name = 'Object.prototype'; // setting name property in Object.prototype
     let arr = [];
     let self = this;
   
     while (true) {
       let ancestor = Object.getPrototypeOf(self);
       if (ancestor === null) {
         break;
       }
       arr.push(ancestor.name);
       self = Object.getPrototypeOf(self);
     }
   
     console.log(arr);
   };
   ```

   ```js
   // their solution
   Object.prototype.ancestors = function ancestors() {
     let ancestor = Object.getPrototypeOf(this);
   
     if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
       return [ancestor.name].concat(ancestor.ancestors());
     }
   
     return ['Object.prototype'];
   };
   ```

   - The problem lends itself well to a recursive solution. The resulting array is incrementally built by recursively calling on the `Object.prototype.ancestors` method. The base case is when `ancestor` does not have a `name` property anymore because it means that `ancestor` is `Object.prototype` already. When this is the case, there are no more prototype objects to add. The key for this solution is recognizing that the value of `this` is the calling object and that we have to add the `ancestors` method on `Object.prototype` so that all objects have access to it.
   - Be mindful when adding methods to built-in Objects (e.g, `String.prototype`, `Object.prototype`. It may lead to confusing code and can have unintended consequences.
   
2. #### Solution

   Copy Code

   ```javascript
   function Person(firstName, lastName, age, gender) {
     this.firstName = firstName;
     this.lastName = lastName;
     this.age = age;
     this.gender = gender;
   }
   
   Person.prototype.fullName = function() {
     return this.firstName + ' ' + this.lastName;
   };
   
   Person.prototype.communicate = function() {
     console.log('Communicating');
   };
   
   Person.prototype.eat = function() {
     console.log('Eating');
   };
   
   Person.prototype.sleep = function() {
     console.log('Sleeping');
   };
   
   function Doctor(firstName, lastName, age, gender, specialization) {
     Person.call(this, firstName, lastName, age, gender);
     this.specialization = specialization;
   }
   
   Doctor.prototype = Object.create(Person.prototype);
   Doctor.prototype.diagnose = function() {
     console.log('Diagnosing');
   };
   Doctor.prototype.constructor = Doctor;
   
   function Professor(firstName, lastName, age, gender, subject) {
     Person.call(this, firstName, lastName, age, gender);
     this.subject = subject;
   }
   
   Professor.prototype = Object.create(Person.prototype);
   Professor.prototype.teach = function() {
     console.log('Teaching');
   };
   Professor.prototype.constructor = Professor;
   
   function Student(firstName, lastName, age, gender, degree) {
     Person.call(this, firstName, lastName, age, gender);
     this.degree = degree;
   }
   
   Student.prototype = Object.create(Person.prototype);
   Student.prototype.study = function() {
     console.log('Studying');
   };
   Student.prototype.constructor = Student;
   
   function GraduateStudent(firstName, lastName, age, gender, degree, graduateDegree) {
     Student.call(this, firstName, lastName, age, gender, degree);
     this.graduateDegree = graduateDegree;
   }
   
   GraduateStudent.prototype = Object.create(Student.prototype);
   GraduateStudent.prototype.research = function() {
     console.log('Researching');
   };
   GraduateStudent.prototype.constructor = GraduateStudent;
   ```

   The solution is a bit long, but it's not complicated. The points to note are the following:

   - Use of `Function.prototype.call` to have the subclass "inherit" properties from the parent class.
   - Use of `Function.prototype = Object.create(obj)` to "inherit" methods from the parent class.
   - Use of `Function.prototype.constructor` to manually reset the property to point back to the appropriate constructor.
   
3. #### Solution

   ```js
   class CircularQueue {
     constructor(size) {
       this.buffer = new Array(size).fill(null);
       this.nextPosition = 0;
       this.oldestPosition = 0;
     }
   
     enqueue(object) {
       if (this.buffer[this.nextPosition] !== null) {
         this.oldestPosition = this.increment(this.nextPosition);
       }
       this.buffer[this.nextPosition] = object;
       this.nextPosition = this.increment(this.nextPosition);
     }
   
     dequeue() {
       let value = this.buffer[this.oldestPosition];
       this.buffer[this.oldestPosition] = null;
       if (value !== null) {
         this.oldestPosition = this.increment(this.oldestPosition);
       }
       return value;
     }
   
     increment(position) {
       return (position + 1) % this.buffer.length;
     }
   }
   ```

   #### Discussion

   If you read the Wiki page on circular queues, it's likely that your solution resembles ours in terms of mechanics: we have a buffer with room for N objects, a pointer to the oldest object currently in the buffer, and a pointer to the next spot where a new object will be inserted. We also use `null`s to indicate empty buffer positions. All 3 of these items are initialized in `constructor` method.

   With this type of structure, our two pointers need to "wrap around" from the final position to position 0. This is accomplished with the `increment` method which simply increments the position pointer, and wraps around to 0 when necessary.

   The `enqueue` method first checks whether it will be adding the object to an empty buffer position or replacing an object in an occupied position. If the position is occupied, we need to update the `oldestPosition` property since we will be replacing the oldest object. Finally, we store the object in the appropriate position, and increment the `nextPosition` property.

   Note that `enqueue` needs to test for `null`, not just falseness. This is because the queue may contain other values that evaluate to false like `0`, `""` and `false`.

   `dequeue` starts by extracting the oldest object, and replacing it with `null` to indicate that the position is no longer occupied. Then we update the `oldestPositiion` property, and return the value that was originally in that position.

   The use of `if (value !== null)` in `dequeue` is necessary to prevent problems with calling `dequeue` on an empty queue, and subsequently adding objects to that queue. If you don't check for the `null` value, the two properties get out of sync and cause problems.

   #### Further Exploration

   Phew. That's a lot of work, but it's a perfectly acceptable solution to this exercise. However, there is a simpler solution that uses an Array, and the `push` and `shift` methods. See if you can find a solution that does this.

   ```js
   class CircularQueue {
     constructor(bufferSize) {
       this.queue = [];
       this.bufferSize = bufferSize;
     }
   
     enqueue(num) {
       if (this.queue.length === this.bufferSize) {
         this.queue.shift();
       }
       this.queue.push(num);
     }
   
     dequeue() {
       if (this.queue.length === 0) return null;
       let oldest = this.queue.shift();
       return oldest;
     }
   }
   ```

   

   

