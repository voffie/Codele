import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Terminal } from "./components/Terminal";
import { Language, getLanguageData, solution } from "./lib/languages";
import { useEffect, useState } from "react";
import {
  fetchGameFromLocalStorage,
  writeGameToLocalStorage,
} from "./lib/localStorage";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "./components/Alerts/Alert";

const App = () => {
  const [guesses, setGuesses] = useState<Language[]>(() => {
    const loaded = fetchGameFromLocalStorage();
    if (loaded?.solution.name !== solution.name) {
      return [];
    }

    return loaded?.guesses;
  });

  const [command, setCommand] = useState(
    guesses.length > 0 ? ":guess" : ":info",
  );
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
    }
    if (isGameLost) {
      errorToast("You failed!");
    }
  }, [isGameWon, isGameLost]);

  function handleGuess(data: string) {
    setCommand(":guess");

    if (isGameWon || isGameLost) {
      return;
    }

    const language = getLanguageData(data);

    if (!language) {
      return errorToast(`Unkown language: ${data}`);
    }

    if (guesses.filter((guess) => guess.name === language.name).length === 1) {
      return errorToast(`Already guessed ${language.name}`);
    }

    setGuesses([...guesses, language]);

    if (solution.name.toLowerCase() === language.name.toLowerCase()) {
      successToast("You guessed the correct language!");
      return setIsGameWon(true);
    }

    if (guesses.length === 4) {
      errorToast("You lost!");
      setIsGameLost(true);
    }
  }

  return (
    <main
      className="flex flex-col overflow-hidden bg-base text-text"
      style={{ height: window.innerHeight }}
    >
      <Header />
      <Terminal
        guesses={guesses}
        currentCommand={command}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
      />
      <Footer
        guesses={guesses}
        handleGuess={handleGuess}
        setCommand={setCommand}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
      />
      <Toaster
        position="top-right"
        toastOptions={{ className: "", duration: Infinity }}
        gutter={15}
      />
    </main>
  );
};

export default App;
