import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { COMMANDS } from "../../constants/commands";

export function Help() {
  return (
    <section className="text-center">
      <h1 className="font-bold">HELP</h1>
      <section className="my-2">
        <p className="font-bold">List of commands:</p>
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
      <section className="my-2">
        <p className="font-bold">Legend:</p>
        <section className="my-1">
          <p className="font-bold uppercase">Color code</p>
          <article className="flex justify-center gap-1">
            <p className="text-green">GREEN</p>
            <p>- Field is correct</p>
          </article>
          <article className="flex justify-center gap-1">
            <p className="text-red">RED</p>
            <p>- Field is incorrect</p>
          </article>
        </section>
        <section className="my-1">
          <p className="font-bold uppercase">Icons</p>
          <article className="flex items-center justify-center gap-1">
            <AiOutlineArrowUp />
            <p>- Field is lower than the solution</p>
          </article>
          <article className="flex items-center justify-center gap-1">
            <AiOutlineArrowDown />
            <p>- Field is higher than the solution</p>
          </article>
        </section>
      </section>
    </section>
  );
}
