import { type Language, solution } from "../../lib/languages";
import { Info } from "./Info";
import { Help } from "./Help";
import { Languages } from "./Languages";
import { Guess } from "./Guess";
import { EndScreen } from "../EndScreen";

export type Command = {
  component: () => JSX.Element;
  desc: string;
  name: string;
};

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
  const commandMap: Record<string, Command> = {
    info: {
      component: () => <Info />,
      desc: "Render info screen",
      name: "info",
    },
    languages: {
      component: () => <Languages />,
      desc: "List all languages",
      name: "languages",
    },
    guess: {
      component: () => <Guess guesses={guesses} solution={solution} />,
      desc: "Render guess screen",
      name: "guess",
    },
  };

  commandMap["help"] = {
    component: () => <Help commands={commandMap} />,
    desc: "Render help screen",
    name: "help",
  };

  const normalizedCommand = currentCommand.substring(1).trim().toLowerCase();

  const Component =
    commandMap[normalizedCommand]?.component ||
    (() => (
      <p>Unknown command. Try ':help' for a list of available commands.</p>
    ));

  return (
    <section className="flex-auto pt-4 md:pl-2">
      <Component />
      {(isGameWon || isGameLost) && <EndScreen guesses={guesses} />}
    </section>
  );
}
