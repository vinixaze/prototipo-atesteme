import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

// Renderiza a aplicação
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Hot Module Replacement (HMR) para desenvolvimento
if (import.meta.hot) {
  import.meta.hot.accept();
}