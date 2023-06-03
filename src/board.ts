/// <reference path="piece.ts" />

namespace Chess {
    export class Board {
        possibleMoves: Move[]
        piecedynamics: PieceDynamics[]
        size: number
        static numberOfPieces = 8

        constructor(size: number, wrapperId: string) {
            this.piecedynamics = this.createChessPiece()
            this.size = size
            this.setup(wrapperId)
            this.possibleMoves = []
        }

        getPieceByPosition(pos: PositionOptions): PieceDynamics | undefined | null {
            const dynamic = this.piecedynamics.find((val, index) => {
                return val.position.x === pos.x && val.position.y === pos.y
            })
            return dynamic
        }

        showPossibleMoves = (event: HTMLElement) => {

        }

        setup(wrapperId: string) {
            const chess = document.getElementById(wrapperId)
            const board = document.createElement("div")
            board.id = "chess-board"
            board.style.width = (this.size) + "px"
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
                    box.style.height = (this.size / Board.numberOfPieces) + "px"
                    row?.appendChild(box)
                    const dynamics = this.getPieceByPosition({ x: x, y: y })
                    if (!!dynamics) {
                        const piece = document.createElement("div")
                        piece.id = "piece" + dynamics.piece.id
                        piece.className = "piece"

                        piece.setAttribute("name", dynamics.piece.name)
                        box.appendChild(piece)
                        const span = document.createElement("span")
                        span.innerHTML = dynamics.piece.key
                        piece.appendChild(span)
                    }
                })
            })
        }


        createChessPiece() {
            let dynamics: PieceDynamics[] = []
            dynamics.push(...this.createPawns())
            dynamics.push(...this.createRooks())
            dynamics.push(...this.createKnights())
            dynamics.push(...this.createBishops())
            dynamics.push(...this.createQueens())
            dynamics.push(...this.createKings())
            return dynamics
        }

        createPawns(): PieceDynamics[] {
            let dynamics: PieceDynamics[] = []
            var arr = [...new Array(8)].map((val, index) => {
                let piece = new Piece(chessPiece.WHITE_CHESS_PAWN)
                let dynamic = new PieceDynamics(movementType.UP_ONCE, piece, { x: index, y: 1 })
                val = dynamic
                return dynamic
            })

            dynamics.push(...arr)
            arr = [...new Array(8)].map((val, index) => {
                let piece = new Piece(chessPiece.BLACK_CHESS_PAWN)
                let dynamic = new PieceDynamics(movementType.UP_ONCE, piece, { x: index, y: Board.numberOfPieces - 2 })
                val = dynamic
                return dynamic
            })
            dynamics.push(...arr)
            return dynamics
        }

        createRooks(): PieceDynamics[] {
            let dynamics: PieceDynamics[] = []
            let piece = new Piece(chessPiece.WHITE_CHESS_ROOK)
            let dynamic = new PieceDynamics(movementType.STRAIGHT, piece, { x: 0, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.WHITE_CHESS_ROOK)
            dynamic = new PieceDynamics(movementType.STRAIGHT, piece, { x: Board.numberOfPieces - 1, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_ROOK)
            dynamic = new PieceDynamics(movementType.STRAIGHT, piece, { x: 0, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_ROOK)
            dynamic = new PieceDynamics(movementType.STRAIGHT, piece, { x: Board.numberOfPieces - 1, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            return dynamics
        }

        createBishops(): PieceDynamics[] {
            let dynamics: PieceDynamics[] = []
            let piece = new Piece(chessPiece.WHITE_CHESS_BISHOP)
            let dynamic = new PieceDynamics(movementType.DIAGONAL, piece, { x: 2, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.WHITE_CHESS_BISHOP)
            dynamic = new PieceDynamics(movementType.DIAGONAL, piece, { x: Board.numberOfPieces - 3, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_BISHOP)
            dynamic = new PieceDynamics(movementType.DIAGONAL, piece, { x: 2, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_BISHOP)
            dynamic = new PieceDynamics(movementType.DIAGONAL, piece, { x: Board.numberOfPieces - 3, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            return dynamics
        }

        createKnights(): PieceDynamics[] {
            let dynamics: PieceDynamics[] = []
            let piece = new Piece(chessPiece.WHITE_CHESS_KNIGHT)
            let dynamic = new PieceDynamics(movementType.L_SHAPE, piece, { x: 1, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.WHITE_CHESS_KNIGHT)
            dynamic = new PieceDynamics(movementType.L_SHAPE, piece, { x: Board.numberOfPieces - 2, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_KNIGHT)
            dynamic = new PieceDynamics(movementType.L_SHAPE, piece, { x: 1, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_KNIGHT)
            dynamic = new PieceDynamics(movementType.L_SHAPE, piece, { x: Board.numberOfPieces - 2, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            return dynamics
        }

        createQueens(): PieceDynamics[] {
            let dynamics: PieceDynamics[] = []
            let piece = new Piece(chessPiece.WHITE_CHESS_QUEEN)
            let dynamic = new PieceDynamics(movementType.LINEAR, piece, { x: 3, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_QUEEN)
            dynamic = new PieceDynamics(movementType.LINEAR, piece, { x: 3, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            return dynamics
        }

        createKings(): PieceDynamics[] {
            let dynamics: PieceDynamics[] = []
            let piece = new Piece(chessPiece.WHITE_CHESS_KING)
            let dynamic = new PieceDynamics(movementType.MOVE_ONCE, piece, { x: 4, y: 0 })
            dynamics.push(dynamic)
            piece = new Piece(chessPiece.BLACK_CHESS_KING)
            dynamic = new PieceDynamics(movementType.MOVE_ONCE, piece, { x: 4, y: Board.numberOfPieces - 1 })
            dynamics.push(dynamic)
            return dynamics
        }
    }
}

