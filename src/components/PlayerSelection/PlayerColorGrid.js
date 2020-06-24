import "./PlayerColor.css";
import React, { useState } from "react";
import Circle from "../svgs/circleSVG";
import { COLOR_CHOICES as colors } from "./constants";

const PlayerColorGrid = ({ handleClick }) => {
  const [colorChoices, updateColorChoices] = useState(colors);

  const updateColorPicked = (color) => {
    handleClick(color);
    updateColorChoices([color]);
  };
  const renderGrid = () => {
    const renderColors = colorChoices.map((color, index) => {
      return (
        <div
          key={index}
          className="four wide column hover"
          onClick={() => updateColorPicked(color)}
        >
          <Circle color={color} />
        </div>
      );
    });
    return <div className="ui grid">{renderColors}</div>;
  };
  return <div className="ui container">{renderGrid()}</div>;
};

export default PlayerColorGrid;
