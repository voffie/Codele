import { BaseModal } from "./BaseModal";
/* import { SettingsToggle } from "./SettingsToggle"; */

type SettingsProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const SettingsModal = ({ isOpen, handleClose }: SettingsProps) => {
  return (
    <BaseModal
      title="Settings"
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="mt-2 flex flex-col divide-y">
        {/*         <SettingsToggle
          settingName="Unkown"
          flag={false}
          handleFlag={() => console.log("Decide on settings")}
        /> */}
        <p>Not implemented yet</p>
      </div>
      <p className="mt-6 text-sm italic text-gray-300">
        Made by{" "}
        <a
          href="https://github.com/voffiedev"
          className="font-bold underline"
        >
          VoffieDev
        </a>
      </p>
    </BaseModal>
  );
};
