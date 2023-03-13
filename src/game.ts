import { Board } from "./board.js";
import { GameEvents } from "./events.js";
import { Player } from "./player.js";

export class Game {
    _events: GameEvents;

  constructor(
    private _board: Board,
    private _selectedPlayer: Player | null = null,
  ) {
    this._events = new GameEvents(this);
  }

  get events() {
    return this._events;
  }

  get board() {
    return this._board;
  }

  get selectedPlayer() {
    return this._selectedPlayer;
  }

  set selectedPlayer(value) {
    if (!value) {
      throw new Error("player can't be null");
    }
    this._selectedPlayer = value;
  }

  public clearSelectedPlayer() {
    this._selectedPlayer = null;
  }
}
