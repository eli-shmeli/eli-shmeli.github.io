import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import FrontPage from "./FrontPage";
import Anime from "./Anime";
import { ThemeProvider } from "./ThemeContext";
import RevolutionRandomizer from "./RevolutionRandomizer";

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/revolution-randomizer" element={<RevolutionRandomizer />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
