/**
 * A Player's state
 */
export var PlayerStateEnum;
(function (PlayerStateEnum) {
    PlayerStateEnum[PlayerStateEnum["IDLE"] = 0] = "IDLE";
    PlayerStateEnum[PlayerStateEnum["WAITING"] = 1] = "WAITING";
    PlayerStateEnum[PlayerStateEnum["MOVING"] = 2] = "MOVING";
    PlayerStateEnum[PlayerStateEnum["MOVED"] = 3] = "MOVED";
    PlayerStateEnum[PlayerStateEnum["SELECTED"] = 4] = "SELECTED";
})(PlayerStateEnum || (PlayerStateEnum = {}));
/**
 * The possible inputs for a Player's state
 */
export var PlayerInputEnum;
(function (PlayerInputEnum) {
    PlayerInputEnum[PlayerInputEnum["SELECT"] = 0] = "SELECT";
    PlayerInputEnum[PlayerInputEnum["MOVE"] = 1] = "MOVE";
    PlayerInputEnum[PlayerInputEnum["STOP"] = 2] = "STOP";
    PlayerInputEnum[PlayerInputEnum["DESELECT"] = 3] = "DESELECT";
})(PlayerInputEnum || (PlayerInputEnum = {}));
/**
 * The allowed starting state and inputs for a transition
 * in a Players state machine
 */
export class PlayerTransition {
    constructor(state, input) {
        this.state = state;
        this.input = input;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVtYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0YXRlbWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFxRkE7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxlQU1YO0FBTkQsV0FBWSxlQUFlO0lBQ3pCLHFEQUFJLENBQUE7SUFDSiwyREFBTyxDQUFBO0lBQ1AseURBQU0sQ0FBQTtJQUNOLHVEQUFLLENBQUE7SUFDTCw2REFBUSxDQUFBO0FBQ1YsQ0FBQyxFQU5XLGVBQWUsS0FBZixlQUFlLFFBTTFCO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQU4sSUFBWSxlQUtYO0FBTEQsV0FBWSxlQUFlO0lBQ3pCLHlEQUFNLENBQUE7SUFDTixxREFBSSxDQUFBO0lBQ0oscURBQUksQ0FBQTtJQUNKLDZEQUFRLENBQUE7QUFDVixDQUFDLEVBTFcsZUFBZSxLQUFmLGVBQWUsUUFLMUI7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sZ0JBQWdCO0lBRzNCLFlBQW1CLEtBQXNCLEVBQVMsS0FBc0I7UUFBckQsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFpQjtJQUFHLENBQUM7Q0FDN0UifQ==