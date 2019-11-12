import React from 'react';

export const Circle = props => {
    return (
        <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={props.color}/>
        </svg>
    )
}