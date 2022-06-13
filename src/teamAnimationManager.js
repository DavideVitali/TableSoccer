class TeamAnimationManager {
    #cancelAnimationRequest;
    #isPlaying;
    #targetCoordinates;
    #stepDelta;

    constructor (player, position) {
        this.frameNumber = 0;
        this.#cancelAnimationRequest = false;
        this.#isPlaying = false;
        this.player = player;
        this.position = position;
        
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

        let stepX, stepY = 0;
        if (this.#targetCoordinates) {

        }
        
        let elapsedTime = Date.now() - this.animationStartTimestamp;
        if (elapsedTime > this.fpsInterval) {
            if (this.frameNumber % 4 == 0 && this.#cancelAnimationRequest == true) {
                this.cancelAnimation();
                window.cancelAnimationFrame(requestId);
            }
            this.animationStartTimestamp = Date.now();// - (elapsedTime % this.fpsInterval);
            Board.drawPlayer(this.player, step, this.frameNumber);
            this.position.x += stepX;
            this.position.y += stepY;
            this.frameNumber++;
        } 
    }

    cancelAnimation = () => {
        this.#isPlaying = false;
        this.#cancelAnimationRequest = true;
        this.#targetCoordinates = null;
    }

    startAnimation = () => {
        this.#isPlaying = true;
        this.#cancelAnimationRequest = false;
        this.#animateSprite();
    }

    isPlaying = () => this.#isPlaying;

    setTargetCoordinates = (target) => {
        this.#targetCoordinates = target;
        this.#stepDelta.x = Math.abs(this.#targetCoordinates.x - this.position.x) / this.playerStepLength;
        this.#stepDelta.y = Math.abs(this.#targetCoordinates.y - this.position.y) / this.playerStepLength;
    } 
}