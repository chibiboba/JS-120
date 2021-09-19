# Practice Problems: Objects and Factories

In these problems, we will develop a factory function for objects that represent books.

The following three books should give you an idea of what our first book object should look like:

```plaintext
Attributes
  Title: Mythos
  Author: Stephen Fry

Behavior:
  Get Description

-----------------------------
Attributes
  Title: Me Talk Pretty One Day
  Author: David Sedaris

Behavior:
  Get Description

-----------------------------
Attributes
 Title: Aunts aren't Gentlemen
 Author: PG Wodehouse

 Behavior:
   Get Description
```

1. Create three objects that represent the three books shown above. The method for the "Get Description" behavior should return a string like the following:

   ```js
   "Me Talk Pretty one day was written by David Sedaris."
   ```

   ```js
   let book1 = {
     title: 'Mythos', 
     author: 'Stephen Fry', 
     getDescription: function() {
       return `${this.title} was written by ${this.author}.`;
     }
   };
   
   let book2 = {
     title: 'Me Talk Pretty One Day'
     author: 'David Sedaris', 
     getDescription: function() {
     	return `${this.title} was written by ${this.author}.`;
     }
   }
   
   let book3 = {
     title: `Aunts aren't Gentlemen`, 
     author: 'PG Wodehouse', 
     getDescription: function() {
     	return `${this.title} was written by ${this.author}.`;
     }
   }
   ```

2. Think about the code you wrote for problem #1. Is there any unnecessary code? Does it have duplication?

   Solution

   The method `getDescription` is duplicated in each object. However, each object must hold unique values for its `title` and `author` properties.

3. Given our observations about the code so far, implement a factory function for our book objects that we can use with the following code:

   ```js
   let book1 = createBook('Mythos', 'Stephen Fry');
   let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
   let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');
   
   book1.getDescription();  // "Mythos was written by Stephen Fry."
   book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
   book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"
   ```

   ```js
   function createBook(title, author) {
     return {
       title: title, 
       author: author, 
       
       getDescription: function () {
         return `${this.title} was written by ${this.author}`;
       }
     };
   }
   ```

   Solution

    You can use a shorthand notation when a <u>property and a variable have the same name.</u> For instance, in the above, title and author are both property names and variable names, so we can use the following simplified syntax:

   ```js
   function createBook(title, author) {
     return {
       title,     // same as `title: title,`
       author,    // same as `author: author,`
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}.`;
       },
     };
   }
   ```

   

4. We now want to track which books we have and haven't read. Update the factory function so that it returns a book object that includes a property `read` that has an initial value of `false`.

   ```js
   function createBook(title, author) {
     return {
       title: title, 
       author: author, 
       read: false, 
       
       getDescription: function () {
         return `${this.title} was written by ${this.author}`;
       }
     };
   }
   ```

   Solution

   ```js
   function createBook(title, author) {
     return {
       title,   // see solution for previous problem
       author,  // see solution for previous problem
       read: false,
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}.`;
       },
     };
   }
   
   let book1 = createBook('Mythos', 'Stephen Fry');
   let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
   let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');
   
   console.log(book1.getDescription());  // "Mythos was written by Stephen Fry."
   console.log(book2.getDescription());  // "Me Talk Pretty One Day was written by David Sedaris."
   console.log(book3.getDescription());  // "Aunts aren't Gentlemen was written by PG Wodehouse"
   
   console.log(book1.read); // => false
   console.log(book2.read); // => false
   console.log(book3.read); // => false
   ```

   

5. Suppose that we want to add a book that we've already read. Modify the factory function to use an optional `read` parameter with a default value of `false`.

   Solution

   ```js
   function createBook(title, author, read = false) {
     return {
       title,
       author,
       read,
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}.`;
       },
     };
   }
   
   let book1 = createBook('Mythos', 'Stephen Fry');
   let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris', false);
   let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse', true);
   
   console.log(book1.read); // => false
   console.log(book2.read); // => false
   console.log(book3.read); // => true
   ```

   

6. Let's add a method, `readBook`, that marks a book object as read by setting the `read` property to `true`:

   Solution

   ```js
   function createBook(title, author, read = false) {
     return {
       title,
       author,
       read,
   
       readBook() {
         this.read = true; // careful here, must call on object to reassign property value
       },
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}.`;
       },
     };
   }
   
   console.log(book1.read); // => false
   book1.readBook();
   console.log(book1.read); // => true
   ```

   

7. Finally, let's update `getDescription` function to reflect the `read` state directly, For instance:

   ```js
   book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
   book1.readBook();
   book1.getDescription(); // Mythos was written by David Fry. I have read it.
   ```

   Solution

   ```js
   // my solution
   function createBook(title, author, read = false) {
     return {
       title,
       author,
       read,
   
       readBook() {
         this.read = true;
       },
   
       getDescription: function() {
         if (this.read) {
           return `${this.title} was written by ${this.author}. I have read it.`;
         } else {
           return `${this.title} was written by ${this.author}. I haven't read it.`;
         }
         
       },
     };
   }
   ```

   ```js
   // their solution
   function createBook(title, author, read = false) {
     return {
       title,
       author,
       read,
   
       readBook() {
         this.read = true;
       },
   
       getDescription: function() {
         return `${this.title} was written by ${this.author}. ` +
                `I ${this.read ? 'have' : "haven't"} read it.`; // using ternary operator in template literal
       },
     };
   }
   ```

   The template literal lets us interpolate any expression into the string using `${}`. Here, the contents of `${}` are `this.read ? 'have' : "haven't"`; it's an expression that evaluates to either `'have'` or `"haven't"`. If the value of `this.read` is `true`, the expression evaluates to `'have'`; otherwise, it evaluates to `"haven't"`. In either case, the result gets interpolated into the output string.