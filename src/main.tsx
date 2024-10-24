import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./context/ThemeContext";
import { GuessProvider } from "./context/GuessContext";

const container = document.querySelector("#root");
const root = createRoot(container!);

const Root = () => (
  <StrictMode>
    <ThemeProvider>
      <GuessProvider>
        <App />
      </GuessProvider>
    </ThemeProvider>
    <Analytics mode="production" />
  </StrictMode>
);

root.render(<Root />);
