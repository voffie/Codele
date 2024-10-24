import { Command } from "lib/commands";

export const COMMANDS: Command[] = [
  {
    desc: "Render guess screen",
    name: "Guess",
  },
  {
    desc: "Render help screen",
    name: "Help",
  },
  {
    desc: "Render info screen",
    name: "Info",
  },
  {
    desc: "List all languages",
    name: "Languages",
  },
  {
    desc: "Changes the current theme",
    name: "Theme",
    parameters: ["latte", "frappe", "macchiato", "mocha"],
  },
];
