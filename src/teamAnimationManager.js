class TeamAnimationManager {
    constructor (player, position) {
        this.frameNumber = 0;
        this.animationStartTimestamp;
        this.animationRequestId;
        this.cancelAnimationRequest = false;
        this.player = player;
        this.position = position;
    }

    animateSprite = (timestamp) => {
        let requestId = requestAnimationFrame((timestamp) => this.animateSprite(timestamp));
        if (this.frameNumber % 4 == 3 && this.cancelAnimationRequest == true) {
            window.cancelAnimationFrame(requestId);
            this.cancelAnimationRequest = false;
        }

        if (!this.animationStartTimestamp) {
            this.animationStartTimestamp = timestamp;
        }
        let elapsed = Math.floor(timestamp - this.animationStartTimestamp);
        
        if (elapsed % 100 == 0) {
            Board.drawPlayer(this.player, this.position, this.frameNumber);
            this.frameNumber += 1;
        }
    }

    cancelAnimation = () => {
        this.cancelAnimationRequest = true;
    }
}