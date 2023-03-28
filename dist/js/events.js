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
        let player = this.game.board.findPlayer(position);
        if (player) {
            let pEvt = new PlayerEvent("playerclick", {
                player: player,
                movement: 0,
            });
            this.game.board.dispatchEvent(pEvt);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQWUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBVXBELE1BQU0sT0FBTyxXQUFZLFNBQVEsV0FBOEI7SUFDN0QsWUFBWSxJQUFZLEVBQUUsTUFBeUI7UUFDakQsSUFBSSxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLGVBQWU7SUFHbkIsWUFBWSxXQUE4QjtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxVQUFVO0lBR3JCLFlBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUM5QyxhQUFhLENBQ1EsQ0FBQztRQUV4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDckQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHdCQUF3QixDQUFDLENBQWE7UUFDNUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQ3pCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFDOUMsQ0FBQyxDQUFDLEtBQUssQ0FDUixDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFXLFFBQVEsQ0FBQyxDQUFDO1FBRTVELElBQUksTUFBTSxFQUFFO1lBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO2dCQUN4QyxNQUFNLEVBQUUsTUFBTTtnQkFDZCxRQUFRLEVBQUUsQ0FBQzthQUNTLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLFVBQTBCLENBQUM7UUFFL0IseUJBQXlCO1FBQ3pCLG1EQUFtRDtRQUNuRCw0Q0FBNEM7UUFDNUMsbUJBQW1CO1FBRW5CLDhEQUE4RDtRQUU5RCx1Q0FBdUM7UUFDdkMsZ0RBQWdEO1FBRWhELG9DQUFvQztRQUNwQyx5Q0FBeUM7UUFDekMsYUFBYTtRQUNiLHFDQUFxQztRQUNyQyxNQUFNO1FBQ04sV0FBVztRQUNYLHVCQUF1QjtRQUN2QixVQUFVO1FBQ1YsMkRBQTJEO1FBQzNELHNCQUFzQjtRQUN0QixvQkFBb0I7UUFDcEIsTUFBTTtRQUVOLDZDQUE2QztRQUM3QyxxREFBcUQ7UUFDckQsZ0VBQWdFO1FBQ2hFLHFCQUFxQjtRQUNyQixpREFBaUQ7UUFDakQsMkRBQTJEO1FBQzNELGdCQUFnQjtRQUNoQixRQUFRO1FBRVIsaURBQWlEO1FBQ2pELG1DQUFtQztRQUVuQyx5Q0FBeUM7UUFDekMsdUJBQXVCO1FBQ3ZCLGlDQUFpQztRQUNqQyxTQUFTO1FBRVQsdUNBQXVDO1FBQ3ZDLGtEQUFrRDtRQUNsRCxNQUFNO1FBQ04sSUFBSTtJQUNOLENBQUM7Q0FDRiJ9