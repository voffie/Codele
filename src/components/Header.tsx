export const Navbar = () => {
  return (
    <header className="px-5 py-1 text-center rounded-t-2xl bg-[#D8D8D8] flex items-center justify-between">
      <section className="flex">
        <article className="w-[20px] h-[20px] rounded-[50%] mr-[20px] bg-[#FF5D5B]" />
        <article className="w-[20px] h-[20px] rounded-[50%] mr-[20px] bg-[#FFBB39]" />
        <article className="w-[20px] h-[20px] rounded-[50%] mr-[20px] bg-[#00CD4E]" />
      </section>
      <h1>Codele</h1>
      <div className="w-[120px] h-5" />
    </header>
  );
};
