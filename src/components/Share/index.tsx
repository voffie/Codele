import { generateShareText, generateTwitterShareURI } from "../../lib/share";
import { type Language, tomorrow } from "../../lib/languages";
import Countdown from "react-countdown";
import { FaShareAlt, FaTwitter } from "react-icons/fa";

export function Share({
  guesses,
  solution,
}: {
  guesses: Language[];
  solution: Language;
}) {
  const uri = generateTwitterShareURI(guesses);
  const shareText = generateShareText(guesses);
  return (
    <aside className="mt-20 flex flex-col items-center justify-center gap-2 text-center">
      <p className="font-bold">{`Soution was ${solution.name}`}</p>
      <p className="font-bold">
        Next word in <Countdown date={tomorrow} daysInHours />
      </p>
      <section className="mt-2 flex items-center justify-center gap-4">
        <button onClick={() => navigator.clipboard.writeText(shareText)}>
          <FaShareAlt />
        </button>
        <button onClick={() => window.open(uri)}>
          <FaTwitter />
        </button>
      </section>
    </aside>
  );
}
