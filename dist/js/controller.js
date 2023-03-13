export class Controller extends EventTarget {
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
        let rafId = requestAnimationFrame(this.animateSprite);
        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        /* the animation is flagged to be canceled when the player reaches the target position */
        if (this.targetCoordinates) {
            let proximityX = Math.floor(Math.abs(this.targetCoordinates.x - this.player.position.x));
            let proximityY = Math.floor(Math.abs(this.targetCoordinates.y - this.player.position.y));
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
            board.clearPlayerRect(this.player, this.player.position, this.player.htmlImage.width / 4, this.player.htmlImage.height);
            /* because collisions cause the collided players to be redrawn, moving players are drawn after
                  the redrawing of the collided ones, giving the impression they move "over" instead of "under" */
            board.checkPlayerCollisions(this.player);
            this.player.position.x += this.targetDelta.x;
            this.player.position.y += this.targetDelta.y;
            //board.drawMoveCursors();
            this.frameNumber++;
            board.drawPlayer(this.player, this.player.position, this.frameNumber);
            let playerMovedEvent = new CustomEvent("playermoved", {
                detail: {
                    player: this.player,
                    position: {
                        x: this.player.position.x,
                        y: this.player.position.y,
                    },
                },
            });
            this.player.dispatchEvent(playerMovedEvent);
            if (cancelAnimationTriggered === true) {
                let playerStoppedEvent = new CustomEvent("playerstopped", {
                    detail: {
                        player: this.player,
                    },
                });
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
            let dx = this.targetCoordinates.x - this.player.position.x;
            let dy = this.targetCoordinates.y - this.player.position.y;
            let stepToDistance = Math.ceil(Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) / this.playerStepLength);
            this.targetDelta.x = dx / stepToDistance;
            this.targetDelta.y = dy / stepToDistance;
        }
        else {
            throw new Error("No target coordinates set!");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sT0FBTyxVQUFXLFNBQVEsV0FBVztJQVl6QyxZQUFtQixNQUFjLEVBQVMsUUFBZTtRQUN2RCxLQUFLLEVBQUUsQ0FBQztRQURTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFPO1FBUmpELGdCQUFXLEdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQVUxQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO1FBRXBDLDJEQUEyRDtRQUMzRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyx5QkFBeUIsR0FBRztnQkFDL0IsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFDakMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDO2FBQy9CLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILDJCQUEyQjtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLHVCQUF1QixDQUFDO1FBRTdCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFTyxhQUFhLENBQUMsWUFBb0IsQ0FBQztRQUN6QyxJQUFJLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUNqQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsU0FBUyxDQUFDO1NBQzFDO1FBRUQseUZBQXlGO1FBQ3pGLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDNUQsQ0FBQztZQUNGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDNUQsQ0FBQztZQUNGLElBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDeEI7U0FDRjtRQUVELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUM7UUFFNUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQyxJQUFJLHdCQUF3QixHQUFHLEtBQUssQ0FBQztZQUVyQyxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsc0JBQXNCLElBQUksSUFBSSxFQUFFO2dCQUNwRSxNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLHdCQUF3QixHQUFHLElBQUksQ0FBQzthQUNqQztZQUVELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFFMUMsS0FBSyxDQUFDLGVBQWUsQ0FDbkIsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsRUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUM3QixDQUFDO1lBRUY7a0hBQ3NHO1lBQ3RHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QywwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEUsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3BELE1BQU0sRUFBRTtvQkFDTixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07b0JBQ25CLFFBQVEsRUFBRTt3QkFDUixDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDekIsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQzFCO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU1QyxJQUFJLHdCQUF3QixLQUFLLElBQUksRUFBRTtnQkFDckMsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLFdBQVcsQ0FBQyxlQUFlLEVBQUU7b0JBQ3hELE1BQU0sRUFBRTt3QkFDTixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07cUJBQ3BCO2lCQUNGLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2FBQy9DO1NBQ0Y7SUFDSCxDQUFDO0lBRU0sZUFBZTtRQUNwQixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxjQUFjO1FBQ25CLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM1QixDQUFDO0lBRU0sb0JBQW9CLENBQUMsTUFBYTtRQUN2QyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7U0FDdEQ7UUFFRCx3REFBd0Q7UUFDeEQsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQ3JFLENBQUM7WUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsY0FBYyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxjQUFjLENBQUM7U0FDMUM7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7Q0FDRiJ9