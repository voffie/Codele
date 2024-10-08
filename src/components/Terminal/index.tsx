import { type Language, solution } from "../../lib/languages";
import { normalizeCommand } from "../../lib/commands";
import { COMMANDS } from "../../constants/commands";
import { Info } from "./Info";
import { Help } from "./Help";
import { Languages } from "./Languages";
import { Guess } from "./Guess";
import { EndScreen } from "../EndScreen";

export function Terminal({
  guesses,
  currentCommand,
  isGameWon,
  isGameLost,
}: {
  guesses: Language[];
  currentCommand: string;
  isGameWon: boolean;
  isGameLost: boolean;
}) {
  const normalizedCommand = normalizeCommand(currentCommand);
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
      {(isGameWon || isGameLost) && <EndScreen guesses={guesses} />}
    </section>
  );
}
