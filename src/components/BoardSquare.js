import React from 'react';
import { useDrop } from 'react-dnd'
import Square from './Square';
import Overlay from './Overlay';

const BoardSquare = ({ x, y, moveKnight, children, canMoveKnight }) => {

    const black = (x + y) % 2 === 1;
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: 'KNIGHT',
        drop: () => moveKnight(x, y),
        canDrop: () => canMoveKnight(x, y),
        collect: mon => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop(),
        }),
    });

    return (<div
        ref={drop}
        style={{
            position: 'relative',
            width: '100%',
            height: '100%',
        }}
    >
        <Square black={black}>{children}</Square>
        {isOver && !canDrop && <Overlay color="red" />}
        {!isOver && canDrop && <Overlay color="yellow" />}
        {isOver && canDrop && <Overlay color="green" />}
    </div>)
}

export default BoardSquare;