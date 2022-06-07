class Table {
    constructor() {
        this.fieldCanvas = document.getElementById('Field');
        this.fieldContext = this.fieldCanvas.getContext('2d');
        this.playersCanvas = document.getElementById('Players');
        this.playersContext = this.playersCanvas.getContext('2d');
        const fieldImage = new Image();
        fieldImage.src = "assets/map.png";  
        fieldImage.onload = () => {
            this.fieldContext.drawImage(fieldImage, 0, 0);
        }
        this.frameNumber = 0;
    }

    drawTeam = arr => {
        arr.team.forEach(element => {
            this.drawPlayer(element.player, element.position);
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

    drawPlayer = (player, position) => {
        const current = {
            image: player.htmlImage,
            position: position
        }
        this.playersContext.clearRect(current.position.x, current.position.y, current.image.width, current.image.height);
        this.playersContext.drawImage(
            
                current.image,
                0, 0, 
                32, 32, 
                position.x,
                position.y,
                current.image.width / 4,
                current.image.height);
    }

    loadPlayerImage = (player) => {
        const current = {
            uri: player.imageUrl,
        }

        return loadImage(current.uri).then(img => player.htmlImage = img);
    }

    animatePlayer = (player, position) => {
        this.animation = setInterval(() => { this.drawPlayer(player, position)}, 100);
    }
}