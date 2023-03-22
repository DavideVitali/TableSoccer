import { Board } from "./board.js";
import { Position } from "./coords.js";
import { PlayerEvent } from "./events.js";
import { Player } from "./player.js";
declare const board: Board;

export class Renderer extends EventTarget {
  private frameNumber: number;
  private cancelAnimationRequest;
  private targetCoordinates?: Position | null;
  private targetDelta: Position = { x: 0, y: 0 };
  private previousCollision?: boolean | null;
  private moveRequestCursorPosition?: Position | null;
  private playerStepLength: number;

  animationStartTimestamp: any;
  fpsInterval: number;

  constructor(public player: Player, public position: Position) {
    super();
    this.frameNumber = 0;
    this.cancelAnimationRequest = false;

    //// ----------- qui l'immagine non è stata ancora caricata
    this.player.loadImage.then((img) => {
      this.player.htmlImage = img;
      this.player.htmlImage.setAttribute("id", this.player.name);
      this.moveRequestCursorPosition = {
        x: position.x + img.width / 4 / 2,
        y: position.y + img.height + 4,
      };
    });

    // animation speed settings
    this.fpsInterval = 1000 / 50;
    this.animationStartTimestamp;

    // 1 player step = 16 px;
    this.playerStepLength = 16;
  }

  private animateSprite(timestamp: number = 0) {
    let rafId = requestAnimationFrame(() => this.animateSprite);

    if (!this.animationStartTimestamp) {
      this.animationStartTimestamp = timestamp;
    }

    /* the animation is flagged to be canceled when the player reaches the target position */
    if (this.targetCoordinates) {
      let proximityX = Math.floor(
        Math.abs(this.targetCoordinates.x - this.player.point.x)
      );
      let proximityY = Math.floor(
        Math.abs(this.targetCoordinates.y - this.player.point.y)
      );
      if (proximityX == 0 && proximityY == 0) {
        this.cancelAnimation();
      }
    }

    let elapsedTime = Date.now() - this.animationStartTimestamp;

    if (elapsedTime > this.fpsInterval) {
      let cancelAnimationTriggered = false;

      if (this.frameNumber % 2 == 1 && this.cancelAnimationRequest == true) {
        window.cancelAnimationFrame(rafId);
        cancelAnimationTriggered = true;
      }

      this.animationStartTimestamp = Date.now();

      let requestedPlayerRectClear = new PlayerEvent(
        "requestedplayerrectclear",
        this.player
      );
      this.player.dispatchEvent(requestedPlayerRectClear);

      /* because collisions cause the collided players to be redrawn, moving players are drawn after
            the redrawing of the collided ones, giving the impression they move "over" instead of "under" */
      //board.checkPlayerCollisions(this.player);
      let requestedBoardCollisionCheckEvent = new PlayerEvent(
        "requestedboardcollisioncheck",
        this.player
      );
      this.player.dispatchEvent(requestedBoardCollisionCheckEvent);

      this.player.point.x += this.targetDelta.x;
      this.player.point.y += this.targetDelta.y;
      //board.drawMoveCursors();
      this.frameNumber++;

      //board.drawPlayer(this.player, this.frameNumber);
      let playerMovedEvent = new PlayerEvent(
        "playermoved",
        this.player,
        this.frameNumber
      );
      this.player.dispatchEvent(playerMovedEvent);

      if (cancelAnimationTriggered === true) {
        let playerStoppedEvent = new PlayerEvent("playerstopped", this.player);
        this.player.dispatchEvent(playerStoppedEvent);
      }
    }
  }

  public cancelAnimation() {
    this.cancelAnimationRequest = true;
    this.targetCoordinates = null;
    this.targetDelta = { x: 0, y: 0 };
  }

  public startAnimation() {
    this.cancelAnimationRequest = false;
    this.animateSprite();
  }

  public isPlaying() {
    return this.player.moving;
  }

  public setTargetCoordinates(target: Position) {
    if (this.player.moveDone === true) {
      throw new Error(`Hai già mosso ${this.player.name}`);
    }

    // target coordinates are set at the feet of the player:
    target.x -= this.player.htmlImage.width / 4 / 2;
    target.y -= this.player.htmlImage.height;
    this.targetCoordinates = target;

    if (this.targetCoordinates) {
      let dx = this.targetCoordinates.x - this.player.point.x;
      let dy = this.targetCoordinates.y - this.player.point.y;
      let stepToDistance = Math.ceil(
        Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / this.playerStepLength
      );
      this.targetDelta.x = dx / stepToDistance;
      this.targetDelta.y = dy / stepToDistance;
    } else {
      throw new Error("No target coordinates set!");
    }
  }
}
