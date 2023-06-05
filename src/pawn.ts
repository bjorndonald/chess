// <reference path="piece.ts" />

import { Chess } from "./piece"

export class Pawn extends Chess.Piece {
    constructor(readonly side: Chess.Side, defaultPosition: Chess.Position) {
        const key = side.color === Chess.ColorType.BLACK ?
            Chess.ChessPiece.BLACK_CHESS_PAWN
            : Chess.ChessPiece.WHITE_CHESS_PAWN
        super(key, side, defaultPosition)
    }

    override getPossibleMoves(): Chess.Move[] {
        const possibleMoves: Chess.Move[] = []
        let newPosition: Chess.Position, x: number, y: number

        const currentPosition = this.getPosition()
        if ((currentPosition.y === 0 && this.side.direction === Chess.Direction.BOTTOM) ||
            (currentPosition.y === Chess.numberOfCells - 1 && this.side.direction === Chess.Direction.TOP)) {
            return []
        }

        // Position in front of the pawn
        y = this.side.direction === Chess.Direction.BOTTOM
            ? currentPosition.y - 1 : currentPosition.y + 1
        newPosition = {
            ...currentPosition,
            y
        }

        let pieceAtPosition = this.getPieceAtPositon(newPosition)

        possibleMoves.push({
            piece: this,
            newPosition,
            canMove: !pieceAtPosition,
        })

        // Position in front of the pawn and to left side
        if (currentPosition.x > 0) {
            x = currentPosition.x - 1
            newPosition = {
                ...newPosition,
                x
            }
            pieceAtPosition = this.getPieceAtPositon(newPosition)
            if (pieceAtPosition && this.side.color !== pieceAtPosition.side.color)
                possibleMoves.push({
                    piece: this,
                    newPosition,
                    canMove: true,
                    ...(this.side.color !== pieceAtPosition.side.color && { canKill: pieceAtPosition })
                })
        }

        // Position in front of the pawn and to right side
        if (currentPosition.x < Chess.numberOfCells - 1) {
            x = currentPosition.x + 1
            newPosition = {
                ...newPosition,
                x
            }

            pieceAtPosition = this.getPieceAtPositon(newPosition)

            if (pieceAtPosition && this.side.color !== pieceAtPosition.side.color)
                possibleMoves.push({
                    piece: this,
                    newPosition,
                    canMove: true,
                    ...(this.side.color !== pieceAtPosition.side.color && { canKill: pieceAtPosition })
                })
        }

        return possibleMoves
    }
}
