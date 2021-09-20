# Walk-through: OO RPS Design Choice

Our game's functionality is complete, but there are still some improvements we can make to the code. For instance, the conditional logic in the player object is not ideal and not object-oriented. Let's examine the current implementation of our `choose` method:

```js
function createPlayer(playerType) {
  return {
    // omitted for brevity

    choose() {
      if (this.isHuman()) {
        let choice;

        while (true) {
          console.log('Please choose rock, paper, or scissors:');
          choice = readline.question();
          if (['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid choice.');
        }

        this.move = choice;
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },

    // omitted
  }
}
```

You'll notice that we have an `if/else` conditional in our `choose` method that does different things based on whether the player is a computer or a human. It's easy to see that we'll always have to deal with these two choices, even if we later extend the application in some manner.

<u>The more significant problem, in this case, is that our factory function creates an object whose behavior depends on a property of that object.</u> That doesn't seem troublesome when we create just two objects, but suppose we have tens, hundreds, or even thousands of objects. This approach rapidly becomes unfeasible and unmanageable.

For instance, let's say we have a `createAnimal` factory function that creates animal objects of different kinds. Suppose further that, within those objects, we have a `makeSound` method that prints the name of the animal sound to the console. Obviously, animals make different sounds: lions roar, cats meow, and dogs bark. Are we supposed to handle all these sounds with `if/else` conditionals for each? That would make our code extremely ugly and difficult to read:

```js
function createAnimal(animalType) {
  return {
    // omitted for brevity

    makeSound() {
      if (this.animalType === "lion") {
        console.log("roar!");
      } else if (this.animalType === "cat") {
        console.log("meow!");
      } else if (this.animalType === "dog") {
        console.log("bark!");
      } // additional tests omitted for brevity
    },

    // omitted
  }
}
```

We can think of each animal type (dog, cat, lion) as a *sub-type* of the underlying animal object. Most object-oriented programming languages handle this scenario with a pattern called **class inheritance**: child types inherit common properties and methods from a parent type. JavaScript also supports inheritance; we'll discuss that in another lesson. For now, we'll use separate factory functions for each sub-type.

Returning to our game, the sub-types of the player object are humans and computers. Instead of a single factory function for all players, we can use two separate factory functions, one for humans and one for computers. Let's create the `createComputer` factory function first.

```js
function createComputer() {
  return {
    move: null,

    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };
}
```

In the above example, we initialize the `move` property to `null`. Strictly speaking, that's unnecessary since `choose` will set the property to one of the three choices. However, it's a good practice to initialize object properties explicitly. That makes it easy to see what the initial state of the object looks like at a glance. It also shows the state of all properties in one place.

That's much better: it's cleaner, simpler, easier to understand, and easier to use since we don't need to provide arguments. It also reduces the likelihood of errors since we don't need to worry about invalid arguments. The `choose` method doesn't have to check whether the object it belongs to is a human or a computer: it is always a computer object, so it only has to handle the logic for computer moves. That also means that both `playerType` and `isHuman` are no longer needed.

Next, lets implement the `createHuman` factory function:

```js
function createHuman() {
  return {
    move: null,

    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };
}
```

Again, this is a significant improvement over the original code; it has all the same benefits we mentioned in connection with the `createComputer()` factory function.

The only difference between the objects created by our factory functions is the code used to implement the `choose` methods. Thus, code that uses these objects can treat them both as "players" and call their `choose` method. The objects themselves handle choosing which implementation they should run. We can say that the human and computer object types are sub-types of the player type.

We can now get rid of `createPlayer` and use these two functions to create our player objects in `RPSGame`:

```js
const RPSGame = {
  human: createHuman(),
  computer: createComputer(),
  // code omitted for brevity
};
```

Great! We've split the `createPlayer` factory function into two functions. Though we now have an additional factory function, the logic of each function is more straightforward and more specific to its type.

However, there is some duplication between the two factory functions since both objects have a `move` property. Duplicating a single property in two objects isn't too concerning, but, suppose other properties require duplication. In OOP, sub-types often share multiple properties and methods. JavaScript provides some constructs that help extract such duplications to one place; we'll discuss them later when we talk about constructors, prototypes, and classes.

For now, let's see whether we can extract this common `move` property to a single place using the factory function pattern. One way we might try to do that is to move the property to a separate factory function:

```js
function createPlayer() {
  return {
    move: null,
  };
}
```

What's next? How do we make use of this factory function together with the `createComputer` and `createHuman` factory functions? It's not as straightforward as you might like, but here's how to do it with the `createHuman` factory:

```js
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}
```

In this modified factory function, we first create a player object using the `createPlayer` function, then create the human object. Finally, we merge the two objects using `Object.assign`, then return the result.

See if you can do the same thing with the `createComputer` factory function.

Show Solution

We've extracted the common property, `move`, to a separate object factory, `createPlayer`. Since it's only one property, it's hard to see the benefits here. However, the general principle of extracting duplicated code to a single place is always worth considering. It makes changes to the code less error-prone and tedious. In the long run, it often leads to less work.

### One Last Step

At this point, it seems that we don't need the `createMove`, `createRule`, or `compare` functions. However, it's possible you will need them in the bonus features. Feel free to go ahead and delete them if you don't need them.

```js
// our code for oo_rps.js at end of this assignment
let readline = require('readline-sync');

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!')
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      console.log('You win!');
    } else if ((humanMove == 'rock' && computerMove === 'paper') ||
               (humanMove === 'paper' && computerMove === 'scissors') || 
               (humanMove === 'scissors' && computerMove === 'rock')) {
      console.log('Computer wins!');
    } else {
      console.log("It's a tie.");
    }
  },

  playAgain() {
    console.log('Would you like to play again (y/n');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() { // this method contains our procedural code
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
};

RPSGame.play(); // calling on the object's property which has a function value
// which mean it's a method.

// factory function 1
function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    },
  };

  return Object.assign(playerObject, computerObject);
}

// factory function 2
function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;
      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }
      this.move = choice;
    },
  };

  return Object.assign(playerObject, humanObject);
}

// separate factory function for a common property
// creates an object with the property move: null
function createPlayer() {
  return {
    move: null,
  };
}
```

