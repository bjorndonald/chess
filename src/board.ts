/// <reference path="piece.ts" />

namespace Chess {
    export class Board {
        sizeOfBoard: number
        pieces: Piece[] = []

        constructor(size: number) {
            this.sizeOfBoard = size
            let topSide: Side = {
                color: ColorType.BLACK,
                direction: Direction.TOP
            }
            let bottomSide: Side = {
                color: ColorType.WHITE,
                direction: Direction.BOTTOM
            }
            let pawn = new Pawn(topSide, { x: 0, y: 1 })
            let secondPawn = new Pawn(bottomSide, { x: 1, y: 2 })

            this.pieces.push(pawn)
            this.pieces.push(secondPawn)
            console.log(pawn.getPossibleMoves(this.getPieceAtPositon, topSide))
        }

        getPieceAtPositon(pos: Position, board: Board = this): Piece | undefined {
            return board.pieces.find((val) => val.getPosition().x === pos.x && val.getPosition().y === pos.y)
        }
    }
}