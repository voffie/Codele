import { useTheme, isTheme } from "../../context/ThemeContext";
import type { Language } from "../../lib/languages";
import { useState } from "react";
import { IoIosGitBranch } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

export function Footer({
  guesses,
  isGameWon,
  isGameLost,
  handleGuess,
  setCommand,
}: {
  guesses: Language[];
  isGameWon: boolean;
  isGameLost: boolean;
  handleGuess: (input: string) => void;
  setCommand: (input: string) => void;
}) {
  const [value, setValue] = useState("");
  const { setTheme } = useTheme();

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const isCommand = value.includes(":");
    const commands = value.split(" ");
    if (isCommand) {
      if (value.split(" ").length === 1) setCommand(value);
      if (value.split(" ").length === 2 && isTheme(commands[1]))
        setTheme(commands[1]);
    } else {
      if (isGameWon || isGameLost) return;
      handleGuess(value);
    }
    setValue("");
  }

  return (
    <footer className="mt-auto pb-1">
      <aside className="flex justify-between bg-crust">
        <section className="flex">
          <p className="bg-blue px-2 font-bold uppercase text-crust">Normal</p>
          <div className="flex items-center gap-2 bg-surface-0 px-2">
            <IoIosGitBranch className="text-blue" />
            <p className="text-blue">main</p>
          </div>
          <p className="px-2">
            Made by{" "}
            <a
              href="https://github.com/voffie"
              className="font-bold text-blue underline"
              target="_blank"
            >
              Voffie
            </a>
          </p>
        </section>
        <section className="flex">
          <div className="flex items-center gap-2 bg-surface-0 px-2">
            <a href="https://github.com/voffie/codele" target="_blank">
              <FaGithub className="text-blue" />
            </a>
          </div>
          <p className="bg-blue px-2 font-bold uppercase text-crust md:pl-6">{`${guesses.length}/5`}</p>
        </section>
      </aside>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="cursor w-full bg-base caret-rosewater outline-0"
          autoFocus
        />
      </form>
    </footer>
  );
}
