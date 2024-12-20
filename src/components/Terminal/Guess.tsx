import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Share } from "../Share";
import { useContext } from "react";
import { GuessContext } from "../../context/GuessContext";

export function Guess() {
  const { guesses, solution, isGameWon, isGameLost } = useContext(GuessContext);
  function getClass(guess: string | number | boolean, type: string) {
    switch (type) {
      case "name":
        return guess === solution?.name ? "text-green" : "text-red";
      case "year":
        return guess === solution?.releaseYear ? "text-green" : "text-red";
      case "compiled":
        return guess === solution?.compiled ? "text-green" : "text-red";
      case "object":
        if (guess === solution?.objectOriented) return "text-green";
        return "text-red";
      case "typed":
        return guess === solution?.typed ? "text-green" : "text-red";
    }
  }
  return (
    <section className="overflow-x-auto text-center">
      <p className="mb-2">
        Use the <strong>:help</strong> command to view legend
      </p>
      <table className="table-fixed md:w-full">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Release Year</th>
            <th scope="col">Compiled</th>
            <th scope="col">Object Oriented</th>
            <th scope="col">Typing</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr key={index}>
              <td className={getClass(guess.name, "name")}>{guess.name}</td>
              <td className={getClass(guess.releaseYear, "year")}>
                {guess.releaseYear < solution?.releaseYear && (
                  <article>
                    {guess.releaseYear}
                    <AiOutlineArrowUp className="ml-4 inline" />
                  </article>
                )}
                {guess.releaseYear > solution?.releaseYear && (
                  <article>
                    {guess.releaseYear}
                    <AiOutlineArrowDown className="ml-4 inline" />
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
              <td className={getClass(guess.typed, "typed")}>{guess.typed}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(isGameWon || isGameLost) && (
        <Share guesses={guesses} solution={solution} />
      )}
    </section>
  );
}
