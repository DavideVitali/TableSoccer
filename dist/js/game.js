import { GameEvents } from "./events.js";
export class Game {
    constructor(_board, _selectedPlayer = null) {
        this._board = _board;
        this._selectedPlayer = _selectedPlayer;
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
    clearSelectedPlayer() {
        this._selectedPlayer = null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHekMsTUFBTSxPQUFPLElBQUk7SUFHZixZQUNVLE1BQWEsRUFDYixrQkFBaUMsSUFBSTtRQURyQyxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQ2Isb0JBQWUsR0FBZixlQUFlLENBQXNCO1FBRTdDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJLGNBQWMsQ0FBQyxLQUFLO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRU0sbUJBQW1CO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7Q0FDRiJ9