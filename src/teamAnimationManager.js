class TeamAnimationManager extends EventTarget {
    #cancelAnimationRequest;
    #targetCoordinates;
    #targetDelta = { x: 0, y: 0 };
    #moveRequestCursorPosition;

    constructor (player, position) {
        super();
        this.frameNumber = 0;
        this.#cancelAnimationRequest = false;
        this.player = player;
        this.position = position;
        this.previousPosition = position;
        
        //// ----------- qui l'immagine non è stata ancora caricata
        this.player.loadImage.then(img => {
            this.player.htmlImage = img;
            this.player.htmlImage.setAttribute('id', this.player.name);
            this.player.isLoaded = true;
            this.#moveRequestCursorPosition = { 
                x: position.x + img.width / 4 / 2,
                y: position.y + img.height + 4
            };
        });
        
        // animation speed settings
        this.fpsInterval = 1000 / 24;
        this.animationStartTimestamp;

        // 1 player step = 16 px;
        this.playerStepLength = 16;
    }

    #animateSprite = (timestamp) => {
        let requestId = requestAnimationFrame((timestamp) => this.#animateSprite(timestamp));

        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        
        if (this.#targetCoordinates) {
            let proximityX = Math.floor(Math.abs(this.#targetCoordinates.x - this.position.x));
            let proximityY = Math.floor(Math.abs(this.#targetCoordinates.y - this.position.y));
            if ( proximityX == 0 && proximityY == 0 ) {
                this.cancelAnimation();
            }
        }

        let elapsedTime = Date.now() - this.animationStartTimestamp;
        if (elapsedTime > this.fpsInterval) {
            console.log(elapsedTime ,this.fpsInterval);
            if (this.frameNumber % 2 == 0 && this.#cancelAnimationRequest == true) {
                window.cancelAnimationFrame(requestId);
                let playerStoppedEvent = new CustomEvent('playerstopped', {
                    detail: {
                        player: this.player
                    }
                });
                this.player.dispatchEvent(playerStoppedEvent);
            }

            this.animationStartTimestamp = Date.now();// - (elapsedTime % this.fpsInterval);
            let playerMovedEvent = new CustomEvent('playermoved', { 
                detail: { 
                    player: this.player,
                    position: {
                        x: this.position.x,
                        y: this.position.y 
                    }
                }
            });
            this.player.dispatchEvent(playerMovedEvent);
            board.clearPlayerRect({
                player: this.player,
                position: {
                    x: this.position.x, 
                    y: this.position.y 
                }, 
                dimension: { 
                    width: this.player.htmlImage.width / 4, 
                    height: this.player.htmlImage.height 
                }
            });
            this.position.x += this.#targetDelta.x;
            this.position.y += this.#targetDelta.y;
            board.find
            board.drawMoveCursors();
            board.drawPlayer(this.player, this.position, this.frameNumber);
            this.frameNumber++;
        } 
    }

    cancelAnimation = () => {
        this.player.clearMoving();
        this.player.setMoveDone();
        this.#cancelAnimationRequest = true;
        this.#targetCoordinates = null;
        this.#targetDelta = { x: 0, y: 0 };
    }

    startAnimation = () => {
        this.player.setMoving();
        this.#cancelAnimationRequest = false;
        this.#animateSprite();
    }

    isPlaying = () => this.player.moving;

    setTargetCoordinates = (target) => {
        try {
            this.player.setMoveRequest();
        } catch (error) {
            throw error;
        }
        this.#targetCoordinates = target;
        this.#targetDelta.x = (this.#targetCoordinates.x - this.position.x) / this.playerStepLength;
        this.#targetDelta.y = (this.#targetCoordinates.y - this.position.y) / this.playerStepLength;
    } 
}