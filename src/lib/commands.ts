import { COMMANDS } from "../constants/commands";

export type Command = {
  component?: () => JSX.Element;
  desc: string;
  name: string;
  parameters?: string[];
};

export function closestCommand(input: string) {
  const normalizedCommand = normalizeCommand(input);
  for (const term of COMMANDS) {
    if (term.name.toLowerCase().startsWith(normalizedCommand[0])) {
      if (term.name === "Theme") {
        return `:${term.name} ${closestParameter(normalizedCommand[1])}`;
      } else return `:${term.name}`;
    }
  }

  return "";
}

function closestParameter(param: string) {
  for (const parameter of COMMANDS[4].parameters!) {
    if (parameter.toLowerCase().startsWith(param)) return parameter;
  }

  return "";
}

export function isCommand(text: string) {
  return text.includes(":");
}

export function normalizeCommand(command: string) {
  const trimmedCommand = command.substring(1);
  return trimmedCommand.split(" ").map((part) => part.trim().toLowerCase());
}
