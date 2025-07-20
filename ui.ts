
// ui.ts
import { COLORS } from './constants';
import { checkBtn, guessEl, messageEl, scoreEl, secretNumberEl } from './doms';
import { displayMessage } from './utility';

export function resetGameUI(currentScore: number): void {
  displayMessage(messageEl, "Start guessing...");
  secretNumberEl.textContent = "?";
  guessEl.value = "";
  checkBtn.disabled = false;
  document.body.style.backgroundColor = COLORS.default;
  secretNumberEl.style.width = '15rem';
  scoreEl.textContent = currentScore.toString();
}
export function setWinUI(guess: number) {
  displayMessage(messageEl, "🎉 Correct Number!");
  secretNumberEl.textContent = guess.toString();
  secretNumberEl.style.width = '30rem';
  document.body.style.backgroundColor = COLORS.success;
  checkBtn.disabled = true;
}

export function setLoseUI() {
  displayMessage(messageEl, "💥 You lost the game!");
  scoreEl.textContent = '0';
  document.body.style.backgroundColor = COLORS.failure;
  checkBtn.disabled = true;
}