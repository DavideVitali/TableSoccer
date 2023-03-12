"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player extends EventTarget {
    constructor(imageUrl, name, position, stats) {
        super();
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
        this._stats = stats;
        this._position = position;
        this._selected = false;
        this._waiting = false;
        this._moving = false;
        this._moveDone = null;
        this._htmlImage = null;
        this.addEventListener('playermoved', (e) => {
            this.clearWaiting();
            this.setMoving();
            console.log(e.type);
        });
        this.addEventListener('playerstopped', (e) => {
            this.clearMoving();
            this.setMoveDone();
            console.log(e.type);
        });
        this.addEventListener('playerclick', (e) => {
            this._selected = !this._selected;
            if (this._selected === true && this.available === true) {
                this.setWaiting();
            }
        });
        this.addEventListener('playercollision', (e) => {
        });
    }
    ;
    get position() {
        return this._position;
    }
    set position(p) {
        this._position = p;
    }
    get available() {
        return this._moving !== true && this._moveDone !== true && this._waiting !== true;
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
}
exports.Player = Player;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsicGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLE1BQWEsTUFBTyxTQUFRLFdBQVc7SUFhbkMsWUFBWSxRQUFnQixFQUFFLElBQVksRUFBRSxRQUFlLEVBQUUsS0FBVTtRQUNuRSxLQUFLLEVBQUUsQ0FBQztRQXNETCxlQUFVLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUMsQ0FBQTtRQUVNLGlCQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUMsQ0FBQTtRQU1NLGNBQVMsR0FBRyxHQUFHLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFBO1FBRU0sZ0JBQVcsR0FBRyxHQUFHLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQyxDQUFBO1FBTU0sZ0JBQVcsR0FBRyxHQUFHLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxDQUFBO1FBRU0sa0JBQWEsR0FBRyxHQUFHLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDMUIsQ0FBQyxDQUFBO1FBRU0sZ0JBQVcsR0FBRyxHQUFHLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFBO1FBTU0sV0FBTSxHQUFHLEdBQUcsRUFBRTtZQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUE7UUFFRCxrRUFBa0U7UUFDM0QsYUFBUSxH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