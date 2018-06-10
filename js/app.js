// List that holds all the cards
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube",
  "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"];

const board = document.querySelector('.deck');
const movesCounter = document.querySelector(".moves");
const restartBtn = document.querySelector(".restart");

let openCards = [];
let moves = 0;
let score = 0;
const scoreTotal = 8;

const starList = document.querySelector('.stars').children;
const star3 = starList[2].children[0];
const star2 = starList[1].children[0];
const star1 = starList[0].children[0];

let timer, time;
let seconds = 0;
let minutes = 0;

const timerNode = document.querySelector(".timer");
const scorePanel = document.querySelector(".score-panel");
let initialClick = 0;

// Starts Game
function startGame() {
  initGame();
  let currentCards = document.querySelectorAll(".card");
  flip(currentCards);
}

// Creates a new set of shuffled cards on the deck
function initGame() {
  score = 0;
  initialClick = 0;
  timerNode.textContent = "0:00";
  clearTimer();
  resetMovesCounter();
  resetStarList();

  // Generates an array of cards
  const cardsArray = cards.map(function(card) {
    return generateCard(card);
  });

  // Displays cards on board
  board.innerHTML = shuffle(cardsArray).join("");
}

// Creates the HTML for the card with symbol
function generateCard(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

// Resets moves counter to 0
function resetMovesCounter() {
  moves = 0;
  movesCounter.textContent = moves;
}

// Resets back to 3 stars
function resetStarList() {
  star3.classList = "";
  star3.classList.add("fa","fa-star");
  star2.classList = "";
  star2.classList.add("fa","fa-star");
  star1.classList = "";
  star1.classList.add("fa","fa-star");
}

// Adds flip functionality and gameplay logic to each card
function flip(currentCards) {
  currentCards.forEach(function(card) {
    card.addEventListener("click", function() {

      // Ensures we're only able to click only once on cards
      if (card.classList.length === 1) {

        // increments click to prevent timer from constantly running
        initialClick++;

        // Only allows for 2 cards to be revealed
        if (openCards.length < 2) {
          openCards.push(card);
          card.classList.add("open", "show");
        }

        // Now that we have 2 cards selected, we check to see if they match otherwise re-hide them
        if (openCards.length === 2) {
          incrementMoves();
          decrementStar(moves);
          // checks to see if the cards are matching based on their font-awesome icon
          if (openCards[0].children[0].className === openCards[1].children[0].className) {
            matchCards(openCards);
            openCards = [];
          } else { // If not matched, hides the cards again after 1sec delay
            setTimeout(function() {
              openCards.forEach(function(card) {
                card.classList.remove("open", "show");
              });
              openCards = [];
            }, 1000);
          }
        }
      }

      // Win condition once all 8 pairs have matched
      if (score === scoreTotal) {
        board.innerHTML = "You Win"
        clearTimer();
      }

      // Starts timer on initial click of card
      if (initialClick === 1) {
        setTimer();
      }
    });
  });
}

// Decements the star counter
function decrementStar(moves) {
    switch(moves) {
      case 10:
        star3.classList = "";
        star3.classList.add("fa","fa-star-o");
        break;
      case 20:
        star2.classList = "";
        star2.classList.add("fa","fa-star-o");
        break;
    }
}

// Add 'match' class to each card
function matchCards(openCards) {
  score++;
  openCards.forEach(function(card) {
    card.classList.add("match");
  });
}

// Increments the number of player moves
function incrementMoves() {
  moves++;
  movesCounter.textContent = moves;
}

// Starts timer
function setTimer(){
  console.log("Timer has been started!")
  timer = setInterval(function() {
    seconds++;
    if (seconds <= 9) {
      seconds = "0" + seconds;
    }
    if (seconds === 60) {
      seconds = "00";
      minutes++;
    }
    time = `${minutes}:${seconds}`;
    timerNode.textContent = time;
    console.log(`${minutes}:${seconds}`)
  }, 1000);
}

// Stops timer
function clearTimer() {
  seconds = 0;
  minutes = 0;
  clearInterval(timer);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  console.log("cards shuffled");
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Pressing the restart button restarts the game
restartBtn.addEventListener("click", startGame);

// Begins game
startGame();
