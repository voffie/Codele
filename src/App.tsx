import Div100vh from "react-div-100vh";
import { Navbar } from "./components/Header";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { ILanguage, getGuessData } from "./data";

const App = () => {
  const totalGuesses = 5;
  const [isGameWon, setGameWon] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState<ILanguage[]>([]);
  const methods = useForm();
  const { handleSubmit, register, reset } = methods;
  const solution = {
    name: "Ruby",
    creator: "Yukihiro Matsumoto",
    releaseYear: 1995,
    compiled: false,
    objectOriented: true,
  };

  const onSubmit = handleSubmit((values) => {
    const info = getGuessData(values.currentGuess);
    if (!info) {
      reset();
      return null;
    }
    setGuesses((old) => [...old, info]);

    reset();

    if (info.name === solution.name) {
      setGameWon(true);
    } else if (guesses.length === 4 && info.name !== solution.name) {
      setGameOver(true);
    }
  });

  return (
    <Div100vh>
      <div className="flex h-full flex-col bg-black overflow-hidden">
        <Navbar />
        <div className="flex flex-col gap-5 h-full w-full text-white terminal">
          <div className="m-2">
            <h1>Welcome to Codele!</h1>
            <h1>
              The aim of the game is to guess the right programming language
            </h1>
            <p>FYI: Not all languages are added at this moment</p>
            <h1>You have {totalGuesses - guesses.length} guesses remaining</h1>
          </div>
          <FormProvider {...methods}>
            <form
              onSubmit={onSubmit}
              className="m-2"
            >
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
          <table className="border border-white-400 text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Creator(s)</th>
                <th>Release Year</th>
                <th>Interpreted</th>
                <th>Object Oriented</th>
              </tr>
            </thead>
            <tbody>
              {guesses.map((guess, index) => (
                <tr key={index}>
                  <td
                    className={
                      guess.name === solution.name
                        ? "text-green-300"
                        : "text-red-300"
                    }
                  >
                    {guess.name}
                  </td>
                  <td className="p-2">
                    {typeof guess.creator === "object"
                      ? guess.creator.map((creator) => <p>{creator}</p>)
                      : guess.creator}
                  </td>
                  <td
                    className={
                      guess.releaseYear === solution.releaseYear
                        ? "text-green-300"
                        : guess.releaseYear === "No data"
                        ? "text-yellow-300"
                        : "text-red-300"
                    }
                  >
                    {guess.releaseYear}
                  </td>
                  <td
                    className={
                      guess.compiled === solution.compiled
                        ? "text-green-300"
                        : "text-red-300"
                    }
                  >
                    {guess.compiled ? "True" : "False"}
                  </td>
                  <td
                    className={
                      guess.objectOriented === solution.objectOriented
                        ? "text-green-300"
                        : "text-red-300"
                    }
                  >
                    {guess.objectOriented ? "True" : "False"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isGameWon && (
            <div className="text-center">
              <h1>YOU WON!</h1>
              <h1>The correct answer was {solution.name}!</h1>
              <h1>
                You solved it with {totalGuesses - guesses.length} guesses
                remaining
              </h1>
            </div>
          )}
          {isGameOver && (
            <div className="text-center">
              <h1>YOU LOST!</h1>
              <h1>The correct answer was {solution.name}!</h1>
            </div>
          )}
        </div>
      </div>
    </Div100vh>
  );
};

export default App;
