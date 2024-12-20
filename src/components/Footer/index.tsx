import { useTheme, isTheme } from "../../context/ThemeContext";
import { closestLanguage } from "../../lib/languages";
import { closestCommand, isCommand } from "../../lib/commands";
import { useContext, useState } from "react";
import { IoIosGitBranch } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import type { ChangeEvent, KeyboardEvent, SyntheticEvent } from "react";
import { GuessContext } from "../../context/GuessContext";

export function Footer({
  setCommand,
}: {
  setCommand: (input: string) => void;
}) {
  const { guesses, isGameWon, isGameLost, handleGuess } =
    useContext(GuessContext);
  const [value, setValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const { setTheme } = useTheme();

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedValue = value.toLowerCase();
    if (isCommand(normalizedValue)) {
      const commands = normalizedValue.split(" ");
      if (commands.length === 1) setCommand(normalizedValue);
      if (commands.length === 2 && isTheme(commands[1])) setTheme(commands[1]);
    } else {
      if (isGameWon || isGameLost) return;
      handleGuess!(normalizedValue);
    }
    setSuggestion("");
    setValue("");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setValue(event.target.value);
    const targetValue = event.target.value;

    if (targetValue === "") {
      setSuggestion("");
      return;
    }

    const isInputCommand = isCommand(targetValue);
    const currentSuggestion = isInputCommand
      ? closestCommand(targetValue.toLowerCase())
      : closestLanguage(targetValue.toLowerCase());

    if (currentSuggestion === "") {
      setSuggestion("");
      return;
    }

    let caseFixedSuggestion = "";
    for (let i = 0; i < targetValue.length; i++) {
      const char = targetValue[i];

      if (currentSuggestion[i] === undefined) {
        caseFixedSuggestion += char;
        continue;
      }

      if (char === char.toUpperCase()) {
        caseFixedSuggestion += currentSuggestion[i].toUpperCase();
      } else {
        caseFixedSuggestion += currentSuggestion[i].toLowerCase();
      }
    }

    setSuggestion(
      caseFixedSuggestion + currentSuggestion.substring(targetValue.length),
    );
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab" && suggestion.length) {
      event.preventDefault();
      setValue(suggestion);
      setSuggestion("");
    }
  }

  return (
    <footer className="mt-4 pb-1 md:mt-0">
      <aside className="flex justify-between bg-crust">
        <section className="flex">
          <p className="bg-blue px-1 font-bold uppercase text-crust md:px-2">
            Normal
          </p>
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
              aria-label="View Voffie's GitHub profile"
            >
              Voffie
            </a>
          </p>
        </section>
        <section className="flex">
          <div className="flex items-center gap-2 bg-surface-0 px-2">
            <a
              href="https://github.com/voffie/codele"
              target="_blank"
              aria-label="View the source code on GitHub"
            >
              <FaGithub className="text-blue" />
            </a>
          </div>
          <p className="bg-blue px-2 font-bold uppercase text-crust md:pl-6">{`${guesses.length}/5`}</p>
        </section>
      </aside>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="-- GUESS HERE --"
          value={value}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          className="relative z-10 w-full bg-transparent caret-rosewater outline-none"
        />
        <span className="absolute left-0 text-overlay-2">{suggestion}</span>
      </form>
    </footer>
  );
}
