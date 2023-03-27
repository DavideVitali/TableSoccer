import { PlayerStateEnum } from "./statemachine.js";
import { Utils } from "./utils.js";
export class Player extends EventTarget {
    constructor(imageUrl, name, position = { x: 0, y: 0 }) {
        super();
        this.currentState = PlayerStateEnum.IDLE;
        this.setWaiting = () => {
            this._waiting = true;
        };
        this.clearWaiting = () => {
            this._waiting = false;
        };
        this.setMoving = () => {
            this._moving = true;
        };
        this.clearMoving = () => {
            this._moving = false;
        };
        this.setMoveDone = () => {
            this._moveDone = true;
        };
        this.clearMoveDone = () => {
            this._moveDone = null;
        };
        this.resetStatus = () => {
            this.clearWaiting();
            this.clearMoving();
            this.clearMoveDone();
        };
        this.select = () => {
            this._selected = true;
        };
        /* This is loop-called from board when selecting another player */
        this.deselect = () => {
            this._selected = false;
            this._waiting = false;
        };
        this._imageUrl = imageUrl;
        this.name = name;
        this._isLoaded = false;
        this.loadImage = Utils.loadImage(imageUrl);
        this._position = position;
        this._selected = false;
        this._waiting = false;
        this._moving = false;
        this._moveDone = null;
        this._htmlImage = null;
        this.addEventListener("playermoved", (e) => {
            this.clearWaiting();
            this.setMoving();
            console.log(e.type);
        });
        this.addEventListener("playerstopped", (e) => {
            this.clearMoving();
            this.setMoveDone();
            console.log(e.type);
        });
        this.addEventListener("playerclick", (e) => {
            this._selected = !this._selected;
            if (this._selected === true && this.available === true) {
                this.setWaiting();
            }
        });
        this.addEventListener("playercollision", (e) => { });
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
    get available() {
        return (this._moving !== true && this._moveDone !== true && this._waiting !== true);
    }
    get waiting() {
        return this._waiting;
    }
    get moving() {
        return this._moving === true;
    }
    get moveDone() {
        return this._moveDone === true;
    }
    get selected() {
        return this._selected;
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQTRCLGVBQWUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsTUFBTSxPQUFPLE1BQU8sU0FBUSxXQUFXO0lBY3JDLFlBQ0UsUUFBZ0IsRUFDaEIsSUFBWSxFQUNaLFdBQWtCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBRWhDLEtBQUssRUFBRSxDQUFDO1FBUFYsaUJBQVksR0FBb0IsZUFBZSxDQUFDLElBQUksQ0FBQztRQWdFOUMsZUFBVSxHQUFHLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QixDQUFDLENBQUM7UUFFSyxpQkFBWSxHQUFHLEdBQUcsRUFBRTtZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN4QixDQUFDLENBQUM7UUFNSyxjQUFTLEdBQUcsR0FBRyxFQUFFO1lBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsQ0FBQztRQUVLLGdCQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQU1LLGdCQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQztRQUVLLGtCQUFhLEdBQUcsR0FBRyxFQUFFO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsQ0FBQztRQUVLLGdCQUFXLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQztRQU1LLFdBQU0sR0FBRyxHQUFHLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDO1FBRUYsa0VBQWtFO1FBQzNELGFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDeEIsQ0FBQyxDQUFDO1FBMUdBLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMzQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBRWpDLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBR0Q7O09BRUc7SUFDSCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELElBQVcsU0FBUztRQUNsQixPQUFPLENBQ0wsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQzNFLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBVyxPQUFPO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBVUQsSUFBVyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQztJQUMvQixDQUFDO0lBVUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQWdCRCxJQUFXLFFBQVE7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFZRCxJQUFXLFNBQVM7UUFDbEIsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQyxVQUE4QixDQUFDO1NBQzVDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEI7SUFDSCxDQUFDO0lBRUQsSUFBVyxTQUFTLENBQUMsS0FBdUI7UUFDMUMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDN0M7SUFDSCxDQUFDO0NBQ0YifQ==