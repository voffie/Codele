import { addDays, startOfToday } from "date-fns";
import { LANGUAGES } from "../constants/languages";

export type Language = {
  name: string;
  releaseYear: number | string;
  compiled: boolean;
  objectOriented: boolean | string;
  typed: string;
  aliases?: string[];
};

export function getLanguageData(guess: string): Language | undefined {
  return LANGUAGES.find(
    (language) =>
      language.name.toLowerCase() === guess.toLowerCase() ||
      language.aliases?.includes(guess.toLowerCase()),
  );
}

function getLanguageOfTheDay() {
  const currentDate = new Date().getTime();
  const daysSinceEpoch =
    Math.floor(currentDate / (1000 * 60 * 60 * 24)) % 10000;
  const randomValue = Math.abs(Math.sin(daysSinceEpoch));
  const index = Math.floor(randomValue * LANGUAGES.length);

  return LANGUAGES[index];
}

function getSolution() {
  const nextGameDate = addDays(startOfToday(), 1);
  const languageOfTheDay = getLanguageOfTheDay();
  return {
    solution: languageOfTheDay,
    tomorrow: nextGameDate.valueOf(),
  };
}

export function closestLanguage(input: string) {
  for (const term of LANGUAGES) {
    if (term.name.toLowerCase().startsWith(input)) return term.name;
  }
  return "";
}

export const { solution, tomorrow } = getSolution();
