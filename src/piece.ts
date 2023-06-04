export namespace Chess {
    export const numberOfCells = 8
    export let sizeOfBoard: number = 1000
    export const piecesAvailable: Piece[] = []
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

    export type PieceMap = {
        id: number,
        position: Position
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
            this.setup()
        }

        protected getPieceAtPositon(pos: Position): Piece | undefined {
            return piecesAvailable.find((val) => val.getPosition().x === pos.x && val.getPosition().y === pos.y)
        }

        setup(): void {
            const widthOfCells = (sizeOfBoard / numberOfCells)
            const board = document.getElementById("chess-board")
            const pieceDom = document.createElement("div")
            pieceDom.id = this.id + ""
            pieceDom.className = "piece"
            pieceDom.style.width = widthOfCells + "px"
            pieceDom.style.height = widthOfCells + "px"
            pieceDom.style.top = this.position.y * widthOfCells + "px"
            pieceDom.style.left = this.position.x * widthOfCells + "px"
            pieceDom.setAttribute("data-key", this.key)
            pieceDom.setAttribute("data-marker", this.marker)
            board?.appendChild(pieceDom)
            const span = document.createElement("span")
            span.innerHTML = this.marker
            pieceDom.appendChild(span)
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

        getPossibleMoves(side: Side): Move[] {
            return []
        }

        kill() {
            this.alive = false
        }
    }
}
