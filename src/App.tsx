import { useCallback, useEffect, useState } from "react";
import "./App.css";
import LinkList, { LinkListNode } from "./utils/LinkList";
import {
  Direction,
  getCordsInDirection,
  getDirection,
  isOutOfBound,
} from "./utils/helpers";

const size = 10;

const boardCreator = (size: number) => {
  let counter = 1;
  const board: number[][] = [];
  for (let index = 0; index < size; index++) {
    const row = [];
    for (let index = 0; index < size; index++) {
      row.push(counter);
      counter = counter + 1;
    }
    board.push(row);
  }
  return board;
};

function App() {
  const board = boardCreator(size);
  const [snakeCells, setSnakeCells] = useState(new Set([44]));
  const [snake, setSnake] = useState(
    new LinkList({ cellValue: 44, col: 3, row: 4 })
  );
  const [direction, setDirection] = useState<Direction | undefined>(
    Direction.RIGHT
  );

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      const newDirection = getDirection(e.key);
      if (newDirection) setDirection(() => newDirection);
    });
  }, []);

  const moveSnake = useCallback(() => {
    const currentHeadCord = {
      row: snake.head.value.row,
      col: snake.head.value.col,
      // cellValue: snake.head.value.cellValue,
    };
    const nextHeadCord = getCordsInDirection(currentHeadCord, direction);
    console.log(nextHeadCord, "nextHeadCord");
    if (isOutOfBound({ row: nextHeadCord.row, col: nextHeadCord.col, board })) {
      console.log("gameOver");
      return;
    }

    const nextHeadCellValue = board[nextHeadCord.row][nextHeadCord.col];
    console.log(nextHeadCellValue, "nextHeadCellValue");
    if (snakeCells.has(nextHeadCellValue)) {
      console.log(snakeCells, "gameOver");
      return;
    }

    const newHead = new LinkListNode({
      col: nextHeadCord.col,
      row: nextHeadCord.row,
      cellValue: nextHeadCellValue,
    });

    const currentHead = snake.head;

    snake.head = newHead;
    currentHead.next = newHead;

    const newSnakeCells = new Set(snakeCells);
    newSnakeCells.delete(snake.tail.value.cellValue);
    newSnakeCells.add(nextHeadCellValue);
    if (snake.tail.next === null) {
      snake.tail = snake.head;
    } else {
      snake.tail = snake.tail.next;
    }
    console.log(snakeCells);
    setSnakeCells(() => newSnakeCells);
  }, [board, direction, snake, snakeCells]);
  useEffect(() => {
    const interval = setInterval(moveSnake, 500);
    // moveSnake();
    return () => clearInterval(interval);
  }, [moveSnake]);
  return (
    <div className="game-container">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((cellValue, cellIdx) => (
            <div
              key={cellIdx}
              className={`cell ${
                snakeCells.has(cellValue) ? "snake-cell" : ""
              }`}
            >
              {cellValue}
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => moveSnake()}>move</button>
    </div>
  );
}

export default App;
