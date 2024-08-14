import { Colors } from "../Colors";
import logo from '../../assets/black-king.png'
import { Cell } from "../Cell";

export enum FigureNames {
    FIGURE = "Figure",
    KING = "King",
    KNIGHT = "Knight",
    PAWN = "Pawn",
    QUEEN = "Queen",
    ROOK = "Rook",
    BISHOP = "Bishop"
}

export class Figure { 
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    // determines the move logic of the figures
    canMove(target: Cell): boolean { 
        // check the colors of the target figures since you can't capture your own figures
        if (target.figure?.color === this.color)
            return false;
        // cehck if the target figure is NOT KING since you can't capture the KING
        if (target.figure?.name === FigureNames.KING)  
            return false;
        return true;
    }   // the rest of the move logic is determined in the corresponding classes of each figure because each figure has a different move logic

    moveFigure(target: Cell) { 
        
    }
}