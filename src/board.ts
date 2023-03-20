import { Card } from "./card.js";
import { Controller } from "./controller.js";
import { PlayerEvent } from "./events.js";
import { Player } from "./player.js";
import {
  Coordinates,
  CoordinatesTransformer,
  Dimension,
  Position,
} from "./coords.js";
import { Team } from "./team.js";
declare const leftUserCard: Card;

export class Board extends EventTarget {
  fieldCanvas: HTMLCanvasElement;
  fieldContext: CanvasRenderingContext2D;
  mouseCanvas: HTMLCanvasElement;
  mouseContext: CanvasRenderingContext2D;
  playersCanvas: HTMLCanvasElement;
  playersContext: CanvasRenderingContext2D;
  leftUserCanvas: HTMLCanvasElement;
  leftUserContext: CanvasRenderingContext2D;
  rightUserCanvas: HTMLCanvasElement;
  rightUserContext: CanvasRenderingContext2D;
  pointerLockStartPoint: Coordinates | null;

  constructor(
    public team: Team,
    public coordinatesTransformer: CoordinatesTransformer
  ) {
    super();
    this.fieldCanvas = document.getElementById("Field")! as HTMLCanvasElement;
    this.fieldContext = this.fieldCanvas.getContext("2d")!;
    this.mouseCanvas = document.getElementById(
      "MouseEvents"
    )! as HTMLCanvasElement;
    this.mouseContext = this.mouseCanvas.getContext("2d")!;
    this.playersCanvas = document.getElementById(
      "Players"
    )! as HTMLCanvasElement;
    this.playersContext = this.playersCanvas.getContext("2d")!;
    this.leftUserCanvas = document.getElementById(
      "LeftUser"
    )! as HTMLCanvasElement;
    this.leftUserContext = this.leftUserCanvas.getContext("2d")!;
    this.rightUserCanvas = document.getElementById(
      "RightUser"
    )! as HTMLCanvasElement;
    this.rightUserContext = this.rightUserCanvas.getContext("2d")!;
    this.pointerLockStartPoint = null;

    // pointerLock API setup
    this.mouseCanvas.requestPointerLock = this.mouseCanvas.requestPointerLock;
    document.exitPointerLock = document.exitPointerLock;
    document.addEventListener("pointerlockchange", this.setMaximumMovement);
    this.pointerLockStartPoint;

    const fieldImage = new Image();
    fieldImage.src = "img/map.png";
    fieldImage.onload = () => {
      this.fieldContext.drawImage(fieldImage, 0, 0);
    };

    this.addEventListener("requestedplayerrectclear", (e) => {
      let pEvent = e as PlayerEvent;
      let pDimensions = {
        width: pEvent.player.htmlImage.width / 4,
        height: pEvent.player.htmlImage.height,
      } as Dimension;

      this.clearPlayerRectangle(pEvent.player);
    });

    this.addEventListener("playermoved", (e) => {
      let pEvent = e as PlayerEvent;
      this.drawPlayer(pEvent.player, pEvent.movement);
    });

    this.addEventListener("playercollision", (e) => {
      let pEvent = e as PlayerEvent;
      this.drawPlayer(pEvent.player, pEvent.movement);
    });

    this.addEventListener("playerclick", (e) => {
      let pEvent = e as PlayerEvent;
      let clickedPlayer = pEvent.player;

      this.clearCanvas(this.mouseContext, this.mouseCanvas);
      this.clearCanvas(this.leftUserContext, this.leftUserCanvas);
      this.drawMoveCursors();
      this.switchSelected(clickedPlayer);
      if (clickedPlayer.selected && clickedPlayer.selected === true) {
        this.drawPlayerCard(leftUserCard, clickedPlayer);
      } else {
        // what happens here?
      }

      if (document.pointerLockElement === this.mouseCanvas) {
        document.removeEventListener("mousemove", () =>
          this.updateMaximumMovement(clickedPlayer)
        );
        document.exitPointerLock();
      } else {
        this.mouseCanvas.requestPointerLock();
        document.addEventListener("mousemove", () =>
          this.updateMaximumMovement(clickedPlayer)
        );
      }
    });
  }

  public clearCanvas(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // TO BE DEPRECATED BY STATE MACHINE IMPLEMENTATION
  public switchSelected(player: Player) {
    let selectedPlayers = this.team.players.filter(
      (p) => p.selected === true && p.name !== player.name
    );
    if (selectedPlayers && selectedPlayers.length > 0) {
      selectedPlayers.forEach((sp) => sp.deselect());
    }
  }

  /**
   * Draws the entire team on the board
   */
  public drawTeam() {
    this.team.players.forEach((p) => {
      this.drawPlayer(p, 0);
    });
  }

  /**
   * Draws a player's card on the sidebar
   * @param card
   * @param player
   */
  public drawPlayerCard(card: Card, player: Player) {
    let ctx = this.leftUserContext;
    ctx.font = "12px fff";
    if (card.template) {
      ctx.drawImage(card.template, card.position.x, card.position.y);
    } else {
      throw new Error("Card template not loaded!");
    }
    const nameWidth = ctx.measureText(player.name).width;
    ctx.fillText(
      player.name,
      (card.template.width - nameWidth) / 2 + card.position.x,
      202 + card.position.y
    );
  }

  /**
   * Finds the player in a waiting state
   */
  public findWaitingPlayer() {
    let result = this.team.players.filter((p) => {
      if (p.waiting) {
        return p;
      }
    });

    if (result.length === 0) {
      return null;
    }

    if (result.length > 1) {
      throw new Error(`There are too many players in 'waiting' state`);
    }

    return result[0];
  }

  /**
   * Clears the board rectangle hosting the player
   * @param player
   */
  public clearPlayerRectangle(player: Player) {
    let position = this.coordinatesTransformer.toPosition(player.point);
    let dimension = {
      width: player.htmlImage.width / 4,
      height: player.htmlImage.height,
    } as Dimension;

    this.playersContext.clearRect(
      position.x,
      position.y,
      dimension.width,
      dimension.height
    );
  }

  /**
   * Draws a single player on the board.
   * @param player
   * @param currentStep If the player is moving, represents the relevant frame in the sprite.
   */
  public drawPlayer(player: Player, currentStep: number) {
    this.playersContext.drawImage(
      player.htmlImage,
      (player.htmlImage.width / 4) * (currentStep % 4),
      0,
      32,
      32,
      player.point.x,
      player.point.y,
      player.htmlImage.width / 4,
      player.htmlImage.height
    );
  }

  // disegna il triangolino che segnala la disponibilità a fare un movimento
  public drawMoveCursors() {
    let ctx = this.mouseContext;
    ctx.clearRect(0, 0, this.mouseCanvas.width, this.mouseCanvas.height);
    this.controllers.map((e) => {
      if (e.player.moving !== true && e.player.moveDone !== true) {
        let startpoint = {
          x: e.player.position.x + e.player.htmlImage.width / 4 / 2,
          y: e.player.position.y + e.player.htmlImage.height + 4,
        };

        let ctx = this.mouseContext;
        ctx.fillStyle = "#ffff00";
        ctx.beginPath();
        ctx.moveTo(startpoint.x, startpoint.y);
        ctx.lineTo(startpoint.x - 6, startpoint.y + 12);
        ctx.lineTo(startpoint.x + 6, startpoint.y + 12);
        ctx.closePath();
        ctx.fill();
      }
    });
  }

  // disegna il cerchio di massimo movimento di un giocatore
  public drawMaximumMovement(player: Player) {
    let r = 5;
    let center = {
      x: player.point.x + player.htmlImage.width / 4 / 2,
      y: player.point.y + player.htmlImage.height + 4,
    };
    let ctx = this.mouseContext;
    ctx.beginPath();
    ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fill();
  }

  public clearMaximumMovement() {}

  public setMaximumMovement() {
    if (document.pointerLockElement === this.mouseCanvas) {
      console.log("pointer locked");
    } else {
      console.log("pointer unlocked");
    }
  }

  public setMovementCursor() {
    let body = document.querySelector("body")!;

    if (!body.classList.contains("selected-player")) {
      body.classList.add("selected-player");
    } else {
      body.classList.remove("selected-player");
    }
  }

  public clearMovementCursor() {
    let body = document.querySelector("body")!;

    if (body.classList.contains("selected-player")) {
      body.classList.remove("selected-player");
    }
  }

  /**
   * Find and dispatch whether a player's sprite is moving through another player's sprite
   */
  public checkPlayerCollisions(player: Player) {
    this.controllers.map((e) => {
      if (e.player.htmlImage.id !== player.htmlImage.id) {
        let width = e.player.htmlImage.width / 4;
        let height = e.player.htmlImage.height;

        // sprites boundaries
        let cL = player.point.x;
        let cR = cL + width;
        let cT = player.point.y;
        let cB = cT + height;
        let eL = e.player.position.x;
        let eR = eL + width;
        let eT = e.player.position.y;
        let eB = eT + height;

        if (cL < eR && cR > eL && cT < eB && cB > eT) {
          this.drawPlayer(e.player, 0);
          let playerCollision = new PlayerEvent("playercollision", e.player);
          e.player.dispatchEvent(playerCollision);
        }
      }
    });
  }

  public updateMaximumMovement(player: Player) {
    this.drawMaximumMovement(player);
  }
}
