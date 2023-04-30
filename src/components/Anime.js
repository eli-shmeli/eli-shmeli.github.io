import React, { Fragment, useContext, useEffect } from "react";

import AnimeEntry from "./AnimeEntry";
import ThemeContext from "./ThemeContext";
import { animeData } from "../constants";

const Anime = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setTheme(`${process.env.PUBLIC_URL}/styles/anime_light_purple.css`);
  }, [setTheme]);

  const renderAnimeEntries = () => {
    const animeEntries = animeData.map((animeEntry, index) => {
      return (
        <AnimeEntry
          title={animeEntry.title}
          img={animeEntry.img}
          summary={animeEntry.summary}
          info={animeEntry.info}
          key={index}
        />
      );
    });

    return animeEntries;
  };

  const toggleStyleSheet = () => {
    if (theme.includes("red")) {
      setTheme(`${process.env.PUBLIC_URL}/styles/anime_light_purple.css`);
    } else {
      setTheme(`${process.env.PUBLIC_URL}/styles/anime_dark_red.css`);
    }
  };

  return (
    <Fragment>
      <div className="top">My Favorite Anime</div>
      <div className="grid">{renderAnimeEntries()}</div>
      <button onClick={() => toggleStyleSheet()}>Switch Stylesheet</button>
    </Fragment>
  );
};

export default Anime;
