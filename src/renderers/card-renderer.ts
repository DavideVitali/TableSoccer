import { Card } from "../card.js";
import { Player } from "../player.js";

export class CardRenderer {
  constructor(public context: CanvasRenderingContext2D) { }

  public drawCard(card: Card, player: Player) {
    this.context.font = "12px fff";
    if (card.template) {
      this.context.drawImage(card.template, card.position.x, card.position.y);
    } else {
      throw new Error("Card template not loaded!");
    }
    const nameWidth = this.context.measureText(player.name).width;
    this.context.fillText(
      player.name,
      (card.template.width - nameWidth) / 2 + card.position.x,
      202 + card.position.y
    );
  }
}