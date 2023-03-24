import { PlayerEvent } from "./events.js";
export class Renderer extends EventTarget {
    constructor(player, position) {
        super();
        this.player = player;
        this.position = position;
        this.targetDelta = { x: 0, y: 0 };
        this.frameNumber = 0;
        this.cancelAnimationRequest = false;
        //// ----------- qui l'immagine non è stata ancora caricata
        this.player.loadImage.then((img) => {
            this.player.htmlImage = img;
            this.player.htmlImage.setAttribute("id", this.player.name);
            this.moveRequestCursorPosition = {
                x: position.x + img.width / 4 / 2,
                y: position.y + img.height + 4,
            };
        });
        // animation speed settings
        this.fpsInterval = 1000 / 50;
        this.animationStartTimestamp;
        // 1 player step = 16 px;
        this.playerStepLength = 16;
    }
    animateSprite(timestamp = 0) {
        let rafId = requestAnimationFrame(() => this.animateSprite);
        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        /* the animation is flagged to be canceled when the player reaches the target position */
        if (this.targetCoordinates) {
            let proximityX = Math.floor(Math.abs(this.targetCoordinates.x - this.player.point.x));
            let proximityY = Math.floor(Math.abs(this.targetCoordinates.y - this.player.point.y));
            if (proximityX == 0 && proximityY == 0) {
                this.cancelAnimation();
            }
        }
        let elapsedTime = Date.now() - this.animationStartTimestamp;
        if (elapsedTime > this.fpsInterval) {
            let cancelAnimationTriggered = false;
            if (this.frameNumber % 2 == 1 && this.cancelAnimationRequest == true) {
                window.cancelAnimationFrame(rafId);
                cancelAnimationTriggered = true;
            }
            this.animationStartTimestamp = Date.now();
            let requestedPlayerRectClear = new PlayerEvent("requestedplayerrectclear", this.player);
            this.player.dispatchEvent(requestedPlayerRectClear);
            /* because collisions cause the collided players to be redrawn, moving players are drawn after
                  the redrawing of the collided ones, giving the impression they move "over" instead of "under" */
            //board.checkPlayerCollisions(this.player);
            let requestedBoardCollisionCheckEvent = new PlayerEvent("requestedboardcollisioncheck", this.player);
            this.player.dispatchEvent(requestedBoardCollisionCheckEvent);
            this.player.point.x += this.targetDelta.x;
            this.player.point.y += this.targetDelta.y;
            //board.drawMoveCursors();
            this.frameNumber++;
            //board.drawPlayer(this.player, this.frameNumber);
            let playerMovedEvent = new PlayerEvent("playermoved", this.player, this.frameNumber);
            this.player.dispatchEvent(playerMovedEvent);
            if (cancelAnimationTriggered === true) {
                let playerStoppedEvent = new PlayerEvent("playerstopped", this.player);
                this.player.dispatchEvent(playerStoppedEvent);
            }
        }
    }
    cancelAnimation() {
        this.cancelAnimationRequest = true;
        this.targetCoordinates = null;
        this.targetDelta = { x: 0, y: 0 };
    }
    startAnimation() {
        this.cancelAnimationRequest = false;
        this.animateSprite();
    }
    isPlaying() {
        return this.player.moving;
    }
    setTargetCoordinates(target) {
        if (this.player.moveDone === true) {
            throw new Error(`Hai già mosso ${this.player.name}`);
        }
        // target coordinates are set at the feet of the player:
        target.x -= this.player.htmlImage.width / 4 / 2;
        target.y -= this.player.htmlImage.height;
        this.targetCoordinates = target;
        if (this.targetCoordinates) {
            let dx = this.targetCoordinates.x - this.player.point.x;
            let dy = this.targetCoordinates.y - this.player.point.y;
            let stepToDistance = Math.ceil(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / this.playerStepLength);
            this.targetDelta.x = dx / stepToDistance;
            this.targetDelta.y = dy / stepToDistance;
        }
        else {
            throw new Error("No target coordinates set!");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUkxQyxNQUFNLE9BQU8sUUFBUyxTQUFRLFdBQVc7SUFZdkMsWUFBbUIsTUFBYyxFQUFTLFFBQWtCO1FBQzFELEtBQUssRUFBRSxDQUFDO1FBRFMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUFScEQsZ0JBQVcsR0FBYSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBVTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFFcEMsMkRBQTJEO1FBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLHlCQUF5QixHQUFHO2dCQUMvQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO2dCQUNqQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUM7YUFDL0IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFFN0IseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVPLGFBQWEsQ0FBQyxZQUFvQixDQUFDO1FBQ3pDLElBQUksS0FBSyxHQUFHLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7U0FDMUM7UUFFRCx5RkFBeUY7UUFDekYsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUN6RCxDQUFDO1lBQ0YsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDekIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUN6RCxDQUFDO1lBQ0YsSUFBSSxVQUFVLElBQUksQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN4QjtTQUNGO1FBRUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUU1RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xDLElBQUksd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1lBRXJDLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsSUFBSSxJQUFJLEVBQUU7Z0JBQ3BFLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO2FBQ2pDO1lBRUQsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUUxQyxJQUFJLHdCQUF3QixHQUFHLElBQUksV0FBVyxDQUM1QywwQkFBMEIsRUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUVwRDtrSEFDc0c7WUFDdEcsMkNBQTJDO1lBQzNDLElBQUksaUNBQWlDLEdBQUcsSUFBSSxXQUFXLENBQ3JELDhCQUE4QixFQUM5QixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDMUMsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVuQixrREFBa0Q7WUFDbEQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLFdBQVcsQ0FDcEMsYUFBYSxFQUNiLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFdBQVcsQ0FDakIsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFNUMsSUFBSSx3QkFBd0IsS0FBSyxJQUFJLEVBQUU7Z0JBQ3JDLElBQUksa0JBQWtCLEdBQUcsSUFBSSxXQUFXLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQzthQUMvQztTQUNGO0lBQ0gsQ0FBQztJQUVNLGVBQWU7UUFDcEIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU0sY0FBYztRQUNuQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVNLG9CQUFvQixDQUFDLE1BQWdCO1FBQzFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUN0RDtRQUVELHdEQUF3RDtRQUN4RCxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUM7UUFFaEMsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FDckUsQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxjQUFjLENBQUM7WUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLGNBQWMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztDQUNGIn0=