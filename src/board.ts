import { Card } from "./card.js";
import { PlayerRenderer } from "./renderers/player-renderer.js";
import { CardRenderer } from "./renderers/card-renderer.js";
import { PlayerEvent, PlayerEventDetail } from "./events.js";
import { Player } from "./player.js";
import { Coordinates, CoordinatesTransformer, Position } from "./coords.js";
import { Team } from "./team.js";
import { Dimension } from "./types.js";
import {
  ITransitionManager,
  ITransitionProvider,
  ITransitionStart,
  PlayerInputEnum,
  PlayerStateEnum,
  PlayerTransition,
} from "./statemachine.js";

declare const leftUserCard: Card;

export class Board
  extends EventTarget
  implements
    ITransitionProvider<PlayerStateEnum, PlayerInputEnum, PlayerTransition>,
    ITransitionManager<PlayerStateEnum, PlayerInputEnum, Player>
{
  public team?: Team;
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
  coordinatesTransformer: CoordinatesTransformer = new CoordinatesTransformer();
  transitions: [PlayerTransition, PlayerStateEnum][];

  // ----- RENDERERS ---------
  private playerRenderer: PlayerRenderer;
  private leftCardRenderer: CardRenderer;

  constructor() {
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

    /**
     *    ------------- PLAYER RENDERER ------------------------
     */
    this.playerRenderer = new PlayerRenderer(this.playersContext);
    this.leftCardRenderer = new CardRenderer(this.leftUserContext);

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
      console.log("Event handler...");
      let pEvent = e as PlayerEvent;
      this.clearPlayerRectangle(pEvent.detail.player);
    });

    this.addEventListener("playermoved", (e) => {
      let pEvent = e as PlayerEvent;
      this.drawPlayer(pEvent.detail.player, pEvent.detail.movement);
    });

    this.addEventListener("playercollision", (e) => {
      let pEvent = e as PlayerEvent;
      this.drawPlayer(pEvent.detail.player, pEvent.detail.movement);
    });

    // ------- TRANSITIONS -----------
    this.transitions = [
      [
        new PlayerTransition(PlayerStateEnum.IDLE, PlayerInputEnum.SELECT),
        PlayerStateEnum.WAITING,
      ],
      [
        new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.DESELECT),
        PlayerStateEnum.IDLE,
      ],
      [
        new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.MOVE),
        PlayerStateEnum.MOVING,
      ],
      [
        new PlayerTransition(PlayerStateEnum.MOVING, PlayerInputEnum.STOP),
        PlayerStateEnum.MOVED,
      ],
      [
        new PlayerTransition(PlayerStateEnum.MOVED, PlayerInputEnum.SELECT),
        PlayerStateEnum.SELECTED,
      ],
      [
        new PlayerTransition(
          PlayerStateEnum.SELECTED,
          PlayerInputEnum.DESELECT
        ),
        PlayerStateEnum.MOVED,
      ],
    ];

    this.addEventListener("playerclick", (e) => {
      let pEvent = e as PlayerEvent;
      console.log(pEvent.detail.player.name);
      // TODO: decide what happens on player click
      /**
       * Specifically, must set a relationship between a click and a StateInput.
       */
    });
  }

  getNext(entity: Player, input: PlayerInputEnum): PlayerStateEnum {
    let currentState = entity.currentState;

    let allowed = this.transitions.find((t) => {
      t[0].state === currentState && t[0].input === input;
    });

    if (!allowed) {
      throw new Error(
        `Input ${input} is not allowed for ${currentState} state in player ${entity.name}.`
      );
    }

    return allowed[1];
  }

  update(entity: Player, input: PlayerInputEnum): void {
    entity.currentState = this.getNext(entity, input);
  }

  public init(team: Team) {
    this.team = team;

    // players initialization
    this.team.players.forEach((p) => {
      p.loadImage.then((img) => {
        p.htmlImage = img;
        p.htmlImage.setAttribute("id", p.name);
        this.drawPlayer(p, 0);
      });
    });
  }

  // TODO: All drawing methods must use the renderer!

  public clearCanvas(
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Draws the entire team on the board
   */
  public drawTeam() {
    if (!this.team) {
      throw new Error("Team not initialized.");
    }

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
    this.leftCardRenderer.drawCard(card, player);
  }

  /**
   * Finds the player in a waiting state
   */
  public findWaitingPlayer() {
    if (!this.team) {
      throw new Error("Team not initialized.");
    }
    let result = this.team.players.filter((p) => {
      if (p.isWaiting) {
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

    this.playerRenderer.clearRectangle(player, position);
  }

  /**
   * Draws a single player on the board.
   * @param player
   * @param currentStep If the player is moving, represents the relevant frame in the sprite.
   */
  public drawPlayer(player: Player, currentStep: number): void {
    let position = this.coordinatesTransformer.toPosition(player.point);

    this.playerRenderer.drawPlayer(player, currentStep, position);
  }

  /**
   * Draws the availability triangle for every available player
   */
  public drawAvailabilityCursors() {
    if (!this.team) {
      throw new Error("Team not initialized.");
    }
    let ctx = this.mouseContext;
    ctx.clearRect(0, 0, this.mouseCanvas.width, this.mouseCanvas.height);
    this.team.players.map((player) => {
      let position = this.coordinatesTransformer.toPosition(player.point);
      if (!player.isMoving && !player.isMoved) {
        let startPosition = {
          x: position.x + player.htmlImage.width / 4 / 2,
          y: position.y + player.htmlImage.height + 4,
        } as Position;

        let ctx = this.mouseContext;
        ctx.fillStyle = "#ffff00";
        ctx.beginPath();
        ctx.moveTo(startPosition.x, startPosition.y);
        ctx.lineTo(startPosition.x - 6, startPosition.y + 12);
        ctx.lineTo(startPosition.x + 6, startPosition.y + 12);
        ctx.closePath();
        ctx.fill();
      }
    });
  }

  /**
   * Draws the maximum movement radius of a player
   * @param player
   */
  public drawMaximumMovement(player: Player) {
    let position = this.coordinatesTransformer.toPosition(player.point);
    let r = 5;
    let center = {
      x: position.x + player.htmlImage.width / 4 / 2,
      y: position.y + player.htmlImage.height + 4,
    };
    let ctx = this.mouseContext;
    ctx.beginPath();
    ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fill();
  }

  public clearMaximumMovement() {}

  /**
   * POINTER LOCK MUST BE REVIEWED, LAST TIME DIDN'T WORK AS EXPECTED
   */
  public setMaximumMovement() {
    if (document.pointerLockElement === this.mouseCanvas) {
      console.log("pointer locked");
    } else {
      console.log("pointer unlocked");
    }
  }

  // WHAT'S ITS JOB?!
  public setMovementCursor() {
    let body = document.querySelector("body")!;

    if (!body.classList.contains("selected-player")) {
      body.classList.add("selected-player");
    } else {
      body.classList.remove("selected-player");
    }
  }

  // WHAT'S ITS JOB?!
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
    if (!this.team) {
      throw new Error("Team not initialized.");
    }
    this.team.players.map((e) => {
      if (e.htmlImage.id !== player.htmlImage.id) {
        let position = this.coordinatesTransformer.toPosition(e.point);
        let dimension = {
          width: e.htmlImage.width / 4,
          height: e.htmlImage.height,
        } as Dimension;

        // sprites boundaries
        let cL = position.x;
        let cR = cL + dimension.width;
        let cT = position.y;
        let cB = cT + dimension.height;
        let eL = position.x;
        let eR = eL + dimension.width;
        let eT = position.y;
        let eB = eT + dimension.height;

        if (cL < eR && cR > eL && cT < eB && cB > eT) {
          this.drawPlayer(e, 0);
          let playerCollision = new PlayerEvent("playercollision", {
            player: e,
            movement: 0,
          } as PlayerEventDetail);
          e.dispatchEvent(playerCollision);
        }
      }
    });
  }

  /**
   * Find a player by its position or point values.
   * @param point
   * @returns
   */
  findPlayer<T extends Coordinates>(coordinates: T) {
    if (!this.team) {
      throw new Error("Team can't be null");
    }
    for (let i = 0; i < this.team.players.length; i++) {
      let width = this.team.players[i].htmlImage.width / 4;
      let height = this.team.players[i].htmlImage.height;
      if (coordinates instanceof Position) {
        let playerPosition = this.coordinatesTransformer.toPosition(
          this.team.players[i].point
        );
        if (
          playerPosition.x < coordinates.x &&
          playerPosition.x + width > coordinates.x &&
          playerPosition.y < coordinates.y &&
          playerPosition.y + height > coordinates.y
        ) {
          return this.team.players[i];
        }
      } else {
        let playerPoint = this.team.players[i].point;
        if (
          playerPoint.x === coordinates.x &&
          playerPoint.y === playerPoint.y
        ) {
          return this.team.players[i];
        }
      }
    }
    return null;
  }
  // REVIEW
  public updateMaximumMovement(player: Player) {
    this.drawMaximumMovement(player);
  }
}
