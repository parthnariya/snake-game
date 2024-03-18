import { useEffect } from "react";
import "./App.css";

const validKeys = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

function keyCapture(e: KeyboardEvent) {
  if (validKeys.includes(e.key)) {
    console.log(e.key);
  }
}

const size = 10;

function App() {
  const board = new Array(size).fill(0).map(() => new Array(size).fill(0));
  useEffect(() => {
    document.addEventListener("keydown", keyCapture);
  }, []);
  return (
    <div className="game-container">
      {board.map((row, rowIdx) => (
        <div key={rowIdx} className="row">
          {row.map((_, cellIdx) => (
            <div key={cellIdx} className="cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
