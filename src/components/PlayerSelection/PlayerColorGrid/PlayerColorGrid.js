import "./PlayerColor.css";
import React, { useContext } from "react";
import Circle from "../../svgs/circleSVG";
import { PlayerInfoContext } from "../../App";

const PlayerColorGrid = ({ updateColor, player }) => {
  const PlayerInformation = useContext(PlayerInfoContext);
  const colorChoices = PlayerInformation.playerState[player].colorPicked;
  const updateColorPicked = color => {
    updateColor(PlayerInformation, [color]);
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
