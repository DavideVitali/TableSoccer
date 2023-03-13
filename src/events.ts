import { Board } from "./board.js";
import { Controller } from "./controller.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { Team } from "./team.js";

declare var game: Game;
declare var board: Board;
declare var team: Team;

export class PlayerEvent extends CustomEvent<Player> {
  constructor(public name: string, public player: Player) {
    super(name);
  }
}

let mouseEventsCanvas = document.getElementById(
  "MouseEvents"
)! as HTMLCanvasElement;

mouseEventsCanvas.addEventListener("click", (e) => {
  let coords = { x: e.pageX - board.leftUserCanvas.width, y: e.pageY };
  let player = team.findPlayerByPoint(coords);
  let controller;

  if (player !== null) {
    controller = board.controllers.find((e) => e.player.name === player!.name);

    let playerClick = new CustomEvent("playerclick", {
      detail: {
        player: player,
      },
    });

    player.dispatchEvent(playerClick);
    board.dispatchEvent(playerClick);

    if (player.selected === true) {
      game.selectedPlayer = player;
    } else {
      /** giocatore deselezionato */
    }
  } else {
    let waitingPlayer;
    try {
      waitingPlayer = board.findWaitingPlayer();
    } catch (error) {
      alert(error);
    }

    if (game.selectedPlayer !== null) {
      controller = board.controllers.find(
        (e) => e.player.name === game.selectedPlayer!.name
      ) as Controller;
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
