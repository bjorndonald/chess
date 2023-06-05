import { Board } from "../src/board"
import { Pawn } from "../src/pawn"
import { Chess } from "../src/piece"
import fs from 'fs'
import path from 'path'

const html = fs.readFileSync(path.resolve(__dirname, './../test/index.html'), 'utf8');
jest.dontMock('fs');

describe('Pawn component', () => {

    let side: Chess.Side, defaultPosition: Chess.Position,
        piece: Chess.Piece, secondPiece: Chess.Piece, thirdPiece: Chess.Piece
    beforeAll(() => {
        side = {
            color: Chess.ColorType.WHITE,
            direction: Chess.Direction.TOP
        }
        defaultPosition = { x: 1, y: 0 }

        document.documentElement.innerHTML = html.toString();
        const board = new Board(1000, "chess")
        piece = new Pawn(side, defaultPosition)
    })
    afterEach(jest.resetModules);

    it('Check if pawn object gets the correct amount of possible moves and nothing is in front', () => {

        const moves = piece.getPossibleMoves()
        const expectedMoves: Chess.Move[] = [
            {
                piece,
                newPosition: { x: 1, y: 1 },
                canMove: true
            }
        ]

        expect(moves).toStrictEqual(expectedMoves)
    })

    it('Check if pawn object gets the correct amount of possible moves and something is in front and on right side', () => {
        const otherSide = {
            color: Chess.ColorType.BLACK,
            direction: Chess.Direction.BOTTOM
        }
        const killablePosition = { x: 2, y: 1 }


        secondPiece = new Pawn(otherSide, killablePosition)
        Chess.piecesAvailable.push(...[piece, secondPiece])

        const moves = piece.getPossibleMoves()
        const expectedMoves: Chess.Move[] = [
            {
                piece,
                newPosition: { x: 1, y: 1 },
                canMove: true
            },
            {
                piece,
                newPosition: { x: 2, y: 1 },
                canMove: true,
                canKill: secondPiece
            }
        ]

        expect(moves).toStrictEqual(expectedMoves)
    })

    it('Check if pawn object gets the correct amount of possible moves and something is in front and on left side', () => {
        const otherSide = {
            color: Chess.ColorType.BLACK,
            direction: Chess.Direction.BOTTOM
        }
        const killablePosition = { x: 0, y: 1 }
        thirdPiece = new Pawn(otherSide, killablePosition)
        Chess.piecesAvailable = [piece, thirdPiece]
        const expectedMoves: Chess.Move[] = [
            {
                piece,
                newPosition: { x: 1, y: 1 },
                canMove: true
            },
            {
                piece,
                newPosition: { x: 0, y: 1 },
                canMove: true,
                canKill: thirdPiece
            },
        ]

        const moves = piece.getPossibleMoves()

        expect(moves).toStrictEqual(expectedMoves)
    })

    it('Check if pawn object gets the correct amount of possible moves and something is in front and on both side', () => {
        const otherSide = {
            color: Chess.ColorType.BLACK,
            direction: Chess.Direction.BOTTOM
        }
        const killablePosition = { x: 0, y: 1 }
        thirdPiece = new Pawn(otherSide, killablePosition)
        Chess.piecesAvailable = [piece, secondPiece, thirdPiece]
        const expectedMoves: Chess.Move[] = [
            {
                piece,
                newPosition: { x: 1, y: 1 },
                canMove: true
            },
            {
                piece,
                newPosition: { x: 0, y: 1 },
                canMove: true,
                canKill: thirdPiece
            },
            {
                piece,
                newPosition: { x: 2, y: 1 },
                canMove: true,
                canKill: secondPiece
            }
        ]

        const moves = piece.getPossibleMoves()

        expect(moves).toStrictEqual(expectedMoves)
    })
})