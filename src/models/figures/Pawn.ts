import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";

export class Pawn extends Figure {

    isFirstStep: boolean = true;
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.PAWN;
    }

    // determines the corresponding move logic of this figure
    canMove(target: Cell): boolean {
        // check if the target cell is valid for the move
        if (!super.canMove(target))
            return false;

        // determine the direction of the move
        // WHITE figures move up, BLACK figures move down
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
        // PAWN can't move backwards and can only attack diagonally
        // PAWN can move 1 or 2 cells forward in the first move
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

        // VERICAL ATTACK
        // check if the offset is 1 or 2 cells forward in the first move
        if ((target.y === this.cell.y + direction || this.isFirstStep
            && (target.y === this.cell.y + firstStepDirection))
            // check if the offset is going through just 1 lane on x axis since PAWN can't move right/left
            && target.x === this.cell.x
            // check if the target cell is empty
            && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true;
        }

        // DIAGONAL ATTACK
        // check if we move 1 cell up or down depending on the color
        if (target.y === this.cell.y + direction
            // check if we offset 1 diagonally on the x axis
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            // check if the enemy is on the target cell 
            && this.cell.isEnemy(target)) {
            return true;
        }
        return false;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}