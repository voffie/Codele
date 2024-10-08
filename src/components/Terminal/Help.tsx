import { COMMANDS } from "../../constants/commands";

export function Help() {
  return (
    <section className="text-center">
      <h1 className="mb-4 font-bold">HELP</h1>
      <p>List of commands:</p>
      <ul>
        {COMMANDS.map((command) => (
          <li key={command.name} className="flex justify-center">
            <p>
              <strong>
                {command.name}
                {command.parameters && `[${command.parameters.join(" ")}]`}
              </strong>{" "}
              - {command.desc}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
