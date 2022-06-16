class Controller extends EventTarget {
    #_cancelAnimationRequest;
    #_targetCoordinates;
    #_targetDelta = { x: 0, y: 0 };
    #_previousCollision;
    #_moveRequestCursorPosition;
    #_player;

    constructor (player, position) {
        super();
        this.frameNumber = 0;
        this.#_cancelAnimationRequest = false;
        this.#_player = player;
        this.#_player.position = position;
        
        //// ----------- qui l'immagine non è stata ancora caricata
        this.#_player.loadImage.then(img => {
            this.#_player.htmlImage = img;
            this.#_player.htmlImage.setAttribute('id', this.#_player.name);
            this.#_player.isLoaded = true;
            this.#_moveRequestCursorPosition = { 
                x: position.x + img.width / 4 / 2,
                y: position.y + img.height + 4
            };
        });
        
        // animation speed settings
        this.fpsInterval = 1000 / 8;
        this.animationStartTimestamp;

        // 1 player step = 16 px;
        this.playerStepLength = 16;
    }

    get player() {
        return this.#_player;
    }

    set player(p) {
        this.#_player = p;
    }

    get position() {
        return this.#_player.position;
    }

    set position(position) {
        this.#_player.position = position;
    }

    #animateSprite = (timestamp) => {
        let rafId = requestAnimationFrame(this.#animateSprite);

        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        
        if (this.#_targetCoordinates) {
            let proximityX = Math.floor(Math.abs(this.#_targetCoordinates.x - this.#_player.position.x));
            let proximityY = Math.floor(Math.abs(this.#_targetCoordinates.y - this.#_player.position.y));
            if ( proximityX == 0 && proximityY == 0 ) {
                this.cancelAnimation();
            }
        }

        let elapsedTime = Date.now() - this.animationStartTimestamp;

        if (elapsedTime > this.fpsInterval) {
            if (this.#_cancelAnimationRequest == true) {
                window.cancelAnimationFrame(rafId);
            }

            this.animationStartTimestamp = Date.now();

            board.clearPlayerRect({
                player: this.#_player,
                position: {
                    x: this.#_player.position.x, 
                    y: this.#_player.position.y 
                }, 
                dimension: { 
                    width: this.#_player.htmlImage.width / 4, 
                    height: this.#_player.htmlImage.height 
                }
            });

            this.#_player.position.x += this.#_targetDelta.x;
            this.#_player.position.y += this.#_targetDelta.y;
            board.drawMoveCursors();
            board.drawPlayer(this.#_player, this.#_player.position, this.frameNumber);
            let playerMovedEvent = new CustomEvent('playermoved', { 
                detail: { 
                    player: this.#_player,
                    position: {
                        x: this.#_player.position.x,
                        y: this.#_player.position.y 
                    }
                }
            });
            this.#_player.dispatchEvent(playerMovedEvent);
            this.frameNumber++;

            if (this.#_cancelAnimationRequest === true) {
                let playerStoppedEvent = new CustomEvent('playerstopped', {
                    detail: {
                        player: this.#_player
                    }
                });
                this.#_player.dispatchEvent(playerStoppedEvent);

                // reset
                this.frameNumber = 0;
                this.#_cancelAnimationRequest = false;
            }
        }

    }

    cancelAnimation = () => {
        this.#_player.clearMoving();
        this.#_player.setMoveDone();
        this.#_cancelAnimationRequest = true;
        this.#_targetCoordinates = null;
        this.#_targetDelta = { x: 0, y: 0 };
    }

    startAnimation = () => {
        this.#_player.setMoving();
        this.#_cancelAnimationRequest = false;
        this.#animateSprite();
    }

    isPlaying = () => this.#_player.moving;

    setTargetCoordinates = (target) => {
        if (this.#_player.available !== true) {
            throw new Error(`Hai già mosso ${this.#_player.name}`);
        } 
        
        this.#_targetCoordinates = target;
        this.#_targetDelta.x = (this.#_targetCoordinates.x - this.position.x) / this.playerStepLength;
        this.#_targetDelta.y = (this.#_targetCoordinates.y - this.position.y) / this.playerStepLength;
    } 
}