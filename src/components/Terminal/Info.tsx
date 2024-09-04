export function Info() {
  return (
    <section className="text-center">
      <h1 className="mb-4 font-bold uppercase">How to play</h1>
      <p className="mb-2">
        Guess the language in 5 tries. After each guess, the color of the text
        will change depending on how close your guess was to the word.
      </p>
      <p>
        Guesses are case INSENSITIVE and some languages have aliases which can
        be viewed using the <strong>:languages</strong>
      </p>
      <p>
        Starting guessing using the input down below & you can view all commands
        using the <strong>:help</strong> command!
      </p>
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
    </section>
  );
}
