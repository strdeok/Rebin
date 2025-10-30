import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./main.css";
import { domAnimation, LazyMotion } from "framer-motion";

createRoot(document.getElementById("root") as HTMLElement).render(
  <LazyMotion features={domAnimation} strict>
    <App />
  </LazyMotion>
);
