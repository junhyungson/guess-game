'use strict'

// === Element Selectors ===
const messageEl = document.querySelector('.message') as HTMLElement;
const secretNumberEl = document.querySelector('.secretNumber') as HTMLElement;
const guessEl = document.querySelector('.guess') as HTMLInputElement;
const scoreEl = document.querySelector('.score') as HTMLElement;
const highscoreEl = document.querySelector('.highscore') as HTMLElement;
const checkBtn = document.querySelector('.check') as HTMLButtonElement;
const againBtn = document.querySelector('.again') as HTMLElement;

// === Game State ===
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// secretNumberEl.textContent = secretNumber.toString()

console.log(secretNumber)
checkBtn.addEventListener("click", function () {
  const guess = Number(guessEl.value.trim());

  // === 1. Input Validation ===
  if (!guessEl.value.trim() || isNaN(guess)) {
    messageEl.textContent = `Please enter a valid number!`;
    return;
  }

  if (!Number.isInteger(guess)) {
    messageEl.textContent = "Only whole numbers are allowed!";
    return;
  }

  if (guess < 1 || guess > 20) {
    messageEl.textContent = "Guess must be between 1 and 20.";
    return;
  }

  // === 2. Game Logic ===
  if (guess === secretNumber) {
    messageEl.textContent = "🎉 Correct Number!";
    secretNumberEl.textContent = guess.toString();
    document.body.style.backgroundColor = '#60b347'; // success green
    secretNumberEl.style.width = '30rem';
    checkBtn.disabled = true;

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = score.toString();
    }
    return;
  }

  // === 3. Wrong Guess ===
  score--;
  if (score > 0) {
    messageEl.textContent = guess > secretNumber ? "📈 Too high!" : "📉 Too low!";
    scoreEl.textContent = score.toString();
  } else {
    messageEl.textContent = "💥 You lost the game!";
    scoreEl.textContent = '0';
    document.body.style.backgroundColor = '#8b0000'; // lose red
  }
});

againBtn.addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  console.log(secretNumber);

  messageEl.textContent = "Start guessing...";
  secretNumberEl.textContent = "?";
  scoreEl.textContent = score.toString();
  guessEl.value = "";
  checkBtn.disabled = false;

  document.body.style.backgroundColor = '#222'; // reset bg
  secretNumberEl.style.width = '15rem'; // reset width if modified
});