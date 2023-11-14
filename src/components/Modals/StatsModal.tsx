import { AiOutlineShareAlt } from "react-icons/ai";
import Countdown from "react-countdown";

import { GameStats } from "../../lib/localStorage";
import { shareStatus } from "../../lib/share";
import { Language, tomorrow } from "../../lib/languages";
import { Histogram } from "../Stats/Histogram";
import { StatBar } from "../Stats/StatBar";
import { BaseModal } from "./BaseModal";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  solution: Language;
  guesses: Language[];
  gameStats: GameStats;
  isGameLost: boolean;
  isGameWon: boolean;
  handleShareToClipboard: () => void;
  handleShareFailure: () => void;
  numberOfGuessesMade: number;
};

export const StatsModal = ({
  isOpen,
  handleClose,
  solution,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleShareFailure,
  numberOfGuessesMade,
}: Props) => {
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title="Statistics"
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    );
  }
  return (
    <BaseModal
      title="Statistics"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="text-lg font-medium leading-6 text-gray-100">
        Guess Distribution
      </h4>
      <Histogram
        gameStats={gameStats}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 columns-2 items-center justify-center text-center text-white sm:mt-6">
          <div className="inline-block w-full text-left">
            <h5>New word in</h5>
            <Countdown
              className="text-lg font-medium text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <div>
            <button
              type="button"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base"
              onClick={() => {
                shareStatus(
                  solution,
                  guesses,
                  isGameLost,
                  handleShareToClipboard,
                  handleShareFailure
                );
              }}
            >
              <AiOutlineShareAlt className="mr-2 h-6 w-6 cursor-pointer stroke-white" />
              Share
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  );
};
