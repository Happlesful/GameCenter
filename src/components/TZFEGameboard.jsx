import React, { useState, useEffect } from "react";

const createGameBoard = (size) => {
  //create a 4x4 gameboard intially (expand to up to 8x8)
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

//add colours and animations upon keyclick/ move made

const TZFEGameboard = (Props) => {
  const { size } = Props;
  const [boardSize, setBoardSize] = useState(parseInt(size));
  const [board, setBoard] = useState(createGameBoard(boardSize));
  const [checkEndGame, setCheckEndGame] = useState(false);
  const [begin2048, setBegin2048] = useState(true); //set to false to choose between 2 games
  const [processKey, setProcessKey] = useState(false);

  //do not spawn new tiles if the move is illegal (i.e. all already at a side)
  const makeMoveUp = () => {
    //moves all tiles to the top where cols are rows and rows are cols
    for (let c = 0; c < boardSize; c++) {
      let column = board[c];
      //see which tiles can merge and move them to their new positions
      var queue = [];
      for (let v = 0; v < boardSize; v++) {
        if (column[v] !== undefined) {
          queue.push(column[v]);
          column[v] = undefined;
          setBoard([...board]);
        }
      }
      //add the items up and move the item to the top
      let position = 0;
      let sum = 0;
      let summed = 0;
      while (queue.length !== 0) {
        let currVal = queue.shift(); // shift to dequeue elements from the front
        //only add values if they are the same
        if (sum === 0) {
          sum = currVal;
          summed = 1;
        } else if (sum === currVal) {
          //add the 2 values and place them in their new positions
          column[position] = sum + currVal;
          setBoard([...board]);
          sum = 0;
          summed = 0;
          position++;
        } else {
          //if value is different from the previous
          column[position] = sum;
          setBoard([...board]);
          sum = currVal;
          summed = 1;
          position++;
        }
      }
      if (summed !== 0) {
        column[position] = sum;
        setBoard([...board]);
      }
    }
  };

  const makeMoveDown = () => {
    //moves all tiles to the bottom where cols are rows and rows are cols
    for (let c = 0; c < boardSize; c++) {
      let column = board[c];
      //see which tiles can merge and move them to their new positions
      var queue = [];
      for (let v = boardSize - 1; v >= 0; v--) {
        if (column[v] !== undefined) {
          queue.push(column[v]);
          column[v] = undefined;
          setBoard([...board]);
        }
      }
      //add the items up and move the item to the bottom
      let position = boardSize - 1;
      let sum = 0;
      let summed = 0;
      while (queue.length !== 0) {
        let currVal = queue.shift(); // shift to dequeue elements from the front
        //only add values if they are the same
        if (sum === 0) {
          sum = currVal;
          summed = 1;
        } else if (sum === currVal) {
          //add the 2 values and place them in their new positions
          column[position] = sum + currVal;
          setBoard([...board]);
          sum = 0;
          summed = 0;
          position--;
        } else {
          //if value is different from the previous
          column[position] = sum;
          setBoard([...board]);
          sum = currVal;
          summed = 1;
          position--;
        }
      }
      if (summed !== 0) {
        column[position] = sum;
        setBoard([...board]);
      }
    }
  };

  const makeMoveLeft = () => {
    //moves all tiles to the left where cols are rows and rows are cols
    for (let r = 0; r < boardSize; r++) {
      //see which tiles can merge and move them to their new positions
      var queue = [];
      for (let v = 0; v < boardSize; v++) {
        let tileItem = board[v][r];
        if (tileItem !== undefined) {
          queue.push(tileItem);
          board[v][r] = undefined;
          setBoard([...board]);
        }
      }
      //add the items up and move the item to the right
      let position = 0;
      let sum = 0;
      let summed = 0;
      while (queue.length !== 0) {
        let currVal = queue.shift(); // shift to dequeue elements from the front
        //only add values if they are the same
        if (sum === 0) {
          sum = currVal;
          summed = 1;
        } else if (sum === currVal) {
          //add the 2 values and place them in their new positions
          board[position][r] = sum + currVal;
          setBoard([...board]);
          sum = 0;
          summed = 0;
          position++;
        } else {
          //if value is different from the previous
          board[position][r] = sum;
          setBoard([...board]);
          sum = currVal;
          summed = 1;
          position++;
        }
      }
      if (summed !== 0) {
        board[position][r] = sum;
        setBoard([...board]);
      }
    }
  };

  const makeMoveRight = () => {
    //moves all tiles to the right where cols are rows and rows are cols
    for (let r = 0; r < boardSize; r++) {
      //see which tiles can merge and move them to their new positions
      var queue = [];
      for (let v = boardSize - 1; v >= 0; v--) {
        let tileItem = board[v][r];
        if (tileItem !== undefined) {
          queue.push(tileItem);
          board[v][r] = undefined;
          setBoard([...board]);
        }
      }
      //add the items up and move the item to the right
      let position = boardSize - 1;
      let sum = 0;
      let summed = 0;
      while (queue.length !== 0) {
        let currVal = queue.shift(); // shift to dequeue elements from the front
        //only add values if they are the same
        if (sum === 0) {
          sum = currVal;
          summed = 1;
        } else if (sum === currVal) {
          //add the 2 values and place them in their new positions
          board[position][r] = sum + currVal;
          setBoard([...board]);
          sum = 0;
          summed = 0;
          position--;
        } else {
          //if value is different from the previous
          board[position][r] = sum;
          setBoard([...board]);
          sum = currVal;
          summed = 1;
          position--;
        }
      }
      if (summed !== 0) {
        board[position][r] = sum;
        setBoard([...board]);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!checkEndGame && begin2048 && !processKey) {
        setProcessKey(true);
        if (
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          e.preventDefault(); //prevent the default actions of up/down/left/right in the browser
          if (e.key === "ArrowUp") makeMoveUp();
          else if (e.key === "ArrowDown") makeMoveDown();
          else if (e.key === "ArrowLeft") makeMoveLeft();
          else if (e.key === "ArrowRight") makeMoveRight();
          const rowCol = chooseRandomBox();
          const value = choose2or4();
          //new object has to be created to trigger a re-render
          board[rowCol.xIndex][rowCol.yIndex] = value;
          setBoard([...board]);
          console.log(board);
          checkGameEnd();
        }
      }
    };

    const handleKeyUp = (e) => {
      setProcessKey(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const chooseRandomBox = () => {
    //pick a random square to add the new number into of {row, col}
    let roll = Math.round(Math.random() * boardSize ** 2);
    let xIndex = Math.round(roll / boardSize) % boardSize;
    let yIndex = roll % boardSize;
    while (board[xIndex][yIndex] !== undefined) {
      roll = Math.round(Math.random() * boardSize ** 2);
      xIndex = Math.round(roll / boardSize) % boardSize;
      yIndex = roll % boardSize;
    }
    console.log("row: ");
    console.log(yIndex);
    console.log("col: ");
    console.log(xIndex);
    return { xIndex, yIndex };
  };

  const choose2or4 = () => {
    //randomly pick value 2 or 4 to be generated
    const roll = Math.random();
    if (roll < 0.5) return 2;
    return 4;
  };

  const checkGameEnd = () => {
    //checks if all tiles are filled
    for (let tiles in board) {
      for (let values in tiles) {
        if (values === undefined) {
          return;
        }
      }
    }
    setCheckEndGame(true);
    return;
  };

  return (
    <div>
      <section className="flex flex-col items-center justify-center">
        2048
        <span className="flex flex-row pt-2">
          {board.map((row, rowIndex) => {
            return (
              <span className="flex flex-col" key={rowIndex}>
                {row.map((item, colIndex) => {
                  //displays the number in the box here
                  return (
                    <span
                      className="flex w-10 h-10 outline outline-1 outline-fuchsia-300 items-center justify-center"
                      key={colIndex}
                      //add on arrowUp/Down/Left/Right
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

export default TZFEGameboard;
