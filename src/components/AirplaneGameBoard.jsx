import React, { useState, useEffect } from "react";

const createBoard = () => {
  const board = [];
  for (let i = 0; i < 12; i++) {
    board.push([...Array(12)]);
  }
  return board;
};

const AirplaneGameBoard = (Props) => {
  const { players } = Props;
  const [turnPlayer, setTurnPlayer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const board = createBoard();

  const initialiseGameBoard = (row, col) => {
    //checks if the part of the board should be lighted up
    return checkCorners(row, col) || checkCentral(row, col);
  };

  const checkCorners = (row, col) => {
    //checks the corners of the board to be lighted up
  };

  const checkCentral = (row, col) => {
    //checks the central of the board to be lighted up
  };

  return (
    <div className="p-4">
      <section className="flex flex-col items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNS_W5rfsGTHpMIbs0dAzMFTlHniL8iyMpy3BeRkseVjETwcZA20O7bH8eltSqLt_EaN8&usqp=CAU"
          alt="AirplaneBoard"
        />
        <span className="flex flex-row py-2 items-center justify-center">
          Airplane
        </span>
        <span>
          {board.map((col, indexCol) => {
            return (
              <div className="flex flex-row" key={indexCol}>
                {col.map((row, indexRow) => {
                  return (
                    <div
                      className={`flex flex-col w-10 h-10 rounded-2xl  ${
                        indexCol === 0 ||
                        indexCol === 11 ||
                        indexRow === 0 ||
                        indexRow === 11 ||
                        indexRow === indexCol ||
                        indexRow === 11 - indexCol
                          ? "border border-sky-400 hover:ring-4"
                          : ""
                      }`}
                      key={indexRow}
                    >
                      {""}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </span>
      </section>
    </div>
  );
};

export default AirplaneGameBoard;

//airplane gameboard that only lines the outer section with dice rolls
//check if it is possible to use java instead of javascript for the logic of the gameboard
//animation for dice roll
