import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";  // Debe coincidir exactamente con el nombre del archivo
import "./index.css";

console.log("Iniciando aplicación React");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);