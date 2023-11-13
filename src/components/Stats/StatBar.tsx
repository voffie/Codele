import { GameStats } from "../../lib/localStorage";

type BarProps = {
  gameStats: GameStats;
};

const StatItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="m-1 w-1/4 items-center justify-center dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
};

export const StatBar = ({ gameStats }: BarProps) => {
  return (
    <div className="my-2 flex justify-center">
      <StatItem
        label="Total tries"
        value={gameStats.totalGames}
      />
      <StatItem
        label="Success rate"
        value={`${gameStats.successRate}%`}
      />
      <StatItem
        label="Current streak"
        value={gameStats.currentStreak}
      />
      <StatItem
        label="Best streak"
        value={gameStats.bestStreak}
      />
    </div>
  );
};
