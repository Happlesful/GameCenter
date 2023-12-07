import React, { useState, useEffect } from "react";
import { TTTGameboard } from "./index";

const TicTacToe = () => {
  const [boardSize, setBoardSize] = useState("");
  const [player1Symbol, setPlayer1Symbol] = useState("");
  const [player2Symbol, setPlayer2Symbol] = useState("");
  const [startGame, setStartGame] = useState(false);

  const startingWindow = (
    <div>
      <section className="flex flex-col border-2 border-stone-400 bg-cyan-800 rounded-lg px-2 py-1">
        <p className="text-lg text-cyan-100">Welcome to TicTacToe</p>
        <span className="flex flex-row mt-2">
          <p>Board size: </p>
          <input
            type="text"
            placeholder="Board size"
            onChange={(e) => {
              if (e.target.value <= 5 && e.target.value >= 3)
                setBoardSize(e.target.value);
              else if (e.target.value > 5) setBoardSize(5);
              else if (e.target.value < 3) setBoardSize(3);
            }}
            className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
          />
        </span>
        <span className="flex flex-row mt-2">
          <p>Player 1 symbol: </p>
          <input
            type="text"
            placeholder="P1 symbol"
            onChange={(e) => {
              if (e.target.value.length <= 5) setPlayer1Symbol(e.target.value);
            }}
            className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
          />
        </span>
        <span className="flex flex-row mt-2 mb-2">
          <p>Player 2 symbol: </p>
          <input
            type="text"
            placeholder="P2 symbol"
            onChange={(e) => {
              if (e.target.value.length <= 5) setPlayer2Symbol(e.target.value);
            }}
            className="w-16 rounded-md ml-2 h-6 text-xs text-center text-black"
          />
        </span>
        <p className="text-xss w-44">^Board size should be 3 to 5</p>
        <p className="text-xss w-44 leading-4">
          ^Symbols should be &lt;= 5 characters
        </p>
        <button
          className="rounded-md bg-stone-300 text-cyan-700 hover:text-cyan-900 hover:bg-stone-400"
          onClick={() => {
            if (boardSize === "") setBoardSize("3");
            if (player1Symbol === "") setPlayer1Symbol("P1");
            if (player2Symbol === "") setPlayer2Symbol("P2");
            setStartGame(true);
          }}
        >
          Start game
        </button>
      </section>
    </div>
  );

  const gameWindow = (
    <>
      <button
        className="translate-x-24 translate-y-4 rounded-md bg-indigo-200 text-slate-600 px-2 py-0.5 border-2 border-x-neutral-400 hover:bg-indigo-300 hover:border-neutral-500 hover:text-slate-900"
        onClick={() => {
          setStartGame(false);
        }}
      >
        Restart game
      </button>
      <TTTGameboard
        size={boardSize}
        player1={player1Symbol}
        player2={player2Symbol}
      />
    </>
  );

  return startGame ? gameWindow : startingWindow;
};

export default TicTacToe;
