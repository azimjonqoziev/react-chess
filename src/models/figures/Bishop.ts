import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    // determines the corresponding move logic of this figure
    canMove(target: Cell): boolean {
        // check if the target cell is valid for the move
        if (!super.canMove(target))
            return false;
        if (this.cell.isEmptyDiagonal(target))
            return true;
        return true;
    }
}