import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import  CellComponent  from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    // set selected cell only if the cell has a figure
    function click(cell: Cell) {
        // if we have a selected cell with a figure on it and the cell is not the same as the one we want to select
        // and canMove returns true for that cell, i.e. we can move to that cell
        // we move to that cell by using moveFigure method and provide the cell we want to move to as a parameter
        // after all, we reset the selected cell
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            // swap player after the move
            swapPlayer();
            setSelectedCell(null);
            updateBoard();
        } else {
            // can't select figures of the opponent
            // check if the color of the figure on the cell is the same as the current player's figure color
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    // highlight cells that are available to move
    function highlightCells() { 
        board.highlightCells(selectedCell);
        updateBoard();
    }

    // update the board
    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Currnet Player: {currentPlayer?.color}</h3>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map((cell) =>
                            <CellComponent
                                click={click}
                                cell={cell}
                                key={cell.id}
                                // if the current cell of coord. x || y === to the coord. x || y of the selected cell
                                // then the cell is selected
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;