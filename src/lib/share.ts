import { UAParser } from "ua-parser-js";

import { getGuessStatuses } from "./statuses";
import { Language } from "./languages";
import { getToday } from "./dateutils";

const webShareApiDeviceTypes: string[] = ["mobile", "smarttv", "wearable"];
const parser = new UAParser();
const browser = parser.getBrowser();
const device = parser.getDevice();

export const shareStatus = (
  solution: Language,
  guesses: Language[],
  lost: boolean,
  handleShareToClipboard: () => void,
  handleShareFailure: () => void,
  isUnlimited: boolean,
) => {
  const textToShare =
    `Codele ${getToday().getDate()}/${
      getToday().getMonth() + 1
    } - ${getToday().getFullYear()} ${
      isUnlimited ? "Unlimited" : lost ? 0 + "/5" : guesses.length + "/5"
    }\n\n` + generateEmojiGrid(solution, guesses, getEmojiTiles());

  const shareData = { text: textToShare };

  let shareSuccess = false;

  try {
    if (attemptShare(shareData)) {
      navigator.share(shareData);
      shareSuccess = true;
    }
  } catch (error) {
    shareSuccess = false;
  }

  try {
    if (!shareSuccess) {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(textToShare)
          .then(handleShareToClipboard)
          .catch(handleShareFailure);
      } else {
        handleShareFailure();
      }
    }
  } catch (error) {
    handleShareFailure();
  }
};

const generateEmojiGrid = (
  solution: Language,
  guesses: Language[],
  tiles: string[],
) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(solution, guess);

      return Object.keys(guess)
        .map((_, i) => {
          switch (status[i]) {
            case "correct":
              return tiles[0];
            default:
              return tiles[1];
          }
        })
        .join("");
    })
    .join("\n");
};

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf("FIREFOX") === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? "") !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  );
};

const getEmojiTiles = () => {
  return ["🟩", "🟥"];
};
