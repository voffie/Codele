import { type Language, solution } from "./languages";

export function shareStatus(guesses: Language[]) {
  if (!guesses) return;

  return (
    `Codele ${new Date(Date.now()).toLocaleDateString("en-GB")}\n` +
    generateEmojiGrid(guesses).join("")
  );
}

export function generateEmojiGrid(guesses: Language[]) {
  const tiles = ["🟩", "🟥"];

  return guesses.map((guess) => {
    return guess.name === solution.name ? tiles[0] : tiles[1];
  });
}
