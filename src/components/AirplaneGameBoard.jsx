import React, { useState, useEffect } from "react";

const createBoard = () => {
  const board = [];
  for (let i = 0; i < 15; i++) {
    board.push([...Array(15)]);
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
    return (
      checkCorners(row, col) ||
      checkCentral(row, col) ||
      checkSpecialTiles(row, col)
    );
  };

  const checkCorners = (row, col) => {
    //checks the corners of the board to be lighted up
    if (
      (col < 2 && row < 2) || // Top left sqaure
      (col < 2 && row > 12) || // Top right square
      (col > 12 && row < 2) || // Bottom left square
      (col > 12 && row > 12) // Bottom right square
    ) {
      //checks for the 4 corners
      return true;
    } else if (
      (col === 0 && row < 11 && row > 3) || // Top horizontal line
      (col === 14 && row < 11 && row > 3) || // Bottom horizontal line
      (row === 0 && col < 11 && col > 3) || // Left vertical line
      (row === 14 && col < 11 && col > 3) // Right vertical line
    ) {
      //checks the the horizontals/ verticals at the corners
      return true;
    }
    return false;
  };

  const checkCentral = (row, col) => {
    //checks the central of the board to be lighted up
    if (row === 7 || col === 7) {
      //checks for the central cross
      return true;
    }
    return false;
  };

  const checkSpecialTiles = (row, col) => {
    //checks for additional tiles that specific without a pattern
    if (
      (row === 1 && col === 3) ||
      (row === 3 && col === 1) ||
      (row === 2 && col === 2) ||
      (row === 11) & (col === 1) ||
      (row === 12 && col === 2) ||
      (row === 13 && col === 3) ||
      (row === 13 && col === 11) ||
      (row === 12 && col === 12) ||
      (row === 11 && col === 13) ||
      (row === 1 && col === 11) ||
      (row === 2 && col === 12) ||
      (row === 3 && col === 13)
    ) {
      return true;
    }
  };

  return (
    <div className="p-4">
      <section className="flex flex-col items-center justify-center">
        {/* <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNS_W5rfsGTHpMIbs0dAzMFTlHniL8iyMpy3BeRkseVjETwcZA20O7bH8eltSqLt_EaN8&usqp=CAU"
          alt="AirplaneBoard"
        /> */}
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
                      className={`flex flex-col w-7 h-7 rounded-2xl  ${
                        initialiseGameBoard(indexRow, indexCol)
                          ? "border border-sky-400 hover:ring-4"
                          : ""
                      }`}
                      key={indexRow}
                    ></div>
                  );
                })}
              </div>
            );
          })}
        </span>
      </section>
      <section className="flex items-start">
        <div className="flex flex-col items-center justify-center mt-5">
          Legend
          <div className="flex flex-col items-start border py-1 px-2 justify-center">
            <span className="flex justify-center items-center bg-purple-300 rounded-lg text-slate-800 px-2 my-0.5">
              Player 1: Purple
            </span>
            <span className="flex justify-center items-cente bg-gray-400 rounded-lg text-slate-800 px-2 my-0.5">
              Player 2: Grey
            </span>
            <span className="flex justify-center items-center bg-orange-300 rounded-lg text-slate-800 px-2 my-0.5">
              Player 3: Orange
            </span>
            <span className="flex justify-center items-center bg-green-400 rounded-lg text-slate-800 px-2 my-0.5">
              Player 4: Green
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirplaneGameBoard;

//airplane gameboard that only lines the outer section with dice rolls
//check if it is possible to use java instead of javascript for the logic of the gameboard
//animation for dice roll
