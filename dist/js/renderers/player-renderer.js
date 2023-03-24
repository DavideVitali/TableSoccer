import { PlayerEvent } from "../events.js";
export class PlayerRenderer extends EventTarget {
    constructor(speed, stepLength) {
        super();
        this.targetDelta = { x: 0, y: 0 };
        this.frameNumber = 0;
        this.cancelAnimationRequest = false;
        // animation speed settings (current best: 1000)
        this.fpsInterval = speed / 50;
        this.animationStartTimestamp;
        // 1 player step = 16 px; (current best: 16)
        this.playerStepLength = stepLength;
    }
    animateSprite(player, timestamp = 0) {
        let detailEvent = {
            player: player,
            movement: this.frameNumber,
        };
        let rafId = requestAnimationFrame(() => this.animateSprite);
        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        /* the animation is flagged to be canceled when the player reaches the target position */
        if (this.targetCoordinates) {
            let proximityX = Math.floor(Math.abs(this.targetCoordinates.x - player.point.x));
            let proximityY = Math.floor(Math.abs(this.targetCoordinates.y - player.point.y));
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
            let requestedPlayerRectClear = new PlayerEvent("requestedplayerrectclear", detailEvent);
            player.dispatchEvent(requestedPlayerRectClear);
            /* because collisions cause the collided players to be redrawn, moving players are drawn after
                  the redrawing of the collided ones, giving the impression they move "over" instead of "under" */
            //board.checkPlayerCollisions(this.player);
            let requestedBoardCollisionCheckEvent = new PlayerEvent("requestedboardcollisioncheck", detailEvent);
            player.dispatchEvent(requestedBoardCollisionCheckEvent);
            player.point.x += this.targetDelta.x;
            player.point.y += this.targetDelta.y;
            //board.drawMoveCursors();
            this.frameNumber++;
            detailEvent.movement++;
            //board.drawPlayer(this.player, this.frameNumber);
            let playerMovedEvent = new PlayerEvent("playermoved", detailEvent);
            player.dispatchEvent(playerMovedEvent);
            if (cancelAnimationTriggered === true) {
                let playerStoppedEvent = new PlayerEvent("playerstopped", detailEvent);
                player.dispatchEvent(playerStoppedEvent);
            }
        }
    }
    cancelAnimation() {
        this.cancelAnimationRequest = true;
        this.targetCoordinates = null;
        this.targetDelta = { x: 0, y: 0 };
    }
    startAnimation(player) {
        this.cancelAnimationRequest = false;
        this.animateSprite(player);
    }
    isPlaying(player) {
        return player.moving;
    }
    setTargetCoordinates(player, target) {
        if (player.moveDone === true) {
            throw new Error(`Hai già mosso ${player.name}`);
        }
        // target coordinates are set at the feet of the player:
        target.x -= player.htmlImage.width / 4 / 2;
        target.y -= player.htmlImage.height;
        this.targetCoordinates = target;
        if (this.targetCoordinates) {
            let dx = this.targetCoordinates.x - player.point.x;
            let dy = this.targetCoordinates.y - player.point.y;
            let stepToDistance = Math.ceil(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / this.playerStepLength);
            this.targetDelta.x = dx / stepToDistance;
            this.targetDelta.y = dy / stepToDistance;
        }
        else {
            throw new Error("No target coordinates set!");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlbmRlcmVycy9wbGF5ZXItcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxjQUFjLENBQUM7QUFHOUQsTUFBTSxPQUFPLGNBQWUsU0FBUSxXQUFXO0lBWTdDLFlBQVksS0FBYSxFQUFFLFVBQWtCO1FBQzNDLEtBQUssRUFBRSxDQUFDO1FBVEYsZ0JBQVcsR0FBYSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBVTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFFcEMsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFFN0IsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUM7SUFDckMsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFjLEVBQUUsWUFBb0IsQ0FBQztRQUN6RCxJQUFJLFdBQVcsR0FBc0I7WUFDbkMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDM0IsQ0FBQztRQUVGLElBQUksS0FBSyxHQUFHLHFCQUFxQixDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxTQUFTLENBQUM7U0FDMUM7UUFFRCx5RkFBeUY7UUFDekYsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUss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