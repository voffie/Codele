import Div100vh from "react-div-100vh";
import { useEffect } from "react";
import { Navbar } from "./components/Header";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { DataItem, generateSolution, getGuessData } from "./lib/data";
import { fetchLocalStorage, writeLocalStorage } from "./lib/localStorage";

const App = () => {
  const [solution, setSolution] = useState<DataItem>();
  useEffect(() => {
    generateSolution().then((res) => setSolution(res));
  }, []);

  const [error, setError] = useState("");
  const totalGuesses = 5;
  const [isGameWon, setGameWon] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState<DataItem[]>(() => {
    const loaded = fetchLocalStorage();

    const gameWasWon = loaded?.guesses.some(
      (element) => element.name === solution?.name
    );
    if (gameWasWon) {
      setGameWon(true);
    } else if (loaded?.guesses.length === 5) {
      setGameOver(true);
    }
    return loaded?.guesses ? loaded.guesses : [];
  });

  const methods = useForm();
  const { handleSubmit, register, reset } = methods;

  const onSubmit = handleSubmit((values) => {
    const currentData = getGuessData(values.currentGuess);
    if (!solution) {
      reset();
      return null;
    }
    if (!currentData) {
      reset();
      setError(`Unknown value "${values.currentGuess}"`);
      return null;
    }
    setError("");
    setGuesses((old) => [...old, currentData]);

    reset();

    writeLocalStorage({
      guesses: [...guesses, currentData],
    });

    if (currentData.name === solution?.name) {
      setGameWon(true);
    } else if (guesses.length === 4 && currentData.name !== solution?.name) {
      setGameOver(true);
    }
  });

  const getClass = (
    guess: string | string[] | number | boolean,
    type: string
  ) => {
    switch (type) {
      case "name":
        return guess === solution?.name ? "text-green-300" : "text-red-300";
      case "creator":
        if (
          typeof guess === "string" &&
          typeof solution?.creator === "string"
        ) {
          return guess === solution?.creator
            ? "text-green-300"
            : "text-red-300";
        } else if (
          typeof guess === "string" &&
          typeof solution?.creator === "object"
        ) {
          return solution.creator.includes(guess)
            ? "text-yellow-300"
            : "text-red-300";
        } else if (
          typeof guess === "object" &&
          typeof solution?.creator === "object"
        ) {
          let output = [];
          for (let i = 0; i < guess.length; i++) {
            if (solution.creator.includes(guess[i])) {
              output.push(guess[i]);
            }
          }
          if (output.length === solution.creator.length) {
            return "text-green-300";
          }
          return output.length ? "text-yellow-300" : "text-red-300";
        } else if (
          typeof guess === "object" &&
          typeof solution?.creator === "string"
        ) {
          return guess.includes(solution.creator)
            ? "text-yellow-300"
            : "text-red-300";
        }

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

  console.log(solution);

  return (
    <Div100vh>
      <div className="flex h-full flex-col bg-black overflow-hidden">
        <Navbar />
        <div className="flex flex-col gap-5 h-full w-full text-white terminal m-2">
          <div>
            <h1>Welcome to Codele!</h1>
            <h1>
              The aim of the game is to guess the right programming language
            </h1>
            <p>FYI: Not all languages are added at the current moment</p>
            <h1>You have {totalGuesses - guesses.length} guesses remaining</h1>
          </div>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <div className="flex gap-2">
                <h1>$ guest@codele.dev</h1>
                <input
                  autoFocus
                  type="text"
                  disabled={isGameOver || isGameWon}
                  className="appearance-none bg-transparent focus:outline-none selection:bg-white selection:text-black"
                  {...register("currentGuess")}
                />
              </div>
            </form>
          </FormProvider>
          {error && <h1 className="text-red-300">{error}</h1>}
          <table className="border border-white-400 text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Creator(s)</th>
                <th>Release Year</th>
                <th>Compiled</th>
                <th>Object Oriented</th>
              </tr>
            </thead>
            <tbody>
              {guesses.map((guess, index) => (
                <tr key={index}>
                  <td className={getClass(guess.name, "name")}>{guess.name}</td>
                  <td className="p-2">
                    <div className={getClass(guess.creator, "creator")}>
                      {typeof guess.creator === "object"
                        ? guess.creator.map((creator) => (
                            <p key={creator}>{creator}</p>
                          ))
                        : guess.creator}
                    </div>
                  </td>
                  <td className={getClass(guess.releaseYear, "year")}>
                    {guess.releaseYear}
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
          {isGameWon && (
            <div className="text-center">
              <h1>The correct answer was {solution?.name}!</h1>
              <h1>
                You solved it with {totalGuesses - guesses.length} guesses
                remaining
              </h1>
            </div>
          )}
          {isGameOver && (
            <div className="text-center">
              <h1>The correct answer was {solution?.name}!</h1>
            </div>
          )}
        </div>
      </div>
    </Div100vh>
  );
};

export default App;
