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
  const [turn, setTurn] = useState(1);
  const [currPlayerSymbol, setCurrentPlayerSymbol] = useState("X");
  const [endGame, setEndGame] = useState(false);

  useEffect(() => {
    console.log(board);
    console.log(endGame);
  }, [board]);

  const nextTurn = () => {
    setCurrentPlayerSymbol(currPlayerSymbol === "X" ? "Y" : "X");
    if (turn === 1) {
      setTurn(2);
    } else setTurn(1);
    console.log(currPlayerSymbol);
  };

  const makeMove = (row, col) => {
    board[row][col] = currPlayerSymbol;
    //make a shallow copy to update the changes or else it might not re-render
    setBoard([...board]);
    //check win after making a move on the board
    checkWin();
  };

  const checkWin = () => {
    if (diagonalWin()) {
      console.log("Winner by the diagonals");
      setEndGame(true);
    } else if (verticalWin()) {
      console.log("Winner by the verticals");
      setEndGame(true);
    } else if (horizontalWin()) {
      console.log("Winner by the horizontals");
      setEndGame(true);
    } else nextTurn();
  };

  const diagonalWin = () => {
    //board col since the row and cols are flipped in the visual
    let firstCheck = true;
    let secondCheck = true;
    //first check from top left to bottom right
    for (let i = 0; i < size; i++) {
      if (board[i][i] !== currPlayerSymbol) {
        firstCheck = false;
        break;
      }
    }
    //skip the other check if there is already a winner
    if (firstCheck) return true;
    //next check from top right to bottom left
    for (let i = 0; i < size; i++) {
      if (board[size - i - 1][i] !== currPlayerSymbol) {
        secondCheck = false;
        break;
      }
    }
    return secondCheck ? true : false;
  };

  const verticalWin = () => {
    //checks each column of the board
    //{row and col is flipped due to the arrangement of the boxes}
    let winner = false;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== currPlayerSymbol) {
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
    //{row and col is flipped due to the arrangement of the boxes}
    let winner = false;
    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size; row++) {
        if (board[row][col] !== currPlayerSymbol) {
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
      <div className="flex flex-col justify-center items-center">
        <span className="fixed -translate-y-32 px-2 py-1 outline-dashed">
          <p>Players:</p>
          <p>X @ Player 1</p>
          <p>Y @ Player 2</p>
        </span>
        <p>Gameboard</p>
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
      <span className="fixed translate-y-28 flex flex-col items-center">
        {endGame ? (
          <>
            <p>Game over!</p>
            <p>
              {currPlayerSymbol} @ Player {turn} wins!
            </p>
          </>
        ) : (
          "Player " + turn + "'s turn"
        )}
      </span>
    </div>
  );
};

export default Gameboard;
