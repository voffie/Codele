import { DataItem } from "./data";

export type StoredState = {
  guesses: DataItem[];
  date: string;
};

export const fetchLocalStorage = () => {
  const currentState = localStorage.getItem("gameState");

  return currentState ? (JSON.parse(currentState) as StoredState) : null;
};

export const writeLocalStorage = (state: StoredState) => {
  localStorage.setItem("gameState", JSON.stringify(state));
};
