import { fetchLocalStorage } from "./localStorage";
import data from "./languages.json";

const languages = data.languages;

export interface DataItem {
  name: string;
  creator: string | string[];
  releaseYear: number | string;
  compiled: boolean;
  objectOriented: boolean;
}

export const generateSolution = async () => {
  const userData = fetchLocalStorage();
  const date = new Date();
  const hash = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(
      `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`
    )
  );
  if (
    userData?.date !==
    `${date.getUTCDate()} ${date.getUTCMonth()} ${date.getUTCFullYear()}`
  ) {
    localStorage.clear();
  }
  return languages[new Uint16Array(hash)[0] % languages.length];
};

export const getGuessData = (guess: string) => {
  return languages.find(
    (item) => item.name.toLowerCase() === guess.toLowerCase()
  );
};
