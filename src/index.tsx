import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./main.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App url="https://randomuser.me/api/?results=50" />);
}
