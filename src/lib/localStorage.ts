import { Language } from "./languages";

export type StoredState = {
  guesses: Language[];
  solution: Language;
};

export const writeGameToLocalStorage = (state: StoredState) => {
  localStorage.setItem("gameState", JSON.stringify(state));
};

export const fetchGameFromLocalStorage = () => {
  const currentState = localStorage.getItem("gameState");
  return currentState ? (JSON.parse(currentState) as StoredState) : null;
};

export type GameStats = {
  winDistribution: number[];
  gamesFailed: number;
  currentStreak: number;
  bestStreak: number;
  totalGames: number;
  successRate: number;
};

export const writeStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem("gameStats", JSON.stringify(gameStats));
};

export const fetchStatsFromLocalStorage = () => {
  const stats = localStorage.getItem("gameStats");
  return stats ? (JSON.parse(stats) as GameStats) : null;
};
