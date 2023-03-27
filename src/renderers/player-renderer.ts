import { Position } from "../coords.js";
import { PlayerEvent, PlayerEventDetail } from "../events.js";
import { Player } from "../player.js";
import { SETTINGS } from "../settings.js";
import { Dimension } from "../types.js";

export class PlayerRenderer extends EventTarget {
  private frameNumber: number;
  private cancelAnimationRequest;
  private targetCoordinates?: Position | null;
  private targetDelta: Position = { x: 0, y: 0 };
  private previousCollision?: boolean | null;
  private moveRequestCursorPosition?: Position | null;
  private playerStepLength: number;

  animationStartTimestamp: any;
  fpsInterval: number;

  constructor(private context: CanvasRenderingContext2D) {
    super();
    this.frameNumber = 0;
    this.cancelAnimationRequest = false;

    // animation speed settings (current best: 1000)
    this.fpsInterval = SETTINGS.speed.frameRate / 50;
    this.animationStartTimestamp;

    // 1 player step = 16 px; (current best: 16)
    this.playerStepLength = SETTINGS.speed.stepLength;
  }

  private animateSprite(player: Player, timestamp: number = 0) {
    let detailEvent: PlayerEventDetail = {
      player: player,
      movement: this.frameNumber,
    };

    let rafId = requestAnimationFrame(() => this.animateSprite);

    if (!this.animationStartTimestamp) {
      this.animationStartTimestamp = timestamp;
    }

    /* the animation is flagged to be canceled when the player reaches the target position */
    if (this.targetCoordinates) {
      let proximityX = Math.floor(
        Math.abs(this.targetCoordinates.x - player.point.x)
      );
      let proximityY = Math.floor(
        Math.abs(this.targetCoordinates.y - player.point.y)
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
        detailEvent
      );
      player.dispatchEvent(requestedPlayerRectClear);

      /* because collisions cause the collided players to be redrawn, moving players are drawn after
            the redrawing of the collided ones, giving the impression they move "over" instead of "under" */
      //board.checkPlayerCollisions(this.player);
      let requestedBoardCollisionCheckEvent = new PlayerEvent(
        "requestedboardcollisioncheck",
        detailEvent
      );
      player.dispatchEvent(requestedBoardCollisionCheckEvent);

      player.point.x += this.targetDelta.x;
      player.point.y += this.targetDelta.y;
      //board.drawMoveCursors();
      this.frameNumber++;
      detailEvent.movement++;

      //board.drawPlayer(this.player, this.frameNumber);
      let playerMovedEvent = new PlayerEvent("playermoved", detailEvent);
      player.dispatchEvent(playerMovedEvent);

      if (cancelAnimationTriggered === true) {
        let playerStoppedEvent = new PlayerEvent("playerstopped", detailEvent);
        player.dispatchEvent(playerStoppedEvent);
      }
    }
  }

  public cancelAnimation() {
    this.cancelAnimationRequest = true;
    this.targetCoordinates = null;
    this.targetDelta = { x: 0, y: 0 };
  }

  public startAnimation(player: Player) {
    this.cancelAnimationRequest = false;
    this.animateSprite(player);
  }

  public isPlaying(player: Player) {
    return player.moving;
  }

  
  public setTargetCoordinates(player: Player, target: Position) {
    if (player.moveDone === true) {
      throw new Error(`Hai già mosso ${player.name}`);
    }

    // target coordinates are set at the feet of the player:
    target.x -= player.htmlImage.width / 4 / 2;
    target.y -= player.htmlImage.height;
    this.targetCoordinates = target;

    if (this.targetCoordinates) {
      let dx = this.targetCoordinates.x - player.point.x;
      let dy = this.targetCoordinates.y - player.point.y;
      let stepToDistance = Math.ceil(
        Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / this.playerStepLength
      );
      this.targetDelta.x = dx / stepToDistance;
      this.targetDelta.y = dy / stepToDistance;
    } else {
      throw new Error("No target coordinates set!");
    }
  }

  /**
   * Draws a single player on the board.
   * @param player
   * @param currentStep If the player is moving, represents the relevant frame in the sprite.
   */
  drawPlayer(player: Player, currentStep: number, position: Position) {
    this.context.drawImage(
      player.htmlImage,
      (player.htmlImage.width / 4) * (currentStep % 4),
      0,
      32,
      32,
      position.x,
      position.y,
      player.htmlImage.width / 4,
      player.htmlImage.height
    );
  }

  /**
   * Clears the board rectangle hosting the player
   * @param player
   */
  clearRectangle(player: Player, position: Position) {
    let dimension = {
      width: player.htmlImage.width / 4,
      height: player.htmlImage.height,
    } as Dimension;

    this.context.clearRect(
      position.x,
      position.y,
      dimension.width,
      dimension.height
    );
  }
}
