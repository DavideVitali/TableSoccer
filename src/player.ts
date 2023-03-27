import { Point } from "./coords.js";
import { PlayerEvent, PlayerEventDetail } from "./events.js";
import {
  ITransitionable as ITransitionable,
  PlayerStateEnum,
} from "./statemachine.js";
import { Utils } from "./utils.js";

export class Player
  extends EventTarget
  implements ITransitionable<PlayerStateEnum>
{
  private _waiting: boolean;
  private _moving: boolean;
  private _moveDone: boolean | null;
  private _selected: boolean;
  private _position: Point;
  private _stats?: any;
  public name: string;
  private _imageUrl: string;
  private _isLoaded: boolean;
  public loadImage: Promise<HTMLImageElement>;
  private _htmlImage: HTMLImageElement | any;
  currentState: PlayerStateEnum = PlayerStateEnum.IDLE;

  constructor(
    imageUrl: string,
    name: string,
    position: Point = { x: 0, y: 0 }
  ) {
    super();
    this._imageUrl = imageUrl;
    this.name = name;
    this._isLoaded = false;
    this.loadImage = Utils.loadImage(imageUrl);
    this._position = position;
    this._selected = false;
    this._waiting = false;
    this._moving = false;
    this._moveDone = null;
    this._htmlImage = null;

    this.addEventListener("playermoved", (e) => {
      this.clearWaiting();
      this.setMoving();
      console.log(e.type);
    });

    this.addEventListener("playerstopped", (e) => {
      this.clearMoving();
      this.setMoveDone();
      console.log(e.type);
    });

    this.addEventListener("playerclick", (e) => {
      this._selected = !this._selected;

      if (this._selected === true && this.available === true) {
        this.setWaiting();
      }
    });

    this.addEventListener("playercollision", (e) => {});
  }

  /**
   * Get the position of the player as a Point type.
   */
  public get point() {
    return this._position;
  }

  public set point(p) {
    this._position = p;
  }

  public get available() {
    return (
      this._moving !== true && this._moveDone !== true && this._waiting !== true
    );
  }

  public get waiting() {
    return this._waiting;
  }

  public setWaiting = () => {
    this._waiting = true;
  };

  public clearWaiting = () => {
    this._waiting = false;
  };

  public get moving() {
    return this._moving === true;
  }

  public setMoving = () => {
    this._moving = true;
  };

  public clearMoving = () => {
    this._moving = false;
  };

  public get moveDone() {
    return this._moveDone === true;
  }

  public setMoveDone = () => {
    this._moveDone = true;
  };

  public clearMoveDone = () => {
    this._moveDone = null;
  };

  public resetStatus = () => {
    this.clearWaiting();
    this.clearMoving();
    this.clearMoveDone();
  };

  public get selected() {
    return this._selected;
  }

  public select = () => {
    this._selected = true;
  };

  /* This is loop-called from board when selecting another player */
  public deselect = () => {
    this._selected = false;
    this._waiting = false;
  };

  public get htmlImage() {
    if (this._htmlImage !== null) {
      return this._htmlImage as HTMLImageElement;
    } else {
      return this._htmlImage;
    }
  }

  public set htmlImage(image: HTMLImageElement) {
    if (image !== null) {
      this._htmlImage = image;
    } else {
      throw new Error("Player image not loaded!");
    }
  }
}
