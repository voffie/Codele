import { addDays, differenceInDays, startOfDay, startOfToday } from "date-fns";
import { LANGUAGES } from "../constants/languages";

export type Language = {
  name: string;
  releaseYear: number | string;
  compiled: boolean;
  objectOriented: boolean | string;
  typed: string;
  aliases?: string[];
};

const firstGameDate = new Date(2023, 0);
const periodInDays = 1;

export function getLanguageData(guess: string): Language | undefined {
  return LANGUAGES.find(
    (language) =>
      language.name.toLowerCase() === guess.toLowerCase() ||
      language.aliases?.includes(guess.toLowerCase()),
  );
}

function getLastGameDate(today: Date) {
  const t = startOfDay(today);
  return addDays(t, -differenceInDays(firstGameDate, t) % periodInDays);
}

function getNextGameDate(today: Date) {
  return addDays(getLastGameDate(today), periodInDays);
}

function getIndex(gameDate: Date) {
  let start = firstGameDate;
  let index = -1;
  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);

  return index;
}

function getLanguageOfTheDay(index: number) {
  if (index < 0) {
    throw new Error("Invalid index");
  }

  return LANGUAGES[index % LANGUAGES.length];
}

function getSolution(gameDate: Date) {
  const nextGameDate = getNextGameDate(gameDate);
  const index = getIndex(gameDate);
  const languageOfTheDay = getLanguageOfTheDay(index);
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

export const { solution, tomorrow } = getSolution(startOfToday());
