import { AiOutlineInfo, AiOutlineClose } from "react-icons/ai";
import { BiBarChartAlt2, BiCog } from "react-icons/bi";

type NavbarProps = {
  setIsInfoModalOpen: (value: boolean) => void;
  setIsSettingsModalOpen: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
};

const closeTab = () => {
  window.opener = null;
  window.open("", "_self");
  window.close();
};

export const Navbar = ({
  setIsInfoModalOpen,
  setIsSettingsModalOpen,
  setIsStatsModalOpen,
}: NavbarProps) => {
  return (
    <header className="px-5 py-1 text-center rounded-t-2xl bg-[#D8D8D8] flex items-center justify-between">
      <section className="flex">
        <article className="w-5 h-5 rounded-[50%] mr-[20px] bg-[#FF5D5B] flex items-center justify-center">
          <AiOutlineClose
            className="h-4 w-4 cursor-pointer stroke-white"
            onClick={closeTab}
          />
        </article>
        <article className="w-5 h-5 rounded-[50%] mr-[20px] bg-[#FFBB39] flex items-center justify-center">
          <AiOutlineInfo
            className="h-4 w-4 cursor-pointer stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </article>
        <article className="w-5 h-5 rounded-[50%] mr-[20px] bg-[#00CD4E] flex items-center justify-center">
          <BiCog
            className="h-4 w-4 cursor-pointer stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </article>
      </section>
      <h1 className="text-black">Codele</h1>
      <BiBarChartAlt2
        className="h-6 w-6 cursor-pointer stroke-white"
        onClick={() => setIsStatsModalOpen(true)}
      />
    </header>
  );
};
