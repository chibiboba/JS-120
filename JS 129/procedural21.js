const readline = require('readline-sync');
const SUITS = ['Heart', 'Diamond', 'Spade', 'Club'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Joker', 'Queen', 'King', 'Ace'];

function prompt(text) {
  console.log(`=> ${text}`);
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
    [array[index], array[otherIndex]] = [array[otherIndex], array[index]]; // swap elements
  }

  return array;
}

function initializeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    let suit = SUITS[suitIndex];

    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex++) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }

  return shuffle(deck);
}

function popTwoFromDeck(deck) { // popping two cards from deck
  return [deck.pop(), deck.pop()]; // extra [] brackets here since we are popping two cards from deck
}

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "Ace") {
      sum += 11;
    } else if (['Joker', 'Queen', 'King'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "Ace").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function hand(cards) {
  return cards.map(card => `${card[0]}${card[1]}`).join(' ');
}

function busted(cards) {
  return total(cards) > 21;
}

// returns result of game
function detectResult(playerCards, dealerCards) {
  let playerTotal = total(playerCards);
  let dealerTotal = total(dealerCards);

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
// logs the game result to console
function displayResults(playerCards, dealerCards) {
  let result = detectResult(playerCards, dealerCards);

  switch (result) {
    case 'PLAYER_BUSTED':
      prompt('You busted! Dealer wins!');
      break;
    case 'DEALER_BUSTED':
      prompt('Dealer busted! You win!');
      break;
    case 'PLAYER':
      prompt('You win!');
      break;
    case 'DEALER':
      prompt('Dealer wins!');
      break;
    case 'TIE':
      prompt("It's a tie!");
  }
}

function playAgain() {
  console.log('-------------');
  let answer = readline.question('Do you want to play again? (y or n)');
  return answer.toLowerCase()[0] === 'y';
}

while (true) {
  let deck = initializeDeck(); // Initialize deck

  // Deal cards to player and dealer
  // initial deal
  let playerCards = [];
  let dealerCards = [];
  playerCards.push(...popTwoFromDeck(deck)); // spread syntax because we don't want the extra [] brackets
  dealerCards.push(...popTwoFromDeck(deck));
  prompt(`Dealer has ${dealerCards[0]} and ?`);
  prompt(`You have: ${playerCards[0]} and ${playerCards[1]} for a total of ${total(playerCards)} `);

  while (true) {
    let playerChoice;
    // Player turn: hit or stay
    //   - repeat until bust or stay
    while (true) {
      prompt('Would you like to (h)it or (s)tay?');
      playerChoice = readline.question().toLowerCase();
      if (['h','s'].includes(playerChoice)) break;
      prompt(`Sorry, must enter 'h' or 's'.`);
    }

    if (playerChoice === 'h') {
      playerCards.push(deck.pop()); // pop one card from deck, don't need spread syntax
      prompt('You chose to hit!');
      prompt(`Your cards are now: ${hand(playerCards)}`);
      prompt(`Your total is now: ${total(playerCards)}`);
    }

    if (playerChoice === 's' || busted(playerCards)) break;
  }

  // If player bust, dealer wins --> display result
  // - ask to play again
  if (busted(playerCards)) {
    displayResults(playerCards, dealerCards);
    if (playAgain()) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`You stayed at ${total(playerCards)}`);
  }

  // Dealer turn: hit or stay
  // display results
  //   - repeat until total >= 17
  prompt('Dealer turn...');
  while (total(dealerCards) < 17) {
    prompt('Dealer hits!');
    dealerCards.push(deck.pop());
    prompt(`Dealer cards are now: ${hand(dealerCards)}`);
  }

  // If dealer busts, player wins --> display result
  // - ask to play again
  if (busted(dealerCards)) {
    prompt(`Dealer total is now: ${total(dealerCards)}`);
    displayResults(playerCards, dealerCards);
    if (playAgain()) {
      continue;
    } else {
      break;
    }
  } else {
    prompt(`Dealer stays at ${total(dealerCards)}`);
  }
  // Compare cards and declare winner.
  console.log('==============');
  prompt(`Dealer has ${dealerCards.join(' ')} for a total of: ${total(dealerCards)}`);
  prompt(`Player has ${playerCards.join(' ')} for a total of: ${total(playerCards)}`);
  console.log('==============');

  displayResults(dealerCards, playerCards);

  if (!playAgain()) break;
}