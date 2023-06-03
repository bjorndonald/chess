namespace Chess {
    export const numberOfCells = 8

    export type Position = {
        x: number, y: number
    }

    export enum ColorType {
        BLACK, WHITE
    }

    export enum Direction {
        TOP, BOTTOM
    }

    export type Side = {
        color: ColorType,
        direction: Direction
    }

    export enum ChessPiece {
        WHITE_CHESS_KING = '&#9812;',
        WHITE_CHESS_QUEEN = '&#9813;',
        WHITE_CHESS_ROOK = '&#9814;',
        WHITE_CHESS_BISHOP = '&#9815;',
        WHITE_CHESS_KNIGHT = '&#9816;',
        WHITE_CHESS_PAWN = '&#9817;',
        BLACK_CHESS_KING = '&#9818;',
        BLACK_CHESS_QUEEN = '&#9819;',
        BLACK_CHESS_ROOK = '&#9820;',
        BLACK_CHESS_BISHOP = '&#9821;',
        BLACK_CHESS_KNIGHT = '&#9822;',
        BLACK_CHESS_PAWN = '&#9823;'
    }

    export type Move = {
        piece: Piece,
        newPosition: Position,
        canMove: boolean,
        canKill?: Piece
    }

    export abstract class Piece {
        readonly key: string
        readonly marker: ChessPiece
        readonly id: number = new Date().getTime()
        private position: Position
        private alive: boolean = true

        constructor(key: ChessPiece, readonly side: Side, defaultPosition: Position) {
            this.marker = key
            this.position = defaultPosition
            const index = Object.values(ChessPiece).findIndex(val => val === key)
            this.key = Object.keys(ChessPiece)[index]
        }

        getPosition(): Position {
            return this.position
        }

        isAlive(): boolean {
            return this.alive
        }

        move(selectedMove: Move): void {
            this.position = selectedMove.newPosition
            if (selectedMove.canKill)
                selectedMove.canKill.kill()
        }

        getPossibleMoves(getPieceAtPositon: (pos: Position) => Piece | undefined, side: Side): Move[] {
            return []
        }

        kill() {
            this.alive = false
        }
    }
}