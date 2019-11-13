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
        const board = gameBoard.map( row => row.map( test => {
            return (
                <div className="column">
                    <Circle color="white"/>
                </div>
            )
        }))
        return board;
    }
    
    return (
        <div className="ui stackable six column grid">
            {renderBoard()}
        </div>
    )
};

export default Connect4Board;