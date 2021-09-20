[Question 5](https://launchschool.com/quizzes/6f1d66ed) 0 / 1 Points **Incorrect**

Which of the following code snippets creates an object with two properties? Select all that apply.

Toggle Answer Display

### Your Answer

**A**

```js
let cat = {
  name = "Butterscotch",
  age = 13
};
```

**B**

```js
let cat = {
  name: "Butterscotch",
  age: 13
};
```

**C**

```js
const cat = {
  name() {
    return "Butterscotch";
  },

  age() {
    return 13;
  },
};
```

**D**

```js
let cat = {
  this.name: "Butterscotch",
  this.age: 13,
};
```

### Discussion

**Incorrect:**

**A**, **D**: Using `=` and `this` in this code is a syntax error.

**Correct:**

**B**: This code is typical code for creating objects. It does nothing unusual.

**C**: This code may seem unusual at first, but there are two points to note: (1) you can use `const` when creating objects any place you can use `let`, and (2) `name` and `age` are methods on the object, but methods are also properties. Thus, this code is valid JavaScript for creating an object with two properties.

------

[Question 8](https://launchschool.com/quizzes/6f1d66ed) 0 / 1 Points

Which of the following statements about collaborator objects are true?

Toggle Answer Display

### Your Answer

**A**

Collaborator objects represent the connections between various actors in your program.

**B**

Collaborator objects become unwieldy when modeling complicated problem domains.

**C**

Collaborator objects let you combine several problem domains into one cohesive whole.

**D**

Collaborator objects let you chop up and modularize the problem domain into cohesive pieces.

### Discussion

**Incorrect:**

**B**: Collaborator objects don't become unwieldy when modeling complicated problem domains. They play an important role in such situations.

**C**: This statement is a bit backward. Collaborator objects let you chop up and modularize the problem domain into cohesive pieces as shown by one of the correct answers (**D**).

------

[Question 11](https://launchschool.com/quizzes/6f1d66ed) 0 / 1 Points**Incorrect**

Which of the following steps are part of the classical approach to planning an object-oriented application:

Toggle Answer Display

### Your Answer

**A**

Organize and associate the verbs and nouns.

**B**

Extract all of the nouns and verbs from the description.

**C**

Write a textual description of the problem or exercise.

**D**

Use factory functions to create any objects that you need.

### Discussion

**Incorrect:**

**B**: You should extract the *significant* nouns and verbs, not all of them.

**D**: OO applications don't require factory functions. You can use them, but you don't have to.