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
    this._htmlImage = null;
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

  public get isIdle() {
    return this.currentState === PlayerStateEnum.IDLE;
  }

  public get isWaiting() {
    return this.currentState === PlayerStateEnum.WAITING;
  }

  public get isMoving() {
    return this.currentState === PlayerStateEnum.MOVING;
  }

  public get isMoved() {
    return this.currentState === PlayerStateEnum.MOVED;
  }

  public get isSelected() {
    return this.currentState === PlayerStateEnum.SELECTED;
  }
}
