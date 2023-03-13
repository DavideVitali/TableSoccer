export class PlayerEvent extends CustomEvent {
    constructor(name, player) {
        super(name);
        this.name = name;
        this.player = player;
    }
}
let mouseEventsCanvas = document.getElementById("MouseEvents");
mouseEventsCanvas.addEventListener("click", (e) => {
    let coords = { x: e.pageX - board.leftUserCanvas.width, y: e.pageY };
    let player = team.findPlayerByPoint(coords);
    let controller;
    if (player !== null) {
        controller = board.controllers.find((e) => e.player.name === player.name);
        let playerClick = new CustomEvent("playerclick", {
            detail: {
                player: player,
            },
        });
        player.dispatchEvent(playerClick);
        board.dispatchEvent(playerClick);
        if (player.selected === true) {
            game.selectedPlayer = player;
        }
        else {
            /** giocatore deselezionato */
        }
    }
    else {
        let waitingPlayer;
        try {
            waitingPlayer = board.findWaitingPlayer();
        }
        catch (error) {
            alert(error);
        }
        if (game.selectedPlayer !== null) {
            controller = board.controllers.find((e) => e.player.name === game.selectedPlayer.name);
            if (controller.player.moveDone === true) {
                alert(`Hai già mosso ${controller.player.name}.`);
                return;
            }
            controller.setTargetCoordinates(coords);
            controller.startAnimation();
            let playerClick = new PlayerEvent("playerclick", game.selectedPlayer);
            game.clearSelectedPlayer();
            board.dispatchEvent(playerClick);
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFVQSxNQUFNLE9BQU8sV0FBWSxTQUFRLFdBQW1CO0lBQ2xELFlBQW1CLElBQVksRUFBUyxNQUFjO1FBQ3BELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQURLLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBRXRELENBQUM7Q0FDRjtBQUVELElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FDN0MsYUFBYSxDQUNRLENBQUM7QUFFeEIsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7SUFDaEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3JFLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxJQUFJLFVBQVUsQ0FBQztJQUVmLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNuQixVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUzRSxJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7WUFDL0MsTUFBTSxFQUFFO2dCQUNOLE1BQU0sRUFBRSxNQUFNO2FBQ2Y7U0FDRixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xDLEtBQUssQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFakMsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztTQUM5QjthQUFNO1lBQ0wsOEJBQThCO1NBQy9CO0tBQ0Y7U0FBTTtRQUNMLElBQUksYUFBYSxDQUFDO1FBQ2xCLElBQUk7WUFDRixhQUFhLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDM0M7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNkO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ2pDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsY0FBZSxDQUFDLElBQUksQ0FDckMsQ0FBQztZQUNoQixJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDdkMsS0FBSyxDQUFDLGlCQUFpQixVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7Z0JBQ2xELE9BQU87YUFDUjtZQUVELFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7WUFFNUIsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUV0RSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUMzQixLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9