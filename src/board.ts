import * as PIXI from "pixi.js";
import { Piece, PieceType } from "./piece";
import { AlivePieces, Cell, Pieces } from "./types";
import { Texture } from "pixi.js";

export class ChessBoard extends PIXI.Container {
    protected squares: Cell[][] = [];
    private pieces: Pieces | undefined;
    private alivePieces: AlivePieces | undefined;

    constructor() {
        super();

        let isDark = false;
        for (let row = 0; row < 8; row++) {
            this.squares.push([]);
            for (let col = 0; col < 8; col++) {
                this.squares[row].push({
                    color: isDark ? 0xc88340 : 0xffffff,
                    isAvailable: false,
                    isAttacked: false,
                    isSelected: false,
                    isHighlighted: false,
                    piece: null,
                    graphics: new PIXI.Graphics(),
                });

                const x = col * 80;
                const y = row * 80;

                const cell = this.squares[row][col];

                cell.graphics.beginFill(cell.color).drawRect(0, 0, 80, 80).endFill();

                cell.graphics.x = x;
                cell.graphics.y = y;

                this.addChild(cell.graphics);
                isDark = !isDark;
            }
            isDark = !isDark;
        }

        console.log(this.squares);
    }

    placePiece(row: number, col: number, piece: Piece) {
        const cell = this.squares[row][col];
        const cellSize = 80;

        if (piece) {
            const x = col * cellSize + cellSize / 2;
            const y = row * cellSize + cellSize / 2;
            piece.position.set(x, y);
            piece.row = row;
            piece.col = col;
            cell.piece = piece;
            this.addChild(piece);
        }
    }

    populateBoard() {
        const assets = PIXI.Loader.shared.resources;
        this.pieces = {
            black: {
                lRook: new Piece(assets["b_rook"].texture as Texture, PieceType.Rook),
                lKnight: new Piece(assets["b_knight"].texture as Texture, PieceType.Knight),
                lBishop: new Piece(assets["b_bishop"].texture as Texture, PieceType.Bishop),
                queen: new Piece(assets["b_queen"].texture as Texture, PieceType.Queen),
                king: new Piece(assets["b_king"].texture as Texture, PieceType.King),
                rBishop: new Piece(assets["b_bishop"].texture as Texture, PieceType.Bishop),
                rKnight: new Piece(assets["b_knight"].texture as Texture, PieceType.Knight),
                rRook: new Piece(assets["b_rook"].texture as Texture, PieceType.Rook),
                pawn1: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
                pawn2: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
                pawn3: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
                pawn4: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
                pawn5: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
                pawn6: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
                pawn7: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
                pawn8: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn),
            },
            white: {
                lRook: new Piece(assets["w_rook"].texture as Texture, PieceType.Rook),
                lKnight: new Piece(assets["w_knight"].texture as Texture, PieceType.Knight),
                lBishop: new Piece(assets["w_bishop"].texture as Texture, PieceType.Bishop),
                queen: new Piece(assets["w_queen"].texture as Texture, PieceType.Queen),
                king: new Piece(assets["w_king"].texture as Texture, PieceType.King),
                rBishop: new Piece(assets["w_bishop"].texture as Texture, PieceType.Bishop),
                rKnight: new Piece(assets["w_knight"].texture as Texture, PieceType.Knight),
                rRook: new Piece(assets["w_rook"].texture as Texture, PieceType.Rook),
                pawn1: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
                pawn2: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
                pawn3: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
                pawn4: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
                pawn5: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
                pawn6: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
                pawn7: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
                pawn8: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn),
            },
        };
        this.alivePieces = {
            white: [],
            black: [],
        };

        for (const color in this.pieces) {
            for (const key in this.pieces[color]) {
                const piece = this.pieces[color][key];
                piece.chessBoard = this;
                this.alivePieces[color].push(piece);
            }
        }

        const whitesRow = 7;
        const blacksRow = 0;

        this.placePiece(whitesRow, 0, this.pieces["white"].lRook);
        this.placePiece(whitesRow, 1, this.pieces["white"].lKnight);
        this.placePiece(whitesRow, 2, this.pieces["white"].lBishop);
        this.placePiece(whitesRow, 5, this.pieces["white"].rBishop);
        this.placePiece(whitesRow, 6, this.pieces["white"].rKnight);
        this.placePiece(whitesRow, 7, this.pieces["white"].rRook);
        this.placePiece(whitesRow, 3, this.pieces["white"].king);
        this.placePiece(whitesRow, 4, this.pieces["white"].queen);

        this.addChild(
            this.pieces["white"].lRook,
            this.pieces["white"].lKnight,
            this.pieces["white"].lBishop,
            this.pieces["white"].queen,
            this.pieces["white"].king,
            this.pieces["white"].rBishop,
            this.pieces["white"].rKnight,
            this.pieces["white"].rRook,
        );

        this.placePiece(blacksRow, 0, this.pieces["black"].lRook);
        this.placePiece(blacksRow, 1, this.pieces["black"].lKnight);
        this.placePiece(blacksRow, 2, this.pieces["black"].lBishop);
        this.placePiece(blacksRow, 5, this.pieces["black"].rBishop);
        this.placePiece(blacksRow, 6, this.pieces["black"].rKnight);
        this.placePiece(blacksRow, 7, this.pieces["black"].rRook);
        this.placePiece(blacksRow, 3, this.pieces["black"].king);
        this.placePiece(blacksRow, 4, this.pieces["black"].queen);

        this.addChild(
            this.pieces["black"].lRook,
            this.pieces["black"].lKnight,
            this.pieces["black"].lBishop,
            this.pieces["black"].queen,
            this.pieces["black"].king,
            this.pieces["black"].rBishop,
            this.pieces["black"].rKnight,
            this.pieces["black"].rRook,
        );

        for (let i = 1; i <= 8; i++) {
            const blackPawn = this.pieces.black["pawn" + i];
            const whitePawn = this.pieces.white["pawn" + i];

            this.placePiece(blacksRow + 1, i - 1, blackPawn); // Place black pawns in the second row
            this.placePiece(whitesRow - 1, i - 1, whitePawn); // Place white pawns in the second-to-last row

            this.addChild(blackPawn, whitePawn);
        }
    }
}
