import { createContext, useEffect, useState, type ReactNode } from "react";
import { getLanguageData, solution, type Language } from "../lib/languages";
import {
  fetchGameFromLocalStorage,
  writeGameToLocalStorage,
} from "../lib/localStorage";
import { errorToast, successToast } from "../components/Alerts/Alert";

interface GuessContextType {
  guesses: Language[];
  isGameWon: boolean;
  isGameLost: boolean;
  solution: Language;
  handleGuess?: (input: string) => void;
}

export const GuessContext = createContext<GuessContextType>({
  guesses: [] as Language[],
  isGameWon: false,
  isGameLost: false,
  solution: solution,
});

export function GuessProvider({ children }: { children: ReactNode }) {
  const [guesses, setGuesses] = useState<Language[]>(() => {
    const loaded = fetchGameFromLocalStorage();
    if (loaded?.solution.name !== solution.name) {
      return [];
    }

    return loaded?.guesses;
  });

  const [isGameWon, setIsGameWon] = useState(
    guesses.some((guess) => guess.name === solution.name),
  );

  const [isGameLost, setIsGameLost] = useState(
    guesses.length === 5 &&
      !guesses.some((guess) => guess.name === solution.name),
  );

  useEffect(() => {
    writeGameToLocalStorage({
      guesses,
      solution,
    });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      successToast("You did it!");
      return;
    }
    if (isGameLost) {
      errorToast("You failed!");
      return;
    }
  }, [isGameWon, isGameLost]);

  function handleGuess(input: string) {
    if (isGameWon || isGameLost) {
      return;
    }

    const language = getLanguageData(input);

    if (!language) {
      return errorToast(`Unknown language: ${input}`);
    }

    if (guesses.some((guess) => guess.name === language.name)) {
      return errorToast(`Already guessed ${language.name}`);
    }

    setGuesses([...guesses, language]);

    if (solution.name.toLowerCase() === language.name.toLowerCase()) {
      successToast("You guessed the correct language!");
      return setIsGameWon(true);
    }

    if (guesses.length === 4) {
      errorToast("You lost!");
      return setIsGameLost(true);
    }
  }

  return (
    <GuessContext.Provider
      value={{ guesses, isGameWon, isGameLost, handleGuess, solution }}
    >
      {children}
    </GuessContext.Provider>
  );
}
