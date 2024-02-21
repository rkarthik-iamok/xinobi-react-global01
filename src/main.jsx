import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <h1>Global App</h1>
    <App />
  </>
);
