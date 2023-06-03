/// <reference path="piece.ts" />
namespace Chess {
    export enum movementType {
        L_SHAPE, DIAGONAL, STRAIGHT, LINEAR, UP_ONCE, MOVE_ONCE
    }

    export interface PositionOptions {
        x: number,
        y: number
    }

    export interface Move {
        current: Piece,
        positionofMove: PositionOptions
        positionOfPiece: PositionOptions,
        canMakeMove: boolean,
        toKill?: Piece
    }

    export class PieceDynamics {
        movementType: movementType
        position: PositionOptions
        piece: Piece
        movement: Movement
        nextMoves: Move[]

        constructor(type: movementType, piece: Piece, defaultPosition: PositionOptions) {
            this.movementType = type
            this.piece = piece
            this.nextMoves = []
            this.position = defaultPosition
            this.movement = new UpOnce()
            if (type === movementType.L_SHAPE) {

            }
            if (type === movementType.DIAGONAL) {

            }
            if (type === movementType.STRAIGHT) {

            }
            if (type === movementType.LINEAR) {

            }
            if (type === movementType.MOVE_ONCE) {

            }
            if (type === movementType.UP_ONCE) {
                this.movement = new UpOnce()
            }
        }

        setNextMoves = (moves: Move[]) => {
            this.nextMoves = moves
        }
    }

    interface Movement {
        move: (currentPos: PositionOptions) => PositionOptions,
        getNextMoves: (currentPos: PositionOptions, checkPosition: (position: PositionOptions) => Piece) => Move[]
    }

    class UpOnce implements Movement {

        move = (currentPos: PositionOptions) => {
            let position = currentPos
            if (position.y >= 0) {
                position.y -= 1
            }

            return position
        }

        getNextMoves = (pos: PositionOptions, checkPosition: (position: PositionOptions) => Piece) => {
            var currentPiece = checkPosition(pos)
            if ((pos.y > 0 && currentPiece.color === ColorType.BLACK) ||
                (pos.y < 7 && currentPiece.color === ColorType.WHITE))
                return []

            let moves: Move[] = []
            let move: Move
            var canMove = false
            var newPosition = { x: pos.x, y: currentPiece.color === ColorType.BLACK ? pos.y + 1 : pos.y - 1 }
            canMove = !checkPosition(newPosition)
            move = {
                canMakeMove: canMove,
                current: currentPiece,
                positionOfPiece: pos,
                positionofMove: newPosition,
            }
            moves.push(move)
            var newPosition = { x: pos.x - 1, y: currentPiece.color === ColorType.BLACK ? pos.y + 1 : pos.y - 1 }
            var anyPiece = checkPosition(newPosition)
            if (anyPiece?.color !== currentPiece.color) {
                move = {
                    canMakeMove: true,
                    current: anyPiece,
                    positionOfPiece: pos,
                    positionofMove: newPosition,
                    toKill: anyPiece
                }
                moves.push(move)
            }
            var newPosition = { x: pos.x + 1, y: currentPiece.color === ColorType.BLACK ? pos.y + 1 : pos.y - 1 }
            var anyPiece = checkPosition(newPosition)
            if (anyPiece?.color !== currentPiece.color) {
                move = {
                    canMakeMove: true,
                    current: currentPiece,
                    positionOfPiece: pos,
                    positionofMove: newPosition,
                    toKill: anyPiece
                }
                moves.push(move)
            }

            return moves
        }
    }

    class Straight implements Movement {

        move = (currentPos: PositionOptions) => {
            let position = currentPos
            if (position.y >= 0) {
                position.y -= 1
            }

            return position
        }

        getNextMoves = (pos: PositionOptions, checkPosition?: (position: PositionOptions) => Piece) => {
            let moves: Move[]
            if (pos.y > 0) {

            }
            return []
        }
    }
}