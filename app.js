let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const restart = document.querySelector('.restart');
let deck = document.getElementById('cards');
let nextCard = document.getElementById('next-card');
let checkWin = document.getElementsByClassName('matched');

let rightCards = [];

for (let card of deck.children) {
  rightCards.push(card.innerHTML.trim());
}

let reshuffleCards = function() {
  leftCardArray = [...rightCards];
  shuffle(rightCards);

  for (let x = 0; x < rightCards.length; x++) {
    deck.children[x].innerHTML = rightCards[x];
  }
}

reshuffleCards();

let compareCard = function (event) {
  if (event.target.classList.contains('card') && !event.target.classList.contains('matched')) {
    event.target.classList.add('show');

    if (nextCard.innerHTML === event.target.innerHTML.trim()) {
      event.target.classList.add('matched');
      nextCard.innerHTML = leftCardArray.pop();
    }
  }

  setTimeout(function() {
    event.target.classList.remove('show');
  }, 300);

  if (checkWin.length === rightCards.length) {
    alert(`You Won!!!! on ${score.textContent} attempts!`)
  }
}

let trackAttempts = function(e) {
  if (e.target.classList.contains('card') && !e.target.classList.contains('matched')) {
    score.textContent = Number(score.textContent) + 1
  }
}

let refresh = function(events) {
  if (events.target.classList.contains('restart') || events.target.classList.contains('fa-redo')) {

    for (li of deck.children) {
      li.classList.remove('matched');
    }

    reshuffleCards();
    score.textContent = 0;
  }
}

deck.addEventListener('click', compareCard);
restart.addEventListener('click', refresh);
deck.addEventListener('click', trackAttempts);