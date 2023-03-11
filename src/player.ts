import { Point } from './types';

export class Player extends EventTarget {
    private _waiting: boolean;
    private _moving: boolean;
    private _moveDone: boolean | null;
    private _selected: boolean;
    private _position: Point;
    private _stats: any;
    public name: string;
    private _imageUrl: string;
    private _isLoaded: boolean;
    public loadImage: Promise<HTMLImageElement>

    constructor(imageUrl: string, name: string, position: Point, stats: any) {
        super();
        this._imageUrl = imageUrl;
        this.name = name;
        this._isLoaded = false;
        this.loadImage = Utils.loadImage(imageUrl);
        this._stats = stats;
        this._position = position;
        this._selected = false;
        this._waiting = false;
        this._moving = false;
        this._moveDone = null;

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
            this._selected = !this._selected;

            if (this._selected === true && this.available === true) {
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
        return this._moving !== true && this._moveDone !== true && this._waiting !== true;
    }

    get waiting() {
        return this._waiting;
    }

    setWaiting = () => {
        this._waiting = true;
    }

    clearWaiting = () => {
        this._waiting = false;
    }

    get moving() {
        return this._moving === true;
    }

    setMoving = () => {
        this._moving = true;
    }

    clearMoving = () => {
        this._moving = false;
    }

    get moveDone() {
        return this._moveDone === true;
    }

    setMoveDone = () => {
        this._moveDone = true;
    }

    clearMoveDone = () => {
        this._moveDone = null;
    }   

    resetStatus = () => {
        this.clearWaiting();
        this.clearMoving();
        this.clearMoveDone();
    }

    get selected() {
        return this._selected
    }

    select = () => {
        this._selected = true;
    }

    /* This is loop-called from board when selecting another player */
    deselect = () => {
        this._selected = false;
        this._waiting = false;
    }
<<<<<<< HEAD
}
=======
}

const loadImage = (url: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`warning: loading of image at ${url} has failed.`));
    });
};
>>>>>>> f12175d707d19e7de6bc9994da926b54743e8abc
