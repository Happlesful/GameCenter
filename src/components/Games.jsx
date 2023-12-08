import React, { useState, useEffect } from "react";
import { TwoZeroFourEight, TicTacToe } from "./index";

const Games = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [playTTT, setPlayTTT] = useState(false);
  const [playTZFE, setPlayTZFE] = useState(false);
  const TTT = (
    <div>
      <span className="flex flex-col items-center justify-center">
        <button
          className="outline outline-2 rounded-sm mb-5 px-3 bg-indigo-400 text-cyan-100 hover:bg-indigo-600 hover:text-cyan-100"
          onClick={() => {
            setShowMenu(true);
            setPlayTTT(false);
            setPlayTZFE(false);
          }}
        >
          Back to main menu
        </button>
        <span className="flex flex-col items-center justify-center">
          <TicTacToe />
        </span>
      </span>
    </div>
  );
  const TZFE = (
    <div>
      <span className="flex flex-col items-center justify-center">
        <button
          className="outline outline-2 rounded-sm mb-3 px-3 bg-indigo-400 text-cyan-100 hover:bg-indigo-600 hover:text-cyan-100"
          onClick={() => {
            setShowMenu(true);
            setPlayTTT(false);
            setPlayTZFE(false);
          }}
        >
          Back to main menu
        </button>
        <span className="flex flex-col items-center justify-center">
          <TwoZeroFourEight />
        </span>
      </span>
    </div>
  );
  const mainMenu = (
    <div>
      <section className="flex flex-col px-2 py-1 outline outline-2 outline-gray-300 rounded-sm items-center justified-center bg-teal-700 text-gray-100">
        Let's play games!
        <span className="text-xs pb-2">select game to begin</span>
        <span className="flex flex-col">
          <button
            className="border w-40 hover:text-slate-100 hover:bg-emerald-800"
            onClick={() => {
              setPlayTTT(true);
              setShowMenu(false);
            }}
          >
            Tic Tac Toe
          </button>
          <button
            className="border w-40 hover:text-slate-100 hover:bg-emerald-800"
            onClick={() => {
              setPlayTZFE(true);
              setShowMenu(false);
            }}
          >
            2048
          </button>
        </span>
      </section>
    </div>
  );
  return (
    <div>
      <span className="flex flex-col items-center justify-center">
        {showMenu ? mainMenu : playTTT ? TTT : TZFE}
      </span>
    </div>
  );
};

export default Games;
