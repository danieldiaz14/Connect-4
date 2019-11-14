import React, { useState } from 'react';



export const Circle = ({color}) => {

    return (
        <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="3" fill={color}/>
        </svg>
    )
}