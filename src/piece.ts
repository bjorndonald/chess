namespace Chess {
    export enum chessPiece {
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

    export enum ColorType {
        WHITE, BLACK
    }

    export class Piece {
        id: string
        name: string
        key: chessPiece
        color: ColorType

        constructor(key: chessPiece) {
            const index = Object.values(chessPiece).findIndex((val: string) => key === val)
            this.name = Object.keys(chessPiece)[index]
            this.key = key
            this.id = "id" + Math.random().toString(16).slice(2)
            this.color = index < 5 ? ColorType.WHITE : ColorType.BLACK
        }
    }
}