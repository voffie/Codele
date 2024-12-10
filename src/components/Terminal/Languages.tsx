import { LANGUAGES } from "../../constants/languages";

export function Languages() {
  return (
    <section className="text-center">
      <h1 className="mb-4 font-bold uppercase">Languages</h1>
      <section className="grid auto-rows-auto grid-cols-3 gap-2 p-2">
        {LANGUAGES.map((language) => (
          <p key={language.name}>
            {language.name} {language.aliases ? `(${language.aliases})` : ""}
          </p>
        ))}
      </section>
      <p className="mt-4">
        If you do not find your language, please open an {""}
        <a
          href="https://github.com/voffie/Codele/issues"
          className="font-bold text-blue underline"
          target="_blank"
        >
          issue
        </a>
        {""} and provide the necessary information!
      </p>
    </section>
  );
}
