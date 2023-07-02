import * as PIXI from "pixi.js";
import { Texture } from "pixi.js";
import { ChessBoard } from "./board";

export enum PieceType {
    Pawn = "P",
    Rook = "R",
    Bishop = "B",
    Knight = "Kn",
    Queen = "Q",
    King = "K",
}

export class Piece extends PIXI.Sprite {
    public type: PieceType;
    public chessBoard: ChessBoard | null = null;
    public row = 0;
    public col = 0;

    constructor(texture: Texture, type: PieceType) {
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.scale.set(2);

        this.type = type;
    }

    setPosition(row: number, col: number) {
        const cellSize = 80; // Size of each square
        this.position.set(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
        this.row = row;
        this.col = col;
    }
}
