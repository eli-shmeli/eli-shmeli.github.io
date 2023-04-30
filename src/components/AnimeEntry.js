import React from "react";

const AnimeEntry = ({ title, img, summary, info }) => {
  return (
    <div className="entry">
      <div className="title">{title}</div>
      <img src={img} alt="" />
      <div className="summary">{summary}</div>
      <div className="icon1"></div>
      <div className="info">
        <div className="info_textbox">
          <div className="info_contents">{info}</div>
        </div>
      </div>
    </div>
  );
};

export default AnimeEntry;
