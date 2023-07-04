import { InteractionEvent, Texture, Sprite } from "pixi.js";
import { PieceTypeEnum } from "./models";

export class Piece extends Sprite {
    public pieceType: PieceTypeEnum;
    public row = 0;
    public col = 0;
    public color: string;

    constructor(texture: Texture, type: PieceTypeEnum, color: string) {
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
