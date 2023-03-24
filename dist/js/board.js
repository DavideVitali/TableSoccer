import { PlayerEvent } from "./events.js";
import { CoordinatesTransformer, } from "./coords.js";
export class Board extends EventTarget {
    constructor(team, playerRenderer) {
        super();
        this.team = team;
        this.playerRenderer = playerRenderer;
        this.fieldCanvas = document.getElementById("Field");
        this.fieldContext = this.fieldCanvas.getContext("2d");
        this.mouseCanvas = document.getElementById("MouseEvents");
        this.mouseContext = this.mouseCanvas.getContext("2d");
        this.playersCanvas = document.getElementById("Players");
        this.playersContext = this.playersCanvas.getContext("2d");
        this.leftUserCanvas = document.getElementById("LeftUser");
        this.leftUserContext = this.leftUserCanvas.getContext("2d");
        this.rightUserCanvas = document.getElementById("RightUser");
        this.rightUserContext = this.rightUserCanvas.getContext("2d");
        this.pointerLockStartPoint = null;
        // players initialization
        team.players.forEach((p) => {
            p.loadImage.then((img) => {
                p.htmlImage = img;
                p.htmlImage.setAttribute("id", p.name);
                this.drawPlayer(p, 0);
            });
        });
        // sets the coordinates transformer
        let fieldDimension = {
            width: this.fieldCanvas.width,
            height: this.fieldCanvas.height,
        };
        this.coordinatesTransformer = new CoordinatesTransformer(fieldDimension);
        // pointerLock API setup
        this.mouseCanvas.requestPointerLock = this.mouseCanvas.requestPointerLock;
        document.exitPointerLock = document.exitPointerLock;
        document.addEventListener("pointerlockchange", this.setMaximumMovement);
        this.pointerLockStartPoint;
        const fieldImage = new Image();
        fieldImage.src = "img/map.png";
        fieldImage.onload = () => {
            this.fieldContext.drawImage(fieldImage, 0, 0);
        };
        this.addEventListener("requestedplayerrectclear", (e) => {
            let pEvent = e;
            let pDimensions = {
                width: pEvent.detail.player.htmlImage.width / 4,
                height: pEvent.detail.player.htmlImage.height,
            };
            this.clearPlayerRectangle(pEvent.detail.player);
        });
        this.addEventListener("playermoved", (e) => {
            let pEvent = e;
            this.drawPlayer(pEvent.detail.player, pEvent.detail.movement);
        });
        this.addEventListener("playercollision", (e) => {
            let pEvent = e;
            this.drawPlayer(pEvent.detail.player, pEvent.detail.movement);
        });
        this.addEventListener("playerclick", (e) => {
            let pEvent = e;
            let clickedPlayer = pEvent.detail.player;
            this.clearCanvas(this.mouseContext, this.mouseCanvas);
            this.clearCanvas(this.leftUserContext, this.leftUserCanvas);
            this.drawAvailabilityCursors();
            this.switchSelected(clickedPlayer);
            if (clickedPlayer.selected && clickedPlayer.selected === true) {
                this.drawPlayerCard(leftUserCard, clickedPlayer);
            }
            else {
                // what happens here?
            }
            if (document.pointerLockElement === this.mouseCanvas) {
                document.removeEventListener("mousemove", () => this.updateMaximumMovement(clickedPlayer));
                document.exitPointerLock();
            }
            else {
                this.mouseCanvas.requestPointerLock();
                document.addEventListener("mousemove", () => this.updateMaximumMovement(clickedPlayer));
            }
        });
    }
    // TODO: All drawing methods must use the renderer!
    clearCanvas(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    // TO BE DEPRECATED BY STATE MACHINE IMPLEMENTATION
    switchSelected(player) {
        let selectedPlayers = this.team.players.filter((p) => p.selected === true && p.name !== player.name);
        if (selectedPlayers && selectedPlayers.length > 0) {
            selectedPlayers.forEach((sp) => sp.deselect());
        }
    }
    /**
     * Draws the entire team on the board
     */
    drawTeam() {
        this.team.players.forEach((p) => {
            this.drawPlayer(p, 0);
        });
    }
    /**
     * Draws a player's card on the sidebar
     * @param card
     * @param player
     */
    drawPlayerCard(card, player) {
        let ctx = this.leftUserContext;
        ctx.font = "12px fff";
        if (card.template) {
            ctx.drawImage(card.template, card.position.x, card.position.y);
        }
        else {
            throw new Error("Card template not loaded!");
        }
        const nameWidth = ctx.measureText(player.name).width;
        ctx.fillText(player.name, (card.template.width - nameWidth) / 2 + card.position.x, 202 + card.position.y);
    }
    /**
     * Finds the player in a waiting state
     */
    findWaitingPlayer() {
        let result = this.team.players.filter((p) => {
            if (p.waiting) {
                return p;
            }
        });
        if (result.length === 0) {
            return null;
        }
        if (result.length > 1) {
            throw new Error(`There are too many players in 'waiting' state`);
        }
        return result[0];
    }
    /**
     * Clears the board rectangle hosting the player
     * @param player
     */
    clearPlayerRectangle(player) {
        let position = this.coordinatesTransformer.toPosition(player.point);
        let dimension = {
            width: player.htmlImage.width / 4,
            height: player.htmlImage.height,
        };
        this.playersContext.clearRect(position.x, position.y, dimension.width, dimension.height);
    }
    /**
     * Draws a single player on the board.
     * @param player
     * @param currentStep If the player is moving, represents the relevant frame in the sprite.
     */
    drawPlayer(player, currentStep) {
        let position = this.coordinatesTransformer.toPosition({
            x: player.point.x,
            y: player.point.y,
        });
        this.playersContext.drawImage(player.htmlImage, (player.htmlImage.width / 4) * (currentStep % 4), 0, 32, 32, position.x, position.y, player.htmlImage.width / 4, player.htmlImage.height);
    }
    /**
     * Draws the availability triangle for every available player
     */
    drawAvailabilityCursors() {
        let ctx = this.mouseContext;
        ctx.clearRect(0, 0, this.mouseCanvas.width, this.mouseCanvas.height);
        this.team.players.map((player) => {
            let position = this.coordinatesTransformer.toPosition(player.point);
            if (!player.moving && !player.moveDone) {
                let startPosition = {
                    x: position.x + player.htmlImage.width / 4 / 2,
                    y: position.y + player.htmlImage.height + 4,
                };
                let ctx = this.mouseContext;
                ctx.fillStyle = "#ffff00";
                ctx.beginPath();
                ctx.moveTo(startPosition.x, startPosition.y);
                ctx.lineTo(startPosition.x - 6, startPosition.y + 12);
                ctx.lineTo(startPosition.x + 6, startPosition.y + 12);
                ctx.closePath();
                ctx.fill();
            }
        });
    }
    /**
     * Draws the maximum movement radius of a player
     * @param player
     */
    drawMaximumMovement(player) {
        let position = this.coordinatesTransformer.toPosition(player.point);
        let r = 5;
        let center = {
            x: position.x + player.htmlImage.width / 4 / 2,
            y: position.y + player.htmlImage.height + 4,
        };
        let ctx = this.mouseContext;
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.fill();
    }
    clearMaximumMovement() { }
    /**
     * POINTER LOCK MUST BE REVIEWED, LAST TIME DIDN'T WORK AS EXPECTED
     */
    setMaximumMovement() {
        if (document.pointerLockElement === this.mouseCanvas) {
            console.log("pointer locked");
        }
        else {
            console.log("pointer unlocked");
        }
    }
    // WHAT'S ITS JOB?!
    setMovementCursor() {
        let body = document.querySelector("body");
        if (!body.classList.contains("selected-player")) {
            body.classList.add("selected-player");
        }
        else {
            body.classList.remove("selected-player");
        }
    }
    // WHAT'S ITS JOB?!
    clearMovementCursor() {
        let body = document.querySelector("body");
        if (body.classList.contains("selected-player")) {
            body.classList.remove("selected-player");
        }
    }
    /**
     * Find and dispatch whether a player's sprite is moving through another player's sprite
     */
    checkPlayerCollisions(player) {
        this.team.players.map((e) => {
            if (e.htmlImage.id !== player.htmlImage.id) {
                let position = this.coordinatesTransformer.toPosition(e.point);
                let dimension = {
                    width: e.htmlImage.width / 4,
                    height: e.htmlImage.height,
                };
                // sprites boundaries
                let cL = position.x;
                let cR = cL + dimension.width;
                let cT = position.y;
                let cB = cT + dimension.height;
                let eL = position.x;
                let eR = eL + dimension.width;
                let eT = position.y;
                let eB = eT + dimension.height;
                if (cL < eR && cR > eL && cT < eB && cB > eT) {
                    this.drawPlayer(e, 0);
                    let playerCollision = new PlayerEvent("playercollision", {
                        player: e,
                        movement: 0,
                    });
                    e.dispatchEvent(playerCollision);
                }
            }
        });
    }
    // REVIEW
    updateMaximumMovement(player) {
        this.drawMaximumMovement(player);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLFdBQVcsRUFBcUIsTUFBTSxhQUFhLENBQUM7QUFFN0QsT0FBTyxFQUVMLHNCQUFzQixHQUd2QixNQUFNLGFBQWEsQ0FBQztBQUlyQixNQUFNLE9BQU8sS0FBTSxTQUFRLFdBQVc7SUFpQnBDLFlBQW1CLElBQVUsRUFBRSxjQUE4QjtRQUMzRCxLQUFLLEVBQUUsQ0FBQztRQURTLFNBQUksR0FBSixJQUFJLENBQU07UUFFM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7UUFFckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsQ0FBQztRQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDeEMsYUFBYSxDQUNRLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQzFDLFNBQVMsQ0FDWSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUMzQyxVQUFVLENBQ1csQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDNUMsV0FBVyxDQUNVLENBQUM7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQy9ELElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFFbEMseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdkIsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxtQ0FBbUM7UUFDbkMsSUFBSSxjQUFjLEdBQWM7WUFDOUIsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSztZQUM3QixNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1NBQ2hDLENBQUM7UUFDRixJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV6RSx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDO1FBQzFFLFFBQVEsQ0FBQyxlQUFlLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQztRQUNwRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBRTNCLE1BQU0sVUFBVSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDL0IsVUFBVSxDQUFDLEdBQUcsR0FBRyxhQUFhLENBQUM7UUFDL0IsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN0RCxJQUFJLE1BQU0sR0FBRyxDQUFnQixDQUFDO1lBQzlCLElBQUksV0FBVyxHQUFHO2dCQUNoQixLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDO2dCQUMvQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07YUFDakMsQ0FBQztZQUVmLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksTUFBTSxHQUFHLENBQWdCLENBQUM7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxNQUFNLEdBQUcsQ0FBZ0IsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxNQUFNLEdBQUcsQ0FBZ0IsQ0FBQztZQUM5QixJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUV6QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNuQyxJQUFJLGFBQWEsQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQzdELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ2xEO2lCQUFNO2dCQUNMLHFCQUFxQjthQUN0QjtZQUVELElBQUksUUFBUSxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BELFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQzdDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FDMUMsQ0FBQztnQkFDRixRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDNUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUN0QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUMxQyxJQUFJLENBQUMscUJBQXFCLENBQUMsYUFBYSxDQUFDLENBQzFDLENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1EQUFtRDtJQUU1QyxXQUFXLENBQ2hCLE9BQWlDLEVBQ2pDLE1BQXlCO1FBRXpCLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsbURBQW1EO0lBQzVDLGNBQWMsQ0FBQyxNQUFjO1FBQ2xDLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksQ0FDckQsQ0FBQztRQUNGLElBQUksZUFBZSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxjQUFjLENBQUMsSUFBVSxFQUFFLE1BQWM7UUFDOUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUMvQixHQUFHLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEU7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUM5QztRQUNELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNyRCxHQUFHLENBQUMsUUFBUSxDQUNWLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQ3ZELEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FDdEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLGlCQUFpQjtRQUN0QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLENBQUM7YUFDVjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDbEU7UUFFRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksb0JBQW9CLENBQUMsTUFBYztRQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLFNBQVMsR0FBRztZQUNkLEtBQUssRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDO1lBQ2pDLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU07U0FDbkIsQ0FBQztRQUVmLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUMzQixRQUFRLENBQUMsQ0FBQyxFQUNWLFFBQVEsQ0FBQyxDQUFDLEVBQ1YsU0FBUyxDQUFDLEtBQUssRUFDZixTQUFTLENBQUMsTUFBTSxDQUNqQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxVQUFVLENBQUMsTUFBYyxFQUFFLFdBQW1CO1FBQ25ELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUM7WUFDcEQsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqQixDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUMzQixNQUFNLENBQUMsU0FBUyxFQUNoQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUNoRCxDQUFDLEVBQ0QsRUFBRSxFQUNGLEVBQUUsRUFDRixRQUFRLENBQUMsQ0FBQyxFQUNWLFFBQVEsQ0FBQyxDQUFDLEVBQ1YsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUMxQixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDeEIsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLHVCQUF1QjtRQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQy9CLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtnQkFDdEMsSUFBSSxhQUFhLEdBQUc7b0JBQ2xCLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO29CQUM5QyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO2lCQUNoQyxDQUFDO2dCQUVkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQzVCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2dCQUMxQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDdEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2dCQUN0RCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNaO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbUJBQW1CLENBQUMsTUFBYztRQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDVixJQUFJLE1BQU0sR0FBRztZQUNYLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDO1lBQzlDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUM7U0FDNUMsQ0FBQztRQUNGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDNUIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQyxHQUFHLENBQUMsU0FBUyxHQUFHLDJCQUEyQixDQUFDO1FBQzVDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFFTSxvQkFBb0IsS0FBSSxDQUFDO0lBRWhDOztPQUVHO0lBQ0ksa0JBQWtCO1FBQ3ZCLElBQUksUUFBUSxDQUFDLGtCQUFrQixLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO0lBQ1osaUJBQWlCO1FBQ3RCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7UUFFM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRCxtQkFBbUI7SUFDWixtQkFBbUI7UUFDeEIsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUUzQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLHFCQUFxQixDQUFDLE1BQWM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9ELElBQUksU0FBUyxHQUFHO29CQUNkLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDO29CQUM1QixNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNO2lCQUNkLENBQUM7Z0JBRWYscUJBQXFCO2dCQUNyQixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUM5QixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFFL0IsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3ZELE1BQU0sRUFBRSxDQUFDO3dCQUNULFFBQVEsRUFBRSxDQUFDO3FCQUNTLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFNBQVM7SUFDRixxQkFBcUIsQ0FBQyxNQUFjO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0YifQ==