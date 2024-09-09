import { type Language, solution } from "./languages";

export function shareStatus(guesses: Language[]) {
  if (!guesses) return;

  return `https://twitter.com/intent/tweet?text=${generateTwitterShareUri(guesses)}&url=http%3A%2F%2Fcodele-voffiee.vercel.app`;
}

export function generateEmojiGrid(guesses: Language[]) {
  const tiles = ["🟩", "🟥"];

  return guesses.map((guess) => {
    return guess.name === solution.name ? tiles[0] : tiles[1];
  });
}

export function generateTwitterShareUri(guesses: Language[]) {
  return encodeURI(
    `Codele: ${new Date(Date.now()).toLocaleDateString("en-GB")} ${guesses.length}/5\n` +
      generateEmojiGrid(guesses).join("") +
      "\n",
  );
}
