import React, { useState, useEffect } from "react";
import { TZFEGameboard } from "./index";

const TwoZeroFourEight = () => {
  const [boardSize, setBoardSize] = useState(4);
  const [startGame, setStartGame] = useState(false);

  const menu = (
    <section className="flex flex-col border-2 border-stone-400 bg-cyan-800 rounded-lg px-2 py-1">
      <p className="text-lg text-cyan-100 flex items-center justify-center">
        Welcome to 2048
      </p>
      <span className="flex flex-row mt-2">
        <p>Board size: </p>
        <input
          type="text"
          placeholder="4"
          onChange={(e) => {
            if (e.target.value <= 8 && e.target.value >= 3)
              setBoardSize(e.target.value);
            else if (e.target.value > 8) setBoardSize(8);
            else if (e.target.value < 3) setBoardSize(3);
          }}
          className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
        />
      </span>
      <p className="text-xxs w-44 mt-1">^Board size should be 3 to 8</p>
      <button
        className="rounded-md mt-2 bg-stone-300 text-cyan-700 hover:text-cyan-900 hover:bg-stone-400"
        onClick={() => {
          if (boardSize === "") setBoardSize("4");
          setStartGame(true);
        }}
      >
        Start game
      </button>
    </section>
  );

  const gameBoard = (
    <div>
      <span className="flex flex-col items-center justify-center">
        <TZFEGameboard size={boardSize} />
        <p className="flex text-xxs pt-2">
          ^Play by clicking on the arrow keys
        </p>
        <button
          className="flex outline w-40 outline-2 items-center justify-center mt-2 rounded-md bg-indigo-200 text-slate-600 px-2 py-0.5 border-2 border-neutral-400 hover:bg-indigo-300 hover:border-neutral-500 hover:text-slate-900 hover:scale-105"
          onClick={() => {
            setStartGame(false);
          }}
        >
          Restart
        </button>
      </span>
    </div>
  );
  return startGame ? gameBoard : menu;
};

export default TwoZeroFourEight;
