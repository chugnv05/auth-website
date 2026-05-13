import ReactDOM from "react-dom/client";
import App from "./app/App";
import Providers from "./app/providers/providers";
import "./app/styles/index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);
