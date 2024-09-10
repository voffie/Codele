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
    if (
      normalizedCommand[0] !== "" &&
      term.name.toLowerCase().startsWith(normalizedCommand[0])
    ) {
      if (term.name === "Theme") {
        return `:${term.name} ${closestParameter(normalizedCommand[1])}`;
      } else return `:${term.name}`;
    }
  }

  return "";
}

function closestParameter(command: string) {
  for (const parameter of COMMANDS[4].parameters!) {
    if (parameter.toLowerCase().startsWith(command)) return parameter;
  }

  return "";
}

export function isCommand(text: string) {
  return text.includes(":");
}

export function normalizeCommand(command: string) {
  return command.includes(" ")
    ? command
        .substring(1)
        .split(" ")
        .map((part) => part.trim().toLowerCase())
    : command.substring(1).trim().toLowerCase();
}
