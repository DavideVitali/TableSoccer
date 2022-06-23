class Player extends EventTarget {
    #_waiting;
    #_moving;
    #_moveDone;
    #_selected;
    #_position;
    #_stats;

    constructor({imageUrl, portraitUrl, name, position, stats}) {
        super();
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        this.#_stats = stats;
        this.#_selected = false;
        this.#_position = position;
        this.#_waiting = false;

        this.addEventListener('playermoved', (e) => {
            this.clearWaiting();
            this.setMoving();
            console.log(e.type);
        });

        this.addEventListener('playerstopped', (e) => { 
            this.clearMoving();
            this.setMoveDone();
            console.log(e.type);
        });

        this.addEventListener('playerclick', (e) => {
            if (this.selected === true && this.available === true) {
                this.clearWaiting();
            }

            this.#_selected = !this.selected;

            if (this.selected === true && this.available === false) {
                this.setWaiting();
            } 

            console.log(`${this.name} selected ${this.selected}, available ${this.available}, waiting ${this.waiting}`);
        });
    };
    
    get stats() {
        return this.#_stats
    }

    get position() {
        return this.#_position;
    }

    get feetPosition() {
        return {
            x: this.#_position.x + (this.htmlImage.width /4 /2),
            y: this.#_position.y + (this.htmlImage.height)
        }
    }

    set position(p) {
        this.#_position = p;
    }

    get available() {
        return this.#_moving !== true && this.#_moveDone !== true && this.#_waiting !== true;
    }

    get waiting() {
        return this.#_waiting;
    }

    setWaiting = () => {
        this.#_waiting = true;
    }

    clearWaiting = () => {
        this.#_waiting = false;
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
        this.clearWaiting();
        this.clearMoving();
        this.clearMoveDone();
    }

    get selected() {
        return this.#_selected
    }

    select = () => {
        this.#_selected = true;
    }

    /* This is loop-called from board when selecting another player */
    deselect = () => {
        this.#_selected = false;
        this.#_waiting = false;
        console.log(`[from deselect] ${this.name} selected ${this.selected}, available ${this.available}, waiting ${this.waiting}`)
    }
}