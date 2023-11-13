import { addDays, differenceInDays, startOfDay } from "date-fns";

import { LANGUAGES } from "../constants/languages";
import { getToday } from "./dateutils";

export type Language = {
  name: string;
  releaseYear: number | string;
  compiled: boolean;
  objectOriented: boolean;
};

export const firstGameDate = new Date(2023, 0);
export const periodInDays = 1;

export const isLanguageInLanguageList = (language: string) => {
  return LANGUAGES.find(
    (item) => item.name.toLowerCase() === language.toLowerCase()
  )
    ? true
    : false;
};

export const isWinningLanguage = (language: string) => {
  return solution.name === language;
};

export const getGuessData = (guess: string) => {
  return LANGUAGES.find(
    (item) => item.name.toLowerCase() === guess.toLowerCase()
  );
};

export const getLastGameDate = (today: Date) => {
  const t = startOfDay(today);
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays;
  return addDays(t, -daysSinceLastGame);
};

export const getNextGameDate = (today: Date) => {
  return addDays(getLastGameDate(today), periodInDays);
};

export const getIndex = (gameDate: Date) => {
  let start = firstGameDate;
  let index = -1;
  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);

  return index;
};

export const getLanguageOfTheDay = (index: number) => {
  if (index < 0) {
    throw new Error("Invalid index");
  }

  return LANGUAGES[index % LANGUAGES.length];
};

export const getSolution = (gameDate: Date) => {
  const nextGameDate = getNextGameDate(gameDate);
  const index = getIndex(gameDate);
  const languageOfTheDay = getLanguageOfTheDay(index);
  return {
    solution: languageOfTheDay,
    solutionGameDate: gameDate,
    tomorrow: nextGameDate.valueOf(),
  };
};

export const { solution, solutionGameDate, tomorrow } = getSolution(getToday());
