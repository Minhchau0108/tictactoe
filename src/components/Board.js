import React from "react";

const Board = ({ squares, onClick }) => {
  console.log("render Board");
  return (
    <div className="board">
      {squares.map((square, index) => (
        <button key={index} className="square" onClick={() => onClick(index)}>
          {square}
        </button>
      ))}
    </div>
  );
};

export default Board;
