// List that holds all the cards
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube",
  "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"
]

const board = document.querySelector('.deck');

// Creates a new set of shuffled cards on the deck
function initGame() {


  const cardsArray = cards.map(function(card) {
    return generateCard(card);
  });

  board.innerHTML = shuffle(cardsArray).join("");
}

function generateCard(card) {
  return `<li class="card"><i class="fa ${card}"></i></li>`;
}

initGame();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let currentCards = document.querySelectorAll(".card");
// currentCards = Array.from(currentCards);

let openCards = [];
let moves = 8;
let score = 0;
const movesCounter = document.querySelector(".moves");

// Adds flip functionality to each card
function flip(currentCards) {

  currentCards.forEach(function(card) {
    card.addEventListener("click", function() {

      // Ensures we're only able to click only once on cards
      if (card.classList.length === 1) {

        // Only allows for 2 cards to be revealed
        if (openCards.length < 2) {
          openCards.push(card);
          card.classList.add("open", "show");
          incrementMoves();
          decrementStar(moves);
          console.log(openCards);
          console.log("card child ", card.children[0].className);
        }

        // now that we have 2 cards selected, we check to see if they match otherwise re-hide them
        if (openCards.length === 2) {
          // checks to see if the cards are matching based on their font-awesome icon
          if (openCards[0].children[0].className === openCards[1].children[0].className) {
            matchCards(openCards);
            openCards = [];
            // if not matched, hides the cards again after 1sec delay
          } else {
            setTimeout(function() {
              openCards.forEach(function(card) {
                card.classList.remove("open", "show");
              });
              openCards = [];
              console.log("classes for non-matching cards have been removed")
            }, 1000);
          }
        }

      }

      if (score === 8) {
        board.innerHTML = "You Win"
      }



    });
  });
}

const starList = document.querySelector('.stars');

const star3 = starList.children[2].children[0];
const star2 = starList.children[1].children[0];
const star1 = starList.children[0].children[0];

function decrementStar(moves) {
    switch(moves) {
      case 10:
        star3.classList.remove("fa", "fa-star");
        star3.classList.add("fa","fa-star-o");
        break;
      case 20:
        star2.classList.remove("fa", "fa-star");
        star2.classList.add("fa","fa-star-o");
        break;
      case 30:
        star1.classList.remove("fa", "fa-star");
        star1.classList.add("fa","fa-star-o");
        break;
    }
}


// Add 'match' class to each card
function matchCards(openCards) {
  console.log("Its a match!");
  score++;
  console.log("score: ", score);
  openCards.forEach(function(card) {
    card.classList.add("match");
  });
}

// Increments the number of player moves
function incrementMoves() {
  moves++;
  movesCounter.textContent = moves;
}

flip(currentCards);


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



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
