import * as PIXI from "pixi.js";

export class GameMenu extends PIXI.Container {
    private readonly gameSprite: PIXI.Sprite;
    private nextContainer: PIXI.Container;
    private readonly background: PIXI.Graphics;

    constructor(sprite: PIXI.Sprite, app: PIXI.Application, nextContainer: PIXI.Container) {
        super();
        this.gameSprite = sprite;
        this.nextContainer = nextContainer;

        this.background = new PIXI.Graphics();
        this.background.beginFill(0x292a2f);
        this.background.drawRect(0, 0, app.view.width, app.view.height);
        this.background.endFill();
        this.addChildAt(this.background, 0);

        this.gameSprite.anchor.set(0.5);
        this.gameSprite.x = app.view.width / 2;
        this.gameSprite.y = app.view.height / 2;
        this.gameSprite.interactive = true;
        this.gameSprite.buttonMode = true;
        this.addChild(this.gameSprite);
        this.gameSprite.on("click", this.playGame, this);
    }

    private playGame() {
        this.visible = false;
        this.interactive = false;
        this.nextContainer.visible = true;
    }
}
