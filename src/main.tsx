import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AlertProvider } from "./context/AlertContext";
import "./index.css";

const container = document.querySelector("#root");
const root = createRoot(container!);

const Root = () => (
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>
);

root.render(<Root />);
