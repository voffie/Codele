import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { FormProvider, useForm } from "react-hook-form";
import {
  Language,
  getGuessData,
  isLanguageInLanguageList,
  isWinningLanguage,
  solution,
} from "./lib/languages";
import {
  fetchGameFromLocalStorage,
  writeGameToLocalStorage,
} from "./lib/localStorage";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { InfoModal } from "./components/Modals/InfoModal";
import Div100vh from "react-div-100vh";
import { AlertContainer } from "./components/Alerts/AlertContainer";
import { useAlert } from "./context/AlertContext";
import { generateStats, loadStats } from "./lib/stats";
import { StatsModal } from "./components/Modals/StatsModal";
import { Combobox } from "@headlessui/react";
import { LANGUAGES } from "./constants/languages";

const App = () => {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [isGameWon, setIsGameWon] = useState(false);
  const [isUnlimited, setIsUnlimited] = useState(() => {
    const loaded = fetchGameFromLocalStorage();
    return loaded?.isUnlimited ? loaded?.isUnlimited : false;
  });
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [query, setQuery] = useState("");
  const [guesses, setGuesses] = useState<Language[]>(() => {
    const loaded = fetchGameFromLocalStorage();
    if (loaded?.solution.name !== solution.name) {
      return [];
    }
    const gameWasWon = loaded?.guesses.find(
      (item) => item.name === solution.name,
    )
      ? true
      : false;
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (!isUnlimited && loaded?.guesses.length === 5 && !gameWasWon) {
      setIsGameLost(true);
      showErrorAlert("Game over");
    }
    return loaded?.guesses;
  });

  const [stats, setStats] = useState(() => loadStats());

  useEffect(() => {
    if (!fetchGameFromLocalStorage()) {
      setTimeout(() => {
        setIsInfoModalOpen(true);
      }, 350);
    }
  });

  useEffect(() => {
    writeGameToLocalStorage({
      guesses,
      solution,
      isUnlimited,
    });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      const winMessages = ["Great Job!", "Awesome", "Well done!", "Congrats!"];
      const winMessage =
        winMessages[Math.floor(Math.random() * winMessages.length)];
      showSuccessAlert(winMessage, {
        onClose: () => setIsStatsModalOpen(true),
      });
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, 350);
    }
  }, [isGameWon, isGameLost, showSuccessAlert]);

  const filteredLanguages =
    query === ""
      ? LANGUAGES
      : LANGUAGES.filter(
          (lang) =>
            lang.name.toLowerCase().includes(query.toLowerCase()) ||
            lang.aliases?.includes(query.toLowerCase()),
        );

  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(() => {
    if (!isUnlimited && (isGameWon || isGameLost)) {
      return;
    }

    if (guesses.filter((guess) => guess.name === selectedLanguage).length === 1)
      return showErrorAlert(`Already guessed ${selectedLanguage}`);

    if (!isLanguageInLanguageList(selectedLanguage)) {
      return showErrorAlert("Language not found");
    }

    const winningLanguage = isWinningLanguage(selectedLanguage);
    const data = getGuessData(selectedLanguage);

    setGuesses([...guesses, data!]);
    setSelectedLanguage("");

    if (winningLanguage) {
      if (!isUnlimited) setStats(generateStats(stats, guesses.length));
      return setIsGameWon(true);
    }

    if (!isUnlimited && guesses.length === 4) {
      setStats(generateStats(stats, guesses.length + 1));

      setIsGameLost(true);
      showErrorAlert("Game over");
    }
  });

  const getClass = (
    guess: string | string[] | number | boolean,
    type: string,
  ) => {
    switch (type) {
      case "name":
        return guess === solution?.name ? "text-green-300" : "text-red-300";
      case "year":
        return guess === solution?.releaseYear
          ? "text-green-300"
          : "text-red-300";
      case "compiled":
        return guess === solution?.compiled ? "text-green-300" : "text-red-300";
      case "object":
        if (guess === solution?.objectOriented) return "text-green-300";
        if (solution?.objectOriented === "true & false") return "";
        return "text-red-300";
      case "typed":
        return guess === solution?.typed ? "text-green-300" : "text-red-300";
    }
  };

  return (
      <Header />
          />
      <Footer
            guesses={guesses}
        handleGuess={handleGuess}
        setCommand={setCommand}
        isGameWon={isGameWon}
            isGameLost={isGameLost}
      />
          />
          <AlertContainer />
        </div>
      </div>
    </Div100vh>
  );
};

export default App;
