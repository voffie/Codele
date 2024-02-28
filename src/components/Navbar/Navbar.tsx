import { AiOutlineInfo } from "react-icons/ai";
import { BiBarChartAlt2, BiCog } from "react-icons/bi";

type NavbarProps = {
  setIsInfoModalOpen: (value: boolean) => void;
  setIsStatsModalOpen: (value: boolean) => void;
};

const closeTab = () => {
  window.opener = null;
  window.open("", "_self");
  window.close();
};

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
}: NavbarProps) => {
  return (
    <header className="flex items-center justify-between rounded-t-2xl bg-[#D8D8D8] px-5 py-1 text-center">
      <section className="flex">
        <article
          className="mr-[20px] h-5 w-5 rounded-[50%] bg-[#FF5D5B]"
          onClick={closeTab}
        />
        <article className="mr-[20px] h-5 w-5 rounded-[50%] bg-[#FFBB39]" />
        <article className="mr-[20px] h-5 w-5 rounded-[50%] bg-[#00CD4E]" />
      </section>
      <h1 className="text-black">Codele</h1>
      <div className="flex items-center justify-center gap-2">
        <AiOutlineInfo
          className="h-6 w-6 cursor-pointer stroke-white"
          onClick={() => setIsInfoModalOpen(true)}
        />
        <BiBarChartAlt2
          className="h-6 w-6 cursor-pointer stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
    </header>
  );
};
