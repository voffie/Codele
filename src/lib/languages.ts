import { addDays, differenceInDays, startOfDay } from "date-fns";

import { LANGUAGES } from "../constants/languages";
import { getToday } from "./dateutils";

export type Language = {
  name: string;
  releaseYear: number | string;
  compiled: boolean;
  objectOriented: boolean | string;
  typed: string;
};

const firstGameDate = new Date(2023, 0);
const periodInDays = 1;

export const isLanguageInLanguageList = (language: string) => {
  return LANGUAGES.find(
    (item) => item.name.toLowerCase() === language.toLowerCase(),
  )
    ? true
    : false;
};

export const isWinningLanguage = (language: string) => {
  return solution.name.toLowerCase() === language.toLowerCase();
};

export const getGuessData = (guess: string) => {
  return LANGUAGES.find(
    (item) => item.name.toLowerCase() === guess.toLowerCase(),
  );
};

const getLastGameDate = (today: Date) => {
  const t = startOfDay(today);
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays;
  return addDays(t, -daysSinceLastGame);
};

const getNextGameDate = (today: Date) => {
  return addDays(getLastGameDate(today), periodInDays);
};

const getIndex = (gameDate: Date) => {
  let start = firstGameDate;
  let index = -1;
  do {
    index++;
    start = addDays(start, periodInDays);
  } while (start <= gameDate);

  return index;
};

const getLanguageOfTheDay = (index: number) => {
  if (index < 0) {
    throw new Error("Invalid index");
  }

  return LANGUAGES[index % LANGUAGES.length];
};

const getSolution = (gameDate: Date) => {
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
