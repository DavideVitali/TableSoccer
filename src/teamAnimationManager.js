class TeamAnimationManager {
    constructor (player, position) {
        this.frameNumber = 0;
        this.animationRequestId;
        this.cancelAnimationRequest = false;
        this.isPlaying = false;
        this.player = player;
        this.position = position;
        
        // animation speed settings
        this.fpsInterval = 1000 / 12;
        this.animationStartTimestamp;
    }

    animateSprite = (timestamp) => {
        let requestId = requestAnimationFrame((timestamp) => this.animateSprite(timestamp));
        
        this.isPlaying = true;

        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        
        let elapsedTime = Date.now() - this.animationStartTimestamp;
        console.log(elapsedTime);
        
        if (elapsedTime > this.fpsInterval) {
            if (this.frameNumber % 4 == 0 && this.cancelAnimationRequest == true) {
                this.cancelAnimationRequest = false;
                this.isPlaying = false;
                window.cancelAnimationFrame(requestId);
            }
            this.animationStartTimestamp = Date.now();// - (elapsedTime % this.fpsInterval);
            Board.drawPlayer(this.player, this.position, this.frameNumber);
            this.frameNumber += 1;
        } 
    }

    cancelAnimation = () => {
        this.isPlaying = false;
        this.cancelAnimationRequest = true;
    }
}