class Card {
    constructor(position) {
        this.img = loadImage('img/bluePlayerCard.png');
        this.position = position;

        this.img.then(img => {
                this.template = img;
                delete this.img;
            });
    }
}