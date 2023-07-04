import { Loader, Sprite, Texture, Application, Container } from "pixi.js";

export class GameMenu extends Container {
    private readonly gameSprite: Sprite;
    private nextContainer: Container;
    private readonly background: Sprite;

    constructor(sprite: Sprite, app: Application, nextContainer: Container) {
        super();
        this.gameSprite = sprite;
        this.nextContainer = nextContainer;

        this.background = new Sprite(Loader.shared.resources["bg"].texture as Texture);
        this.background.width = app.view.width;
        this.background.height = app.view.height;
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
