class TeamAnimationManager {
    
    constructor () {
        this.frameNumber = 0;
        this.animationStartTimestamp;
        this.animationRequestId;
        this.cancelAnimationRequest = false;
        this.player;
        this.position;
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
            
            // this.playersContext.clearRect(this.position.x, this.position.y, this.player.sprite.width / 4, this.sprite.height);
            // Board.playersContext.drawImage(
            //     this.player.sprite,
            //     (this.player.sprite.width / 4 ) * (currentStep % 4), 0, 
            //     32, 32, 
            //     this.position.x,
            //     this.position.y,
            //     this.player.sprite.width / 4,
            //     this.player.sprite.height);
            this.frameNumber += 1;
        }
    }

    cancelAnimation = () => {
        this.cancelAnimationRequest = true;
    }
}