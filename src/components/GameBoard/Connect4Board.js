import React, { useState } from "react";

import Circle from "../svgs/circleSVG";

const Connect4Board = props => {
  const { gameBoard, updateBoard } = props;
  // can create a constant that will be the initial state for playerTurn.
  const [playerTurn, updateTurn] = useState(Math.random() >= 0.5);
  // this is ok.
  const changeCircleValue = (rowIndex, columnIndex) => {
    if (!gameBoard[rowIndex][columnIndex]) {
      const updateValue = playerTurn ? 1 : 2;
      gameBoard[rowIndex][columnIndex] = updateValue;
      updateBoard([...gameBoard]);
      updateTurn(!playerTurn);
    }
  };

  const renderBoard = () => {
    const board = gameBoard.map((row, rowIndex) =>
      row.map((circleValue, columnIndex) => {
        const color =
          circleValue === 0 ? "white" : circleValue === 1 ? "red" : "yellow";
        return (
          <div
            key={columnIndex}
            className="column"
            onClick={() => changeCircleValue(rowIndex, columnIndex)}
          >
            <Circle color={color} />
          </div>
        );
      })
    );
    return board;
  };

  // Don't invoke renderBoard multiples times. Save as a constant and extract the data needed for each row.

  return (
    <div className="ui seven column padded grid">
      <div className="row">{renderBoard()[0]}</div>
      <div className="row">{renderBoard()[1]}</div>
      <div className="row">{renderBoard()[2]}</div>
      <div className="row">{renderBoard()[3]}</div>
      <div className="row">{renderBoard()[4]}</div>
      <div className="row">{renderBoard()[5]}</div>
      <div className="row">{renderBoard()[6]}</div>
    </div>
  );
};

export default Connect4Board;
