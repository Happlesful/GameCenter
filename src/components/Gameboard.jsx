import React, { useState, useEffect } from "react";

const createBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};
//add the size prop into the gameboard itself for selection
const Gameboard = (Props) => {
  const { size, player1, player2 } = Props;
  const [boardSize, setBoardSize] = useState(parseInt(size));
  const [board, setBoard] = useState(createBoard(boardSize));
  const [currPlayerTurn, setCurrentPlayerTurn] = useState(player1);
  const [endGame, setEndGame] = useState(false);
  const [drawGame, setDrawGame] = useState(false);
  const [moves, setMoves] = useState(1);

  useEffect(() => {
    console.log(board);
    console.log(endGame);
    console.log(moves);
  }, [board]);

  const nextTurn = () => {
    setCurrentPlayerTurn(currPlayerTurn === player1 ? player2 : player1);
    console.log(currPlayerTurn);
  };

  const makeMove = (row, col) => {
    if (endGame || drawGame) return;
    if (board[row][col] === undefined) board[row][col] = currPlayerTurn;
    else return;
    //make a shallow copy to update the changes or else it might not re-render
    setBoard([...board]);
    //check win after making a move on the board
    setMoves(moves + 1);
    checkWin();
  };

  const checkWin = () => {
    console.log("checking win");
    if (diagonalWin()) {
      console.log("Winner by the diagonals");
      setEndGame(true);
    } else if (verticalWin()) {
      console.log("Winner by the verticals");
      setEndGame(true);
    } else if (horizontalWin()) {
      console.log("Winner by the horizontals");
      setEndGame(true);
    } else if (checkDraw()) {
      //display draw message and button to restart game
      //message: no winners this game
      console.log("No winners this round!");
      setDrawGame(true);
    } else nextTurn();
  };

  const checkDraw = () => {
    console.log("checking moves and size");
    console.log(moves);
    console.log(size ** 2);
    if (moves >= size ** 2) return true;
    return false;
  };

  const diagonalWin = () => {
    //board col since the row and cols are flipped in the visual
    let firstCheck = true;
    let secondCheck = true;
    //first check from top left to bottom right
    for (let i = 0; i < size; i++) {
      if (board[i][i] !== currPlayerTurn) {
        firstCheck = false;
        break;
      }
    }
    //skip the other check if there is already a winner
    if (firstCheck) return true;
    //next check from top right to bottom left
    for (let i = 0; i < size; i++) {
      if (board[size - i - 1][i] !== currPlayerTurn) {
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
        if (board[row][col] !== currPlayerTurn) {
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
        if (board[row][col] !== currPlayerTurn) {
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
        <span className="-translate-y-10 -translate-x-12 px-2 py-1 outline-dashed">
          <p>Player 1 - {player1}</p>
          <p>Player 2 - {player2}</p>
        </span>
        <p>Gameboard</p>
        <section>
          <span className="flex flex-row pt-2">
            {board.map((row, rowIndex) => {
              return (
                <span clasName="flex flex-col" key={rowIndex}>
                  {row.map((item, colIndex) => {
                    return (
                      <span
                        className="flex w-10 h-10 border-b-slate-300 outline outline-1 justify-center items-center text-xs"
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
      <span className="translate-y-7">
        {drawGame || endGame ? (
          <span className="flex flex-col items-center rounded-lg px-2 py-1 border-2 border-stone-300 bg-cyan-700">
            <p>Game over!</p>
            {endGame ? (
              <p>{currPlayerTurn} wins!</p>
            ) : (
              <p>No winners this round!</p>
            )}
          </span>
        ) : (
          <p className="flex flex-col items-center rounded-lg px-2 py-1 border-2 border-stone-400 bg-cyan-800">
            {currPlayerTurn}'s turn
          </p>
        )}
      </span>
    </div>
  );
};

export default Gameboard;
