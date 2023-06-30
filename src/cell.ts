import * as PIXI from "pixi.js";
import { Texture } from "pixi.js";

export class Cell extends PIXI.Sprite {
    constructor(texture: Texture) {
        super(texture);
    }
}
