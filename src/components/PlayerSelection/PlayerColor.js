import React from 'react';

import Circle from '../svgs/circleSVG';

const PlayerColor = ({colors, handleClick}) => {

    const renderGrid = () => {
        const renderColors = colors.map((color, index) => {
            return (
                <div key={index} className="three wide column" onClick={() => handleClick(color)}>
                    <Circle color={color}/>
                </div>
            );
        });
        return (
            <div className="ui grid">
                {renderColors}
            </div>
        )
    }

    return (
        <div className="ui container">
            {renderGrid()}
        </div>
    )
};

export default PlayerColor;