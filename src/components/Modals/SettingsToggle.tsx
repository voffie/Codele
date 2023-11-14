import { twMerge } from "tailwind-merge";

type ToggleProps = {
  settingName: string;
  flag: boolean;
  handleFlag: Function;
  description?: string;
};

export const SettingsToggle = ({
  settingName,
  flag,
  handleFlag,
  description,
}: ToggleProps) => {
  const toggleHolder = twMerge(
    "w-14 h-8 flex shrink-0 items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer",
    flag ? "bg-green-400" : ""
  );
  const toggleButton = twMerge(
    "bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out cursor-pointer",
    flag ? "translate-x-6" : ""
  );

  return (
    <>
      <div className="flex justify-between gap-4 py-3">
        <div className="mt-2 text-left text-gray-300">
          <p className="leading-none">{settingName}</p>
          {description && (
            <p className="mt-1 text-xs text-gray-300">{description}</p>
          )}
        </div>
        <div
          className={toggleHolder}
          onClick={() => handleFlag(!flag)}
        >
          <div className={toggleButton} />
        </div>
      </div>
    </>
  );
};
