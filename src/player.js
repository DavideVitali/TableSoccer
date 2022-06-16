class Player extends EventTarget {
    #_moving;
    #_moveDone;
    #_selected;
    #_position;

    constructor({imageUrl, portraitUrl, name, stats}) {
        super();
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        this.stats = stats;
        this.#_selected = false;

        this.addEventListener('playermoved', (e) => { 
            this.clearMoveDone();
            this.setMoving();
        });

        this.addEventListener('playerstopped', (e) => { 
            this.clearMoving();
            this.setMoveDone();
        });

        this.addEventListener('playerclick', (e) => {
            this.#_selected = !this.selected;
        });
    };

    get available() {
        return this.#_moving !== true && this.#_moveDone !== true;
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

    resetStatus = () => {
        this.clearMoving();
        this.clearMoveDone();
    }

    get selected() {
        return this.#_selected
    }

    select = () => {
        this.#_selected = true;
    }

    deselect = () => {
        this.#_selected = false;
    }
}