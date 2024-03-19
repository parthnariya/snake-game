export enum Direction {
  UP = "up",
  DOWN = "down",
  RIGHT = "right",
  LEFT = "left",
}
// ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
export function getDirection(key: string) {
  if (key === "ArrowRight") return Direction.RIGHT;
  if (key === "ArrowLeft") return Direction.LEFT;
  if (key === "ArrowUp") return Direction.UP;
  if (key === "ArrowDown") return Direction.DOWN;
}

export function getCordsInDirection(
  cords: { row: number; col: number },
  direction: Direction | undefined
): { row: number; col: number } {
  if (direction === Direction.DOWN) {
    console.log(cords);
    return {
      row: cords.row + 1,
      col: cords.col,
    };
  }
  if (direction === Direction.UP) {
    return {
      row: cords.row - 1,
      col: cords.col,
    };
  }
  if (direction === Direction.RIGHT) {
    return {
      row: cords.row,
      col: cords.col + 1,
    };
  }
  if (direction === Direction.LEFT) {
    return {
      row: cords.row,
      col: cords.col - 1,
    };
  }
  return cords;
}

export function isOutOfBound({
  col,
  row,
  board,
}: {
  row: number;
  col: number;
  board: number[][];
}): boolean {
  return row < 0 || col < 0 || row >= board.length || col >= board[0].length;
}
