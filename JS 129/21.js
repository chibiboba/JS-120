// ~/'My Documents'/'Launch School'/'JS 120'/'JS 129'
const readline = require("readline-sync");
const shuffle = require("shuffle-array");

class Card {
  // properties of the Card constructor are static
  static SUITS = ['Heart', 'Diamond', 'Spade', 'Club'];
  static VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Joker', 'Queen', 'King', 'Ace'];

  // creates an individual card instance object with its own properties
  constructor(suit, value) {
    //STUB
    // What sort of state does a card need?
    // Rank? Suit? Points?
    this.suit = suit;
    this.value = value;
    this.hidden = false;
  }

  getValue() {
    return this.value;
  }

  getSuit() {
    return this.suit;
  }

  // toString() is invoked during implicit type coercion
  // when we `this.prompt` the card objects
  toString() {
    if (this.hidden) return "Hidden";
    return `${this.getValue()} of ${this.getSuit()}`;
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }

  isHidden() {
    return this.hidden;
  }

  isAce() {
    return this.value === 'Ace';
  }

  isFaceCard() {
    return ['Joker', 'King', 'Queen'].includes(this.value);
  }
}

class Deck {
  constructor() {
    //STUB
    // What sort of state does a deck need?
    // 52 Cards?
    // obviously, we need some data structure to keep track of cards
    // array, object, something else?
    this.deck = [];
    Card.SUITS.forEach(suit => {
      Card.VALUES.forEach(value => {
        // creates card object and pushes it to the deck array
        // deck array is made of card objects
        this.deck.push(new Card(suit, value));
      });
    });
    // be sure to shuffle the deck
    this.shuffleCards();
  }

  shuffleCards() {
    shuffle(this.deck);
  }


  dealCardFaceUp() {
    let card = this.deck.pop();
    return card;
  }

  dealCardFaceDown() {
    let card = this.deck.pop();
    card.hide();
    return card;
  }
}

class Participant {
  constructor() {
    // card property inside the participant object
    // that refers to an array that holds the player or dealer's cards
    this.hand = [];
  }
  // returns the hand (cards)
  getHand() {
    return this.hand;
  }

  // resets the card property to an empty hand array
  resetHand() {
    this.hand = [];
  }

  addToHand(card) {
    this.hand.push(card);
  }

}

class Player extends Participant {
  static STARTING_MONEY = 5;
  static WINNING_MONEY = 10;
  static LOSING_MONEY = 0;

  constructor() {
    super();
    //STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
    this.name = 'Player';
    this.money = Player.STARTING_MONEY;
  }

  showHand() {
    console.log(`=> Your cards are:`);
    this.hand.forEach(card => console.log(` ${card}`)); // invokes toString()
    console.log();
  }

  winBet() {
    this.money += 1;
  }

  loseBet() {
    this.money -= 1;
  }

  isBroke() {
    return this.money === 0;
  }

  isRich() {
    return this.money === 10;
  }

  showPurse() {
    return this.money;
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    super();
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
    this.name = 'Dealer';
  }

  revealHand() {
    this.hand.forEach(card => card.reveal());
  }

  showHand() {
    console.log(`=> Dealer's cards are:`);
    this.hand.forEach(card => console.log(` ${card}`)); // invokes toString()
    console.log();
  }

}

class TwentyOneGame {
  static HIT = 'h';
  static STAY = 's';
  static TARGET_SCORE = 21;
  static DEALER_MUST_STAY_SCORE = 17;

  constructor() {
    // What sort of state does the game need?
    // A deck? Two participants?
    this.player = new Player();
    this.dealer = new Dealer();
  }

  start() {
    this.displayWelcomeMessage();

    do {
      this.dealCards();
      this.showCards();
      this.playerTurn();
      this.dealerTurn();
      this.detectResult();
      this.displayResult();
      this.displayPurse();
    // eslint-disable-next-line max-len
    } while (!([Player.LOSING_MONEY, Player.WINNING_MONEY].includes(this.player.money)));

    this.whoWon();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log("----------------------------------- Welcome to 21 ----------------------------------------");
    console.log(`The game rules are as following:`);
    console.log(`○ You start with $5 to bet with.`);
    console.log(`○ A dollar is deducted each round that you lose, and a dollar is added each time you win.`);
    console.log(`○ The game ends when you are broke: $0, or rich: $10.`);
    console.log();
    console.log(`Details pertaining to each round:`);
    console.log(`○ During each round, the goal is to get as close to 21 without going over it.`);
    console.log(`○ You will decide whether to 'hit' or 'stay'.`);
    console.log(` • 'Hit' means you want to be dealt another card.`);
    console.log(` • 'Stay' means you stayed at your total.`);
    console.log(`○ The dealer follows a strict rule for determining whether to hit or stay:`);
    console.log(`○ Dealer hits until the total is at least 17. If the dealer busts, then you win the round.`);
    console.log("------------------------------------------------------------------------------------------");
  }
  // create new deck each game
  // both participants receive two cards
  // dealer hides one of his cards (face-down) so player can't see it
  // player can see both of her cards.

  dealCards() {
    this.deck = new Deck();
    this.player.resetHand(); // creates hand object for player to hold cards
    this.dealer.resetHand(); // creates hand object for dealer to hold cards

    this.player.addToHand(this.deck.dealCardFaceUp());
    this.player.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceUp());
    this.dealer.addToHand(this.deck.dealCardFaceDown());
  }

  // Display dealers's hand, one card remain hidden, and dealer's score.
  // Display the player's hand and her point total.
  showCards() {
    this.dealer.showHand();
    this.player.showHand();
  }

  // Display the computer's hand; one card should remain hidden.
  // Display the player's hand and her point total.
  playerTurn() {
    console.log("----------------------------------- Your Turn -------------------------------------------");

    while (true) {
      let answer = this.hitOrStay ();
      if (answer === TwentyOneGame.HIT) {
        this.hit(this.player);
        if (this.isBusted(this.player)) {
          this.prompt('You busted!');
          console.log();
          break;
        }
      } else {
        this.prompt(`You stayed at a total of: ${this.computeScore(this.player)}.`);
        console.log();
        break;
      }
    }
  }

  hitOrStay() {
    let answer;

    while (true) {
      this.prompt('Would you like to (h)it or (s)tay?');
      answer = readline.question().toLowerCase();
      if ([TwentyOneGame.HIT, TwentyOneGame.STAY].includes(answer)) break;
      this.prompt(`Sorry, must enter 'h' or 's'.`);
    }

    return answer;
  }

  // If player stayed and didn't bust, then it's dealers turn.
  // Display the dealer's hand, includding hidden card, and his point total.
  // Redisplay the dealer's hand and point total each time he hits.
  // Display the results when dealer stays.
  dealerTurn() {
    console.log("---------------------------------- Dealer's Turn ----------------------------------------");

    this.dealer.revealHand(); //make card not hidden
    this.dealer.showHand();

    while (true) {
      let score = this.computeScore(this.dealer);

      if (score === TwentyOneGame.DEALER_MUST_STAY_SCORE) {
        this.prompt(`Dealer stayed.`);
        break;
      } else if (score > TwentyOneGame.TARGET_SCORE) {
        this.prompt('Dealer busted!');
        break;
      } else if (score === TwentyOneGame.TARGET_SCORE) {
        break;
      } else {
        this.hit(this.dealer);
      }
    }
  }

  // add card to participant's deck
  // also display the hand and current score
  hit (participant) {
    participant.addToHand(this.deck.dealCardFaceUp());
    if (participant.name === 'Dealer') {
      this.prompt('Dealer chose to hit!');
    } else {
      this.prompt('You chose to hit!');
    }
    participant.showHand();
    this.showScore(participant);
  }

  displayGoodbyeMessage() {
    this.prompt("Thanks for playing 21! Goodbye ~");
  }

  prompt(text) {
    console.log(`=> ${text}`);
  }

  computeScore(participant) {
    let cards = participant.getHand();
    let score = cards.reduce((total, card) => {
      if (card.isFaceCard()) {
        return total + 10;
      } else if (card.isAce()) {
        return total + 11;
      } else {
        return total + Number(card.value);
      }
    }, 0); // need initial value, else accumulator value is at index 0, which is not a number.

    // correct for Aces
    cards.filter(card => card.isAce() && !card.isHidden()).forEach(_ => {
      if (score > 21) score -= 10;
    });

    return score;
  }

  detectResult() {
    let playerScore = this.computeScore(this.player);
    let dealerScore = this.computeScore(this.dealer);

    if (this.isBusted(this.player)) {
      this.player.loseBet();
    } else if (this.isBusted(this.dealer)) {
      this.player.winBet();
    } else if (playerScore > dealerScore) {
      this.player.winBet();
    } else if (playerScore < dealerScore) {
      this.player.loseBet();
    }
  }

  displayResult() {
    console.log("-----------------------------------------------------------------------------------------");
    console.log();
    let playerScore = this.computeScore(this.player);
    let dealerScore = this.computeScore(this.dealer);

    if (this.isBusted(this.player)) {
      this.prompt(`You lose this round with your score of ${playerScore} to the dealer's ${dealerScore}.`);
    } else if (this.isBusted(this.dealer)) {
      this.prompt(`You win this round with a score of ${playerScore} to ${ dealerScore }.`);
    } else if (dealerScore > playerScore) {
      this.prompt(`Dealer wins this round with a total of ${dealerScore} to your ${playerScore}.`);
    } else if (playerScore > dealerScore) {
      this.prompt(`You win this round with a total of ${playerScore} to the dealer's ${dealerScore}.`);
    } else {
      this.prompt(`You tied!`);
    }

  }

  whoWon() {
    if (this.player.money === Player.LOSING_MONEY) {
      console.log('You are broke. The game will now conclude.');
    } else if (this.player.money === Player.WINNING_MONEY) {
      console.log('Congrats, you are rich! The game will now conclude.');
    }
  }

  showScore(participant) {
    let score = this.computeScore(participant);
    this.prompt(`${participant.name}'s score is now ${score}.`);
    console.log();
  }

  displayPurse() {
    console.log();
    this.prompt(`Your purse: $${this.player.money}`);
    console.log();
    console.log("----------------------------------- Next Round -------------------------------------------");
    console.log();
  }

  isBusted(participant) {
    return this.computeScore(participant) > TwentyOneGame.TARGET_SCORE;
  }
}

let game = new TwentyOneGame();
game.start();