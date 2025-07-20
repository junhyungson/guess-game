'use strict'

// === Element Selectors ===
const messageEl = document.querySelector('.message') as HTMLElement;
const secretNumberEl = document.querySelector('.secretNumber') as HTMLElement;
const guessEl = document.querySelector('.guess') as HTMLInputElement;
const scoreEl = document.querySelector('.score') as HTMLElement;
const highscoreEl = document.querySelector('.highscore') as HTMLElement;
const checkBtn = document.querySelector('.check') as HTMLButtonElement;
const againBtn = document.querySelector('.again') as HTMLElement;



// === Constants ===
const INITIAL_SCORE = 20;
const MIN_NUMBER = 1;
const MAX_NUMBER = 20;
const COLORS = {
  success: '#60b347',
  failure: '#8b0000',
  default: '#222'
};
// === Game State ===
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = INITIAL_SCORE
let highscore = 0;

// UTILITY FUNCTIONS
function displayMessage(msg: string): void {
  messageEl.textContent = msg
}

function resetGameUI() {
  displayMessage("Start guessing...");
  secretNumberEl.textContent = "?";
  guessEl.value = "";
  checkBtn.disabled = false;
  document.body.style.backgroundColor = COLORS.default;
  secretNumberEl.style.width = '15rem';
  scoreEl.textContent = score.toString();
}
function setWinUI(guess: number) {
  displayMessage("🎉 Correct Number!");
  secretNumberEl.textContent = guess.toString();
  secretNumberEl.style.width = '30rem';
  document.body.style.backgroundColor = COLORS.success;
  checkBtn.disabled = true;
}

function setLoseUI() {
  displayMessage("💥 You lost the game!");
  scoreEl.textContent = '0';
  document.body.style.backgroundColor = COLORS.failure;
  checkBtn.disabled = true;
}
function getValidatedGuess(): number | null {
  const rawInput = guessEl.value.trim();
  const guess = Number(rawInput);

  if (!rawInput || isNaN(guess)) {
    displayMessage("Please enter a valid number!");
    return null;
  }

  if (!Number.isInteger(guess)) {
    displayMessage("Only whole numbers are allowed!");
    return null;
  }

  if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
    displayMessage("Guess must be between 1 and 20.");
    return null;
  }

  return guess;
}


function handleGuess(guess: number): void {
  if (guess === secretNumber) {
    setWinUI(guess);

    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore.toString();
    }
  } else {
    score--;
    if (score > 0) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      scoreEl.textContent = score.toString();
    } else {
      setLoseUI();
    }
  }
}

checkBtn.addEventListener("click", function () {
  const guess = getValidatedGuess();
  if (guess !== null) {
    handleGuess(guess);
  }
});


againBtn.addEventListener("click", function () {
  secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + 1;
  score = INITIAL_SCORE
  resetGameUI();

  console.log(secretNumber);
});