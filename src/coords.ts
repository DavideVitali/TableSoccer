import { SETTINGS } from "./settings.js";
import { Dimension } from "./types.js";

/**
 * Coordinates are the elementary building blocks for determining the position of a Player.
 * There are two types of Coordinates:
 * - Point: Player position on x/y axis is represented in percentage value
 * (0% = starting ponint of the axis, 100% ending point)
 * - Position: defines the absolute position on the board.
 */
export interface Coordinates {
  x: number;
  y: number;
}

/**
 * Represents the player position on x/y axis as a percentage value
 */
export class Point implements Coordinates {
  constructor(public x: number, public y: number) {}
}

/**
 * Represents the player postion on x/y axis as the absolute position over the board
 */
export class Position implements Coordinates {
  constructor(public x: number, public y: number) {}
}

export class CoordinatesTransformer {
  private d: Dimension;
  constructor() {
    this.d = {
      width: SETTINGS.board.width,
      height: SETTINGS.board.height
    };
  }

  toPoint(position: Position) {
    return {
      x: Math.round((position.x * 100) / this.d.width),
      y: Math.round((position.y * 100) / this.d.height),
    } as Point;
  }

  toPosition(point: Point) {
    return {
      x: Math.round((this.d.width * point.x) / 100),
      y: Math.round((this.d.height * point.y) / 100),
    } as Position;
  }
}
