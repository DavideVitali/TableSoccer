class TeamAnimationManager {
    #cancelAnimationRequest;
    #isPlaying;
    #targetCoordinates;
    #targetDelta = { x: 0, y: 0 };
    #moveRequestCursorPosition;
    #playerMovedEvent;

    constructor (player, position) {
        this.frameNumber = 0;
        this.#cancelAnimationRequest = false;
        this.#isPlaying = false;
        this.player = player;
        this.position = position;
        this.previousPosition = position;
        // this.#moveRequestCursorPosition = { 
        //     x: position.x + player.htmlImage.width / 4 / 2,
        //     y: position.y + player.htmlImage.height + 4
        // };
        
        // animation speed settings
        this.fpsInterval = 1000 / 12;
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
            if (this.frameNumber % 2 == 0 && this.#cancelAnimationRequest == true) {
                window.cancelAnimationFrame(requestId);
            }

            this.animationStartTimestamp = Date.now();// - (elapsedTime % this.fpsInterval);
            this.#playerMovedEvent = new CustomEvent('playermoved', { 
                detail: { 
                    player: this.player,
                    position: {
                        x: this.position.x,
                        y: this.position.y 
                    }
                }
            });
            document.dispatchEvent(this.#playerMovedEvent);
            Board.clearPlayerRect({
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
            Board.find
            Board.drawPlayer(this.player, this.position, this.frameNumber);
            this.frameNumber++;
        } 
    }

    cancelAnimation = () => {
        this.#isPlaying = false;
        this.#cancelAnimationRequest = true;
        this.#targetCoordinates = null;
        this.#targetDelta = { x: 0, y: 0 };
    }

    startAnimation = () => {
        this.#isPlaying = true;
        this.#cancelAnimationRequest = false;
        this.#animateSprite();
    }

    isPlaying = () => this.#isPlaying;

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