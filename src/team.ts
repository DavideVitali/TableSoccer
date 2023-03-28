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

    if (_formation.coordinates.length !== _players.length) {
      throw new Error("Formation length must be equal to Team length.");
    }

    for (let i = 0; i < _players.length; i++) {
      _players[i].point = _formation.coordinates[i];
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
}
