import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Home from "./components/Home";
import Game from "./components/Game";
import Winner from "./components/Winner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/app" element={<App />}></Route>
      <Route path="/game" element={<Game />}></Route>
      <Route path="/game-result" element={<Winner />}></Route>
    </Routes>
  </BrowserRouter>
);
