import { Theme } from "../context/ThemeContext";
import type { Language } from "./languages";

export type StoredState = {
  guesses: Language[];
  solution: Language;
};

export function writeGameToLocalStorage(state: StoredState) {
  localStorage.setItem("gameState", JSON.stringify(state));
}

export function fetchGameFromLocalStorage() {
  const currentState = localStorage.getItem("gameState");
  return currentState ? (JSON.parse(currentState) as StoredState) : null;
}

export function writeThemeToLocalStorage(theme: Theme) {
  localStorage.setItem("theme", JSON.stringify(theme));
}

export function fetchThemeFromLocalStorage() {
  const currentTheme = localStorage.getItem("theme");
  return currentTheme ? JSON.parse(currentTheme) : null;
}
