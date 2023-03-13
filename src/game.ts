import { Player } from "./player.js";

export class Game {
    private _selectedPlayer: Player | null;

    constructor() {
        this._selectedPlayer = null;
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