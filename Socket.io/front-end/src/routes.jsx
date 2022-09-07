import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Game from "./pages/Game";
import Winner from "./pages/Winner";

export const MappedRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/game-result" element={<Winner />}></Route>
      </Routes>
    </Router>
  );
};
