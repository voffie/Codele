import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export function Info() {
  return (
    <section className="text-center">
      <h1 className="mb-4 font-bold uppercase">How to play</h1>
      <p className="mb-2">
        Guess the language in 5 tries. After each guess, the color of the text
        will change depending on how close your guess was to the solution.
      </p>
      <p className="mb-2">
        Guesses are case INSENSITIVE and some languages have aliases which can
        be viewed using the <strong>:languages</strong> command
      </p>
      <p className="mb-2">
        You can view all commands and the legend using the{" "}
        <strong>:help</strong> command!
      </p>
      <p>Starting guessing using the input down below!</p>
      <section className="mt-4">
        <h2 className="font-bold uppercase">Color code</h2>
        <p>
          <span className="text-green">Green</span> - Guess is equal with
          solution
        </p>
        <p>
          <span className="text-red">Red</span> - Guess is not equal with
          solution
        </p>
      </section>
      <section className="mt-2">
        <h2 className="font-bold uppercase">Icons</h2>
        <article className="flex items-center justify-center gap-1">
          <AiOutlineArrowUp />
          <p>- Field is lower than the solution</p>
        </article>
        <article className="flex items-center justify-center gap-1">
          <AiOutlineArrowDown />
          <p>- Field is higher than the solution</p>
        </article>
      </section>
    </section>
  );
}
