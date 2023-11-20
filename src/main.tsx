import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AlertProvider } from "./context/AlertContext";
import "./index.css";
import { Analytics } from "@vercel/analytics/react";

const container = document.querySelector("#root");
const root = createRoot(container!);

const Root = () => (
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
    <Analytics mode="production" />
  </StrictMode>
);

root.render(<Root />);
