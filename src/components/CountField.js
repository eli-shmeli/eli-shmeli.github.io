import React from "react";

const CountField = ({ name, setCount, count}) => {

  const handleIncrease = () => {
    if (name === "Force" && count === 3) return;
    if (name === "Blackmail" && count === 4) return;
    if (name === "Gold" && count === 8) return;
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div>{name}</div>
      <button className="btn btn-primary btn-lg" onClick={handleIncrease}>↑</button>
      <div>{count}</div>
      <button className="btn btn-primary btn-lg" onClick={handleDecrease}>↓</button>
    </div>
  );
}

export default CountField;
