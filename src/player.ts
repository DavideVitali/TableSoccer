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
    public loadImage: Promise<HTMLImageElement>;
    private _htmlImage: HTMLImageElement | any;

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
        this._htmlImage = null;

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
    
    public get position() {
        return this._position;
    }

    public set position(p) {
        this._position = p;
    }

    public get available() {
        return this._moving !== true && this._moveDone !== true && this._waiting !== true;
    }

    public get waiting() {
        return this._waiting;
    }

    public setWaiting = () => {
        this._waiting = true;
    }

    public clearWaiting = () => {
        this._waiting = false;
    }

    public get moving() {
        return this._moving === true;
    }

    public setMoving = () => {
        this._moving = true;
    }

    public clearMoving = () => {
        this._moving = false;
    }

    public get moveDone() {
        return this._moveDone === true;
    }

    public setMoveDone = () => {
        this._moveDone = true;
    }

    public clearMoveDone = () => {
        this._moveDone = null;
    }   

    public resetStatus = () => {
        this.clearWaiting();
        this.clearMoving();
        this.clearMoveDone();
    }

    public get selected() {
        return this._selected
    }

    public select = () => {
        this._selected = true;
    }

    /* This is loop-called from board when selecting another player */
    public deselect = () => {
        this._selected = false;
        this._waiting = false;
    }

    public get htmlImage() {
        if (this._htmlImage !== null) {
            return this._htmlImage as HTMLImageElement;
        } else {
            return this._htmlImage;
        }
    }
}