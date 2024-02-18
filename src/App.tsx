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
      (item) => item.name === solution.name
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
            lang.aliases?.includes(query.toLowerCase())
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
        if (guess === solution?.objectOriented) return "text-green-300";
        if (solution?.objectOriented === "true & false") return "";
        return "text-red-300";
      case "typed":
        return guess === solution?.typed ? "text-green-300" : "text-red-300";
    }
  };

  return (
    <Div100vh>
      <div className="flex h-full flex-col bg-black">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
        />
        <div className="flex w-screen grow flex-col pt-2 pb-8 sm:px-6 lg:px-8 short:pb-2 short:pt-2">
          <div className="flex grow flex-col pt-6 pb-6 short:pb-2 gap-4">
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <section className="flex gap-2">
                  <h1>$ guest@codele.dev</h1>
                  <div className="flex flex-wrap">
                    <Combobox
                      value={selectedLanguage}
                      onChange={setSelectedLanguage}
                      name="currentGuess"
                    >
                      <Combobox.Input
                        aria-label="Guess field"
                        autoFocus
                        type="text"
                        onChange={(event) => setQuery(event.target.value)}
                        className="bg-transparent outline-none"
                      />
                      <Combobox.Options className="flex items-center justfiy-start gap-2 bg-transparent rounded-md md:w-[calc(1326px-324px)] overflow-x-hidden flex-wrap">
                        {filteredLanguages.map((lang) => (
                          <Combobox.Option
                            key={lang.name}
                            value={lang.name}
                            className={({ active }) =>
                              `text-[rgb(45,45,45)] h-6 ${
                                active ? "text-white" : ""
                              }`
                            }
                          >
                            {lang.name}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </Combobox>
                  </div>
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
                    <th className="hover-text">
                      <p>Typed*</p>
                      <span className="tooltip-text">
                        <p>Static | Dynamic |</p>The most prominent one if both
                        exist
                      </span>
                    </th>
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
                        {(guess.releaseYear === solution?.releaseYear ||
                          guess.releaseYear === "No data") &&
                          guess.releaseYear}
                      </td>
                      <td className={getClass(guess.compiled, "compiled")}>
                        {guess.compiled ? "True" : "False"}
                      </td>
                      <td className={getClass(guess.objectOriented, "object")}>
                        {guess.objectOriented ? "True" : "False"}
                      </td>
                      <td className={getClass(guess.typed, "typed")}>
                        {guess.typed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <p className="mt-6 text-sm italic text-gray-300 text-center">
              Made by{" "}
              <a
                href="https://github.com/voffiedev"
                className="font-bold underline"
                target="_blank"
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
            numberOfGuessesMade={guesses.length}
            isUnlimited={isUnlimited}
            setIsUnlimited={() => setIsUnlimited(true)}
          />
          <AlertContainer />
        </div>
      </div>
    </Div100vh>
  );
};

export default App;
