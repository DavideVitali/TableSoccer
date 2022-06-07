class Player {
    constructor({imageUrl, name}) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        
        this.loadImage.then(img => {
            this.htmlImage = img;
            this.isLoaded = true
            img.setAttribute('id', this.name);
        });
    };

    
}