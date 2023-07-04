import * as PIXI from "pixi.js";
import { Piece, PieceType } from "./piece";
import { Cell, Pieces } from "./types";
import { InteractionEvent, Texture } from "pixi.js";

export class ChessBoard extends PIXI.Container {
    protected squares: Cell[][] = [];
    private pieces: Pieces | undefined;
    private isWhiteTurn = true;

    private selectedCell: Cell | undefined;
    private targetCell: Cell | undefined;

    constructor() {
        super();

        let isDark = false;
        for (let row = 0; row < 8; row++) {
            this.squares.push([]);
            for (let col = 0; col < 8; col++) {
                this.squares[row].push({
                    color: isDark ? 0x596070 : 0xeaf0d8,
                    isSelected: false,
                    piece: null,
                    graphics: new PIXI.Graphics(),
                    row: row,
                    col: col,
                });

                const x = col * 80;
                const y = row * 80;

                const cell = this.squares[row][col];

                cell.graphics.beginFill(cell.color).drawRect(0, 0, 80, 80).endFill();

                cell.graphics.x = x;
                cell.graphics.y = y;

                cell.graphics.interactive = true;
                cell.graphics.buttonMode = true;

                cell.graphics.on("pointerdown", this.onPieceClick, this);

                this.addChild(cell.graphics);
                isDark = !isDark;
            }
            isDark = !isDark;
        }
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
                lRook: new Piece(assets["b_rook"].texture as Texture, PieceType.Rook, "black"),
                lKnight: new Piece(assets["b_knight"].texture as Texture, PieceType.Knight, "black"),
                lBishop: new Piece(assets["b_bishop"].texture as Texture, PieceType.Bishop, "black"),
                queen: new Piece(assets["b_queen"].texture as Texture, PieceType.Queen, "black"),
                king: new Piece(assets["b_king"].texture as Texture, PieceType.King, "black"),
                rBishop: new Piece(assets["b_bishop"].texture as Texture, PieceType.Bishop, "black"),
                rKnight: new Piece(assets["b_knight"].texture as Texture, PieceType.Knight, "black"),
                rRook: new Piece(assets["b_rook"].texture as Texture, PieceType.Rook, "black"),
                pawn1: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
                pawn2: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
                pawn3: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
                pawn4: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
                pawn5: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
                pawn6: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
                pawn7: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
                pawn8: new Piece(assets["b_pawn"].texture as Texture, PieceType.Pawn, "black"),
            },
            white: {
                lRook: new Piece(assets["w_rook"].texture as Texture, PieceType.Rook, "white"),
                lKnight: new Piece(assets["w_knight"].texture as Texture, PieceType.Knight, "white"),
                lBishop: new Piece(assets["w_bishop"].texture as Texture, PieceType.Bishop, "white"),
                queen: new Piece(assets["w_queen"].texture as Texture, PieceType.Queen, "white"),
                king: new Piece(assets["w_king"].texture as Texture, PieceType.King, "white"),
                rBishop: new Piece(assets["w_bishop"].texture as Texture, PieceType.Bishop, "white"),
                rKnight: new Piece(assets["w_knight"].texture as Texture, PieceType.Knight, "white"),
                rRook: new Piece(assets["w_rook"].texture as Texture, PieceType.Rook, "white"),
                pawn1: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
                pawn2: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
                pawn3: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
                pawn4: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
                pawn5: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
                pawn6: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
                pawn7: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
                pawn8: new Piece(assets["w_pawn"].texture as Texture, PieceType.Pawn, "white"),
            },
        };

        for (const color in this.pieces) {
            for (const key in this.pieces[color]) {
                const piece = this.pieces[color][key];
                if (color === "black") {
                    piece.scale.set(-2);
                }
                piece.on("pointerdown", this.onPieceClick, this);
                piece.chessBoard = this;
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

        if (this.isWhiteTurn) {
            // this.disableBlackPieces();
        }
    }

    disableBlackPieces() {
        if (this.pieces) {
            for (const key in this.pieces.black) {
                const piece = this.pieces.black[key];
                piece.interactive = false;
                piece.buttonMode = false;
            }
            for (const key in this.pieces.white) {
                const piece = this.pieces.white[key];
                piece.interactive = true;
                piece.buttonMode = true;
            }
        }
    }

    enableBlackPieces() {
        if (this.pieces) {
            for (const key in this.pieces.black) {
                const piece = this.pieces.black[key];
                piece.interactive = true;
                piece.buttonMode = true;
            }
            for (const key in this.pieces.white) {
                const piece = this.pieces.white[key];
                piece.interactive = false;
                piece.buttonMode = false;
            }
        }
    }

    switchTurn() {
        if (this.isWhiteTurn) {
            // this.enableBlackPieces();
            this.isWhiteTurn = false;
        } else {
            // this.disableBlackPieces();
            this.isWhiteTurn = true;
        }
        setTimeout(() => {
            this.rotateBoard();
        }, 500);
    }

    rotateBoard() {
        const targetRotation = this.rotation + Math.PI;
        const rotationSpeed = 0.08;

        const updateRotation = (delta: number) => {
            const diff = targetRotation - this.rotation;
            if (Math.abs(diff) <= rotationSpeed * delta) {
                this.position.set(320, 320);
                this.pivot.set(320, 320);
                this.rotation = targetRotation;
                PIXI.Ticker.shared.remove(updateRotation);
            } else {
                this.position.set(320, 320);
                this.pivot.set(320, 320);
                this.rotation += Math.sign(diff) * rotationSpeed * delta;
            }
        };

        PIXI.Ticker.shared.add(updateRotation);
    }

    // todo possibly takes the color of the cells not the pieces -> white pieces go on white cells but remove on black cells

    onPieceClick(event: InteractionEvent) {
        const cell = this.getCellOnClick(event);

        if (!this.selectedCell) {
            if (cell.piece && cell.piece.color === (this.isWhiteTurn ? "white" : "black")) {
                this.selectedCell = cell;
                this.selectedCell.isSelected = true;
                this.addHighlight(this.selectedCell);
            }
        } else if (this.selectedCell === cell) {
            this.removeHighlight(this.selectedCell);
            this.selectedCell.isSelected = false;
            this.selectedCell = undefined;
        } else if (!cell.piece) {
            if (this.selectedCell.piece && this.selectedCell.piece.color === (this.isWhiteTurn ? "white" : "black")) {
                this.targetCell = cell;
                this.removeHighlight(this.selectedCell);
                this.moveSelectedToTarget();
            }
        } else if (this.selectedCell.piece !== cell.piece) {
            if (cell.piece.color === (this.isWhiteTurn ? "white" : "black")) {
                this.targetCell = cell;
                this.removeHighlight(this.selectedCell);
                this.addHighlight(this.targetCell);
                this.selectedCell = cell;
                this.selectedCell.isSelected = true;
                this.targetCell = undefined;
            }
            if (cell.piece.color !== (this.isWhiteTurn ? "white" : "black")) {
                this.targetCell = cell;
                this.removeHighlight(this.selectedCell);
                this.removePieceFromBoard(this.targetCell);

                this.moveSelectedToTarget();
            }
        }
    }

    getCellOnClick(event: InteractionEvent): Cell {
        const position = event.data.getLocalPosition(this);
        const col = Math.floor(position.x / 80);
        const row = Math.floor(position.y / 80);
        return this.squares[row][col];
    }

    addHighlight(cell: Cell) {
        const piece = cell.piece;
        if (piece && piece.color === "white") {
            piece.anchor.set(0.5, 0.7);
            piece.scale.set(2.5);
        }
        if (piece && piece.color === "black") {
            piece.anchor.set(0.5, 0.7);
            piece.scale.set(-2.5);
        }
    }

    removeHighlight(cell: Cell) {
        const piece = cell.piece;
        if (piece && piece.color === "white") {
            piece.anchor.set(0.5, 0.5);
            piece.scale.set(2);
        }
        if (piece && piece.color === "black") {
            piece.anchor.set(0.5, 0.5);
            piece.scale.set(-2);
        }
    }

    moveSelectedToTarget() {
        if (this.selectedCell && this.targetCell) {
            const pieceToMove = this.selectedCell.piece;
            if (pieceToMove && this.isValidMove(pieceToMove, this.targetCell)) {
                const { row: targetRow, col: targetCol } = this.targetCell;

                this.placePiece(targetRow, targetCol, pieceToMove);
                this.selectedCell.piece = null;
            }

            this.selectedCell.isSelected = false;
            this.selectedCell = undefined;
            this.targetCell = undefined;
        }

        this.switchTurn();
    }

    isValidMove(piece: Piece, targetCell: Cell): boolean {
        if (targetCell.piece && targetCell.piece.color === piece.color) {
            return false;
        }
        switch (piece.pieceType) {
            case PieceType.Pawn:
                return this.isValidPawnMove(piece, targetCell);
            case PieceType.Rook:
                return this.isValidRookMove(piece, targetCell);
            case PieceType.Knight:
                return this.isValidKnightMove(piece, targetCell);
            case PieceType.Bishop:
                return this.isValidBishopMove(piece, targetCell);
            case PieceType.Queen:
                return this.isValidRookMove(piece, targetCell) || this.isValidBishopMove(piece, targetCell);
            case PieceType.King:
                return this.isValidKingMove(piece, targetCell);
            default:
                return false;
        }
    }

    //todo don't change player on illegal move
    checkFirstPawnMove(row: number | undefined) {
        return row === 1 || row === 6;
    }

    isValidPawnMove(piece: Piece, targetCell: Cell): boolean {
        const startRow = this.selectedCell?.row;
        const startCol = this.selectedCell?.col;
        const { row: targetRow, col: targetCol } = targetCell;

        if (startRow === undefined || startCol === undefined) {
            return false;
        }

        if (startRow === targetRow && startCol === targetCol) {
            return false;
        }

        const forwardDirection = piece.color === "white" ? -1 : 1;
        const rowDistance = targetRow - startRow;
        const colDistance = Math.abs(targetCol - startCol);

        if (rowDistance * forwardDirection <= 0) {
            return false;
        }

        if (rowDistance === forwardDirection && colDistance === 0) {
            return true;
        }

        if (rowDistance === 2 * forwardDirection && colDistance === 0 && this.checkFirstPawnMove(startRow)) {
            const intermediateRow = startRow + forwardDirection;
            return this.squares[intermediateRow][startCol].piece === null;
        }

        if (rowDistance === forwardDirection && colDistance === 1) {
            const targetCellPiece = targetCell.piece;
            if (targetCellPiece && targetCellPiece.color !== piece.color) {
                return true;
            }
        }

        return false;
    }

    isValidKnightMove(piece: Piece, targetCell: Cell): boolean {
        const startRow = this.selectedCell?.row;
        const startCol = this.selectedCell?.col;
        const { row: targetRow, col: targetCol } = targetCell;
        let rowDiff, colDiff;

        if (startRow === undefined || startCol === undefined) {
            return false;
        }

        if ((startRow || startRow === 0) && (startCol || startCol === 0)) {
            rowDiff = Math.abs(startRow - targetRow);
            colDiff = Math.abs(startCol - targetCol);
        }
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    isValidRookMove(piece: Piece, targetCell: Cell): boolean {
        const startRow = this.selectedCell?.row;
        const startCol = this.selectedCell?.col;
        const { row: targetRow, col: targetCol } = targetCell;

        if (startRow === undefined || startCol === undefined) {
            return false;
        }

        if (startRow === targetRow && startCol === targetCol) {
            return false;
        }

        if (startRow === targetRow || startCol === targetCol) {
            const rowStep = startRow === targetRow ? 0 : startRow < targetRow ? 1 : -1;
            const colStep = startCol === targetCol ? 0 : startCol < targetCol ? 1 : -1;

            let currentRow = startRow + rowStep;
            let currentCol = startCol + colStep;

            while (currentRow !== targetRow || currentCol !== targetCol) {
                const currentCell = this.squares[currentRow][currentCol];
                if (currentCell.piece) {
                    return false;
                }
                currentRow += rowStep;
                currentCol += colStep;
            }

            return true;
        }

        return false;
    }

    isValidBishopMove(piece: Piece, targetCell: Cell): boolean {
        const startRow = this.selectedCell?.row;
        const startCol = this.selectedCell?.col;
        const { row: targetRow, col: targetCol } = targetCell;

        if (startRow === undefined || startCol === undefined) {
            return false;
        }

        if (startRow === targetRow && startCol === targetCol) {
            return false;
        }

        const rowDistance = Math.abs(targetRow - startRow);
        const colDistance = Math.abs(targetCol - startCol);

        if (rowDistance !== colDistance) {
            return false;
        }

        const rowStep = targetRow > startRow ? 1 : -1;
        const colStep = targetCol > startCol ? 1 : -1;

        let currentRow = startRow + rowStep;
        let currentCol = startCol + colStep;

        while (currentRow !== targetRow && currentCol !== targetCol) {
            const currentCell = this.squares[currentRow][currentCol];
            if (currentCell.piece) {
                return false;
            }
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true;
    }

    isValidKingMove(piece: Piece, targetCell: Cell): boolean {
        const startRow = this.selectedCell?.row;
        const startCol = this.selectedCell?.col;
        const { row: targetRow, col: targetCol } = targetCell;

        if (startRow === undefined || startCol === undefined) {
            return false;
        }

        if (startRow === targetRow && startCol === targetCol) {
            return false;
        }

        const rowDistance = Math.abs(targetRow - startRow);
        const colDistance = Math.abs(targetCol - startCol);

        if (rowDistance > 1 || colDistance > 1) {
            return false;
        }

        return true;
    }

    removePieceFromBoard(cell: Cell): void {
        this.removeChild(cell.piece);
    }
}