import { LinkListNode } from "./LinkList";

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

export function randomNumberForFood(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getNextNodeDirection(
  node: LinkListNode,
  currentDirection: Direction
) {
  if (node.next === null) return currentDirection;
  const { row, col } = node.value;
  const { row: nextRow, col: nextCol } = node.next.value;

  if (nextRow === row && nextCol === col + 1) {
    return Direction.RIGHT;
  }

  if (nextRow === row && nextCol === col - 1) {
    return Direction.LEFT;
  }
  if (nextRow === row + 1 && nextCol === col) {
    return Direction.DOWN;
  }
  if (nextRow === row - 1 && nextCol === col) {
    return Direction.UP;
  }
  return currentDirection;
}

export function getOppositeDirection(direction: Direction) {
  let oppositeDirection: Direction;
  switch (direction) {
    case Direction.DOWN:
      oppositeDirection = Direction.UP;
      break;
    case Direction.UP:
      oppositeDirection = Direction.DOWN;
      break;
    case Direction.LEFT:
      oppositeDirection = Direction.RIGHT;
      break;
    case Direction.RIGHT:
      oppositeDirection = Direction.LEFT;
      break;
    default: {
      oppositeDirection = direction;
    }
  }
  return oppositeDirection;
}

export function getGrowthNodeCords(
  snakeTail: LinkListNode,
  currentDirection: Direction
) {
  const tailNextNodeDirection = getNextNodeDirection(
    snakeTail,
    currentDirection
  );

  const growthDirection = getOppositeDirection(tailNextNodeDirection);

  const currentTailCords = {
    row: snakeTail.value.row,
    col: snakeTail.value.col,
  };

  const growthNodeCords = getCordsInDirection(
    currentTailCords,
    growthDirection
  );

  return growthNodeCords;
}
