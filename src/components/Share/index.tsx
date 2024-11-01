import { generateEmojiGrid, shareStatus } from "../../lib/share";
import { type Language, tomorrow } from "../../lib/languages";
import Countdown from "react-countdown";
import { FaShareAlt, FaTwitter } from "react-icons/fa";

export function Share({ guesses }: { guesses: Language[] }) {
  const uri = shareStatus(guesses);
  const grid = generateEmojiGrid(guesses);
  const shareText = `Codele: ${new Date(Date.now()).toLocaleDateString("en-GB")} ${guesses.length}/5 ${grid}`;
  return (
    <aside className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
      <p className="font-bold">
        Next word in <Countdown date={tomorrow} daysInHours />
      </p>
      <section className="flex items-center justify-center gap-4">
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
