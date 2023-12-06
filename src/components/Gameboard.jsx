import React, { useState, useEffect } from "react";

const createBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

const Gameboard = (Props) => {
  const { size } = Props;
  const [boardSize, setBoardSize] = useState(parseInt(size));
  const [board, setBoard] = useState(createBoard(boardSize));
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    console.log(board);
  }, [board]);

  const makeMove = (row, col) => {
    board[row][col] = "x";
    //make a shallow copy to update the changes or else it might not re-render
    setBoard([...board]);
    //check win after making a move on the board
    checkWin();
  };

  const checkWin = () => {
    // check wins here does not work properly
    // if (diagonalWin()) {
    //   console.log("Winner by the diagonals");
    // }
    //check the logic of horiztonal and vertical, looks weird
    if (verticalWin()) {
      //vertical win works
      console.log("Winner by the verticals");
    }
    if (horizontalWin()) {
      //horizontal win works
      console.log("Winner by the horizontals");
    }
  };

  const diagonalWin = () => {
    //fix the wrong logic in the win checks
    //top-right to bottom-left check
    let c = 0;
    let player = "x";
    let broke1 = false;
    let broke2 = false;
    for (let boardRow in board) {
      console.log("Checking board against player");
      console.log(player);
      console.log(boardRow[c]);
      if (boardRow[c] !== player) {
        broke1 = true;
        break;
      }
      if (!broke1) break;
      c++;
    }
    //top-left to bottom-right check
    player = "x";
    for (let boardRow in board) {
      c--;
      if (boardRow[c] !== player) {
        broke2 = true;
        break;
      }
      if (!broke2) break;
    }
    console.log(broke1, broke2);
    //check if there are any completed diagonals
    if (!broke1 || !broke2) return true;
    return false;
  };

  const verticalWin = () => {
    //checks each column of the board
    //isnt this suppoed to be horizontal?
    const player = "x";
    let winner = false;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== player) {
          //break to the next row since this row does not win
          break;
        } else if (col === size - 1) winner = true;
      }
      if (winner === true) break;
    }
    return winner;
  };

  const horizontalWin = () => {
    //checks each row of the board
    //isnt this supposed to be vertical?
    const player = "x";
    let winner = false;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (board[row][col] !== player) {
          //break to the next row since this row does not win
          break;
        } else if (row === size - 1) winner = true;
      }
      if (winner === true) break;
    }
    return winner;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      Gameboard
      <section>
        <span className="flex flex-row">
          {board.map((row, rowIndex) => {
            return (
              <span clasName="flex flex-col" key={rowIndex}>
                {row.map((item, colIndex) => {
                  return (
                    <span
                      className="flex w-10 h-10 border-b-slate-300 outline outline-1 justify-center items-center"
                      key={colIndex}
                      onClick={() => makeMove(rowIndex, colIndex)}
                    >
                      {item}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
      </section>
    </div>
  );
};

export default Gameboard;

