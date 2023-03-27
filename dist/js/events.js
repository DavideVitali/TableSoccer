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
        let position = {
            x: e.pageX - this.game.board.leftUserCanvas.width,
            y: e.pageY,
        };
        // TODO: doesn't work
        let point = this.game.board.coordinatesTransformer.toPoint(position);
        let player = this.game.board.team.findPlayer(point);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxNQUFNLE9BQU8sV0FBWSxTQUFRLFdBQThCO0lBQzdELFlBQVksSUFBWSxFQUFFLE1BQXlCO1FBQ2pELElBQUksSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNGO0FBRUQsTUFBTSxlQUFlO0lBR25CLFlBQVksV0FBOEI7UUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztJQUM1QixDQUFDO0NBQ0Y7QUFFRCxNQUFNLE9BQU8sVUFBVTtJQUdyQixZQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUM1QixJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDOUMsYUFBYSxDQUNRLENBQUM7UUFFeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQ3JELElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsQ0FDakMsQ0FBQztJQUNKLENBQUM7SUFFTyx3QkFBd0IsQ0FBQyxDQUFhO1FBQzVDLElBQUksUUFBUSxHQUFnQjtZQUMxQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBSztZQUNqRCxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUs7U0FDWCxDQUFDO1FBRUYscUJBQXFCO1FBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JELEtBQUssQ0FBQyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxVQUEwQixDQUFDO1FBRS9CLHlCQUF5QjtRQUN6QixtREFBbUQ7UUFDbkQsNENBQTRDO1FBQzVDLG1CQUFtQjtRQUVuQiw4REFBOEQ7UUFFOUQsdUNBQXVDO1FBQ3ZDLGdEQUFnRDtRQUVoRCxvQ0FBb0M7UUFDcEMseUNBQXlDO1FBQ3pDLGFBQWE7UUFDYixxQ0FBcUM7UUFDckMsTUFBTTtRQUNOLFdBQVc7UUFDWCx1QkFBdUI7UUFDdkIsVUFBVTtRQUNWLDJEQUEyRDtRQUMzRCxzQkFBc0I7UUFDdEIsb0JBQW9CO1FBQ3BCLE1BQU07UUFFTiw2Q0FBNkM7UUFDN0MscURBQXFEO1FBQ3JELGdFQUFnRTtRQUNoRSxxQkFBcUI7UUFDckIsaURBQWlEO1FBQ2pELDJEQUEyRDtRQUMzRCxnQkFBZ0I7UUFDaEIsUUFBUTtRQUVSLGlEQUFpRDtRQUNqRCxtQ0FBbUM7UUFFbkMseUNBQXlDO1FBQ3pDLHVCQUF1QjtRQUN2QixpQ0FBaUM7UUFDakMsU0FBUztRQUVULHVDQUF1QztRQUN2QyxrREFBa0Q7UUFDbEQsTUFBTTtRQUNOLElBQUk7SUFDTixDQUFDO0NBQ0YifQ==