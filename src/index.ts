import { Application, Loader, Texture, Sprite } from "pixi.js";
import "./style.css";
import { Cell } from "./cell";
import { GameMenu } from "./game-menu";

declare const VERSION: string;

const gameWidth = 800;
const gameHeight = 800;

console.log(`Welcome from pixi-typescript-boilerplate ${VERSION}`);

const app = new Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight,
});

window.onload = async (): Promise<void> => {
    await loadGameAssets();
    document.body.appendChild(app.view);

    // resizeCanvas();

    const bt = new Cell(Loader.shared.resources["black_tile"].texture as Texture);
    const playButtonSprite = new Sprite(Loader.shared.resources["play"].texture as Texture);
    const gameMenuScreen = new GameMenu(playButtonSprite, app, bt);

    bt.visible = false;

    app.stage.addChild(gameMenuScreen);
    app.stage.addChild(bt);
};

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = Loader.shared;
        loader.add("black_tile", "./assets/chess-board/black_tile.png");
        loader.add("play", "./assets/chess-board/play_button.png");

        loader.onComplete.once(() => {
            res();
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
