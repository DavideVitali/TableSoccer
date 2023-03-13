import { Board } from "./board.js";
import { Card } from "./card.js";
import { FormationPosition } from "./formations.js";
import { Game } from "./game.js";
import { Player } from "./player.js";
import { Team } from "./team.js";
import { FormationType } from "./types.js";

// per ora i giocatori hanno tutti lo stesso sprite
let players = [
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
];

const formation = new FormationPosition("443", FormationType.OFFENSE);
const team = new Team(formation, players, "ITALIA");
const leftUserCard = new Card({ x: 10, y: 10 });

const board = new Board(team);

let promises = team.elements.map((element) => element.player.loadImage);
//promises.push(leftUserCard);

Promise.all(promises).then(() => {
  board.drawTeam(team.elements);
  board.drawMoveCursors();
});

const game = new Game();
