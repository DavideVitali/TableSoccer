class Gameboard {
    constructor() {
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
        fieldImage.src = "assets/map.png";  
        fieldImage.onload = () => {
            this.fieldContext.drawImage(fieldImage, 0, 0);
        }

        this.blueTeamAnimationManager = Array(11).fill(new TeamAnimationManager());
        this.redTeamAnimationManager = Array(11).fill(new TeamAnimationManager());
    }

    drawTeam = arr => {
        arr.team.forEach(element => {
            this.drawPlayer(element.player, element.position, 0);
        });
    }

    formationToActualCoordinates(formation) {
        return formation.map(position => {
            return { 
                x: (position.x * this.playersCanvas.width / 100),
                y: (position.y * this.playersCanvas.height / 100)
            } 
        });
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
            current.image.height
                // current.image,
                // 0, 0, 
                // 32, 32, 
                // position.x,
                // position.y,
                // current.image.width / 4,
                // current.image.height
                );
    }

    loadPlayerImage = (player) => {
        const current = {
            uri: player.imageUrl,
        }

        return loadImage(current.uri).then(img => player.htmlImage = img);
    }
}