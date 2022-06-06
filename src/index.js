let Module = new Formation();
const fCanvas = document.getElementById('Field');
const F = fCanvas.getContext('2d');
const pCanvas = document.getElementById('Players');
const P = pCanvas.getContext('2d');

const fieldImage = new Image();
fieldImage.src = "assets/map.png";
const playerImage = new Image();
let frameNumber = 0;
let module = null;

playerImage.src = "assets/playerDown.png";
fieldImage.onload = () => {
    F.drawImage(fieldImage, 0, 0);
    module = Module.m433('defense');
}

animatePlayer = function() {
    P.clearRect(0, 0, pCanvas.width, pCanvas.height);
    for (let i = 0; i < 11; i++) {
        P.drawImage(
            playerImage, 
            (frameNumber % 4) * 32, 0, 
            32, 32, 
            (module[i].x * pCanvas.width / 2 / 100) -32, (module[i].y * pCanvas.height / 100) - 32,
            32, 32);

    }
    frameNumber++;
}

setInterval(animatePlayer, 100);