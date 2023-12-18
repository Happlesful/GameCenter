import React, { useState, useEffect } from "react";
import { AirplaneGameBoard } from "./index";

const Airplane = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [numberPlayers, setNumberPlayers] = useState(0);

  const menu = (
    <section className="flex flex-col border-2 border-stone-400 bg-cyan-800 rounded-lg px-2 py-1">
      <p className="text-lg text-cyan-100 flex items-center justify-center">
        Welcome to Airplane mode
      </p>
      <span className="flex flex-row mt-2">
        <p>Number of players: </p>
        <input
          type="text"
          placeholder="4"
          onChange={(e) => {
            {
              e.target.value <= 2
                ? setNumberPlayers(2)
                : e.target.value > 4
                ? setNumberPlayers(e.target.value)
                : setNumberPlayers(e.target.value);
            }
          }}
          className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
        />
      </span>
      <p className="text-xxs w-44 mt-1">^Number of players between 2 - 4</p>
      <button
        className="rounded-md mt-2 bg-stone-300 text-cyan-700 hover:text-cyan-900 hover:bg-stone-400"
        onClick={() => {
          setShowMenu(false);
        }}
      >
        Start game
      </button>
    </section>
  );

  return (
    <div className="flex flex-col justify-center items-center">
      {showMenu ? menu : <AirplaneGameBoard players={numberPlayers} />}
    </div>
  );
};

export default Airplane;
