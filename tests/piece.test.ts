import { Board } from "../src/board"
import { Pawn } from "../src/pawn"
import { Chess } from "../src/piece"
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './../test/index.html'), 'utf8');
jest.dontMock('fs');

describe('Piece component', () => {
    let side: Chess.Side, defaultPosition: Chess.Position, piece: Chess.Piece, pieceDom: HTMLElement
    const widthOfCells = (Chess.sizeOfBoard / Chess.numberOfCells)
    beforeAll(() => {
        side = {
            color: Chess.ColorType.WHITE,
            direction: Chess.Direction.TOP
        }
        defaultPosition = { x: 0, y: 0 }

        document.documentElement.innerHTML = html.toString();
        const board = new Board(1000, "chess")
        piece = new Pawn(side, defaultPosition)
        pieceDom = document.getElementById(piece.id + "") as HTMLElement
    })

    afterEach(jest.resetModules);


    it('Check if piece object is created correctly', () => {
        expect(piece.key).toBe("WHITE_CHESS_PAWN")
        expect(piece.marker).toBe(Chess.ChessPiece.WHITE_CHESS_PAWN)
        expect(piece.getPosition()).toBe(defaultPosition)
    })

    it('Check if piece object is renders correctly', () => {
        const widthOfCells = (Chess.sizeOfBoard / Chess.numberOfCells)
        let width = pieceDom?.style.width
        let height = pieceDom?.style.height
        let top = pieceDom?.style.top
        let left = pieceDom?.style.left
        let key = pieceDom?.getAttribute("data-key")
        let marker = pieceDom?.querySelector("span")?.textContent

        expect(width).toBe(widthOfCells + "px")
        expect(height).toBe(widthOfCells + "px")
        expect(piece.getPosition().x + "px").toBe(left)
        expect(piece.getPosition().y + "px").toBe(top)
        expect(key).toBe(piece.key)
        expect(marker).toBe('♙')
    })

    it('Check if piece object moves to correct position', () => {
        let y = piece.getPosition().y + 1

        piece.move({
            piece,
            newPosition: { x: piece.getPosition().x, y: piece.getPosition().y + 1 },
            canMove: true
        })

        let top = pieceDom?.style.top
        let left = pieceDom?.style.left

        expect(piece.getPosition().x + "px").toBe(left)
        expect(y * widthOfCells + "px").toBe(top)
    })
})
