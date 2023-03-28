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
        console.log(typeof coordinates);
        console.log(coordinates instanceof Position);
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