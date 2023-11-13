import { twMerge } from "tailwind-merge";

type ProgressProps = {
  index: number;
  size: number;
  label: string;
  isCurrentDayStatRow: boolean;
};

export const Progress = ({
  index,
  size,
  label,
  isCurrentDayStatRow,
}: ProgressProps) => {
  const currentRowClass = twMerge(
    "text-xs font-medium text-blue-100 text-center p-0.5",
    isCurrentDayStatRow ? "bg-blue-600" : "bg-gray-600"
  );
  return (
    <div className="justify-left m-1 flex">
      <div className="w-2 items-center justify-center">{index + 1}</div>
      <div className="ml-2 w-full">
        <div
          style={{ width: `${8 + size}%` }}
          className={currentRowClass}
        >
          {label}
        </div>
      </div>
    </div>
  );
};
