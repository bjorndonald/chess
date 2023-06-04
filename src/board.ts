import { Chess } from "./piece"
export class Board {

    constructor(size: number, public wrapperId: string) {
        Chess.sizeOfBoard = size
        this.setup()
        // let topSide: Side = {
        //     color: ColorType.BLACK,
        //     direction: Direction.TOP
        // }
        // let bottomSide: Side = {
        //     color: ColorType.WHITE,
        //     direction: Direction.BOTTOM
        // }
        // let pawn = new Pawn(topSide, { x: 0, y: 1 })
        // let secondPawn = new Pawn(bottomSide, { x: 1, y: 2 })

        // piecesAvailable.push(pawn)
        // piecesAvailable.push(secondPawn)

        // console.log(pawn.getPossibleMoves())
    }

    setup() {
        const chess = document.getElementById(this.wrapperId)
        const board = document.createElement("div")
        board.id = "chess-board"
        board.style.width = (Chess.sizeOfBoard) + "px"
        chess?.appendChild(board);
        [...new Array(8)].map((val, y) => {
            const row = document.createElement("div")
            row.className = "row"
            board?.appendChild(row);
            [...new Array(8)].map((value, x) => {
                const box = document.createElement("div")
                box.id = "box" + (y * x)
                box.className = "box"
                box.setAttribute("data-x", x + "")
                box.setAttribute("data-y", y + "")
                box.style.height = (Chess.sizeOfBoard / Chess.numberOfCells) + "px"
                row?.appendChild(box)
            })
        })
    }
}
