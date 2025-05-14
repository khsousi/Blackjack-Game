// Blackjack game

// Player Object
let player = {
  name: "",
  chips: 100
}

// Variables
let randomCards = ["A",2,3,4,5,6,7,8,9,10,11,"J","Q","K"];
let firstCard;
let secondCard;
let cards = [];
let sum = 0;
let hasBlackJack;
let isAlive;
let score = 0;
let message = "";
let trys = 0;


// DOM elements
const startEl = document.querySelector(".start-btn");
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const newCardEl = document.querySelector(".new-card-btn");
const playerEl = document.getElementById("player-el");
    playerEl.textContent = `${player.name}: $${player.chips}`;
const tryEl = document.querySelector("#try-el");


// Event listeners
startEl.addEventListener("click", startGame);
newCardEl.addEventListener("click", newCard);
newCardEl.classList.add("disabled");
setPlayerName();

// Functions
// Set player name and chips
function setPlayerName() {
  let playerName = window.prompt("Enter Your Name");
  if (playerName) {
    player.name = playerName;
    playerEl.textContent = `${player.name} : $ ${player.chips}`;
  } else {
    player.name = "Player";
    playerEl.textContent = `${player.name} : $ ${player.chips}`;
  }
}

// Start the game
function startGame() {
  firstCard = getRandomCard();
  secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;
  isAlive = true;
  hasBlackJack = false;
  trys += 1;
  tryEl.textContent = `Attempts Count: ${trys}`;
  renderGame();
}

// Render the game
function renderGame() {
  if(sum <= 20) {
    message = "Do you want to draw a new card?";
    newCardEl.classList.remove("disabled");
    startEl.classList.add("disabled");
    document.querySelector(".start-btn").disabled = true;
  } else if (sum === 21) {
    hasBlackJack = true;
    player.chips += 10;
    playerEl.textContent = `${player.name} : $ ${player.chips}`;
    message = "You have a Blackjack!";
    newCardEl.classList.add("disabled");
    startEl.classList.remove("disabled");
    document.querySelector(".start-btn").disabled = false;
  } else {
    message = "You are out of the game!";
    player.chips -= 1;
    playerEl.textContent = `${player.name} : $ ${player.chips}`;
    newCardEl.classList.add("disabled");
    startEl.classList.remove("disabled");
    document.querySelector(".start-btn").disabled = false;
    isAlive = false;
}
  messageEl.textContent = message;
  messageEl.classList.add("bold");
  sumEl.textContent  = `Sum: ${sum}`;
  sumEl.classList.add("bold");
  cardsEl.textContent  = `Cards : `;
  for (let i = 0; i< cards.length; i++){
    if (cards[i] === 1) {
      cards[i] = 11;
      cardsEl.textContent += ` ${cards[i]} `
    }else if (cards[i] === "K" || cards[i] === "Q" || cards[i] === "J") {
      cards[i] = 10;
      cardsEl.textContent += ` ${cards[i]} `
    }else {cardsEl.textContent += ` ${cards[i]} `}
  }
}


// Add a new card
function newCard() {
  if (isAlive === true && hasBlackJack === false) {
      let card = getRandomCard();
      sum += card;
      cards.push(card);
      renderGame();
  }
}

// Get a random card
function getRandomCard() {
  let randomIndex = Math.floor(Math.random() * randomCards.length);
  if (randomCards[randomIndex] === "A") {
    return 11;
  }else if (randomCards[randomIndex] === "K" || randomCards[randomIndex] === "Q" || randomCards[randomIndex] === "J") {
    return 10;
  }else {return randomCards[randomIndex]}
}


