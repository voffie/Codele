import { Command } from ".";

export function Help({ commands }: { commands: Record<string, Command> }) {
  const sortedKeys = Object.keys(commands).sort((a, b) => a.localeCompare(b));
  return (
    <section className="text-center">
      <h1 className="mb-4 font-bold">HELP</h1>
      <p>List of commands:</p>
      <ul>
        {sortedKeys.map((name) => (
          <li key={name} className="flex justify-center">
            <p>
              <strong>{name.charAt(0).toUpperCase() + name.slice(1)}</strong> -{" "}
              {commands[name].desc}
            </p>
          </li>
        ))}
        <li>
          <p>
            <strong>{"Theme [latte, frappe, macchiato, mocha]"}</strong> -
            Changes the current theme
          </p>
        </li>
      </ul>
    </section>
  );
}
