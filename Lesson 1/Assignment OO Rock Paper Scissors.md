In this assignment, we'll build a new version of the Rock, Paper, Scissors game -- RPS for short -- that we wrote in a previous course. The game flow should go like this:

- The user makes a choice.
- The computer makes a choice.
- The winner is displayed.

This time, we'll use objects and factory functions to code it in an object-oriented style.

The classical approach to planning an object-oriented application includes several steps:

1. Write a textual description of the problem or exercise.
2. Extract the significant nouns and verbs from the description.
3. Organize and associate the verbs with the nouns.

<u>**Nouns** are the objects or *types* of objects and the **verbs** are the behaviors or methods.</u> 

- In OO design, you shouldn't think about the game flow logic during this early design phase. OOP is all about organizing and modularizing the code into a cohesive structure - objects. 
- Only after you know what objects you need can you look at orchestrating the program's flow. For now, we won't worry about this step.
- Initially, we'll use factory functions to create objects. That's not the only way to create objects in JavaScript, nor is it necessarily even the best way. When we learn about other object creation techniques later on, we'll revisit this application to see how those techniques apply to this problem.

### Step 1: Write a textual description of the problem or exercise.

Our first step is to write a textual description of the RPS game:

RPS is a two-player game where each player chooses one of three possible moves: rock, paper, or scissors. The winner is chosen by comparing their moves with the following rules:

- Rock crushes scissors, i.e., rock wins against scissors.
- Scissors cuts paper, i.e., scissors beats paper.
- Paper wraps rock, i.e., paper beats rock.
- If the players chose the same move, the game is a tie.

### Step 2: Extract the significant nouns and verbs from the description.

Using the description in step 1, let's try to extract the significant nouns and verbs. RPS is a bit challenging in this regard: there aren't many nouns apparent. OO programming problems are usually easier to model when there are real-world nouns that match the problem domain. However, in RPS, the nouns are more subtle. Nevertheless, let's give it a shot.

Copy Code

```plaintext
Nouns(objects): player, move, rule
Verbs(methods): choose, compare
```

Note that we've decided to ignore the nouns "rock," "paper," and "scissors": each is a variation of a move. You can think of them as moves that each have a different state. Therefore, we'll treat "move" as a noun of interest.

### Step 3: Organize and associate the verbs with the nouns.

Once we have the nouns and verbs, we must organize them by associating each verb with the noun that performs the action represented by the verb. Since we have so few nouns and verbs, you might think that organizing them should be simple. However, it's not always easy to determine which verb goes with which noun. In our RPS game, for instance, a "Player" can "choose," but "Move" and "Rule" don't currently have any associated verbs. Furthermore, it's not clear which noun should respond to the "compare" verb.

```plaintext
Player
 - choose
Move
Rule

???
- compare
```

For now, let's ignore the question about where "compare" belongs and see what we can do with the information available. Let's start by outlining our object factories and the `compare` method. Since we're not yet ready to implement any details, we'll write some skeleton code and leave the details until later. However, we can begin to think about the states that each object could have.

- using factory functions to create objects.
- state: data, nouns; objects, verbs: methods

```js
// oo_rps.js
function createPlayer() {
  return {
    // possible state: player name?
    // possible state: player's current move?

    choose() {
      // not yet implemented
    },
  };
}

function createMove() {
  return {
    // possible state: type of move (paper, rock, scissors)
  };
}

function createRule() {
  return {
    // possible state? not clear whether Rules need state
  };
}

// Since we don't yet know where to put `compare`, let's define
// it as an ordinary function.
let compare = function(move1, move2) {
  // not yet implemented
};
```



Our design is a bit crude at this point, but these preliminary skeleton objects and methods should help us move ahead. Think of this code as the "back of the envelope" or "napkin" model of the problem. We still have unanswered questions, but it's a good start.

### Orchestration Engine

Once we've organized our nouns and verbs into objects, we need an *engine* to orchestrate the objects. The engine is where the procedural program flow should be. Let's call the engine object `RPSGame`. We want an easy interface to kick things off, so let's start gameplay by calling a method named `play`:

```js
RPSGame.play();
```

Given that interface, here's our initial attempt at writing the `RPSGame` object:

```js
const RPSGame = {
  play() {
    displayWelcomeMessage();
    humanChooseMove();
    computerChooseMove();
    displayWinner();
    displayGoodbyeMessage();
  },
};
```

Lines 4 and 5 are similar and repetitive since both handle the move-choosing part of the problem. This ties into our player object, which has a `choose` method. Can the human and computer both be objects of the player type? If we can do that, then both humans and computers can use the `choose` method. With that insight, let's update the `RPSGame` object:

```js
const RPSGame = {
  human: createPlayer(),
  computer: createPlayer(),

  play() {
    displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    displayWinner();
    displayGoodbyeMessage();
  },
};
```

Our objects are starting to take shape. However, we still don't know how to use the move and rule types in our game. Perhaps we don't need them at all. We'll stop here for now and continue brainstorming in the next assignment.

### Summary

Object-oriented design and architecture is a broad topic; it takes years to master. This assignment outlines an approach to problem-solving with an object-oriented mindset. One of the hardest things to understand about OOP is that there is no absolute *right* solution. OOP always comes down to making tradeoffs. There are wrong approaches, of course, but many other approaches are acceptable. For now, you should strive to understand the core concepts of OOP; don't worry so much about whether you're using the right or wrong approach, and don't worry about finding the optimal architecture or design.

In the next assignment, we'll continue where we left off here and go on an exploratory coding spree to better understand the problem.