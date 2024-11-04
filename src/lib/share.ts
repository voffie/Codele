import { type Language, solution } from "./languages";

export function generateTwitterShareURI(guesses: Language[]) {
  if (!guesses) return;

  return `https://twitter.com/intent/tweet?text=${encodeURI(generateShareText(guesses) + "\n")}&url=http%3A%2F%2Fcodele-voffiee.vercel.app`;
}

export function generateEmojiGrid(guesses: Language[]) {
  const tiles = ["🟩", "🟥"];
  let output = "";

  guesses.map((guess) => {
    for (const key in guess) {
      if (key === "aliases") continue;

      output +=
        guess[key as keyof Language] === solution[key as keyof Language]
          ? tiles[0]
          : tiles[1];
    }
    output += "\n";
  });

  return output.trim();
}

export function generateShareText(guesses: Language[]) {
  return (
    `Codele: ${new Date(Date.now()).toLocaleDateString("en-GB")} ${guesses.length}/5\n` +
    generateEmojiGrid(guesses)
  );
}
