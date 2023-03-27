import { PlayerStateEnum, } from "./statemachine.js";
import { Utils } from "./utils.js";
export class Player extends EventTarget {
    constructor(imageUrl, name, position = { x: 0, y: 0 }) {
        super();
        this.currentState = PlayerStateEnum.IDLE;
        this._imageUrl = imageUrl;
        this.name = name;
        this._isLoaded = false;
        this.loadImage = Utils.loadImage(imageUrl);
        this._position = position;
        this._htmlImage = null;
    }
    /**
     * Get the position of the player as a Point type.
     */
    get point() {
        return this._position;
    }
    set point(p) {
        this._position = p;
    }
    get htmlImage() {
        if (this._htmlImage !== null) {
            return this._htmlImage;
        }
        else {
            return this._htmlImage;
        }
    }
    set htmlImage(image) {
        if (image !== null) {
            this._htmlImage = image;
        }
        else {
            throw new Error("Player image not loaded!");
        }
    }
    get isIdle() {
        return this.currentState === PlayerStateEnum.IDLE;
    }
    get isWaiting() {
        return this.currentState === PlayerStateEnum.WAITING;
    }
    get isMoving() {
        return this.currentState === PlayerStateEnum.MOVING;
    }
    get isMoved() {
        return this.currentState === PlayerStateEnum.MOVED;
    }
    get isSelected() {
        return this.currentState === PlayerStateEnum.SELECTED;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBRUwsZUFBZSxHQUNoQixNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsTUFBTSxPQUFPLE1BQ1gsU0FBUSxXQUFXO0lBWW5CLFlBQ0UsUUFBZ0IsRUFDaEIsSUFBWSxFQUNaLFdBQWtCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBRWhDLEtBQUssRUFBRSxDQUFDO1FBUFYsaUJBQVksR0FBb0IsZUFBZSxDQUFDLElBQUksQ0FBQztRQVFuRCxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBVyxLQUFLO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFXLEtBQUssQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxVQUE4QixDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsS0FBdUI7UUFDMUMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0lBRUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLGVBQWUsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssZUFBZSxDQUFDLE9BQU8sQ0FBQztJQUN2RCxDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksS0FBSyxlQUFlLENBQUMsTUFBTSxDQUFDO0lBQ3RELENBQUM7SUFFRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLGVBQWUsQ0FBQyxLQUFLLENBQUM7SUFDckQsQ0FBQztJQUVELElBQVcsVUFBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxZQUFZLEtBQUssZUFBZSxDQUFDLFFBQVEsQ0FBQztJQUN4RCxDQUFDO0NBQ0YifQ==