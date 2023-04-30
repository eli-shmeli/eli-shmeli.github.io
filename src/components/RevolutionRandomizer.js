import React, { useState, useContext, useEffect } from "react";
import _ from "lodash";

import CountField from "./CountField";
import BribeBoard from "./BribeBoard";
import GameModeButton from "./GameModeButton";
import ThemeContext from "./ThemeContext";

const blankPeopleBribes = {
  General: [0, 0, 0], // force, blackmail, gold
  Captain: [0, 0, 0],
  Innkeeper: [0, 0, 0],
  Magistrate: [0, 0, 0],
  Priest: [0, 0, 0],
  Aristocrat: [0, 0, 0],
  Merchant: [0, 0, 0],
  Printer: [0, 0, 0],
  Rogue: [0, 0, 0],
  Spy: [0, 0, 0],
  Apothecary: [0, 0, 0],
  Mercenary: [0, 0, 0],
};

const bribees = [
  "General",
  "Captain",
  "Innkeeper",
  "Magistrate",
  "Priest",
  "Aristocrat",
  "Merchant",
  "Printer",
  "Rogue",
  "Spy",
  "Apothecary",
  "Mercenary",
];

const RevolutionRandomizer = () => {
  const { setTheme } = useContext(ThemeContext);

  const [forceCount, setForceCount] = useState(0);
  const [blackmailCount, setBlackmailCount] = useState(0);
  const [goldCount, setGoldCount] = useState(5);
  const [peopleBribes, setPeopleBribes] = useState(blankPeopleBribes);
  const [gameMode, setGameMode] = useState("early");

  useEffect(() => {
    setTheme(
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    );
  }, [setTheme]);

  const randomize = () => {
    let assignment, valid;

    do {
      assignment = generateRandomAssignment(
        forceCount,
        blackmailCount,
        goldCount,
        gameMode
      );
      valid = checkValidAssignment(assignment);
      if (!valid) {
        console.log("rerolling...");
      }
    } while (!valid);

    setPeopleBribes({ ...assignment });
  };

  const checkValidAssignment = (assignment) => {
    return (
      checkNoIllegalAssignments(assignment) &&
      checkLessThanSevenBribes(assignment)
    );
  };

  const checkLessThanSevenBribes = (assignment) => {
    let peopleBribed = 0;
    for (let key in assignment) {
      const bribes = assignment[key];
      const sum = bribes.reduce((a, b) => a + b, 0);
      if (sum > 0) {
        peopleBribed += 1;
      }
    }
    return peopleBribed <= 6;
  };

  const checkNoIllegalAssignments = (assignment) => {
    if (assignment["General"][0] > 0) {
      return false;
    }
    if (assignment["Captain"][0] > 0) {
      return false;
    }
    if (assignment["Innkeeper"][1] > 0) {
      return false;
    }
    if (assignment["Magistrate"][1] > 0) {
      return false;
    }
    if (assignment["Rogue"][0] > 0 || assignment["Rogue"][1] > 0) {
      return false;
    }
    if (assignment["Spy"][1] > 0) {
      return false;
    }
    if (assignment["Apothecary"][0] > 0) {
      return false;
    }
    if (assignment["Mercenary"][0] > 0 || assignment["Mercenary"][1] > 0) {
      return false;
    }
    return true;
  };

  const getWeightedDistribution = (gameMode) => {
    switch (gameMode) {
      case "early":
        return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1];
      case "mid":
        return [4, 4, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1];
      case "late":
        return [1, 1, 1, 1, 1, 1, 1, 4, 1, 4, 4, 1];
      default:
        throw new Error("invalid game mode");
    }
  };

  const rollWithProbabilities = (arr) => {
    const totalWeight = arr.reduce((acc, val) => acc + val, 0);
    let currentWeight = 0;
    const randomNum = Math.random() * totalWeight;

    for (let i = 0; i < arr.length; i++) {
      currentWeight += arr[i];
      if (randomNum <= currentWeight) {
        return i;
      }
    }
  };

  const generateRandomAssignment = (force, blackmail, gold, gameMode) => {
    const assignment = _.cloneDeep(blankPeopleBribes);
    const weightedDistribution = getWeightedDistribution(gameMode);

    for (let i = 0; i < force; i++) {
      const chosenIndex = rollWithProbabilities(weightedDistribution);
      const personToBribe = bribees[chosenIndex];
      assignment[personToBribe][0]++;
    }

    for (let i = 0; i < blackmail; i++) {
      const chosenIndex = rollWithProbabilities(weightedDistribution);
      const personToBribe = bribees[chosenIndex];
      assignment[personToBribe][1]++;
    }

    for (let i = 0; i < gold; i++) {
      const chosenIndex = rollWithProbabilities(weightedDistribution);
      const personToBribe = bribees[chosenIndex];
      assignment[personToBribe][2]++;
    }

    return assignment;
  };

  return (
    <div className="text-center max-width-500-px m-auto">
      <div className="row mb-5">
        <div className="col text-center">
          <CountField
            name="Force"
            setCount={setForceCount}
            count={forceCount}
          />
        </div>
        <div className="col text-center">
          <CountField
            name="Blackmail"
            setCount={setBlackmailCount}
            count={blackmailCount}
          />
        </div>
        <div className="col text-center">
          <CountField name="Gold" setCount={setGoldCount} count={goldCount} />
        </div>
      </div>
      <button className="btn btn-success btn-lg mb-4 mx-1" onClick={randomize}>
        Randomize
      </button>
      <GameModeButton
        setGameMode={setGameMode}
        currentGameMode={gameMode}
        title="Early Game"
        gameMode="early"
      />
      <GameModeButton
        setGameMode={setGameMode}
        currentGameMode={gameMode}
        title="Mid Game"
        gameMode="mid"
      />
      <GameModeButton
        setGameMode={setGameMode}
        currentGameMode={gameMode}
        title="Late Game"
        gameMode="late"
      />
      <BribeBoard peopleBribes={peopleBribes} />
      <div className="mt-5">
        Early game rolls are uniformly random, except the Apothecary is
        excluded.
        <br />
        Mid Game leans toward Printer, General, and Captain.
        <br />
        Late game leans toward Printer, Spy, and Apothecary.
      </div>
    </div>
  );
};

export default RevolutionRandomizer;
