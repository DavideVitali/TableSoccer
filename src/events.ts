import { Board } from "./board.js";
import { Controller } from "./controller.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { Team } from "./team.js";
import { Point } from "./types.js";

export class PlayerEvent extends CustomEvent<Player> {
  constructor(public name: string, public player: Player, public movement: number = 0) {
    super(name);
  }
}

export class GameEvents {
  public mouseEventsCanvas: HTMLCanvasElement;
  
  constructor(private game: Game) {
    this.mouseEventsCanvas = document.getElementById(
      "MouseEvents"
    )! as HTMLCanvasElement;
  
    this.mouseEventsCanvas.addEventListener("click", e => this.mouseEventCanvasListener(e));   
  }

  private mouseEventCanvasListener(e: MouseEvent) {
    let coords: Point = { x: e.pageX - this.game.board.leftUserCanvas.width, y: e.pageY };
    let player = this.game.board.team.findPlayerByPoint(coords);
    let controller: Controller;
  
    if (player !== null) {
      controller = this.game.board.controllers.find((e) => e.player.name === player!.name) as Controller;
  
      let playerClick = new PlayerEvent("playerclick", player);
  
      player.dispatchEvent(playerClick);
      this.game.board.dispatchEvent(playerClick);
  
      if (player.selected === true) {
        this.game.selectedPlayer = player;
      } else {
        /** giocatore deselezionato */
      }
    } else {
      let waitingPlayer;
      try {
        waitingPlayer = this.game.board.findWaitingPlayer();
      } catch (error) {
        alert(error);
      }
  
      if (this.game.selectedPlayer !== null) {
        controller = this.game.board.controllers.find(
          (e) => e.player.name === this.game.selectedPlayer!.name
        ) as Controller;
        if (controller.player.moveDone === true) {
          alert(`Hai già mosso ${controller.player.name}.`);
          return;
        }
        
        controller.setTargetCoordinates(coords);
        controller.startAnimation();
  
        let playerClick = new PlayerEvent("playerclick", this.game.selectedPlayer);
  
        this.game.clearSelectedPlayer();
        this.game.board.dispatchEvent(playerClick);
      }
    }
  }
}
