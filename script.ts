// script.ts
import { INITIAL_SCORE, MAX_NUMBER } from './constants';
// Uncaught SyntaxError: Cannot use import statement outside a module (at script.ts:1:1)
import { againBtn, checkBtn, guessEl, highscoreEl, messageEl, scoreEl } from './doms';
import { resetGameUI, setLoseUI, setWinUI } from './ui';
import { displayMessage, getValidatedGuess } from './utility';

let secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + 1;
let score = INITIAL_SCORE;
let highscore = 0;

function handleGuess(guess: number) {
  if (guess === secretNumber) {
    setWinUI(guess);
    if (score > highscore) {
      highscore = score;
      highscoreEl.textContent = highscore.toString();
    }
  } else {
    score--;
    if (score > 0) {
      displayMessage(messageEl, guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      scoreEl.textContent = score.toString();
    } else {
      setLoseUI();
    }
  }
}

checkBtn.addEventListener("click", () => {
  const guess = getValidatedGuess(guessEl, messageEl);
  if (guess !== null) handleGuess(guess);
});

againBtn.addEventListener("click", () => {
  secretNumber = Math.trunc(Math.random() * MAX_NUMBER) + 1;
  score = INITIAL_SCORE;
  resetGameUI(score);
});
