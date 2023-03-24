export class PlayerEvent extends CustomEvent {
    constructor(name, detail) {
        let init = new PlayerEventInit(detail);
        super(name, init);
    }
}
class PlayerEventInit {
    constructor(eventDetail) {
        if (!eventDetail.player)
            throw new Error('PlayerEventInit needs a non-null player instance.');
        this.detail = eventDetail;
    }
}
export class GameEvents {
    constructor(game) {
        this.game = game;
        this.mouseEventsCanvas = document.getElementById("MouseEvents");
        this.mouseEventsCanvas.addEventListener("click", (e) => this.mouseEventCanvasListener(e));
    }
    mouseEventCanvasListener(e) {
        let position = {
            x: e.pageX - this.game.board.leftUserCanvas.width,
            y: e.pageY,
        };
        let player = this.game.board.team.findPlayer(position);
        let controller;
        // if (player !== null) {
        //   controller = this.game.board.controllers.find(
        //     (e) => e.player.name === player!.name
        //   ) as Renderer;
        //   let playerClick = new PlayerEvent("playerclick", player);
        //   player.dispatchEvent(playerClick);
        //   this.game.board.dispatchEvent(playerClick);
        //   if (player.selected === true) {
        //     this.game.selectedPlayer = player;
        //   } else {
        //     /** giocatore deselezionato */
        //   }
        // } else {
        //   let waitingPlayer;
        //   try {
        //     waitingPlayer = this.game.board.findWaitingPlayer();
        //   } catch (error) {
        //     alert(error);
        //   }
        //   if (this.game.selectedPlayer !== null) {
        //     controller = this.game.board.controllers.find(
        //       (e) => e.player.name === this.game.selectedPlayer!.name
        //     ) as Renderer;
        //     if (controller.player.moveDone === true) {
        //       alert(`Hai già mosso ${controller.player.name}.`);
        //       return;
        //     }
        //     controller.setTargetCoordinates(position);
        //     controller.startAnimation();
        //     let playerClick = new PlayerEvent(
        //       "playerclick",
        //       this.game.selectedPlayer
        //     );
        //     this.game.clearSelectedPlayer();
        //     this.game.board.dispatchEvent(playerClick);
        //   }
        // }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxNQUFNLE9BQU8sV0FBWSxTQUFRLFdBQThCO0lBQzdELFlBQ0UsSUFBWSxFQUNaLE1BQXlCO1FBRXpCLElBQUksSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBRUQsTUFBTSxlQUFlO0lBR25CLFlBQVksV0FBOEI7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1lBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQzlGLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxVQUFVO0lBR3JCLFlBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUM5QyxhQUFhLENBQ1EsQ0FBQztRQUV4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDckQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHdCQUF3QixDQUFDLENBQWE7UUFDNUMsSUFBSSxRQUFRLEdBQWdCO1lBQzFCLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ2pELENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSztTQUNYLENBQUM7UUFDRixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksVUFBMEIsQ0FBQztRQUUvQix5QkFBeUI7UUFDekIsbURBQW1EO1FBQ25ELDRDQUE0QztRQUM1QyxtQkFBbUI7UUFFbkIsOERBQThEO1FBRTlELHVDQUF1QztRQUN2QyxnREFBZ0Q7UUFFaEQsb0NBQW9DO1FBQ3BDLHlDQUF5QztRQUN6QyxhQUFhO1FBQ2IscUNBQXFDO1FBQ3JDLE1BQU07UUFDTixXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLFVBQVU7UUFDViwyREFBMkQ7UUFDM0Qsc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUNwQixNQUFNO1FBRU4sNkNBQTZDO1FBQzdDLHFEQUFxRDtRQUNyRCxnRUFBZ0U7UUFDaEUscUJBQXFCO1FBQ3JCLGlEQUFpRDtRQUNqRCwyREFBMkQ7UUFDM0QsZ0JBQWdCO1FBQ2hCLFFBQVE7UUFFUixpREFBaUQ7UUFDakQsbUNBQW1DO1FBRW5DLHlDQUF5QztRQUN6Qyx1QkFBdUI7UUFDdkIsaUNBQWlDO1FBQ2pDLFNBQVM7UUFFVCx1Q0FBdUM7UUFDdkMsa0RBQWtEO1FBQ2xELE1BQU07UUFDTixJQUFJO0lBQ04sQ0FBQztDQUNGIn0=