import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KNIGHT;
    }

    // determines the corresponding move logic of this figure
    canMove(target: Cell): boolean {
        // check if the target cell is valid for the move
        if (!super.canMove(target))
            return false;

        // get the difference between the current cell and the target cell
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);

        // check the offsets (1 offset for 1 axis and 2 offset for the other axis)
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
    }
}