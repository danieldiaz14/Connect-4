import './Connect4Board.css';
import React, { useState , useEffect} from 'react';

import { Circle } from '../svgs/circleSVG';

const Connect4Board = props => {
    
    const [gameBoard, updateBoard] = useState([]);

    useEffect( () => updateBoard(createBoard()), []);

    const createBoard = () => {
        const board = [];

        for (let i = 0; i < 6; i++) {
            board[i] = new Array(7).fill(0);
        };
        return board;
    };

    const renderBoard = () => {
        const board = gameBoard.map( row => row.map( circleValue => {
            const color = circleValue === 0 ? "white" : circleValue === 1 ? "red" : "yellow"
            return (
                <div className="column">
                    <Circle color={color}/>
                </div>
            )
        }))
        return board;
    }

    return (
        <div className="ui seven column padded grid">
            <div className="column">
                {renderBoard()[0]}
            </div>
            <div className="column">
                {renderBoard()[1]}
            </div>
            <div className="column">
                {renderBoard()[2]}
            </div>
            <div className="column">
                {renderBoard()[3]}
            </div>
            <div className="column">
                {renderBoard()[4]}
            </div>
            <div className="column">
                {renderBoard()[5]}
            </div>
            <div className="column">
                {renderBoard()[6]}
            </div>
        </div>
    )
};

export default Connect4Board;