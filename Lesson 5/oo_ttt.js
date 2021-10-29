let readline = require("readline-sync"); // first line in ttt.js

// Square class is on top of file to ensure that Board's constructor knows about Square class
class Square { // class is used to represent squares
  static UNUSED_SQUARE = " "; // state
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) { // creates new, unused squares
    this.marker = marker; // marker is set to the default " "
  }

  setMarker(marker) {
    this.marker = marker;
  }

  toString() { // custom toString for when the object is logged as string, so it doesn't log [object object] 
    return this.marker;
  }
}
class Board {
  constructor () {
    this.squares = {};
    for (let counter = 1; counter <= 9; ++counter) {
      this.squares[String(counter)] = new Square();
      // each key is paired with an object that contains a marker variable
      // and also toString() method
    }
  }

  markSquareAt(key, marker) { // key is location choice, marker is HUMAN_MARKER
    this.squares[key].setMarker(marker);
  }

  display() {
    console.log("");
    console.log("     |     |");
    console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
    console.log("     |     |");
    console.log("-----+-----+-----");
    console.log("     |     |");
    console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
    console.log("     |     |");
    console.log("");
  }
}

class Row {
  constructor() {
    // STUB
    // We need some way to identify a row of 3 squares
  }
}

class Marker {
  constructor() {
    // STUB
    // a marker is something that represents a player's 'piece' on the board.
  }
}

class Player {
  constructor(marker) {
    // STUB
    // maybe a 'marker to keep track of this player's symbol (i.e. 'X' or 'O)
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }

  play() {
    //STUB
    // We need a way for each player to play the game.
    // Do we need access to the board?
  }
}

class Human extends Player {
  constructor() {
    // refers to constructor method for parent class
    super(Square.HUMAN_MARKER); // retrieves the HUMAN_MARKER from Square class
    // now Human has a marker property & getMarker method property
  }
}

class Computer extends Player {
  constructor() {
    // refers to constructor method for parent class
    super(Square.COMPUTER_MARKER); // retrieves the COMPUTER_MARKER from Computer class
  }
}

class TTTGame {
  constructor() {
    // STUB
    // Need a board and two players
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    // SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.board.display(); // display() is a method property that this.board inherits from Board.prototype

      this.humanMoves();
      this.board.display(); // so we can see human's move
      if (this.gameOver()) break;

      this.computerMoves();
      this.board.display(); // so we can see the computer's move
      if (this.gameOver()) break;
      break; // <= execute loop only once for now
    }

    this.displayResults();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic Tac Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing Tic Tac Toe! Goodbye!");
  }

  displayResults() {
    // STUB
    // show the results of this game (win, lose, tie)
  }

  humanMoves() { // was firstPlayerMoves
    let choice;

    while (true) {
      choice = readline.question("Choose a square between 1 and 9: ");

      let integerValue = parseInt(choice, 10);
      if (integerValue >= 1 && integerValue <= 9) {
        break;
      }

      console.log("Sorry, that's not a valid choice.");
      console.log("");
    }

    // mark the selected square with the human's marker(x)
    this.board.markSquareAt(choice, this.human.getMarker());
  }

  computerMoves() {  // was secondPlayerMoves
    console.log("computer moves");
    let choice = Math.floor((9 * Math.random()) + 1);
    this.board.markSquareAt(choice, this.computer.getMarker());
  }

  gameOver() {
    // STUB
    return false;
  }
}

let game = new TTTGame();
game.play();

