import { Team } from "./team";
import { Point } from "./types";

export class Board extends EventTarget {
    fieldCanvas: HTMLCanvasElement;
    fieldContext: CanvasRenderingContext2D;
    mouseCanvas: HTMLCanvasElement;
    mouseContext: CanvasRenderingContext2D;
    playersCanvas: HTMLCanvasElement;
    playersContext: CanvasRenderingContext2D;
    leftUserCanvas: HTMLCanvasElement;
    leftUserContext: CanvasRenderingContext2D;
    rightUserCanvas: HTMLCanvasElement;
    rightUserContext: CanvasRenderingContext2D;
    pointerLockStartPoint: Point | null;
    controllers: Controller[];
    
    constructor(team: Team) {
        super();
        this.fieldCanvas = document.getElementById('Field')! as HTMLCanvasElement;
        this.fieldContext = this.fieldCanvas.getContext('2d')!;
        this.mouseCanvas = document.getElementById('MouseEvents')! as HTMLCanvasElement;
        this.mouseContext = this.mouseCanvas.getContext('2d')!;
        this.playersCanvas = document.getElementById('Players')! as HTMLCanvasElement;
        this.playersContext = this.playersCanvas.getContext('2d')!;
        this.leftUserCanvas = document.getElementById('LeftUser')! as HTMLCanvasElement;
        this.leftUserContext = this.leftUserCanvas.getContext('2d')!;
        this.rightUserCanvas = document.getElementById('RightUser')! as HTMLCanvasElement;
        this.rightUserContext = this.rightUserCanvas.getContext('2d')!;
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
        }

        this.controllers = []
        for(let i = 0; i < 11; i++) {
            // la formazione va trasformata in posizione effettiva
            team.elements[i].position = this.formationToBoardCoordinates(team.elements[i].position);
            this.controllers.push(new Controller(team.elements[i].player, team.elements[i].position));
        }
        
        this.addEventListener('playercollision', (e) => {
            this.drawPlayer(e.detail.player, e.detail.player.position, 0);
        });

        this.addEventListener('playerclick', (e) => {
            let clickedPlayer = e.detail.player;

            this.clearCanvas(this.mouseContext, this.mouseCanvas);
            this.clearCanvas(this.leftUserContext, this.leftUserCanvas);
            this.drawMoveCursors();
            this.switchSelected(clickedPlayer)
            if (clickedPlayer.selected && clickedPlayer.selected === true) {
                this.drawPlayerCard(leftUserCard, clickedPlayer);
            } else {
                // what happens here?
            }

            if (document.pointerLockElement === this.mouseCanvas) {
                document.removeEventListener("mousemove", () => this.updateMaximumMovement(clickedPlayer));
                document.exitPointerLock();
            } else {
                this.mouseCanvas.requestPointerLock();
                document.addEventListener("mousemove", () => this.updateMaximumMovement(clickedPlayer));
            }
        });
    }

    clearCanvas = (context, canvas) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    switchSelected = (player) => {
        let selectedPlayers = this.controller.filter(c => c.player.selected === true && c.player.name !== player.name);
        if (selectedPlayers && selectedPlayers.length > 0) {
            selectedPlayers.forEach(c => c.player.deselect());
        } 
    }

    drawTeam = arr => {
        arr.elements.forEach(e => {
            this.drawPlayer(e.player, e.position, 0);
        });
    }

    drawPlayerCard = (card, player) => {
        let ctx = this.leftUserContext;
        ctx.font = "12px fff";
        ctx.drawImage(card.template, card.position.x, card.position.y);
        const nameWidth = ctx.measureText(player.name).width;
        ctx.fillText(player.name, ((card.template.width - nameWidth) / 2) + card.position.x, (202 + card.position.y));
    }

    findWaitingPlayer = () => {
        let result = [];

        result = this.controller.map(element => {
            if (element.player.waiting === true) {
                result.push(element.player);
            }
        });

        if (result.length === 0) {
            return null;
        }

        if (result.length > 1) {
            throw new Error(`There are too many players are in 'waiting' state`);
        }

        return result[0];
    }

    formationToBoardCoordinates = (position) => {
        return { 
            x: Math.round(position.x * this.playersCanvas.width / 100),
            y: Math.round(position.y * this.playersCanvas.height / 100)
        };
    }

    boardCoordinatesToFormation = (position) => {
        return {
            x: Math.round(this.playersCanvas.width * 100 / position.x),
            y:Math.round(this.playersCanvas.height * 100 / position.y)
        };
    }

    clearPlayerRect = ({player, position, dimension}) => {
        this.playersContext.clearRect(position.x, position.y, dimension.width, dimension.height);
    }

    drawPlayer = (player, position, currentStep) => {
        const current = {
            image: player.htmlImage,
            position: position
        }

        this.playersContext.drawImage(
            current.image,
            (current.image.width / 4 ) * (currentStep % 4 ), 0, 
            32, 32, 
            current.position.x,
            current.position.y,
            current.image.width / 4,
            current.image.height);
    }
        
    // disegna il triangolino che segnala la disponibilità a fare un movimento
    drawMoveCursors = () => {
        let ctx = this.mouseContext;
        ctx.clearRect(0, 0, this.mouseCanvas.width, this.mouseCanvas.height); 
        this.controller.map(e => {
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
    drawMaximumMovement = (player) => {
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

    clearMaximumMovement = () => {

    }

    setMaximumMovement = () => {
        if (document.pointerLockElement === this.mouseCanvas) {
            console.log('pointer locked');
        } else {
            console.log('pointer unlocked');        }       
    }

    setMovementCursor = () => {
        let body = document.querySelector('body');

        if (!body.classList.contains('selected-player')) {
            body.classList.add('selected-player');
        } else {
            body.classList.remove('selected-player');
        }
    }

    clearMovementCursor = () => {
        let body = document.querySelector('body');

        if (body.classList.contains('selected-player')) {
            body.classList.remove('selected-player');
        }
    }

    /**
     * Find and dispatch whether a player's sprite is moving through another player's sprite
     */
    checkPlayerCollisions = (player) => {
        this.controller.map(e => {
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
                    let playerCollision = new CustomEvent('playercollision', {
                         detail: {
                            player: e.player
                        }
                    });
                    e.player.dispatchEvent(playerCollision);
                }
            }
        });
    }

    updateMaximumMovement = (player) => {
        this.drawMaximumMovement(player);
    }
}