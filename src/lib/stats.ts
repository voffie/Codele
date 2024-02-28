import {
  GameStats,
  fetchStatsFromLocalStorage,
  writeStatsToLocalStorage,
} from "./localStorage";

export const generateStats = (
  gameStats: GameStats,
  incorrectGuesses: number,
) => {
  const stats = { ...gameStats };

  stats.totalGames += 1;

  if (incorrectGuesses >= 5) {
    stats.currentStreak = 0;
    stats.gamesFailed += 1;
  } else {
    stats.winDistribution[incorrectGuesses] += 1;
    stats.currentStreak += 1;

    if (stats.bestStreak < stats.currentStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  }

  stats.successRate = getSuccessRate(stats);

  writeStatsToLocalStorage(stats);
  return stats;
};

const defaultStats: GameStats = {
  winDistribution: Array.from(new Array(5), () => 0),
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
};

export const loadStats = () => {
  return fetchStatsFromLocalStorage() || defaultStats;
};

const getSuccessRate = (gameStats: GameStats) => {
  const { totalGames, gamesFailed } = gameStats;

  return Math.round(
    (100 * (totalGames - gamesFailed)) / Math.max(totalGames, 1),
  );
};
