import { Language } from "./languages";

export type CharStatus = "wrong" | "correct";

export const getGuessStatuses = (
  solution: Language,
  guess: Language
): CharStatus[] => {
  const solutionCharsTaken = [null, null, null, null].map((_) => false);
  const statuses: CharStatus[] = Array(Object.keys(solution).length);

  // handle all correct cases first
  Object.keys(guess).forEach((key, i) => {
    if (guess[key as keyof Language] !== solution[key as keyof Language]) {
      statuses[i] = "wrong";
      solutionCharsTaken[i] = false;
    } else {
      console.log(key);
      statuses[i] = "correct";
      solutionCharsTaken[i] = true;
      return;
    }
  });

  Object.keys(guess).forEach((_, i) => {
    if (statuses[i]) return;
  });

  return statuses;
};
