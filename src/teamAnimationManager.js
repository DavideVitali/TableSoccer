class TeamAnimationManager {
    #cancelAnimationRequest;
    #isPlaying;

    constructor (player, position) {
        this.frameNumber = 0;
        this.#cancelAnimationRequest = false;
        this.#isPlaying = false;
        this.player = player;
        this.position = position;
        
        // animation speed settings
        this.fpsInterval = 1000 / 12;
        this.animationStartTimestamp;
    }

    #animateSprite = (timestamp) => {
        let requestId = requestAnimationFrame((timestamp) => this.#animateSprite(timestamp));

        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        
        let elapsedTime = Date.now() - this.animationStartTimestamp;
        if (elapsedTime > this.fpsInterval) {
            if (this.frameNumber % 4 == 0 && this.#cancelAnimationRequest == true) {
                this.cancelAnimation();
                window.cancelAnimationFrame(requestId);
            }
            this.animationStartTimestamp = Date.now();// - (elapsedTime % this.fpsInterval);
            Board.drawPlayer(this.player, this.position, this.frameNumber);
            this.frameNumber++;
        } 
    }

    cancelAnimation = () => {
        this.#isPlaying = false;
        this.#cancelAnimationRequest = true;
    }

    startAnimation = () => {
        this.#isPlaying = true;
        this.#cancelAnimationRequest = false;
        this.#animateSprite();
    }

    isPlaying = () => this.#isPlaying;
}