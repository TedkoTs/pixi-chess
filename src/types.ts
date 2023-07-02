import { Graphics } from "pixi.js";
import { Piece } from "./piece";

export interface Cell {
    isAvailable: boolean;
    isAttacked: boolean;
    isSelected: boolean;
    isHighlighted: boolean;
    color: any; //todo
    piece: any;
    graphics: Graphics;
}

export interface Pieces {
    [key: string]: PieceList;
    white: PieceList;
    black: PieceList;
}

export interface PieceList {
    [key: string]: Piece;
    lRook: Piece;
    lKnight: Piece;
    lBishop: Piece;
    queen: Piece;
    king: Piece;
    rBishop: Piece;
    rKnight: Piece;
    rRook: Piece;
    pawn1: Piece;
    pawn2: Piece;
    pawn3: Piece;
    pawn4: Piece;
    pawn5: Piece;
    pawn6: Piece;
    pawn7: Piece;
    pawn8: Piece;
}

export interface AlivePieces {
    white: Piece[];
    black: Piece[];
    [key: string]: Piece[];
}
