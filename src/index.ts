// per ora i giocatori hanno tutti lo stesso sprite

import { Board } from "./board.js";
import { Card } from "./card.js";
import { Formation } from "./formations.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { PlayerRenderer } from "./renderers/player-renderer.js";
import { Team } from "./team.js";
import { FormationModule, FormationType } from "./types.js";

declare global {
  interface Window {
    tableSoccer: Game;
  }
}

//const leftUserCard = new Card({ x: 10, y: 10 });
const blueTeam = new Team(
  /* _formation */ new Formation(FormationModule._442, FormationType.OFFENSE),
  /* _player */ [
    new Player("img/ita_playerDown.png", "Donnarumma"),
    new Player("img/ita_playerDown.png", "Di Lorenzo"),
    new Player("img/ita_playerDown.png", "Bonucci"),
    new Player("img/ita_playerDown.png", "Chiellini"),
    new Player("img/ita_playerDown.png", "Emerson"),
    new Player("img/ita_playerDown.png", "Barella"),
    new Player("img/ita_playerDown.png", "Jorginho"),
    new Player("img/ita_playerDown.png", "Verratti"),
    new Player("img/ita_playerDown.png", "Insigne"),
    new Player("img/ita_playerDown.png", "Immobile"),
    new Player("img/ita_playerDown.png", "Chiesa"),
  ],
  /* name */ "ITALIA"
);

const board = new Board();
board.init(blueTeam);
window.tableSoccer = new Game(board);

