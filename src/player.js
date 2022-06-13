class Player {
    constructor({imageUrl, portraitUrl, name, stats}) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        this.stats = stats;
        
        this.loadImage.then(img => {
            this.htmlImage = img;
            this.isLoaded = true
            img.setAttribute('id', this.name);
        });
    };
}