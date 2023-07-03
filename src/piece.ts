import * as PIXI from "pixi.js";
import { InteractionEvent, Texture } from "pixi.js";
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
    public pieceType: PieceType;
    public chessBoard: ChessBoard | null = null;
    public row = 0;
    public col = 0;
    public color: string;

    constructor(texture: Texture, type: PieceType, color: string) {
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.scale.set(2);
        this.color = color;

        this.pieceType = type;

        this.on("pointerdown", (event: InteractionEvent) => {
            this.emit("piecedown", event);
        });
    }
}
