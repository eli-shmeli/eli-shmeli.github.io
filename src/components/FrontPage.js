import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import ThemeContext from "./ThemeContext";

const FrontPage = () => {
  const { setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme('');
  }, [setTheme]);

  return (
    <div>
      <h1>Under Construction</h1>
      <p> - Eli Shaw</p>
      <Link to="anime">my anime list</Link>
      <br />
      <Link to="revolution-randomizer">revolution randomizer</Link>
    </div>
  );
};

export default FrontPage;
