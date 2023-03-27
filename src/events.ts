import { Board } from "./board.js";
import { PlayerRenderer } from "./renderers/player-renderer.js";
import { Coordinates } from "./coords.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { Team } from "./team.js";

export type PlayerEventDetail = {
  player: Player;
  movement: number;
};

export class PlayerEvent extends CustomEvent<PlayerEventDetail> {
  constructor(name: string, detail: PlayerEventDetail) {
    let init = new PlayerEventInit(detail);
    super(name, init);
  }
}

class PlayerEventInit implements CustomEventInit<PlayerEventDetail> {
  detail?: PlayerEventDetail;

  constructor(eventDetail: PlayerEventDetail) {
    if (!eventDetail.player)
      throw new Error("PlayerEventInit needs a non-null player instance.");
    this.detail = eventDetail;
  }
}

export class GameEvents {
  public mouseEventsCanvas: HTMLCanvasElement;

  constructor(private game: Game) {
    this.mouseEventsCanvas = document.getElementById(
      "MouseEvents"
    )! as HTMLCanvasElement;

    this.mouseEventsCanvas.addEventListener("click", (e) =>
      this.mouseEventCanvasListener(e)
    );
  }

  private mouseEventCanvasListener(e: MouseEvent) {
    let position: Coordinates = {
      x: e.pageX - this.game.board.leftUserCanvas.width,
      y: e.pageY,
    };

    // TODO: doesn't work
    let point = this.game.board.coordinatesTransformer.toPoint(position);
    let player = this.game.board.team!.findPlayer(point);
    alert(player?.name);
    let controller: PlayerRenderer;

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
