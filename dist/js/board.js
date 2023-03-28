import { PlayerRenderer } from "./renderers/player-renderer.js";
import { CardRenderer } from "./renderers/card-renderer.js";
import { PlayerEvent } from "./events.js";
import { CoordinatesTransformer, Position } from "./coords.js";
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
            console.log(pEvent.detail.player.name);
            // TODO: decide what happens on player click
            /**
             * Specifically, must set a relationship between a click and a StateInput.
             */
        });
    }
    getNext(entity, input) {
        let currentState = entity.currentState;
        let allowed = this.transitions.find((t) => {
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
            if (p.isWaiting) {
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
            if (!player.isMoving && !player.isMoved) {
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
    /**
     * Find a player by its position or point values.
     * @param point
     * @returns
     */
    findPlayer(coordinates) {
        if (!this.team) {
            throw new Error("Team can't be null");
        }
        for (let i = 0; i < this.team.players.length; i++) {
            let width = this.team.players[i].htmlImage.width / 4;
            let height = this.team.players[i].htmlImage.height;
            if (coordinates instanceof Position) {
                let playerPosition = this.coordinatesTransformer.toPosition(this.team.players[i].point);
                if (playerPosition.x < coordinates.x &&
                    playerPosition.x + width > coordinates.x &&
                    playerPosition.y < coordinates.y &&
                    playerPosition.y + height > coordinates.y) {
                    return this.team.players[i];
                }
            }
            else {
                let playerPoint = this.team.players[i].point;
                if (playerPoint.x === coordinates.x &&
                    playerPoint.y === playerPoint.y) {
                    return this.team.players[i];
                }
            }
        }
        return null;
    }
    // REVIEW
    updateMaximumMovement(player) {
        this.drawMaximumMovement(player);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFxQixNQUFNLGFBQWEsQ0FBQztBQUU3RCxPQUFPLEVBQWUsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzVFLE9BQU8sRUFJTCxlQUFlLEVBQ2YsZUFBZSxFQUNmLGdCQUFnQixHQUNqQixNQUFNLG1CQUFtQixDQUFDO0FBSTNCLE1BQU0sT0FBTyxLQUNYLFNBQVEsV0FBVztJQXdCbkI7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQVJWLDJCQUFzQixHQUEyQixJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFVNUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsQ0FBQztRQUMxRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDeEMsYUFBYSxDQUNRLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQzFDLFNBQVMsQ0FDWSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDM0QsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUMzQyxVQUFVLENB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