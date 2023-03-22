import { Coordinates, Point, Position } from "./coords.js";
import { Utils } from "./utils.js";

export class Card {
  public template?: HTMLImageElement;

  constructor(public position: Position) {
    Utils.loadImage("img/bluePlayerCard.png").then((img) => {
      this.template = img;
    });
  }
}
