import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Terminal } from "./components/Terminal";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GuessContext } from "./context/GuessContext";

const App = () => {
  const { guesses } = useContext(GuessContext);
  const [command, setCommand] = useState(":info");

  useEffect(() => {
    if (guesses.length > 0) {
      setCommand(":guess");
    }
  }, [guesses]);

  return (
    <main className="flex min-h-[100dvh] flex-col overflow-hidden bg-base text-text">
      <Header />
      <Terminal currentCommand={command} />
      <Footer setCommand={setCommand} />
      <Toaster
        position="top-right"
        toastOptions={{ className: "", duration: Infinity }}
        gutter={15}
      />
    </main>
  );
};

export default App;
