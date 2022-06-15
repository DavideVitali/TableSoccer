class Player extends EventTarget {
    #_moveRequest;
    #_moving;
    #_moveDone;

    constructor({imageUrl, portraitUrl, name, stats}) {
        super();
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        this.stats = stats;

        this.addEventListener('playermoved', (e) => { console.log(e) });
    };

    get moveRequest() {
        return this.#_moveRequest === true;
    }

    setMoveRequest = () => {
        if (!this.#_moveRequest) {
            this.#_moveRequest = true;
        } else {
            throw new Error(`Hai già mosso ${this.name}.`);
        }
    }

    clearMoveRequest = () => {
        this.#_moveRequest = null;
    }

    get moving() {
        return this.#_moving === true;
    }

    setMoving = () => {
        this.#_moving = true;
    }

    clearMoving = () => {
        this.#_moving = null;
    }

    get moveDone() {
        return this.#_moveDone === true;
    }

    setMoveDone = () => {
        this.#_moveDone = true;
    }

    clearMoveDone = () => {
        this.#_moveDone = null;
    }   
}