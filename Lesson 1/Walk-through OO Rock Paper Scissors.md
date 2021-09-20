# Walk-through: OO Rock Paper Scissors

Continuing with the design and code from the previous assignment, we'll walk through our initial implementation of Rock, Paper, Scissors. You should type along with us.

### Step 1 - Implement the `choose` Method

We'll start with the `RPSGame` object from the previous assignment and then develop it and the rest of the object types as we gain more understanding of our design:

oo_rps.js

```js
const RPSGame = {
  human: createPlayer(), 
  computer: createPlayer(), 
  
  play() { // this method contains our procedural code
    displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    displayGoodByeMessage();
  },
};

RPSGame.play(); // calling on the object's property which has a function value, which mean it's a method. 
```

The game starts when we call the `play` method on the `RPSGame` object; that method contains our proceduaral code. Let's implement the methods that we call from `RPSGame.play`. 

`displayWelcomeMessage`, where do we put it? Our original code calls it a function, not a method attached to some object. Since we're using OO programming, it should be a method. Since `displayWelcomeMessage` is an overall concern of the game, the `RPSGame` object seems like a reasonable choice to place the method. 

```js
const RPSGame = {
  human: createPlayer(), 
  computer: createPlayer(),
  
  displayWelcomeMEssage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },
  
  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    displayGoodbyeMessage();
  },
};
```

Since `displayWelcomeMessage` is a method in the same object as `play`, we must use `this` to call it.

While we're at it, let's implement `displayGoodbyeMessage` as well -- it's nearly identical except for the message it displays:

```js
const RPSGame = {
  human: createPlayer(),
  computer: createPlayer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    this.displayGoodbyeMessage();
  },
};
```

The next two method calls assume that we have a factory function that creates player objects. Both `this.human` and `this.computer` are created from a `createPlayer` factory function. Let's update the skeleton `createPlayer` function that we wrote earlier:

```js
function createPlayer() {
  return {
    // possible state: player name?
    // possible state: player's current move?

    choose() {
      // not yet implemented
    },
  };
}
```

We'll use `createPlayer` to create both computer and human players. We probably need some state in the player object to identify the type of player (human or computer). We can do that with a property named `playerType` that stores either `'human'` or `'computer'` as a string:

```js
function createPlayer(playerType) {
  return {
    // possible state: player name?
    // possible state: player's current move?
    playerType: playerType, 
    
    choose() {
      // not  yet implemented
    }.
  };
}
```

We can provide the player type as an argument to`createPlayer` when we call it: 

```js
const RPSGame = {
  human: createPlayer('human'), 
  computer: createPlayer('computer'), 
  
  // code ommited for brevity
};
```

Now that we have a property that identifies the player type, we can use it in our implementation of the `choose` method: 

```js
function createPlayer(playerType) {
  return {
    // possible state: player name?
    // possible state: player's current move?
    playerType: playerType, 
    
    choose() {
      if (this.isHUman()) {
        
      } else {
        
      }
    }, 
  };
}
```

Our `choose` method chooses a move for the player depending on the type of player represented by `playerType`. We can use an `isHuman` method to determine whether the `playerType` is `'human'`. The method would return `true` if `playerType` is `'human'`, and `false` if it is not. 

```js
function createPlayer(playerType) {
  return {
    // possible state: player name?
    // possible state: player's current move?
    playerType: playerType, 
    
    choose() {
      if (this.isHuman()) {
        
      } else {
        
      }
    }, 
    
    isHuman() {
      return this.playerType === 'human';
    },
  };
}
```

Let's write the code for the computer's choice first: it's simpler since the computer merely picks a move at random. 

```js
function createPlayer(playerType) {
  return {
    // possible state: player name? 
    // possible state: player's current move?
    playerType: playerType, 
    
    choose() {
      if (this.isHuman()) {
        // TODO
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        return chocies[randomIndex];
      }
    }, 
    
    isHuman() {
      return this.playerType === 'human';
    }
  }
}
```

Let's think about this implementation a bit. The `choose` method returns a string that represents the player's move (the computer in this case). However, if we look at the way we call `choose` in `RPSGame.play()`, we can see that we ignore that value:

```js
const RPSGame = {
  // code omitted

  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    this.displayGoodbyeMessage();
  },
};
```

That suggests that <u>`choose` should change the state in one of the application's objects</u>. Since the player makes the move, let's add `move` as a property of the player object, and adjust the `choose` method accordingly:

```js
function createPlayer(playerType) {
  return {
    // possible state: player name?
    playerType: playerType, 
    move: null, 
    
    choose() {
      if (this.isHuman()) {
        
      } else {
        const choces = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    }, 
    
    // omitted
  }
}
```

In the next step, we'll handle the situation where the human player chooses a move. That means we need to obtain some input from the human player, and that we need to import the `readline-sync` package into our program. You've done this often, so we'll leave you to write the code yourself. In the rest of this assignment, we will assume that you have imported `readline-sync` into your program and assigned it to a `readline` constant.

```js
function createPlayer(playerType) {
  return {
    // possible state: player name?
  	playerType: playerType, 
    move: null, 
    
    choose() {
      if (this.isHuman()) {
        let choice; 
        
        while (true) {
          console.log('Please choose rock, paper, or scissors: ');
          choice = readline.question();
          if (['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid choice.');
        }
        
        this.move = choice;
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomINdex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    }, 
    
    // omitted
  }
}
```

### Step 2: Implement `displayWinner`

Thus far, we've used our implementation of `RPSGame.play` to drive the implementation of some other methods. Right now, `play` looks like this:

```js
const RPSGame = {
  // code omitted
  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    this.displayGoodbyeMessage();
  },
}
```

We've implemented all the methods that this method uses except for `displayWinner`. We can implement it now since we know that `choose` stores the player's move as a piece of state in the `move` property.

The player objects, `human` and `computer`, are properties of the `RPSGame` object, we say that they collaborate with the `RPSGame` object. We can also say that they are **collaborators** of `RPSGame`. That also means that we can refer to them with the `this` keyword in methods that execute in the `RPSGame` context.

To determine who won, the `displayWinner` method must do something with the `human` and `computer` properties. Thus, it makes sense to make `displayWinner` a method on the object that contains those properties, namely, `RPSGame`. To get started, let's write some code so we can test our assumptions:

```js
const RPSGame = {
  // ommitted
  
  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
  }, 
  
	play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    this.displayGoodbyeMessage();
  }
}
```

This far in the assignment, we've written a fair amoutn of code.  We really should see whether it works, so let's take it for a spin. When you run the program, you should see something like this on the console.

```terminal
$ node oo_rps.js # replace oo_rps.js with your file name!
Welcome to Rock, Paper, Scissors!
Please choose rock, paper, or scissors:
rock
You chose: rock
The computer chose: paper
Thanks for playing Rock, Paper, Scissors. Goodbye!
```

The output you see may show different choices for you and the computer, but the rest of the output should be identical.

Great! Lets' go ahead and complete the logic for `RPSGame.displayWinner`:

```js
displayWinner() {
  let humanMove = this.human.move;
  let computerMove = this.computer.move;

  console.log(`You chose: ${this.human.move}`);
  console.log(`The computer chose: ${this.computer.move}`);

  if ((humanMove === 'rock' && computerMove === 'scissors') ||
      (humanMove === 'paper' && computerMove === 'rock') ||
      (humanMove === 'scissors' && computerMove === 'paper')) {
    console.log('You win!');
  } else if ((humanMove === 'rock' && computerMove === 'paper') ||
             (humanMove === 'paper' && computerMove === 'scissors') ||
             (humanMove === 'scissors' && computerMove === 'rock')) {
    console.log('Computer wins!');
  } else {
    console.log("It's a tie");
  }
},
```

The essential features of our game are now complete. Run the program and play a few games of RPS to verify that it works. You 

```console
$ node oo_rps.js
Welcome to Rock, Paper, Scissors!
Please choose rock, paper, or scissors:
rock
You chose: rock
The computer chose: paper
Computer wins!
Thanks for playing Rock, Paper, Scissors. Goodbye!
```

### Step 3: Play Again

Let's make our game a little friendlier and add a "play again" feature where we'll ask the user whether they want to play again and proceed based on their answer. Let's make some changes to our `RPSGame.play` method:

```js
const RPSGame = {
  // code omitted

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  },
}
```

We've added a loop around the three main game steps, and we break out of the loop when the `playAgain` method returns a falsey value. We'll implement it on the `RPSGame` object since it makes sense as part of the game controller.

```js
const RPSGame = {
  // code omitted

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y' ? true : false;
  },
  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  }
}
```

The `playAgain` method asks the user if they want to play again and if the user input starts with `'y'`, it returns `true`, otherwise it returns `false`. We use that boolean value to control the loop in our `play` method.

There's a more idiomatic way to write that `return` statement: we don't need the explicit `true` and `false` values. Instead, we can write:

```js
playAgain() {
  console.log('Would you like to play again? (y/n)');
  let answer = readline.question();
  return answer.toLowerCase()[0] === 'y';
},
```

Since `===` returns `true` or `false`, we don't need the ternary operator and we don't need the specific boolean values. This idiom may be a bit challenging to get used to, at first. However, it's so commonplace that most developers prefer it and most style guides recommend it: you may as well get used to it.

### Step 4: Cleanup

After all that, our `createPlayer` function looks like this:

oo_rps.js

```js
function createPlayer(playerType) {
  return {
    // possible state: player name?
    playerType: playerType,
    move: null,

    // code omitted
  }
}
```

It looks like we don't need to track the player's name so we can remove the comment from our code:

```js
function createPlayer(playerType) {
  return {
    playerType: playerType,
    move: null,

    // code omitted
  }
}
```

Don't be afraid to remove something from the original design if you genuinely don't need it. Some developers throw the whole kitchen sink into an object's initial design, only later realizing that they have more state than they need. Worse yet, many are reluctant to get rid of the unneeded state -- after all, they **might** need it one day. In truth, it's just code clutter that makes it harder to understand the code.

```js
// our code at end of this assignment
let readline = require('readline-sync');

const RPSGame = {
  human: createPlayer('human'), 
  computer: createPlayer('computer'), 

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
        (humanMove === 'scissors' && comptuerMove === 'paper')) {
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

// factory function
function createPlayer(playerType) {
  return {
    playerType: playerType, 
    move: null, 

    choose() {
      if (this.isHuman()) {
        let choice;

        while (true) {
          console.log('Please choose rock, paper, or scissors: ');
          choice = readline.question();
          if (['rock', 'paper', 'scissors'].includes(choice)) break;
          console.log('Sorry, invalid choice');
        }

        this.move = choice;
      } else {
        const choices = ['rock', 'paper', 'scissors'];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    }, 

    isHuman() {
      return this.playerType === 'human';
    }
  }
}
```

