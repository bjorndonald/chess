/// <reference path="piece.ts" />

namespace Chess {
    export class Pawn extends Piece {
        constructor(readonly side: Side, defaultPosition: Position) {
            const key = side.color === ColorType.BLACK ?
                ChessPiece.BLACK_CHESS_PAWN
                : ChessPiece.BLACK_CHESS_PAWN
            super(key, side, defaultPosition)
        }

        override getPossibleMoves(getPieceAtPositon: (pos: Position) => Piece | undefined, side: Side): Move[] {
            const possibleMoves: Move[] = []
            let newPosition: Position, x: number, y: number

            const currentPosition = this.getPosition()
            if ((currentPosition.y === 0 && this.side.direction === Direction.BOTTOM) ||
                (currentPosition.y === numberOfCells - 1 && this.side.direction === Direction.TOP)) {
                return []
            }

            // Position in front of the pawn
            y = this.side.direction === Direction.BOTTOM
                ? currentPosition.y - 1 : currentPosition.y + 1
            newPosition = {
                ...currentPosition,
                y
            }

            let pieceAtPosition = getPieceAtPositon(newPosition)
            possibleMoves.push({
                piece: this,
                newPosition,
                canMove: !pieceAtPosition,
            })

            // Position in front of the pawn and to left side
            if (currentPosition.x === 0) {
                x = currentPosition.x - 1
                newPosition = {
                    ...newPosition,
                    x
                }
                let pieceAtPosition = getPieceAtPositon(newPosition)
                if (pieceAtPosition && this.side.color !== side.color)
                    possibleMoves.push({
                        piece: this,
                        newPosition,
                        canMove: true,
                        ...(this.side.color !== side.color && { canKill: pieceAtPosition })
                    })
            }

            // Position in front of the pawn and to right side
            if (currentPosition.x === numberOfCells - 1) {
                x = currentPosition.x + 1
                newPosition = {
                    ...currentPosition,
                    x
                }
                let pieceAtPosition = getPieceAtPositon(newPosition)
                if (pieceAtPosition && this.side.color !== side.color)
                    possibleMoves.push({
                        piece: this,
                        newPosition,
                        canMove: true,
                        ...(this.side.color !== side.color && { canKill: pieceAtPosition })
                    })
            }

            return possibleMoves
        }
    }
}