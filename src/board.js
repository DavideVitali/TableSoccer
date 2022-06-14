class Gameboard {
    constructor(blueTeam, redTeam) {
        this.fieldCanvas = document.getElementById('Field');
        this.fieldContext = this.fieldCanvas.getContext('2d');
        this.mouseCanvas = document.getElementById('MouseEvents');
        this.mouseContext = this.mouseCanvas.getContext('2d');
        this.playersCanvas = document.getElementById('Players');
        this.playersContext = this.playersCanvas.getContext('2d');
        this.leftUserCanvas = document.getElementById('LeftUser');
        this.leftUserContext = this.leftUserCanvas.getContext('2d')
        this.rightUserCanvas = document.getElementById('RightUser');
        this.rightUserContext = this.rightUserCanvas.getContext('2d')
        this.selectedPlayerIndex;

        const fieldImage = new Image();
        fieldImage.src = "img/map.png";  
        fieldImage.onload = () => {
            this.fieldContext.drawImage(fieldImage, 0, 0);
        }

        this.blueTeamAnimationManager = []
        for(let blueIndex = 0; blueIndex < 11; blueIndex++) {
            // la formazione va trasformata in posizione effettiva
            blueTeam.team[blueIndex].position = this.formationToActualCoordinates(blueTeam.team[blueIndex].position);
            this.blueTeamAnimationManager.push(new TeamAnimationManager(blueTeam.team[blueIndex].player, blueTeam.team[blueIndex].position));
        }
        
        this.redTeamAnimationManager = [];
        for(let redIndex = 0; redIndex < 11; redIndex++) {
            redTeam.team[redIndex].position = this.formationToActualCoordinates(redTeam.team[redIndex].position);
            this.redTeamAnimationManager.push(new TeamAnimationManager(redTeam.team[redIndex].player, redTeam.team[redIndex].position));
        }

        document.addEventListener('playermoved', (e) => this.checkPlayerCollisions(e.detail.player, e.detail.position));
        document.addEventListener('playercollision', (e) => this.drawPlayer(e.detail.player, e.detail.position, 0));
    }

    drawTeam = arr => {
        arr.team.forEach(element => {
            this.drawPlayer(element.player, element.position, 0);
        });
    }

    drawPlayerCard = (card, player) => {
        let ctx = this.leftUserContext;
        ctx.font = "12px fff";
        ctx.drawImage(card.template, card.position.x, card.position.y);
        const nameWidth = ctx.measureText(player.name).width;
        ctx.fillText(player.name, ((card.template.width - nameWidth) / 2) + card.position.x, (202 + card.position.y));
    }

    formationToActualCoordinates(position) {
        return { 
            x: (position.x * this.playersCanvas.width / 100),
            y: (position.y * this.playersCanvas.height / 100)
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
        
        // disegna il triangolino che segnala la disponibilità a fare un movimento
        if (player.hasMoveRequest()) {
            let ctx = this.mouseContext;
        }
        if (!player.hasMoveRequest()) {
            let startpoint = { 
                x: current.position.x + current.image.width / 4 / 2,
                y: current.position.y + current.image.height + 4
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
    }

    /**
     * Find and dispatch whether a player's sprite is moving through another player's sprite
     */
    checkPlayerCollisions = (currentPlayer, currentPosition) => {
        this.blueTeamAnimationManager.map(e => {
            if (e.player.htmlImage.id !== currentPlayer.htmlImage.id) {                
                let width = e.player.htmlImage.width / 4;
                let height = e.player.htmlImage.height;

                // sprites boundaries
                let cL = currentPosition.x;
                let cR = cL + width;
                let cT = currentPosition.y;
                let cB = cT + height;
                let eL = e.position.x;
                let eR = eL + width;
                let eT = e.position.y;
                let eB = eT + height;

                if (cL < eR && cR > eL && cT < eB && cB > eT) {
                    let playerCollision = new CustomEvent('playercollision', {
                         detail: {
                            player: e.player,
                            position: e.position
                        }
                    });
                    document.dispatchEvent(playerCollision);
                }
            }
        });
    }
}