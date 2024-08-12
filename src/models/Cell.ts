import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";
import { Board } from "./Board";

export class Cell { 
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; // Can a figure be moved to this cell?
    id: number; // For react keys

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty() {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean { 
        if (target.figure) { 
            return this.figure?.color !== target.figure.color;
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean { 
        if (this.x !== target.x) { 
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        // check if the cells in the vertical direction are empty
        for (let y = min + 1; y < max; y++) { 
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean { 
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        // check if the cells in the horizontal direction are empty
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEmptyDiagonal(target: Cell): boolean { 
        // the difference between 2 cells diagonally on x and y axis is always equal
        // use Math.abs to get the absolute value since we can move in different directions
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        // if the difference is not equal we can't move diagonally
        if (absX !== absY)
            return false;

        // check if the diagonal cells are empty
        // if the current cell coordinate on x and y axis is less than the target cell coordinate on x and y axis
        // assign 1, otherwise assign -1
        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        // move up through the calue of the absolute difference
        for (let i = 1; i < absY; i++) { 
            // add dx and dy multiplied by index i to the current cell coordinate on x and y axis
            // thus, we get the direction of the move 
            // if the direction is negative, we multiply by -1 and get x - index
            // otherwise, we multiply by 1 and get x + index (the same for y axis)
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
                return false;
        }
        // if the cells are empty, we can move diagonally
        return true;
    }

    // method to set the figure on the cell and break loop dependency
    setFigure(figure: Figure) { 
        // set figure for the current cell
        this.figure = figure;
        // set the figure for the tartget cell as well
        this.figure.cell = this;
    }

    moveFigure(target: Cell) { 
        if (this.figure && this.figure?.canMove(target)) { 
            this.figure.moveFigure(target);
            // remove figure from its initial cell after the move
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
}