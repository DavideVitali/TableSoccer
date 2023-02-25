type Point = { x: number, y: number };

class Player extends EventTarget {
    private waiting;
    private moving;
    private moveDone;
    private selected;
    private _position: Point;

    constructor(imageUrl, portraitUrl, name, position, stats) {
        super();
        this.imageUrl = imageUrl;
        this.name = name;
        this.isLoaded = false;
        this.loadImage = loadImage(imageUrl);
        this.stats = stats;
        this.selected = false;
        this._position = position;
        this.waiting = false;

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
            this.selected = !this.selected;

            if (this.selected === true && this.available === true) {
                this.setWaiting();
            } 
        });

        this.addEventListener('playercollision', (e) => {

        })
    };
    
    get position() {
        return this._position;
    }

    set position(p) {
        this._position = p;
    }

    get available() {
        return this.moving !== true && this.moveDone !== true && this.waiting !== true;
    }

    get waiting() {
        return this.waiting;
    }

    setWaiting = () => {
        this.waiting = true;
    }

    clearWaiting = () => {
        this.waiting = false;
    }

    get moving() {
        return this.moving === true;
    }

    setMoving = () => {
        this.moving = true;
    }

    clearMoving = () => {
        this.moving = null;
    }

    get moveDone() {
        return this.moveDone === true;
    }

    setMoveDone = () => {
        this.moveDone = true;
    }

    clearMoveDone = () => {
        this.moveDone = null;
    }   

    resetStatus = () => {
        this.clearWaiting();
        this.clearMoving();
        this.clearMoveDone();
    }

    get selected() {
        return this.selected
    }

    select = () => {
        this.selected = true;
    }

    /* This is loop-called from board when selecting another player */
    deselect = () => {
        this.selected = false;
        this.waiting = false;
    }
}