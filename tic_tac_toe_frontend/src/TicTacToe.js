import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * TicTacToe Component
 * A minimalistic tic tac toe game implementation.
 * - Displays a 3x3 board.
 * - Allows two players to alternate turns.
 * - Shows game status (turn, winner, draw).
 * - Highlights the winning combination.
 * - Allows for restarting the game.
 *
 * Styling is assumed to be available from App.css, as per project conventions.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
}

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * This is the main TicTacToe component with full local state.
   * It renders the board, handles user input, and displays the game status.
   */
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line: winningLine } = calculateWinner(squares);

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  function renderSquare(i) {
    const isWin = winningLine.includes(i);
    return (
      <button
        className={
          "ttt-square" + (isWin ? " ttt-square-win" : "")
        }
        onClick={() => handleClick(i)}
        disabled={!!squares[i] || winner}
        aria-label={`cell-${i} ${squares[i] ? squares[i] : ''}`}
      >
        {squares[i]}
      </button>
    );
  }

  return (
    <div className="ttt-outer">
      <div className="ttt-title">Tic Tac Toe</div>
      <div className="ttt-statusbar">
        {winner ? (
          <span className="ttt-winner">{status}</span>
        ) : (
          <>
            {status.includes("Next player") ? (
              <>
                Next:{" "}
                <span className={xIsNext ? "ttt-x" : "ttt-o"}>
                  {xIsNext ? "X" : "O"}
                </span>
              </>
            ) : (
              status
            )}
          </>
        )}
      </div>
      <div className="ttt-board">
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="ttt-btn-restart" onClick={handleRestart}>
        Restart
      </button>
      <div className="ttt-footer">
        Minimal React Implementation | Two Players |{' '}
        <span style={{ color: "#ff4081" }}>Enjoy!</span>
      </div>
    </div>
  );
}

export default TicTacToe;
