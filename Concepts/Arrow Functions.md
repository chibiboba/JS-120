------

Hi, I am quite confused about execution context, if someone could correct and/or affirm my understanding of how it works. Here some examples. The questions and explanations I have for them are in bullet points. 

#### Example 1 

```js
// Question 7 of Practice Problems: Dealing with Context Loss
// solution
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```

```terminal
# output
The Elder Scrolls: Arena
The Elder Scrolls: Daggerfall
The Elder Scrolls: Morrowind
The Elder Scrolls: Oblivion
The Elder Scrolls: Skyrim
```

This example regards arrow functions. So arrow functions are permanently bound to the execution context of its **enclosing function invocation**. 

- What exactly is the "enclosing function"? 
  - My understanding of enclosing function invocation is : the most outer function scope that contains the arrow function, within the current function invocation / "execution environment". 
  - In the example above, is the enclosing function `listGames` ? If so, the execution context of `listGames` would be `Tesgames` because it was invoked as a method call on line 13. 
  - If an arrow function is defined in a `forEach` method, why is `forEach` not considered the enclosing function? 

------

##### Example 1 Continued 

- #### Based on how the enclosing function is invoked, does the context of the arrow function change? 

  For example, if we altered the example 1 code into this. 

```js
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function () {
    TESgames.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

// TESgames.listGames();

let copy = TESgames.listGames;
copy(); 
```

```terminal
# output
undefined: Arena
undefined: Daggerfall
undefined: Morrowind
undefined: Oblivion
undefined: Skyrim
```

- This demonstrates that the execution context of an arrow function depends on the execution context of its enclosing function, which itself is dependent on how it is invoked. 
- Side note: note line 5 and how the array is accessed. 
- Since `copy()` is invoked as a standalone function on line 14, its execution context is the global object. `copy` is the enclosing function for the arrow function on line 5, and `this` would be undefined.  

------

#### Example 2

```js
function foo() {
  console.log("this refers to: " + this);
}

foo();
// this refers to: [object global]
```

In this example, `this` on line 2 refers to the global object, because `foo` was invoked as a standalone function on line 5. But `this` is also inside `console.log()` which is another function invocation. `console` is a property of the global object. 

- Why does `console.log()`, a method call, have nothing to do with the execution context of `this`? 

------

#### Example 3 (resolved)

```js
// Question 4 of Practice Problems: Dealing with Context Loss
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();
```

The execution context on line 6 is the global object. 

- Q: Is the execution context the global object because `forEach` invokes the callback function, and `forEach` is a method in the global object? 
- A: Yes. the call back function is executed with the global object as context. 

