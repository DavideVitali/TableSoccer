import { PlayerRenderer } from "./renderers/player-renderer.js";
import { CardRenderer } from "./renderers/card-renderer.js";
import { PlayerEvent } from "./events.js";
import { CoordinatesTransformer } from "./coords.js";
import { PlayerInputEnum, PlayerStateEnum, PlayerTransition, } from "./statemachine.js";
export class Board extends EventTarget {
    constructor() {
        super();
        this.coordinatesTransformer = new CoordinatesTransformer();
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
        /**
         *    ------------- PLAYER RENDERER ------------------------
         */
        this.playerRenderer = new PlayerRenderer(this.playersContext);
        this.leftCardRenderer = new CardRenderer(this.leftUserContext);
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
            console.log("Event handler...");
            let pEvent = e;
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
        // ------- TRANSITIONS -----------
        this.transitions = [
            [
                new PlayerTransition(PlayerStateEnum.IDLE, PlayerInputEnum.SELECT),
                PlayerStateEnum.WAITING,
            ],
            [
                new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.DESELECT),
                PlayerStateEnum.IDLE,
            ],
            [
                new PlayerTransition(PlayerStateEnum.WAITING, PlayerInputEnum.MOVE),
                PlayerStateEnum.MOVING,
            ],
            [
                new PlayerTransition(PlayerStateEnum.MOVING, PlayerInputEnum.STOP),
                PlayerStateEnum.MOVED,
            ],
            [
                new PlayerTransition(PlayerStateEnum.MOVED, PlayerInputEnum.SELECT),
                PlayerStateEnum.SELECTED,
            ],
            [
                new PlayerTransition(PlayerStateEnum.SELECTED, PlayerInputEnum.DESELECT),
                PlayerStateEnum.MOVED,
            ],
        ];
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
    getNext(entity, input) {
        let currentState = entity.currentState;
        let allowed = this.transitions.find(t => {
            t[0].state === currentState && t[0].input === input;
        });
        if (!allowed) {
            throw new Error(`Input ${input} is not allowed for ${currentState} state in player ${entity.name}.`);
        }
        return allowed[1];
    }
    update(entity, input) {
        entity.currentState = this.getNext(entity, input);
    }
    init(team) {
        this.team = team;
        // players initialization
        this.team.players.forEach((p) => {
            p.loadImage.then((img) => {
                p.htmlImage = img;
                p.htmlImage.setAttribute("id", p.name);
                this.drawPlayer(p, 0);
            });
        });
    }
    // TODO: All drawing methods must use the renderer!
    clearCanvas(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    // TO BE DEPRECATED BY STATE MACHINE IMPLEMENTATION
    switchSelected(player) {
        if (!this.team) {
            throw new Error("Team not initialized.");
        }
        let selectedPlayers = this.team.players.filter((p) => p.selected === true && p.name !== player.name);
        if (selectedPlayers && selectedPlayers.length > 0) {
            selectedPlayers.forEach((sp) => sp.deselect());
        }
    }
    /**
     * Draws the entire team on the board
     */
    drawTeam() {
        if (!this.team) {
            throw new Error("Team not initialized.");
        }
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
        this.leftCardRenderer.drawCard(card, player);
    }
    /**
     * Finds the player in a waiting state
     */
    findWaitingPlayer() {
        if (!this.team) {
            throw new Error("Team not initialized.");
        }
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
        this.playerRenderer.clearRectangle(player, position);
    }
    /**
     * Draws a single player on the board.
     * @param player
     * @param currentStep If the player is moving, represents the relevant frame in the sprite.
     */
    drawPlayer(player, currentStep) {
        let position = this.coordinatesTransformer.toPosition(player.point);
        this.playerRenderer.drawPlayer(player, currentStep, position);
    }
    /**
     * Draws the availability triangle for every available player
     */
    drawAvailabilityCursors() {
        if (!this.team) {
            throw new Error("Team not initialized.");
        }
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
        if (!this.team) {
            throw new Error("Team not initialized.");
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFxQixNQUFNLGFBQWEsQ0FBQztBQUU3RCxPQUFPLEVBQWUsc0JBQXNCLEVBQVksTUFBTSxhQUFhLENBQUM7QUFHNUUsT0FBTyxFQUlMLGVBQWUsRUFDZixlQUFlLEVBQ2YsZ0JBQWdCLEdBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFJM0IsTUFBTSxPQUFPLEtBQ1gsU0FBUSxXQUFXO0lBd0JuQjtRQUNFLEtBQUssRUFBRSxDQUFDO1FBUlYsMkJBQXNCLEdBQTJCLElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQVU1RSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QixDQUFDO1FBQzFFLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUN4QyxhQUFhLENBQ1EsQ0FBQztRQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDMUMsU0FBUyxDQUNZLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQzNDLFVBQVUsQ0FDVyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUM1QyxXQUFXLENBQ1UsQ0FBQztRQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDL0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUVsQzs7V0FFRztRQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFL0Qsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQztRQUMxRSxRQUFRLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7UUFDcEQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUUzQixNQUFNLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxHQUFHLEdBQUcsYUFBYSxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDdEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ2hDLElBQUksTUFBTSxHQUFHLENBQWdCLENBQUM7WUFDOUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxNQUFNLEdBQUcsQ0FBZ0IsQ0FBQztZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM3QyxJQUFJLE1BQU0sR0FBRyxDQUFnQixDQUFDO1lBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRSxDQUFDLENBQUMsQ0FBQztRQUVILGtDQUFrQztRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHO1lBQ2pCO2dCQUNFLElBQUksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDO2dCQUNsRSxlQUFlLENBQUMsT0FBTzthQUN4QjtZQUNEO2dCQUNFLElBQUksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDO2dCQUN2RSxlQUFlLENBQUMsSUFBSTthQUNyQjtZQUNEO2dCQUNFLElBQUksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUNuRSxlQUFlLENBQUMsTUFBTTthQUN2QjtZQUNEO2dCQUNFLElBQUksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUNsRSxlQUFlLENBQUMsS0FBSzthQUN0QjtZQUNEO2dCQUNFLElBQUksZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsTUFBTSxDQUFDO2dCQUNuRSxlQUFlLENBQUMsUUFBUTthQUN6QjtZQUNEO2dCQUNFLElBQUksZ0JBQWdCLENBQ2xCLGVBQWUsQ0FBQyxRQUFRLEVBQ3hCLGVBQWUsQ0FBQyxRQUFRLENBQ3pCO2dCQUNELGVBQWUsQ0FBQyxLQUFLO2FBQ3RCO1NBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUN6QyxJQUFJLE1BQU0sR0FBRyxDQUFnQixDQUFDO1lBQzlCLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRXpDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25DLElBQUksYUFBYSxDQUFDLFFBQVEsSUFBSSxhQUFhLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0wscUJBQXFCO2FBQ3RCO1lBRUQsSUFBSSxRQUFRLENBQUMsa0JBQWtCLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEQsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FDN0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUMxQyxDQUFDO2dCQUNGLFFBQVEsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUM1QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQ3RDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQzFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxhQUFhLENBQUMsQ0FDMUMsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsT0FBTyxDQUFDLE1BQWMsRUFBRSxLQUFzQjtRQUM1QyxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBRXZDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFBO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLHVCQUF1QixZQUFZLG9CQUFvQixNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztTQUN0RztRQUVELE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBYyxFQUFFLEtBQXNCO1FBQzNDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFVO1FBQ3BCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUM5QixDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2QixDQUFDLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxtREFBbUQ7SUFFNUMsV0FBVyxDQUNoQixPQUFpQyxFQUNqQyxNQUF5QjtRQUV6QixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELG1EQUFtRDtJQUM1QyxjQUFjLENBQUMsTUFBYztRQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUMxQztRQUVELElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUFDLElBQUksQ0FDckQsQ0FBQztRQUNGLElBQUksZUFBZSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGNBQWMsQ0FBQyxJQUFVLEVBQUUsTUFBYztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxpQkFBaUI7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLENBQUM7YUFDVjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDbEU7UUFFRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksb0JBQW9CLENBQUMsTUFBYztRQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxVQUFVLENBQUMsTUFBYyxFQUFFLFdBQW1CO1FBQ25ELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXBFLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksdUJBQXVCO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM1QixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUMvQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RDLElBQUksYUFBYSxHQUFHO29CQUNsQixDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDOUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztpQkFDaEMsQ0FBQztnQkFFZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUM1QixHQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDMUIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNoQixHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDdEQsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNoQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDWjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG1CQUFtQixDQUFDLE1BQWM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxNQUFNLEdBQUc7WUFDWCxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQztZQUM5QyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO1NBQzVDLENBQUM7UUFDRixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsR0FBRyxDQUFDLFNBQVMsR0FBRywyQkFBMkIsQ0FBQztRQUM1QyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDYixDQUFDO0lBRU0sb0JBQW9CLEtBQUksQ0FBQztJQUVoQzs7T0FFRztJQUNJLGtCQUFrQjtRQUN2QixJQUFJLFFBQVEsQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUMvQjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVELG1CQUFtQjtJQUNaLGlCQUFpQjtRQUN0QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBRTNDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO0lBQ1osbUJBQW1CO1FBQ3hCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFFLENBQUM7UUFFM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxxQkFBcUIsQ0FBQyxNQUFjO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQy9ELElBQUksU0FBUyxHQUFHO29CQUNkLEtBQUssRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDO29CQUM1QixNQUFNLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNO2lCQUNkLENBQUM7Z0JBRWYscUJBQXFCO2dCQUNyQixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDOUIsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7Z0JBQy9CLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO2dCQUM5QixJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztnQkFFL0IsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsSUFBSSxlQUFlLEdBQUcsSUFBSSxXQUFXLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3ZELE1BQU0sRUFBRSxDQUFDO3dCQUNULFFBQVEsRUFBRSxDQUFDO3FCQUNTLENBQUMsQ0FBQztvQkFDeEIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztpQkFDbEM7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFNBQVM7SUFDRixxQkFBcUIsQ0FBQyxNQUFjO1FBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0YifQ==