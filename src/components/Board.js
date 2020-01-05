import React from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend';
import BoardSquare from './BoardSquare';
import Knight from './Knight';

function renderPiece(x, y, [knightX, knightY]) {
    if (x === knightX && y === knightY) {
        return <Knight />
    }
}

function renderSquare(i, handleSquareClick, canMoveKnight, knightPosition) {
    const x = i % 8
    const y = Math.floor(i / 8)

    return (
        <div key={i} style={{ width: '12.5%', height: '12.5%' }} onClick={() => handleSquareClick(x, y)}>
            <BoardSquare x={x} y={y} moveKnight={handleSquareClick} canMoveKnight={canMoveKnight}>{renderPiece(x, y, knightPosition)}</BoardSquare>
        </div >
    )
}

export function canMoveKnight(knightPosition, toX, toY) {
    const [x, y] = knightPosition
    const dx = toX - x
    const dy = toY - y

    return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
    )
}

const Board = ({ knightPosition, moveKnight }) => {

    const squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, moveKnight, (x, y) => canMoveKnight(knightPosition, x, y), knightPosition))
    }

    return (
        <DndProvider backend={Backend}>
            <div style={{
                width: '100%', height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                {squares}
            </div>
        </DndProvider>
    );
}

export default Board;