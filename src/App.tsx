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
import { SettingsModal } from "./components/Modals/SettingsModal";
import Div100vh from "react-div-100vh";
import { AlertContainer } from "./components/Alerts/AlertContainer";
import { useAlert } from "./context/AlertContext";
import { generateStats, loadStats } from "./lib/stats";
import { StatsModal } from "./components/Modals/StatsModal";

const App = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [isGameWon, setIsGameWon] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isGameLost, setIsGameLost] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : prefersDarkMode
      ? true
      : false
  );
  const [guesses, setGuesses] = useState<Language[]>(() => {
    const loaded = fetchGameFromLocalStorage();
    if (loaded?.solution.name !== solution.name) {
      return [];
    }
    const gameWasWon = loaded?.guesses.find(
      (item) => item.name === solution.name
    )
      ? true
      : false;
    if (gameWasWon) {
      setIsGameWon(true);
    }
    if (loaded?.guesses.length === 5 && !gameWasWon) {
      setIsGameLost(true);
      showErrorAlert(`The correct language was ${solution.name}`);
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
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  useEffect(() => {
    writeGameToLocalStorage({
      guesses,
      solution,
    });
  }, [guesses]);

  useEffect(() => {
    if (isGameWon) {
      showSuccessAlert("Congrats!", {
        delayMs: 1000,
        onClose: () => setIsStatsModalOpen(true),
      });
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true);
      }, (solution.name.length + 1) * 350);
    }
  }, [isGameWon, isGameLost, showSuccessAlert]);

  const methods = useForm();
  const { handleSubmit, register, watch, reset } = methods;

  const currentGuess = watch("currentGuess");

  const onSubmit = handleSubmit((values) => {
    if (isGameWon || isGameLost) {
      return;
    }

    if (!isLanguageInLanguageList(currentGuess)) {
      return showErrorAlert("Language not found");
    }

    const winningLanguage = isWinningLanguage(currentGuess);
    const data = getGuessData(currentGuess);

    if (guesses.length < 5 && !isGameWon) {
      setGuesses([...guesses, data!]);
      reset();

      if (winningLanguage) {
        setStats(generateStats(stats, guesses.length));
        return setIsGameWon(true);
      }

      if (guesses.length === 4) {
        setStats(generateStats(stats, guesses.length + 1));

        setIsGameLost(true);
        showErrorAlert(`The language was ${solution.name}`, {
          persist: true,
          delayMs: 350 * solution.name.length + 1,
        });
      }
    }
  });

  const getClass = (
    guess: string | string[] | number | boolean,
    type: string
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
        return guess === solution?.objectOriented
          ? "text-green-300"
          : "text-red-300";
    }
  };

  return (
    <Div100vh>
      <div className="flex h-full flex-col">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
        />
        <div className="flex w-screen grow flex-col pt-2 pb-8 sm:px-6 lg:px-8 short:pb-2 short:pt-2">
          <div className="flex grow flex-col pt-6 pb-6 short:pb-2 gap-4">
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <section className="flex gap-2">
                  <h1>$ guest@codele.dev</h1>
                  <input
                    autoFocus
                    type="text"
                    disabled={isGameLost || isGameWon}
                    className="appearance-none bg-transparent focus:outline-none selection:bg-white selection:text-black"
                    {...register("currentGuess")}
                  />
                </section>
              </form>
            </FormProvider>
            {guesses.length && (
              <table className="border border-white-400 text-center self-center w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Release Year</th>
                    <th>Compiled</th>
                    <th>Object Oriented</th>
                  </tr>
                </thead>
                <tbody>
                  {guesses.map((guess, index) => (
                    <tr key={index}>
                      <td className={getClass(guess.name, "name")}>
                        {guess.name}
                      </td>
                      <td className={getClass(guess.releaseYear, "year")}>
                        {solution?.releaseYear &&
                          guess.releaseYear < solution?.releaseYear && (
                            <article>
                              {guess.releaseYear}
                              <AiOutlineArrowUp className="inline ml-4" />
                            </article>
                          )}
                        {solution?.releaseYear &&
                          guess.releaseYear > solution?.releaseYear && (
                            <article>
                              {guess.releaseYear}
                              <AiOutlineArrowDown className="inline ml-4" />
                            </article>
                          )}
                        {guess.releaseYear === solution?.releaseYear &&
                          guess.releaseYear}
                      </td>
                      <td className={getClass(guess.compiled, "compiled")}>
                        {guess.compiled ? "True" : "False"}
                      </td>
                      <td className={getClass(guess.objectOriented, "object")}>
                        {guess.objectOriented ? "True" : "False"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300 text-center">
              Made by{" "}
              <a
                href="https://github.com/voffiedev"
                className="font-bold underline"
              >
                VoffieDev
              </a>
            </p>
          </div>
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            solution={solution}
            guesses={guesses}
            gameStats={stats}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            handleShareToClipboard={() =>
              showSuccessAlert("Game copied to clipboard!")
            }
            handleShareFailure={() =>
              showErrorAlert(
                "Unable to share the results. This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.",
                { durationMs: 10000 }
              )
            }
            isDarkMode={isDarkMode}
            numberOfGuessesMade={guesses.length}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
          />
          <AlertContainer />
        </div>
      </div>
    </Div100vh>
  );
};

export default App;
