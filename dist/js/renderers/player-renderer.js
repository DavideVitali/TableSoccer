import { PlayerEvent } from "../events.js";
import { SETTINGS } from "../settings.js";
import { PlayerStateEnum } from "../statemachine.js";
export class PlayerRenderer extends EventTarget {
    constructor(context) {
        super();
        this.context = context;
        this.targetDelta = { x: 0, y: 0 };
        this.frameNumber = 0;
        this.cancelAnimationRequest = false;
        // animation speed settings (current best: 1000)
        this.fpsInterval = SETTINGS.speed.frameRate / 50;
        this.animationStartTimestamp;
        // 1 player step = 16 px; (current best: 16)
        this.playerStepLength = SETTINGS.speed.stepLength;
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
    setTargetCoordinates(player, target) {
        if (player.currentState !== PlayerStateEnum.IDLE &&
            player.currentState !== PlayerStateEnum.WAITING) {
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
    /**
     * Draws a single player on the board.
     * @param player
     * @param currentStep If the player is moving, represents the relevant frame in the sprite.
     */
    drawPlayer(player, currentStep, position) {
        this.context.drawImage(player.htmlImage, (player.htmlImage.width / 4) * (currentStep % 4), 0, 32, 32, position.x, position.y, player.htmlImage.width / 4, player.htmlImage.height);
    }
    /**
     * Clears the board rectangle hosting the player
     * @param player
     */
    clearRectangle(player, position) {
        let dimension = {
            width: player.htmlImage.width / 4,
            height: player.htmlImage.height,
        };
        this.context.clearRect(position.x, position.y, dimension.width, dimension.height);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlbmRlcmVycy9wbGF5ZXItcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxjQUFjLENBQUM7QUFFOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBbUIsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHdEUsTUFBTSxPQUFPLGNBQWUsU0FBUSxXQUFXO0lBWTdDLFlBQW9CLE9BQWlDO1FBQ25ELEtBQUssRUFBRSxDQUFDO1FBRFUsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFSN0MsZ0JBQVcsR0FBYSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBVTdDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFFcEMsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUU3Qiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO0lBQ3BELENBQUM7SUFFTyxhQUFhLENBQUMsTUFBYyxFQUFFLFlBQW9CLENBQUM7UUFDekQsSUFBSSxXQUFXLEdBQXNCO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQzNCLENBQUM7UUFFRixJQUFJLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFNUQsSUFBSSxDQUFDLElB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