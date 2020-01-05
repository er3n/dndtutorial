import React, { useState } from 'react';
import Board from '../components/Board';


const Game = () => {
    const randPos = () => Math.floor(Math.random() * 8);
    const [knightPosition, setKnightPosition] = useState([randPos(), randPos()]);

    const moveKnight = (x, y) => {
        setKnightPosition([x, y]);
    }

    return (
        <Board knightPosition={knightPosition} moveKnight={moveKnight} />
    );
}

export default Game;