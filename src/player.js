class Player {
    #moveRequest;

    constructor({imageUrl, portraitUrl, name, stats}) {
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        this.stats = stats;
    };

    setMoveRequest = () => {
        if (!this.#moveRequest) {
            this.#moveRequest = true;
        } else {
            throw new Error(`Hai già mosso ${this.name}.`);
        }
    }

    clearMoveRequest = () => {
        this.#moveRequest = null;
    }

    hasMoveRequest = () => {
        return this.#moveRequest !== null && this.#moveRequest !== undefined;
    }
}