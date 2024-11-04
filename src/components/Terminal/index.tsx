import { solution } from "../../lib/languages";
import { COMMANDS } from "../../constants/commands";
import { Info } from "./Info";
import { Help } from "./Help";
import { Languages } from "./Languages";
import { Guess } from "./Guess";
import { Share } from "../Share";
import { useContext } from "react";
import { GuessContext } from "../../context/GuessContext";

export function Terminal({ currentCommand }: { currentCommand: string }) {
  const { guesses, isGameWon, isGameLost } = useContext(GuessContext);
  const normalizedCommand = currentCommand.substring(1);
  COMMANDS[0].component = () => <Guess guesses={guesses} solution={solution} />;
  COMMANDS[1].component = () => <Help />;
  COMMANDS[2].component = () => <Info />;
  COMMANDS[3].component = () => <Languages />;

  let Component = COMMANDS.find(
    (command) => command.name.toLowerCase() === normalizedCommand,
  )
    ? () => <p>Unkown usage. Try ':help' for correct usage.</p>
    : () => (
        <p>Unkown command. Try ':help' for a list of available commands.</p>
      );

  const filiteredCommands = COMMANDS.filter(
    (command) => command.name.toLowerCase() === normalizedCommand,
  );

  if (filiteredCommands.length === 1 && filiteredCommands[0].component) {
    Component = filiteredCommands[0].component;
  }

  return (
    <section className="flex-auto pt-4 md:pl-2">
      <Component />
      {(isGameWon || isGameLost) && <Share guesses={guesses} />}
    </section>
  );
}
