import { Coordinates, Point, Position } from "./coords.js";
import { Formation } from "./formations.js";
import { Player } from "./player.js";

export type SearchForType = "INDEX" | "PLAYER";

export class Team {
  constructor(
    private _formation: Formation,
    private _players: Player[],
    private _name: string
  ) {
    if (_players.length != 11) {
      throw new Error("Must be 11 players.");
    }
  }

  get formation() {
    return this._formation;
  }

  get players() {
    return this._players;
  }

  get name() {
    return this._name;
  }

  /**
   * Find a player by its position over the board.
   * @param point
   * @returns
   */
  findPlayer(point: Point) {
    for (let i = 0; i < this._players.length; i++) {
      let width = this._players[i].htmlImage.width / 4;
      let height = this._players[i].htmlImage.height;
      let playerPoint = this._players[i].point;
      if (
        playerPoint.x < point.x &&
        playerPoint.x + width > point.x &&
        playerPoint.y < point.y &&
        playerPoint.y + height > point.y
      ) {
        return this._players[i];
      }
    }
    return null;
  }
}
