import { Position } from "./coords.js";
export class PlayerEvent extends CustomEvent {
    constructor(name, detail) {
        let init = new PlayerEventInit(detail);
        super(name, init);
    }
}
class PlayerEventInit {
    constructor(eventDetail) {
        if (!eventDetail.player)
            throw new Error("PlayerEventInit needs a non-null player instance.");
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
        let position = new Position(e.pageX - this.game.board.leftUserCanvas.width, e.pageY);
        // TODO: doesn't work, but should...
        let player = this.game.board.findPlayer(position);
        alert(player === null || player === void 0 ? void 0 : player.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQWUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBVXBELE1BQU0sT0FBTyxXQUFZLFNBQVEsV0FBOEI7SUFDN0QsWUFBWSxJQUFZLEVBQUUsTUFBeUI7UUFDakQsSUFBSSxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLGVBQWU7SUFHbkIsWUFBWSxXQUE4QjtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxVQUFVO0lBR3JCLFlBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUM5QyxhQUFhLENBQ1EsQ0FBQztRQUV4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDckQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHdCQUF3QixDQUFDLENBQWE7UUFDNUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQ3pCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFDOUMsQ0FBQyxDQUFDLEtBQUssQ0FDUixDQUFDO1FBRUYsb0NBQW9DO1FBQ3BDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBVyxRQUFRLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksVUFBMEIsQ0FBQztRQUUvQix5QkFBeUI7UUFDekIsbURBQW1EO1FBQ25ELDRDQUE0QztRQUM1QyxtQkFBbUI7UUFFbkIsOERBQThEO1FBRTlELHVDQUF1QztRQUN2QyxnREFBZ0Q7UUFFaEQsb0NBQW9DO1FBQ3BDLHlDQUF5QztRQUN6QyxhQUFhO1FBQ2IscUNBQXFDO1FBQ3JDLE1BQU07UUFDTixXQUFXO1FBQ1gsdUJBQXVCO1FBQ3ZCLFVBQVU7UUFDViwyREFBMkQ7UUFDM0Qsc0JBQXNCO1FBQ3RCLG9CQUFvQjtRQUNwQixNQUFNO1FBRU4sNkNBQTZDO1FBQzdDLHFEQUFxRDtRQUNyRCxnRUFBZ0U7UUFDaEUscUJBQXFCO1FBQ3JCLGlEQUFpRDtRQUNqRCwyREFBMkQ7UUFDM0QsZ0JBQWdCO1FBQ2hCLFFBQVE7UUFFUixpREFBaUQ7UUFDakQsbUNBQW1DO1FBRW5DLHlDQUF5QztRQUN6Qyx1QkFBdUI7UUFDdkIsaUNBQWlDO1FBQ2pDLFNBQVM7UUFFVCx1Q0FBdUM7UUFDdkMsa0RBQWtEO1FBQ2xELE1BQU07UUFDTixJQUFJO0lBQ04sQ0FBQztDQUNGIn0=