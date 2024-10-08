import { generateEmojiGrid, shareStatus } from "../../lib/share";
import { Language, tomorrow } from "../../lib/languages";
import Countdown from "react-countdown";
import { FaTwitter } from "react-icons/fa";

export function EndScreen({ guesses }: { guesses: Language[] }) {
  const uri = shareStatus(guesses);
  const grid = generateEmojiGrid(guesses);
  return (
    <aside className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
      <p className="font-bold">Share</p>
      <p>
        Codele: {new Date(Date.now()).toLocaleDateString("en-GB")}{" "}
        {guesses.length}/5 {grid}
      </p>
      <button onClick={() => window.open(uri)}>
        <FaTwitter />
      </button>
      <p className="font-bold">
        Next word in <Countdown date={tomorrow} daysInHours />
      </p>
    </aside>
  );
}
