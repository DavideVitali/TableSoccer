const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const fieldImage = new Image();
fieldImage.src = "assets/map.png";
const playerImage = new Image();
let frameNumber = 0;

playerImage.src = "assets/playerDown.png";
fieldImage.onload = () => {
    ctx.drawImage(fieldImage, 0, 0);
    ctx.drawImage(playerImage, 0, 0, 32, 32, canvas.width / 2 -32, canvas.height / 2 - 32, 32, 32);
}

animatePlayer = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(fieldImage, 0, 0);
    ctx.drawImage(playerImage, (frameNumber % 4) * 32, 0, 32, 32, canvas.width / 2 -32, canvas.height / 2 - 32, 32, 32);
    frameNumber++;
}

setInterval(animatePlayer, 100);