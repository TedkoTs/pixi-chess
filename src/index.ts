import { Application, Loader, Texture, Sprite } from "pixi.js";
import "./style.css";
import { GameMenu } from "./game-menu";
import { ChessBoard } from "./board";
import { Colors } from "./models";

const gameWidth = 640;
const gameHeight = 640;

const app = new Application({
    backgroundColor: 0x292a2f,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);

    const chessBoard = new ChessBoard(app);
    chessBoard.visible = false;
    chessBoard.populateBoard();

    const playButtonSprite = new Sprite(Loader.shared.resources["play"].texture as Texture);
    playButtonSprite.on("mouseover", () => {
        playButtonSprite.tint = Colors.tintHighLight;
    });

    playButtonSprite.on("mouseout", () => {
        playButtonSprite.tint = Colors.defaultTint;
    });

    const gameMenuScreen = new GameMenu(playButtonSprite, app, chessBoard);
    gameMenuScreen.visible = true;

    app.stage.addChild(gameMenuScreen);
    app.stage.addChild(chessBoard);
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        const assetUrls = [
            { name: "bg", url: "./assets/chess-board/ss_bg.png" },
            { name: "play", url: "./assets/chess-board/play_button.png" },
            { name: "b_bishop", url: "/assets/chess-board/B_Bishop.png" },
            { name: "b_king", url: "/assets/chess-board/B_King.png" },
            { name: "b_knight", url: "/assets/chess-board/B_Knight.png" },
            { name: "b_pawn", url: "/assets/chess-board/B_Pawn.png" },
            { name: "b_queen", url: "/assets/chess-board/B_Queen.png" },
            { name: "b_rook", url: "/assets/chess-board/B_Rook.png" },
            { name: "w_bishop", url: "/assets/chess-board/W_Bishop.png" },
            { name: "w_king", url: "/assets/chess-board/W_King.png" },
            { name: "w_knight", url: "/assets/chess-board/W_Knight.png" },
            { name: "w_pawn", url: "/assets/chess-board/W_Pawn.png" },
            { name: "w_queen", url: "/assets/chess-board/W_Queen.png" },
            { name: "w_rook", url: "/assets/chess-board/W_Rook.png" },
        ];
        assetUrls.forEach((asset) => {
            loader.add(asset.name, asset.url);
        });

        loader.onComplete.once(() => {
            res();
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}
