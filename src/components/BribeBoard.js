import React from "react";
import '../custom.css';

const BribeBoard = ({ peopleBribes }) => {
  const renderPersonBribe = (person, bribes) => {
    let currencies = "";
    for (let i = 0; i < bribes.length; i++) {
      if (i === 0) {
        for (let j = 0; j < bribes[0]; j++) {
          currencies = currencies + "👊";
        }
      }
      if (i === 1) {
        for (let j = 0; j < bribes[1]; j++) {
          currencies = currencies + "📧";
        }
      }
      if (i === 2) {
        for (let j = 0; j < bribes[2]; j++) {
          currencies = currencies + "🏅";
        }
      }
    }

    return <div className="small-text">{person + ": " + currencies}</div>;
  };

  const renderedList = Object.keys(peopleBribes).map((person) => {
    const bribeList = peopleBribes[person];
    return (
      <div key={person}>{renderPersonBribe(person, bribeList)}</div>
    );
  });

  return <div className="bribe-board">{renderedList}</div>;
};

export default BribeBoard;
