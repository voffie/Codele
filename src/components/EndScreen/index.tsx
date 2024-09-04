import { shareStatus } from "../../lib/share";
import { Language, tomorrow } from "../../lib/languages";
import Countdown from "react-countdown";

export function EndScreen({ guesses }: { guesses: Language[] }) {
  const grid = shareStatus(guesses);
  return (
    <aside className="mt-20 flex flex-col items-center justify-center gap-4 text-center">
      <p>Share: {grid}</p>
      <p className="font-bold">
        Next word in <Countdown date={tomorrow} daysInHours />
      </p>
    </aside>
  );
}
