import { MAX_NUMBER, MIN_NUMBER } from "./constants";

export function displayMessage(messageEl: HTMLElement, msg: string): void {
  messageEl.textContent = msg;
}

export function getValidatedGuess(
  /*
  get  user input and validate between 1 and 20, and is a number
  */
  guessEl: HTMLInputElement,
  messageEl: HTMLElement
): number | null {
  const rawInput = guessEl.value.trim();
  const guess = Number(rawInput);

  if (!rawInput || isNaN(guess)) {
    displayMessage(messageEl, "Please enter a valid number!");
    return null;
  }

  if (!Number.isInteger(guess)) {
    displayMessage(messageEl, "Only whole numbers are allowed!");
    return null;
  }

  if (guess < MIN_NUMBER || guess > MAX_NUMBER) {
    displayMessage(messageEl, "Guess must be between 1 and 20.");
    return null;
  }

  return guess;
}
