import { Application, Loader, Texture, Sprite, LoaderResource } from "pixi.js";
import "./style.css";
import { GameMenu } from "./game-menu";
import { ChessBoard } from "./board";

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

    // resizeCanvas();

    const chessBoard = new ChessBoard();
    chessBoard.visible = true;
    chessBoard.populateBoard();

    const playButtonSprite = new Sprite(Loader.shared.resources["play"].texture as Texture);
    const gameMenuScreen = new GameMenu(playButtonSprite, app, chessBoard);
    gameMenuScreen.visible = false;

    app.stage.addChild(gameMenuScreen);
    app.stage.addChild(chessBoard);
};

// todo check if this changes is necessary or is the loader shared like state??
async function loadGameAssets(): Promise<Record<string, LoaderResource>> {
    return new Promise<Record<string, LoaderResource>>((res, rej) => {
        const loader = Loader.shared;
        const assetUrls = [
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
        const loadedAssets: Record<string, LoaderResource> = {};

        assetUrls.forEach((asset) => {
            loader.add(asset.name, asset.url);
        });

        loader.onComplete.once(() => {
            Object.assign(loadedAssets, loader.resources);
            res(loadedAssets);
        });

        loader.onError.once(() => {
            rej();
        });

        loader.load();
    });
}

// function resizeCanvas(): void {
//     const resize = () => {
//         app.renderer.resize(window.innerWidth, window.innerHeight);
//         app.stage.scale.x = window.innerWidth / gameWidth;
//         app.stage.scale.y = window.innerHeight / gameHeight;
//     };
//
//     resize();
//
//     window.addEventListener("resize", resize);
// }
