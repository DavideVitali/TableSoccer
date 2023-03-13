import { Point } from "./types.js";
import { Utils } from "./utils.js";

export class Card {
  public template?: HTMLImageElement;

  constructor(public position: Point) {
    Utils.loadImage("img/bluePlayerCard.png").then(img => {
      this.template = img;
    });
  }
}
