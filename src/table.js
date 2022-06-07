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

    drawTeam = team => {
        team.players.forEach((element, index) => {
            this.drawPlayer(element.player, team.formation.positions[index]);
        });
    }

    drawPlayer = (player, position) => {
        console.log(`Drawing ${player.name}`);
        const current = {
            image: player.htmlImage,
            position: position
        }
        this.playersContext.clearRect(current.position.x, current.position.y, current.image.width, current.image.height);
        this.playersContext.drawImage(
                current.image,
                0, 0, 
                32, 32, 
                (current.position.x * this.playersCanvas.width / 100) - (current.image.width / 4 / 2),
                (current.position.y * this.playersCanvas.height / 100) - (current.image.height / 2),
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