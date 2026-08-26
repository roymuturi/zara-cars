// Liquid Safari reminder: keep bootstrapping minimal so the visual system loads instantly and consistently in both themes.
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
