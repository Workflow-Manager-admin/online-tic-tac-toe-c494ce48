import React, { useState, useEffect } from "react";
import "./App.css";

/*
  Minimalist Light-themed Tic Tac Toe App
  - Centered 3x3 board
  - Two-player (X and O), alternating turns
  - Highlights winning line
  - Displays status (turn, who won, draw)
  - Restart button
*/

// Constants for the game
const BOARD_SIZE = 3;
const LINES = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
function App() {
  // X always starts
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  // Reset game state
  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
  };

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] !== null || winner) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // Check for win or draw after each move
  useEffect(() => {
    // PUBLIC_INTERFACE
    function calculateWinner(squares) {
      for (let line of LINES) {
        const [a, b, c] = line;
        if (
          squares[a] &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return { winner: squares[a], line };
        }
      }
      return null;
    }

    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (board.every((sq) => sq !== null)) {
      setIsDraw(true);
    }
  }, [board]);

  // PUBLIC_INTERFACE
  function renderSquare(idx) {
    const isWinning =
      winner && winningLine && winningLine.includes(idx);
    return (
      <button
        key={idx}
        className={`ttt-square${isWinning ? " ttt-square-win" : ""}`}
        onClick={() => handleSquareClick(idx)}
        aria-label={`cell ${Math.floor(idx / BOARD_SIZE) + 1}, ${
          (idx % BOARD_SIZE) + 1
        }`}
        tabIndex={0}
        disabled={!!winner || isDraw}
      >
        {board[idx]}
      </button>
    );
  }

  // Status message
  let status;
  if (winner) {
    status = (
      <span>
        Winner: <span className="ttt-winner">{winner}</span>
      </span>
    );
  } else if (isDraw) {
    status = <span>Game ended in a draw.</span>;
  } else {
    status = (
      <span>
        Turn: <span className={`ttt-${xIsNext ? "x" : "o"}`}>{xIsNext ? "X" : "O"}</span>
      </span>
    );
  }

  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <div className="ttt-outer">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-statusbar">{status}</div>
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe Board">
          {Array.from({ length: 9 }, (_, idx) => renderSquare(idx))}
        </div>
        <button className="ttt-btn-restart" onClick={handleRestart} aria-label="Restart game">
          Restart
        </button>
        <footer className="ttt-footer">
          <small>
            <span style={{ color: "#1976d2" }}>Minimal React Project</span>
          </small>
        </footer>
      </div>
    </div>
  );
}

export default App;
