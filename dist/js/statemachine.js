var PlayerStateEnum;
(function (PlayerStateEnum) {
    PlayerStateEnum[PlayerStateEnum["IDLE"] = 0] = "IDLE";
    PlayerStateEnum[PlayerStateEnum["WAITING"] = 1] = "WAITING";
    PlayerStateEnum[PlayerStateEnum["MOVING"] = 2] = "MOVING";
    PlayerStateEnum[PlayerStateEnum["MOVED"] = 3] = "MOVED";
    PlayerStateEnum[PlayerStateEnum["SELECTED"] = 4] = "SELECTED";
})(PlayerStateEnum || (PlayerStateEnum = {}));
var PlayerInputEnum;
(function (PlayerInputEnum) {
    PlayerInputEnum[PlayerInputEnum["SELECT"] = 0] = "SELECT";
    PlayerInputEnum[PlayerInputEnum["MOVE"] = 1] = "MOVE";
    PlayerInputEnum[PlayerInputEnum["STOP"] = 2] = "STOP";
    PlayerInputEnum[PlayerInputEnum["DESELECT"] = 3] = "DESELECT";
})(PlayerInputEnum || (PlayerInputEnum = {}));
class PlayerTransition {
    constructor(state, input) {
        this.state = state;
        this.input = input;
    }
}
export class PlayerStateMachine {
    constructor() {
        this.transitions = [];
        this.transitions.push([
            new PlayerTransition(PlayerStateEnum.IDLE, PlayerInputEnum.SELECT),
            PlayerStateEnum.WAITING,
        ]);
        this.transitions.push([
            new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.DESELECT),
            PlayerStateEnum.IDLE,
        ]);
        this.transitions.push([
            new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.MOVE),
            PlayerStateEnum.MOVING,
        ]);
        this.transitions.push([
            new PlayerTransition(PlayerStateEnum.MOVING, PlayerInputEnum.STOP),
            PlayerStateEnum.MOVED,
        ]);
        this.transitions.push([
            new PlayerTransition(PlayerStateEnum.MOVED, PlayerInputEnum.SELECT),
            PlayerStateEnum.SELECTED,
        ]);
        this.transitions.push([
            new PlayerTransition(PlayerStateEnum.SELECTED, PlayerInputEnum.DESELECT),
            PlayerStateEnum.MOVED,
        ]);
        this.currentState = PlayerStateEnum.IDLE;
    }
    getNext(input) {
        let targetTransition = this.transitions
            .find((t) => {
            t[0].state === this.currentState && t[0].input === input;
        });
        if (!targetTransition) {
            throw new Error(`Input ${input} not allowed in ${this.currentState} state.`);
        }
        return targetTransition[1];
    }
    update(input) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVtYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0YXRlbWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQ0EsSUFBSyxlQU1KO0FBTkQsV0FBSyxlQUFlO0lBQ2xCLHFEQUFJLENBQUE7SUFDSiwyREFBTyxDQUFBO0lBQ1AseURBQU0sQ0FBQTtJQUNOLHVEQUFLLENBQUE7SUFDTCw2REFBUSxDQUFBO0FBQ1YsQ0FBQyxFQU5JLGVBQWUsS0FBZixlQUFlLFFBTW5CO0FBQ0QsSUFBSyxlQUtKO0FBTEQsV0FBSyxlQUFlO0lBQ2xCLHlEQUFNLENBQUE7SUFDTixxREFBSSxDQUFBO0lBQ0oscURBQUksQ0FBQTtJQUNKLDZEQUFRLENBQUE7QUFDVixDQUFDLEVBTEksZUFBZSxLQUFmLGVBQWUsUUFLbkI7QUFFRCxNQUFNLGdCQUFnQjtJQUdwQixZQUFtQixLQUFzQixFQUFTLEtBQXNCO1FBQXJELFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7SUFBRyxDQUFDO0NBQzdFO0FBRUQsTUFBTSxPQUFPLGtCQUFrQjtJQU03QjtRQUhBLGdCQUFXLEdBQTBDLEVBQUUsQ0FBQztRQUl0RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQztZQUNsRSxlQUFlLENBQUMsT0FBTztTQUN4QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQztZQUN2RSxlQUFlLENBQUMsSUFBSTtTQUNyQixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQztZQUNuRSxlQUFlLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQztZQUNsRSxlQUFlLENBQUMsS0FBSztTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLE1BQU0sQ0FBQztZQUNuRSxlQUFlLENBQUMsUUFBUTtTQUN6QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUNwQixJQUFJLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQztZQUN4RSxlQUFlLENBQUMsS0FBSztTQUN0QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFzQjtRQUM1QixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXO2FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1YsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUwsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FBUyxLQUFLLG1CQUFtQixJQUFJLENBQUMsWUFBWSxTQUFTLENBQzVELENBQUM7U0FDSDtRQUVELE9BQU8sZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFzQjtRQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGIn0=