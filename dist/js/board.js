import { Controller } from "./controller.js";
import { PlayerEvent } from "./events.js";
export class Board extends EventTarget {
    constructor(team) {
        super();
        this.fieldCanvas = document.getElementById('Field');
        this.fieldContext = this.fieldCanvas.getContext('2d');
        this.mouseCanvas = document.getElementById('MouseEvents');
        this.mouseContext = this.mouseCanvas.getContext('2d');
        this.playersCanvas = document.getElementById('Players');
        this.playersContext = this.playersCanvas.getContext('2d');
        this.leftUserCanvas = document.getElementById('LeftUser');
        this.leftUserContext = this.leftUserCanvas.getContext('2d');
        this.rightUserCanvas = document.getElementById('RightUser');
        this.rightUserContext = this.rightUserCanvas.getContext('2d');
        this.pointerLockStartPoint = null;
        // pointerLock API setup
        this.mouseCanvas.requestPointerLock = this.mouseCanvas.requestPointerLock;
        document.exitPointerLock = document.exitPointerLock;
        document.addEventListener('pointerlockchange', this.setMaximumMovement);
        this.pointerLockStartPoint;
        const fieldImage = new Image();
        fieldImage.src = "img/map.png";
        fieldImage.onload = () => {
            this.fieldContext.drawImage(fieldImage, 0, 0);
        };
        this.controllers = [];
        for (let i = 0; i < 11; i++) {
            // la formazione va trasformata in posizione effettiva
            team.elements[i].position = this.formationToBoardCoordinates(team.elements[i].position);
            this.controllers.push(new Controller(team.elements[i].player, team.elements[i].position));
        }
        this.addEventListener('playercollision', (e) => {
            let pEvent = e;
            this.drawPlayer(pEvent.player, pEvent.player.position, 0);
        });
        this.addEventListener('playerclick', (e) => {
            let pEvent = e;
            let clickedPlayer = pEvent.player;
            this.clearCanvas(this.mouseContext, this.mouseCanvas);
            this.clearCanvas(this.leftUserContext, this.leftUserCanvas);
            this.drawMoveCursors();
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
    clearCanvas(context, canvas) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    switchSelected(player) {
        let selectedPlayers = this.controllers.filter(c => c.player.selected === true && c.player.name !== player.name);
        if (selectedPlayers && selectedPlayers.length > 0) {
            selectedPlayers.forEach(c => c.player.deselect());
        }
    }
    drawTeam(teamElements) {
        teamElements.forEach(e => {
            this.drawPlayer(e.player, e.position, 0);
        });
    }
    drawPlayerCard(card, player) {
        let ctx = this.leftUserContext;
        ctx.font = "12px fff";
        if (card.template) {
            ctx.drawImage(card.template, card.position.x, card.position.y);
        }
        else {
            throw new Error('Card template not loaded!');
        }
        const nameWidth = ctx.measureText(player.name).width;
        ctx.fillText(player.name, ((card.template.width - nameWidth) / 2) + card.position.x, (202 + card.position.y));
    }
    findWaitingPlayer() {
        let result = [];
        result = this.controllers.map(element => {
            if (element.player.waiting === true) {
                result.push(element.player);
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
    formationToBoardCoordinates(position) {
        return {
            x: Math.round(position.x * this.playersCanvas.width / 100),
            y: Math.round(position.y * this.playersCanvas.height / 100)
        };
    }
    boardCoordinatesToFormation(position) {
        return {
            x: Math.round(this.playersCanvas.width * 100 / position.x),
            y: Math.round(this.playersCanvas.height * 100 / position.y)
        };
    }
    clearPlayerRect(player, position, width, height) {
        this.playersContext.clearRect(position.x, position.y, width, height);
    }
    drawPlayer(player, position, currentStep) {
        const current = {
            image: player.htmlImage,
            position: position
        };
        this.playersContext.drawImage(current.image, (current.image.width / 4) * (currentStep % 4), 0, 32, 32, current.position.x, current.position.y, current.image.width / 4, current.image.height);
    }
    // disegna il triangolino che segnala la disponibilità a fare un movimento
    drawMoveCursors() {
        let ctx = this.mouseContext;
        ctx.clearRect(0, 0, this.mouseCanvas.width, this.mouseCanvas.height);
        this.controllers.map(e => {
            if (e.player.moving !== true && e.player.moveDone !== true) {
                let startpoint = {
                    x: e.player.position.x + e.player.htmlImage.width / 4 / 2,
                    y: e.player.position.y + e.player.htmlImage.height + 4
                };
                let ctx = this.mouseContext;
                ctx.fillStyle = '#ffff00';
                ctx.beginPath();
                ctx.moveTo(startpoint.x, startpoint.y);
                ctx.lineTo(startpoint.x - 6, startpoint.y + 12);
                ctx.lineTo(startpoint.x + 6, startpoint.y + 12);
                ctx.closePath();
                ctx.fill();
            }
        });
    }
    // disegna il cerchio di massimo movimento di un giocatore
    drawMaximumMovement(player) {
        let r = 5;
        let center = {
            x: player.position.x + player.htmlImage.width / 4 / 2,
            y: player.position.y + player.htmlImage.height + 4
        };
        let ctx = this.mouseContext;
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
    }
    clearMaximumMovement() {
    }
    setMaximumMovement() {
        if (document.pointerLockElement === this.mouseCanvas) {
            console.log('pointer locked');
        }
        else {
            console.log('pointer unlocked');
        }
    }
    setMovementCursor() {
        let body = document.querySelector('body');
        if (!body.classList.contains('selected-player')) {
            body.classList.add('selected-player');
        }
        else {
            body.classList.remove('selected-player');
        }
    }
    clearMovementCursor() {
        let body = document.querySelector('body');
        if (body.classList.contains('selected-player')) {
            body.classList.remove('selected-player');
        }
    }
    /**
     * Find and dispatch whether a player's sprite is moving through another player's sprite
     */
    checkPlayerCollisions(player) {
        this.controllers.map(e => {
            if (e.player.htmlImage.id !== player.htmlImage.id) {
                let width = e.player.htmlImage.width / 4;
                let height = e.player.htmlImage.height;
                // sprites boundaries
                let cL = player.position.x;
                let cR = cL + width;
                let cT = player.position.y;
                let cB = cT + height;
                let eL = e.player.position.x;
                let eR = eL + width;
                let eT = e.player.position.y;
                let eB = eT + height;
                if (cL < eR && cR > eL && cT < eB && cB > eT) {
                    this.drawPlayer(e.player, e.player.position, 0);
                    let playerCollision = new PlayerEvent('playercollision', e.player);
                    e.player.dispatchEvent(playerCollision);
                }
            }
        });
    }
    updateMaximumMovement(player) {
        this.drawMaximumMovement(player);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFNMUMsTUFBTSxPQUFPLEtBQU0sU0FBUSxXQUFXO0lBZWxDLFlBQVksSUFBVTtRQUNsQixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLENBQUM7UUFDMUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUF1QixDQUFDO1FBQ2hGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBdUIsQ0FBQztRQUM5RSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBQzNELElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQXVCLENBQUM7UUFDaEYsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUF1QixDQUFDO1FBQ2xGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUs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