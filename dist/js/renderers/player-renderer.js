import { PlayerEvent } from "../events.js";
import { SETTINGS } from "../settings.js";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyLXJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlbmRlcmVycy9wbGF5ZXItcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxjQUFjLENBQUM7QUFFOUQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRzFDLE1BQU0sT0FBTyxjQUFlLFNBQVEsV0FBVztJQVk3QyxZQUFvQixPQUFpQztRQUNuRCxLQUFLLEVBQUUsQ0FBQztRQURVLFlBQU8sR0FBUCxPQUFPLENBQTBCO1FBUjdDLGdCQUFXLEdBQWEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQVU3QyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1FBRXBDLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFFN0IsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztJQUNwRCxDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQWMsRUFBRSxZQUFvQixDQUFDO1FBQ3pELElBQUksV0FBVyxHQUFzQjtZQUNuQyxNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVztTQUMzQixDQUFDO1FBRUYsSUFBSSxLQUFLLEdBQUcscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVELElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDakMsSUFBSSxDQUFDLHVCQUF1QixH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