import { Board } from "./board.js";
import { Card } from "./card.js";
import { GameEvents } from "./events.js";
import { FormationPosition } from "./formations.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { Team } from "./team.js";
import { FormationType } from "./types.js";

// per ora i giocatori hanno tutti lo stesso sprite

const leftUserCard = new Card({ x: 10, y: 10 });

const tableSoccer = new Game(
  new Board(
    new Team(
      new FormationPosition("443", FormationType.OFFENSE),
      [
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
      "ITALIA"
    )
  )
);

//promises.push(leftUserCard);

Promise.all(
  tableSoccer.board.team.elements.map((element) => element.player.loadImage)
).then(() => {
  tableSoccer.board.drawTeam(tableSoccer.board.team.elements);
  tableSoccer.board.drawMoveCursors();
});