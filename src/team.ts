import { Coordinates } from "./coords.js";
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
  findPlayer(point: Coordinates) {
    let p: Player | null;
    for (let i = 0; i < this.elements.length; i++) {
      let width = this.elements[i].player.htmlImage.width / 4;
      let height = this.elements[i].player.htmlImage.height;
      let position = this.elements[i].position;
      if (
        position.x < point.x &&
        position.x + width > point.x &&
        position.y < point.y &&
        position.y + height > point.y
      ) {
        p = this.elements[i].player;
        break;
      }
    }
    return p;
  }
}
