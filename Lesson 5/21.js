/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
const readline = require('readline-sync');
const shuffle = require("shuffle-array");

class Deck {
  static SUITS = ['H', 'D', 'S', 'C'];
  static VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  static SUITS_SYMBOLS = {
    H: '♥',
    D: '♦',
    S: '♠',
    C: '♣'
  };

  constructor() {
    this.deck = Deck.initializeDeck();
  }

  static initializeDeck() {
    let deck = [];

    for (let suitIndex = 0; suitIndex < Deck.SUITS.length; suitIndex++) {
      let suit = Deck.SUITS[suitIndex];

      for (let valueIndex = 0; valueIndex < Deck.VALUES.length; valueIndex++) {
        let value = Deck.VALUES[valueIndex];
        deck.push([suit, value]);
      }
    }

    return shuffle(deck);
  }

  static pop() {
    return this.deck.pop();
  }

  static popTwoFromDeck(deck) {
    return [deck.pop(), deck.pop()];
  }

  static total(cards) {
    // cards = [['H', '3'], ['S', 'Q'], ... ]
    let values = cards.map(card => card[1]);

    let numOfA = 0;
    let sum = values.reduce((sum, value) => {
      if (['J', 'Q', 'K'].includes(value)) {
        value = 10;
      } else if (value === 'A') {
        numOfA += 1;
        value = 11;
      }
      return sum + Number(value);
    }, 0);

    while (sum > 21 && numOfA > 0) {
      sum -= 10;
      numOfA -= 1;
    }

    return sum;
  }

  static busted(cards) {
    return Deck.total(cards) > 21;
  }

  static detectResult(playerCards, dealerCards) {
    let playerTotal = Deck.total(playerCards);
    let dealerTotal = Deck.total(dealerCards);

    if (playerTotal > 21) {
      return 'PLAYER_BUSTED';
    } else if (dealerTotal > 21) {
      return 'DEALER_BUSTED';
    } else if (dealerTotal < playerTotal) {
      return 'PLAYER'; // both stayed
    } else if (dealerTotal > playerTotal) {
      return 'DEALER'; // both stayed
    } else {
      return 'TIE'; // both stayed
    }
  }

  static hand(cards) { // [['H', 'J'], ['S', 'J']
    return cards.map(card => {
      let suit = Deck.SUITS_SYMBOLS[card[0]];
      let value = card[1];
      switch (value) {
        case 'J':
          return `(${suit} Jack)`;
        case 'Q':
          return `(${suit} Queen)`;
        case 'K':
          return `(${suit} King)`;
        case 'A':
          return `(${suit} Ace)`;
        default:
          return `(${suit} ${value})`;
      }
    });
  }

  static JOIN_CARDS(cardNames) {
    switch (cardNames.length) {
      case 2:
        return `${cardNames[0]} and ${cardNames[1]}`;
      default:
        return cardNames.slice(0, -1).join(', ') + ', and ' +
          cardNames[cardNames.length - 1];
    }
  }
}

class Participant {
  static RICH = 10;
  static BROKE = 0;

  constructor() {
    this.cards = [];
    this.money = 5;
  }

  hit(card) {
    this.cards.push(card);
  }

  deal(card) {
    this.cards.push(card);
  }

  resetMoney() {
    this.money = 5;
  }

  showMoney() {
    console.log(`You have $${this.money}`);
    console.log("");
  }

  winBet() {
    this.money += 1;
  }

  loseBet() {
    this.money -= 1;
  }

  clearCards() {
    this.cards = [];

  }
  isBroke() {
    return this.money <= Participant.BROKE;
  }

  isRich() {
    return this.money >= Participant.RICH;
  }
}

class TwentyOneGame {
  constructor() {
    // declare and initialize vars
    this.deck = new Deck();
    this.player = new Participant();
    this.dealer = new Participant();
  }

  start() {
    this.displayWelcomeMessage();

    while (true) {
      this.reset();
      this.displayMoney(this.player.money);
      this.initialDeal();
      if (this.playerTurn(this.player.cards, this.dealer.cards)) {
        if (this.grandWinner()) break;
        continue;
      }
      if (this.dealerTurn(this.player.cards, this.dealer.cards)) {
        if (this.grandWinner()) break;
        continue;
      }

      this.displayResult(this.player.cards, this.dealer.cards);
      if (this.grandWinner() || !this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }

  reset() {
    this.player.clearCards();
    this.dealer.clearCards();
    this.deck = new Deck();
  }

  displayWelcomeMessage() {
    console.log('Welcome to Twenty-One!');
    console.log("You earn $1 for each win. You lose $1 for each loss.");
    console.log('You become rich when you reach $10.');
    console.log('However if you reach $0, you may no longer play.');
  }

  initialDeal() {
    this.player.deal(this.deck.deck.pop());
    this.player.deal(this.deck.deck.pop());
    this.dealer.deal(this.deck.deck.pop());
    this.dealer.deal(this.deck.deck.pop());
  }

  displayInitialHand(playerCards, dealerCards) {
    let playerCardNames = Deck.hand(playerCards);
    let dealerCardNames = Deck.hand(dealerCards);
    console.log(`Dealer has: ${dealerCardNames[0]} and (?).\n`);
    console.log(`You have: ${Deck.JOIN_CARDS(playerCardNames)}.`);
    console.log(`Your total: ${Deck.total(playerCards)}.\n`);
  }

  displayEntireHand(playerCards, dealerCards) {
    let playerCardNames = Deck.hand(playerCards);
    let dealerCardNames = Deck.hand(dealerCards);

    console.log(`Dealer has: ${Deck.JOIN_CARDS(dealerCardNames)}.`);
    console.log(`Dealer total: ${Deck.total(dealerCards)}.\n`);
    console.log(`You have: ${Deck.JOIN_CARDS(playerCardNames)}.`);
    console.log(`Your total: ${Deck.total(playerCards)}.\n`);
  }

  displayMoney(playerMoney) {
    let moneyString = `Amount you can bet - total': $${playerMoney}`;
    console.log(moneyString.padStart(moneyString.length + 5, ' ') + '\n');
  }

  updateMoney(playerCards, dealerCards) {
    let result = Deck.detectResult(playerCards, dealerCards);

    switch (result) {
      case 'PLAYER_BUSTED':
        this.player.loseBet();
        break;
      case 'DEALER_BUSTED':
        this.player.winBet();
        break;
      case 'PLAYER':
        this.player.winBet();
        break;
      case 'DEALER':
        this.player.loseBet();
        break;
    }
  }

  showCards() {
    console.log(`Dealer has ${this.dealerCards[0]} and ?`);
    console.log(`You have: ${this.playerCards[0]} and ${this.playerCards[1]}, for a total of ${Deck.total(this.playerCards)}.`);
  }

  grandWinner() {
    return (this.player.isRich() || this.player.isBroke());
  }

  displayRoundWinner(playerCards, dealerCards) {
    let result = Deck.detectResult(playerCards, dealerCards);

    switch (result) {
      case 'PLAYER_BUSTED':
        console.log('You busted! Dealer wins 1$');
        break;
      case 'DEALER_BUSTED':
        console.log('Dealer busted! You win 1$');
        break;
      case 'PLAYER':
        console.log('You win 1$!');
        break;
      case 'DEALER':
        console.log('Sorry, the dealer wins 1$!');
        break;
      case 'TIE':
        console.log("It's a tie this round!");
    }
  }

  displayGrandWinner(playerCards, dealerCards) {
    let result = Deck.detectResult(playerCards, dealerCards);

    switch (result) {
      case 'PLAYER_BUSTED':
        console.log('You are broke! Try again next time!');
        break;
      case 'DEALER_BUSTED':
        console.log('You became very rich!');
        break;
      case 'PLAYER':
        console.log('You became very rich!');
        break;
      case 'DEALER':
        console.log('You lost all your money! Try again next time!');
        break;
    }
  }

  displayWinner(playerCards, dealerCards) {
    if (this.grandWinner()) {
      this.displayGrandWinner(playerCards, dealerCards);
    } else {
      this.displayRoundWinner(playerCards, dealerCards);
    }
  }

  displayResult(playerCards, dealerCards) {
    this.displayEntireHand(playerCards, dealerCards);
    this.updateMoney(playerCards, dealerCards);
    this.displayWinner(playerCards, dealerCards);
  }


  playerTurn(playerCards, dealerCards) {
    while (true) {
      this.displayInitialHand(playerCards, dealerCards);
      let answer = this.hitOrStay();
      if (answer === 'h') {
        this.player.hit(this.deck.deck.pop());
        console.log("You decided to hit!\n");
      }

      if (answer === 's' || Deck.busted(playerCards)) break;
    }
    if (Deck.busted(playerCards)) {
      this.displayResult(playerCards, dealerCards);
      return (this.grandWinner() || this.playAgain());
    } else {
      console.log("You decided to stay.\n");
    }
  }

  dealerTurn(playerCards, dealerCards) {
    console.log('Dealer turn...');
    while (Deck.total(dealerCards) < 17) {
      console.log('Dealer hits!\n');
      this.dealer.hit(this.deck.deck.pop());
    }

    if (Deck.busted(dealerCards)) {
      this.displayResult(playerCards, dealerCards);
      return (this.grandWinner() || this.playAgain());
    }
  }

  hitOrStay() {
    let answer;
    while (true) {
      console.log('hit or stay?');
      answer = readline.question().toLowerCase();
      if (['h', 's'].includes(answer)) break;
      console.log('Please enter a valid answer: h or s');
    }
    return answer;
  }

  playAgain() {
    console.log('Play again? (y or n)');
    let answer = readline.question().toLowerCase();

    while (!['y', 'n'].includes(answer)) {
      console.log('please enter y or n');
      answer = readline.question().toLowerCase();
    }
    if (answer === 'y') console.clear();
    return answer === 'y';
  }

  displayGoodbyeMessage() {
    console.log('Thanks for playing Twenty One. See you next time!');
  }

}

let game = new TwentyOneGame();
game.start();