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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQWUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBVXBELE1BQU0sT0FBTyxXQUFZLFNBQVEsV0FBOEI7SUFDN0QsWUFBWSxJQUFZLEVBQUUsTUFBeUI7UUFDakQsSUFBSSxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLGVBQWU7SUFHbkIsWUFBWSxXQUE4QjtRQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxVQUFVO0lBR3JCLFlBQW9CLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUM5QyxhQUFhLENBQ1EsQ0FBQztRQUV4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDckQsSUFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQyxDQUNqQyxDQUFDO0lBQ0osQ0FBQztJQUVPLHdCQUF3QixDQUFDLENBQWE7UUFDNUMsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQ3pCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFDOUMsQ0FBQyxDQUFDLEtBQUssQ0FDUixDQUFDO1FBRUYsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFXLFFBQVEsQ0FBQyxDQUFDO1FBQzVELEtBQUssQ0FBQyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxVQUEwQixDQUFDO1FBRS9CLHlCQUF5QjtRQUN6QixtREFBbUQ7UUFDbkQsNENBQTRDO1FBQzVDLG1CQUFtQjtRQUVuQiw4REFBOEQ7UUFFOUQsdUNBQXVDO1FBQ3ZDLGdEQUFnRDtRQUVoRCxvQ0FBb0M7UUFDcEMseUNBQXlDO1FBQ3pDLGFBQWE7UUFDYixxQ0FBcUM7UUFDckMsTUFBTTtRQUNOLFdBQVc7UUFDWCx1QkFBdUI7UUFDdkIsVUFBVTtRQUNWLDJEQUEyRDtRQUMzRCxzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLE1BQU07UUFFTiw2Q0FBNkM7UUFDN0MscURBQXFEO1FBQ3JELGdFQUFnRTtRQUNoRSxxQkFBcUI7UUFDckIsaURBQWlEO1FBQ2pELDJEQUEyRDtRQUMzRCxnQkFBZ0I7UUFDaEIsUUFBUTtRQUVSLGlEQUFpRDtRQUNqRCxtQ0FBbUM7UUFFbkMseUNBQXlDO1FBQ3pDLHVCQUF1QjtRQUN2QixpQ0FBaUM7UUFDakMsU0FBUztRQUVULHVDQUF1QztRQUN2QyxrREFBa0Q7UUFDbEQsTUFBTTtRQUNOLElBQUk7SUFDTixDQUFDO0NBQ0YifQ==