import type { Language } from "../../lib/languages";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export function Guess({
  guesses,
  solution,
}: {
  guesses: Language[];
  solution: Language;
}) {
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
    <section className="text-center">
      <h1 className="mb-4 font-bold uppercase">Guesses</h1>
      <table className="md:w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Release Year</th>
            <th>Compiled</th>
            <th>Object Oriented</th>
            <th>Static/Dynamic</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr key={index}>
              <td className={getClass(guess.name, "name")}>{guess.name}</td>
              <td className={getClass(guess.releaseYear, "year")}>
                {solution?.releaseYear &&
                  guess.releaseYear < solution?.releaseYear && (
                    <article>
                      {guess.releaseYear}
                      <AiOutlineArrowUp className="ml-4 inline" />
                    </article>
                  )}
                {solution?.releaseYear &&
                  guess.releaseYear > solution?.releaseYear && (
                    <article>
                      {guess.releaseYear}
                      <AiOutlineArrowDown className="ml-4 inline" />
                    </article>
                  )}
                {(guess.releaseYear === solution?.releaseYear ||
                  guess.releaseYear === "No data" ||
                  solution.releaseYear === "No data") &&
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
    </section>
  );
}