let readline = require("readline-sync");
let shuffle = require('shuffle-array');

function prompt(msg) {
  console.log(`=> ${msg}`);
}

class Deck {
  static SUITS = ['H', 'D', 'S', 'C'];
  static VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  static SUITS_DISPLAY = {
    H: '♥',
    D: '♦',
    S: '♠',
    C: '♣'
  };

  constructor() {
    this.deck = Deck.INITIALIZE_DECK();
  }

  static INITIALIZE_DECK() {
    let deck = [];

    for (let suitIndex = 0; suitIndex < Deck.SUITS.length; suitIndex++) {
      let suit = Deck.SUITS[suitIndex];

      for (let valueIndex = 0; valueIndex < Deck.VALUES.length; valueIndex++) {
        let value = Deck.VALUES[valueIndex];
        let cardObj = {};
        cardObj.suit = suit;
        cardObj.value = value;
        deck.push(cardObj);
      }
    }

    return shuffle(deck);
  }

  pop() {
    return this.deck.pop();
  }

  static CARD_NAMES(cards) { // [['H', 'J'], ['S', 'J']
    return cards.map(cardObj => {
      let suit = Deck.SUITS_DISPLAY[cardObj.suit];
      let value = cardObj.value;
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

  static CARD_VALUES(cards) {
    return cards.map(cardObj => cardObj.value);
  }

  static TOTAL(cards) {
    let values = Deck.CARD_VALUES(cards);

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

}

class Participant {
  constructor() {
    this.cards = [];
    this.dollars = 5;
  }
  static RICH = 10;
  static BROKE = 0;

  hit(card) {
    this.cards.push(card);
  }

  busted(cards) {
    return Deck.TOTAL(cards) > 21;
  }

  resetDollars() {
    this.dollars = 5;
  }

  winDollar() {
    this.dollars += 1;
  }

  loseDollar() {
    this.dollars -= 1;
  }

  deal(card) {
    this.cards.push(card);
  }

  clearCards() {
    this.cards = [];
  }

  isRich() {
    return this.dollars === Participant.RICH;
  }

  isBroke() {
    return this.dollars === Participant.BROKE;
  }
}

class TwentyOneGame {
  constructor() {
    this.deck = new Deck();
    this.player = new Participant();
    this.dealer = new Participant();
  }

  start() {
    this.displayWelcomeMessage();
    while (true) {
      this.reset();
      this.displayDollars(this.player.dollars);
      this.dealCards();
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

  displayDollars(playerDollars) {
    let moneyStr = `Money you can bet - total: $${playerDollars}`;
    console.log(moneyStr.padStart(moneyStr.length + 5, ' ') + '\n');
  }

  reset() {
    this.player.clearCards();
    this.dealer.clearCards();
    this.deck = new Deck();
  }

  dealCards() {
    this.player.deal(this.deck.pop());
    this.player.deal(this.deck.pop());
    this.dealer.deal(this.deck.pop());
    this.dealer.deal(this.deck.pop());
  }

  showInitialCards(playerCards, dealerCards) {
    let playerCardNames = Deck.CARD_NAMES(playerCards);
    let dealerCardNames = Deck.CARD_NAMES(dealerCards);
    console.log(`Dealer has: ${dealerCardNames[0]} and (?).\n`);
    console.log(`You have: ${Deck.JOIN_CARDS(playerCardNames)}.`);
    console.log(`Your total: ${Deck.TOTAL(playerCards)}.\n`);
  }

  displayAllCardsTotal(playerCards, dealerCards) {
    let playerCardNames = Deck.CARD_NAMES(playerCards);
    let dealerCardNames = Deck.CARD_NAMES(dealerCards);

    console.log(`Dealer has: ${Deck.JOIN_CARDS(dealerCardNames)}.`);
    console.log(`Dealer total: ${Deck.TOTAL(dealerCards)}.\n`);
    console.log(`You have: ${Deck.JOIN_CARDS(playerCardNames)}.`);
    console.log(`Your total: ${Deck.TOTAL(playerCards)}.\n`);
  }

  detectResult(playerCards, dealerCards) {
    let playerTotal = Deck.TOTAL(playerCards);
    let dealerTotal = Deck.TOTAL(dealerCards);

    if (playerTotal > 21) {
      return 'PLAYER_BUSTED';
    } else if (dealerTotal > 21) {
      return 'DEALER_BUSTED';
    } else if (dealerTotal < playerTotal) {
      return 'PLAYER';
    } else if (dealerTotal > playerTotal) {
      return 'DEALER';
    } else {
      return 'TIE';
    }
  }

  updateDollars(playerCards, dealerCards) {
    let result = this.detectResult(playerCards, dealerCards);

    switch (result) {
      case 'PLAYER_BUSTED':
        this.player.loseDollar();
        break;
      case 'DEALER_BUSTED':
        this.player.winDollar();
        break;
      case 'PLAYER':
        this.player.winDollar();
        break;
      case 'DEALER':
        this.player.loseDollar();
        break;
    }
  }

  logWithStars(str) {
    console.log(`${'*'.repeat(8)} ${str} ${'*'.repeat(8)}\n`);
  }

  displayRoundWinner(playerCards, dealerCards) {
    let result = this.detectResult(playerCards, dealerCards);

    switch (result) {
      case 'PLAYER_BUSTED':
        this.logWithStars('You busted! Dealer wins 1$');
        break;
      case 'DEALER_BUSTED':
        this.logWithStars('Dealer busted! You win 1$');
        break;
      case 'PLAYER':
        this.logWithStars('You win 1$!');
        break;
      case 'DEALER':
        this.logWithStars('Sorry, the dealer wins 1$!');
        break;
      case 'TIE':
        this.logWithStars("It's a tie this round!");
    }
  }

  displayGrandWinner(playerCards, dealerCards) {
    let result = this.detectResult(playerCards, dealerCards);

    switch (result) {
      case 'PLAYER_BUSTED':
        this.logWithStars('You are broke! Try again next time!');
        break;
      case 'DEALER_BUSTED':
        this.logWithStars('You became very rich!');
        break;
      case 'PLAYER':
        this.logWithStars('You became very rich!');
        break;
      case 'DEALER':
        this.logWithStars('You lost all your money! Try again next time!');
        break;
    }
  }

  grandWinner() {
    return (this.player.isRich() || this.player.isBroke());
  }

  displayWinner(playerCards, dealerCards) {
    if (this.grandWinner()) {
      this.displayGrandWinner(playerCards, dealerCards);
    } else {
      this.displayRoundWinner(playerCards, dealerCards);
    }
  }

  displayResult(playerCards, dealerCards) {
    this.displayAllCardsTotal(playerCards, dealerCards);
    this.updateDollars(playerCards, dealerCards);
    this.displayWinner(playerCards, dealerCards);
  }

  playAgain() {
    prompt('Play again? (y or n)');
    let answer = readline.question().toLowerCase();

    while (!['y', 'n'].includes(answer)) {
      prompt('please enter y or n');
      answer = readline.question().toLowerCase();
    }
    if (answer === 'y') console.clear();
    return answer === 'y';
  }

  hitOrStay() {
    let answer;
    while (true) {
      prompt('hit or stay?');
      answer = readline.question().toLowerCase();
      if (['h', 's'].includes(answer)) break;
      prompt('Please enter a valid answer: h or s');
    }
    return answer;
  }

  playerTurn(playerCards, dealerCards) {
    while (true) {
      this.showInitialCards(playerCards, dealerCards);
      let answer = this.hitOrStay();
      if (answer === 'h') {
        this.player.hit(this.deck.pop());
        console.log('-----------------');
        console.log('You decided to hit!\n');
      }

      if (answer === 's' || this.player.busted(playerCards)) break;
    }
    if (this.player.busted(playerCards)) {
      this.displayResult(playerCards, dealerCards);
      return (this.grandWinner() || this.playAgain());
    } else {
      console.log('-----------------');
      console.log('You decided to stay.\n');
    }
  }

  dealerTurn(playerCards, dealerCards) {
    console.log('Dealer turn...');
    while (Deck.TOTAL(dealerCards) < 17) {
      prompt('Dealer hits!\n');
      this.dealer.hit(this.deck.pop());
    }

    if (this.dealer.busted(dealerCards)) {
      this.displayResult(playerCards, dealerCards);
      return (this.grandWinner() || this.playAgain());
    }
  }

  displayWelcomeMessage() {
    let welcomeStr = 'Welcome to the game of Twenty-One.';
    welcomeStr = `\n${welcomeStr.padStart(welcomeStr.length + 5)}`;
    let numDollarStr = 'You get 1$ for each win. Lose 1$ for each loss.';
    numDollarStr = `${numDollarStr.padStart(numDollarStr.length + 2)}\n`;

    console.clear();
    console.log(welcomeStr);
    console.log('Become rich when you reach $10. Don\'t lose all your money!');
    console.log(numDollarStr);
  }

  displayGoodbyeMessage() {
    prompt('Thanks for playing Twenty One. See you next time!');
  }
}

let game = new TwentyOneGame();
game.start();