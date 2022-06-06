const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const fieldImage = new Image();
fieldImage.src = "./assets/map.png";

fieldImage.onload = () => {
    ctx.drawImage(fieldImage, 0, 0);
    console.log(canvas.width);
}