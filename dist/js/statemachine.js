export var PlayerStateEnum;
(function (PlayerStateEnum) {
    PlayerStateEnum[PlayerStateEnum["IDLE"] = 0] = "IDLE";
    PlayerStateEnum[PlayerStateEnum["WAITING"] = 1] = "WAITING";
    PlayerStateEnum[PlayerStateEnum["MOVING"] = 2] = "MOVING";
    PlayerStateEnum[PlayerStateEnum["MOVED"] = 3] = "MOVED";
    PlayerStateEnum[PlayerStateEnum["SELECTED"] = 4] = "SELECTED";
})(PlayerStateEnum || (PlayerStateEnum = {}));
;
export var PlayerInputEnum;
(function (PlayerInputEnum) {
    PlayerInputEnum[PlayerInputEnum["SELECT"] = 0] = "SELECT";
    PlayerInputEnum[PlayerInputEnum["MOVE"] = 1] = "MOVE";
    PlayerInputEnum[PlayerInputEnum["STOP"] = 2] = "STOP";
    PlayerInputEnum[PlayerInputEnum["DESELECT"] = 3] = "DESELECT";
})(PlayerInputEnum || (PlayerInputEnum = {}));
;
export class PlayerTransition {
    constructor(state, input) {
        this.state = state;
        this.input = input;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVtYWNoaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3N0YXRlbWFjaGluZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF3Q0EsTUFBTSxDQUFOLElBQVksZUFNWDtBQU5ELFdBQVksZUFBZTtJQUN6QixxREFBSSxDQUFBO0lBQ0osMkRBQU8sQ0FBQTtJQUNQLHlEQUFNLENBQUE7SUFDTix1REFBSyxDQUFBO0lBQ0wsNkRBQVEsQ0FBQTtBQUNWLENBQUMsRUFOVyxlQUFlLEtBQWYsZUFBZSxRQU0xQjtBQUFBLENBQUM7QUFFRixNQUFNLENBQU4sSUFBWSxlQUtYO0FBTEQsV0FBWSxlQUFlO0lBQ3pCLHlEQUFNLENBQUE7SUFDTixxREFBSSxDQUFBO0lBQ0oscURBQUksQ0FBQTtJQUNKLDZEQUFRLENBQUE7QUFDVixDQUFDLEVBTFcsZUFBZSxLQUFmLGVBQWUsUUFLMUI7QUFBQSxDQUFDO0FBRUYsTUFBTSxPQUFPLGdCQUFnQjtJQUczQixZQUFtQixLQUFzQixFQUFTLEtBQXNCO1FBQXJELFVBQUssR0FBTCxLQUFLLENBQWlCO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBaUI7SUFBRyxDQUFDO0NBQzdFIn0=