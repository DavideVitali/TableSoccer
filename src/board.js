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
    }

    drawTeam = arr => {
        arr.team.forEach(element => {
            this.drawPlayer(element.player, element.position, 0);
        });
    }

    drawPlayerCard = (card, player) => {
        let ctx = this.leftUserContext;
        ctx.drawImage(card.template, card.position.x, card.position.y);
        const nameWidth = ctx.measureText(player.name).width;
        ctx.font = "12px fff";
        ctx.fillText(player.name, ((card.template.width - nameWidth) / 2) + card.position.x, (202 + card.position.y));
    }

    formationToActualCoordinates(position) {
        return { 
            x: (position.x * this.playersCanvas.width / 100),
            y: (position.y * this.playersCanvas.height / 100)
        };
    }

    drawPlayer = (player, position, currentStep) => {
        const current = {
            image: player.htmlImage,
            position: position
        }

        this.playersContext.clearRect(current.position.x, current.position.y, current.image.width / 4, current.image.height);
        this.playersContext.drawImage(
            current.image,
            (current.image.width / 4 ) * (currentStep % 4 ), 0, 
            32, 32, 
            current.position.x,
            current.position.y,
            current.image.width / 4,
            current.image.height);
    }

    // loadPlayerImage = (player) => {
    //     const current = {
    //         uri: player.imageUrl,
    //     }

    //     return loadImage(current.uri).then(img => player.htmlImage = img);
    // }
}