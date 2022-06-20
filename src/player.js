class Player extends EventTarget {
    #_moving;
    #_moveDone;
    #_selected;
    #_position;

    constructor({imageUrl, portraitUrl, name, position, stats}) {
        super();
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        this.stats = stats;
        this.#_selected = false;
        this.#_position = position;

        this.addEventListener('playermoved', (e) => { 
            this.clearMoveDone();
            this.setMoving();
            console.log(e.type);
        });

        this.addEventListener('playerstopped', (e) => { 
            this.clearMoving();
            this.setMoveDone();
            console.log(e.type);
        });

        this.addEventListener('playerclick', (e) => {
            this.#_selected = !this.selected;
        });

        this.addEventListener('playercollision', (e) => {

        })
    };
    
    get position() {
        return this.#_position;
    }

    set position(p) {
        this.#_position = p;
    }

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