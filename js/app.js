// List that holds all the cards
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
               "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube",
               "fa-leaf", "fa-leaf", "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"]

// Creates a new set of shuffled cards on the deck
function initGame() {
  const board = document.querySelector('.deck');

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
          console.log(openCards);
          console.log("card child ", card.children[0].className);
        }

        // now that we have 2 cards selected, we check to see if they match otherwise re-hide them
        if (openCards.length === 2) {
          // checks to see if the cards are matching based on their font-awesome icon
          if (openCards[0].children[0].className === openCards[1].children[0].className) {
            openCards[0].classList.add("match");
            openCards[1].classList.add("match");
            console.log("Its a match!");
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


    });
  });
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